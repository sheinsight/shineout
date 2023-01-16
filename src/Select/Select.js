import React from 'react'
import PropTypes from 'prop-types'
import { SUBMIT_TOPIC } from '../Datum/types'
import { PureComponent } from '../component'
import { getProps } from '../utils/proptypes'
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

const WrappedOptionList = absoluteList(OptionList)
const WrappedBoxList = absoluteList(BoxList)
const WrappedOptionTree = absoluteList(OptionTree)

const isResult = (el, selector) => getParent(el, selector || `.${selectClass('result')}`)

class Select extends PureComponent {
  constructor(props) {
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
    this.handleBlur = this.handleState.bind(this, false)
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
    this.renderPending = true

    this.optionList = {}
    this.selectId = `select_${getUidStr()}`
    // this.closeByResult = false
    this.mouseDown = false

    this.lastResult = undefined

    this.focusInput = null
  }

  componentDidMount() {
    super.componentDidMount()
    const { formDatum } = this.props
    if (formDatum) {
      formDatum.subscribe(SUBMIT_TOPIC, this.forceChange)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { onFilter } = this.props

    // clear filter
    if (prevState.focus !== this.state.focus && !this.state.focus && onFilter) {
      setTimeout(() => {
        onFilter('', 'blur')
      }, 400)
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

  setInputReset(fn) {
    this.inputReset = fn
  }

  forceChange = () => {
    if (this.inputBlurTimer && this.blurHandler) {
      clearTimeout(this.inputBlurTimer)
      this.blurHandler()
    }
  }

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

  bindOptionFunc(name, fn) {
    this.optionList[name] = fn
  }

  bindFocusInputFunc(fn) {
    this.focusInput = fn
  }

  bindElement(el) {
    this.element = el
  }

  bindClickAway() {
    document.addEventListener('click', this.handleClickAway, true)
  }

  clearClickAway() {
    document.removeEventListener('click', this.handleClickAway, true)
  }

  handleClickAway(e) {
    const desc = this.isDescendent(e.target, this.selectId)
    if (!desc) {
      if (!getParent(e.target, `[data-id=${this.selectId}]`)) {
        this.blured = true
        this.props.onBlur()
        this.clearClickAway()
        if (this.element) this.element.blur()
      }
      this.handleState(false, null)
    }
  }

  handleClick(e) {
    const { onCreate, onFilter } = this.props
    const plain = !onCreate && !onFilter
    if (this.state.focus) {
      if ((plain && isResult(e.target)) || isResult(e.target, `.${selectClass('caret')}`)) {
        this.handleState(false, e)
        return
      }
    }
    this.handleState(true, e)
  }

  handleState(focus, e) {
    if (this.getDisabledStatus() === true) return
    if (focus === this.state.focus) return
    // click close icon
    if (focus && e && e.target.classList.contains(selectClass('close'))) return

    const { height, onCollapse } = this.props
    let { position } = this.props
    const windowHeight = docSize.height
    const bottom = height + this.element.getBoundingClientRect().bottom
    if (bottom > windowHeight && !position) position = 'drop-up'

    if (onCollapse) onCollapse(focus)
    this.setState({ focus, position: position || 'drop-down' })

    if (focus) {
      this.blured = false
      this.renderPending = false
    }
  }

  handleControlChange(control) {
    if (control !== this.state.control) this.setState({ control })
  }

  handleChange(_, data, fromInput) {
    const { datum, multiple, emptyAfterSelect, onFilter, filterText, onCreate, reFocus } = this.props
    if (this.getDisabledStatus() === true) return

    // if click option, ignore blur event
    if (this.inputBlurTimer) {
      this.lastChangeIsOptionClick = true
      clearTimeout(this.inputBlurTimer)
      this.inputBlurTimer = null
    }

    if (multiple) {
      if (isObject(data) && data.IS_NOT_MATCHED_VALUE) {
        datum.remove(data)
      } else {
        const checked = !datum.check(data)
        if (checked) {
          datum.add(data)
        } else {
          if (fromInput === true) return
          datum.remove(data)
        }
        if (this.inputReset) this.inputReset()
      }
    } else {
      datum.set(data)
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

  shouldFocus(el) {
    if (el.getAttribute('data-id') === this.selectId) return true
    if (getParent(el, `.${selectClass('result')}`)) return true
    return false
  }

  handleFocus(e) {
    if (!this.shouldFocus(e.target)) return
    this.props.onFocus(e)
    this.bindClickAway()
  }

  handleInputFocus() {
    const { hideCreateOption, onCreate } = this.props
    this.inputLocked = true
    const noHover = onCreate && hideCreateOption
    if (this.props.inputable && this.state.control === 'keyboard' && !noHover) {
      if (this.optionList.handleHover) this.optionList.handleHover(0, true)
    }
  }

  handleInputBlur(text) {
    const { onFilter, onCreate, multiple, filterSingleSelect, data } = this.props
    if (onFilter && text && filterSingleSelect && data.length === 1) {
      this.handleChange(null, data[0], false)
      return
    }
    if (!onCreate) return
    if (multiple && !text) return

    if (this.lastChangeIsOptionClick) return

    this.blurHandler = () => {
      const retData = onCreate(text)
      this.handleChange(null, retData, true)
    }

    // if click option, ignore input blur
    this.inputBlurTimer = setTimeout(() => {
      this.blurHandler()
      this.blurHandler = null
    }, 200)
  }

  handleClear() {
    this.props.datum.setValue([])
    this.element.focus()

    if (this.state.focus === false) {
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
    let data = this.props.data[hoverIndex]
    if (!data) {
      // eslint-disable-next-line prefer-destructuring
      data = this.props.data[0]
    }
    if (data && !data[this.props.groupKey]) {
      const checked = !this.props.datum.check(data)
      this.handleChange(checked, data)
      if (this.optionList.handleHover) this.optionList.handleHover(hoverIndex)
    }
  }

  handleKeyDown(e) {
    const { onEnterExpand } = this.props
    this.keyLocked = true

    // just for enter to open the list
    if ((e.keyCode === 13 || e.keyCode === 40) && !this.state.focus) {
      e.preventDefault()
      if (typeof onEnterExpand === 'function') {
        const canOpen = onEnterExpand(e)
        if (canOpen === false) return
      }
      this.handleClick(e)
      return
    }

    // fot close the list
    if (e.keyCode === 9) {
      this.props.onBlur(e)
      // e.preventDefault()
      if (this.state.focus) this.handleState(false, e)
      else this.clearClickAway()
      return
    }

    // no focus no event
    if (!this.state.focus) return

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

  handleDelete(e) {
    const { multiple, inputText, datum, value, data } = this.props
    if (!multiple) return
    if (inputText) {
      this.deleteLock = true
    } else if (this.deleteLock) {
      this.cancelDeleteLock()
    }
    if (inputText || this.deleteLock) return
    if (!value || !value.length) return
    e.preventDefault()
    const raws = Array.isArray(value) ? value : [value]
    const values = [...raws]
    const last = values.pop()
    datum.handleChange(values, datum.getDataByValue(data, last), false)
  }

  handleFilter(...args) {
    const { onFilter, onCreate, hideCreateOption } = this.props
    const hideCreate = onCreate && hideCreateOption
    if (hideCreate) {
      this.optionList.handleHover(-1, true)
    }
    if (onFilter) {
      onFilter(...args)
    }
  }

  renderItem(data, index) {
    const { renderItem } = this.props
    return typeof renderItem === 'function' ? renderItem(data, index) : data[renderItem]
  }

  renderResult(data, index) {
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
    const { focus, position } = this.state
    const { optionWidth } = this.props
    const props = {}
    ;[
      'treeData',
      'expanded',
      'onExpand',
      'loader',
      'defaultExpanded',
      'defaultExpandAll',
      'datum',
      'keygen',
      'multiple',
      'text',
      'height',
      'loading',
      'onFilter',
      'filterText',
      'absolute',
      'zIndex',
      'childrenKey',
      'expandIcons',
      'emptyText',
      'renderOptionList',
    ].forEach(k => {
      props[k] = this.props[k]
    })
    const style = optionWidth && { width: optionWidth }
    props.renderItem = this.renderItem
    return (
      <WrappedOptionTree
        onChange={this.handleChange}
        parentElement={this.element}
        position={position}
        rootClass={selectClass(position, isRTL() && 'rtl')}
        selectId={this.selectId}
        focus={focus}
        renderPending={this.renderPending}
        fixed="min"
        {...props}
        style={style}
        customHeader={this.renderCustomHeader()}
      />
    )
  }

  renderList() {
    const { focus, control, position } = this.state
    const { autoAdapt, value, optionWidth } = this.props
    const props = {}
    ;[
      'data',
      'datum',
      'keygen',
      'multiple',
      'columns',
      'columnWidth',
      'columnsTitle',
      'text',
      'itemsInView',
      'absolute',
      'lineHeight',
      'height',
      'loading',
      'onFilter',
      'filterText',
      'zIndex',
      'groupKey',
      'hideCreateOption',
      'emptyText',
      'renderOptionList',
    ].forEach(k => {
      props[k] = this.props[k]
    })

    const List = props.columns >= 1 || props.columns === -1 ? WrappedBoxList : WrappedOptionList
    const style = optionWidth && { width: optionWidth }
    return (
      <List
        {...props}
        style={style}
        rootClass={selectClass(position, isRTL() && 'rtl')}
        autoClass={selectClass(autoAdapt && 'auto-adapt')}
        bindOptionFunc={this.bindOptionFunc}
        renderPending={this.renderPending}
        focus={focus}
        control={control}
        selectId={this.selectId}
        onControlChange={this.handleControlChange}
        onChange={this.handleChange}
        renderItem={this.renderItem}
        parentElement={this.element}
        position={position}
        onBlur={this.handleBlur}
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
      result,
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
      data,
      onFilter,
      treeData,
    } = this.props
    const disabled = this.getDisabledStatus()
    const className = selectClass(
      'inner',
      size,
      this.state.focus && 'focus',
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
          onFilter={onFilter && this.handleFilter}
          datum={datum}
          disabled={disabled}
          focus={this.state.focus}
          result={result}
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

Select.propTypes = {
  ...getProps(PropTypes, 'placehodler', 'keygen'),
  absolute: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  clearable: PropTypes.bool,
  columns: PropTypes.number,
  data: PropTypes.array,
  treeData: PropTypes.array,
  datum: PropTypes.object.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  filterText: PropTypes.string,
  height: PropTypes.number,
  itemsInView: PropTypes.number,
  lineHeight: PropTypes.number,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  multiple: PropTypes.bool,
  onBlur: PropTypes.func,
  onCreate: PropTypes.func,
  onFilter: PropTypes.func,
  onFocus: PropTypes.func,
  position: PropTypes.string,
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  result: PropTypes.array,
  size: PropTypes.string,
  text: PropTypes.object,
  compressed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  compressedBound: PropTypes.number,
  trim: PropTypes.bool,
  autoAdapt: PropTypes.bool,
  filterSingleSelect: PropTypes.bool,
  renderUnmatched: PropTypes.func,
  emptyAfterSelect: PropTypes.bool,
  showArrow: PropTypes.bool,
  focusSelected: PropTypes.bool,
  compressedClassName: PropTypes.string,
  onCollapse: PropTypes.func,
  resultClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  reFocus: PropTypes.bool,
  header: PropTypes.node,
  maxLength: PropTypes.number,
  innerTitle: PropTypes.node,
  convertBr: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  inputText: PropTypes.string,
  renderOptionList: PropTypes.func,
}

Select.defaultProps = {
  clearable: false,
  data: [],
  height: 250,
  itemsInView: 10,
  lineHeight: 34,
  loading: false,
  multiple: false,
  renderItem: e => e,
  text: {},
  compressed: false,
  trim: true,
  autoAdapt: false,
  showArrow: true,
  focusSelected: true,
}

export default Select
