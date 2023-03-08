import * as React from 'react'
import * as CSS from 'csstype'
import { KeygenResult, ObjectKey, StandardProps, ValueItem } from '../@types/common'
import DatumTree, { TreePathType, TreeModeType } from '../Datum/Tree'
import { GetInputableProps } from '../Form/Props'

type ExpandIconType<Item> = React.ReactNode | ((d: Item) => React.ReactNode)
/** ------------ Tree -------------- */
export interface TreeProps<DataItem, Value extends any[]> extends StandardProps {
  /**
   * @en active node key
   * @cn 激活节点的key
   */
  active?: KeygenResult
  /**
   * @en active nodes
   * @cn 数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点
   * @default []
   */
  data: DataItem[]
  /**
   * @en default expanded nodes
   * @cn 默认展开的节点 key（非受控）
   */
  defaultExpanded?: KeygenResult[]
  defaultValue?: Value
  /**
   * @en control whether the node can be chosen
   * @cn 显示选择框时有效，为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用
   * @override union
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
   * @cn 设置loader属性后，未定义children的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点
   */
  loader?: (key: ValueItem<Value>, data: DataItem) => void
  /**
   * @en selected mode
   * @cn 选中值模式
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
  value?: Value
  datum?: DatumTree<DataItem>
  /**
   * @en Expand by click parent node
   * @cn 点击父节点展开
   */
  parentClickExpand?: boolean
  /**
   * @en expanded all nodes
   * @cn 默认展开所有节点
   * @default false
   */
  defaultExpandAll?: boolean
  dataUpdate?: boolean
  /**
   * @en specify the name of the subdata
   * @cn 指定子数据的属性名
   * @default children
   */
  childrenKey?: ObjectKey<DataItem>

  /**
   * @en DIY icon when expanded
   * @cn 自定义展开/收起按钮
   */
  expandIcons?: [ExpandIconType<DataItem>, ExpandIconType<DataItem>]
  /**
   * @en style when drap images
   * @cn 拖拽图片的样式
   */
  dragImageStyle?: CSS.Properties<string>

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
  unmatch?: boolean
  /**
   * @en Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id.
   * @cn 生成key的辅助方法, 为函数时，使用此函数返回值, 为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id
   * @default index
   * @override union
   */
  keygen: ObjectKey<DataItem> | ((data: DataItem, parentKey: KeygenResult) => KeygenResult)
  /**
   * @en selector when dray image
   * @cn 定义拖拽图片的选择器
   * @override union
   */
  dragImageSelector?: string | ((data: DataItem) => string)
  /**
   * @en the class of children, the params of function is data
   * @cn 子节点 class, 函数的参数为该条叶子节点数据
   * @override union
   */
  childrenClass?: string | ((data: DataItem) => string)
  /**
   * @en the class of lead, the params of function is data
   * @cn 叶子节点的 class, 函数的参数为该条叶子节点数据
   * @override union
   */
  leafClass?: string | ((data: DataItem) => string)
  /**
   * @en get datum
   * @cn 获取 datum
   */
  bindDatum?: (datum: any) => void
  /**
   * @en When it is a string, return d[string]. When it is a function, return the result of the function.
   * @cn 为 string 时，返回 d[string]。 为 function 时，返回函数结果
   * @override union
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
   * @override union
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
