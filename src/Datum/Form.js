import deepEqual from 'deep-eql'
import { unflatten, insertValue, spliceValue, getSthByName } from '../utils/flat'
import { fastClone, deepClone } from '../utils/clone'
import { deepGet, deepSet, deepRemove, deepMerge, objectValues } from '../utils/objects'
import { isObject, isArray } from '../utils/is'
import { promiseAll, FormError } from '../utils/errors'
import {
  updateSubscribe,
  errorSubscribe,
  changeSubscribe,
  VALIDATE_TOPIC,
  RESET_TOPIC,
  CHANGE_TOPIC,
  FORCE_PASS,
  ERROR_TYPE,
  IGNORE_VALIDATE,
} from './types'

export default class {
  constructor(options = {}) {
    const { removeUndefined = true, rules, onChange, value, error, initValidate } = options
    this.rules = rules
    this.onChange = onChange
    this.removeUndefined = removeUndefined

    // store names
    this.$inputNames = {}
    // store values
    this.$values = {}
    // store default value, for reset
    this.$defaultValues = {}
    this.$validator = {}
    this.$events = {}
    // handle global errors
    this.$errors = {}

    this.deepSetOptions = { removeUndefined, forceSet: true }

    if (value) this.setValue(value, initValidate ? undefined : IGNORE_VALIDATE)
    if (error) this.setError('', error)
  }

  handleChange() {
    if (this.onChange) this.onChange(this.getValue())
  }

  reset() {
    this.$errors = {}
    this.setValue(unflatten(fastClone(this.$defaultValues)), FORCE_PASS, true)
    this.handleChange()
    this.dispatch(RESET_TOPIC)
  }

  get(name) {
    if (Array.isArray(name)) return name.map(n => this.get(n))
    return deepGet(this.$values, name)
  }

  set(name, value, pub) {
    if (isObject(name)) {
      value = objectValues(name)
      name = Object.keys(name)
    }

    if (isArray(name)) {
      this.setArrayValue(name, value)
      return
    }

    if (value === this.get(name)) return
    deepSet(this.$values, name, value, this.deepSetOptions)

    if (this.$inputNames[name]) {
      this.dispatch(updateSubscribe(name), value, name)
      this.dispatch(changeSubscribe(name))
    }

    if (pub) this.publishValue(name, FORCE_PASS)

    this.dispatch(CHANGE_TOPIC)
    this.handleChange()
  }

  setArrayValue(names, values) {
    names.forEach((name, index) => {
      deepSet(this.$values, name, values[index], this.deepSetOptions)
    })

    names.forEach((name, index) => {
      if (this.$inputNames[name]) {
        this.dispatch(updateSubscribe(name), values[index], name)
        this.dispatch(changeSubscribe(name))
      }
    })

    this.dispatch(CHANGE_TOPIC)
    this.handleChange()
  }

  insert(name, index, value) {
    this.insertError(name, index, undefined)
    const val = this.get(name)
    if (val) {
      val.splice(index, 0, value)
      this.publishValue(name, IGNORE_VALIDATE)
      this.publishError(name)
    } else {
      this.set(name, [value])
    }
  }

  splice(name, index) {
    this.spliceError(name, index)
    const list = this.get(name)
    list.splice(index, 1)
    this.publishValue(name, IGNORE_VALIDATE)
    this.publishError(name)
  }

  remove(name) {
    deepRemove(this.$values, name)
  }

  publishValue(name, type) {
    const na = `${name}[`
    const no = `${name}.`
    Object.keys(this.$inputNames)
      .filter(n => n.indexOf(na) === 0 || n.indexOf(no) === 0)
      .forEach(n => {
        this.dispatch(updateSubscribe(n), this.get(n), n, type)
      })
  }

  getError(name, firstHand) {
    if (firstHand) return this.$errors[name]
    return getSthByName(name, this.$errors)
  }

  setError(name, error, pub) {
    if (error === undefined) delete this.$errors[name]
    else this.$errors[name] = error

    this.dispatch(errorSubscribe(name), this.getError(name), name, ERROR_TYPE)
    if (pub) this.publishError(name)
  }

  insertError(name, index, error) {
    insertValue(this.$errors, name, index, error)
  }

  spliceError(name, index) {
    spliceValue(this.$errors, name, index)
  }

  publishError(name) {
    const na = `${name}[`
    const no = `${name}.`
    Object.keys(this.$inputNames)
      .filter(n => n.indexOf(na) === 0 || n.indexOf(no) === 0)
      .forEach(n => {
        this.dispatch(errorSubscribe(n), this.getError(n), n, ERROR_TYPE)
      })
  }

  getRule(name) {
    if (!this.rules) return []
    return deepGet(this.rules, name) || []
  }

  getValue() {
    return deepClone(this.$values)
  }

  setValue(values = {}, type, forceSet) {
    if (!forceSet && deepEqual(values, this.$values)) return
    this.$values = deepMerge({}, values, { clone: true })

    // wait render end.
    setTimeout(() => {
      Object.keys(this.$inputNames)
        .sort((a, b) => a.length - b.length)
        .forEach(name => {
          this.dispatch(updateSubscribe(name), this.get(name), name, type)
          this.dispatch(changeSubscribe(name))
        })

      // for flow
      this.dispatch(CHANGE_TOPIC)
    })
  }

  bind(name, fn, value, validate) {
    if (this.$inputNames[name]) {
      console.warn(`There is already an item with name "${name}" exists. The name props must be unique.`)
    }

    if (value !== undefined && this.get(name) == null) {
      this.set(name, value, true)
      this.dispatch(changeSubscribe(name))
      this.dispatch(CHANGE_TOPIC)
    }

    if (value) this.$defaultValues[name] = fastClone(value)

    this.$validator[name] = validate
    this.$inputNames[name] = true
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
    delete this.$inputNames[name]
    delete this.$validator[name]
    delete this.$errors[name]
    delete this.$defaultValues[name]

    deepRemove(this.$values, name)

    setTimeout(() => {
      this.handleChange()
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

    if (fn) this.$events[name] = this.$events[name].filter(e => e !== fn)
    else delete this.$events[name]
  }

  validate(type) {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this.$validator)
      const values = this.getValue()

      const validates = [
        ...keys.map(k => this.$validator[k](this.get(k), values, type)),
        ...(this.$events[VALIDATE_TOPIC] || []).map(fn => fn()),
      ]

      Promise.all(validates)
        .then(res => {
          const error = res.find(r => r !== true)
          if (error === undefined) resolve(true)
          else reject(error)
        })
        .catch(e => {
          reject(new FormError(e))
        })
    })
  }

  validateFieldsByName(name, type) {
    if (!name || typeof name !== 'string') {
      return Promise.reject(new Error(`Name expect a string, get "${name}"`))
    }

    const validations = []
    const values = this.getValue()
    Object.keys(this.$validator).forEach(n => {
      if (n === name || n.indexOf(name) === 0) {
        validations.push(this.$validator[n](this.get(n), values, type))
      }
    })

    return promiseAll(validations)
  }

  validateFields(names, type) {
    if (!Array.isArray(names)) names = [names]
    const validates = names.map(n => this.validateFieldsByName(n, type))
    return promiseAll(validates)
  }

  validateClear() {
    const keys = Object.keys(this.$validator)
    this.$errors = {}
    const validates = keys.map(k => this.$validator[k](FORCE_PASS))
    Promise.all(validates)
  }
}
