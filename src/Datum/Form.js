import shallowEqual from '../utils/shallowEqual'

export default class {
  constructor(options = {}) {
    const { onChange } = options
    this.validate = options.validate
    this.data = {}
    this.onChange = onChange

    // store raw formdata
    this.$data = {}
    // store default value, for reset
    this.$defaultValue = {}

    this.events = {}
  }

  handleChange() {
    if (this.onChange) this.onChange(this.$data)
  }

  reset() {
    Object.keys(this.data).forEach((k) => {
      this.data[k] = this.$defaultValue[k]
    })
  }

  get(name) {
    return this.data[name]
  }

  set(name, value) {
    this.data[name] = value
    this.handleChange()
  }

  getValue() {
    return this.$data
  }

  setValue(data) {
    // data not change
    if (shallowEqual(data, this.$data)) return

    // shallow copy data ??
    // this.$data = {...data}
    this.$data = data

    Object.keys(this.data).forEach((name) => {
      this.data[name] = data[name]
    })
  }

  listen(name, fn, value) {
    if (Object.prototype.hasOwnProperty.call(this.data, name)) {
      console.error(`There is already an item with "${name}" exists. The name props must be unique.`)
      return
    }

    this.$defaultValue[name] = value

    Object.defineProperty(this.data, name, {
      configurable: true,
      enumerable: true,
      set: (val) => {
        this.$data[name] = val
        if (typeof fn === 'function') fn(val)
      },
      get: () => this.$data[name],
    })

    if (this.$data[name] === undefined) this.$data[name] = value
  }

  unlisten(name) {
    delete this.data[name]
  }
}
