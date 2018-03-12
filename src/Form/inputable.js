import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import consumer from './consumer'

const types = ['formDatum', 'disabled']

export default Origin => consumer(types, class extends PureComponent {
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
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    const { formDatum, name } = this.props
    if (formDatum && name) {
      formDatum.listen(name, this.handleUpdate)
    }
  }

  componentWillUnmount() {
    const { formDatum, name } = this.props
    if (formDatum && name) {
      formDatum.unlisten(name, this.handleUpdate)
    }
  }

  getValue() {
    const { formDatum, name, value } = this.props
    if (formDatum && name) return formDatum.get(name)
    return value === undefined ? this.state.value : value
  }

  handleUpdate() {
    this.forceUpdate()
  }

  handleChange(value, ...args) {
    this.setState({ value })

    const { formDatum, name } = this.props
    if (formDatum && name) formDatum.set(name, value)

    if (this.props.onChange) this.props.onChange(value, ...args)
  }

  render() {
    const {
      formDatum, value, ...other
    } = this.props

    console.log('render input')

    return (
      <Origin
        {...other}
        value={this.getValue()}
        onChange={this.handleChange}
      />
    )
  }
})
