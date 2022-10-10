import deepEqual from 'deep-eql'
import shallowEqual from '../utils/shallowEqual'
import { CHANGE_TOPIC, ChangeType, WITH_OUT_DISPATCH } from "./types"
import {ListItemStandardProps, FormItemStandardProps, ObjectType} from '../@types/common'

interface ListDatumOptions<Item, Value>
  extends Pick<ListItemStandardProps<Item, Value>, 'format' | 'disabled'>,
  Pick<FormItemStandardProps<Value>, 'value' | 'onChange'> {
  separator?: string
  limit?: number
  distinct?: boolean,
  prediction?: (value: any, data: Item) => boolean
}

export default class<Item, Value> {
  distinct: ListDatumOptions<Item, Value>['distinct']
  prediction: ListDatumOptions<Item, Value>['prediction']
  onChange: ListDatumOptions<Item, Value>['onChange']
  limit: ListDatumOptions<Item, Value>['limit']
  separator?: ListDatumOptions<Item, Value>['separator']
  $events: ObjectType<Function[]>
  $cachedDisabled: ListDatumOptions<Item, Value>['disabled']
  $cachedFlatten: Map<any, any>
  valueMap: Map<any, boolean>
  disabled: (...args: any) => boolean
  format:  (...args: any) => unknown
  $values: any[]
  $cachedValue: Value
  updateLock: boolean

  constructor(args: ListDatumOptions<Item, Value> = {}) {
    const { format, onChange, separator, value, prediction, distinct, disabled, limit } = args

    this.distinct = distinct
    this.limit = limit
    this.separator = separator
    this.initFormat(format)
    this.$events = {}

    this.$cachedDisabled = undefined
    this.$cachedFlatten = new Map()
    this.setDisabled(disabled)

    if (prediction) this.prediction = prediction

    this.setValue(value, WITH_OUT_DISPATCH)
    this.onChange = onChange
  }

  get length() {
    return this.$values.length
  }

  // should clean $cachedFlatten when data changed
  cleanDataCache() {
    this.$cachedFlatten = new Map()
  }

  get values() {
    return this.$values
  }

  set values(values) {
    this.$values = values
    this.resetValueMap()
    this.dispatch(CHANGE_TOPIC)
    if (this.onChange) {
      this.onChange(this.getValue())
    }
  }

  resetValueMap() {
    const map = new Map()
    for (let i = 0; i < this.$values.length; i++) {
      map.set(this.$values[i], true)
    }
    this.valueMap = map
  }

  setDisabled(disabled: ListDatumOptions<Item, Value>['disabled']) {
    if (this.$cachedDisabled === disabled) return
    this.$cachedDisabled = disabled

    this.disabled = (data: Item,...obj) => {
      switch (typeof disabled) {
        case 'boolean':
          return disabled
        case 'function':
          return disabled(data,...obj)
        default:
          return false
      }
    }
  }

  handleChange(values: any[], ...args: any) {
    this.$values = values
    this.resetValueMap()
    this.dispatch(CHANGE_TOPIC)
    if (this.onChange) {
      this.onChange(this.getValue(), ...args)
    }
  }

  flattenTreeData(data: Item[], childrenKey: keyof Item) {
    const keys = data.map(v => this.format(v)).map(v => (typeof v === 'object' ? JSON.stringify(v) : v))
    const key = keys.join()
    if (keys.length !== 0) {
      const cached = this.$cachedFlatten.get(key)
      if (cached) return cached
    }
    const flatten: Item[] = []
    const deepAdd = (items: Item[]) => {
      items.forEach(item => {
        const exist = flatten.find(raw =>
          this.prediction ? this.prediction(raw as any , item) : this.format(raw) === this.format(item)
        )
        if (!exist) flatten.push(item)
        if (item[childrenKey]) deepAdd((item[childrenKey]) as unknown as Item[])
      })
    }
    deepAdd(data)
    if (keys.length) this.$cachedFlatten.set(key, flatten)
    return flatten
  }

  setLock(lock: boolean) {
    this.updateLock = lock
  }

  add(data: Item, _?: any, childrenKey?: keyof Item, unshift?: boolean) {
    if (data === undefined || data === null) return

    // clear value
    if (this.limit === 1) this.$values = []
    this.resetValueMap()

    let raws = Array.isArray(data) ? data : [data]
    if (childrenKey && this.limit !== 1) {
      raws = this.flattenTreeData(raws, childrenKey)
    }
    raws = raws.filter(v => {
      const disabled = this.disabled(v)
      if (disabled) return false
      if (this.distinct) return !this.check(v)
      return true
    })

    const values = []
    for (const r of raws) {
      const v = this.format(r)
      if (v !== undefined) values.push(v)
    }

    this.handleChange(unshift ? values.concat(this.values) : this.values.concat(values), data, true)
  }

