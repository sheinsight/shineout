import { CHANGE_TOPIC } from './types'
import { KeygenResult, ObjectType, KeygenType, UnMatchedValue } from '../@types/common'

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

type CheckedStatus = 0 | 1 | 2

// check status stack
const checkStatusStack = (stack: CheckedStatus[], defaultStatus: CheckedStatus) => {
  if (!stack || stack.length <= 0) return defaultStatus
  if (stack.filter(d => d === 0).length === stack.length) return 0

  const s = stack.filter(d => d === 0 || d === 2)

  if (s.length <= 0) return defaultStatus
  return 2
}

export type TreeModeType = 0 | 1 | 2 | 3 | 4

export interface TreePathType {
  children: KeygenResult[]
  path: (number | string)[]
  isDisabled: boolean
  indexPath: number[]
  index: number
}
type Value = KeygenResult[]
export interface TreeDatumOptions<Item> {
  data?: Item[]
  keygen?: KeygenType<Item> | ((data: Item, parentKey: KeygenResult) => KeygenResult)
  value?: Value
  /**
   * @en mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node. 4: What you choose is what you get.
   * @cn 选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得
   */
  mode?: TreeModeType
  disabled?: ((data: Item, ...rest: any) => boolean) | boolean
  childrenKey: string
  unmatch?: boolean
  loader?: (key: KeygenResult, data: Item) => void
  onChange?: (value: any, ...rest: any) => void
}

export default class<Item> {
  keygen?: TreeDatumOptions<Item>['keygen']

  mode: TreeDatumOptions<Item>['mode']

  unmatch: TreeDatumOptions<Item>['unmatch']

  disabled: ((data: Item, ...rest: any) => boolean)

  childrenKey: TreeDatumOptions<Item>['childrenKey']

  valueMap: Map<KeygenResult, CheckedStatus>

  unmatchedValueMap: Map<any, any>

  events: Map<KeygenResult, Function>

  $events: ObjectType<Function[]>

  value?: Value

  data?: Item[]

  cachedValue?: unknown[]

  pathMap: Map<KeygenResult, TreePathType>

  dataMap: Map<KeygenResult, Item>

  constructor(options: TreeDatumOptions<Item> = { data: [], childrenKey: '' }) {
    const { data, value, keygen, mode, disabled, childrenKey = 'children', unmatch } = options

    this.keygen = keygen
    this.mode = mode
    this.valueMap = new Map()
    this.unmatchedValueMap = new Map()
    this.unmatch = unmatch
    this.events = new Map()
    this.$events = {}
    this.childrenKey = childrenKey

    this.updateDisabled(disabled)
    this.setValue(value)
    this.setData(data)
  }

  updateDisabled(dis: TreeDatumOptions<Item>['disabled']) {
    if (typeof dis === 'function') {
      this.disabled = dis
    } else {
      this.disabled = () => !!dis
    }
  }

  bind(id: number | string, update: Function) {
    this.events.set(id, update)
  }

  unbind(id: KeygenResult) {
    this.events.delete(id)
  }

  setUnmatedValue() {
    this.unmatchedValueMap = new Map()
    if (!this.value || !this.data) return
    this.value.forEach(v => {
      const data = this.getDataById(v)
      const unmatched = this.isUnMatch(data)
      if (unmatched) this.unmatchedValueMap.set(v, true)
      else this.unmatchedValueMap.delete(v)
    })
  }

  // eslint-disable-next-line class-methods-use-this
  isUnMatch(data: ObjectType | null): data is UnMatchedValue {
    return data && data[IS_NOT_MATCHED_VALUE]
  }

  setValue(value?: Value) {
    this.value = value
    if (value && value !== this.cachedValue) {
      this.initValue()
    }
    this.setUnmatedValue()
  }

