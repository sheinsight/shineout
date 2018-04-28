import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Year from './Year'
import Month from './Month'
import Day from './Day'

class Picker extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      model: 'day',
      current: props.value,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleModelChange = this.handleModelChange.bind(this)
  }

  handleChange(current, end) {
    this.setState({ current })
    if (end) this.props.onChange(current)
  }

  handleModelChange(model) {
    this.setState({ model })
  }

  render() {
    const { current, model } = this.state
    const { value } = this.props

    let Render
    switch (model) {
      case 'year':
        Render = Year
        break
      case 'month':
        Render = Month
        break
      default:
        Render = Day
    }

    return (
      <Render
        value={value}
        current={current}
        onChange={this.handleChange}
        onModelChange={this.handleModelChange}
      />
    )
  }
}

Picker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
}

export default Picker
