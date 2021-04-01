import { CHANGE_TOPIC } from './types'

const IS_NOT_MATCHED_VALUE = 'IS_NOT_MATCHED_VALUE'

export const CheckedMode = {
  // 只返回全选数据，包含父节点和子节点
  Full: 0,

  // 返回全部选择字节点和部分选中的父节点
  Half: 1,

  // 只返回选中子节点
  Child: 2,

  // 如果父节点下所有子节点全部选中，只返回父节点
  Shallow: 3,

  // 所选即所得
  Freedom: 4,
}

// check status stack
const checkStatusStack = (stack, defaultStatus) => {
  if (!stack || stack.length <= 0) return defaultStatus
  if (stack.filter(d => d === 0).length === stack.length) return 0

  const s = stack.filter(d => d === 0 || d === 2)

  if (s.length <= 0) return defaultStatus
  return 2
}

export default class {
  constructor(options = {}) {
    const { data, value, keygen, mode, disabled, childrenKey = 'children', unmatch } = options

    this.keygen = keygen
    this.mode = mode
    this.valueMap = new Map()
    this.unmatchedValueMap = new Map()
    this.unmatch = unmatch
    this.events = {}
    this.$events = {}
    this.disabled = disabled || (() => false)
    this.childrenKey = childrenKey

    this.setValue(value)
    this.setData(data)
  }

  bind(id, update) {
    this.events[id] = update
  }

  unbind(id) {
    delete this.events[id]
  }

  setUnmatedValue() {
    if (!this.value || !this.data) return
    this.value.forEach(v => {
      const data = this.getDataById(v)
      const unmatched = data && data[IS_NOT_MATCHED_VALUE]
      if (unmatched) this.unmatchedValueMap.set(v, true)
      else this.unmatchedValueMap.delete(v)
    })
  }

  setValue(value) {
    this.value = value
    if (value && value !== this.cachedValue) {
      this.initValue()
    }
    this.setUnmatedValue()
  }

  getValue() {
    const value = []
    this.valueMap.forEach((checked, id) => {
      switch (this.mode) {
        case CheckedMode.Full:
        case CheckedMode.Freedom:
          if (checked === 1) value.push(id)
          break
        case CheckedMode.Half:
          if (checked >= 1) value.push(id)
          break
        case CheckedMode.Child:
          if (checked === 1 && this.pathMap.get(id).children.length === 0) value.push(id)
          break
        case CheckedMode.Shallow:
          if (checked === 1) {
            const parentChecked = (() => {
              const { path } = this.pathMap.get(id)
              const pid = path[path.length - 1]
              if (!pid) return false
              return this.valueMap.get(pid) === 1
            })()
            if (!parentChecked) value.push(id)
          }
          break
        default:
      }
    })
    this.unmatchedValueMap.forEach((unmatch, id) => {
      if (unmatch && this.unmatch) value.push(id)
    })
    this.cachedValue = value
    return value
  }

  setValueMap(id, checked) {
    this.valueMap.set(id, checked)
    const update = this.events[id]
    if (update) update()
  }

  set(id, checked, direction) {
    // self
    if (!this.isDisabled(id)) this.setValueMap(id, checked)

    if (CheckedMode.Freedom === this.mode) {
      // Free mode will return zero
      return 0
    }
    const data = this.getDataById(id)
    if (data && data[IS_NOT_MATCHED_VALUE]) {
      if (checked) this.unmatchedValueMap.set(id, true)
      else this.unmatchedValueMap.delete(id)
      return null
    }

    const { path, children } = this.pathMap.get(id)

    const childrenStack = []
    // children
    if (direction !== 'asc') {
      children.forEach(cid => {
        // push status to stack
        childrenStack.push(this.set(cid, checked, 'desc'))
      })
    }

    // Exclude disabled
    let current = this.valueMap.get(id)

    // check all children status
    const status = checkStatusStack(childrenStack, current)

    if (status !== current) {
      this.setValueMap(id, status)
      current = status
    }

    // parent
    if (direction !== 'desc' && path.length > 0) {
      const parentId = path[path.length - 1]
      let parentChecked = current
      this.pathMap.get(parentId).children.forEach(cid => {
        if (parentChecked !== this.valueMap.get(cid)) {
          parentChecked = 2
        }
      })
      this.set(parentId, parentChecked, 'asc')
    }
    return current
  }

