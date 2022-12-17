import * as React from 'react'
import ListDatum from '../Datum/List'
import { GetDatumListProps } from '../Datum/Props'
import { keyType, LiteralUnion, StructKeygenType } from '../@types/common'
import { GetInputableProps } from '../Form/Props'

type filterProps = {
  value: string
  disabled: boolean
  onFilter?: (value: string) => void
  placeholder?: string
}

export type SelectedArr = [keyType[], keyType[]]
export type IndexType = 1 | 0
export type NodeItem = React.ReactNode | undefined
/** ----------- context ------------*/
export interface TransferContextValue {
  selecteds: SelectedArr
  setSelecteds: (index: IndexType, value: keyType[]) => void
  itemClass: string | undefined
}

/** ----------- transfer ------------*/
export interface TransferProps<DataItem, Value extends any[]> {
  titles?: [NodeItem, NodeItem]
  data: DataItem[]
  datum: ListDatum<DataItem, Value>
  keygen: StructKeygenType<DataItem>
  renderItem?: ((data: DataItem) => React.ReactNode) | LiteralUnion<DataItem>
  footers?: [NodeItem, NodeItem]
  operations?: [NodeItem, NodeItem]
  operationIcon?: boolean
  value: Value
  className?: string
  style?: React.CSSProperties
  listClassName?: string
  listStyle?: React.CSSProperties
  /**
   * desc: checked lists
   *
   * 被勾选的列表, 勾选的值均使用的是 keygen 的结果
   *
   * default: none
   */
  selectedKeys?: keyType[]
  /**
   * desc: checked by default
   *
   * 默认被勾选的列表
   *
   * default: none
   */
  defaultSelectedKeys?: keyType[]
  /**
   * desc: select event
   *
   * 勾选触发的方法
   *
   * default: none
   */
  onSelectChange?: (sourceKeys: keyType[], targetKeys: keyType[]) => void
  disabled?: boolean | ((data: DataItem) => boolean)
  /**
   * desc: contentless display
   *
   * 无内容的展示
   *
   * default: "无数据"
   */
  empty?: React.ReactNode
  /**
   * desc: fileter data
   *
   * 筛选函数, 参数为: 输入文本, 数据, 是否为左侧数据
   *
   * default: none
   */
  onFilter?: (text: string, data: DataItem, isSource: boolean) => boolean
  itemClass?: string
  /**
   * desc: loading
   *
   * 加载中, 如果需要两侧加载中状态不一致, 需要传入数组
   *
   * default: none
   */
  loading?: boolean | [boolean, boolean]
  /**
   * desc: seach event
   *
   * 输入框值变化的回调, 参数为: 输入文本, 是否为左侧数据
   *
   * default: none
   */
  onSearch?: (text: string, isSource: boolean) => void
  /**
   * desc: number of data loaded at one time
   *
   * 一次加载的数据条数
   *
   * default: 20
   */
  rowsInView?: number
  /**
   * desc: line height of list
   *
   * 列表行高
   *
   * default: 32
   */
  lineHeight?: number
  /**
   * desc: list height
   *
   * 列表高度
   *
   * default: 180
   */
  listHeight?: number
  /**
   * desc: custom render filter. The type filterProps: value : string; disabled : boolean; onFilter : Function; placeholder : string
   *
   * 自定义过滤器渲染。自定义过滤器渲染。filterProps 包含参数如下：value : string; disabled : boolean; onFilter : Function; placeholder : string
   *
   * default: -
   */
  renderFilter?: (value: filterProps) => React.ReactNode
  children?: React.ReactNode
}

/** ----------- btns ------------*/
export interface BtnProps<DataItem, Value extends any[]>
  extends Pick<TransferProps<DataItem, Value>, 'datum' | 'keygen' | 'operationIcon' | 'data' | 'disabled'>,
    Required<Pick<TransferProps<DataItem, Value>, 'operations' | 'data'>> {
  selecteds: SelectedArr
  setSelecteds: (index: IndexType, value: keyType[]) => void
  sources: DataItem[]
  targets: DataItem[]
}

/** ----------- card ------------*/
export interface CardProps<DataItem, Value extends any[]>
  extends Pick<
      TransferProps<DataItem, Value>,
      'keygen' | 'renderItem' | 'listClassName' | 'listStyle' | 'empty' | 'disabled' | 'onSearch' | 'renderFilter'
    >,
    Pick<Required<TransferProps<DataItem, Value>>, 'lineHeight' | 'listHeight' | 'rowsInView'> {
  title: NodeItem
  selecteds: keyType[]
  data: DataItem[]
  setSelecteds: (index: IndexType, value: keyType[]) => void
  index: IndexType
  footer: NodeItem
  loading?: boolean
  customRender: TransferProps<DataItem, Value>['children']
  values: Value
  onFilter?: (text: string) => void
  filterText: string
}

/** ----------- filter ------------*/
export type GetFilterProps<Props, DataItem, Value extends any[]> = Omit<Props, 'onFilter' | 'filterText'> & {
  onFilter: TransferProps<DataItem, Value>['onFilter']
}

export declare class FilterComp<DataItem, Value extends any[]> extends React.Component<
  GetFilterProps<CardProps<DataItem, Value>, DataItem, Value>,
  any
> {
  render: () => JSX.Element
}

export type FilterType = typeof FilterComp

/** ----------- item ------------*/
export interface ItemProps<DataItem, Value extends any[]>
  extends Pick<CardProps<DataItem, Value>, 'lineHeight' | 'index'>,
    Pick<TransferContextValue, 'selecteds' | 'setSelecteds' | 'itemClass'> {
  disabled: boolean
  checkKey: keyType
  liData: DataItem
  content: React.ReactNode
}

export interface ItemConsumerProps<DataItem, Value extends any[]>
  extends Omit<ItemProps<DataItem, Value>, keyof TransferContextValue> {}

/** ----------- index ------------*/

export type TransferBindType = 'disabled' | 'limit' | 'format' | 'prediction' | 'separator'
export type TransferPropsWithListDatum<DataItem, Value extends any[]> = GetDatumListProps<
  TransferProps<DataItem, Value>,
  DataItem,
  Value,
  TransferBindType
>
export type TransferPropsWithInputable<DataItem, Value extends any[]> = GetInputableProps<
  TransferPropsWithListDatum<DataItem, Value>,
  Value
>
// separator 测试发现该属性有问题暂时屏蔽
export type TransferIndexProps<DataItem, Value extends any[]> = Omit<
  TransferPropsWithInputable<DataItem, Value>,
  'separator'
>

export declare class TransferComp<DataItem, Value extends any[]> extends React.Component<
  TransferPropsWithInputable<DataItem, Value>,
  any
> {
  render: () => JSX.Element
}

export type TransferType = typeof TransferComp
