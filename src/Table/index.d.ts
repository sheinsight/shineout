/* eslint-disable import/named */
import * as React from 'react'
import { StickyProps } from '../Sticky'
import { PaginationProps } from '../Pagination'
import { ListItemStandardProps, StandardProps,  RegularAttributes, keyType } from '../@types/common'


type ReactNode = React.ReactNode;

type TableRowData = string | {}

type ColumnOrder = 'asc' | 'desc'

export interface ColumnItem<T> {
  /**
   * cell align \['left', 'center', 'right'\]
   * 
   * 单元格内容排布方式，可选 \['left', 'center', 'right'\]
   * 
   * default: 'left'
   */
  align?: RegularAttributes.Align,

  /**
   * The function for controlling to merge columns. The return value is an integer indicating the number of columns that need to be merged。
   * 
   * 合并列控制函数，row为单行数据，返回值一个整数，标明需要合并的列数
   * 
   * default: none
   */
  colSpan?: (row: T) => number,

  /**
   * default sort
   * 
   * 默认排序规则
   * 
   * default: none
   */
  defaultOrder?: ColumnOrder,

  /**
   * options: \['left', 'right']；Need to set the Table's fixed to 'x' or 'both'
   * 
   * 可选\['left', 'right']；需要设置Table的fixed为'x'或'both'才生效；如果相邻的多列需要锁定，只需指定最外侧的column即可
   * 
   * default: none
   */
  fixed?: 'left' | 'right',

  /**
   * The group of header column.
   * 
   * 表头分组，相邻的相同 group 会生成一个新的表头
   * 
   * default: none
   */
  group?: string | Array<string>,

  /**
   * hide the column, only work on row-expand column
   * 
   * 只针对行展开列有效，表示是否隐藏该列
   * 
   * default: none
   */
  hide?: boolean,

  /**
   * The key of the column
   * 
   * 列的key，默认使用index
   * 
   * default: none
   */
  key?: string | number,

  /**
   * min width
   * 
   * 最小列宽
   * 
   * default: none
   */
  minWidth?: number,

  /**
   * The generation function for Table content.d: the data of the current row. i: the index of the current row .For ease of use, you can pass in the key of a data, such as 'id', which is equivalent to (d) => { return d.id }
   * 
   * 表格内容生成函数；d: 当前行数据i: 当前行索引为了使用方便，可以传入一个数据的key，如 'id'，相当于 (d) => { return d.id }
   * 
   * default: none
   */
  render: string | ((rowData: T, index: number) => ReactNode),

  /**
   * 
   * 
   * 根据函数返回的结果（boolean）判断是否合并行，a、b为相邻的两行数据。
   * 
   * default: none
   */
  rowSpan?: (prevRowData: T, nextRowData: T) => boolean,

  /**
   * When the sorter is not empty, the sort icon appears in this column. the value of order: \['asc', 'desc']. Indicate the sort key string, will pass to table sorter method. Front-end sorting returns a sort function, refer to Array.sort. Server-side sorting, do not return values and handle it itself.
   * 
   * sorter 不为空时，这一列会出现排序 icon。order的值为\['asc', 'desc']。字符串表示排序依据字段，作为第一个参数传入Table.sorter。前端排序，返回一个排序函数，参考 Array.sort。服务端排序，不要返回值，自行处理即可。
   * 
   * default: none
   */
  sorter?: ((order: ColumnOrder) => (prevRowData: T, nextRowData: T) => boolean) | string,

  /**
   * The content of the header 
   * 
   * 表头显示内容
   * 
   * default: none
   */
  title?: string | ReactNode | ((rowData: T) => ReactNode),
  
  /**
   * tree table children-data name
   * 
   * 树形表格子数据字段名
   * 
   * default: none
   */
  treeColumnsName?: string,

  /**
   * indent of each level
   * 
   * 每一层缩进宽度
   * 
   * default: none
   */
  treeIndent?: number,

  /**
   * Special column, options: \['expand', 'row-expand', 'checkbox'].expand: Expand the column. When the render function returns a function, it means that the row can be expanded and the content  is the result returned by this function. row-expand: Similar to expand. The difference is that clicking on the entire row triggers the expand event. checkbox: Select column for scenes with only fixed selection columns
   * 
   * 特殊用途列，可选值为 \['expand', 'row-expand', 'checkbox']。expand: 行展开列，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果。row-expand: 同expand。不同为点击行内空白区域也可以折叠/展开行。checkbox: 选择列，用于仅固定选择列的场景
   * 
   * default: none
   */
  type?: 'expand' | 'row-expand' | 'checkbox',

