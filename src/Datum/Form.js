import shallowEqual from '../utils/shallowEqual'
import isEmpty from '../utils/validate/isEmpty'

const { hasOwnProperty } = Object.prototype

// https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
function flatten(data) {
  if (isEmpty(data)) return {}
  const result = {}
  function recurse(cur, prop) {
    if (Object(cur) !== cur || Array.isArray(cur)) {
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
    return this.$values[name]
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
    if (this.removeUndefined) {
      Object.keys(this.$values).forEach((k) => {
        if (this.$values[k] === undefined) delete this.$values[k]
      })
    }
    return unflatten(this.$values)
  }

  setValue(rawValue) {
    const values = flatten(rawValue)

    // values not change
    if (shallowEqual(values, this.$values)) return
    console.log(values)

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
  }

  listen(name, fn, value, validate) {
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
        if (typeof fn === 'function') fn(val)
      },
      get: () => this.$values[name],
    })

    if (this.$values[name] === undefined) this.$values[name] = value
    if (value) this.handleChange()
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
