import React from 'react'
import immer from 'immer'
import classnames from 'classnames'
import { isFunc } from '../utils/is'
import { PureComponent } from '../component'
import { getUidStr } from '../utils/uid'
import DatumTree from '../Datum/Tree'
import { selectClass } from '../Select/styles'
import { cascaderClass } from './styles'
import Result from './Result'
import CascaderList from './List'
import FilterList from './FilterList'
import { docSize } from '../utils/dom/document'
import { getParent } from '../utils/dom/element'
import absoluteList from '../AnimationList/AbsoluteList'
import { isRTL } from '../config'
import { getKey } from '../utils/uid'
import Input from './Input'
import { OriginCascaderProps } from './Props'

const OptionList = absoluteList(
  ({ focus, getRef, ...other }: { focus: boolean; getRef: (e: HTMLDivElement) => void }) =>
    focus ? <div {...other} ref={getRef} /> : null
)

const isDescendent = (el: HTMLElement, id: string): boolean => {
  if (el.getAttribute('data-id') === id) return true
  if (!el.parentElement) return false
  return isDescendent(el.parentElement, id)
}

const DefaultProps = {
  data: [],
  height: 300,
  clearable: true,
  showArrow: true,
  expandTrigger: 'click',
  childrenKey: 'children' as any,
}

interface State {
  focus: boolean
  path: string[]
  position: 'drop-down' | 'drop-up'
}

class Cascader<DataItem, Value extends (string | number)[]> extends PureComponent<
  OriginCascaderProps<DataItem, Value>,
  State