  /**
   * width
   * 
   * 列宽
   * 
   * default: none
   */
  width?: number,
}

export interface RowEvents {
  [propName: string]: any
}


export interface TableRef {
  scrollToIndex: (index: number, cb?: Function) => void;
  [key: string]: any;
}

export interface TableProps<Value, TRD> extends StandardProps, ListItemStandardProps<Value, TRD> {

  /**
   * Whether to display the border
   * 
   * 是否显示外边框
   * 
   * default: false
   */
  bordered?: boolean;

  /**
   * array，见 TableColumn
   * 
   * 数组，见 TableColumn
   * 
   * default: -
   */
  columns: ColumnItem<TRD>[];

  /**
   * data
   * 
   * 数据
   * 
   * default: -
   */
  data?: TRD[];

  /**
   * visual scroll-bar direction, empty will use native scroll-bar and disabled lazy load
   * 
   * 虚拟滚动条方向设置，不设置则使用原生滚动条且关闭懒加载
   * 
   * default: -
   */
  fixed?: 'both' | 'x' | 'y' | 'auto';

  /**
   * When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.
   * 
   * 数据加载中，为true时会展示一个默认的[Spin](/components/Spin)组件，可以传入一个自定义的Spin代替
   * 
   * default: false
   */
  loading?: boolean | ReactNode;

  /**
   * The callback function after scrolling. x: Horizontal rolling ratio(0 <= x <= 1)。y: Vertical scroll ratio(0 <= y <= 1)
   * 
   * 滚动条滚动后回调函数；x: 横向滚动比(0 <= x <= 1)。 y: 纵向滚动比(0 <= y <= 1)
   * 
   * default: none
   */
  onScroll?: (x: number, y: number) => void;

  /**
   * Callback when row click.data: current row data. index: current row index
   * 
   * 行点击事件; data: 当前行数据index: 当前行索引
   * 
   * default: none
   */
  onRowClick?: (data: TRD, index: number) => void;

  /**
   * Select row. Rows is the selected data.
   * 
   * 选择行。rows为选中的数据。如果需要数据需要格式化的处理，建议配置 format 和 prediction
   * 
   * default: none
   */
  onRowSelect?: (rows: TRD) => void;


  /**
   * Specify row className
   * 
   * 指定单行className
   * 
   * default: -
   */
  rowClassName?: (record: TRD, index: number) => string;

  /**
   * The expected height of a one-line table is just a rough estimate to show the scroll bar.
   * 
   * 单行表格的预期高度，只是一个大概的估值，用来展示滚动条
   * 
   * default: 40
   */
  rowHeight?: number;

  /**
   * The maximum number of rows for a single render. Table uses lazy render to optimize performance under large amounts of data. If your table displays more than 20 rows, you can change the value of rowsInView. Value of 0 render all data.
   * 
   * 单次render的最大行数。Table 采用了lazy render的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了20条，可以调整rowsInView的值。为 0 表示单次 render 所有数据。
   * 
   * default: 20
   */
  rowsInView?: number;

  /**
   * Whether to show being fully selected.
   * 
   * 是否显示全选
   * 
   * default: true
   */
  showSelectAll?: boolean;

  /**
   * Whether to display zebra shading.
   * 
   * 是否显示交错斑马底纹
   * 
   * default: false
   */
  striped?: boolean;

  /**
   * The current selected value.
   * 
   * 当前选中值，格式和 onRowSelect 返回值一致
   * 
   * default: none
   */
  value?: Value[];

  /**
   * empty text
   * 
   * 空数据文案
   * 
   * default: Data not found
   */
  empty?: string | ReactNode;

  /**
   * vertical align with content
   * 
   * 单元格内容垂直对齐方式
   * 
   * default: 'top'
   */
  verticalAlign?: 'top' | 'middle';

  /**
   * Sets the attribute of inner element to trigger onRowClick as needed, and '*' to accept the row click
   * 
   * 设置行内元素的attribut来按需触发onRowClick, '*'表示接受行点击触发
   * 
   * default: ['*'\]
   */
  rowClickAttr?: string | string[];

