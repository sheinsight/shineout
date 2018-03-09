export default class {
  constructor(options = {}) {
    const { onChange } = options
    this.validate = options.validate
    this.data = {}
    this.onChange = onChange
  }

  handleChange() {
    if (this.onChange) this.onChange(this.data)
  }

  getValue(name) {
    return this.data[name]
  }

  setValue(name, value) {
    switch (arguments.length) {
      case 1:
        this.data = name
        break
      case 2:
        this.data[name] = value
        break
      default:
        return
    }

    this.handleChange()
  }
}
