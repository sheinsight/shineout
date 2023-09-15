import React, { ReactNode } from 'react'
import { SUBMIT_TOPIC } from '../Datum/types'
import { PureComponent } from '../component'
import { getUidStr } from '../utils/uid'
import { selectClass } from './styles'
import Result from './Result'
import OptionList from './OptionList'
import OptionTree from './OptionTree'
import BoxList from './BoxList'
import { isObject } from '../utils/is'
import { docSize } from '../utils/dom/document'
import { getParent } from '../utils/dom/element'
import { isRTL } from '../config'
import absoluteList from '../AnimationList/AbsoluteList'
import { getDirectionClass } from '../utils/classname'
import { RegularAttributes, ResultItem, UnMatchedValue } from '../@types/common'
import { BaseSelectProps, Control, WrappedBoxListComp, WrappedOptionListComp, WrappedOptionTreeComp } from './Props'

const WrappedOptionList = absoluteList(OptionList) as typeof WrappedOptionListComp
const WrappedBoxList = absoluteList(BoxList) as typeof WrappedBoxListComp
const WrappedOptionTree = absoluteList(OptionTree) as typeof WrappedOptionTreeComp

const isResult = (el: HTMLDivElement, selector?: string) => getParent(el, selector || `.${selectClass('result')}`)

const DefaultValue = {
  clearable: false,
  data: [],
  height: 250,
  itemsInView: 10,
  lineHeight: 34,
  loading: false,
  multiple: false,
  renderItem: (e: any) => e,
  text: {},
  compressed: false,
  trim: true,
  autoAdapt: false,
  showArrow: true,
  focusSelected: true,
}

interface SelectState {
  control: Control
  focus: boolean
  position: RegularAttributes.ListPosition
}

class Select<Item, Value> extends PureComponent<BaseSelectProps<Item, Value>, SelectState> {
  static defaultProps = DefaultValue

  blurHandler: (() => void) | null

  renderPending: boolean

  optionList: {
    handleHover?: (index?: number, force?: boolean) => void
    hoverMove?: (step: number) => void
    getIndex?: () => number
  }

  selectId: string

  mouseDown: boolean

  lastResult: undefined

  lastFoucs: boolean

  focusInput: null | ((flag?: boolean) => void)

  inputReset: () => void

  element: HTMLDivElement

  blured: boolean

  inputBlurTimer: NodeJS.Timer | null

  lastChangeIsOptionClick: boolean

  handleRemove: (data: ResultItem<Item>, fromInput?: boolean) => void

  inputLocked: boolean

  keyLocked: boolean

  cancelDeleteLockTimer: NodeJS.Timer

  deleteLock: boolean

  constructor(props: BaseSelectProps<Item, Value>) {
    super(props)

    this.state = {
      control: 'mouse',
      focus: false,
      position: 'drop-down',
    }

    this.bindElement = this.bindElement.bind(this)
    this.bindOptionFunc = this.bindOptionFunc.bind(this)
    this.setInputReset = this.setInputReset.bind(this)
    this.shouldFocus = this.shouldFocus.bind(this)

    this.handleClick = this.handleClick.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleChange.bind(this, false)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleControlChange = this.handleControlChange.bind(this)
    this.handleClickAway = this.handleClickAway.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.bindFocusInputFunc = this.bindFocusInputFunc.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    // this.toInputTriggerCollapse = this.toInputTriggerCollapse.bind(this)

    this.renderItem = this.renderItem.bind(this)
    this.renderResult = this.renderResult.bind(this)

    this.handleDelete = this.handleDelete.bind(this)

    // option list not render till first focused
    this.renderPending = props.open !== true

    this.optionList = {}

    this.selectId = `select_${getUidStr()}`
    // this.closeByResult = false
    this.mouseDown = false

    // this.lastResult = undefined

    this.focusInput = null
  }

  componentDidMount() {
    super.componentDidMount()
    this.setOpenEvent()
    const { formDatum } = this.props
    if (formDatum) {
      formDatum.subscribe(SUBMIT_TOPIC, this.forceChange)
    }
  }

