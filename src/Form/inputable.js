import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { curry } from '../utils/func'
import validate from '../utils/validate'
import consumer from './consumer'

const types = ['formDatum', 'disabled']

export default curry((delay, Origin) => consumer(types, class extends PureComponent {
  static propTypes = {
    formDatum: PropTypes.object,
    defaultValue: PropTypes.any,
    delay: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    value: PropTypes.any,
  }

  static defaultProps = { delay }

  constructor(props) {
    super(props)

    const { formDatum, name, defaultValue } = props

    this.state = {
      validationState: null,
      value: props.value || defaultValue,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)

    if (formDatum && name) {
      formDatum.listen(name, this.handleUpdate, defaultValue)
      this.state.value = formDatum.get(name)
    }
  }

  componentWillUnmount() {
    const { formDatum, name } = this.props
    if (formDatum && name) {
      formDatum.unlisten(name, this.handleUpdate)
    }
  }

  getValue() {
    // if changeLocked, use state value
    if (this.changeLocked) return this.state.value

    const { formDatum, name, value } = this.props
    if (formDatum && name) return formDatum.get(name)
    return value === undefined ? this.state.value : value
  }

  validate(value) {
    const { required } = this.props
    return validate(value, { required }).then(() => {
      this.setState({ validationState: null })
    }, (e) => {
      this.setState({ validationState: e })
      return e
    })
  }

  change(value, ...args) {
    const { formDatum, name } = this.props
    if (formDatum && name) formDatum.set(name, value)

    this.validate(value)

    if (this.props.onChange) this.props.onChange(value, ...args)
  }

  handleUpdate(value) {
    this.setState({ value })
  }

  handleChange(value, ...args) {
    // use state as cache
    this.setState({ value })

    // handle change immediately
    if (this.props.delay === 0) {
      this.change(value, ...args)
      return
    }

    this.changeLocked = true
    if (this.changeTimer) clearTimeout(this.changeTimer)
    // delay validate
    this.changeTimer = setTimeout(() => {
      this.changeLocked = false
      this.change(value, ...args)
    }, this.props.delay)
  }

  render() {
    const {
      formDatum, value, required, ...other
    } = this.props

    console.log('render input', this.props.name, this.getValue())

    return (
      <Origin
        {...other}
        value={this.getValue()}
        onChange={this.handleChange}
      />
    )
  }
}))
