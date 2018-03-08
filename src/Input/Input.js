import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Input extends PureComponent {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
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
    console.log(reg)
    reg = new RegExp(reg)
    return !reg.test(value)
  }

  handleChange(e) {
    const { value } = e.target
    if (this.invalidNumber(value)) return
    this.props.onChange(value)
  }

  render() {
    const {
      type, value, defaultValue, digits, ...other
    } = this.props

    return (
      <input
        {...other}
        type={type === 'password' ? type : 'text'}
        value={value}
        onChange={this.handleChange}
      />
    )
  }
}

Input.propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  digits: PropTypes.number,
  onChange: PropTypes.func.isRequired,
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
