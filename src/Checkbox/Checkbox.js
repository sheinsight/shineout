import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getUidStr } from '../utils/uid'

class Checkbox extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      checked: props.checked,
    }

    this.id = `cb_${getUidStr()}`

    this.handleChange = this.handleChange.bind(this)
  }

  get checked() {
    const { checked, value, htmlValue } = this.props
    if (checked !== undefined) return checked
    if (this.state.checked === undefined) return value === htmlValue
    return this.state.checked
  }

  getProp(key) {
    if (this.props[key] !== undefined) return this.props[key]
    return this.state[key]
  }

  handleChange(e) {
    const { htmlValue, onChange, index } = this.props
    const { checked } = e.target
    this.setState({ checked })
    const value = checked ? htmlValue : undefined
    if (onChange) onChange(value, checked, index)
  }

  render() {
    return (
      <label htmlFor={this.id}>
        <input
          id={this.id}
          type="checkbox"
          onChange={this.handleChange}
          checked={this.checked}
        />
      </label>
    )
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  htmlValue: PropTypes.any,
  index: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.any,
}

Checkbox.defaultProps = {
  htmlValue: true,
}

export default Checkbox
