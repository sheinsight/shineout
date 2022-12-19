import React, { CSSProperties, ReactComponentElement, ReactNode } from 'react'
import { keyType, LiteralUnion, ObjectType, RegularAttributes, StructKeygenType } from '../@types/common'
import ListDatum from '../Datum/List'
import { StickyProps } from '../Sticky'
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

export interface renderSorterParam {
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
   * cell align \['left', 'center', 'right'\]
   *
   * 单元格内容排布方式，可选 \['left', 'center', 'right'\]
   *
   * default: 'left'
   */
  align?: RegularAttributes.Align

  /**
   * The function for controlling to merge columns. The return value is an integer indicating the number of columns that need to be merged。
   *
   * 合并列控制函数，row为单行数据，返回值一个整数，标明需要合并的列数
   *
   * default: none
   */
  colSpan?: (row: T, index: number) => number

  /**
   * default sort
   *
   * 默认排序规则
   *
   * default: none
   */
  defaultOrder?: ColumnOrder

  /**
   * options: \['left', 'right']；Need to set the Table's fixed to 'x' or 'both'
   *
   * 可选\['left', 'right']；需要设置Table的fixed为'x'或'both'才生效；如果相邻的多列需要锁定，只需指定最外侧的column即可
   *
   * default: none
   */
  fixed?: ColumnFix

  /**
   * The group of header column.
   *
   * 表头分组，相邻的相同 group 会生成一个新的表头
   *
   * default: none
   */
  group?: string | ReactNode | Array<string | ReactNode>

  /**
   * hide the column, only work on row-expand column
   *
   * 只针对行展开列有效，表示是否隐藏该列
   *
   * default: none
   */
  hide?: boolean

  /**
   * The key of the column
   *
   * 列的key，默认使用index
   *
   * default: none
   */
  key?: string | number

  /**
   * min width
   *
   * 最小列宽
   *
   * default: none
   */
  minWidth?: number

  /**
   * max width
   *
   * 最大可拖动列宽
   *
   * default: none
   */
  maxWidth?: number

  /**
   * 全选时用来筛除数据，仅当type="checkbox"的时候有效
   *
   * 最大可拖动列宽
   *
   * default: none
   */
  filterAll?: (data: T[]) => T[]

  /**
   * The generation function for Table content.d: the data of the current row. i: the index of the current row .For ease of use, you can pass in the key of a data, such as 'id', which is equivalent to (d) => { return d.id }
   *
   * 表格内容生成函数；d: 当前行数据i: 当前行索引为了使用方便，可以传入一个数据的key，如 'id'，相当于 (d) => { return d.id }
   *
   * default: none
   */
  render?:
    | LiteralUnion<T>
    | ((rowData: T, index: number, checkInstance?: ReactComponentElement<any>) => ReactNode | (() => ReactNode))

  /**
   *
   *
   * 根据函数返回的结果（boolean）判断是否合并行，a、b为相邻的两行数据。
   *
   * default: none
   */
  rowSpan?: ((prevRowData: T, nextRowData: T) => boolean) | boolean

  /**
   * When the sorter is not empty, the sort icon appears in this column. the value of order: \['asc', 'desc']. Indicate the sort key string, will pass to table sorter method. Front-end sorting returns a sort function, refer to Array.sort. Server-side sorting, do not return values and handle it itself.
   *
   * sorter 不为空时，这一列会出现排序 icon。order的值为\['asc', 'desc']。字符串表示排序依据字段，作为第一个参数传入Table.sorter。前端排序，返回一个排序函数，参考 Array.sort。服务端排序，不要返回值，自行处理即可。
   *
   * default: none
   */
  sorter?: ((order: ColumnOrder) => ((prevRowData: T, nextRowData: T) => number) | void) | string | Sorter

  /**
   * The content of the header
   *
   * 表头显示内容
   *
   * default: none
   */
  title?: string | ReactNode | ((rowData: T[]) => ReactNode)