  componentDidUpdate(prevProps: BaseSelectProps<Item, Value>, prevState: SelectState) {
    this.setOpenEvent()
    const { onFilter } = this.props
    // clear filter
    if (onFilter) {
      if (
        (prevState.focus !== this.state.focus && !this.state.focus) ||
        (prevProps.open !== this.props.open && !this.props.open)
      ) {
        setTimeout(() => {
          onFilter('')
        }, 400)
      }
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    const { formDatum } = this.props
    if (formDatum) {
      formDatum.unsubscribe(SUBMIT_TOPIC, this.forceChange)
    }
    this.clearClickAway()
  }

  get focus() {
    if ('open' in this.props) {
      return !!this.props.open
    }
    return this.state.focus
  }

  setOpenEvent() {
    const focus = this.focus || this.props.inputFocus
    if (this.lastFoucs !== focus)
      if (focus) {
        this.bindClickAway()
      } else if (this.lastFoucs !== undefined) {
        this.clearClickAway()
      }
    this.lastFoucs = focus
  }

  getDisabledStatus() {
    if (typeof this.props.disabled === 'function') {
      return this.props.disabled
    }
    return !!this.props.disabled
  }

  getFocusSelected() {
    const { reFocus, focusSelected } = this.props
    if (reFocus) return false
    return focusSelected
  }

  setInputReset(fn: () => void) {
    this.inputReset = fn
  }

  forceChange = () => {
    if (this.inputBlurTimer && this.blurHandler) {
      clearTimeout(this.inputBlurTimer)
      this.blurHandler()
    }
  }

  // @ts-ignore
  isDescendent(el, id) {
    // const stay = el.classList.contains(selectClass('input')) || el.classList.contains(selectClass('item'))
    // if (stay) this.optionsHold = true
    // if (el.classList.contains(selectClass('result')) && this.optionsHold === null && this.state.focus) {
    //   this.closeByResult = true
    //   this.optionsHold = false
    // }
    if (el.getAttribute('data-id') === id) return true
    // in label
    if (
      el.tagName === 'LABEL' &&
      el.htmlFor &&
      el.contains(this.element) &&
      el.contains(document.getElementById(el.htmlFor))
    ) {
      return true
    }
    if (!el.parentElement) return false
    return this.isDescendent(el.parentElement, id)
  }

  bindOptionFunc(name: 'handleHover' | 'hoverMove' | 'getIndex', fn: any) {
    this.optionList[name] = fn
  }

  bindFocusInputFunc(fn: (flag: boolean) => void) {
    this.focusInput = fn
  }

  bindElement(el: HTMLDivElement) {
    this.element = el
  }

  bindClickAway() {
    document.addEventListener('click', this.handleClickAway, true)
  }

  clearClickAway() {
    document.removeEventListener('click', this.handleClickAway, true)
  }

  handleClickAway(e: any) {
    const desc = this.isDescendent(e.target, this.selectId)
    if (!desc) {
      if (!getParent(e.target, `[data-id=${this.selectId}]`)) {
        this.blured = true
        this.props.onBlur()
        if (this.element) this.element.blur()
      }
      this.handleState(false, null)
    }
  }

  handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const { onCreate, onFilter } = this.props
    const plain = !onCreate && !onFilter
    const target = e.target as HTMLDivElement
    if (this.focus) {
      if ((plain && isResult(target)) || isResult(target, `.${selectClass('caret')}`)) {
        this.handleState(false, e)
        return
      }
    }
    this.handleState(true, e)
  }

  handleState(focus: boolean, e?: any) {
    if (this.getDisabledStatus() === true) return
    if (focus === this.focus) return
    // click close icon
    if (focus && e && e.target.classList.contains(selectClass('close'))) return
    const { height = DefaultValue.height, onCollapse } = this.props
    let { position } = this.props
    if (!position) {
      const windowHeight = docSize.height
      const rectElement = this.element.parentElement || this.element
      const rect = rectElement.getBoundingClientRect()
      // 计算时要算上 marginTop/marginBottom 4
      const margin = 4
      const bottom = height + rect.bottom + margin
      const canDropUp = rect.top > windowHeight - rect.bottom
      if (bottom > windowHeight && canDropUp) position = 'drop-up'
    }
    if (onCollapse) onCollapse(focus)
    this.setState({ focus, position: position || 'drop-down' })

    if (focus) {
      this.blured = false
      this.renderPending = false
    }
  }

  handleControlChange(control: 'mouse' | 'keyboard') {
    if (control !== this.state.control) this.setState({ control })
  }

