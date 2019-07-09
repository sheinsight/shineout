import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cleanProps from '../utils/cleanProps'
import Clear from './clear'

class Input extends PureComponent {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.bindRef = this.bindRef.bind(this)
  }

  bindRef(el) {
    this.ref = el
  }

  invalidNumber(value) {
    const { digits, type } = this.props
    if (type !== 'number') return false

    let reg = '^-?\\d*'
    if (digits === undefined) {
      reg += '\\.?\\d*'
    } else if (digits > 0) {
      reg += `\\.?\\d{0,${digits}}`
    }
    reg += '$'
    reg = new RegExp(reg)
    return !reg.test(value)
  }

  handleChange(e, clearClick) {
    if (clearClick) {
      this.clearClick = true

      if (!this.focus) this.ref.focus()
    }
    const { value } = e.target
    if (this.invalidNumber(value)) return
    this.props.onChange(value)
  }

  handleKeyUp(e) {
    const { onKeyUp, onEnterPress } = this.props
    if (e.keyCode === 13 && onEnterPress) {
      onEnterPress(e.target.value, e)
    }
    if (onKeyUp) onKeyUp(e)
  }

  handleFocus(e) {
    this.focus = true
    if (this.props.onFocus) this.props.onFocus(e)
  }

  handleBlur(e) {
    this.focus = false
    if (this.clearClick) {
      this.ref.focus()
      this.clearClick = false
      return
    }
    const { value } = e.target
    const { forceChange, onBlur } = this.props
    if (onBlur) onBlur(e)
    if (this.invalidNumber(value)) return
    if (forceChange) forceChange(value)
  }

  render() {
    const {
      type,
      defaultValue,
      digits,
      className,
      htmlName,
      forceChange,
      onEnterPress,
      clearable,
      onFocus,
      ...other
    } = this.props
    const value = this.props.value == null ? '' : this.props.value

    return [
      <input
        {...cleanProps(other)}
        className={className}
        ref={this.bindRef}
        onFocus={this.handleFocus}
        key="input"
        name={other.name || htmlName}
        type={type === 'password' ? type : 'text'}
        value={value}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
      />,
      clearable && value && <Clear onClick={this.handleChange} key="clear" />,
    ]
  }
}

Input.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  digits: PropTypes.number,
  forceChange: PropTypes.func,
  htmlName: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onEnterPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  type: PropTypes.string,
  clearable: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Input.defaultProps = {
  type: 'text',
  clearable: false,
}

export default Input
