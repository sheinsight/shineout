import shallowEqual from '../utils/shallowEqual'
import isObject from '../utils/validate/isObject'
import { flatten, unflatten, insertValue, spliceValue, getSthByName, removeSthByName } from '../utils/flat'
import { promiseAll, FormError } from '../utils/errors'
import {
  updateSubscribe, errorSubscribe, changeSubscribe,
  VALIDATE_TOPIC, RESET_TOPIC, CHANGE_TOPIC, FORCE_PASS, ERROR_TYPE,
} from './types'

const { hasOwnProperty } = Object.prototype
const isEmptyObjectOrArray = (obj) => {
  if (Array.isArray(obj)) return obj.length === 0
  if (isObject(obj)) return Object.keys(obj).length === 0
  return false
}

export default class {
  constructor(options = {}) {
    const {
      removeUndefined = true, rules, onChange, value, trim, error,
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
    if (error) this.setError('', error)
  }

  handleChange() {
    if (this.onChange) this.onChange(this.getValue())
  }

  reset() {
    this.dispatch(RESET_TOPIC)
    this.$errors = {}
    this.setValue(this.$defaultValues, FORCE_PASS)
  }

  get(name) {
    return getSthByName(name, this.$values)
  }

  removeEmptyValue(name = '') {
    name.split('.').reduce((n, fn) => {
      if (isEmptyObjectOrArray(this.$values[n])) delete this.$values[n]
      return `${n}${n ? '.' : ''}${fn}`
    }, '')
  }

  set(name, value, skipArray = true) {
    if (typeof name === 'string' && name) this.removeEmptyValue(name)
    const flatValue = flatten(isObject(name) ? name : { [name]: value }, skipArray)
    Object.keys(flatValue).forEach((n) => {
      const newValue = flatValue[n]
      if (Array.isArray(newValue) && newValue.length > 0) this.forceSet(n, newValue, false)
      else this.$values[n] = flatValue[n]
    })

    if (this.values[name]) {
      this.dispatch(updateSubscribe(name), value)
      this.dispatch(changeSubscribe(name))
    } else {
      this.throughValue('', unflatten(flatValue))
    }

    this.dispatch(CHANGE_TOPIC)
    this.handleChange()
  }

  remove(name) {
    removeSthByName(name, this.$values)
  }

  forceSet(name, value, skipArray = false) {
    this.remove(name)
    this.set(name, value, skipArray)
  }

  getError(name) {
    return getSthByName(name, this.$errors)
  }

  setError(name, error, pub) {
    const flatErrors = flatten(isObject(name) ? name : { [name]: error }, true)
    Object.keys(flatErrors).forEach((n) => {
      this.$errors[n] = flatErrors[n]
    })

    if (pub) this.throughError('', unflatten(flatErrors))
  }

  removeError(name, pub) {
    removeSthByName(name, this.$errors)
    if (pub) {
      name.split('.').reduce((n, s) => {
        const nn = `${n}${n ? '.' : ''}${s}`
        this.dispatch(errorSubscribe(nn), this.getError(nn), ERROR_TYPE)
        return nn
      }, '')
    }
  }

  insertError(name, index, error) {
    insertValue(this.$errors, name, index, error)
  }

  spliceError(name, index) {
    spliceValue(this.$errors, name, index)
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

  setValue(rawValue = {}, forcePass) {
    const values = flatten(rawValue)

    // values not change
    if (shallowEqual(values, this.$values)) return

    // clear old values
    this.$values = {}

    Object.keys(values).forEach((name) => {
      this.$values[name] = values[name]
    })

    Object.keys(this.values).sort((a, b) => a.length - b.length).forEach((name) => {
      this.dispatch(updateSubscribe(name), this.get(name), forcePass || name)
      this.dispatch(changeSubscribe(name))
    })

    this.dispatch(CHANGE_TOPIC)
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

  throughError(path, error) {
    const names = []
    if (isObject(error)) {
      Object.keys(error).forEach((name) => {
        names.push([`${path}${path ? '.' : ''}${name}`, name])
      })
    } else if (Array.isArray(error)) {
      error.forEach((n, i) => names.push([`${path}${path ? '.' : ''}[${i}]`, i]))
    }

    names.forEach(([name, next]) => {
      if (this.values[name]) this.dispatch(errorSubscribe(name), this.getError(name), ERROR_TYPE)
      else this.throughError(name, error[next])
    })
  }

  bind(name, fn, value, validate) {
    if (hasOwnProperty.call(this.values, name)) {
      console.error(`There is already an item with name "${name}" exists. The name props must be unique.`)
    }

    if (value) this.$defaultValues[name] = value
    this.$validator[name] = validate

    this.values[name] = true

    if (value !== undefined && !this.get(name)) {
      const flatValue = flatten({ [name]: value })
      Object.keys(flatValue).forEach((n) => {
        this.$values[n] = flatValue[n]
        if (this.$values[n]) this.dispatch(updateSubscribe(n), flatValue[n], FORCE_PASS)
      })

      this.dispatch(changeSubscribe(name))
      this.dispatch(CHANGE_TOPIC)
    }

    this.subscribe(updateSubscribe(name), fn)
    this.subscribe(errorSubscribe(name), fn)
  }

  unbind(name) {
    if (Array.isArray(name)) {
      name.forEach(n => this.unbind(n))
      return
    }

    this.unsubscribe(updateSubscribe(name))
    this.unsubscribe(errorSubscribe(name))
    delete this.values[name]
    delete this.$defaultValues[name]
    delete this.$validator[name]
    delete this.$errors[name]

    // console.log(name, JSON.stringify(this.$values, null, 2))
    this.remove(name)
    // console.log(JSON.stringify(this.$values, null, 2))
    /*
    delete this.$values[name]
    name += '.'
    Object.keys(this.$values).forEach((key) => {
      if (key.indexOf(name) === 0) delete this.$values[key]
    })
    */
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

  // validate(changeState = false) {
  validate() {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this.$validator)
      // const values = { ...this.$values }
      const values = this.getValue()

      const validates = [
        ...keys.map(k => this.$validator[k](this.get(k), values)),
        ...(this.$events[VALIDATE_TOPIC] || []).map(fn => fn()),
      ]

      Promise.all(validates).then((res) => {
        const error = res.find(r => r !== true)
        if (error === undefined) resolve(true)
        else reject(error)
      }).catch((e) => {
        reject(new FormError(e))
      })
    })
  }

  validateFieldsByName(name) {
    if (!name || typeof name !== 'string') {
      return Promise.reject(new Error(`Name expect a string, get "${name}"`))
    }

    const validations = []
    const values = this.getValue()
    Object.keys(this.$validator).forEach((n) => {
      if (n === name || n.indexOf(name) === 0) {
        validations.push(this.$validator[n](this.get(n), values))
      }
    })

    return promiseAll(validations)
  }

  validateFields(names) {
    if (!Array.isArray(names)) names = [names]
    const values = this.getValue()
    const validates = []
    names.forEach((k) => {
      if (this.$validator[k]) {
        validates.push(this.$validator[k](this.get(k), values))
      }
    })
    return promiseAll(validates)
  }

  validateClear() {
    const keys = Object.keys(this.$validator)
    this.$errors = {}
    const validates = keys.map(k => this.$validator[k](FORCE_PASS))
    Promise.all(validates)
  }
}
