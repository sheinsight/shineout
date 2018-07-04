import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cleanProps from '../utils/cleanProps'

class Input extends PureComponent {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
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

  handleChange(e) {
    const { value } = e.target
    if (this.invalidNumber(value)) return
    this.props.onChange(value)
  }

  handleKeyDown(e) {
    const { onKeyDown, onEnterPress } = this.props
    if (e.keyCode === 13 && onEnterPress) {
      onEnterPress(e.target.value)
    }
    if (onKeyDown) onKeyDown(e)
  }

  render() {
    const {
      type, value, defaultValue, digits, className, htmlName, ...other
    } = this.props

    return (
      <input
        {...cleanProps(other)}
        className={className}
        name={other.name || htmlName}
        type={type === 'password' ? type : 'text'}
        value={value}
        onChange={this.handleChange}
      />
    )
  }
}

Input.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  digits: PropTypes.number,
  htmlName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onEnterPress: PropTypes.func,
  onKeyDown: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

Input.defaultProps = {
  type: 'text',
  value: '',
}

export default Input
