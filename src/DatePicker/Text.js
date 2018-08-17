import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { focusElement } from '../utils/dom/element'
import utils from './utils'

class Text extends PureComponent {
  constructor(props) {
    super(props)

    this.handleBlur = this.handleBlur.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.focus !== this.props.focus && this.props.focus && this.element) {
      focusElement(this.element)
    }
  }

  handleBlur(e) {
    const {
      format, index, onChange, value,
    } = this.props
    const txt = e.target.innerText
    if (txt === value) return
    if (txt.trim().length === 0) {
      onChange(undefined, index)
    } else {
      const newValue = utils.toDateWithFormat(txt, format, undefined)
      onChange(newValue, index)
    }
  }

  handleInput(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.element.blur()
    }
  }

  render() {
    const {
      className, focus, inputable, value, placeholder,
    } = this.props

    if (!inputable || !focus) {
      return <span className={className}>{value || placeholder}</span>
    }

    return (
      <span
        ref={(el) => { this.element = el }}
        contentEditable={inputable}
        onBlur={this.handleBlur}
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
}

Text.defaultProps = {
  value: '',
}

export default Text
