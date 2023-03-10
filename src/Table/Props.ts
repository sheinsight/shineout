import React, { CSSProperties, ReactComponentElement, ReactNode } from 'react'
import { KeygenResult, ObjectKey, ObjectType, RegularAttributes, StructKeygenType } from '../@types/common'
import ListDatum from '../Datum/List'
import { StickyProps } from '../Sticky/Props'
import { GetHidableConsumerProps, GetPagableProps } from '../hoc/Props'
import { GetDatumListProps } from '../Datum/Props'

interface SorterInfo {
  order?: ColumnOrder
  manual?: boolean
  index: number
  weight?: number
}
interface Sorter {
  rule: string | ((sorter: SorterInfo[]) => void)
  weight: number
}

export interface TableRef {
  scrollToIndex: (index: number, cb?: Function) => void
  [key: string]: any
}
export type ColumnOrder = 'asc' | 'desc'

export type ColumnFix = 'left' | 'right'

export type TableFix = 'x' | 'y' | 'both'

export type ColumnType = 'expand' | 'row-expand' | 'checkbox'

export interface RenderSorterParam {
  status?: 'asc' | 'desc'
  triggerAsc: () => void
  triggerDesc: () => void
}

export interface SummaryItem {
  render: () => ReactNode
  colSpan?: number
  rowSpan?: number
}

export interface CommonColumn<T> {
  /**
   * @en cell align \['left', 'center', 'right'\]
   * @cn 单元格内容排布方式，可选 \['left', 'center', 'right'\]
   * @default 'left'
   */
  align?: RegularAttributes.Align

  /**
   * @en The function for controlling to merge columns. The return value is an integer indicating the number of columns that need to be merged。
   * @cn 合并列控制函数，row为单行数据，返回值一个整数，标明需要合并的列数
   */
  colSpan?: (row: T, index: number) => number

  /**
   * @en default sort
   * @cn 默认排序规则
   */
  defaultOrder?: ColumnOrder

  /**
   * @en options: \['left', 'right']；Need to set the Table's fixed to 'x' or 'both'
   * @cn 可选\['left', 'right']；需要设置Table的fixed为'x'或'both'才生效；如果相邻的多列需要锁定，只需指定最外侧的column即可
   */
  fixed?: ColumnFix

  /**
   * @en The group of header column.
   * @cn 表头分组，相邻的相同 group 会生成一个新的表头
   * @override union
   */
  group?: string | ReactNode | Array<string | ReactNode>

  /**
   * @en hide the column, only work on row-expand column
   * @cn 只针对行展开列有效，表示是否隐藏该列
   */
  hide?: boolean

  /**
   * @en The key of the column
   * @cn 列的key，默认使用index
   * @override union
   */
  key?: string | number

  /**
   * @en min width
   * @cn 最小列宽
   */
  minWidth?: number

  /**
   * @en max width
   * @cn 最大可拖动列宽
   */
  maxWidth?: number

  /**
   * @en 全选时用来筛除数据，仅当type="checkbox"的时候有效
   * @cn 最大可拖动列宽
   */
  filterAll?: (data: T[]) => T[]

  /**
   * @en The generation function for Table content.d: the data of the current row. i: the index of the current row .For ease of use, you can pass in the key of a data, such as 'id', which is equivalent to (d) => { return d.id }
   * @cn 表格内容生成函数；d: 当前行数据i: 当前行索引为了使用方便，可以传入一个数据的key，如 'id'，相当于 (d) => { return d.id }
   * @override union
   */
  render?:
    | ObjectKey<T>
    | ((rowData: T, index: number, checkInstance?: ReactComponentElement<any>) => ReactNode | (() => ReactNode))

  /**
   * @en According to the result (boolean) returned by the function to determine whether to merge rows, a and b are two adjacent rows of data
   * @cn 根据函数返回的结果（boolean）判断是否合并行，a、b为相邻的两行数据。
   * @override union
   */
  rowSpan?: ((prevRowData: T, nextRowData: T) => boolean) | boolean

