export const CheckedMode = {
  // 只返回全选数据，包含父节点和子节点
  Full: 0,

  // 返回全部选择字节点和部分选中的父节点
  Half: 1,

  // 只返回选中子节点
  Child: 2,

  // 如果父节点下所有子节点全部选中，只返回父节点
  Shallow: 3,
}

export default class {
  constructor(options = {}) {
    const {
      data, value, keygen, mode, disabled,
    } = options

    this.keygen = keygen
    this.mode = mode
    this.valueMap = new Map()
    this.events = {}
    this.disabled = disabled || (() => false)

    this.setValue(value)
    this.setData(data)
  }

  bind(id, update) {
    this.events[id] = update
  }

  unbind(id) {
    delete this.events[id]
  }

  setValue(value) {
    this.value = value
    if (value && value !== this.cachedValue) {
      this.initValue()
    }
  }

  getValue() {
    const value = []
    this.valueMap.forEach((checked, id) => {
      switch (this.mode) {
        case CheckedMode.Full:
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

    const { path, children } = this.pathMap.get(id)

    // children
    if (direction !== 'asc') {
      children.forEach((cid) => {
        this.set(cid, checked, 'desc')
      })
    }

    // parent
    if (direction !== 'desc' && path.length > 0) {
      const parentId = path[path.length - 1]
      let parentChecked = checked
      this.pathMap.get(parentId).children.forEach((cid) => {
        if (parentChecked !== this.valueMap.get(cid)) {
          parentChecked = 2
        }
      })
      this.set(parentId, parentChecked, 'asc')
    }
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
    return this.dataMap.get(id)
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
    else if (this.keygen) return data[this.keygen]
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
    ids.forEach((id) => {
      const { children } = this.pathMap.get(id)

      if (forceCheck) {
        this.setValueMap(id, 1)
        this.initValue(children, forceCheck)
        return
      }

      let childChecked = this.value.indexOf(id) >= 0 ? 1 : 0

      if (childChecked === 1 && this.mode !== CheckedMode.Half) {
        this.initValue(children, 1)
      } else if (children.length > 0) {
        childChecked = this.initValue(children)
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
      this.dataMap.set(id, d)

      let isDisabled = disabled
      if (!isDisabled && typeof this.disabled === 'function') {
        isDisabled = this.disabled(d, i)
      }

      const indexPath = [...index, i]
      ids.push(id)
      let children = []
      if (Array.isArray(d.children)) {
        children = this.initData(d.children, [...path, id], isDisabled, indexPath)
      }
      this.pathMap.set(id, {
        children, path, isDisabled, indexPath, index: i,
      })
    })
    return ids
  }

  setData(data) {
    this.pathMap = new Map()
    this.dataMap = new Map()
    this.data = data

    if (!data) return

    this.initData(data, [])
    this.initValue()
  }
}
