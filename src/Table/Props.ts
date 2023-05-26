import React, { CSSProperties, ReactComponentElement, ReactNode } from 'react'
import {
  KeygenResult,
  ObjectKey,
  ObjectType,
  RegularAttributes,
  StandardProps,
  StructKeygenType,
} from '../@types/common'
import ListDatum from '../Datum/List'
import { StickyProps } from '../Sticky/Props'
import { GetHidableConsumerProps, GetPagableProps } from '../hoc/Props'
import { GetDatumListProps } from '../Datum/Props'

export interface SorterInfo {
  order?: ColumnOrder
  /**
   * @cn 如果是 defaultOrder 触发的排序, manual 为 false
   */
  manual: boolean
  /**
   * @cn 列 key
   */
  key: number
  /**
   * @cn 设置的权重
   */
  weight?: number
}
export interface Sorter {
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

interface ColumnRenderFunc<DataItem> {
  (data: DataItem, index: number, checkInstance?: ReactComponentElement<any>): ReactNode | (() => ReactNode)
}

export type CommonColumn<T> = ColumnItem<T>

/** ------ context ---------- */
export type GetTableConsumerProps<Props> = Props

/** ------ tableIndex ---------- */
export type TablePropsWithPagable<DataItem, Value> = GetPagableProps<TableProps<DataItem, Value>>
export type TablePropsWidthPT<DataItem, Value> = GetTreeExpandProps<TablePropsWithPagable<DataItem, Value>, DataItem>

/**
 * @title Table
 */
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
  /**
   * @en The current selected value.
   * @cn 当前选中值，格式和 onRowSelect 返回值一致
   * @override any
   */
  value?: Value
  /**
   * @en array，see TableColumn
   * @cn 数组，见 TableColumn
   * @override TableColumn[]
   * @default []
   */
  columns?: ColumnItem<DataItem>[]
  /**
   * @en Select row. Rows is the selected data.
   * @cn 选择行。rows为选中的数据。如果需要数据需要格式化的处理，建议配置 format 和 prediction
   */
  onRowSelect?: (rows: Value) => void
  /**
   * @en the method of table sort，args are Column.sorter and order
   * Multi-column sorting is supported. The sorter passes in the object {rule: string | function, weight: number}, where rule is a sorting rule, which refers to the use of single-column sorting when it is a string, weight is the weight, indicating the priority of the order
   * When sorting on multiple columns, sortedList returns information about all fields involved in sorting
   *
   * @cn 表格统一排序函数，参数分别为 Column.sorter 和 排序方式;
   * 支持多列排序，sorter传入对象{ rule: string | function, weight: number }, rule为排序规则，为字符串时参考单列排序的用法, weight 为权重，指明排序的优先级。
   * 多列排序时，sortedList 返回所有参与排序的字段信息
   *
   * @default alphaSort(Column.sorter, sorter)
   */
  sorter?: (
    sortKey: string,
    sorter: 'asc' | 'desc',
    sortedList: SorterInfo[]
  ) => ((a: DataItem, b: DataItem) => number) | void
  /**
   * @en sort cancel event
   * @cn 排序取消事件
   */
  onSortCancel?: (prevType: ColumnOrder, index: number, orders: any, sort: any) => void
}

