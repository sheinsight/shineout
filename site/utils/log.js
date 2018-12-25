const originConsole = window.console

const stringify = arg => JSON.stringify(arg, (key, value) => {
  if (typeof value === 'function') {
    return `fn#fn${value.toString()}fn#fn`
  }
  return value
}, 2)

class Console {
  constructor() {
    this.logs = {
      default: [],
    }
    this.current = this.logs.default
  }

  setType(type) {
    if (!this.logs[type]) {
      this.logs[type] = []
    }
    this.current = this.logs[type]
  }

  log(...args) {
    const strs = args.map(arg => `${stringify(arg)}`)
    this.current.push(strs)
  }
}

export default {
  start() {
    window.console = new Console()
  },

  setType(type) {
    window.console.setType(type)
  },

  end() {
    const { logs } = window.console
    window.console = originConsole
    return logs
  },
}
