import * as React from 'react'
import { KeygenResult, ObjectKey, StandardProps, ValueItem } from '../@types/common'
import DatumTree, { TreePathType, TreeModeType } from '../Datum/Tree'
import { GetInputableProps } from '../Form/Props'

export type ExpandIconType<Item> = React.ReactNode | ((d: Item) => React.ReactNode)
/** ------------ Tree -------------- */
/**
 * @title Tree
 */
export interface TreeProps<DataItem, Value extends any[]> extends StandardProps {
  /**
   * @en active node key
   * @cn 激活节点的key
   */
  active?: KeygenResult
  /**
   * @en active nodes
   * @cn 数据，子节点为 children，如果 children 值为 null 或 长度为 0 时，视为叶子节点
   * @default []
   * @override object[]
   */
  data?: DataItem[]
  /**
   * @en default expanded nodes
   * @cn 默认展开的节点 key（非受控）
   */
  defaultExpanded?: KeygenResult[]
  /**
   * @en Default selected key (not controlled)
   * @cn 默认选中的 key （非受控）
   */
  defaultValue?: Value
  /**
   * @en control whether the node can be chosen
   * @cn 显示选择框时有效，为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用
   * @default false
   */
  disabled?: boolean | ((data: DataItem) => boolean)
  /**
   * @en expanded node
   * @cn 展开的节点 key （受控）
   */
  expanded?: KeygenResult[]
  /**
   * @en whether show line
   * @cn 是否显示连接线
   * @default true
   */
  line?: boolean
  /**
   * @en dynamically load nodes
   * @cn 设置 loader 属性后，未定义 children 的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点
   */
  loader?: (key: ValueItem<Value>, data: DataItem) => void
  /**
   * @en mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node. 4: What you choose is what you get.
   * @cn 选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得
   * @default 1
   */
  mode?: TreeModeType
  /**
   * @en change event
   * @cn 设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关
   */
  onChange?: (value: Value, id: KeygenResult) => void
  /**
   * @en click event
   * @cn 节点点击事件
   */
  onClick?: (data: DataItem, key: KeygenResult, path: TreePathType) => void
  /**
   * @en expand event
   * @cn 节点展开回调，参数为当前展开节点 key 数组
   */
  onExpand?: (value: KeygenResult[]) => void
  /**
   * @en drop event
   * @cn 设置 onDrop 属性时，为可拖动状态
   */
  onDrop?: (data: DataItem[], key: KeygenResult, targetKey: KeygenResult, position: number) => void
  /**
   * @en Selected key (controlled)
   * @cn 选中的 key （受控）
   * @override (string | number)[]
   */
  value?: Value
  /**
   * @inner 内部属性
   */
  datum?: DatumTree<DataItem>
  /**
   * @en Expand by click parent node
   * @cn 点击父节点展开
   * @default false
   */
  parentClickExpand?: boolean
  /**
   * @en expanded all nodes
   * @cn 默认展开所有节点
   * @default false
   */
  defaultExpandAll?: boolean
  /**
   * @en Whether to monitor data changes to update data
   * @cn 是否监听 data 变化更新数据
   * @default true
   */
  dataUpdate?: boolean
  /**
   * @en specify the name of the subdata
   * @cn 指定子数据的属性名
   * @default 'children'
   */
  childrenKey?: ObjectKey<DataItem>

  /**
   * @en DIY icon when expanded
   * @cn 自定义展开/收起按钮
   */
  expandIcons?: [ExpandIconType<DataItem>, ExpandIconType<DataItem>]
  /**
   * @en dom style when drop images
   * @cn 拖拽图片的原生 style 样式
   */
  dragImageStyle?: object

  /**
   * @inner 内部属性
   */
  radioUpdate?: boolean

