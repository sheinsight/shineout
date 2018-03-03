const originConsole = window.console

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
    const strs = args.map(arg => `${JSON.stringify(arg)}`)
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
