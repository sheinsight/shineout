export default class {
  constructor(options = {}) {
    const { onChange } = options
    this.validate = options.validate
    this.data = {}
    this.$data = {}
    this.$defaultValue = {}
    this.onChange = onChange

    this.events = {}
  }

  handleChange() {
    if (this.onChange) this.onChange(this.$data)
  }

  clear() {
    Object.keys(this.data).forEach((k) => {
      this.data[k] = this.$defaultValue[k]
    })
  }

  get(name) {
    return this.data[name]
  }

  set(name, value) {
    switch (arguments.length) {
      case 1:
        this.data = name
        break
      case 2:
        this.data[name] = value
        break
      default:
    }

    this.handleChange()
  }

  getValue() {
    return this.$data
  }

  listen(name, fn, value) {
    const { $data, $defaultValue } = this
    $defaultValue[name] = value

    Object.defineProperty(this.data, name, {
      configurable: true,
      enumerable: true,
      set(val) {
        $data[name] = val
        if (typeof fn === 'function') fn(val)
      },
      get() {
        return $data[name]
      },
    })

    this.data[name] = value
  }

  unlisten(name) {
    delete this.data[name]
  }
}