  isDisabled(id) {
    const node = this.pathMap.get(id)
    if (node) return node.isDisabled
    return false
  }

  get(id) {
    return this.valueMap.get(id)
  }

  getDataById(id) {
    const oroginData = this.dataMap.get(id)
    if (oroginData) return oroginData
    if (!this.unmatch) return null
    return { [IS_NOT_MATCHED_VALUE]: true, value: id }
  }

  getPath(id) {
    return this.pathMap.get(id)
  }

  getChecked(id) {
    const value = this.get(id)
    let checked = value === 1
    if (value === 2) checked = 'indeterminate'
    return checked
  }

  getKey(data, id = '', index) {
    if (typeof this.keygen === 'function') return this.keygen(data, id)
    if (this.keygen) return data[this.keygen]
    return id + (id ? ',' : '') + index
  }

  initValue(ids, forceCheck) {
    if (!this.data || !this.value) return undefined

    if (!ids) {
      ids = []
      this.pathMap.forEach((val, id) => {
        if (val.path.length === 0) ids.push(id)
      })
    }

    let checked
    ids.forEach(id => {
      const { children } = this.pathMap.get(id)

      if (forceCheck) {
        this.setValueMap(id, 1)
        this.initValue(children, forceCheck)
        return
      }

      let childChecked = this.value.indexOf(id) >= 0 ? 1 : 0

      if (childChecked === 1 && this.mode !== CheckedMode.Half && this.mode !== CheckedMode.Freedom) {
        this.initValue(children, 1)
      } else if (children.length > 0) {
        // 保持迭代
        const res = this.initValue(children)
        childChecked = this.mode === CheckedMode.Freedom ? childChecked : res
      } else {
        childChecked = this.value.indexOf(id) >= 0 ? 1 : 0
      }

      this.setValueMap(id, childChecked)

      if (checked === undefined) checked = childChecked
      else if (checked !== childChecked) checked = 2
    })

    return checked
  }

  initData(data, path, disabled, index = []) {
    const ids = []
    data.forEach((d, i) => {
      const id = this.getKey(d, path[path.length - 1], i)
      if (this.dataMap.get(id)) {
        console.warn(`There is already a key "${id}" exists. The key must be unique.`)
      }
      this.dataMap.set(id, d)

      let isDisabled = disabled
      if (!isDisabled && typeof this.disabled === 'function') {
        isDisabled = this.disabled(d, i)
      }

      const indexPath = [...index, i]
      ids.push(id)
      let children = []
      if (Array.isArray(d[this.childrenKey])) {
        children = this.initData(
          d[this.childrenKey],
          [...path, id],
          // exclude Freedom
          this.mode === CheckedMode.Freedom ? disabled : isDisabled,
          indexPath
        )
      }
      this.pathMap.set(id, {
        children,
        path,
        isDisabled,
        indexPath,
        index: i,
      })
    })
    return ids
  }

  setData(data, dispatch) {
    const prevValue = this.value || []
    this.cachedValue = []
    this.pathMap = new Map()
    this.dataMap = new Map()
    this.valueMap = new Map()
    this.unmatchedValueMap = new Map()
    this.data = data

    if (!data) return

    this.initData(data, [])
    this.initValue()
    this.setValue(prevValue)
    if (dispatch) this.dispatch(CHANGE_TOPIC)
  }

  subscribe(name, fn) {
    if (!this.$events[name]) this.$events[name] = []
    const events = this.$events[name]
    if (fn in events) return
    events.push(fn)
  }

  unsubscribe(name, fn) {
    if (!this.$events[name]) return
    this.$events[name] = this.$events[name].filter(e => e !== fn)
  }

  dispatch(name, ...args) {
    const event = this.$events[name]
    if (!event) return
    event.forEach(fn => fn(...args))
  }
}
