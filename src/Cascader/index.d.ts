/* eslint-disable import/named */
import * as React from 'react'

type ReactNode = React.ReactNode;

declare class Cascader extends React.Component<CascaderProps, {}> {
  
  render(): JSX.Element;
}

export interface CascaderProps {
  
  /**
   * When it is true, the pop-up layer of option append into document.body.
   * 为 true 时，选项弹出层在 DOM 中独立 render
   * default: false
   */
  absolute?: boolean;
  
  /**
   * the key of the children data name
   * 指定子数据的属性名
   * default: 'children'
   */
  childrenKey?: string;
  
  /**
   * extend className
   * 扩展className
   * default: -
   */
  className?: string;
  
  /**
   * If clearable is true, show clear value icon
   * 是否显示清除数据图标
   * default: true
   */
  clearable?: boolean;
  
  /**
   * Merges selected values
   * 将选中值合并
   * default: false
   */
  compressed?: boolean;
  
  /**
   * data. The child node is children. If the children value is null or its length is 0, it is render as a leaf node.
   * 数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点
   * default: []
   */
  data?: any[];
  
  /**
   * Default selected key (not controlled)
   * 默认选中的 key （非受控）
   * default: 无
   */
  defaultValue?: any[];
  
  /**
   * When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function.
   * 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * default: false
   */
  disabled?: (data: any) => boolean | boolean;
  
  /**
   * Expand mode
   * 节点展开触发方式
   * default: 'click'
   */
  expandTrigger?: 'click' | 'hover' | 'hover-only';
  
  /**
   * close options after chose the final node
   * 选择末级节点后是否关闭选项列表
   * default: false
   */
  finalDismiss?: boolean;
  
  /**
   * Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id.
   * 生成key的辅助方法, 为函数时，使用此函数返回值, 为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id
   * default: index
   */
  keygen: ((data: any, parentKey: any) => string) | string;
  
  /**
   * If the loader attribute is a function, the node with no children is regarded as dynamically loaded node. Click expanded button to trigger the loader event. The children property is null or its length is 0 will be regarded as a leaf node.
   * 设置loader属性后，未定义children的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点
   * default:
   */
  loader?: (key: any, data: any) => void;
  
  /**
   * mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node.
   * 选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点
   * default: -
   */
  mode?: 0 | 1 | 2 | 3;
  
  /**
   * When the onChange property is set, the selection box is displayed. The parameter is the current selected value, which is related to the mode property.
   * 设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关
   * default: -
   */
  onChange?: (value: any[], selected: boolean) => void;
  
  /**
   * options collapse callback
   * 下拉列表展开/收起回调
   * default: none
   */
  onCollapse?: (collapse: boolean) => void;
  
  /**
   * When it is a string, return d[string]. When it is a function, return the result of the function.
   * 为 string 时，返回 d[string]。 为 function 时，返回函数结果
   * default: required
   */
  renderItem?: (data: any) => ReactNode | string;
  
  /**
   * The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected
   * 选中后在结果中显示的内容，默认和 renderItem 相同
   * default: renderItem
   */
  renderResult?: (data: any) => ReactNode | string;
  
  /**
   * Selected key (controlled)
   * 选中的 key （受控)
   * default: -
   */
  value?: any[];
  
}

export default Cascader
