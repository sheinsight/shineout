interface Listener extends Function {
  (...args: any[]): void
  fn?: Listener
}
interface Events {
  [event: string]: Listener[]
}

export default class Notification {
  $events: Events

  constructor() {
    this.$events = {}
  }

  dispatch(name: keyof Events, ...args: any[]) {
    const event = this.$events[name]
    if (!event) return
    event.forEach((fn: Function) => fn(...args))
  }

  subscribe(name: keyof Events, fn: Listener) {
    if (!this.$events[name]) this.$events[name] = []
    const events = this.$events[name]
    if (events.includes(fn)) return
    events.push(fn)
  }

  unsubscribe(name: keyof Events, fn: Listener) {
    if (!this.$events[name]) return

    if (fn) this.$events[name] = this.$events[name].filter(e => e !== fn)
    else delete this.$events[name]
  }
}
