import * as React from 'react'
import { ReactNode } from 'react'
import ListDatum from '../Datum/List'
import { GetDatumListProps } from '../Datum/Props'
import { KeygenResult, KeygenType, ObjectKey, StandardProps } from '../@types/common'
import { GetInputableProps } from '../Form/Props'

export type FilterInfo = {
  value: string
  disabled: boolean
  onFilter?: (value: string) => void
  placeholder?: string
  isSource: boolean
}

export type SelectedArr = [KeygenResult[], KeygenResult[]]
export type IndexType = 1 | 0
export type NodeItem = React.ReactNode | undefined
/** ----------- context ------------*/
export interface TransferContextValue {
  selecteds: SelectedArr
  setSelecteds: (index: IndexType, value: KeygenResult[]) => void
  itemClass: string | undefined
}

/** ----------- transfer ------------*/
export interface BaseTransferProps<DataItem, Value extends any[]> extends StandardProps {
  /**
   * @en Form field, used with Form
   * @cn 表单字段, 配合 Form 使用
   */
  name?: string
  /**
   * @en Title on both sides, order from left to right
   * @cn 两侧的标题, 顺序是从左到右
   */
  titles?: [NodeItem, NodeItem]
  /**
   * @en data source
   * @cn 数据源
   */
  data: DataItem[]
  datum: ListDatum<DataItem, Value>
  /**
   * @en Generate a auxiliary method for each key
   * If not filled, index will be used(not recommended,there may be problems with more than 10 data)
   * When it is a function, use its return value.
   * When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id.
   *
   * @cn 生成每一项key的辅助方法
   * 为 true 时，以数据项本身作为key，相当于 (d => d)
   * 为函数时，使用此函数返回值
   * 为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id)
   */
  keygen: KeygenType<DataItem>
  /**
   * @en When it is a string, return d\\[string]
   * When it is a function, return the result of the function
   *
   * @cn 为 string 时，返回 d\\[string]
   * 为 function 时，返回函数结果
   * @default d => d
   */
  renderItem?: ((data: DataItem) => React.ReactNode) | ObjectKey<DataItem>
  /**
   * @en Bottom element, order from left to right
   * @cn 底部元素, 顺序是从左到右
   */
  footers?: [NodeItem, NodeItem]
  /**
   * @en Operational elements, the order is from top to bottom
   * @cn 操作元素, 顺序是从上到下
   */
  operations?: [NodeItem, NodeItem]
  /**
   * @en Whether to display the icon of the action button
   * @cn 是否显示操作按钮的图标
   * @default true
   */
  operationIcon?: boolean
  /**
   * @en The set of values displayed in the box data on the right
   * @cn 显示在右侧框数据的值集合
   * @override any[]
   */
  value: Value
  /**
   * @en List extended class
   * @cn 列表扩展的 class
   */
  listClassName?: string
  /**
   * @en List extension style
   * @cn 列表扩展的样式
   */
  listStyle?: React.CSSProperties
  /**
   * @en checked lists
   * @cn 被勾选的列表, 勾选的值均使用的是 keygen 的结果
   */
  selectedKeys?: KeygenResult[]
  /**
   * @en checked by default
   * @cn 默认被勾选的列表
   */
  defaultSelectedKeys?: KeygenResult[]
  /**
   * @en select event
   * @cn 勾选触发的方法
   */
  onSelectChange?: (sourceKeys: KeygenResult[], targetKeys: KeygenResult[]) => void
  /**
   * @en When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.
   * @cn 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   */
  disabled?: boolean | ((data: DataItem) => boolean)
  /**
   * @en ContentLess display
   * @cn 无内容的展示
   * @default getLocale("no data")
   */
  empty?: React.ReactNode
  /**
   * @en filter data
   * @cn 筛选函数, 参数为: 输入文本, 数据, 是否为左侧数据
   */
  onFilter?: (text: string, data: DataItem, isSource: boolean) => boolean
  /**
   * @en item className
   * @cn 选项 className
   */
  itemClass?: string
  /**
   * @en loading
   * @cn 加载中, 如果需要两侧加载中状态不一致, 需要传入数组
   */
  loading?: boolean | [boolean, boolean]
  /**
   * @en search event
   * @cn 输入框值变化的回调, 参数为: 输入文本, 是否为左侧数据
   */
  onSearch?: (text: string, isSource: boolean) => void
  /**
   * @en number of data loaded at one time
   * @cn 一次加载的数据条数
   * @default 20
   */
  rowsInView?: number
  /**
   * @en line height of list
   * @cn 列表行高
   * @default 32
   */
  lineHeight?: number
  /**
   * @en list height
   * @cn 列表高度
   * @default 180
   */
  listHeight?: number
  /**
   * @en custom render filter
   * @cn 自定义过滤器渲染。自定义过滤器渲染
   */
  renderFilter?: (value: FilterInfo) => React.ReactNode
  /**
   * @en custom render content
   * @cn 自定义渲染内容
   */
  children?: (
    props: {
      onSelected: (keys: KeygenResult) => void
      direction: 'left' | 'right'
      selectedKeys: KeygenResult[]
      value: Value
      filterText: string
    }
  ) => ReactNode
}

