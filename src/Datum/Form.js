export default class {
  constructor(options = {}) {
    const { onChange } = options
    this.validate = options.validate
    this.data = {}
    this.onChange = onChange

    this.events = {}
  }

  handleChange() {
    if (this.onChange) this.onChange(this.data)
  }

  clear() {
    this.data = {}
    Object.keys(this.events).forEach((name) => {
      this.dispatch(name)
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
        return
    }

    this.handleChange()
  }

  dispatch(name, ...args) {
    const event = this.events[name]
    if (!event) return
    event.forEach(fn => fn(...args))
  }

  listen(name, fn) {
    if (!this.events[name]) this.events[name] = []
    const events = this.events[name]
    if (fn in events) return
    events.push(fn)
  }

  unlisten(name, fn) {
    if (!fn) {
      delete this.events[name]
      return
    }

    if (!this.events[name]) return
    this.events[name] = this.events[name].filter(e => e !== fn)
  }
}
