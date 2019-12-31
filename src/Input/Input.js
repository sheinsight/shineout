import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cleanProps from '../utils/cleanProps'
import Clear from './clear'

class Input extends PureComponent {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
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
      this.ref.focus()
    }
    let { value } = e.target
    const { type } = this.props
    if (type === 'number') value = String(value).replace(/。/g, '.')
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

  handleBlur(e) {
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
      clearable,
      htmlName,
      forceChange,
      onEnterPress,
      ...other
    } = this.props
    const value = this.props.value == null ? '' : this.props.value

    return [
      <input
        {...cleanProps(other)}
        className={className}
        name={other.name || htmlName}
        type={type === 'password' ? type : 'text'}
        value={value}
        ref={this.bindRef}
        key="input"
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
      />,
      clearable && value !== '' && <Clear onClick={this.handleChange} key="close" />,
    ]
  }
}

Input.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  digits: PropTypes.number,
  forceChange: PropTypes.func,
  htmlName: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onEnterPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onFocus: PropTypes.func,
  clearable: PropTypes.bool,
}

Input.defaultProps = {
  type: 'text',
}

export default Input
