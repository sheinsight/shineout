import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { curry, compose } from '../utils/func'
import { getUidStr } from '../utils/uid'
import validate from '../utils/validate'
import { formConsumer } from './formContext'
import { itemConsumer } from './itemContext'
import { loopConsumer } from './loopContext'

const types = ['formDatum', 'disabled', 'onError']

const consumer = compose(formConsumer(types), itemConsumer, loopConsumer)

export default curry(({ delay = 0 }, Origin) => consumer(class extends PureComponent {
  static propTypes = {
    datum: PropTypes.object,
    defaultValue: PropTypes.any,
    delay: PropTypes.number,
    formDatum: PropTypes.object,
    loopContext: PropTypes.object,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    required: PropTypes.bool,
    rules: PropTypes.array,
    type: PropTypes.string,
    value: PropTypes.any,
  }

  static defaultProps = {
    delay,
    onError: () => {},
    rules: [],
  }

  constructor(props) {
    super(props)

    const {
      formDatum, loopContext, name, defaultValue,
    } = props

    this.state = {
      error: undefined,
      value: props.value || defaultValue,
    }

    this.itemName = getUidStr()

    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.validate = this.validate.bind(this)

    if (formDatum && name) {
      formDatum.listen(name, this.handleUpdate, defaultValue, this.validate)
      this.state.value = formDatum.get(name)
    }

    if (loopContext) loopContext.listen(this.validate)
  }

  componentWillUnmount() {
    const { formDatum, name, loopContext } = this.props
    if (formDatum && name) {
      formDatum.unlisten(name, this.handleUpdate)
    }
    if (loopContext) loopContext.unlisten(this.validate)
  }

  getValue() {
    // if changeLocked, use state value
    if (this.changeLocked) return this.state.value

    const { formDatum, name, value } = this.props
    if (formDatum && name) return formDatum.get(name)
    return value === undefined ? this.state.value : value
  }

  validate(value, data) {
    const {
      onError, name, formDatum, type, datum,
    } = this.props

    if (value === undefined) value = this.getValue()

    let rules = [...this.props.rules]
    if (formDatum && name) {
      rules = rules.concat(formDatum.getRule(name))
      if (!data) data = formDatum.getValue()
    }

    if (datum) value = datum
    return validate(value, data, rules, type).then(() => {
      onError(this.itemName, null)
      this.setState({ error: undefined })
      return true
    }, (e) => {
      onError(this.itemName, e)
      this.setState({ error: e })
      return e
    })
  }

  change(value, ...args) {
    const { formDatum, name } = this.props
    if (formDatum && name) formDatum.set(name, value)
    else this.validate(value)

    if (this.props.onChange) this.props.onChange(value, ...args)
  }

  handleUpdate(value) {
    this.setState({ value })
    this.validate(value)
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
      formDatum, value, required, loopContext, ...other
    } = this.props

    console.log('render input', this.props.name, this.getValue())

    return (
      <Origin
        {...other}
        error={this.state.error}
        value={this.getValue()}
        onChange={this.handleChange}
      />
    )
  }
}))
