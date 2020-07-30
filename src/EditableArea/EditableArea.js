import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Textarea from '../Textarea'
import Input from '../Input'
import Popover from '../Popover'
import { editableAreaClass } from '../styles'
import icons from '../icons'
import { focusElement } from '../utils/dom/element'

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
    this.bindInput = this.bindElement.bind(this, 'input')
    this.renderInput = this.renderInput.bind(this)
    this.renderTextarea = this.renderTextarea.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.autoFocus = this.autoFocus.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.showPop = this.updateShowTextarea.bind(this, true)
    this.hidePop = this.updateShowTextarea.bind(this, false)
    this.handleClear = this.handleClear.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props
    const { showTextarea } = this.state
    if (prevState.showTextarea !== showTextarea && showTextarea) {
      this.autoFocus()
    }
    if (value !== prevProps.value) {
      this.setState({ value })
    }
  }

  onChange(value) {
    const { onChange } = this.props
    if (typeof onChange === 'function') onChange(value)
    this.setState({ value })
  }

  onBlur(e) {
    const { onBlur } = this.props
    this.hidePop()
    if (typeof onBlur === 'function') onBlur(e)
  }

  updateShowTextarea(flag) {
    if (flag && this.input) this.width = this.input.clientWidth
    this.setState({ showTextarea: flag })
  }

  handleClear() {
    this.setState({ value: '' })
  }

  handleFocus(e) {
    const { onFocus } = this.props
    if (typeof onFocus === 'function') onFocus(e)
  }

  bindElement(type, el) {
    this[type] = el
  }

  autoFocus() {
    if (!this.container) return
    const target = this.container.querySelector(`.${editableAreaClass('text-area')} textarea.so-input-auto-size`)
    if (target) focusElement.end(target)
  }

  renderTextarea() {
    const { showTextarea, value } = this.state
    const { delay, placeholder, maxHeight } = this.props
    if (!showTextarea) return null

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
          onFocus={this.handleFocus}
          placeholder={placeholder}
          maxHeight={maxHeight}
        />
      </div>
    )
  }

  renderInput() {
    const { value } = this.state
    const { placeholder, disabled } = this.props
    return (
      <Input
        forwardedRef={this.bindInput}
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
    const { width, style, className, bordered, clearable, getPopupContainer } = this.props
    const cls = classnames(className, editableAreaClass('_', !bordered && 'none-bordered'))
    const ms = Object.assign({ width }, style)
    const popStyle = { width: this.width }

    return (
      <div className={cls} style={ms}>
        {this.renderInput()}
        <Popover
          visible={showTextarea}
          showArrow={false}
          className={editableAreaClass('popover')}
          position="cover"
          style={popStyle}
          getPopupContainer={getPopupContainer}
        >
          {this.renderTextarea()}
        </Popover>
        {clearable && value ? (
          <div className={editableAreaClass('clear')} onClick={this.handleClear}>
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
  getPopupContainer: PropTypes.func,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Editable
