import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import consumer from './consumer'

const types = ['formDatum', 'disabled']

export default Origin => consumer(types, class extends PureComponent {
  static propTypes = {
    formDatum: PropTypes.object,
    defaultValue: PropTypes.any,
    delay: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
  }

  static defaultProps = {
    delay: 300,
  }

  constructor(props) {
    super(props)

    const { formDatum, name, defaultValue } = props

    this.state = { value: props.value || defaultValue }
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)

    if (formDatum && name) {
      formDatum.listen(name, this.handleUpdate, defaultValue)
    }
  }

  componentWillUnmount() {
    const { formDatum, name } = this.props
    if (formDatum && name) {
      formDatum.unlisten(name, this.handleUpdate)
    }
  }

  getValue() {
    // if inputing, use state value
    if (this.changeTimer) return this.state.value

    const { formDatum, name, value } = this.props
    if (formDatum && name) return formDatum.get(name)
    return value === undefined ? this.state.value : value
  }

  handleUpdate(value) {
    if (value !== this.state.value) {
      console.log('force update', value, this.state.value)
      this.setState({ value })
    }
  }

  handleChange(value, ...args) {
    // use state as cache
    this.setState({ value })

    if (this.changeTimer) clearTimeout(this.changeTimer)
    // delay validate
    this.changeTimer = setTimeout(() => {
      console.log('change timer')
      const { formDatum, name } = this.props
      if (formDatum && name) formDatum.set(name, value)

      if (this.props.onChange) this.props.onChange(value, ...args)
    }, this.props.delay)
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