  handleChange(_isActive: boolean, data: ResultItem<Item>, fromInput?: boolean) {
    const { datum, multiple, emptyAfterSelect, onFilter, filterText, onCreate, reFocus } = this.props
    if (this.getDisabledStatus() === true) return

    // if click option, ignore blur event
    if (this.inputBlurTimer) {
      this.lastChangeIsOptionClick = true
      clearTimeout(this.inputBlurTimer)
      this.inputBlurTimer = null
    }
    const unMatchedData: UnMatchedValue = data as UnMatchedValue
    if (multiple) {
      if (isObject(unMatchedData) && unMatchedData.IS_NOT_MATCHED_VALUE) {
        datum.remove(unMatchedData)
      } else {
        const checked = !datum.check(data as Item)
        if (checked) {
          datum.add(data as Item)
        } else {
          if (fromInput === true) return
          datum.remove(data)
        }
        if (this.inputReset) this.inputReset()
      }
    } else {
      datum.set(data as Item)
      if (!reFocus) this.handleState(false)
      //  let the element focus
      setTimeout(() => {
        if (reFocus && this.focusInput) this.focusInput(true)
        if (onCreate && this.blured) return
        if (this.element) this.element.focus()
      }, 10)
    }

    if (emptyAfterSelect && onFilter && filterText) onFilter('', 'select')
  }

  // toInputTriggerCollapse(text) {
  //   const { onCreate, datum } = this.props
  //   if (onCreate) {
  //     datum.set(onCreate(text))
  //   }
  //   this.handleState(true)
  // }

  shouldFocus(el: HTMLDivElement) {
    if (el.getAttribute('data-id') === this.selectId) return true
    if (getParent(el, `.${selectClass('result')}`)) return true
    return false
  }

  handleFocus(e: React.FocusEvent<HTMLDivElement>) {
    if (!this.shouldFocus(e.target)) return
    this.props.onFocus(e)
  }

  handleInputFocus() {
    const { hideCreateOption, onCreate } = this.props
    this.inputLocked = true
    const noHover = onCreate && hideCreateOption
    if (this.props.inputable && this.state.control === 'keyboard' && !noHover) {
      if (this.optionList.handleHover) this.optionList.handleHover(0, true)
    }
  }

  handleInputBlur(text: string) {
    const { onFilter, onCreate, multiple, filterSingleSelect, data } = this.props
    if (onFilter && text && filterSingleSelect && data.length === 1) {
      this.handleChange(false, data[0], false)
      return
    }
    if (!onCreate) return
    if (multiple && !text) return

    if (this.lastChangeIsOptionClick) return

    this.blurHandler = () => {
      const retData = (onCreate as Function)(text)
      this.handleChange(false, retData, true)
    }

    // if click option, ignore input blur
    this.inputBlurTimer = setTimeout(() => {
      if (this.blurHandler) this.blurHandler()
      this.blurHandler = null
    }, 200)
  }

  handleClear() {
    this.props.datum.setValue(([] as unknown) as Value)
    this.element.focus()

    if (this.focus === false) {
      this.forceUpdate()
    } else {
      this.handleState(false)
    }
  }

  handleHideOption() {
    const { datum, innerData } = this.props
    const checked = datum.check(innerData)
    if (checked) {
      if (this.inputReset) this.inputReset()
      return
    }
    this.handleChange(true, innerData)
  }

  handleEnter() {
    const { onCreate, hideCreateOption } = this.props
    const hoverIndex = this.optionList.getIndex && this.optionList.getIndex()
    if (onCreate && hideCreateOption && hoverIndex === -1) {
      this.handleHideOption()
      return
    }
    let data = this.props.data[hoverIndex!]
    if (!data) {
      // eslint-disable-next-line prefer-destructuring
      data = this.props.data[0]
    }
    if (data && !data[this.props.groupKey as keyof Item]) {
      const checked = !this.props.datum.check(data)
      this.handleChange(checked, data)
      if (this.optionList.handleHover) this.optionList.handleHover(hoverIndex)
    }
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const { onEnterExpand } = this.props
    this.keyLocked = true
    // just for enter to open the list
    if ((e.keyCode === 13 || e.keyCode === 40) && !this.focus) {
      e.preventDefault()
      if (typeof onEnterExpand === 'function') {
        const canOpen = onEnterExpand(e)
        if (canOpen === false) return
      }
      this.handleClick((e as unknown) as React.MouseEvent<HTMLDivElement>)
      return
    }

    // fot close the list
    if (e.keyCode === 9) {
      this.props.onBlur(e as any)
      // e.preventDefault()
      if (this.focus) this.handleState(false, e)
      else this.clearClickAway()
      return
    }

    // no focus no event
    if (!this.focus) return

    this.handleControlChange('keyboard')

    switch (e.keyCode) {
      case 38:
        if (this.optionList.hoverMove) this.optionList.hoverMove(-1)
        e.preventDefault()
        break
      case 40:
        if (this.optionList.hoverMove) this.optionList.hoverMove(1)
        e.preventDefault()
        break
      case 13:
        this.handleEnter()
        e.preventDefault()
        e.stopPropagation()
        break
      case 8:
        this.handleDelete(e)
        break
      default:
        this.lastChangeIsOptionClick = false
    }
  }

