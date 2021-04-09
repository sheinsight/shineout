import deepEqual from 'deep-eql'
import shallowEqual from '../utils/shallowEqual'
import { CHANGE_TOPIC, WITH_OUT_DISPATCH } from './types'

export default class {
  constructor(args = {}) {
    const { format, onChange, separator, value, prediction, distinct, disabled, limit } = args

    this.distinct = distinct
    this.limit = limit
    this.separator = separator
    this.initFormat(format)
    this.$events = {}

    this.$cachedDisabled = {}
    this.$cachedFlatten = new Map()
    this.setDisabled(disabled)

    if (prediction) this.prediction = prediction

    this.setValue(value, WITH_OUT_DISPATCH)
    this.onChange = onChange
  }

  get length() {
    return this.$values.length
  }

  get values() {
    return this.$values
  }

  set values(values) {
    this.$values = values
    this.dispatch(CHANGE_TOPIC)
    if (this.onChange) {
      this.onChange(this.getValue())
    }
  }

  setDisabled(disabled) {
    if (this.$cachedDisabled === disabled) return
    this.$cachedDisabled = disabled

    this.disabled = (...obj) => {
      switch (typeof disabled) {
        case 'boolean':
          return disabled
        case 'function':
          return disabled(...obj)
        default:
          return false
      }
    }
  }

  handleChange(values, ...args) {
    this.$values = values
    this.dispatch(CHANGE_TOPIC)
    if (this.onChange) {
      this.onChange(this.getValue(), ...args)
    }
  }

  flattenTreeData(data, childrenKey) {
    const keys = data.map(v => this.format(v)).map(v => (typeof v === 'object' ? JSON.stringify(v) : v))
    const key = keys.join()
    if (keys.length !== 0) {
      const cached = this.$cachedFlatten.get(key)
      if (cached) return cached
    }
    const flatten = []
    const deepAdd = items => {
      items.forEach(item => {
        const exist = flatten.find(raw =>
          this.prediction ? this.prediction(raw, item) : this.format(raw) === this.format(item)
        )
        if (!exist) flatten.push(item)
        if (item[childrenKey]) deepAdd(item[childrenKey])
      })
    }
    deepAdd(data)
    if (keys.length) this.$cachedFlatten.set(key, flatten)
    return flatten
  }

  add(data, _, childrenKey, unshift) {
    if (data === undefined || data === null) return

    // clear value
    if (this.limit === 1) this.$values = []

    let raws = Array.isArray(data) ? data : [data]
    if (childrenKey && this.limit !== 1) {
      raws = this.flattenTreeData(raws, childrenKey)
    }
    raws = raws.filter(v => {
      const disabled = this.disabled(v)
      if (disabled) return false
      if (this.distinct) return !this.check(v)
      return true
    })

    const values = []
    for (const r of raws) {
      const v = this.format(r)
      if (v !== undefined) values.push(v)
    }

    this.handleChange(unshift ? values.concat(this.values) : this.values.concat(values), data, true)
  }

  set(value) {
    this.$values = []
    this.add(value)
  }

  check(raw) {
    if (this.prediction) {
      for (let i = 0, count = this.values.length; i < count; i++) {
        if (this.prediction(this.values[i], raw)) return true
      }
      return false
    }
    return this.values.indexOf(this.format(raw)) >= 0
  }

  getDataByValue(data, value) {
    if (this.prediction) {
      for (let i = 0, count = data.length; i < count; i++) {
        if (this.prediction(value, data[i])) return data[i]
      }
      return null
    }
    return data.find(d => value === this.format(d))
  }

  clear() {
    this.values = []
  }

  dispatch(name, ...args) {
    const event = this.$events[name]
    if (!event) return
    event.forEach(fn => fn(...args))
  }

  initFormat(f) {
    switch (typeof f) {
      case 'string':
        this.format = value => value[f]
        break
      case 'function':
        this.format = value => f(value)
        break
      default:
        this.format = a => a
        break
    }
  }

  defaultPrediction(value, data) {
    return value === this.format(data)
  }

  remove(value, _, childrenKey) {
    if (value === undefined || value === null) return

    let raws = Array.isArray(value) ? value : [value]
    if (childrenKey) {
      raws = this.flattenTreeData(raws, childrenKey)
    }
    raws = raws.filter(r => !this.disabled(r))
    const values = []

    const prediction = this.prediction || this.defaultPrediction.bind(this)

    outer: for (const val of this.values) {
      for (let j = 0; j < raws.length; j++) {
        if ((raws[j].IS_NOT_MATCHED_VALUE && val === raws[j].value) || prediction(val, raws[j])) {
          raws.splice(j, 1)
          continue outer
        }
      }
      values.push(val)
    }

    // this.values = values
    this.handleChange(values, value, false)
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

  getValue() {
    let value = this.values
    // eslint-disable-next-line
    if (this.limit === 1) value = this.values[0]
    else if (this.separator) value = this.values.join(this.separator)
    this.$cachedValue = value
    return value
  }

  resetValue(values, cached) {
    this.$values = values
    if (this.onChange && !cached) {
      this.onChange(this.getValue())
    }
    this.dispatch(CHANGE_TOPIC)
    this.dispatch('set-value')
  }

  formatValue(values = []) {
    if (this.limit === 1 && !Array.isArray(values)) {
      return [values]
    }

    if (!values) return []

    if (Array.isArray(values)) {
      return values
    }

    if (typeof values === 'string') {
      if (this.separator) {
        return values.split(this.separator).map(s => s.trim())
      }

      console.warn('Select separator parameter is empty.')
      return [values]
    }

    console.error(new Error('Select values is not valid.'))
    return []
  }

  setValue(values = [], type) {
    if (deepEqual(values, this.$values)) return
    if (type === WITH_OUT_DISPATCH) {
      this.$values = this.formatValue(values)
    } else {
      this.resetValue(this.formatValue(values), shallowEqual(this.$cachedValue, values))
    }
    this.$cachedValue = this.getValue()
  }
}
