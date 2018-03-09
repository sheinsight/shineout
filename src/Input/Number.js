import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Input from './Input'

class Number extends PureComponent {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    // check value
    this.props.onChange(value)
  }

  render() {
    const { onChange, ...other } = this.props
    return <Input {...other} onChange={this.handleChange} />
  }
}

Number.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default Number
