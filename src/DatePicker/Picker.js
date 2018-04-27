import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Day from './Day'

class Picker extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      stage: 'day',
      current: props.value,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(current, end) {
    this.setState({ current })
    if (end) this.props.onChange(current)
  }

  render() {
    const { current, stage } = this.state

    switch (stage) {
      default:
        return <Day value={current} onChange={this.handleChange} />
    }
  }
}

Picker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
}

export default Picker
