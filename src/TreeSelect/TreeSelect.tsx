import React from 'react'
import { isFunc, isArray } from '../utils/is'
import Tree from '../Tree'
import { PureComponent } from '../component'
import { getUidStr } from '../utils/uid'
import { treeSelectClass } from './styles'
import Result from './Result'
import absoluteList from '../AnimationList/AbsoluteList'
import { docSize } from '../utils/dom/document'
import { getParent } from '../utils/dom/element'
import List from '../AnimationList'
import { getLocale } from '../locale'
import { isRTL } from '../config'
import { getDirectionClass } from '../utils/classname'
import { ResultItem, KeygenResult, UnMatchedValue, ValueArr, RegularAttributes } from '../@types/common'
import {
  ComponentRef,
  TreeSelectValueType,
  OriginTreeSelectProps,
  SetTreeProps,
  ExtendsTreePropsKey,
  SetTreePropsKey,
} from './Props'
import { ListProps } from '../AnimationList/Props'

const DefaultValue = {
  clearable: false,
  compressed: false,
  absolute: false,
  multiple: false,
  line: false,
  renderItem: <Item extends {}>(e: Item) => e,
  height: 300,
  data: [],
  defaultExpanded: [],
}

const ScaleList = List(['fade', 'scale-y'], 'fast')
interface ScaleListProps extends ListProps {
  focus: boolean
  autoAdapt?: boolean
  resetPosition?: (clean?: boolean) => void
}
const OptionList = absoluteList(({ focus, autoAdapt, resetPosition, ...other }: ScaleListProps) => (
  <ScaleList show={focus} {...other} />
))

const isDescendent = (el: Element, id: string): boolean => {
  if (el.getAttribute('data-id') === id) return true
  if (!el.parentElement) return false
  return isDescendent(el.parentElement, id)
}

interface TreeSelectState {
  focus: boolean
  position: RegularAttributes.ListPosition
}

export default class TreeSelect<Item, Value extends TreeSelectValueType> extends PureComponent<
  OriginTreeSelectProps<Item, Value>,
  TreeSelectState