  /**
   * @en When the sorter is not empty, the sort icon appears in this column. the value of order: \['asc', 'desc']. Indicate the sort key string, will pass to table sorter method. Front-end sorting returns a sort function, refer to Array.sort. Server-side sorting, do not return values and handle it itself.
   * @cn sorter 不为空时，这一列会出现排序 icon。order的值为\['asc', 'desc']。字符串表示排序依据字段，作为第一个参数传入Table.sorter。前端排序，返回一个排序函数，参考 Array.sort。服务端排序，不要返回值，自行处理即可。
   * @override union
   */
  sorter?: ((order: ColumnOrder) => ((prevRowData: T, nextRowData: T) => number) | void) | string | Sorter

  /**
   * @en The content of the header
   * @cn 表头显示内容
   * @override union
   */
  title?: string | ReactNode | ((rowData: T[]) => ReactNode)

  /**
   * @en tree table children-data name
   * @cn 树形表格子数据字段名
   */
  treeColumnsName?: ObjectKey<T>

  /**
   * @en indent of each level
   * @cn 每一层缩进宽度
   */
  treeIndent?: number

  /**
   * @en Special column, options: \['expand', 'row-expand', 'checkbox'].expand: Expand the column. When the render function returns a function, it means that the row can be expanded and the content  is the result returned by this function. row-expand: Similar to expand. The difference is that clicking on the entire row triggers the expand event. checkbox: Select column for scenes with only fixed selection columns
   * @cn 特殊用途列，可选值为 \['expand', 'row-expand', 'checkbox']。expand: 行展开列，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果。row-expand: 同expand。不同为点击行内空白区域也可以折叠/展开行。checkbox: 选择列，用于仅固定选择列的场景
   */
  type?: ColumnType

  /**
   * @en width
   * @cn 列宽
   */
  width?: number

  /**
   * @cn 列对应的类名
   * @en classname of column
   */
  className?: string

  /**
   * @cn td 样式
   * @en style of td
   */
  style?: React.CSSProperties

  /**
   * @cn 列点击事件
   * @en Click event of column
   */
  onClick?: (d: T, isExpand: boolean) => void

  /**
   * @cn 单独设置某一列不可拖动
   * @en Separately set a column not to be draggable
   */
  columnResizable?: false
}

export type ColumnItem<T> = CommonColumn<T>

/** ------ context ---------- */
export type GetTableConsumerProps<Props> = Props

/** ------ tableIndex ---------- */
export type TablePropsWithPagable<DataItem, Value> = GetPagableProps<TableProps<DataItem, Value>>
export type TablePropsWidthPT<DataItem, Value> = GetTreeExpandProps<TablePropsWithPagable<DataItem, Value>, DataItem>
export interface TableIndexProps<DataItem, Value>
  extends Omit<
    TablePropsWidthPT<DataItem, Value>,
    | 'columns'
    | 'sorter'
    | 'onSortChange'
    | 'onChange'
    | 'treeColumnsName'
    | 'externalExpandRender'
    | 'externalExpandClick'
  > {
  columns?: ColumnItem<DataItem>[]
  /**
   * @en Select row. Rows is the selected data.
   * @cn 选择行。rows为选中的数据。如果需要数据需要格式化的处理，建议配置 format 和 prediction
   */
  onRowSelect?: (rows: Value) => void
  /**
   * @en the method of table sort，args are Column.sorter and order. Multi-column sorting is supported. The sorter passes in the object {rule: string | function, weight: number}, where rule is a sorting rule, which refers to the use of single-column sorting when it is a string, weight is the weight, indicating the priority of the order. When sorting on multiple columns, sortedList returns information about all fields involved in sorting
   * @cn 表格统一排序函数，参数分别为 Column.sorter 和 排序方式; 支持多列排序，sorter传入对象{ rule: string \| function, weight: number }, rule为排序规则，为字符串时参考单列排序的用法, weight为权重，指明排序的优先级。 多列排序时，sortedList返回所有参与排序的字段信息
   * @override union
   * @default alphaSort(Column.sorter, sorter)
   */
  sorter?: (sortKey: string, sorter: 'asc' | 'desc', sortedList: any[]) => ((a: DataItem, b: DataItem) => number) | void
  /**
   * @en sort cancel event
   * @cn 排序取消事件
   */
  onSortCancel?: (prevType: ColumnOrder, index: number, orders: any, sort: any) => void
}