/** ------ table ---------- */
export interface OriginTableProps<DataItem, Value>
  extends StandardProps,
    Omit<GetResizeProps<SeperateTableProps<DataItem, Value>, DataItem>, 'rowsInView'> {
  /**
   * @en The maximum number of rows for a single render. Table uses lazy render to optimize performance under large amounts of data. If your table displays more than 20 rows, you can change the value of rowsInView. Value of 0 render all data.
   * @cn 单次 render的 最大行数。Table 采用了 lazy render 的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了20条，可以调整 rowsInView 的值。为 0 表示单次 render 所有数据。
   * @default 20
   */
  rowsInView?: number
  bindWrapper?: (el: HTMLElement) => void
  /**
   * @en size of table
   * @cn 表格尺寸
   * @default 'default'
   */
  size?: 'small' | 'default'
  /**
   * @en row hover highlight
   * @cn 数据行鼠标悬浮高亮效果
   * @default true
   */
  hover?: boolean
  /**
   * @en height of table, same with style.height
   * @cn 表格高度，与 style.height 作用相同
   */
  height?: number
  /**
   * @en empty text
   * @cn 空数据文案
   * @default getLocale("Data not found")
   */
  empty?: ReactNode
  /**
   * @en When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.
   * @cn 数据加载中，为true时会展示一个默认的 [Spin](/components/Spin) 组件，可以传入一个自定义的Spin代替
   * @default false
   */
  loading?: boolean | ReactNode
  /**
   * @en vertical align with content
   * @cn 单元格内容垂直对齐方式
   * @default 'top'
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
  /**
   * @en Pass in the native tr td, using styles only
   * @cn 传入原生 tr td, 只使用样式
   */
  children?: ReactNode
  /**
   * @en TThe total width of the table, which defaults to the container width, must not be less than the sum of width set in columns
   * @cn 表格总宽度，默认为容器宽度，不可小于 columns 中设置的 width 之和
   */
  width?: number
  /**
   * @en Recalculate columns width while data change
   * @cn 数据发生变化后是否重新计算列宽
   * @default false
   */
  dataChangeResize?: boolean
  externalExpandRender?: (rowData: DataItem, index: number) => () => ReactNode
  /**
   * @en controlled expand rows
   * @cn 展开行受控
   */
  expandKeys?: KeygenResult[]
  /**
   * @cn 生成每一项key的辅助方法
   * 为函数时，使用此函数返回值
   * 为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id)
   * @en Generate a auxiliary method for each key
   * If not filled, index will be used (not recommended, in some cases there may be problems)
   * When it is a function, use its return value.
   * When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id .
   */
  keygen: StructKeygenType<DataItem>
  resetFixAuto: (is?: boolean) => boolean
  onTreeExpand: (data: DataItem, index: number) => void
  datum: ListDatum<DataItem, Value>
  /**
   * @en When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.
   * @cn 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   */
  disabled?: boolean | ((d: DataItem) => boolean)
  treeRoot?: boolean
  treeExpandLevel: Map<KeygenResult, number>
  treeIndent: number
  /**
   * @en show expand button while children data is empty
   * @cn 树形表格子数据为空时依然展示展开按钮
   * @default false
   */
  treeEmptyExpand?: boolean
  /**
   * @en Sets the attribute of inner element to trigger onRowClick as needed, and '*' to accept the row click
   * @cn 设置行内元素的 attribute 来按需触发 onRowClick, '*'表示接受行点击触发
   * @default ['*']
   */
  rowClickAttr?: string[] | string | boolean
  /**
   * @en Callback when row click. data: current row data; index: current row index
   * @cn 行点击事件; data: 当前行数据; index: 当前行索引
   */
  onRowClick?: (rowData: DataItem, index: number, fireAttr?: string | boolean) => void
  externalExpandClick?: (rowData: DataItem, expanded: boolean) => void
  /**
   * @en Whether to display zebra shading.
   * @cn 是否显示交错斑马底纹
   */
  striped?: boolean
  /**
   * @en Specify row className
   * @cn 指定单行className
   * @override (rowData: DataItem, index: number) => string | undefined
   */
  rowClassName?: (rowData: DataItem, index: number) => string | undefined
  treeExpandKeys?: Map<KeygenResult, boolean>
  /**
   * @en tr events
   * @cn tr 事件监听器集合
   * @override object
   */
  rowEvents?: ObjectType
  columns: ColumnItemWithFixed<DataItem>[]
  /**
   * @en data
   * @cn 数据
   * @override object[]
   */
  data: DataItem[]
  onSortChange: (
    finalOrder: ColumnOrder | undefined,
    sorter: ColumnItem<DataItem>['sorter'],
    keyStr: number | string,
    cancelOrder: ColumnOrder,
    // 是否是自动触发
    manual: boolean
  ) => void
  sorter: SorterState<DataItem>[]
  /**
   * @en Whether to show being fully selected.
   * @cn 是否显示全选
   * @default true
   */
  showSelectAll?: boolean
  /**
   * @en Whether to display the border
   * @cn 是否显示外边框
   * @default false
   */
  bordered?: boolean
  /**
   * @en Set columnResizable to true to make all columns scalable
   * @cn 设置 columnResizable 为 true，使所有列可伸缩
   */
  columnResizable?: boolean
  treeColumnsName?: ObjectKey<DataItem>
  /**
   * @en check children data while select all
   * @cn 全选时是否将子孙数据选中
   * @default false
   */
  treeCheckAll?: boolean
  /**
   * @en customize sort icons
   * @cn 自定义排序图标
   */
  renderSorter?: (params: RenderSorterParam) => ReactNode
  /**
   * @en whether hide thead
   * @cn 是否隐藏表头
   * @default false
   */
  hideHeader?: boolean
  /**
   * @en Footer information can be used to summarize
   * @cn 底部信息可用于总结
   */
  summary?: SummaryItem[][] | SummaryItem[]
  /**
   * @en
   * @cn
   */
  onResize?: (index: number, width: number, colgroup?: number[]) => void
  /**
   * @en sticky header, When it is true, the distance from the top is 0. When it is an object, the attribute value reference [Sticky component](/components/Sticky)
   * @cn 表头是否附着顶部，为 true 时距离顶部为0，为对象时属性值参考 [Sticky](/components/Sticky) 组件
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
  rowsInView: number
  /**
   * @en The expected height of a one-line table is just a rough estimate to show the scroll bar.
   * @cn 单行表格的预期高度，只是一个大概的估值，用来展示滚动条
   * @default 40
   */
  rowHeight?: number
  /**
   * @en The callback function after scrolling.\nx: Horizontal rolling ratio(0 <= x <= 1)\ny: Vertical scroll ratio(0 <= y <= 1)
   * @cn 滚动条滚动后回调函数；\nx: 横向滚动比(0 <= x <= 1)\ny: 纵向滚动比(0 <= y <= 1)
   */
  onScroll?: (x: number, y: number, left: number) => void
  /**
   * @en which takes effect when the virtual list is enabled
   * @cn 当开启虚拟列表时生效
   */
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
   * @default "无"
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
  ignoreBorderRight?: boolean
}

