import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { curry, compose } from '../utils/func'
import { getUidStr } from '../utils/uid'
import validate from '../utils/validate'
import { FORCE_PASS } from '../Datum/Form'
import { formConsumer } from './formContext'
import { itemConsumer } from './itemContext'
import { loopConsumer } from './loopContext'

const types = ['formDatum', 'disabled', 'onError']
const consumer = compose(formConsumer(types), itemConsumer, loopConsumer)

const tryValue = (val, def) => (val === undefined ? def : val)

export default curry(Origin => consumer(class extends PureComponent {
  static propTypes = {
    beforeChange: PropTypes.func,
    bind: PropTypes.array,
    defaultValue: PropTypes.any,
    formDatum: PropTypes.object,
    loopContext: PropTypes.object,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    onChange: PropTypes.func,
    onError: PropTypes.func,
    required: PropTypes.bool,
    rules: PropTypes.array,
    type: PropTypes.string,
    value: PropTypes.any,
  }

  static defaultProps = {
    onError: () => {},
    rules: [],
  }

  constructor(props) {
    super(props)

    const { defaultValue } = props

    this.state = {
      error: undefined,
      value: props.value || defaultValue,
    }

    this.itemName = getUidStr()

    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDatumBind = this.handleDatumBind.bind(this)
    this.validate = this.validate.bind(this)
    this.validateHook = this.validateHook.bind(this)
  }

  componentDidMount() {
    const {
      formDatum, loopContext, name, defaultValue,
    } = this.props

    if (formDatum && name) {
      if (Array.isArray(name)) {
        const dv = defaultValue || []

        name.forEach((n, i) =>
          formDatum.bind(n, this.handleUpdate, dv[i], this.validate, !!defaultValue))

        this.state.value = name.map(n => formDatum.get(n))
      } else {
        formDatum.bind(name, this.handleUpdate, defaultValue, this.validate, !!defaultValue)
        this.state.value = formDatum.get(name)
      }
    }

    if (loopContext) loopContext.bind(this.validate)
  }

  componentWillUnmount() {
    const { formDatum, name, loopContext } = this.props
    if (formDatum && name) {
      formDatum.unbind(name, this.handleUpdate)
    }
    if (loopContext) loopContext.unbind(this.validate)
    this.$willUnmount = true
  }

  setState(...args) {
    if (this.$willUnmount) return
    super.setState(...args)
  }

  getValue() {
    // if changeLocked, use state value
    if (this.changeLocked) return this.state.value

    const {
      formDatum, name, value, defaultValue,
    } = this.props
    if (formDatum && name) {
      if (Array.isArray(name)) {
        const dv = defaultValue || []
        return name.map((n, i) => tryValue(formDatum.get(n), dv[i]))
      }
      return tryValue(formDatum.get(name), defaultValue)
    }
    return value === undefined ? this.state.value : value
  }

  handleDatumBind(datum) {
    this.datum = datum
  }

  validateHook(customValidate) {
    this.customValidate = customValidate
  }

  validate(value, data, validateOnly) {
    if (this.customValidate) {
      const error = this.customValidate()
      if (error) return Promise.resolve(error)
    }

    const {
      onError, name, formDatum, type, bind,
    } = this.props

    if (value === FORCE_PASS) {
      onError(this.itemName, null)
      this.setState({ error: undefined })
      return Promise.resolve(true)
    }
    if (value === undefined || Array.isArray(name)) value = this.getValue()

    if (formDatum && bind) formDatum.validateFields(bind)

    if (typeof name === 'string' || !name) {
      let rules = [...this.props.rules]
      if (formDatum && name) {
        rules = rules.concat(formDatum.getRule(name))
        if (!data) data = formDatum.getValue()
      }

      if (rules.length === 0) {
        return Promise.resolve(true)
      }

      if (this.datum) value = this.datum
      return validate(value, data, rules, type).then(() => {
        if (validateOnly !== true) {
          onError(this.itemName, null)
          this.setState({ error: undefined })
        }
        return true
      }, (e) => {
        onError(this.itemName, e)
        this.setState({ error: e })
        return e
      })
    }

    if (!formDatum || !name) return Promise.resolve(true)

    if (!data) data = formDatum.getValue()
    const validates = name.map((n, i) => {
      let rules = (this.props.rules || [])[n] || []
      rules = rules.concat(formDatum.getRule(n))

      return validate(value[i], data, rules, type)
    })

    return Promise.all(validates).then(() => {
      onError(this.itemName, null)
      this.setState({ error: undefined })
      return true
    }, (e) => {
      onError(this.itemName, e)
      this.setState({ error: e })
      return e
    })
  }

  handleChange(value, ...args) {
    const { formDatum, name, beforeChange } = this.props
    if (formDatum && name) {
      if (Array.isArray(name)) {
        name.forEach((n, i) => {
          let v = (value || [])[i]
          if (beforeChange) v = beforeChange(v)
          if (v !== formDatum.get(n)) formDatum.set(n, v)
        })
      } else {
        if (beforeChange) value = beforeChange(value)
        formDatum.set(name, value)
      }
    } else {
      if (beforeChange) value = beforeChange(value)
      this.setState({ value })
      this.validate(value)
    }

    if (this.props.onChange) this.props.onChange(value, ...args)
  }

  handleUpdate(value, sn) {
    const { name } = this.props
    if (typeof name === 'string') {
      this.setState({ value })
      this.validate(value)
      return
    }

    let newValue = this.getValue()
    newValue = immer(newValue, (draft) => {
      name.forEach((n, i) => {
        if (n === sn) draft[i] = value
      })
    })

    this.setState({ value: newValue })
    this.validate(newValue)
  }

  render() {
    const {
      formDatum, value, required, loopContext, bind, ...other
    } = this.props

    return (
      <Origin
        {...other}
        formDatum={formDatum}
        error={this.state.error}
        value={this.getValue()}
        onChange={this.handleChange}
        onDatumBind={this.handleDatumBind}
        validateHook={this.validateHook}
      />
    )
  }
}))