  handleKeyUp() {
    this.keyLocked = false
  }

  cancelDeleteLock() {
    if (this.cancelDeleteLockTimer) {
      clearTimeout(this.cancelDeleteLockTimer)
    }
    this.cancelDeleteLockTimer = setTimeout(() => {
      this.deleteLock = false
    }, 400)
  }

  handleDelete(e: React.KeyboardEvent<HTMLDivElement>) {
    const { multiple, inputText, datum, value, data } = this.props
    if (!multiple) return
    if (inputText) {
      this.deleteLock = true
    } else if (this.deleteLock) {
      this.cancelDeleteLock()
    }
    if (inputText || this.deleteLock) return
    if (!value || (Array.isArray(value) && !value.length)) return
    e.preventDefault()
    const raws = Array.isArray(value) ? value : [value]
    const values = [...raws]
    const last = values.pop()
    datum.handleChange(values, datum.getDataByValue(data, last!), false)
  }

  handleFilter(...args: [string]) {
    const { onFilter, onCreate, hideCreateOption } = this.props
    const hideCreate = onCreate && hideCreateOption
    if (onCreate && !hideCreateOption) {
      // 创建选项的时候 选择第一个
      if (this.optionList.handleHover) this.optionList.handleHover(0, true)
    }
    if (hideCreate) {
      if (this.optionList.handleHover) this.optionList.handleHover(-1, true)
    }
    if (onFilter) {
      onFilter(...args)
    }
  }

  renderItem(data: Item, index: number) {
    const { renderItem } = this.props
    return typeof renderItem === 'function'
      ? renderItem(data, index)
      : ((data[renderItem as keyof Item] as unknown) as ReactNode)
  }

  renderResult(data: Item, index: number) {
    const { renderResult } = this.props
    if (!renderResult) return this.renderItem(data, index)
    return typeof renderResult === 'function' ? renderResult(data, index) : data[renderResult]
  }

  /**
   * custom options list header
   */
  renderCustomHeader() {
    const { header } = this.props
    if (React.isValidElement(header)) return <div className={selectClass('custom-header')}>{header}</div>
    return null
  }

  renderTree() {
    const { position } = this.state
    const { optionWidth } = this.props
    const props = {
      treeData: this.props.treeData!,
      expanded: this.props.expanded,
      onExpand: this.props.onExpand,
      loader: this.props.loader,
      defaultExpanded: this.props.defaultExpanded,
      defaultExpandAll: this.props.defaultExpandAll,
      datum: this.props.datum,
      keygen: this.props.keygen,
      multiple: this.props.multiple,
      text: this.props.text,
      height: this.props.height,
      loading: this.props.loading,
      onFilter: this.props.onFilter,
      filterText: this.props.filterText,
      absolute: this.props.absolute,
      zIndex: this.props.zIndex,
      childrenKey: this.props.childrenKey,
      expandIcons: this.props.expandIcons,
      emptyText: this.props.emptyText,
      renderOptionList: this.props.renderOptionList,
      renderItem: this.renderItem,
    }
    const style: React.CSSProperties = optionWidth ? { width: optionWidth, display: 'block' } : { display: 'none' }
    return (
      <WrappedOptionTree
        onChange={this.handleChange}
        parentElement={this.element}
        position={position}
        rootClass={selectClass(position, isRTL() && 'rtl')}
        selectId={this.selectId}
        focus={this.focus}
        renderPending={this.renderPending}
        fixed="min"
        {...props}
        style={style}
        customHeader={this.renderCustomHeader()}
      />
    )
  }

