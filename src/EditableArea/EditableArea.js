import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import classnames from 'classnames'
import { getUidStr } from '../utils/uid'
import absoluteList from '../List/AbsoluteList'
import { editableAreaClass } from '../styles'
import Clear from '../Input/clear'
import { focusElement } from '../utils/dom/element'
import { defer } from '../utils/uid'
import { isFunc } from '../utils/is'

const AbsoluteView = absoluteList(({ focus, getRef, fixed, className, ...other }) =>
  focus ? <div className={classnames(className, editableAreaClass('focus'))} {...other} /> : null
)

function formatPreTagValue(value) {
  if (!value && value !== 0) return '\u00a0'
  const arr = String(value).split('\n')
  const len = arr.length
  const last = arr[len - 1]
  if (last === '') arr[len - 1] = '\u00a0'
  return arr.join('\n')
}

function formatShowValue(value) {
  if (!value && value !== 0) return '\u00a0'
  const arr = String(value).split('\n')
  const len = arr.length
  if (len > 1) return `${arr[0]}...`
  return String(value)
}

function isDescendent(el, id) {
  if (el.getAttribute('data-id') === id) return true
  if (!el.parentElement) return false
  return isDescendent(el.parentElement, id)
}

class EditableArea extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue,
      showTextarea: false,
      height: null,
      showClear: false,
    }
    this.editableAreaId = `editable_${getUidStr()}`
    this.handleFocus = this.handleFocus.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleMousedown = this.handleMousedown.bind(this)
    this.bindElement = this.bindElement.bind(this)
    this.bindInput = this.bindInput.bind(this)
    this.bindPlaceholder = this.bindPlaceholder.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  componentDidMount() {
    this.handleResize()
  }

  componentDidUpdate() {
    // if height === null || undefine, reacquire height
    const { height } = this.state
    if (height == null) {
      this.handleResize()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMousedown)
  }

  onBlur() {
    const { absolute, onBlur } = this.props
    // fix out page mouse click dont remove absolute dom
    this.handleToggle(false)
    if (!absolute && isFunc(onBlur)) onBlur()
  }

  getValue() {
    const { value, onChange } = this.props
    if (onChange && value !== undefined) return value
    return this.state.value
  }

  getPreTagValue(value) {
    const { showTextarea } = this.state
    const { placeholder } = this.props
    if (!value && value !== 0 && placeholder) {
      return <span className={editableAreaClass('textarea-placeholder')}>{placeholder}</span>
    }
    return showTextarea ? formatPreTagValue(value) : formatShowValue(value)
  }

  bindElement(el) {
    this.container = el
  }

  bindInput(el) {
    this.input = el
  }

  bindPlaceholder(el) {
    this.placeholder = el
  }

  showClear() {
    const { showTextarea, showClear } = this.state
    const { clearable, disabled } = this.props
    const value = this.getValue()
    return value && showClear && !showTextarea && clearable && !disabled
  }

  handleResize() {
    let height
    if (this.placeholder) {
      height = this.placeholder.offsetHeight
    }
    if (!height) {
      return
    }
    this.setState(
      immer(state => {
        state.height = height
      })
    )
  }

  handleFocus(e) {
    const { onFocus, disabled } = this.props
    if (disabled) return
    document.addEventListener('mousedown', this.handleMousedown)
    this.handleToggle(true)
    if (onFocus) onFocus(e)
    defer(() => {
      focusElement.end(this.input)
    })
  }

  handleMousedown(e) {
    const isChild = isDescendent(e.target, this.editableAreaId)
    if (!isChild) {
      // resolve absolute cant toggle onBlur
      const { onBlur, absolute } = this.props
      if (absolute && isFunc(onBlur)) onBlur()
      this.handleToggle(false)
      document.removeEventListener('mousedown', this.handleMousedown)
    }
  }

  handleToggle(show) {
    this.setState(
      immer(state => {
        state.showTextarea = show
        state.showClear = false
      }),
      this.handleResize
    )
  }

  handleChange(e) {
    const { value } = e.target
    const { onChange } = this.props
    if (onChange) onChange(value)
    this.setState(
      immer(state => {
        state.value = value
      }),
      this.handleResize
    )
  }

  handleMouseEnter() {
    this.setState(
      immer(state => {
        state.showClear = true
      })
    )
  }

  handleMouseLeave() {
    this.setState(
      immer(state => {
        state.showClear = false
      })
    )
  }

  renderItem() {
    const { showTextarea, height } = this.state
    const { style, placeholder, bordered, disabled, absolute, zIndex, className } = this.props
    const value = this.getValue()
    const showClear = this.showClear()
    const content = [
      <pre
        key="pre"
        ref={this.bindPlaceholder}
        className={editableAreaClass(
          'placeholder',
          !showTextarea && 'placeholder-one-line',
          bordered && 'bordered',
          disabled ? 'disabled' : 'editable',
          showClear && 'reset-padding-right'
        )}
      >
        {this.getPreTagValue(value)}
      </pre>,
      <textarea
        ref={this.bindInput}
        key="t"
        placeholder={placeholder}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.onBlur}
        spellCheck="false"
        style={{ height, lineHeight: (style || {}).lineHeight }}
        rows={1}
        className={editableAreaClass('textarea', showTextarea ? 'edit' : 'show', disabled && 'disabled')}
        value={showTextarea ? value : formatShowValue(value)}
      />,
      showClear && (
        <div key="d" style={{ height }} className={editableAreaClass('clear-wrapper')}>
          <Clear
            onClick={() => {
              this.handleChange({ target: { value: '' } })
            }}
            key="c"
          />
        </div>
      ),
    ]
    if (!showTextarea || !absolute) return content
    return (
      <AbsoluteView
        className={className}
        rootClass={editableAreaClass('absolute')}
        fixed
        position="drop-down"
        absolute
        zIndex={zIndex}
        focus={showTextarea}
        parentElement={this.container}
        data-id={this.editableAreaId}
      >
        {content}
      </AbsoluteView>
    )
  }

  render() {
    const { showTextarea } = this.state
    const { style, className } = this.props
    const cls = classnames(className, editableAreaClass('_', showTextarea && 'focus'))
    return (
      <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        className={cls}
        ref={this.bindElement}
        style={style}
        data-id={this.editableAreaId}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.renderItem()}
      </div>
    )
  }
}

EditableArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  clearable: PropTypes.bool,
  onFocus: PropTypes.func,
  className: PropTypes.shape(),
  onBlur: PropTypes.func,
  bordered: PropTypes.bool,
  disabled: PropTypes.bool,
  absolute: PropTypes.bool,
  zIndex: PropTypes.number,
}

EditableArea.defaultProps = {
  defaultValue: '',
  clearable: true,
  bordered: false,
  disabled: false,
}

export default EditableArea
