import React, { Component } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { promiseAll, isSameError } from '../utils/errors'
import shallowEqual from '../utils/shallowEqual'
import { curry, compose } from '../utils/func'
import { filterProps } from '../utils/objects'
import { getUidStr } from '../utils/uid'
import validate from '../utils/validate'
import { FORCE_PASS, ERROR_TYPE, IGNORE_VALIDATE, errorSubscribe } from '../Datum/types'
import { formConsumer } from './formContext'
import { itemConsumer } from './Item'
import { loopConsumer } from './Loop'
import { fieldSetConsumer } from './FieldSet'

const types = ['formDatum', 'disabled']
const consumer = compose(formConsumer(types), itemConsumer, loopConsumer, fieldSetConsumer)

const tryValue = (val, def) => (val === undefined ? def : val)

const beforeValueChange = curry((fn, value, datum) => {
  if (!fn) return value
  const newValue = fn(value, datum)
  return newValue === undefined ? value : newValue
})

export default curry(Origin => consumer(class extends Component {
  static propTypes = {
    beforeChange: PropTypes.func,
    bind: PropTypes.array,
    bindInputToItem: PropTypes.func,
    defaultValue: PropTypes.any,
    fieldSetValidate: PropTypes.func,
    formDatum: PropTypes.object,
    innerFormNamePath: PropTypes.string,
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
    unbindInputFromItem: PropTypes.func,
    value: PropTypes.any,
    scuSkip: PropTypes.array,
  }

  static defaultProps = {
    onError: () => {},
    rules: [],
    scuSkip: ['onChange', 'rules'],
  }

  constructor(props) {
    super(props)

    const { formDatum, name, defaultValue } = props

    this.state = {
      error: undefined,
      value: props.value || defaultValue,
    }

    this.itemName = getUidStr()

    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDatumBind = this.handleDatumBind.bind(this)
    this.handleError = this.handleError.bind(this)
    this.validate = this.validate.bind(this)
    this.validateHook = this.validateHook.bind(this)

    this.lastValue = formDatum && name ? formDatum.get(name) : Symbol('empty')
  }

  componentDidMount() {
    const {
      formDatum, loopContext, name, defaultValue, bindInputToItem, popover,
    } = this.props

    if (formDatum && name) {
      if (Array.isArray(name)) {
        const dv = defaultValue || []

        name.forEach((n, i) =>
          formDatum.bind(n, this.handleUpdate, dv[i], this.validate))

        this.state.value = name.map(n => formDatum.get(n))
        formDatum.subscribe(errorSubscribe(this.errorName), this.handleUpdate)
      } else {
        formDatum.bind(name, this.handleUpdate, defaultValue, this.validate)
        this.state.value = formDatum.get(name)
      }
    }

    if (bindInputToItem && name && !popover) bindInputToItem(this.errorName)

    if (loopContext) loopContext.bind(this.validate)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const skip = [...(this.props.scuSkip || []), 'formDatum', 'loopContext']
    if (this.props.formDatum) skip.push('value')
    const options = { skip, deep: ['data', 'defaultValue', 'datum', 'name', 'rule', 'style'] }
    return !(shallowEqual(nextProps, this.props, options) && shallowEqual(nextState, this.state))
  }

  componentWillUnmount() {
    const {
      formDatum, name, loopContext, unbindInputFromItem,
    } = this.props

    if (formDatum && name) {
      formDatum.unbind(name, this.handleUpdate)
      if (Array.isArray(name)) {
        formDatum.unsubscribe(errorSubscribe(this.errorName), this.handleUpdate)
        formDatum.setError(this.errorName)
      }
    }
    if (unbindInputFromItem && name) unbindInputFromItem(this.errorName)
    if (loopContext) loopContext.unbind(this.validate)
    this.$willUnmount = true
  }

  setState(...args) {
    if (this.$willUnmount) return
    super.setState(...args)
  }

  get errorName() {
    const { name } = this.props
    return Array.isArray(name) ? name.join('|') : name
  }

  getValue() {
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
    return value === undefined && !formDatum ? this.state.value : value
  }

  getError() {
    const { formDatum, name } = this.props
    if (formDatum && name) {
      return formDatum.getError(this.errorName)
    }

    return this.state.error
  }

  handleDatumBind(datum) {
    this.datum = datum
  }

  handleError(error) {
    const { formDatum, name, onError } = this.props
    if (formDatum && name) {
      if (!isSameError(error, formDatum.getError(this.errorName, true))) {
        formDatum.setError(this.errorName, error, true)
      }
    } else {
      this.setState({ error })
    }

    if (!name && onError) onError(this.itemName, error)
  }

  validateHook(customValidate) {
    this.customValidate = customValidate
  }

  validate(value, data) {
    const { name, formDatum, bind } = this.props
    const names = Array.isArray(name) ? name : [name]

    const validates = []
    const validateProps = filterProps(this.props, v => typeof v === 'string' || typeof v === 'number')

    if (this.datum) {
      value = this.datum
      validateProps.type = 'array'
    }

    if (value === FORCE_PASS) {
      this.handleError()
      return Promise.resolve(true)
    }

    if (value === undefined || Array.isArray(name)) value = this.getValue()
    if (!Array.isArray(name)) value = [value]
    if (this.customValidate) validates.push(this.customValidate())
    if (formDatum && bind) formDatum.validateFields(bind).catch(() => {})
    if (!data && formDatum) data = formDatum.getValue()

    names.forEach((n, i) => {
      let rules = [...this.props.rules]
      if (formDatum && n) {
        rules = rules.concat(formDatum.getRule(n))
      }

      if (rules.length === 0) {
        return
      }

      validates.push(validate(value[i], data, rules, validateProps))
    })

    return promiseAll(validates).then((res) => {
      this.handleError(res === true ? undefined : res)
      return res
    }).catch((e) => {
      this.handleError(e)
      return e
    })
  }

  handleChange(value, ...args) {
    const {
      formDatum, name, fieldSetValidate, onChange,
    } = this.props
    const currentValue = this.getValue()
    if (args.length === 0 && shallowEqual(value, currentValue)) {
      return
    }

    const beforeChange = beforeValueChange(this.props.beforeChange)
    if (formDatum && name) {
      value = beforeChange(value, formDatum)
      if (Array.isArray(name)) {
        name.forEach((n, i) => {
          const v = (value || [])[i]
          if (v === formDatum.get(n)) return
          formDatum.set(n, v)
        })
      } else {
        formDatum.set(name, value)
      }
    } else {
      value = beforeChange(value, null)
      if (!onChange) this.setState({ value })
      this.validate(value).catch(() => {})
    }

    if (onChange) onChange(value, ...args)
    if (fieldSetValidate) fieldSetValidate(true)
  }

  handleUpdate(value, sn, type) {
    if (type === ERROR_TYPE) {
      if (!isSameError(value, this.state.error)) this.setState({ error: value })
      return
    }

    if (type === FORCE_PASS) {
      this.handleError()
      if (!this.$willUnmount) this.forceUpdate()
      return
    }

    const { name } = this.props
    const newValue = !Array.isArray(name) ? value : immer(this.getValue(), (draft) => {
      name.forEach((n, i) => {
        if (n === sn) draft[i] = value
      })
    })

    if (shallowEqual(newValue, this.lastValue)) return
    this.lastValue = newValue

    if (type !== IGNORE_VALIDATE) {
      if (this.updateTimer) clearTimeout(this.updateTimer)
      this.updateTimer = setTimeout(() => {
        this.validate(type === FORCE_PASS ? FORCE_PASS : newValue).catch(() => { })
      })
    }
    if (!this.$willUnmount) this.forceUpdate()
  }

  render() {
    const {
      formDatum, value, required, loopContext, bind,
      bindInputToItem, unbindInputFromItem, scuSkip, ...other
    } = this.props

    return (
      <Origin
        {...other}
        formDatum={formDatum}
        error={this.getError()}
        value={this.getValue()}
        onChange={this.handleChange}
        onDatumBind={this.handleDatumBind}
        validateHook={this.validateHook}
      />
    )
  }
}))
