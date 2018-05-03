import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Year from './Year'
import Month from './Month'
import Day from './Day'
import Time from './Time'

class Picker extends PureComponent {
  constructor(props) {
    super(props)

    let model
    switch (props.type) {
      case 'month':
        model = 'month'
        break
      case 'time':
        model = 'time'
        break
      default:
        model = 'day'
    }

    this.state = {
      model,
      current: props.value,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleModelChange = this.handleModelChange.bind(this)
  }

  handleChange(current, end) {
    const { type } = this.props
    this.setState({ current })
    if (end) this.props.onChange(current, true)
    else if (type === 'time') this.props.onChange(current)
  }

  handleModelChange(model) {
    this.setState({ model })
  }

  render() {
    const { current, model } = this.state
    const {
      disabled, type, value, format,
    } = this.props

    let Render
    switch (model) {
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
        onModelChange={this.handleModelChange}
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