  /**
   * tree table children-data name
   *
   * 树形表格子数据字段名
   *
   * default: none
   */
  treeColumnsName?: LiteralUnion<T>

  /**
   * indent of each level
   *
   * 每一层缩进宽度
   *
   * default: none
   */
  treeIndent?: number

  /**
   * Special column, options: \['expand', 'row-expand', 'checkbox'].expand: Expand the column. When the render function returns a function, it means that the row can be expanded and the content  is the result returned by this function. row-expand: Similar to expand. The difference is that clicking on the entire row triggers the expand event. checkbox: Select column for scenes with only fixed selection columns
   *
   * 特殊用途列，可选值为 \['expand', 'row-expand', 'checkbox']。expand: 行展开列，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果。row-expand: 同expand。不同为点击行内空白区域也可以折叠/展开行。checkbox: 选择列，用于仅固定选择列的场景
   *
   * default: none
   */
  type?: ColumnType

  /**
   * width
   *
   * 列宽
   *
   * default: none
   */
  width?: number

  /**
   * 列对应的类名
   *
   * classname of column
   *
   * default: -
   */
  className?: string

  /**
   * td 样式
   *
   * style of td
   *
   * default: -
   */
  style?: React.CSSProperties

  /**
   * 列点击事件
   *
   * Click event of column
   *
   * default: -
   */
  onClick?: (d: T, isExpand: boolean) => void

  /**
   * 单独设置某一列不可拖动
   *
   * Separately set a column not to be draggable
   *
   * default: -
   */
  columnResizable?: false
}

export type ColumnItem<T> = CommonColumn<T>

/** ------ context ---------- */
export type getTableConsumerProps<Props> = Props

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
  columns: ColumnItem<DataItem>[]
  /**
   * Select row. Rows is the selected data.
   *
   * 选择行。rows为选中的数据。如果需要数据需要格式化的处理，建议配置 format 和 prediction
   *
   * default: none
   */
  onRowSelect?: (rows: Value) => void
  /**
   * the method of table sort，args are Column.sorter and order. Multi-column sorting is supported. The sorter passes in the object {rule: string | function, weight: number}, where rule is a sorting rule, which refers to the use of single-column sorting when it is a string, weight is the weight, indicating the priority of the order. When sorting on multiple columns, sortedList returns information about all fields involved in sorting
   *
   * 表格统一排序函数，参数分别为 Column.sorter 和 排序方式; 支持多列排序，sorter传入对象{ rule: string \| function, weight: number }, rule为排序规则，为字符串时参考单列排序的用法, weight为权重，指明排序的优先级。 多列排序时，sortedList返回所有参与排序的字段信息
   *
   * default: alphaSort(Column.sorter, sorter)
   */
  sorter?: (sortKey: string, sorter: 'asc' | 'desc', sortedList: any[]) => ((a: DataItem, b: DataItem) => number) | void
  /**
   * sort cancel event
   *
   * 排序取消事件
   *
   * default: none
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
   * vertical align with content
   *
   * 单元格内容垂直对齐方式
   *
   * default: 'top'
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
  width?: number
  dataChangeResize?: boolean
  externalExpandRender?: (rowData: DataItem, index: number) => ReactNode
  expandKeys?: keyType[]
  keygen: StructKeygenType<DataItem>
  resetFixAuto: (is?: boolean) => boolean
  onTreeExpand: (data: DataItem, index: number) => void
  datum: ListDatum<DataItem, Value>
  disabled?: boolean | ((d: DataItem) => boolean)
  treeRoot?: boolean
  treeExpandLevel: Map<keyType, number>
  treeIndent: number
  treeEmptyExpand?: boolean
  ignoreBorderRight?: boolean
  rowClickAttr?: string[] | string | boolean
  onRowClick?: (rowData: DataItem, index: number, fireAttr?: string | boolean) => void
  externalExpandClick?: (rowData: DataItem, expanded: boolean) => void
  striped?: boolean
  rowClassName?: (rowData: DataItem, index: number) => string | undefined
  treeExpandKeys?: Map<keyType, boolean>
  /**
   * tr events
   *
   * tr 事件监听器集合
   *
   * default: none
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
  treeColumnsName?: LiteralUnion<DataItem>
  treeCheckAll?: boolean
  /**
   * customize sort icons
   *
   * 自定义排序图标
   *
   * default: false
   */
  renderSorter?: (params: renderSorterParam) => ReactNode
  hideHeader?: boolean
  /**
   *  Footer information can be used to summarize
   *
   *  底部信息可用于总结
   *
   *  default: -
   */
  summary?: SummaryItem[][] | SummaryItem[]
  onResize?: (index: number, width: number, colgroup?: number[]) => void
  /**
   * sticky header, When it is true, the distance from the top is 0. When it is an object, the attribute value reference [Sticky component] (/components/Sticky)
   *
   * 表头是否附着顶部，为 true 时距离顶部为0，为对象时属性值参考 [Sticky组件](/components/Sticky)
   *
   * default: none
   */
  sticky?: boolean | StickyProps
  fixed?: TableFix
  /**
   * Table instance (please use with caution: only fixed Table)
   *
   * Table 实例（请谨慎使用：仅固定表格）
   *
   * default: none
   */
  tableRef?: (table: TableRef) => void
}