/** ----------- btns ------------*/
export interface BtnProps<DataItem, Value extends any[]>
  extends Pick<BaseTransferProps<DataItem, Value>, 'datum' | 'keygen' | 'operationIcon' | 'data' | 'disabled'>,
    Required<Pick<BaseTransferProps<DataItem, Value>, 'operations' | 'data'>> {
  selecteds: SelectedArr
  setSelecteds: (index: IndexType, value: KeygenResult[]) => void
  sources: DataItem[]
  targets: DataItem[]
}

/** ----------- card ------------*/
export interface CardProps<DataItem, Value extends any[]>
  extends Pick<
      BaseTransferProps<DataItem, Value>,
      'keygen' | 'renderItem' | 'listClassName' | 'listStyle' | 'empty' | 'disabled' | 'onSearch' | 'renderFilter'
    >,
    Pick<Required<BaseTransferProps<DataItem, Value>>, 'lineHeight' | 'listHeight' | 'rowsInView'> {
  title: NodeItem
  selecteds: KeygenResult[]
  data: DataItem[]
  setSelecteds: (index: IndexType, value: KeygenResult[]) => void
  index: IndexType
  footer: NodeItem
  loading?: boolean
  customRender: BaseTransferProps<DataItem, Value>['children']
  values: Value
  onFilter?: (text: string) => void
  filterText: string
}

/** ----------- filter ------------*/
export type GetFilterProps<Props, DataItem, Value extends any[]> = Omit<Props, 'onFilter' | 'filterText'> & {
  onFilter: BaseTransferProps<DataItem, Value>['onFilter']
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
  checkKey: KeygenResult
  liData: DataItem
  content: React.ReactNode
}

export interface ItemConsumerProps<DataItem, Value extends any[]>
  extends Omit<ItemProps<DataItem, Value>, keyof TransferContextValue> {}

/** ----------- index ------------*/

export type TransferBindType = 'disabled' | 'limit' | 'format' | 'prediction' | 'separator'
export type TransferPropsWithListDatum<DataItem, Value extends any[]> = GetDatumListProps<
  BaseTransferProps<DataItem, Value>,
  DataItem,
  Value,
  TransferBindType
>
export type TransferPropsWithInputable<DataItem, Value extends any[]> = GetInputableProps<
  TransferPropsWithListDatum<DataItem, Value>,
  Value
>
// separator 测试发现该属性有问题暂时屏蔽
/**
 * @title Transfer
 */
export type TransferProps<DataItem, Value extends any[]> = Omit<
  TransferPropsWithInputable<DataItem, Value>,
  'separator'
>

export declare class TransferComp<DataItem, Value extends any[]> extends React.Component<
  TransferProps<DataItem, Value>,
  any
> {
  render: () => JSX.Element
}

export type TransferType = typeof TransferComp