/** ------ table ---------- */
export interface OriginTableProps<DataItem, Value>
  extends Omit<GetResizeProps<SeperateTableProps<DataItem, Value>, DataItem>, 'rowsInView'> {
  rowsInView?: number
  bindWrapper?: (el: HTMLElement) => void
  size?: RegularAttributes.Size
  hover?: boolean
  height?: number
  empty?: ReactNode
  style?: CSSProperties
  className?: string
  loading?: boolean | ReactNode
  /**
   * @en vertical align with content
   * @cn 单元格内容垂直对齐方式
   * @default 'top'
   * @override union
   */
  verticalAlign?: 'top' | 'middle'
  events?: React.HTMLAttributes<HTMLDivElement>
}
export type TableDatumBindKey = 'disabled' | 'format' | 'prediction' | 'limit' | 'distinct'
export type TablePropsWithSelect<DataItem, Value> = GetSelectProps<OriginTableProps<DataItem, Value>>
export type TablePropsWithHidable<DataItem, Value> = GetHidableConsumerProps<TablePropsWithSelect<DataItem, Value>>
export type TablePropsWithFixedAuto<DataItem, Value> = GetFixAutoProps<TablePropsWithHidable<DataItem, Value>>
export type TablePropsWithDatum<DataItem, Value> = GetDatumListProps<
  TablePropsWithFixedAuto<DataItem, Value>,
  DataItem,
  Value,
  TableDatumBindKey
>
export type TablePropsWithRadio<DataItem, Value> = GetRadioProps<TablePropsWithDatum<DataItem, Value>>
export type TableProps<DataItem, Value> = TablePropsWithRadio<DataItem, Value>

export declare class Table<DataItem, Value> extends React.Component<TableProps<DataItem, Value>, any> {
  render(): JSX.Element
}
export type TableType = typeof Table
/** ------ simpleTable ---------- */
export interface SimpleTableProps<DataItem, Value> {
  children?: ReactNode
  width?: number
  dataChangeResize?: boolean
  externalExpandRender?: (rowData: DataItem, index: number) => () => ReactNode
  expandKeys?: KeygenResult[]
  keygen: StructKeygenType<DataItem>
  resetFixAuto: (is?: boolean) => boolean
  onTreeExpand: (data: DataItem, index: number) => void
  datum: ListDatum<DataItem, Value>
  disabled?: boolean | ((d: DataItem) => boolean)
  treeRoot?: boolean
  treeExpandLevel: Map<KeygenResult, number>
  treeIndent: number
  treeEmptyExpand?: boolean
  ignoreBorderRight?: boolean
  rowClickAttr?: string[] | string | boolean
  onRowClick?: (rowData: DataItem, index: number, fireAttr?: string | boolean) => void
  externalExpandClick?: (rowData: DataItem, expanded: boolean) => void
  striped?: boolean
  rowClassName?: (rowData: DataItem, index: number) => string | undefined
  treeExpandKeys?: Map<KeygenResult, boolean>
  /**
   * @en tr events
   * @cn tr 事件监听器集合
   */
  rowEvents?: ObjectType
  columns: ColumnItemWithFixed<DataItem>[]
  data: DataItem[]
  onSortChange: (
    finalOrder: ColumnOrder | undefined,
    sorter: ColumnItem<DataItem>['sorter'],
    index: number,
    cancelOrder: ColumnOrder,
    // 是否是自动触发
    manual: boolean
  ) => void
  sorter: SorterState<DataItem>[]
  showSelectAll?: boolean
  bordered?: boolean
  columnResizable?: boolean
  treeColumnsName?: ObjectKey<DataItem>
  treeCheckAll?: boolean
  /**
   * @en customize sort icons
   * @cn 自定义排序图标
   * @default false
   */
  renderSorter?: (params: RenderSorterParam) => ReactNode
  hideHeader?: boolean
  /**
   * @en Footer information can be used to summarize
   * @cn 底部信息可用于总结
   *  default: -
   * @override union
   */
  summary?: SummaryItem[][] | SummaryItem[]
  onResize?: (index: number, width: number, colgroup?: number[]) => void
  /**
   * @en sticky header, When it is true, the distance from the top is 0. When it is an object, the attribute value reference [Sticky component] (/components/Sticky)
   * @cn 表头是否附着顶部，为 true 时距离顶部为0，为对象时属性值参考 [Sticky组件](/components/Sticky)
   * @override union
   */
  sticky?: boolean | StickyProps
  fixed?: TableFix
  /**
   * @en Table instance (please use with caution: only fixed Table)
   * @cn Table 实例（请谨慎使用：仅固定表格）
   */
  tableRef?: (table: TableRef) => void
}

