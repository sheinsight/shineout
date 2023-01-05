import * as React from 'react'
import { StandardProps, RegularAttributes, LiteralUnion, KeygenType } from '../@types/common'
import ListDatum from '../Datum/List'
import { GetPagableProps } from '../hoc/Props'
import { GetDatumListProps } from '../Datum/Props'

export interface BaseListProps<Item, Value> extends StandardProps {
  /**
   * Multi-column display
   *
   * 多列展示
   *
   * default: 1
   */
  colNum?: number
  data: Item[]
  keygen: KeygenType<Item>
  /**
   * 内部属性
   */
  datum: ListDatum<Item, Value>
  renderItem?: LiteralUnion<Item> | ((d: Item, index: number) => React.ReactNode)
  /**
   * The current selected value.
   *
   * 当前选中值，格式和 onChange 返回值一致
   *
   * default: none
   */
  value?: Value[]
  /**
   * virtualized list
   *
   * 是否启用虚拟列表
   *
   * default: false
   */
  fixed?: boolean
  /**
   * list height
   *
   * 列表高度
   *
   * default: -
   */
  height?: number
  /**
   * show border
   *
   * 是否显示边框
   *
   * default: null
   */
  bordered?: boolean
  /**
   * height of item
   *
   * 列表项高度
   *
   * default: 32
   */
  lineHeight?: number
  /**
   * 同时展示的列表项数量
   *
   * Number of list items displayed at the same time
   *
   * default: 10
   */
  rowsInView?: number
  /**
   * What to display when no data
   *
   * 无数据时展示的内容
   *
   * default:null
   */
  empty?: string | React.ReactNode
  /**
   * Triggered when scrolling to the bottom
   *
   * 滚动到底部时触发
   *
   * default: null
   */
  scrollLoading?: () => void
  size?: RegularAttributes.Size
  /**
   * loading
   *
   * 加载中
   *
   * default: false
   */
  loading?: boolean | React.ReactNode
  /**
   * The content at the bottom
   *
   * 底部内容
   *
   * default: null
   */
  footer?: React.ReactNode | (() => React.ReactNode)
  /**
   * Select the row ,rowData is the selected data, rowIndex is the selected row number. If the data needs to be formatted, it is recommended to configure format
   *
   * 选择行。rowData为选中的数据，rowIndex为选中行号。如果需要数据需要格式化的处理，建议配置 format。
   *
   * default: null
   */
  onChange?: (rowData: Value[], index: number) => void
  /**
   * custom row className
   *
   * 自定义行 className
   *
   * default: null
   */
  rowClassName?: (rowData: Item, index: number) => string
}

export interface ListBaseItemProps {
  desc?: string
  title?: string
  className?: string
  extra?: Array<React.ReactNode> | React.ReactNode
  avatar?: string | React.ReactNode | (() => React.ReactNode)
  content?: string | React.ReactNode | (() => React.ReactNode)
}

export type ListPropsWithPagination<Item, Value> = GetPagableProps<BaseListProps<Item, Value>>
export type DataListDatumKey = 'disabled' | 'limit' | 'format' | 'prediction' | 'distinct'
export type ListProps<Item, Value> = GetDatumListProps<
  ListPropsWithPagination<Item, Value>,
  Item,
  Value,
  DataListDatumKey
>

export declare class BaseItemClass extends React.Component<ListBaseItemProps, {}> {
  render(): JSX.Element
}

export declare class ListClass<Item, Value> extends React.Component<ListProps<Item, Value>, {}> {
  static BaseItem: typeof BaseItemClass

  render(): JSX.Element
}

export type ListType = typeof ListClass
