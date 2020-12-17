import * as React from 'react';
import { StickyProps } from '../Sticky'
import { PaginationProps } from '../Pagination'

type ReactNode = React.ReactNode;

type TableRowData = string | {}

type TableData<T = TableRowData> = Array<T>

type ColumnOrder = 'asc' | 'desc'

export interface ColumnItem<T> {

  align?: 'left' | 'center' | 'right',

  colSpan?: (row: T) => number,

  defaultOrder?: ColumnOrder,

  fixed?: 'left' | 'right',

  group?: string | Array<string>,

  hide?: boolean,

  key?: string | number,

  minWidth?: number,

  render: string | ((rowData: T, index: number) => ReactNode),

  rowSpan?: (prevRowData: T, nextRowData: T) => boolean,

  sorter?: ((order: ColumnOrder) => (prevRowData: T, nextRowData: T) => boolean) | string,

  title?: string | ReactNode | ((rowData: T) => ReactNode),

  treeColumnsName?: string,

  treeIndent?: number,

  type?: 'expand' | 'row-expand' | 'checkbox',

  width?: number,
}

export interface RowEvents {
  [propName: string]: any
}

type TableColumns<T = TableData> = Array<ColumnItem>

declare class Table extends React.Component<TableProps, {}> {

  render(): JSX.Element;
}

export interface TableProps {

  /**
   * Whether to display the border
   * 是否显示外边框
   * default: false
   */
  bordered?: boolean;

  /**
   * extend className
   * 扩展className
   * default: -
   */
  className?: string;

  /**
   * array，见 TableColumn
   * 数组，见 TableColumn
   * default: -
   */
  columns: TableColumns;

  /**
   * data
   * 数据
   * default: -
   */
  data?: TableData;

  /**
   * When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.
   * 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * default: false
   */
  disabled?: ((data: TableRowData) => boolean) | boolean;

  /**
   * visual scroll-bar direction, empty will use native scroll-bar and disabled lazy load
   * 虚拟滚动条方向设置，不设置则使用原生滚动条且关闭懒加载
   * default: -
   */
  fixed?: 'both' | 'x' | 'y' | 'auto';

  /**
   * Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d[format]. When it is a function, use its return value.
   * 格式化 value。默认值，返回原始数据。为string时，会作为key从原始数据中获取值，相当于 (d) => d[format]。 为函数时，以函数返回结果作为 value
   * default: d => d
   */
  format?: ((data: TableRowData) => any) | string;

  /**
   * When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.
   * 数据加载中，为true时会展示一个默认的[Spin](/components/Spin)组件，可以传入一个自定义的Spin代替
   * default: false
   */
  loading?: boolean | ReactNode;

  /**
   * Generate a auxiliary method for each key. If not filled, index will be used (not recommended, in some cases there may be problems). When it is a function, use its return value. When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id .
   * 生成每一项key的辅助方法。 为 true 时，以数据项本身作为key，相当于 (d => d)。 为函数时，使用此函数返回值。 为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id)
   * default: index
   */
  keygen?: ((data: TableRowData) => any) | string | boolean;

  /**
   * The callback function after scrolling. x: Horizontal rolling ratio(0 <= x <= 1)。y: Vertical scroll ratio(0 <= y <= 1)
   * 滚动条滚动后回调函数；x: 横向滚动比(0 <= x <= 1)。 y: 纵向滚动比(0 <= y <= 1)
   * default: none
   */
  onScroll?: (x: number, y: number) => void;

  /**
   * Callback when row click.data: current row data. index: current row index
   * 行点击事件; data: 当前行数据index: 当前行索引
   * default: none
   */
  onRowClick?: (data: TableRowData, index: number) => void;

  /**
   * Select row. Rows is the selected data.
   * 选择行。rows为选中的数据。如果需要数据需要格式化的处理，建议配置 format 和 prediction
   * default: none
   */
  onRowSelect?: (rows: TableData) => void;

  /**
   * By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match
   * (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配
   * default: (val, d) => val===format(d)
   */
  prediction?: (v: any, data: TableRowData) => boolean;

  /**
   * Specify row className
   * 指定单行className
   * default: -
   */
  rowClassName?: (record: TableRowData, index: number) => string;

  /**
   * The expected height of a one-line table is just a rough estimate to show the scroll bar.
   * 单行表格的预期高度，只是一个大概的估值，用来展示滚动条
   * default: 40
   */
  rowHeight?: number;

  /**
   * The maximum number of rows for a single render. Table uses lazy render to optimize performance under large amounts of data. If your table displays more than 20 rows, you can change the value of rowsInView. Value of 0 render all data.
   * 单次render的最大行数。Table 采用了lazy render的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了20条，可以调整rowsInView的值。为 0 表示单次 render 所有数据。
   * default: 20
   */
  rowsInView?: number;

