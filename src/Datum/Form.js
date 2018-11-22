import shallowEqual from '../utils/shallowEqual'
import isObject from '../utils/validate/isObject'
import { flatten, unflatten } from '../utils/objects'

const { hasOwnProperty } = Object.prototype

export const FORCE_PASS = {}

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
    let value = this.$values[name]
    if (value) return value

    value = unflatten(this.$values)
    name.split('.').forEach((n) => {
      if (value) value = value[n]
      else value = undefined
    })

    return value
  }

  set(name, value) {
    const obj = isObject(name) ? name : { [name]: value }
    Object.keys(obj).forEach((n) => {
      if (hasOwnProperty.call(this.values, n)) {
        if (!shallowEqual(this.values[n], obj[n])) {
          this.values[n] = obj[n]
        }
      } else {
        this.$values[n] = obj[n]
      }
    })
    this.handleChange()
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
      if (hasOwnProperty.call(this.values, name)) {
        if (!shallowEqual(this.values[name], values[name])) {
          this.values[name] = values[name]
        }
      } else {
        this.$values[name] = values[name]
      }
    })
    // remove empty value
    Object.keys(this.values).forEach((name) => {
      if (!hasOwnProperty.call(values, name)) {
        this.values[name] = this.get(name)
      }
    })
  }

  bind(name, fn, value, validate, initChange) {
    if (hasOwnProperty.call(this.values, name)) {
      console.error(`There is already an item with name "${name}" exists. The name props must be unique.`)
      return
    }

    this.$defaultValues[name] = value
    this.$validator[name] = validate

    Object.defineProperty(this.values, name, {
      configurable: true,
      enumerable: true,
      set: (val) => {
        this.$values[name] = val
        if (typeof fn === 'function') fn(val, name)
        this.dispatch(`${name}-change`)
        this.dispatch('change')
      },
      get: () => this.$values[name],
    })

    if (this.$values[name] === undefined && value !== undefined) {
      this.$values[name] = value
      if (initChange) this.handleChange()
    }
  }

  unbind(name) {
    delete this.$values[name]
    delete this.values[name]
    delete this.$validator[name]
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

  listen(name, fn) {
    if (!this.$events[name]) this.$events[name] = []
    const events = this.$events[name]
    if (fn in events) return
    events.push(fn)
  }

  unlisten(name, fn) {
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
