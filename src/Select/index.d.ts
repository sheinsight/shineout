import * as React from 'react'
import { StandardProps, RegularAttributes, StructDataStandardProps, FormItemStandardProps, ListItemStandardProps, CommonProps } from '../@types/common'

type ReactNode = React.ReactNode;
type ReactElement = React.ReactElement;

export interface SelectProps<Item, Value> extends
  StandardProps,
  FormItemStandardProps<Value>,
  StructDataStandardProps<Item>,
  ListItemStandardProps<Item, Value>,
  Pick<CommonProps, 'absolute' | 'clearable' | 'zIndex'> {
  /**
   * The maximum length of the input string in the Select input box
   *
   * Select 输入框输入字符串最大长度
   *
   * default:
   */
  maxLength?: number;

  /**
   * custom empty copy
   *
   * 自定义 empty 文案
   *
   * default:
   */
  emptyText?: ReactNode;

  /**
   * show border bottom
   *
   * 仅仅展示下边框
   *
   * default: false
   */
  underline?: boolean;

  /**
   * width
   *
   * 宽度
   *
   * default: 100%
   */
  width?: number;

  /**
   * width of option list
   *
   * 下拉列表宽度
   *
   * default: 100%
   */
  optionWidth?: number;

  /**
   * expand option list while enter press
   *
   * 回车触发下拉框展开的时候调用
   *
   * default: -
   */
  onEnterExpand?: (e: Event) => boolean;

  /**
   * height
   *
   * 高度
   *
   * default: 250
   */
  height?: number;

  /**
   * The position of the pop-up layer, options: ['left', 'top', 'right', 'bottom']
   *
   * 弹出层位置
   *
   * default: auto
   */
  position?: 'drop-down' | 'drop-up';

  /**
   * When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.
   *
   * 数据加载中，为true时会展示一个默认的[Spin](/components/Spin)组件，可以传入一个自定义的Spin代替
   *
   * default: false
   */
  loading?: boolean | ReactNode;

  /**
   * Option height. List items are rendered using virtual lists, and when the option height changes, the correct height should be specified via lineHeight
   *
   * 选项高度。列表项使用虚拟列表渲染，当选项高度改变时，应该通过 lineHeight 来指定正确高度
   *
   * default: 34
   */
  lineHeight?: number;

  /**
   * size of select
   *
   * 尺寸
   *
   * default: 'default'
   */
  size?: RegularAttributes.Size;

  /**
   * When trim is true, blank characters are automatically deleted when lose focus。
   *
   * trim 为 true 时，失去焦点时会自动删除空白字符。
   *
   * default: false
   */
  trim?: boolean;

  /**
   * option list is auto adapt
   *
   * 下拉列表宽度根据内容自由展开
   *
   * default: false
   */
  autoAdapt?: boolean;

  /**
   * if it is true, it will be multiple selection
   *
   * 是否是多选
   *
   * default: false
   */
  multiple?: boolean;

  /**
   * Option columns.
   *
   * default: 1
   */
  columns?: number;

  /**
   * Option column width, only effective when columns > 1
   *
   * columns 大于 1 时，选项展示为多列布局模式
   *
   * default: 160
   */
  columnWidth?: number;

  /**
   * tree select data，[{children: []}]
   *
   * 树形结构数据项，[{children: []}]
   *
   * default: -
   */
  treeData?: Item[];

  /**
   * ms. The delay of user input triggering filter events
   *
   * 毫秒。用户输入触发 fitler 事件的延时
   *
   * default: 400
   */
  filterDelay?: number;

  /**
   * value is the datum.getValue().
   *
   * 值发生改变时触发
   *
   * default: -
   */
  onChange?: (value: Value, data: Item, checked: boolean) => void;

  /**
   * If the onCreate event is set, the component is inputable. When onCreate is a function, the return value of this function is diaplay at the top as a new option. When onCreate is true, use the built-in functuon text => text.
   *
   * 如果设置了 onCreate 事件，组件为可输入状态。onCreate为函数时，将此函数返回值作为新的选项拆入最上方。onCreate为true时，使用默认函数 text => text
   *
   * default: -
   */
  onCreate?: ((input: string | Item) => Item | string) | boolean;

  /**
   * When the onFilter is not empty, you can filter data by input. If the onFilter returns a function, use this function as a front-end filter. If return undefined, you can do your own backend filtering.
   *
   * onFilter 不为空时，可以输入过滤数据。onFilter 如果返回一个函数，使用这个函数做前端过滤。如果不返回，可以自行做后端过滤
   *
   * default: -
   */
  onFilter?: (text: string, from: string) => (((data: Item) => boolean) | void);


  /**
   * Use the onAdvancedFilter property to enable filtering to switch between filtering results and raw data for the current hierarchy.
   *
   * 使用 onAdvancedFilter 属性开启高级筛选，可针对当前层级在筛选结果和原始数据间切换
   *
   * default: -
   */
  onAdvancedFilter?: (text: string) => ((data: Item) => boolean) | void;


  /**
   * Merges selected values, valid only in multiselect mode
   *
   * 将选中值合并，只在多选模式下有效
   *
   *  default: false
   */
  compressed?: boolean | 'no-repeat';

  /**
   * group by
   *
   * 分组
   *
   * default: -
   */
  groupBy?: (record: Item, index: number, data: Item[]) => any;

  /**
   * blur to select the data when filter data has only single. only work in filter.
   *
   * 当筛选数据仅为一条时，失焦后直接选中该条数据。仅在 Filter 下有效。
   *
   * default: false
   */
  filterSingleSelect?: boolean;

  /**
   * set with multiple, value will separator by this
   *
   * 多选情况下设置后，value 会处理为 separator 分隔的字符串。
   *
   * default: none
   */
  separator?: string;

  /**
   * treeData，the key of the children data name
   *
   * 树形数据下，指定子数据的属性名
   *
   * default: 'children'
   */
  childrenKey?: string;

  /**
   * expand all node, only in can be use in treeData
   *
   * 默认展开全部子节点, 仅树形数据下有效
   *
   * default: false
   */
  defaultExpandAll?: boolean;

  /**
   * the way to render not matched data value
   * 
   * 渲染未匹配值的方式
   *
   * default: none
   */
  renderUnmatched?: (data: Item) => ReactNode;

  /**
   * empty input after select value
   *
   * 选中后是否清空输入框内容
   *
   * default: false
   */
  emptyAfterSelect?: boolean;

  /**
   * show dropdown arrow, only single select
   *
   * 是否显示下拉箭头，仅针对单选情况
   *
   * default: true
   */
  showArrow?: boolean;

  /**
   * Whether to show the descendant nodes of the hit node after filtering
   *
   * 筛选后是否展示命中节点的后代节点
   *
   * default: false
   */
  showHitDescendants?: boolean;

  /**
   * selected value while click under onCreate or onFilter
   *
   * onCreate 或 onFilter 在单选情况下单击值后是否选中值
   *
   * default: true
   */
  focusSelected?: boolean;

  /**
   * data cache, if data change asynchronously, better set true
   *
   * 是否开启数据缓存，如果数据存在动态更新的情况建议开启
   *
   * default: false
   */
  noCache?: boolean;

  /**
   * compressed popover classname
   *
   * 多选合并展示弹出框的类名
   *
   * default: none
   */
  compressedClassName?: string;

  /**
   * option list collapse callback
   *
   * 下拉列表展开/收起回调
   *
   * default: none
   */
  onCollapse?: (collapse: boolean) => void;

  /**
   * The className of the selected result content container
   *
   * 选中结果内容容器的className
   *
   * default: none
   */
  resultClassName?: ((value: Item) => string) | string;

  /**
   * title of columns multiple select
   *
   * 多列选项多选时的标题文字
   *
   * default: none
   */
  columnsTitle?: ReactNode;

  /**
   * There are onFilter and onCreate, select Option, automatically focus Input
   *
   * 存在onFilter和onCreate，选中 Option，自动focus Input
   *
   * default: false
   */
  reFocus?: boolean;

  /**
   * Custom render option list header
   *
   * 自定义渲染 Option List Header
   *
   * default: null
   */
  header?: ReactElement;

  /**
   * hide the creat option while set onCreate
   *
   * 在使用创建选项时，在选项列表中隐藏该选项，回车后直接选中
   *
   * default: false
   */
  hideCreateOption?: boolean;

  /**
   * inner title
   *
   * 内嵌标题
   *
   * default: -
   */
  innerTitle?: ReactNode;

  /**
   * when compressed is True,the comptessedBound can limit the numbers of multiple selected item's label
   *
   * 开启多选后，指定允许展示标签数量，超过后将折叠
   *
   * default: -
   */
   compressedBound?: number;

  /**
   * The maximum number of rows for a single render. Select uses lazy render to optimize performance under large amounts of data. If your table displays more than 10 rows, you can change the value of itemsInView.
   *
   * 单次render的最大行数。Select 采用了lazy render的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了10条，可以调整itemsInView
   *
   * default: 10
   */
   itemsInView?: number;

  /**
   * 用来转化粘贴文本中的换行
   *
   * Used to convert line breaks in pasted text
   *
   * default: ","
   */
  convertBr?: string | ((text: string) => string);

  /**
   * 自定义渲染下拉列表
   *
   * Custom render dropdown
   *
   * default: -
   */
  renderOptionList?: (list: ReactElement, info: {loading: boolean})=> ReactElement;
  [key: string]: any
}

declare class Select<Item = any, Value = any> extends React.Component<SelectProps<Item, Value>, {}> {
  render(): JSX.Element
}

export default Select
