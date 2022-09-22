interface Events {
  [events: string]: Function[]
}

export default class Notification {
  $events: Events

  constructor() {
    this.$events = {}
  }

  dispatch(name: string, ...args: Function[]) {
    const event = this.$events[name]
    if (!event) return
    event.forEach((fn: Function) => fn(...args))
  }

  subscribe(name: string, fn: Function) {
    if (!this.$events[name]) this.$events[name] = []
    const events = this.$events[name]
    if (events.includes(fn)) return
    events.push(fn)
  }

  unsubscribe(name: string, fn: Function) {
    if (!this.$events[name]) return

    if (fn) this.$events[name] = this.$events[name].filter(e => e !== fn)
    else delete this.$events[name]
  }
}