  renderList() {
    const { control, position } = this.state
    const { autoAdapt, value, optionWidth } = this.props
    const props = {
      data: this.props.data,
      datum: this.props.datum,
      keygen: this.props.keygen,
      multiple: this.props.multiple,
      columns: this.props.columns,
      columnWidth: this.props.columnWidth,
      columnsTitle: this.props.columnsTitle,
      text: this.props.text,
      itemsInView: this.props.itemsInView || DefaultValue.itemsInView,
      absolute: this.props.absolute,
      lineHeight: this.props.lineHeight || DefaultValue.lineHeight,
      height: this.props.height || DefaultValue.height,
      loading: this.props.loading,
      onFilter: this.props.onFilter,
      filterText: this.props.filterText,
      zIndex: this.props.zIndex,
      groupKey: this.props.groupKey,
      hideCreateOption: this.props.hideCreateOption,
      emptyText: this.props.emptyText,
      renderOptionList: this.props.renderOptionList,
    }
    const style: React.CSSProperties = optionWidth ? { width: optionWidth } : {}
    if ((typeof props.columns === 'number' && props.columns! >= 1) || props.columns === -1) {
      return (
        <WrappedBoxList
          {...props}
          columns={props.columns}
          style={style}
          rootClass={selectClass(position, isRTL() && 'rtl')}
          autoClass={selectClass(autoAdapt && 'auto-adapt')}
          bindOptionFunc={this.bindOptionFunc}
          renderPending={this.renderPending}
          focus={this.focus}
          selectId={this.selectId}
          onChange={this.handleChange}
          renderItem={this.renderItem}
          parentElement={this.element}
          position={position}
          fixed={autoAdapt ? 'min' : true}
          value={value}
          customHeader={this.renderCustomHeader()}
        />
      )
    }
    return (
      <WrappedOptionList<Item, Value>
        {...props}
        style={style}
        rootClass={selectClass(position, isRTL() && 'rtl')}
        autoClass={selectClass(autoAdapt && 'auto-adapt')}
        bindOptionFunc={this.bindOptionFunc}
        renderPending={this.renderPending}
        focus={this.focus}
        control={control}
        selectId={this.selectId}
        onControlChange={this.handleControlChange}
        onChange={this.handleChange}
        renderItem={this.renderItem}
        parentElement={this.element}
        position={position}
        fixed={autoAdapt ? 'min' : true}
        value={value}
        customHeader={this.renderCustomHeader()}
      />
    )
  }

  renderOptions() {
    const { treeData } = this.props
    if (treeData) return this.renderTree()
    return this.renderList()
  }

  render() {
    const {
      placeholder,
      multiple,
      clearable,
      size,
      datum,
      filterText,
      onCreate,
      compressed,
      compressedBound,
      trim,
      renderUnmatched,
      showArrow,
      compressedClassName,
      resultClassName,
      maxLength,
      innerTitle,
      keygen,
      convertBr,
      data = DefaultValue.data,
      onFilter,
      treeData,
    } = this.props
    const disabled = this.getDisabledStatus()
    const className = selectClass(
      'inner',
      size,
      this.focus && 'focus',
      this.state.position,
      multiple && 'multiple',
      disabled === true && getDirectionClass('disabled'),
      !trim && 'pre'
    )
    return (
      <div
        // eslint-disable-next-line
        tabIndex={disabled === true ? -1 : 0}
        ref={this.bindElement}
        className={className}
        data-id={this.selectId}
        onFocus={this.handleFocus}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
      >
        <Result
          trim={trim}
          maxLength={maxLength}
          filterText={filterText}
          onClear={clearable ? this.handleClear : undefined}
          onCreate={onCreate}
          onRemove={this.handleRemove}
          onFilter={onFilter ? this.handleFilter : undefined}
          datum={datum}
          disabled={disabled}
          focus={this.focus}
          values={datum.values}
          getResultByValue={this.props.getResultByValue}
          multiple={multiple}
          placeholder={placeholder}
          renderResult={this.renderResult}
          renderUnmatched={renderUnmatched}
          onInputBlur={this.handleInputBlur}
          onInputFocus={this.handleInputFocus}
          setInputReset={this.setInputReset}
          bindFocusInputFunc={this.bindFocusInputFunc}
          // collapse={this.toInputTriggerCollapse}
          compressed={compressed}
          compressedBound={compressedBound}
          showArrow={showArrow}
          focusSelected={this.getFocusSelected()}
          compressedClassName={compressedClassName}
          resultClassName={resultClassName}
          innerTitle={innerTitle}
          keygen={keygen}
          data={treeData || data}
          convertBr={convertBr}
        />
        {this.renderOptions()}
      </div>
    )
  }
}

export default Select
