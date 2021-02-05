import * as React from 'react'
import { StandardProps } from '../@types/common'

export interface TransferProps<T = object> extends StandardProps{
  /**
   * desc: data source
   * default: []
   */
  data?: T[],
  /**
   * desc: class name
   * default: none
   */
  className?: string
  /**
   * desc: checked by default
   * default: none
   */
  defaultSelectedKeys?: any[],
  /**
   * desc: control whether the node can be chosen
   * default: none
   */
  disabled?: boolean | ((data: any) => boolean),
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
  format?: (data: any) => any,
  /**
   * desc: generate key for each node
   * default: d => d
   */
  keygen: true | string | ((data: any) => string)),
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
  listStyle?: object,
  /**
   * desc: loading
   * default: none
   */
  loading?: boolean | boolean[],
  /**
   * desc: fileter data
   * default: none
   */
  onFilter?: (text: string, value: any, isSource: boolean) => boolean,
  /**
   * desc: seach event
   * default: none
   */
  onSearch?: (text: string, isSource: boolean) => void,
  /**
   * desc: select event
   * default: none
   */
  onSelectChange?: (sourceKeys: any[], targetKeys: any[]) => void,
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
  prediction?: (value: any, data: any) => boolean,
  /**
   * desc: render result
   * default: none
   */
  renderItem: string | ((data: any) => ReactNode),
  /**
   * desc: number of data loaded at one time
   * default: 20
   */
  rowsInView?: number,
  /**
   * desc: checked lists
   * default: none
   */
  selectedKeys?: any[],
  /**
   * desc: expand css style
   * default: none
   */
  style?: object,
  /**
   * desc: title
   * default: none
   */
  titles?: React.ReactNode[],
  /**
   * desc: value of right box
   * default: none
   */
  value?: any[],
}


declare class Transfer extends React.PureComponent<TransferProps, {}> {}
export default Transfer