import deepEqual from 'fast-deep-equal'

export default class {
  constructor(args = {}) {
    const {
      format, initValue, onChange, separator, values, prediction,
    } = args

    this.separator = separator
    this.initValue = initValue || (a => a)
    this.onChange = onChange
    this.initFormat(format)
    this.prediction = prediction || ((a, b) => a === b)

    if (separator && !format) {
      console.error('The separator parameter is not null, the format parameter can not be empty.')
    }

    this.setValue(values)
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

  handleChange() {
    if (this.onChange) this.onChange(this.getValue())
  }

  addValue(value) {
    this.values = [...this.values, value]
    this.handleChange()
  }

  removeValue(value) {
    this.values = this.values.filter(d => !deepEqual(d, value))
    this.handleChange()
  }

  check(value) {
    for (let i = 0, count = this.values.length; i <= count; i++) {
      if (this.prediction(value, this.values[i])) return true
    }
    return false
  }

  clear() {
    this.values = []
  }

  /*
  removeIndex(index) {
    this.values = this.values.filter((d, i) => !(index === i))
    this.handleChange()
  }
  */

  length() {
    return this.values.length
  }

  setValue(values = []) {
    if (Array.isArray(values)) {
      this.values = values
      return
    }

    if (typeof values === 'string') {
      if (this.separator) {
        this.values = values.split(this.separator)
      } else {
        console.error('The separator parameter is empty.')
      }
      this.values = []
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
