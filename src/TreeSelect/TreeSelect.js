import React from 'react'
import PropTypes from 'prop-types'
import { isFunc, isArray } from 'shineout/utils/is'
import Tree from '../Tree'
import { PureComponent } from '../component'
import { getProps } from '../utils/proptypes'
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

const ScaleList = List(['fade', 'scale-y'], 'fast')
const OptionList = absoluteList(({ focus, ...other }) => <ScaleList show={focus} {...other} />)

const isDescendent = (el, id) => {
  if (el.getAttribute('data-id') === id) return true
  if (!el.parentElement) return false
  return isDescendent(el.parentElement, id)
}

export default class TreeSelect extends PureComponent {
  constructor(props) {
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
    const componentRef = {
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

  componentDidUpdate(prevProps, prevState) {
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

  onExpandHandler(...args) {
    if (this.resetAbsoluteListPosition) {
      setTimeout(() => {
        this.resetAbsoluteListPosition(true)
      })
    }
    if (this.props.onExpand) {
      this.props.onExpand(...args)
    }
  }

  getText(key) {
    return this.props.empty || getLocale(key)
  }

  setInputReset(fn) {
    this.inputReset = fn
  }

  getValue() {
    const { datum, multiple } = this.props
    const value = datum.getValue()
    if (multiple) return value
    return value.length ? value[0] : ''
  }

  getDataByValue(value) {
    if (value === null || value === undefined) return value
    const { datum, multiple } = this.props
    if (multiple) {
      return value.map(id => datum.getDataById(id))
    }
    return datum.getDataById(value)
  }

  getDataByValues(values) {
    const { datum } = this.props
    if (isArray(values)) {
      return values.map(id => datum.getDataById(id))
    }
    return datum.getDataById(values)
  }

  getResetPosition(update) {
    this.resetAbsoluteListPosition = update
  }

  bindElement(el) {
    this.element = el
  }

  shouldFocus(el) {
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

  handleClickAway(e) {
    const desc = isDescendent(e.target, this.treeSelectId)
    if (!desc) {
      this.clearClickAway()
      this.props.onBlur()
      this.handleState(false, e)
    }
  }

  handleState(focus, e) {
    if (this.props.disabled === true) return
    if (focus === this.state.focus) return
    // click close icon
    if (focus && e && e.target.classList.contains(treeSelectClass('close'))) return

    const { height, onCollapse } = this.props
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

  handleFocus(e) {
    if (!this.shouldFocus(e.target)) return
    this.props.onFocus(e)
    this.bindClickAway()
  }

  handleKeyDown(e) {
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
        this.handleState(false, e, true)
      } else {
        this.clearClickAway()
      }
    }
  }

  handleRemove(data) {
    const { datum } = this.props
    const dataKey = data && datum.isUnMatch(data) ? data.value : datum.getKey(data)
    datum.set(dataKey, 0)
    this.handleChange(data, datum.getKey(data))
  }

  handleChange(data, id) {
    const { datum, multiple, disabled, onChange, onChangeAddition } = this.props
    if (disabled === true || datum.isDisabled(id)) return
    const current = datum.getDataById(id)
    if (!multiple) {
      datum.setValue([])
      datum.set(datum.getKey(data), 1)
      this.handleState(false)
    }
    const value = this.getValue()
    onChange(value, current, id && datum.getPath(id).path)
    if (typeof onChangeAddition === 'function') {
      onChangeAddition({
        data: this.getDataByValue(value),
        checked: multiple ? datum.get(id) : undefined,
        current,
      })
    }
  }

  handleClear() {
    const { multiple, onChangeAddition } = this.props
    this.props.datum.setValue([])
    this.props.onChange(multiple ? [] : '')
    if (typeof onChangeAddition === 'function') {
      onChangeAddition({
        data: multiple ? [] : null,
      })
    }
    this.handleState(false)
    this.element.focus()
  }

  renderItem(data, index) {
    const { renderItem } = this.props
    return typeof renderItem === 'function' ? renderItem(data, index) : data[renderItem]
  }

  renderActive(data, expanded, active, id) {
    const { renderItem, datum } = this.props
    const item = typeof renderItem === 'function' ? renderItem(data, expanded, active, id) : data[renderItem]

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
    const props = {}
    ;[
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
    ].forEach(k => {
      props[k] = this.props[k]
    })
    props.value = datum.getValue()
    if (multiple) {
      props.onChange = this.handleChange
    } else {
      props.onClick = this.handleChange
      props.renderItem = this.renderActive
      props.active = props.value.length ? props.value[0] : null
    }
    const content =
      data.length === 0 ? (
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
        tabIndex={ disabled === true ? -1 : 0}
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

TreeSelect.propTypes = {
  ...getProps(PropTypes, 'placehodler', 'keygen'),
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
  getComponentRef: PropTypes.func,
  clearable: PropTypes.bool,
  data: PropTypes.array,
  datum: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  filterText: PropTypes.string,
  renderResult: PropTypes.func,
  height: PropTypes.number,
  multiple: PropTypes.bool,
  position: PropTypes.string,
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  result: PropTypes.array,
  size: PropTypes.string,
  defaultExpanded: PropTypes.arrayOf(PropTypes.string),
  expanded: PropTypes.arrayOf(PropTypes.string),
  loader: PropTypes.func,
  mode: PropTypes.oneOf([0, 1, 2, 3, 4]),
  line: PropTypes.bool,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  onExpand: PropTypes.func,
  onBlur: PropTypes.func,
  onFilter: PropTypes.func,
  onFocus: PropTypes.func,
  empty: PropTypes.string,
  compressed: PropTypes.bool,
  compressedBound: PropTypes.number,
  absolute: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  parentClickExpand: PropTypes.bool,
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  renderUnmatched: PropTypes.func,
  onCollapse: PropTypes.func,
  onChangeAddition: PropTypes.func,
  innerTitle: PropTypes.node,
}

TreeSelect.defaultProps = {
  clearable: false,
  compressed: false,
  absolute: false,
  multiple: false,
  line: false,
  renderItem: e => e,
  height: 300,
  data: [],
  defaultExpanded: [],
}