/** ------ SeperateTable ---------- */
export interface SeperateTableProps<DataItem, Value> extends SimpleTableProps<DataItem, Value> {
  /**
   * The maximum number of rows for a single render. Table uses lazy render to optimize performance under large amounts of data. If your table displays more than 20 rows, you can change the value of rowsInView. Value of 0 render all data.
   *
   * 单次render的最大行数。Table 采用了lazy render的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了20条，可以调整rowsInView的值。为 0 表示单次 render 所有数据。
   *
   * default: 20
   */
  rowsInView: number
  rowHeight?: number
  onScroll?: (x: number, y: number, left: number) => void
  scrollLeft?: number
  /**
   * Enable in specific scenarios (tree data expansion is controlled) Used to change the default behavior of scroll reset
   *
   * 在特定场景（树形数据展开受控)下开启 用来改变滚动条重置的默认行为
   *
   * default: false
   */
  changedByExpand?: boolean
  /**
   * set inner scrollable element's attribute
   *
   * 虚拟滚动模式下，设置行内元素的 attribut 来实现内部滚动
   *
   * default: 无
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
  expandKeys?: keyType[]
  colSpan: number
  rowSpan?: number
}

/** ------ tr ---------- */
export interface TrProps<DataItem, Value>
  extends Omit<TbodyProps<DataItem, Value>, 'data' | 'keygen' | 'sorter' | 'expandKeys' | 'colgroup'> {
  onExpand: (key: keyType, expanded?: ReactNode) => void
  expandRender?: ((rowData: DataItem, index?: number) => ReactNode) | ReactNode
  rowKey?: string | number
  rowData: DataItem
  data: Row<DataItem>[]
  originKey: keyType
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
   * whether to enable ctrl/cmd + click check
   *
   * 是否启用 ctrl/cmd + click 选中单元格
   *
   * default: false
   */
  cellSelectable?: boolean
}

/** ------ treeExpand ---------- */

export type GetTreeExpandProps<Props, DataItem> = Omit<
  Props,
  'treeExpandLevel' | 'treeRoot' | 'treeIndent' | 'onTreeExpand' | 'treeExpandKeys'
> & {
  /**
   * Default expanded row keys
   *
   * 默认展开行(非受控)
   *
   * default: none
   */
  defaultTreeExpandKeys?: keyType[]
  /**
   * expand row change, keys is expanded row keys
   *
   * 展开行，keys为展开的行
   *
   * default: none
   */
  onTreeExpand?: (openKeys: keyType[], data: DataItem, expand: boolean, index: number) => void
  /**
   * Tree Table expanded row keys
   *
   * 树形数据展开行，受控
   *
   * default: none
   */
  treeExpandKeys?: keyType[]
}
