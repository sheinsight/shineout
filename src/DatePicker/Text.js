import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { focusElement, getParent } from '../utils/dom/element'
import utils from './utils'
import { datepickerClass } from '../styles'

let target = null
document.addEventListener(
  'mousedown',
  e => {
    // eslint-disable-next-line prefer-destructuring
    target = e.target
  },
  true
)

class Text extends PureComponent {
  constructor(props) {
    super(props)

    this.handleBlur = this.handleBlur.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.bindElement = this.bindElement.bind(this)
  }

  bindElement(el) {
    const { onTextSpanRef } = this.props
    this.element = el
    if (onTextSpanRef) onTextSpanRef(el)
  }

  handleBlur(e) {
    const { format, index, onChange, value } = this.props
    const txt = e.target.innerText
    if (getParent(target, `.${datepickerClass('picker')}`)) return
    if (txt === value) return
    if (txt.trim().length === 0) {
      onChange(undefined, index)
    } else {
      const newValue = utils.toDateWithFormat(txt, format, undefined)
      // if translate fail, clear
      if (!newValue) {
        this.element.innerText = null
      }
      onChange(newValue, index)
    }
  }

  handleFocus(e) {
    const { onTextSpanRef } = this.props
    if (onTextSpanRef) onTextSpanRef(e.target)
  }

  handleInput(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.element.blur()
    }
  }

  render() {
    const { className, inputable, value, placeholder, disabled } = this.props

    if (!inputable || disabled) {
      return <span className={className}>{value || placeholder}</span>
    }

    return (
      <span
        ref={this.bindElement}
        contentEditable={inputable}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleInput}
        className={className}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    )
  }
}

Text.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  format: PropTypes.string,
  index: PropTypes.number,
  inputable: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.any,
  value: PropTypes.string,
  onTextSpanRef: PropTypes.func,
}

Text.defaultProps = {
  value: '',
}

export default Text
