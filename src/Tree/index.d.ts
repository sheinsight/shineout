import * as React from 'react'
import { StandardProps } from '../@types/common'

export interface TreeProps<T> extends StandardProps{
  /**
   * desc: active nodes
   * default: none
   */
  active?: any,
  /**
   * desc: active nodes
   * default: []
   */
  data?: T[],
  /**
   * desc: default expanded nodes
   * default: []
   */
  defaultExpanded?: string[],
  /**
   * desc: default expanded nodes
   * default: []
   */
  defaultValue?: string[],
  /**
   * desc: control whether the node can be chosen
   * default: none
   */
  disabled?: boolean | ((data: any) => boolean),
  /**
   * desc: expanded node
   * default: none
   */
  expanded?: string[],
  /**
   * desc: whether show line
   * default: none
   */
  line?: boolean,
  /**
   * desc: dynamically load nodes
   * default: none
   */
  loader?: (key: string) => void,
  /**
   * desc: selected mode
   * default: 0
   */
  mode?: 0 | 1 | 2 | 3 | 4,
  /**
   * desc: change event
   * default: none
   */
  onChange?: (value: string[]) => void,
  /**
   * desc: click event
   * default: none
   */
  onClick?: (data: object) => void,
  /**
   * desc: expand event
   * default: none
   */
  onExpand?: (value: string[]) => void,
  /**
   * desc: drop event
   * default: none
   */
  onDrop?: (data: object, key: string, targetKey: string, position: number) => void,
  /**
   * desc: seleted key
   * default: none
   */
  value?: string[],
  /**
   * desc: datum
   * default: none
   */
  datum?: object,
  /**
   * desc: parent click expand
   * default: none
   */
  parentClickExpand?: boolean,
  /**
   * desc: expand all
   * default: none
   */
  defaultExpandAll?: boolean,
  /**
   * desc: data update
   * default: true
   */
  dataUpdate?: boolean,
  /**
   * desc: key of children
   * default: children
   */
  childrenKey?: string,
  /**
   * desc: DIY icon when expanded
   * default: none
   */
  expandIcons?: React.ReactNode[],
  /**
   * desc: style when drap images
   * default: {}
   */
  dragImageStyle?: object,
  /**
   * desc: radio update
   * default: none
   */
  radioUpdate?: boolean,
  /**
   * desc: if need to double-click to expand
   * default: none
   */
  doubleClickExpand?: boolean,
  /**
   * desc: whether it can only be dragged at the same level
   * default: none
   */
  dragSibling?: boolean,
  /**
   * desc: class name of node
   * default: none
   */
  nodeClass?: string | ((data: any) => string),
  /**
   * desc: class name of node
   * default: none
   */
  renderItem?: string | ((data: object) => ReactNode),
}

declare class TreeSelect extends React.Component<TreeProps, {}> {
  render(): JSX.Element
}

declare class Tree extends React.PureComponent<TreeProps, {}> {
  static Select: typeof TreeSelect
  static Field: typeof TreeSelect = Select
}
export default Tree