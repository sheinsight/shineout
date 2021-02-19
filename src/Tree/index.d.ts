import * as React from 'react'
import { StandardProps, StructDataStandardProps, ListItemStandardProps, keyType } from '../@types/common'
import TreeSelect from '../TreeSelect'

export interface TreeProps<Item, Value> extends 
StandardProps, 
StructDataStandardProps<Item>, 
FormItemStandardProps<Value>,
Pick<ListItemStandardProps<Item, Value>, 'keygen'>
{
  /**
   * desc: specify the name of the subdata
   * 
   * 指定子数据的属性名
   * 
   * default: children
   */
  childrenKey?: string

  /**
   * desc: active nodes
   * 
   * 数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点
   * 
   * default: []
   */
  data?: Item[],

  /**
   * desc: expanded all nodes
   * 
   * 默认展开所有节点
   * 
   * default: false
   */
  defaultExpandAll?: boolean,

  /**
   * desc: default expanded nodes
   * 
   * 默认展开的节点 key（非受控）
   * 
   * default: none
   */
  defaultExpanded?: keyType[],

  /**
   * desc: control whether the node can be chosen
   * 
   * 显示选择框时有效，为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用
   * 
   * default: none
   */
  disabled?: boolean | ((data: Item) => boolean),
  
  /**
   * desc: if need to double-click to expand
   * 
   * 双击是否展开节点
   * 
   * default: false
   */
  doubleClickExpand?: boolean,

  /**
   * desc: automatically expand nodes with child nodes when dragging
   * 
   * 拖拽时自动展开含有子节点的节点
   * 
   * default: false
   */
  dragHoverExpand?: boolean,

  /**
   * desc: selector when dray image
   * 
   * 定义拖拽图片的选择器
   * 
   * default: none
   */
  dragImageSelector?: string | ((data: Item) => string) ,

  /**
   * desc: style when drap images
   * 
   * 拖拽图片的样式
   * 
   * default: none
   */
  dragImageStyle?: React.CSSProperties,

  /**
   * desc: whether it can only be dragged at the same level
   * 
   * 是否只能平级拖拽
   * 
   * default: none
   */
  dragSibling?: boolean,

  /**
   * desc: expanded node
   * 
   * 展开的节点 key （受控）
   * 
   * default: none
   */
  expanded?: keyType[],

  /**
   * desc: DIY icon when expanded
   * 
   * 自定义展开/收起按钮
   * 
   * default: none
   */
  expandIcons?: React.ReactNode[],

  /**
   * desc: class name of icon
   * 
   * 展开/收起按钮的类名
   * 
   * default: none
   */
  iconClass?: string,

  /**
   * desc: whether show line
   * 
   * 是否显示连接线
   * 
   * default: true
   */
  line?: boolean,

  /**
   * desc: dynamically load nodes
   * 
   * 设置loader属性后，未定义children的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点
   * 
   * default: none
   */
  loader?: (key: keyType) => void,

  /**
   * desc: selected mode
   * 
   * 选中值模式
   * 
   * default: 1
   */
  mode?: 0 | 1 | 2 | 3 | 4,

  /**
   * desc: class name of node
   * 
   * 节点的class，如果是函数，参数为该节点数据
   * 
   * default: none
   */
  nodeClass?: string | ((data: Item) => string),

  /**
   * desc: change event
   * 
   * 设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关
   * 
   * default: none
   */
  onChange?: (value: Value) => void,

  /**
   * desc: click event
   * 
   * 节点点击事件
   * 
   * default: none
   */
  onClick?: (data: Item) => void,

  /**
   * desc: drop event
   * 
   * 设置 onDrop 属性时，为可拖动状态
   * 
   * default: none
   */
  onDrop?: (data: Item, key: keyType, targetKey: keyType, position: number) => void,

  /**
   * desc: expand event
   * 
   * 节点展开回调，参数为当前展开节点 key 数组
   * 
   * default: none
   */
  onExpand?: (value: keyType[]) => void,
}

declare class Tree<Item, Value> extends React.PureComponent<TreeProps<Item, Value>, {}> {
  static Select: typeof TreeSelect

  static Field: typeof TreeSelect
}
export default Tree