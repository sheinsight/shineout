import shallowEqual from '../utils/shallowEqual'
import isObject from '../utils/validate/isObject'
import { flatten, unflatten } from '../utils/objects'
import { updateSubscribe, errorSubscribe, changeSubscribe, FORCE_PASS, ERROR_TYPE } from './pubsub'

const { hasOwnProperty } = Object.prototype

const getSthByName = (name, source) => {
  let result = source[name]
  if (result) return result

  result = unflatten(source)
  name.split('.').forEach((n) => {
    if (result) result = result[n]
    else result = undefined
  })

  return result
}

export default class {
  constructor(options = {}) {
    const {
      removeUndefined = true, rules, onChange, value, trim,
    } = options
    this.values = {}
    this.rules = rules
    this.onChange = onChange
    this.removeUndefined = removeUndefined
    this.trimValue = trim

    // store raw form values
    this.$values = {}
    // store default value, for reset
    this.$defaultValues = {}
    this.$validator = {}
    this.$events = {}
    // handle global errors
    this.$errors = {}

    if (value) this.setValue(value)
  }

  handleChange() {
    if (this.onChange) this.onChange(this.getValue())
  }

  reset() {
    this.$values = {}

    // reset block
    this.dispatch('reset')

    Object.keys(this.values).forEach((k) => {
      this.values[k] = this.$defaultValues[k]
    })
  }

  get(name) {
    return getSthByName(name, this.$values)
  }

  set(name, value, skipArray = true) {
    const flatValue = flatten(isObject(name) ? name : { [name]: value }, skipArray)
    Object.keys(flatValue).forEach((n) => {
      const newValue = flatValue[n]
      if (Array.isArray(newValue) && newValue.length > 0) this.forceSet(n, newValue, false)
      else this.$values[n] = flatValue[n]
    })

    this.throughValue('', unflatten(flatValue))
    this.dispatch('change')
    this.handleChange()
  }

  getError(name) {
    return getSthByName(name, this.$errors)
  }

  setError(name, errors) {
    const flatErrors = flatten(isObject(name) ? name : { [name]: errors })
    Object.keys(flatErrors).forEach((n) => {
      this.$errors[n] = flatErrors[n]
      this.dispatch(errorSubscribe(n), flatErrors[n], ERROR_TYPE)
    })
  }

  forceSet(name, value, skipArray = false) {
    Object.keys(this.$values).forEach((n) => {
      if (n === name || n.indexOf(`${name}.`) === 0) {
        delete this.$values[n]
      }
    })
    console.log(name, this.$values)
    this.set(name, value, skipArray)
  }

  getRule(name) {
    if (!this.rules) return []
    return this.rules[name] || []
  }

  getValue() {
    if (this.removeUndefined || this.trimValue) {
      Object.keys(this.$values).forEach((k) => {
        if (this.removeUndefined && this.$values[k] === undefined) {
          delete this.$values[k]
        }

        if (this.trimValue && typeof this.$values[k] === 'string') {
          this.$values[k] = this.$values[k].trim()
        }
      })
    }
    return unflatten(this.$values)
  }

  setValue(rawValue) {
    const values = flatten(rawValue)

    // values not change
    if (shallowEqual(values, this.$values)) return

    // clear old values
    this.$values = {}

    Object.keys(values).forEach((name) => {
      this.$values[name] = values[name]
    })

    Object.keys(this.values).forEach((name) => {
      this.dispatch(updateSubscribe(name), this.get(name), name)
      this.dispatch(changeSubscribe(name))
    })

    this.dispatch('change')
  }

  throughValue(path, value) {
    if (isObject(value)) {
      Object.keys(value).forEach((name) => {
        const newName = `${path}${path ? '.' : ''}${name}`
        if (hasOwnProperty.call(this.values, newName)) {
          this.dispatch(updateSubscribe(newName), this.get(newName), newName)
          this.dispatch(changeSubscribe(newName))
        } else {
          this.throughValue(newName, value[name])
        }
      })
    }
  }

  valueSetter(name, fn, val) {
    if (isObject(val) || Array.isArray(val)) {
      const values = flatten(val)
      Object.keys(values).forEach((key) => {
        this.$values[`${name}.${key}`] = values[key]
      })
    } else {
      this.$values[name] = val
    }

    if (typeof fn === 'function') fn(val, name)
    this.dispatch(changeSubscribe(name))
    this.dispatch('change')
  }

  bind(name, fn, value, validate, initChange) {
    if (hasOwnProperty.call(this.values, name)) {
      console.error(`There is already an item with name "${name}" exists. The name props must be unique.`)
    }

    this.$defaultValues[name] = value
    this.$validator[name] = validate

    Object.defineProperty(this.values, name, {
      configurable: true,
      enumerable: true,
      set: val => this.valueSetter(name, fn, val),
      get: () => this.get(name),
    })

    if (value !== undefined) {
      const flatValue = flatten({ [name]: value })
      Object.keys(flatValue).forEach((n) => { this.$values[n] = flatValue[n] })
      if (initChange) this.handleChange()

      this.dispatch(changeSubscribe(name))
      this.dispatch('change')
    }

    this.subscribe(updateSubscribe(name), fn)
    this.subscribe(errorSubscribe(name), fn)
  }

  unbind(name) {
    delete this.$values[name]
    delete this.values[name]
    delete this.$validator[name]
    this.unsubscribe(updateSubscribe(name))
    name += '.'
    Object.keys(this.$values).forEach((key) => {
      if (key.indexOf(name) === 0) delete this.$values[key]
    })
  }

  dispatch(name, ...args) {
    const event = this.$events[name]
    if (!event) return
    event.forEach(fn => fn(...args))
  }

  subscribe(name, fn) {
    if (!this.$events[name]) this.$events[name] = []
    const events = this.$events[name]
    if (fn in events) return
    events.push(fn)
  }

  unsubscribe(name, fn) {
    if (!this.$events[name]) return
    this.$events[name] = this.$events[name].filter(e => e !== fn)
  }

  validate(changeState = false) {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this.$validator)
      const values = { ...this.$values }

      const validates = [
        ...keys.map(k => this.$validator[k](this.values[k], values, !changeState)),
        ...(this.$events.validate || []).map(fn => fn()),
      ]

      Promise.all(validates).then((res) => {
        const error = res.find(r => r !== true)
        if (error === undefined) resolve(true)
        else reject(error)
      })
    })
  }

  validateFields(names) {
    if (!Array.isArray(names)) names = [names]
    const values = { ...this.$values }
    const validates = []
    names.forEach((k) => {
      if (this.$validator[k]) {
        validates.push(this.$validator[k](this.values[k], values))
      }
    })
    Promise.all(validates)
  }

  validateClear() {
    const keys = Object.keys(this.$validator)
    const validates = keys.map(k => this.$validator[k](FORCE_PASS))
    Promise.all(validates)
  }
}