  set(value: Item) {
    this.$values = []
    this.resetValueMap()
    this.add(value)
  }

  check(raw: Item) {
    if (this.prediction) {
      for (let i = 0, count = this.values.length; i < count; i++) {
        if (this.prediction(this.values[i], raw)) return true
      }
      return false
    }
    return !!this.valueMap.get(this.format(raw))
  }

  getDataByValue(data: Item[], value: Value extends (infer U)[] ? U : Value) {
    if (this.prediction) {
      for (let i = 0, count = data.length; i < count; i++) {
        if (this.prediction(value, data[i])) return data[i]
      }
      return null
    }
    return data.find(d => value === this.format(d))
  }

  clear() {
    this.values = []
  }

  dispatch(name: string, ...args: any) {
    const event = this.$events[name]
    if (!event) return
    event.forEach(fn => fn(...args))
  }

  initFormat(f: ListDatumOptions<Item, Value>['format']) {
    switch (typeof f) {
      case 'string':
        this.format = value => value[f]
        break
      case 'function':
        this.format = value => f(value)
        break
      default:
        this.format = a => a
        break
    }
  }

  defaultPrediction(value: unknown, data: Item) {
    return value === this.format(data)
  }

  remove(value: unknown, _: unknown, childrenKey: string) {
    if (value === undefined || value === null) return

    let raws = Array.isArray(value) ? value : [value]
    if (childrenKey) {
      raws = this.flattenTreeData(raws, childrenKey as any)
    }
    raws = raws.filter(r => !this.disabled(r))
    const values = []

    if (!this.prediction) {
      const rowValueMap = new Map()
      for (let i = 0; i < raws.length; i++) {
        if (raws[i].IS_NOT_MATCHED_VALUE) {
          rowValueMap.set(raws[i].value, true)
        } else {
          rowValueMap.set(this.format(raws[i]), true)
        }
      }
      for (let i = 0; i < this.values.length; i++) {
        const val = this.values[i]
        if (!rowValueMap.get(val)) {
          values.push(val)
        }
      }
    } else {
      const { prediction } = this
      outer: for (const val of this.values) {
        for (let j = 0; j < raws.length; j++) {
          if ((raws[j].IS_NOT_MATCHED_VALUE && val === raws[j].value) || prediction(val, raws[j])) {
            raws.splice(j, 1)
            continue outer
          }
        }
        values.push(val)
      }
    }

    // this.values = values
    this.handleChange(values, value, false)
  }

  subscribe(name: string, fn: Function) {
    if (!this.$events[name]) this.$events[name] = []
    const events = this.$events[name]
    if (events.includes(fn)) return
    events.push(fn)
  }

  unsubscribe(name: string, fn: Function) {
    if (!this.$events[name]) return
    this.$events[name] = this.$events[name].filter(e => e !== fn)
  }

  getValue() {
    let value: any = this.values
    // eslint-disable-next-line
    if (this.limit === 1) value = this.values[0]
    else if (this.separator) value = this.values.join(this.separator)
    this.$cachedValue = value
    return value
  }

  resetValue(values: any[], cached: boolean) {
    this.$values = values
    this.resetValueMap()
    if (this.onChange && !cached) {
      this.onChange(this.getValue())
    }
    this.dispatch(CHANGE_TOPIC)
    this.dispatch('set-value')
  }

  formatValue(values: Value | undefined) {
    if (this.limit === 1 && !Array.isArray(values)) {
      return [values]
    }

    if (!values) return []

    if (Array.isArray(values)) {
      return values
    }

    if (typeof values === 'string') {
      if (this.separator) {
        return values.split(this.separator).map(s => s.trim())
      }

      console.warn('Select separator parameter is empty.')
      return [values]
    }

    console.error(new Error('Select values is not valid.'))
    return []
  }

  setValue(values?: Value, type?: ChangeType ) {
    if (deepEqual(values, this.$values)) return
    if (type === WITH_OUT_DISPATCH) {
      this.$values = this.formatValue(values)
      this.resetValueMap()
    } else {
      this.resetValue(this.formatValue(values), shallowEqual(this.$cachedValue, values, {}))
    }
    this.$cachedValue = this.getValue()
  }
}
