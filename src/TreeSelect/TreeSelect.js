import React from 'react'
import PropTypes from 'prop-types'
import Tree from '../Tree'
import { PureComponent } from '../component'
import { getProps } from '../utils/proptypes'
import { getUidStr } from '../utils/uid'
import { treeSelectClass } from '../styles'
import Result from './Result'
import { docSize } from '../utils/dom/document'
import List from '../List'

const ScaleList = List(['fade', 'scale-y'], 'fast')

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

    this.renderPending = true
    this.treeSelectId = `treeSelect_${getUidStr()}`

    this.setInputReset = this.setInputReset.bind(this)
    this.renderActive = this.renderActive.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.bindElement = this.bindElement.bind(this)
    this.handleFocus = this.handleState.bind(this, true)
    this.handleBlur = this.handleState.bind(this, false)
    this.handleClear = this.handleClear.bind(this)
    this.handleRemove = this.handleChange.bind(this, false)
    this.handleClickAway = this.handleClickAway.bind(this)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.clearClickAway()
  }

  bindElement(el) {
    this.element = el
  }

  bindClickAway() {
    document.addEventListener('click', this.handleClickAway)
  }

  clearClickAway() {
    document.removeEventListener('click', this.handleClickAway)
  }

  handleClickAway(e) {
    const desc = isDescendent(e.target, this.treeSelectId)
    if (!desc) this.handleState(false)
  }

  handleState(focus, e) {
    if (this.props.disabled === true) return
    if (focus === this.state.focus) return
    // click close icon
    if (focus && e && e.target.classList.contains(treeSelectClass('close'))) return

    const { onBlur, onFocus, height } = this.props
    let { position } = this.props
    const windowHeight = docSize.height
    const bottom = height + this.element.getBoundingClientRect().bottom
    if (bottom > windowHeight && !position) position = 'drop-up'

    this.setState({ focus, position: position || 'drop-down' })

    if (focus) {
      this.bindClickAway()
      this.renderPending = false
      onFocus()
    } else {
      this.clearClickAway()
      onBlur()
    }
  }

  handleChange(data) {
    const { datum, multiple, disabled, onChange } = this.props
    if (disabled === true) return

    let newValue = data
    if (multiple) {
      // keygen
      datum.setValue(newValue)
    } else {
      // data
      newValue = [datum.getKey(data)]
      datum.setValue(newValue)
      this.handleState(false)
    }
    onChange(datum.getValue())
  }

  setInputReset(fn) {
    this.inputReset = fn
  }

  handleInputFocus() {
    // this.inputLocked = true
    // if (this.props.inputable && this.state.control === 'keyboard') {
    //   this.optionList.handleHover(0, true)
    // }
  }

  handleInputBlur() {
    // const { multiple } = this.props
  }

  handleClear() {
    this.props.datum.setValue([])
    this.props.onChange([])
    this.handleState(false)
  }

  renderItem(data, index) {
    const { renderItem } = this.props
    return typeof renderItem === 'function' ? renderItem(data, index) : data[renderItem]
  }

  renderActive(data, expanded, active, id) {
    const { renderItem } = this.props
    const item = typeof renderItem === 'function' ? renderItem(data, expanded, active, id) : data[renderItem]
    return <p className={treeSelectClass(active && 'selected')}>{item}</p>
  }

  renderTreeOptions() {
    const { focus, position } = this.state
    const { multiple, datum } = this.props
    const props = {}
    ;[
      'mode',
      'data',
      'defaultExpanded',
      'disabled',
      'expanded',
      'keygen',
      'loader',
      'onExpand',
      'renderItem',
      'defaultValue',
      'line',
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
    return (
      <ScaleList position={position} show={focus} data-id={this.treeSelectId} className={treeSelectClass('options')}>
        <div className={treeSelectClass('tree-wrapper')}>
          <Tree className={treeSelectClass(!multiple && 'single')} {...props} />
        </div>
      </ScaleList>
    )
  }

  render() {
    const { placeholder, multiple, datum, clearable, disabled, size, onFilter, filterText, result } = this.props
    const className = treeSelectClass(
      'inner',
      size,
      this.state.focus && 'focus',
      this.state.position,
      multiple && 'multiple',
      disabled === true && 'disabled'
    )
    const renderResult = this.props.renderResult || this.renderItem

    return (
      <div
        tabIndex={-1}
        ref={this.bindElement}
        className={className}
        data-id={this.treeSelectId}
        onClick={this.handleFocus}
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
          onInputBlur={this.handleInputBlur}
          onInputFocus={this.handleInputFocus}
          setInputReset={this.setInputReset}
        />
        {this.renderTreeOptions()}
      </div>
    )
  }
}

TreeSelect.propTypes = {
  ...getProps(PropTypes, 'placehodler', 'keygen'),
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
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
  mode: PropTypes.oneOf([0, 1, 2, 3]),
  line: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  showSearch: PropTypes.bool,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  onExpand: PropTypes.func,
  onBlur: PropTypes.func,
  onFilter: PropTypes.func,
  onFocus: PropTypes.func,
}

TreeSelect.defaultProps = {
  clearable: false,
  showSearch: false,
  multiple: false,
  line: false,
  renderItem: e => e,
  height: 250,
  data: [],
  defaultExpanded: [],
}