  /**
   * the method of table sort，args are Column.sorter and order. Multi-column sorting is supported. The sorter passes in the object {rule: string | function, weight: number}, where rule is a sorting rule, which refers to the use of single-column sorting when it is a string, weight is the weight, indicating the priority of the order. When sorting on multiple columns, sortedList returns information about all fields involved in sorting
   * 
   * 表格统一排序函数，参数分别为 Column.sorter 和 排序方式; 支持多列排序，sorter传入对象{ rule: string \| function, weight: number }, rule为排序规则，为字符串时参考单列排序的用法, weight为权重，指明排序的优先级。 多列排序时，sortedList返回所有参与排序的字段信息
   * 
   * default: alphaSort(Column.sorter, sorter)
   */
  sorter?: (sortKey: keyType, sorter: 'asc' | 'desc', sortedList: any[]) => (a: TRD, b: TRD) => boolean;

  /**
   * Tree Table expanded row keys
   * 
   * 树形数据展开行，受控
   * 
   * default: none
   */
  treeExpandKeys?: keyType[];

  /**
   * expand row change, keys is expanded row keys
   * 
   * 展开行，keys为展开的行
   * 
   * default: none
   */
  onTreeExpand?: (openKeys: string[], data: TRD, expand: boolean) => void;

  /**
   * row hover highlight
   * 
   * 数据行鼠标悬浮高亮效果
   * 
   * default: true
   */
  hover?: boolean;

  /**
   * show expand button while children data is empty
   * 
   * 树形表格子数据为空时依然展示展开按钮
   * 
   * default: false
   */
  treeEmptyExpand?: boolean;

  /**
   * check children data while select all
   * 
   * 全选时是否将子孙数据选中
   * 
   * default: false
   */
  treeCheckAll?: boolean;

  /**
   * sort cancel event
   * 
   * 排序取消事件
   * 
   * default: none
   */
  onSortCancel?: (prevType: ColumnOrder, index: number, orders: any, sort: any) => void;

  /**
   * is Radio
   * 
   * 是否单选
   * 
   * default: false
   */
  radio?: boolean;

  /**
   * tr events
   * 
   * tr 事件监听器集合
   * 
   * default: none
   */
  rowEvents?: RowEvents;

  /**
   * Default expanded row keys
   * 
   * 默认展开行(非受控)
   * 
   * default: none
   */
  defaultTreeExpandKeys?: keyType[];

  /**
   * Whether to recalculate the column width after the data changes
   * 
   * 数据发生变化后是否重新计算列宽
   * 
   * default: false
   */
  dataChangeResize?: boolean;

  /**
   * columns resize callback
   * 
   * 列宽伸缩后的回调
   * 
   * default: none
   */
  onColumnResize?: (newColumns: ColumnItem<TRD>[]) => void;

  /**
   * size of table
   * 
   * 表格尺寸
   * 
   * default: 'normal'
   */
  size?: 'small' | 'normal';

  /**
   * pagination of table
   * 
   * 分页数据
   * 
   * default: none
   */
  pagination?: PaginationProps;

  /**
   * set inner scrollable element's attribute
   * 
   * 虚拟滚动模式下，设置行内元素的 attribut 来实现内部滚动
   * 
   * default: 无
   */
  innerScrollAttr?: string[];

  /**
   * controlled expand rows
   * 
   * 展开行受控
   * 
   * default: none
   */
  expandKeys?: keyType[];

  /**
   * sticky header, When it is true, the distance from the top is 0. When it is an object, the attribute value reference [Sticky component] (/components/Sticky)
   * 
   * 表头是否附着顶部，为 true 时距离顶部为0，为对象时属性值参考 [Sticky组件](/components/Sticky)
   * 
   * default: none
   */
  sticky?: boolean | StickyProps;

  /**
   * In non Firefox browsers, whether to enable ctrl/cmd + click check
   * 
   * 非 Firefox 浏览器下，是否启用 ctrl/cmd + click 选中
   * 
   * default: false
   */
  selection?: boolean;

  /**
   * Table instance (please use with caution: only fixed Table)
   * 
   * Table 实例（请谨慎使用：仅固定表格）
   * 
   * default: none
   */
  tableRef?: (table: TableRef) => void
}

declare class Table<Value = any, TRD = TableRowData> extends React.Component<TableProps<Value, TRD>, {}> {
  render(): JSX.Element;
}

export default Table