  /**
   * Whether to show being fully selected.
   * 是否显示全选
   * default: true
   */
  showSelectAll?: boolean;

  /**
   * Whether to display zebra shading.
   * 是否显示交错斑马底纹
   * default: false
   */
  striped?: boolean;

  /**
   * Container element style
   * 扩展样式
   * default: -
   */
  style?: React.CSSProperties;

  /**
   * The current selected value.
   * 当前选中值，格式和 onRowSelect 返回值一致
   * default: none
   */
  value?: any[];

  /**
   * empty text
   * 空数据文案
   * default: Data not found
   */
  empty?: string | ReactNode;

  /**
   * vertical align with content
   * 单元格内容垂直对齐方式
   * default: 'top'
   */
  verticalAlign?: 'top' | 'middle';

  /**
   * Sets the attribute of inner element to trigger onRowClick as needed, and '*' to accept the row click
   * 设置行内元素的attribut来按需触发onRowClick, '*'表示接受行点击触发
   * default: ['*'\]
   */
  rowClickAttr?: string | string[];

  /**
   * the method of table sort，args are Column.sorter and order. Multi-column sorting is supported. The sorter passes in the object {rule: string | function, weight: number}, where rule is a sorting rule, which refers to the use of single-column sorting when it is a string, weight is the weight, indicating the priority of the order. When sorting on multiple columns, sortedList returns information about all fields involved in sorting
   * 表格统一排序函数，参数分别为 Column.sorter 和 排序方式; 支持多列排序，sorter传入对象{ rule: string \| function, weight: number }, rule为排序规则，为字符串时参考单列排序的用法, weight为权重，指明排序的优先级。 多列排序时，sortedList返回所有参与排序的字段信息
   * default: alphaSort(Column.sorter, sorter)
   */
  sorter?: (sortKey: any, sorter: 'asc' | 'desc', sortedList: any[]) => (a: TableRowData, b: TableRowData) => boolean;

  /**
   * Tree Table expanded row keys
   * 树形数据展开行，受控
   * default: none
   */
  treeExpandKeys?: any[];

  /**
   * expand row change, keys is expanded row keys
   * 展开行，keys为展开的行
   * default: none
   */
  onTreeExpand?: (openKeys: string[], data: TableRowData, expand: boolean) => void;

  /**
   * row hover highlight
   * 数据行鼠标悬浮高亮效果
   * default: true
   */
  hover?: boolean;

  /**
   * show expand button while children data is empty
   * 树形表格子数据为空时依然展示展开按钮
   * default: false
   */
  treeEmptyExpand?: boolean;

  /**
   * check children data while select all
   * 全选时是否将子孙数据选中
   * default: false
   */
  treeCheckAll?: boolean;

  /**
   * sort cancel event
   * 排序取消事件
   * default: none
   */
  onSortCancel?: (prevType: ColumnOrder, index: number, orders: any, sort: any) => void;

  /**
   * is Radio
   * 是否单选
   * default: false
   */
  radio?: boolean;

  /**
   * tr events
   * tr 事件监听器集合
   * default: none
   */
  rowEvents?: RowEvents;

  /**
   * Default expanded row keys
   * 默认展开行(非受控)
   * default: none
   */
  defaultTreeExpandKeys?: any[];

  /**
   * Whether to recalculate the column width after the data changes
   * 数据发生变化后是否重新计算列宽
   * default: false
   */
  dataChangeResize?: boolean;

  /**
   * columns resize callback
   * 列宽伸缩后的回调
   * default: none
   */
  onColumnResize?: (newColumns: TableColumns) => void;

  /**
   * size of table
   * 表格尺寸
   * default: 'normal'
   */
  size?: 'small' | 'normal';

  /**
   * pagination of table
   * 分页数据
   * default: none
   */
  pagination?: PaginationProps;

  /**
   * set inner scrollable element's attribute
   * 虚拟滚动模式下，设置行内元素的 attribut 来实现内部滚动
   * default: 无
   */
  innerScrollAttr?: string[];

  /**
   * controlled expand rows
   * 展开行受控
   * default: none
   */
  expandKeys?: any[];

  /**
   * sticky header, When it is true, the distance from the top is 0. When it is an object, the attribute value reference [Sticky component] (/components/Sticky)
   * 表头是否附着顶部，为 true 时距离顶部为0，为对象时属性值参考 [Sticky组件](/components/Sticky)
   * default: none
   */
  sticky?: boolean | StickyProps;

}

export default Table;