> {
  static defaultProps = DefaultValue

  treeSelectId: string

  handleClick: any

  handleBlur: any

  resetAbsoluteListPosition: (clean?: boolean) => void

  inputReset: (fn: () => void) => void

  element: HTMLDivElement

  constructor(props: OriginTreeSelectProps<Item, Value>) {
    super(props)
    this.state = {
      focus: false,
      position: 'drop-down',
    }

    this.treeSelectId = `treeSelect_${getUidStr()}`
    this.onExpandHandler = this.onExpandHandler.bind(this)
    this.getResetPosition = this.getResetPosition.bind(this)
    this.setInputReset = this.setInputReset.bind(this)
    this.renderActive = this.renderActive.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.bindElement = this.bindElement.bind(this)
    this.handleClick = this.handleState.bind(this, true)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleBlur = this.handleState.bind(this, false)
    this.handleClear = this.handleClear.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleClickAway = this.handleClickAway.bind(this)
    this.shouldFocus = this.shouldFocus.bind(this)
    this.getDataByValues = this.getDataByValues.bind(this)
    const componentRef: ComponentRef<Item, Value> = {
      getDataByValues: this.getDataByValues,
    }
    if (props.getComponentRef) {
      if (isFunc(props.getComponentRef)) {
        props.getComponentRef(componentRef)
      } else {
        props.getComponentRef.current = componentRef
      }
    }
  }

  componentDidUpdate(_prevProps: OriginTreeSelectProps<Item, Value>, prevState: TreeSelectState) {
    const { onFilter, datum, mode } = this.props

    datum.mode = mode

    // clear filter
    if (prevState.focus !== this.state.focus && !this.state.focus && onFilter) {
      setTimeout(() => {
        onFilter('', 'blur')
      }, 400)
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.clearClickAway()
  }

  onExpandHandler(...args: [any]) {
    if (this.resetAbsoluteListPosition) {
      setTimeout(() => {
        this.resetAbsoluteListPosition(true)
      })
    }
    if (this.props.onExpand) {
      this.props.onExpand(...args)
    }
  }

  getText(key: string) {
    return this.props.empty || getLocale(key)
  }

  setInputReset(fn: (_fn: () => void) => void) {
    this.inputReset = fn
  }

  getValue() {
    const { datum, multiple } = this.props
    const value = datum.getValue()
    if (multiple) return value as Value
    return (value.length ? value[0] : '') as Value
  }

  getDataByValue(value?: KeygenResult | KeygenResult[]) {
    if (value === null || value === undefined) return value
    const { datum, multiple } = this.props
    if (multiple && Array.isArray(value)) {
      return value.map(id => datum.getDataById(id))
    }
    return datum.getDataById(value as string)
  }

  getDataByValues(values: Value) {
    type Result = Value extends any[] ? ResultItem<Item>[] : ResultItem<Item>
    const { datum } = this.props
    if (isArray(values)) {
      return values.map(id => datum.getDataById(id)) as Result
    }
    return datum.getDataById(values) as Result
  }

  getResetPosition(update: (clean?: boolean) => void) {
    this.resetAbsoluteListPosition = update
  }

  bindElement(el: HTMLDivElement) {
    this.element = el
  }

  shouldFocus(el: HTMLDivElement) {
    if (el.getAttribute('data-id') === this.treeSelectId) return true
    if (getParent(el, `.${treeSelectClass(getDirectionClass('result'))}`)) return true
    return false
  }

  bindClickAway() {
    document.addEventListener('mousedown', this.handleClickAway)
  }

  clearClickAway() {
    document.removeEventListener('mousedown', this.handleClickAway)
  }

  handleClickAway(e: any) {
    const desc = isDescendent(e.target, this.treeSelectId)
    if (!desc) {
      this.clearClickAway()
      this.props.onBlur(e)
      this.handleState(false, e)
    }
  }

  handleState(focus: boolean, e?: any) {
    if (this.props.disabled === true) return
    if (focus === this.state.focus) return
    // click close icon
    if (focus && e && (e.target as HTMLDivElement).classList.contains(treeSelectClass('close'))) return

    const { height = DefaultValue.height, onCollapse } = this.props
    let { position } = this.props
    const windowHeight = docSize.height
    const bottom = height + this.element.getBoundingClientRect().bottom
    if (bottom > windowHeight && !position) position = 'drop-up'

    if (onCollapse) onCollapse(focus)
    this.setState({ focus, position: position || 'drop-down' })

    if (focus) {
      this.bindClickAway()
      // onFocus()
    }
  }

  handleFocus(e: React.FocusEvent<HTMLDivElement>) {
    if (!this.shouldFocus(e.target)) return
    this.props.onFocus(e)
    this.bindClickAway()
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const { onEnterExpand } = this.props
    if (e.keyCode === 13) {
      e.preventDefault()
      // enter only can open
      if (!this.state.focus) {
        if (typeof onEnterExpand === 'function') {
          const canOpen = onEnterExpand(e)
          if (canOpen === false) return
        }
        this.handleState(true)
      }
    }

    // fot close the list
    if (e.keyCode === 9) {
      this.props.onBlur()
      // e.preventDefault()
      if (this.state.focus) {
        this.handleState(false, e)
      } else {
        this.clearClickAway()
      }
    }
  }

  handleRemove(data: ResultItem<Item>) {
    const { datum } = this.props
    const dataKey = data && datum.isUnMatch(data) ? (data as UnMatchedValue).value : datum.getKey(data as Item)
    datum.set(dataKey as string, 0)
    this.handleChange(data as Item, datum.getKey(data as Item))
  }

  handleChange(data: Item, id: string | number) {
    const { datum, multiple, disabled, onChange, onChangeAddition } = this.props
    if (disabled === true || datum.isDisabled(id)) return
    const current = datum.getDataById(id) as Item
    if (!multiple) {
      datum.setValue([])
      datum.set(datum.getKey(data), 1)
      this.handleState(false)
    }
    const value = this.getValue()
    if (onChange) onChange(value, current, id ? (datum.getPath(id) || {}).path : undefined)

    if (typeof onChangeAddition === 'function') {
      onChangeAddition({
        data: this.getDataByValue(value) as Item,
        checked: multiple ? datum.get(id) : undefined,
        current,
      })
    }
  }

  handleClear() {
    const { multiple, onChangeAddition } = this.props
    this.props.datum.setValue([])
    this.props.onChange((multiple ? [] : '') as Value)
    if (typeof onChangeAddition === 'function') {
      onChangeAddition({
        data: multiple ? [] : null,
      })
    }
    this.handleState(false)
    this.element.focus()
  }

  // only as default renderResult
  renderItem(data: Item) {
    const { renderItem } = this.props
    return typeof renderItem === 'function' ? (renderItem as any)(data) : data[renderItem as keyof Item]
  }

  renderActive(data: Item, expanded: boolean, active: boolean, id: KeygenResult) {
    const { renderItem, datum } = this.props
    const item = (typeof renderItem === 'function'
      ? renderItem(data, expanded, active, id)
      : data[renderItem as keyof Item]) as React.ReactNode

    return (
      <span
        title={typeof item === 'string' ? item : undefined}
        className={treeSelectClass(
          'content-wrapper',
          active && 'selected',
          datum.isDisabled(datum.getKey(data)) && getDirectionClass('disabled')
        )}
      >
        {item}
      </span>
    )
  }

  renderTreeOptions() {
    const { focus, position } = this.state
    const { multiple, datum, data, absolute, height, zIndex, compressed, value } = this.props
    const props: SetTreeProps<Item, Value> = {}
    const TreeKeys: SetTreePropsKey[] = [
      'mode',
      'data',
      'datum',
      'defaultExpanded',
      'defaultExpandAll',
      'disabled',
      'expanded',
      'keygen',
      'loader',
      'onExpand',
      'renderItem',
      'line',
      'parentClickExpand',
      'childrenKey',
      'expandIcons',
    ]

    TreeKeys.forEach((k: ExtendsTreePropsKey) => {
      ;(props as any)[k] = this.props[k]
    })
    props.value = datum.getValue() as ValueArr<Value>
    if (multiple) {
      // @ts-ignore only use second param
      props.onChange = this.handleChange
    } else {
      props.onClick = this.handleChange
      props.renderItem = this.renderActive
      props.active = props.value.length ? props.value[0] : undefined
    }
    const content =
      data!.length === 0 ? (
        <span className={treeSelectClass(getDirectionClass('option'))}>{this.getText('noData')}</span>
      ) : (
        <Tree
          className={treeSelectClass(!multiple && 'single')}
          {...props}
          dataUpdate={false}
          onExpand={this.onExpandHandler}
        />
      )
    return (
      <OptionList
        getResetPosition={this.getResetPosition}
        absolute={absolute}
        rootClass={treeSelectClass(position, isRTL() && 'rtl')}
        parentElement={this.element}
        position={position}
        focus={focus}
        data-id={this.treeSelectId}
        className={treeSelectClass('options')}
        style={{ maxHeight: height, overflowY: 'auto' }}
        fixed="min"
        zIndex={zIndex}
        value={multiple && !compressed ? value : undefined}
      >
        <div className={treeSelectClass('tree-wrapper')}>{content}</div>
      </OptionList>
    )
  }

  render() {
    const {
      placeholder,
      onFilter,
      compressed,
      compressedBound,
      multiple,
      datum,
      clearable,
      disabled,
      size,
      filterText,
      result,
      renderUnmatched,
      innerTitle,
      keygen,
      data,
    } = this.props
    const className = treeSelectClass(
      'inner',
      size,
      this.state.focus && 'focus',
      this.state.position,
      multiple && 'multiple',
      disabled === true && getDirectionClass('disabled')
    )
    const renderResult = this.props.renderResult || this.renderItem

    return (
      <div
        // eslint-disable-next-line
        tabIndex={disabled === true ? -1 : 0}
        ref={this.bindElement}
        className={className}
        data-id={this.treeSelectId}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
      >
        <Result
          filterText={filterText}
          onClear={clearable ? this.handleClear : undefined}
          onRemove={this.handleRemove}
          onFilter={onFilter}
          result={result}
          disabled={disabled}
          datum={datum}
          focus={this.state.focus}
          multiple={multiple}
          placeholder={placeholder}
          renderResult={renderResult}
          setInputReset={this.setInputReset}
          compressed={compressed}
          compressedBound={compressedBound}
          renderUnmatched={renderUnmatched}
          innerTitle={innerTitle}
          keygen={keygen}
          data={data}
        />
        {this.renderTreeOptions()}
      </div>
    )
  }
}
