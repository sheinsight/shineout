import * as React from 'react'
import { StandardProps } from '../@types/common'

export interface TransferProps<Value = any, T = any> extends StandardProps{
  /**
   * desc: data source
   * default: []
   */
  data?: T[],
  /**
   * desc: checked by default
   * default: none
   */
  defaultSelectedKeys?: Value[],
  /**
   * desc: control whether the node can be chosen
   * default: none
   */
  disabled?: boolean | ((data: T) => boolean),
  /**
   * desc: contentless display
   * default: "无数据"
   */
  empty?: React.ReactNode,
  /**
   * desc: footer node
   * default: none
   */
  footers?: React.ReactNode[],
  /**
   * desc: format value
   * default: d => d
   */
  format?: (data: D) => any,
  /**
   * desc: generate key for each node
   * default: d => d
   */
  keygen: true | string | ((data: T) => string)),
  /**
   * desc: line height of list
   * default: 32
   */
  lineHeight?: number,
  /**
   * desc: list class name
   * default: none
   */
  listClassName?: string,
  /**
   * desc: list height
   * default: 180
   */
  listHeight?: number,
  /**
   * desc: expand list style
   * default: none
   */
  listStyle?: React.CSSProperties,
  /**
   * desc: loading
   * default: none
   */
  loading?: boolean | boolean[],
  /**
   * desc: fileter data
   * default: none
   */
  onFilter?: (text: string, data: T, isSource: boolean) => boolean,
  /**
   * desc: seach event
   * default: none
   */
  onSearch?: (text: string, isSource: boolean) => void,
  /**
   * desc: select event
   * default: none
   */
  onSelectChange?: (sourceKeys: Value[], targetKeys: Value[]) => void,
  /**
   * desc: whether to display the icon of the operation button
   * default: true
   */
  operationIcon?: boolean,
  /**
   * desc: operation nodes
   * default: none
   */
  operations?: React.ReactNode[],
  /**
   * desc: if match
   * default: (val, d) => val===format(d)
   */
  prediction?: (value: Value, data: T) => boolean,
  /**
   * desc: render result
   * default: none
   */
  renderItem: string | ((data: T) => ReactNode),
  /**
   * desc: number of data loaded at one time
   * default: 20
   */
  rowsInView?: number,
  /**
   * desc: checked lists
   * default: none
   */
  selectedKeys?: Value[],
  /**
   * desc: title
   * default: none
   */
  titles?: React.ReactNode[],
  /**
   * desc: value of right box
   * default: none
   */
  value?: Value[],
}


declare class Transfer<Value = any, T = any> extends React.PureComponent<TransferProps<Value, T>, {}> {}
export default Transfer
