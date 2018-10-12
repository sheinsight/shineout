import shallowEqual from '../utils/shallowEqual'
import isEmpty from '../utils/validate/isEmpty'

const { hasOwnProperty } = Object.prototype

// https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
function flatten(data) {
  if (isEmpty(data)) return {}
  const result = {}
  function recurse(cur, prop) {
    if (Object(cur) !== cur || Array.isArray(cur) || cur instanceof Date) {
      result[prop] = cur
    } else {
      let empty = true
      // eslint-disable-next-line
      for (const p in cur) {
        empty = false
        recurse(cur[p], prop ? `${prop}.${p}` : p)
      }
      if (empty) { result[prop] = {} }
    }
  }
  recurse(data, '')
  return result
}

function unflatten(data) {
  if (Object(data) !== data || isEmpty(data) || Array.isArray(data)) {
    return data
  }

  const result = {}
  let {
    cur, prop, idx, last, temp,
  } = {}

  // eslint-disable-next-line
  for (const p in data) {
    cur = result
    prop = ''
    last = 0
    do {
      idx = p.indexOf('.', last)
      temp = p.substring(last, idx !== -1 ? idx : undefined)
      cur = cur[prop] || (cur[prop] = (!Number.isNaN(parseInt(temp, 10)) ? [] : {}))
      prop = temp
      last = idx + 1
    } while (idx >= 0)
    cur[prop] = data[p]
  }
  return result['']
}

export const FORCE_PASS = {}

export default class {
  constructor(options = {}) {
    const {
      removeUndefined = true, rules, onChange, value, trim,
    } = options
    this.values = {}
    this.rules = rules
    this.onChange = onChange
    this.removeUndefined = removeUndefined
    this.trimValue = trim

    // store raw form values
    this.$values = {}
    // store default value, for reset
    this.$defaultValues = {}
    this.$validator = {}
    this.$events = {}

    if (value) this.setValue(value)
  }

  handleChange() {
    if (this.onChange) this.onChange(this.getValue())
  }

  reset() {
    this.$values = {}

    // reset block
    this.dispatch('reset')

    Object.keys(this.values).forEach((k) => {
      this.values[k] = this.$defaultValues[k]
    })
  }

  get(name) {
    let value = this.$values[name]
    if (value) return value

    value = unflatten(this.$values)
    name.split('.').forEach((n) => {
      if (value) value = value[n]
      else value = undefined
    })

    return value
  }

  set(name, value) {
    if (hasOwnProperty.call(this.values, name)) {
      this.values[name] = value
    } else {
      this.$values[name] = value
    }
    this.handleChange()
  }

  getRule(name) {
    if (!this.rules) return []
    return this.rules[name] || []
  }

  getValue() {
    if (this.removeUndefined || this.trimValue) {
      Object.keys(this.$values).forEach((k) => {
        if (this.removeUndefined && this.$values[k] === undefined) {
          delete this.$values[k]
        }

        if (this.trimValue && typeof this.$values[k] === 'string') {
          this.$values[k] = this.$values[k].trim()
        }
      })
    }
    return unflatten(this.$values)
  }

  setValue(rawValue) {
    const values = flatten(rawValue)

    // values not change
    if (shallowEqual(values, this.$values)) return

    // clear old values
    this.$values = {}

    Object.keys(values).forEach((name) => {
      if (hasOwnProperty.call(this.values, name)) {
        if (!shallowEqual(this.values[name], values[name])) {
          this.values[name] = values[name]
        }
      } else {
        this.$values[name] = values[name]
      }
    })
    // remove empty value
    Object.keys(this.values).forEach((name) => {
      if (!hasOwnProperty.call(values, name)) {
        this.values[name] = this.get(name)
      }
    })
  }

  bind(name, fn, value, validate, initChange) {
    if (hasOwnProperty.call(this.values, name)) {
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
        if (typeof fn === 'function') fn(val, name)
        this.dispatch(`${name}-change`)
        this.dispatch('change')
      },
      get: () => this.$values[name],
    })

    if (this.$values[name] === undefined && value !== undefined) {
      this.$values[name] = value
      if (initChange) this.handleChange()
    }
  }

  unbind(name) {
    delete this.$values[name]
    delete this.values[name]
    delete this.$validator[name]
  }

  dispatch(name, ...args) {
    const event = this.$events[name]
    if (!event) return
    event.forEach(fn => fn(...args))
  }

  listen(name, fn) {
    if (!this.$events[name]) this.$events[name] = []
    const events = this.$events[name]
    if (fn in events) return
    events.push(fn)
  }

  unlisten(name, fn) {
    if (!this.$events[name]) return
    this.$events[name] = this.$events[name].filter(e => e !== fn)
  }

  validate(changeState = false) {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this.$validator)
      const values = { ...this.$values }

      const validates = [
        ...keys.map(k => this.$validator[k](this.values[k], values, !changeState)),
        ...(this.$events.validate || []).map(fn => fn()),
      ]

      Promise.all(validates).then((res) => {
        const error = res.find(r => r !== true)
        if (error === undefined) resolve(true)
        else reject(error)
      })
    })
  }

  validateFields(names) {
    if (!Array.isArray(names)) names = [names]
    const values = { ...this.$values }
    const validates = []
    names.forEach((k) => {
      if (this.$validator[k]) {
        validates.push(this.$validator[k](this.values[k], values))
      }
    })
    Promise.all(validates)
  }

  validateClear() {
    const keys = Object.keys(this.$validator)
    const validates = keys.map(k => this.$validator[k](FORCE_PASS))
    Promise.all(validates)
  }
}
