export default class Notification {
  constructor() {
    this.$events = {}
  }

  dispatch(name, ...args) {
    const event = this.$events[name]
    if (!event) return
    event.forEach(fn => fn(...args))
  }

  subscribe(name, fn) {
    if (!this.$events[name]) this.$events[name] = []
    const events = this.$events[name]
    if (fn in events) return
    events.push(fn)
  }

  unsubscribe(name, fn) {
    if (!this.$events[name]) return

    if (fn) this.$events[name] = this.$events[name].filter(e => e !== fn)
    else delete this.$events[name]
  }
}
