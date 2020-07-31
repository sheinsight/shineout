import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { focusElement, getParent } from '../utils/dom/element'
import utils from './utils'
import { datepickerClass } from '../styles'

class Text extends PureComponent {
  constructor(props) {
    super(props)

    this.handleBlur = this.handleBlur.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.bindElement = this.bindElement.bind(this)

    this.checkTarget = this.checkTarget.bind(this)

    this.datepicker = false
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.checkTarget, true)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.focus !== this.props.focus && this.props.focus && this.element) {
      focusElement.end(this.element)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.checkTarget, true)
  }

  checkTarget(e) {
    const res = getParent(e.target, `.${datepickerClass('picker')}`)
    if (res) {
      this.datepicker = true
      return
    }
    this.datepicker = false
  }

  bindElement(el) {
    const { onTextSpanRef } = this.props
    this.element = el
    if (onTextSpanRef) onTextSpanRef(el)
  }

  handleBlur(e) {
    const { format, index, onChange, value, element } = this.props
    const txt = e.target.innerText
    element.focus()
    if (this.datepicker) return
    if (txt === value) return
    if (txt.trim().length === 0) {
      onChange(undefined, index)
    } else {
      const newValue = utils.toDateWithFormat(txt, format, undefined)
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
    const { className, focus, inputable, value, placeholder } = this.props

    if (!inputable || !focus) {
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
  className: PropTypes.string,
  focus: PropTypes.bool,
  format: PropTypes.string,
  index: PropTypes.number,
  inputable: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.any,
  value: PropTypes.string,
  onTextSpanRef: PropTypes.func,
  element: PropTypes.any,
}

Text.defaultProps = {
  value: '',
}

export default Text