> {
  static defaultProps = DefaultProps

  datum: DatumTree<DataItem>

  selectId: string

  isRendered: boolean

  ref: HTMLDivElement

  close: (e: MouseEvent) => void

  handleBlur: (e: MouseEvent) => void

  handleClick: (e?: any) => void

  input: Input

  lastValue?: Value

  element: HTMLDivElement

  renderPending: boolean

  constructor(props: OriginCascaderProps<DataItem, Value>) {
    super(props)

    this.state = {
      focus: false,
      path: [],
      position: 'drop-down',
    }

    this.datum = new DatumTree({
      data: props.data,
      loader: props.loader,
      keygen: props.keygen,
      mode: props.mode,
      onChange: props.onChange,
      value: props.value,
      disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
      childrenKey: props.childrenKey || DefaultProps.childrenKey,
      unmatch: props.unmatch,
    })

    this.isRendered = false

    this.selectId = `select_${getUidStr()}`
    this.handleClick = this.handleState.bind(this, true)
    this.handleBlur = this.handleState.bind(this, false)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClickAway = this.handleClickAway.bind(this)
    this.handlePathChange = this.handlePathChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.shouldFocus = this.shouldFocus.bind(this)
    this.bindRef = this.bindRef.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.bindInput = this.bindInput.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.close = this.handleBlur

    if (props.getComponentRef) {
      if (isFunc(props.getComponentRef)) {
        props.getComponentRef(this)
      } else {
        ;(props.getComponentRef as any).current = this
      }
    }
  }

  componentDidMount() {
    super.componentDidMount()
    this.updatePathByValue()
    if (this.props.mode !== undefined && this.props.loader && [0, 1, 2].includes(this.props.mode)) {
      console.error(
        new Error(`The mode ${this.props.mode} is not supported when loader setted. Only 3 or 4 can be set.`)
      )
    }
  }

  componentDidUpdate(prevProps: OriginCascaderProps<DataItem, Value>, prevState: State) {
    this.datum.mode = this.props.mode
    const { onFilter, filterDataChange, filterText } = this.props
    if (!filterDataChange && prevProps.data !== this.props.data) this.datum.setData(this.props.data, true)
    if (prevProps.value !== this.props.value) {
      this.datum.setValue(this.props.value || (([] as unknown) as Value))
      this.updatePathByValue()
    }

    if (prevState.focus !== this.state.focus && !this.state.focus && onFilter) {
      setTimeout(() => {
        onFilter('')
      }, 400)
    }
    if (filterText !== undefined && prevProps.filterText !== filterText) {
      this.updatePath()
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.clearClickAway()
  }

  bindRef(el: HTMLDivElement) {
    this.ref = el
  }

  bindClickAway() {
    document.addEventListener('mousedown', this.handleClickAway)
  }

  bindInput(input: Input) {
    this.input = input
  }

  clearClickAway() {
    document.removeEventListener('mousedown', this.handleClickAway)
  }

  shouldFocus(el: HTMLDivElement) {
    if (el.getAttribute('data-id') === this.selectId) return true
    if (getParent(el, `.${cascaderClass('result')}`)) return true
    return false
  }

  updatePath() {
    const { firstMatchNode, keygen, filterText } = this.props
    if (!filterText || !firstMatchNode) {
      this.setState({ path: [] })
      return
    }
    const key = getKey(firstMatchNode, keygen)
    const current = this.datum.getPath(key)
    if (!current) return
    this.setState(
      immer(draft => {
        draft.path = [...current.path, key]
      })
    )
  }

  updatePathByValue() {
    const { mode, value } = this.props
    if (mode !== undefined) return
    if (value === this.lastValue) return
    if (!value || !value.length) {
      this.setState({ path: [] })
    } else {
      const v = value[value.length - 1]
      const data = this.datum.getDataById(v)
      if (data === null || this.datum.isUnMatch(data)) return
      try {
        const id = this.datum.getKey(data as DataItem, '')
        let { path } = this.datum.getPath(id) || {}
        path = path || []
        this.handlePathChange(id, null, path)
      } catch (e) {
        console.error(e)
      }
    }
  }

  handleClickAway(e: MouseEvent) {
    const desc = isDescendent(e.target as HTMLElement, this.selectId)
    if (!desc) {
      this.clearClickAway()
      this.props.onBlur()
      this.handleState(false)
    }
  }

  handlePathChange(id: string | number, data: DataItem | null, path: (string | number)[], fromClick?: boolean) {
    const { childrenKey, finalDismiss, loader } = this.props
    if (fromClick && data && childrenKey) {
      let leaf = !data[childrenKey] || ((data[childrenKey] as unknown) as DataItem[]).length === 0
      if (loader && typeof loader === 'function' && data[childrenKey] === undefined) {
        leaf = false
      }
      if (finalDismiss && leaf) this.handleState(false)
    }
    setTimeout(() => {
      this.setState({ path: [...path, id] })
    }, 50)
  }

  handleFocus(e: any) {
    if (!this.shouldFocus(e.target as HTMLDivElement)) return
    this.props.onFocus(e)
    this.bindClickAway()
  }

  handleClear() {
    const { mode } = this.props
    this.setState({ path: [] })
    if (mode !== undefined) this.datum.setValue([] as any)
    this.handleChange([] as any)

    // force close
    setTimeout(() => this.handleState(false), 10)
  }

  handleRemove(node: DataItem) {
    const { onChange } = this.props
    this.datum.set(this.datum.getKey(node), 0)
    if (onChange) onChange((this.datum as any).getValue(), node)
  }

  handleState(focus: boolean, e?: MouseEvent) {
    if (this.props.disabled === true) return
    if (focus === this.state.focus) return

    // click close icon
    if (focus && e && (e.target as HTMLElement).classList.contains(cascaderClass('close'))) return

    // if remove node, return
    if (e && getParent(e.target as HTMLElement, `.${cascaderClass('remove-container')}`)) return

    const { height = DefaultProps.height, onCollapse } = this.props
    let { position } = this.props
    if (!position) {
      const windowHeight = docSize.height
      const bottom = height + this.element.getBoundingClientRect().bottom
      if (bottom > windowHeight) position = 'drop-up'
    }

    if (onCollapse) onCollapse(focus)
    this.setState({ focus, position: position || 'drop-down' })

    if (focus) {
      this.renderPending = false
      this.bindClickAway()
    }
    // } else if (blur) {
    //   this.clearClickAway()
    //   onBlur()
    // }
  }

  handleKeyDown(e: any) {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.handleState(!this.state.focus)
    }

    // fot close the list
    if (e.keyCode === 9) {
      this.props.onBlur()
      // e.preventDefault()
      if (this.state.focus) {
        this.handleState(false)
      } else {
        this.clearClickAway()
      }
    }
  }

  handleChange(...args: [Value, DataItem?]) {
    const { onChange, onFilter, filterText } = this.props
    if (this.input) {
      this.input.reset()
      this.input.focus()
    }
    const [value] = args
    this.lastValue = value
    if (onChange) {
      onChange(...args)
    }

    if (onFilter && filterText) onFilter('')
  }

  renderList() {
    const { data, keygen, renderItem, mode, loader, onItemClick, expandTrigger, childrenKey, height } = this.props
    const { path } = this.state

    const props = {
      datum: this.datum,
      renderItem,
      keygen,
      loader,
      onPathChange: this.handlePathChange,
      onChange: this.handleChange,
      onItemClick,
      multiple: mode !== undefined,
      expandTrigger,
      childrenKey,
    }

    let tempData: any = data

    let list = [
      <CascaderList<DataItem, Value>
        {...props}
        text={undefined}
        key="root"
        data={tempData}
        id={path[0]}
        parentId=""
        path={([] as unknown) as Value}
      />,
    ]

    const childs = path.map((p, i) => {
      tempData =
        tempData &&
        tempData instanceof Array &&
        tempData.find(d => {
          const nid = this.datum.getKey(d, path[i - 1])
          return nid === p
        })
      if (tempData && tempData[childrenKey] && tempData[childrenKey].length > 0) {
        tempData = tempData[childrenKey]
        return (
          <CascaderList<DataItem, Value>
            {...props}
            key={p}
            text={undefined}
            data={tempData}
            id={path[i + 1]}
            parentId={path[i]}
            path={path.slice(0, i + 1) as Value}
          />
        )
      }
      return null
    })

    if (childs) {
      list = list.concat(childs as any[])
    }

    const listStyle = data && data.length === 0 ? { height: 'auto', width: '100%' } : { height }

    return (
      <div ref={this.bindRef} style={listStyle}>
        {list}
      </div>
    )
  }

  renderAbsoluteList() {
    const { absolute, zIndex } = this.props
    const { focus, position } = this.state
    const className = classnames(selectClass('options'), cascaderClass('options'))
    const rootClass = classnames(cascaderClass(focus && 'focus', isRTL() && 'rtl'), selectClass(this.state.position))
    if (!focus && !this.isRendered) return null
    this.isRendered = true
    return (
      <OptionList
        autoAdapt
        rootClass={rootClass}
        className={className}
        position={position}
        absolute={absolute}
        focus={focus}
        parentElement={this.element}
        data-id={this.selectId}
        zIndex={zIndex}
      >
        {this.renderList()}
      </OptionList>
    )
  }

  renderFilterList() {
    const {
      absolute,
      onFilter,
      wideMatch,
      filterText,
      zIndex,
      data,
      childrenKey,
      renderItem,
      expandTrigger,
      filterDataChange,
      height,
      loading,
    } = this.props
    const { focus, position } = this.state
    const className = classnames(cascaderClass(focus && 'focus', isRTL() && 'rtl'), selectClass(this.state.position))

    return (
      <FilterList
        fixed="min"
        rootClass={className}
        position={position}
        absolute={absolute}
        focus={focus}
        parentElement={this.element}
        data-id={this.selectId}
        zIndex={zIndex}
        data={data}
        childrenKey={childrenKey}
        renderItem={renderItem}
        expandTrigger={expandTrigger}
        filterDataChange={filterDataChange}
        datum={this.datum}
        onChange={this.handleChange}
        onPathChange={this.handlePathChange}
        wideMatch={wideMatch}
        onFilter={onFilter}
        filterText={filterText}
        height={height}
        loading={loading}
      />
    )
  }

  renderPanel() {
    const { filterText, data, mode, loading } = this.props
    if (loading) return this.renderFilterList()
    if (!filterText || (filterText && mode !== undefined) || (data && data.length === 0))
      return this.renderAbsoluteList()
    return this.renderFilterList()
  }

  render() {
    const { placeholder, disabled, size, ...other } = this.props
    const { focus } = this.state
    const className = classnames(
      cascaderClass(
        '_',
        size,
        focus && 'focus',
        other.mode !== undefined && 'multiple',
        disabled === true && 'disabled',
        isRTL() && 'rtl'
      ),
      selectClass(this.state.position, focus && 'focus')
    )

    return (
      <div
        // eslint-disable-next-line
        tabIndex={disabled === true ? -1 : 0}
        className={className}
        onFocus={this.handleFocus}
        onClick={this.handleClick}
        data-id={this.selectId}
        onKeyDown={this.handleKeyDown}
        ref={el => {
          this.element = el!
        }}
      >
        <Result
          {...other}
          focus={focus}
          multiple={other.mode !== undefined}
          datum={this.datum}
          placeholder={placeholder}
          onClear={this.handleClear}
          onPathChange={this.handlePathChange}
          bindInput={this.bindInput}
          handleRemove={this.handleRemove}
          selectId={this.selectId}
          showList={this.handleClick}
          size={size}
        />

        {this.renderPanel()}
      </div>
    )
  }
}

export default Cascader