/** ------ thead ---------- */
export interface TheadProps<DataItem, Value> extends SimpleTableProps<DataItem, Value> {
  colgroup?: number[]
  onColChange: SimpleTableProps<DataItem, Value>['onResize']
}
export interface SorterState<DataItem> {
  order: ColumnOrder | undefined
  key: number
  manual: boolean
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
  keyStr: string | number
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
export type GetResizeProps<Props, DataItem> = Omit<Props, 'onResize'> & {
  /**
   * @en columns resize callback
   * @cn 列宽伸缩后的回调
   * @override  (columns: TableColumn[]) => void
   */
  onColumnResize?: (columns: ColumnItem<DataItem>[]) => void
}

/** ------ radio ---------- */
export type GetRadioProps<Props> = Omit<Props, 'distinct' | 'limit'> & {
  /**
   * @en is Radio
   * @cn 是否为单选
   * @default false
   */
  radio?: boolean
}

/** ------ fixAuto ---------- */
export type GetFixAutoProps<Props> = {
  /**
   * @en visual scroll-bar direction, empty will use native scroll-bar and disabled lazy load
   * @cn 虚拟滚动条方向设置，不设置则使用原生滚动条且关闭懒加载
   */
  fixed?: TableFix | 'auto'
} & Omit<Props, 'fixed' | 'limit' | 'bindWrapper' | 'resetFixAuto'>

/** ------ Select ---------- */
export type GetSelectProps<Props> = Omit<Props, 'events'> & {
  /**
   *  @inner 废弃属性， 使用 cellSelectable 替换
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
   * @en When treeExpandKeys is set, the callback is triggered when the row is expanded. Keys is expanded row key
   * @cn 当设置 treeExpandKeys 后，展开行时会触发该回调，keys 为展开的行
   */
  onTreeExpand?: (openKeys: KeygenResult[], data: DataItem, expand: boolean, index: number) => void
  /**
   * @en Tree Table expanded row keys
   * @cn 树形数据展开行，受控
   */
  treeExpandKeys?: KeygenResult[]
}

/**
 * @title TableColumn
 */
export interface ColumnItem<DataItem> {
  /**
   * @en cell align
   * @cn 单元格内容排布方式
   * @default 'left'
   * @override union
   */
  align?: RegularAttributes.Align

