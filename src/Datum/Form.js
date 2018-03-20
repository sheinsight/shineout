import shallowEqual from '../utils/shallowEqual'

export default class {
  constructor(options = {}) {
    const { removeUndefined = true, rules, onChange } = options
    this.values = {}
    this.rules = rules
    this.onChange = onChange
    this.removeUndefined = removeUndefined

    // store raw form values
    this.$values = {}
    // store default value, for reset
    this.$defaultValues = {}
    this.$validator = {}

    this.events = {}
  }

  handleChange() {
    if (this.onChange) this.onChange(this.getValue())
  }

  reset() {
    Object.keys(this.values).forEach((k) => {
      this.values[k] = this.$defaultValues[k]
    })
  }

  get(name) {
    return this.values[name]
  }

  set(name, value) {
    this.values[name] = value
    this.handleChange()
  }

  getRule(name) {
    if (!this.rules) return []
    return this.rules[name] || []
  }

  getValue() {
    if (this.removeUndefined) {
      Object.keys(this.$values).forEach((k) => {
        if (this.$values[k] === undefined) delete this.$values[k]
      })
    }
    return this.$values
  }

  setValue(values) {
    // values not change
    if (shallowEqual(values, this.$values)) return

    // clear old values
    this.$values = {}

    Object.keys(values).forEach((name) => {
      if (Object.prototype.hasOwnProperty.call(this.values, name)) {
        if (!shallowEqual(this.values[name], values[name])) {
          this.values[name] = values[name]
        }
      } else {
        this.$values[name] = values[name]
      }
    })
  }

  listen(name, fn, value, validate) {
    if (Object.prototype.hasOwnProperty.call(this.values, name)) {
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
        if (typeof fn === 'function') fn(val)
      },
      get: () => this.$values[name],
    })

    if (this.$values[name] === undefined) this.$values[name] = value

    this.handleChange()
  }

  unlisten(name) {
    delete this.$values[name]
    delete this.values[name]
    delete this.$validator[name]

    this.handleChange()
  }

  validate() {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this.$validator)
      const values = { ...this.$values }

      let index = 0
      keys.forEach((k) => {
        this.$validator[k](this.values[k], values).then((res) => {
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
