import shallowEqual from '../utils/shallowEqual'

export default class {
  constructor(options = {}) {
    const { removeUndefined = true, rules, onChange } = options
    this.data = {}
    this.rules = rules
    this.onChange = onChange
    this.removeUndefined = removeUndefined

    // store raw formdata
    this.$data = {}
    // store default value, for reset
    this.$defaultValue = {}
    this.$validator = {}

    this.events = {}
  }

  handleChange() {
    if (this.onChange) this.onChange(this.getValue())
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

  getRule(name) {
    if (!this.rules) return []
    return this.rules[name] || []
  }

  getValue() {
    if (this.removeUndefined) {
      Object.keys(this.$data).forEach((k) => {
        if (this.$data[k] === undefined) delete this.$data[k]
      })
    }
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

  listen(name, fn, value, validate) {
    if (Object.prototype.hasOwnProperty.call(this.data, name)) {
      console.error(`There is already an item with "${name}" exists. The name props must be unique.`)
      return
    }

    this.$defaultValue[name] = value
    this.$validator[name] = validate

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
    delete this.$data[name]
    delete this.data[name]
    delete this.$validator[name]
  }

  validate() {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this.$validator)
      let index = 0
      keys.forEach((k) => {
        this.$validator[k](this.data[k]).then((res) => {
          index += 1
          if (res === true) {
            if (index === keys.length) {
              resolve(true)
            }
          } else {
            reject(res)
          }
        })
      })
    })
  }
}