  /**
   * @en The function for controlling to merge columns. The return value is an integer indicating the number of columns that need to be merged。
   * @cn 合并列控制函数，row为单行数据，返回值一个整数，标明需要合并的列数
   */
  colSpan?: (row: DataItem, index: number) => number

  /**
   * @en default sort
   * @cn 默认排序规则
   */
  defaultOrder?: ColumnOrder

  /**
   * @en Fixed columns. If multiple adjacent columns need to be locked, specify only the outermost column
   * @cn 固定列,如果相邻的多列需要锁定，只需指定最外侧的 column 即可
   */
  fixed?: ColumnFix

  /**
   * @en The group of header column.
   * @cn 表头分组，相邻的相同 group 会生成一个新的表头
   */
  group?: string | ReactNode | Array<string | ReactNode>

  /**
   * @en hide the column, only work on row-expand column
   * @cn 只针对行展开列有效，表示是否隐藏该列
   */
  hide?: boolean

  /**
   * @en The key of the column
   * @cn 列的key，默认使用 index
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
   * @en Select All to screen data. Valid only if type="checkbox"
   * @cn 全选时用来筛除数据，仅当 type="checkbox" 时有效
   */
  filterAll?: (data: DataItem[]) => DataItem[]

  /**
   * @en The generation function for Table content.d: the data of the current row. i: the index of the current row .For ease of use, you can pass in the key of a data, such as 'id', which is equivalent to (d) => { return d.id }
   * @cn 表格内容生成函数，返回渲染的内容,  data 当前行的数据，index 当前索引，instance 当 type="checkbox" 时会传入 Checkbox 实例
   * 为了使用方便，可以传入一个数据的key，如 'id'，相当于 (d) => { return d.id }
   * @override ObjectKey<DataItem> | function(d, id, instance)
   */
  render?: ObjectKey<DataItem> | ColumnRenderFunc<DataItem>

  /**
   * @en According to the result (boolean) returned by the function to determine whether to merge rows, a and b are two adjacent rows of data
   * @cn 根据函数返回的结果（boolean）判断是否合并行，a、b为相邻的两行数据。
   */
  rowSpan?: ((prevRowData: DataItem, nextRowData: DataItem) => boolean) | boolean

  /**
   * @en When the sorter is not empty, the sort icon appears in this column. the value of order: ['asc', 'desc']
   * Indicate the sort key string, will pass to table sorter method.
   * Front-end sorting returns a sort function, refer to Array.sort.
   * Server-side sorting, do not return values and handle it itself.
   *
   * @cn sorter 不为空时，这一列会出现排序 icon。order的值为['asc', 'desc']
   * 字符串表示排序依据字段，作为第一个参数传入Table.sorter
   * 为 Sorter 对象
   * 前端排序，返回一个排序函数，参考 Array.sort。(旧用法)
   * 服务端排序，不要返回值，自行处理即可。(旧用法)
   */
  sorter?: ((order: ColumnOrder) => ((prevRowData: DataItem, nextRowData: DataItem) => number) | void) | string | Sorter

  /**
   * @en The content of the header
   * @cn 表头显示内容
   */
  title?: string | ReactNode | ((rowData: DataItem[]) => ReactNode)

  /**
   * @en tree table children-data name
   * @cn 树形表格子数据字段名
   */
  treeColumnsName?: ObjectKey<DataItem>

  /**
   * @en indent of each level
   * @cn 每一层缩进宽度
   * @default 25
   */
  treeIndent?: number

  /**
   * @en Special column
   * expand: Expand the column. When the render function returns a function, it means that the row can be expanded and the content  is the result returned by this function.
   * row-expand: Similar to expand. The difference is that clicking on the entire row triggers the expand event.
   * checkbox: Select column for scenes with only fixed selection columns
   *
   * @cn 特殊用途列
   * expand: 行展开列，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果。
   * row-expand: 同 expand。不同为点击行内空白区域也可以折叠/展开行。
   * checkbox: 选择列，仅用于固定选择列的场景
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
  onClick?: (d: DataItem, isExpand: boolean) => void

  /**
   * @cn 单独设置某一列不可拖动
   * @en Separately set a column not to be draggable
   */
  columnResizable?: false
}
