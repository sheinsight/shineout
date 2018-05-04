import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Year from './Year'
import Month from './Month'
import Day from './Day'
import Time from './Time'

class Picker extends PureComponent {
  constructor(props) {
    super(props)

    let mode
    switch (props.type) {
      case 'month':
        mode = 'month'
        break
      case 'time':
        mode = 'time'
        break
      default:
        mode = 'day'
    }

    this.state = {
      mode,
      current: props.value,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleModeChange = this.handleModeChange.bind(this)
  }

  handleChange(current, change, end) {
    this.setState({ current })
    this.props.onChange(current, change, end)
  }

  handleModeChange(mode) {
    this.setState({ mode })
  }

  render() {
    const { current, mode } = this.state
    const {
      disabled, type, value, format,
    } = this.props

    let Render
    switch (mode) {
      case 'year':
        Render = Year
        break
      case 'month':
        Render = Month
        break
      case 'time':
        Render = Time
        break
      default:
        Render = Day
    }

    return (
      <Render
        current={current}
        disabled={disabled}
        format={format}
        onChange={this.handleChange}
        onModeChange={this.handleModeChange}
        type={type}
        value={value}
      />
    )
  }
}

Picker.propTypes = {
  disabled: PropTypes.func,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
}

export default Picker
