export default class {
  constructor(args = {}) {
    const {
      format, initValue, onChange, separator, values, prediction, distinct,
    } = args

    this.distinct = distinct
    this.separator = separator
    this.onChange = onChange

    this.initFormat(format)

    if (initValue) {
      this.initValue = initValue
    }

    if (prediction) {
      this.prediction = prediction
    }

    if (separator && !format) {
      console.error('The separator parameter is not null, the format parameter can not be empty.')
    }

    this.events = {}
    this.initValue(values)
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

  prediction(value, data) {
    return value === this.format(data)
  }

  handleChange(...args) {
    this.dispatch('change', ...args)
    if (this.onChange) {
      this.onChange(this.getValue(), ...args)
    }
  }

  addValue(value, ...args) {
    if (!value) return

    let raws = Array.isArray(value) ? [...value] : [value]
    if (this.distinct) {
      raws = raws.filter(v => !this.check(v))
    }

    this.values = this.values.concat(raws)
    this.handleChange(value, ...args)
  }

  removeValue(value, ...args) {
    if (!value) return

    const raws = Array.isArray(value) ? [...value] : [value]
    const values = []

    outer:
    for (const val of this.values) {
      for (let j = 0; j < raws.length; j++) {
        if (this.prediction(val, raws[j])) {
          raws.splice(j, 1)
          continue outer
        }
      }
      values.push(val)
    }

    this.values = values
    this.handleChange(value, ...args)
  }

  check(raw) {
    for (let i = 0, count = this.values.length; i < count; i++) {
      if (this.prediction(this.values[i], raw)) return true
    }
    return false
  }

  listen(name, fn) {
    if (!this.events[name]) this.events[name] = []
    const events = this.events[name]
    if (fn in events) return
    events.push(fn)
  }

  unlisten(name, fn) {
    if (!this.events[name]) return
    this.events[name] = this.events[name].filter(e => e !== fn)
  }

  dispatch(name, ...args) {
    const event = this.events[name]
    if (!event) return
    event.forEach(fn => fn(...args))
  }

  clear() {
    this.values = []
    this.dispatch('clear')
  }

  get length() {
    return this.values.length
  }

  initValue(values = []) {
    if (Array.isArray(values)) {
      this.values = values
      this.dispatch('init')
      return
    }

    if (typeof values === 'string') {
      if (this.separator) {
        this.values = values.split(this.separator)
      } else {
        console.error('The separator parameter is empty.')
      }
      this.values = []
      this.dispatch('init')
      return
    }

    console.error('Invalid values, expect Array of String.')
  }

  getValue() {
    const values = this.values.map(v => this.format(v))
    if (this.separator) return values.join(this.separator)
    return values
  }
}
