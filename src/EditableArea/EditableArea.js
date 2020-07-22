import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Textarea from '../Textarea'
import Input from '../Input'
import Popover from '../Popover'
import { editableAreaClass } from '../styles'
import icons from '../icons'
import { defer } from '../utils/uid'
import { focusElement } from '../utils/dom/element'

const findNode = (el, target) => el.querySelector(target)

function formatShowValue(value) {
  if (!value && value !== 0) return ''
  const arr = String(value).split('\n')
  const len = arr.length
  if (len > 1) return `${arr[0]}...`
  return String(value)
}

class Editable extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      showTextarea: false,
    }

    this.bindContainer = this.bindElement.bind(this, 'container')

    this.renderInput = this.renderInput.bind(this)
    this.renderTextarea = this.renderTextarea.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.autoFocus = this.autoFocus.bind(this)
    this.textareaFocus = this.textareaFocus.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.showPop = this.updateShowTextarea.bind(this, true)
    this.hidePop = this.updateShowTextarea.bind(this, false)
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (value !== prevProps.value) {
      this.updateValue(value)
    }
  }

  onChange(value) {
    const { onChange } = this.props
    if (typeof onChange === 'function') onChange(value)
    this.updateValue(value)
  }

  onBlur(e) {
    const { onBlur } = this.props
    this.hidePop()
    if (typeof onBlur === 'function') onBlur(e)
  }

  get popoverStyle() {
    const { style } = this.props
    if (!style || !style.width) return null
    return { width: style.width }
  }

  updateShowTextarea(flag) {
    this.setState({ showTextarea: flag })
  }

  updateValue(value) {
    this.setState({ value })
  }

  textareaFocus(e) {
    const { onFocus } = this.props
    if (typeof onFocus === 'function') onFocus(e)
  }

  bindElement(type, el) {
    this[type] = el
  }

  autoFocus() {
    if (!this.container) return
    const target = findNode(this.container, `.${editableAreaClass('text-area')} textarea.so-input-auto-size`)
    if (target) focusElement.end(target)
  }

  renderTextarea() {
    const { showTextarea, value } = this.state
    const { delay, placeholder } = this.props
    if (!showTextarea) return null
    const that = this
    defer(() => {
      that.autoFocus()
    })

    return (
      <div ref={this.bindContainer}>
        <Textarea
          className={editableAreaClass('text-area')}
          autosize
          value={value}
          rows={1}
          delay={delay}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.textareaFocus}
          placeholder={placeholder}
        />
      </div>
    )
  }

  renderInput() {
    const { value } = this.state
    const { placeholder, disabled } = this.props
    return (
      <Input
        placeholder={placeholder}
        value={formatShowValue(value)}
        className={editableAreaClass('input')}
        onFocus={this.showPop}
        disabled={disabled}
      />
    )
  }

  render() {
    const { showTextarea, value } = this.state
    const { style, className, bordered, clearable } = this.props
    const cls = classnames(className, editableAreaClass('_', !bordered && 'none-bordered'))
    return (
      <div className={cls} style={style}>
        {this.renderInput()}
        <Popover
          visible={showTextarea}
          showArrow={false}
          className={editableAreaClass('popover')}
          position="cover"
          style={this.popoverStyle}
        >
          {this.renderTextarea()}
        </Popover>
        {clearable && value ? (
          <div className={editableAreaClass('clear')} onClick={() => this.updateValue('')}>
            {icons.CloseCircle}
          </div>
        ) : null}
      </div>
    )
  }
}

Editable.defaultProps = {
  bordered: false,
}

Editable.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  delay: PropTypes.number,
  bordered: PropTypes.bool,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
}

export default Editable