  getValue() {
    const value: KeygenResult[] = []
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
          if (checked === 1) {
            const info = this.pathMap.get(id)
            if (info && info.children.length === 0) value.push(id)
          }
          break
        case CheckedMode.Shallow:
          if (checked === 1) {
            const parentChecked = (() => {
              const info = this.pathMap.get(id)
              if (!info) return false
              const { path } = info
              const pid = path[path.length - 1]
              if (!pid && pid !== 0) return false
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
    return value as Value
  }

  setValueMap(id: KeygenResult, checked: CheckedStatus) {
    this.valueMap.set(id, checked)
    const update = this.events.get(id)
    if (update) update()
  }

  set(id: KeygenResult, checked: CheckedStatus, direction?: 'asc' | 'desc') {
    // self
    if (!this.isDisabled(id)) this.setValueMap(id, checked)

    const data = this.getDataById(id)

    if (data && (data as ObjectType)[IS_NOT_MATCHED_VALUE]) {
      if (checked) this.unmatchedValueMap.set(id, true)
      else this.unmatchedValueMap.delete(id)
      return null
    }

    if (CheckedMode.Freedom === this.mode) {
      // Free mode will return zero
      return 0
    }

    const { path, children } = this.pathMap.get(id)!

    const childrenStack: any = []
    // children
    if (direction !== 'asc') {
      children.forEach(cid => {
        // push status to stack
        childrenStack.push(this.set(cid, checked, 'desc'))
      })
    }

    // Exclude disabled
    let current = this.valueMap.get(id)!

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
      this.pathMap.get(parentId)!.children.forEach(cid => {
        if (parentChecked !== this.valueMap.get(cid)) {
          parentChecked = 2
        }
      })
      this.set(parentId, parentChecked, 'asc')
    }
    return current
  }

  isDisabled(id: KeygenResult) {
    const node = this.pathMap.get(id)
    if (node) return node.isDisabled
    return false
  }

  get(id: KeygenResult) {
    return this.valueMap.get(id)
  }

  getDataById(id: KeygenResult) {
    const oroginData = this.dataMap.get(id)
    if (oroginData) return oroginData
    if (!this.unmatch) return null
    return { [IS_NOT_MATCHED_VALUE]: true, value: id }
  }

  getPath(id: KeygenResult) {
    return this.pathMap.get(id)
  }

  getChecked(id: KeygenResult) {
    const value = this.get(id)
    let checked: boolean | 'indeterminate' = value === 1
    if (value === 2) checked = 'indeterminate'
    return checked
  }

  getKey(data: Item, id: KeygenResult = '', index?: number): KeygenResult {
    if (typeof this.keygen === 'function') return this.keygen(data, id as number)
    if (this.keygen) return (data[this.keygen as keyof Item] as unknown) as KeygenResult
    return id + (id ? ',' : '') + index
  }

  initValue(ids?: KeygenResult[], forceCheck?: boolean) {
    if (!this.data || !this.value) return undefined

    if (!ids) {
      ids = []
      this.pathMap.forEach((val, id) => {
        if (val.path.length === 0) ids!.push(id)
      })
    }

    let checked: CheckedStatus
    ids.forEach(id => {
      const { children } = this.pathMap.get(id)!

      if (forceCheck) {
        this.setValueMap(id, 1)
        this.initValue(children, forceCheck)
        return
      }

      let childChecked: CheckedStatus = this.value!.indexOf(id) >= 0 ? 1 : 0

      if (childChecked === 1 && this.mode !== CheckedMode.Half && this.mode !== CheckedMode.Freedom) {
        this.initValue(children, true)
      } else if (children.length > 0) {
        // 保持迭代
        const res: CheckedStatus = this.initValue(children)!
        childChecked = this.mode === CheckedMode.Freedom ? childChecked : res
      } else {
        childChecked = this.value!.indexOf(id) >= 0 ? 1 : 0
      }

      this.setValueMap(id, childChecked)

      if (checked === undefined) checked = childChecked
      else if (checked !== childChecked) checked = 2
    })

    return checked!
  }

  initData(data: Item[], path: KeygenResult[], disabled?: boolean, index: number[] = []) {
    const ids: KeygenResult[] = []
    data.forEach((d, i) => {
      const id = this.getKey(d, path[path.length - 1], i)
      if (this.dataMap.get(id)) {
        console.error(`There is already a key "${id}" exists. The key must be unique.`)
        return
      }
      this.dataMap.set(id, d)

      let isDisabled = !!disabled
      if (!isDisabled && typeof this.disabled === 'function') {
        isDisabled = this.disabled(d, i)
      }

      const indexPath = [...index, i]
      ids.push(id)
      let children: KeygenResult[] = []
      if (Array.isArray((d as any)[this.childrenKey])) {
        children = this.initData(
          (d as any)[this.childrenKey],
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

  setData(data?: Item[], dispatch?: boolean) {
    const prevValue: any[] = this.value || []
    this.cachedValue = []
    this.pathMap = new Map()
    this.dataMap = new Map()
    this.valueMap = new Map()
    this.unmatchedValueMap = new Map()
    this.data = data

    if (!data) return

    this.initData(data, [])
    this.initValue()
    this.setValue(prevValue as Value)
    if (dispatch) this.dispatch(CHANGE_TOPIC)
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

  dispatch(name: string, ...args: any) {
    const event = this.$events[name]
    if (!event) return
    event.forEach(fn => fn(...args))
  }
}
