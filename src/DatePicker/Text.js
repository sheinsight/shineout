import React from 'react'
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

class Text extends React.Component {
  constructor(props) {
    super(props)

    this.handleBlur = this.handleBlur.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.bindElement = this.bindElement.bind(this)

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.getSpanContentEditable = this.getSpanContentEditable.bind(this)

    this.state = {
      focus: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.focus !== this.props.focus && this.props.focus && this.element) {
    //   focusElement.end(this.element)
    // }
    if (prevState.focus !== this.state.focus && this.state.focus) {
      focusElement.end(this.element)
    }
  }

  getSpanContentEditable() {
    const { inputable } = this.props
    const { focus } = this.state
    if (!inputable) return false
    return focus
  }

  handleMouseDown() {
    const { inputable } = this.props
    const { focus } = this.state
    if (!inputable || focus) return
    this.setState({
      focus: true,
    })
  }

  bindElement(el) {
    const { onTextSpanRef } = this.props
    this.element = el
    if (onTextSpanRef) onTextSpanRef(el)
  }

  handleBlur(e) {
    const { format, index, onChange, value } = this.props
    const txt = e.target.innerText
    // element.focus()
    if (getParent(target, `.${datepickerClass('picker')}`)) return
    if (txt === value) return
    if (txt.trim().length === 0) {
      onChange(undefined, index)
    } else {
      const newValue = utils.toDateWithFormat(txt, format, undefined)
      onChange(newValue, index)
    }

    this.setState({ focus: false })
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
    const { className, value, placeholder } = this.props

    if (!this.getSpanContentEditable()) {
      return (
        <span onMouseDown={this.handleMouseDown} className={className}>
          {value || placeholder}
        </span>
      )
    }

    return (
      <span
        ref={this.bindElement}
        contentEditable={this.getSpanContentEditable()}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleInput}
        className={className}
        onMouseDown={this.handleMouseDown}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    )
  }
}

Text.propTypes = {
  className: PropTypes.string,
  // focus: PropTypes.bool,
  format: PropTypes.string,
  index: PropTypes.number,
  inputable: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.any,
  value: PropTypes.string,
  onTextSpanRef: PropTypes.func,
  // element: PropTypes.any,
}

Text.defaultProps = {
  value: '',
}

export default Text
