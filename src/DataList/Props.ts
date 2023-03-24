import * as React from 'react'
import { StandardProps, RegularAttributes, ObjectKey, KeygenType } from '../@types/common'
import ListDatum from '../Datum/List'
import { GetPagableProps } from '../hoc/Props'
import { GetDatumListProps } from '../Datum/Props'

export interface BaseListProps<DataItem, Value> extends StandardProps {
  /**
   * @en Multi-column display
   * @cn 多列展示
   * @default 1
   */
  colNum?: number
  /**
   * @en render data
   * @cn 渲染数据
   * @override any[]
   */
  data: DataItem[]
  /**
   * @en Generate a auxiliary method for each key\nIf not filled, index will be used (not recommended, in some cases there may be problems)\nWhen it is a function, use its return value.\nWhen it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id .
   * @cn 生成每一项key的辅助方法\n为 true 时，以数据项本身作为 key，相当于 (d => d)\n为函数时，使用此函数返回值\n为 string 时，使用这个 string 对应的数据值。如 'id'，相当于 (d => d.id)
   */
  keygen: KeygenType<DataItem>
  /**
   * @inner 内部属性
   */
  datum: ListDatum<DataItem, Value>
  /**
   * @en render item
   * @cn 需要渲染成列表的数据
   */
  renderItem?: ObjectKey<DataItem> | ((d: DataItem, index: number) => React.ReactNode)
  /**
   * @en The current selected value.
   * @cn 当前选中值，格式和 onChange 返回值一致
   * @override any[]
   */
  value?: Value
  /**
   * @en virtualized list
   * @cn 是否启用虚拟列表
   * @default false
   */
  fixed?: boolean
  /**
   * @en list height
   * @cn 列表高度
   */
  height?: number
  /**
   * @en show border
   * @cn 是否显示边框
   * @default false
   */
  bordered?: boolean
  /**
   * @en height of item
   * @cn 列表项高度
   * @default 32
   */
  lineHeight?: number
  /**
   * @en Number of list items displayed at the same time
   * @cn 同时展示的列表项数量
   * @default 10
   */
  rowsInView?: number
  /**
   * @en What to display when no data
   * @cn 无数据时展示的内容
   */
  empty?: string | React.ReactNode
  /**
   * @en Triggered when scrolling to the bottom
   * @cn 滚动到底部时触发
   */
  scrollLoading?: () => void
  /**
   * @en size
   * @cn 尺寸
   * @override union
   */
  size?: RegularAttributes.Size
  /**
   * @en loading
   * @cn 加载中
   * @default false
   */
  loading?: boolean | React.ReactNode
  /**
   * @en The content at the bottom
   * @cn 底部内容
   */
  footer?: (() => React.ReactNode) | React.ReactNode
  /**
   * @en Select the row ,rowData is the selected data, rowIndex is the selected row number. If the data needs to be formatted, it is recommended to configure format
   * @cn 选择行。rowData 为选中的数据，rowIndex 为选中行号。如果需要数据需要格式化的处理，建议配置 format。
   */
  onChange?: (rowData: Value, index: number) => void
  /**
   * @en custom row className
   * @cn 自定义行 className
   */
  rowClassName?: (rowData: DataItem, index: number) => string
}

/**
 * @title List.BaseItem
 */
export interface ListBaseItemProps {
  /**
   * @en describe
   * @cn 描述
   */
  desc?: string
  /**
   * @en The title of the list
   * @cn 列表元素的标题
   */
  title?: string
  /**
   * @en Item className
   * @cn Item 容器的 className
   */
  className?: string
  /**
   * @en Content area on the right side of the list
   * @cn 列表右侧内容
   */
  extra?: Array<React.ReactNode> | React.ReactNode
  /**
   * @en List images
   * @cn 列表元素的图标
   */
  avatar?: string | React.ReactNode | (() => React.ReactNode)
  /**
   * @en list content
   * @cn 列表内容
   */
  content?: string | React.ReactNode | (() => React.ReactNode)
}

export type ListPropsWithPagination<Item, Value> = GetPagableProps<BaseListProps<Item, Value>>
export type DataListDatumKey = 'disabled' | 'limit' | 'format' | 'prediction' | 'distinct'

/**
 * @title List
 */
export type ListProps<Item, Value> = GetDatumListProps<
  ListPropsWithPagination<Item, Value>,
  Item,
  Value,
  Exclude<DataListDatumKey, 'limit'>
>

export declare class BaseItemClass extends React.Component<ListBaseItemProps, {}> {
  render(): JSX.Element
}

export declare class ListClass<Item, Value> extends React.Component<ListProps<Item, Value>, {}> {
  static BaseItem: typeof BaseItemClass

  render(): JSX.Element
}

export type ListType = typeof ListClass
