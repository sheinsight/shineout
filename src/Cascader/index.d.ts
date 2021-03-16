import * as React from 'react'
import { StandardProps, FormItemStandardProps, StructDataStandardProps, keyType, RegularAttributes } from '../@types/common'

export interface CascaderProps<Item, Value> extends StandardProps, FormItemStandardProps<Value>, ListItemStandardProps<Item>, StructDataStandardProps<Item>  {

  /**
   * When it is true, the pop-up layer of option append into document.body. 
   * 
   * 为 true 时，选项弹出层在 DOM 中独立 render
   * 
   * default: false
   */
  absolute?: boolean;

  /**
   * the key of the children data name
   * 
   * 指定子数据的属性名
   * 
   * default: 'children'
   */
  childrenKey?: string;

  /**
   * If clearable is true, show clear value icon
   * 
   * 是否显示清除数据图标
   * 
   * default: true
   */
  clearable?: boolean;

  /**
   * Merges selected values
   * 
   * 将选中值合并
   * 
   * default: false
   */
  compressed?: boolean | 'no-repeat';

  /**
   * data. The child node is children. If the children value is null or its length is 0, it is render as a leaf node.
   * 
   * 数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点
   * 
   * default: []
   */
  data?: Item[];

  /**
   * When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function.
   * 
   * 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * 
   * default: false
   */
  disabled?: (data: Item) => boolean | boolean;

  /**
   * Expand mode
   * 
   * 节点展开触发方式
   * 
   * default: 'click'
   */
  expandTrigger?: 'click' | 'hover' | 'hover-only';

  /**
   * close options after chose the final node
   * 
   * 选择末级节点后是否关闭选项列表
   * 
   * default: false
   */
  finalDismiss?: boolean;

  /**
   * Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id.
   * 
   * 生成key的辅助方法, 为函数时，使用此函数返回值, 为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id
   * 
   * default: index
   */
  keygen: ((data: Item, parentKey: keyType) => keyType) | string;

  /**
   * If the loader attribute is a function, the node with no children is regarded as dynamically loaded node. Click expanded button to trigger the loader event. The children property is null or its length is 0 will be regarded as a leaf node.
   * 
   * 设置loader属性后，未定义children的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点
   * 
   * default:
   */
  loader?: (key: keyType, data: Item) => void;

  /**
   * mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node.
   * 
   * 选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点
   * 
   * default: -
   */
  mode?: 0 | 1 | 2 | 3;

  /**
   * When the onChange property is set, the selection box is displayed. The parameter is the current selected value, which is related to the mode property.
   * 
   * 设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关
   * 
   * default: -
   */
  onChange?: (value: Value, selected: boolean) => void;

  /**
   * options collapse callback
   * 
   * 下拉列表展开/收起回调
   * 
   * default: none
   */
  onCollapse?: (collapse: boolean) => void;

  /**
   * size
   * 
   * 尺寸
   * 
   * defualt: none
   */
  size?: RegularAttributes.Size;

  /**
   * Support single node deletion
   * 
   * 支持单个节点删除
   * 
   * default: none
   */
  singleRemove: boolean;

  /**
   * render unmatch value
   * 
   * 是否展示data中不存在的值
   * 
   * default: -
   */
   unmatch?: boolean;
}

declare class Cascader<Item = any, Value = string[]> extends React.Component<CascaderProps<Item, Value>, {}> {}

export default Cascader