/** ------ SeperateTable ---------- */
export interface SeperateTableProps<DataItem, Value> extends SimpleTableProps<DataItem, Value> {
  /**
   * @en The maximum number of rows for a single render. Table uses lazy render to optimize performance under large amounts of data. If your table displays more than 20 rows, you can change the value of rowsInView. Value of 0 render all data.
   * @cn 单次render的最大行数。Table 采用了lazy render的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了20条，可以调整rowsInView的值。为 0 表示单次 render 所有数据。
   * @default 20
   */
  rowsInView: number
  rowHeight?: number
  onScroll?: (x: number, y: number, left: number) => void
  scrollLeft?: number
  /**
   * @en Enable in specific scenarios (tree data expansion is controlled) Used to change the default behavior of scroll reset
   * @cn 在特定场景（树形数据展开受控)下开启 用来改变滚动条重置的默认行为
   * @default false
   */
  changedByExpand?: boolean
  /**
   * @en set inner scrollable element's attribute
   * @cn 虚拟滚动模式下，设置行内元素的 attribut 来实现内部滚动
   * @default '无'
   */
  innerScrollAttr?: string[]
}

/** ------ Tbody ---------- */
export interface TbodyProps<DataItem, Value> extends Omit<SimpleTableProps<DataItem, Value>, 'width' | 'fixed'> {
  lazy?: boolean
  colgroup?: number[]
  index: number
  onBodyRender?: (trs: NodeListOf<HTMLTableCellElement>) => void
  resize?: number | boolean
  offsetLeft?: number
  offsetRight?: number
  setRowHeight?: (height: number, index: number, expanded: boolean) => void
  hasNotRenderRows?: boolean
  dataUpdated?: boolean
  onScrollTop?: () => void
}
export interface Row<DataItem> {
  index: number
  data: DataItem
  expandKeys?: KeygenResult[]
  colSpan: number
  rowSpan?: number
}

/** ------ tr ---------- */
export interface TrProps<DataItem, Value>
  extends Omit<TbodyProps<DataItem, Value>, 'data' | 'keygen' | 'sorter' | 'expandKeys' | 'colgroup'> {
  onExpand: (key: KeygenResult, expanded?: () => ReactNode) => void
  expandRender?: ((rowData: DataItem, index?: number) => ReactNode) | ReactNode
  rowKey?: string | number
  rowData: DataItem
  data: Row<DataItem>[]
  originKey: KeygenResult
}
export type ColumnItemWithFixed<DataItem> = ColumnItem<DataItem> & {
  lastFixed?: boolean
  firstFixed?: boolean
  key: string | number
  index: number
}

/** ------ td ---------- */
export interface TdProps<DataItem, Value>
  extends Pick<
      TrProps<DataItem, Value>,
      | 'originKey'
      | 'resetFixAuto'
      | 'onExpand'
      | 'onTreeExpand'
      | 'datum'
      | 'treeColumnsName'
      | 'treeCheckAll'
      | 'disabled'
      | 'treeRoot'
      | 'treeExpandLevel'
      | 'treeIndent'
      | 'treeEmptyExpand'
      | 'ignoreBorderRight'
    >,
    Row<DataItem> {
  render?: ColumnItem<DataItem>['render']
  align?: RegularAttributes.Align
  lastFixed?: boolean
  firstFixed?: boolean
  fixed?: ColumnFix
  style?: CSSProperties
  className?: string
  expandClick?: (data: DataItem, expanded: boolean) => void
  type?: ColumnType
  treeExpandShow?: boolean
  treeExpand?: boolean
  expanded: boolean
}

