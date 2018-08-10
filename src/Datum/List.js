import shallowEqual from '../utils/shallowEqual'

export default class {
  constructor(args = {}) {
    const {
      format, onChange, separator, value, prediction, distinct, disabled, limit,
    } = args

    this.distinct = distinct
    this.limit = limit
    this.separator = separator
    this.initFormat(format)
    this.$events = {}

    this.$cachedDisabled = {}
    this.setDisabled(disabled)

    if (prediction) this.prediction = prediction

    this.setValue(value)
    this.onChange = onChange
  }

  get length() {
    return this.values.length
  }

  get values() {
    return this.$values
  }

  set values(values) {
    this.$values = values
    this.dispatch('change')
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
    this.dispatch('change')
    if (this.onChange) {
      this.onChange(this.getValue(), ...args)
    }
  }

  add(data) {
    if (data === undefined || data === null) return

    // clear value
    if (this.limit === 1) this.$values = []

    let raws = Array.isArray(data) ? data : [data]
    raws = raws.filter((v) => {
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

    this.handleChange(this.values.concat(values), data, true)
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

  remove(value) {
    if (!value) return

    let raws = Array.isArray(value) ? value : [value]
    raws = raws.filter(r => !this.disabled(r))
    const values = []

    const prediction = this.prediction || this.defaultPrediction.bind(this)

    outer:
    for (const val of this.values) {
      for (let j = 0; j < raws.length; j++) {
        if (prediction(val, raws[j])) {
          raws.splice(j, 1)
          continue outer
        }
      }
      values.push(val)
    }

    // this.values = values
    this.handleChange(values, value, false)
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

  getValue() {
    let value = this.values
    // eslint-disable-next-line
    if (this.limit === 1) value = this.values[0]
    else if (this.separator) value = this.values.join(this.separator)
    this.$cachedValue = value
    return value
  }

  resetValue(values) {
    this.values = values
    this.dispatch('set-value')
  }

  setValue(values = []) {
    // value not change
    if (shallowEqual(this.$cachedValue, values)) return

    if (this.limit === 1 && !Array.isArray(values)) {
      this.resetValue([values])
      return
    }

    if (Array.isArray(values)) {
      this.resetValue(values)
      return
    }

    if (typeof values === 'string') {
      if (this.separator) {
        this.resetValue(values.split(this.separator).map(s => s.trim()))
      } else {
        this.resetValue([])
        console.error('The separator parameter is empty.')
      }
      return
    }

    console.error('Invalid values, expect Array of String.')
  }
}
