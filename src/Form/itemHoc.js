import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import consumer from './consumer'

export default Origin => consumer(class extends PureComponent {
  static propTypes = {
    formDatum: PropTypes.object,
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.value || props.defaultValue,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  getValue() {
    const { formDatum, name, value } = this.props
    if (formDatum && name) return formDatum.getvalue(name)
    return value === undefined ? this.state.value : value
  }

  handleChange(value, ...args) {
    this.setState({ value })
    if (this.props.onChange) this.props.onChange(value, ...args)

    const { formDatum, name } = this.props
    if (formDatum && name) formDatum.setValue(name, value)
  }

  render() {
    const { formDatum, value, ...other } = this.props
    return (
      <Origin
        {...other}
        value={this.getValue()}
        onChange={this.handleChange}
      />
    )
  }
})