/** ------ thead ---------- */
export interface TheadProps<DataItem, Value> extends SimpleTableProps<DataItem, Value> {
  colgroup?: number[]
  onColChange: SimpleTableProps<DataItem, Value>['onResize']
}
export interface SorterState<DataItem> {
  order: ColumnOrder | undefined
  index: number
  manual?: boolean
  deleted?: boolean
  multiple?: boolean
  weight?: number
  sort?: ((a: DataItem, b: DataItem) => number) | void
}
export interface GroupColumn<DataItem> {
  name: ReactNode
  key: string
  colSpan: number
  level: number
  fixed?: ColumnFix
  firstFixed?: boolean
  columns: TheadColumn<DataItem>[]
  lastFixed?: boolean
}
export type TheadColumn<DataItem> = ColumnItemWithFixed<DataItem> | GroupColumn<DataItem>

/** ------ tfoot ---------- */
export interface TfootProps<DataItem, Value> extends Pick<SimpleTableProps<DataItem, Value>, 'columns' | 'summary'> {}
/** ------ colgroup ---------- */
export interface ColgroupProps<DataItem> {
  columns: ColumnItemWithFixed<DataItem>[]
  colgroup?: number[]
  resizable?: boolean | number
}

/** ------ sorter ---------- */
export interface SorterProps<DataItem, Value> extends Pick<TheadProps<DataItem, Value>, 'renderSorter'> {
  current?: SorterState<DataItem>[]
  index: number
  onChange: TheadProps<DataItem, Value>['onSortChange']
  sorter: ColumnItem<DataItem>['sorter']
  defaultOrder?: ColumnOrder
}

/** ------- checkbox --------- */
export interface CheckboxProps<DataItem, Value>
  extends Pick<TdProps<DataItem, Value>, 'index' | 'data' | 'datum' | 'disabled' | 'treeColumnsName'> {
  force: boolean
}

/** ------- checkboxAll --------- */
export interface CheckboxAllProps<DataItem, Value>
  extends Pick<TheadProps<DataItem, Value>, 'treeColumnsName' | 'datum' | 'data'> {
  disabled?: boolean
  col: TheadColumn<DataItem>
}

/** ------- expand --------- */
export interface ExpandProps {
  children: ReactNode
  colSpan: number
  setExpandHeight: (height: number) => void
}

/** ------ resize ---------- */
export type GetResizeProps<Props, DataItem> = Props & {
  onColumnResize?: (columns: ColumnItem<DataItem>[]) => void
}

/** ------ radio ---------- */
export type GetRadioProps<Props> = Omit<Props, 'distinct' | 'limit'> & {
  radio?: boolean
}

/** ------ fixAuto ---------- */
export type GetFixAutoProps<Props> = {
  fixed?: TableFix | 'auto'
} & Omit<Props, 'fixed' | 'limit' | 'bindWrapper' | 'resetFixAuto'>

/** ------ Select ---------- */
export type GetSelectProps<Props> = Omit<Props, 'events'> & {
  /**
   *  deprecate
   *
   *  废弃属性， 使用 cellSelectable 替换
   */
  selection?: boolean
  /**
   * @en whether to enable ctrl/cmd + click check
   * @cn 是否启用 ctrl/cmd + click 选中单元格
   * @default false
   */
  cellSelectable?: boolean
}

/** ------ treeExpand ---------- */

export type GetTreeExpandProps<Props, DataItem> = Omit<
  Props,
  'treeExpandLevel' | 'treeRoot' | 'treeIndent' | 'onTreeExpand' | 'treeExpandKeys'
> & {
  /**
   * @en Default expanded row keys
   * @cn 默认展开行(非受控)
   */
  defaultTreeExpandKeys?: KeygenResult[]
  /**
   * @en expand row change, keys is expanded row keys
   * @cn 展开行，keys为展开的行
   */
  onTreeExpand?: (openKeys: KeygenResult[], data: DataItem, expand: boolean, index: number) => void
  /**
   * @en Tree Table expanded row keys
   * @cn 树形数据展开行，受控
   */
  treeExpandKeys?: KeygenResult[]
}