  /**
   * @en if need to double-click to expand
   * @cn 双击是否展开节点
   * @default false
   */
  doubleClickExpand?: boolean
  /**
   * @en whether it can only be dragged at the same level
   * @cn 是否只能平级拖拽
   */
  dragSibling?: boolean
  /**
   * @inner 内部属性
   */
  unmatch?: boolean
  /**
   * @en Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id.
   * @cn 生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 'id'，相当于 (d) => d.id
   * @default index
   */
  keygen: ObjectKey<DataItem> | ((data: DataItem, parentKey: KeygenResult) => KeygenResult)
  /**
   * @en selector when dray image
   * @cn 定义拖拽图片的选择器
   */
  dragImageSelector?: string | ((data: DataItem) => string)
  /**
   * @en the class of children, the params of function is data
   * @cn 子节点 class, 函数的参数为该条叶子节点数据
   */
  childrenClass?: string | ((data: DataItem) => string)
  /**
   * @en the class of lead, the params of function is data
   * @cn 叶子节点的 class, 函数的参数为该条叶子节点数据
   */
  leafClass?: string | ((data: DataItem) => string)
  /**
   * @inner 内部属性
   */
  bindDatum?: (datum: any) => void
  /**
   * @en When it is a string, return d\\[string]. When it is a function, return the result of the function.
   * @cn 为 string 时，返回 d\\[string]。 为 function 时，返回函数结果
   */
  renderItem:
    | ObjectKey<DataItem>
    | ((data: DataItem, expanded: boolean, active: boolean, id: KeygenResult) => React.ReactNode)
  /**
   * @en automatically expand nodes with child nodes when dragging
   * @cn 拖拽时自动展开含有子节点的节点
   * @default false
   */
  dragHoverExpand?: boolean
  /**
   * @en class name of icon
   * @cn 展开/收起按钮的类名
   */
  iconClass?: string
  /**
   * @en class name of node
   * @cn 节点的class，如果是函数，参数为该节点数据
   */
  nodeClass?: string | ((data: DataItem) => string)
}

export type UpdateFunc = (name: string, active: boolean) => void
/** ------------ Root -------------- */
export interface RootProps<DataItem, Value extends any[]>
  extends Pick<
      TreeProps<DataItem, Value>,
      | 'className'
      | 'keygen'
      | 'line'
      | 'loader'
      | 'onChange'
      | 'renderItem'
      | 'style'
      | 'parentClickExpand'
      | 'expandIcons'
      | 'dragHoverExpand'
      | 'doubleClickExpand'
      | 'iconClass'
      | 'nodeClass'
      | 'dragSibling'
    >,
    Pick<Required<TreeProps<DataItem, Value>>, 'childrenKey' | 'dragImageStyle' | 'mode' | 'data'> {
  datum: DatumTree<DataItem>
  disabled: boolean
  unbindNode: (id: KeygenResult) => void
  bindNode: (id: KeygenResult, update: UpdateFunc) => { active: boolean; expanded: boolean }
  onDrop?: (id: KeygenResult, targetId: KeygenResult, position: number) => void
  onToggle?: (id: KeygenResult, expanded: boolean) => void
  onNodeClick: (node: DataItem, id: KeygenResult) => void
  dragImageSelector: (data: DataItem) => string | undefined
  childrenClass: (data: DataItem) => string | undefined
  leafClass: (data: DataItem) => string | undefined
}

/** ------------ List -------------- */
export interface ListProps<DataItem, Value extends any[]>
  extends Omit<RootProps<DataItem, Value>, 'className' | 'expanded'> {
  className?: string
  expanded?: boolean
  path: string
  isRoot?: boolean
  deepIndex: number
  id?: KeygenResult
  childrenClassName?: string
}

/** ------------ Node -------------- */
export interface NodeProps<DataItem, Value extends any[]>
  extends Omit<ListProps<DataItem, Value>, 'data' | 'isRoot' | 'expanded' | 'className' | 'style' | 'id'> {
  id: KeygenResult
  data: DataItem
  index: number
  listComponent: React.ComponentType<ListProps<DataItem, Value>>
}

/** ------------ Content -------------- */
export interface ContentProps<DataItem, Value extends any[]>
  extends Omit<NodeProps<DataItem, Value>, 'listComponent' | 'onDrop' | 'childrenClass' | 'leafClass' | 'nodeClass'> {
  active: boolean
  expanded: boolean
  onToggle: () => void
  onDragOver: (e: React.DragEvent) => void
  setFetching: (fetching: boolean) => void
  fetching: boolean
}

/** ------------ Checkbox -------------- */
export interface CheckboxProps<DataItem, Value extends any[]>
  extends Omit<ContentProps<DataItem, Value>, 'data' | 'onToggle' | 'onChange' | 'expanded' | 'onDragOver'> {
  onChange: Required<ContentProps<DataItem, Value>>['onChange']
}

export type TreeFieldProps<DataItem, Value extends any[]> = GetInputableProps<TreeProps<DataItem, Value>, Value>

export declare class TreeField<DataItem, Value extends any[]> extends React.Component<
  TreeFieldProps<DataItem, Value>,
  any
> {
  render: () => JSX.Element
}

export type TreeFieldType = typeof TreeField
