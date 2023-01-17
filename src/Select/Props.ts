import * as React from 'react'
import { StandardProps, RegularAttributes, KeygenType, ValueItem, ResultItem, LiteralUnion } from '../@types/common'
import List from '../Datum/List'
import { GetTableConsumerProps } from '../Table/Props'
import { GetInputableProps, InputableProps } from '../Form/Props'
import { GetInputBorderProps } from '../hoc/Props'
import { GetDatumListProps } from '../Datum/Props'
import { AbsoluteProps } from '../AnimationList/Props'

type ReactNode = React.ReactNode
type ReactElement = React.ReactElement
export type Position = 'drop-down' | 'drop-up'

export interface BaseSelectProps<Item, Value>
  extends StandardProps,
    Pick<AbsoluteProps, 'absolute' | 'zIndex'>,
    Pick<InputableProps<Value>, 'formDatum'> {
  /**
   * If clearable is true, show clear value icon
   *
   * 是否可清除值
   *
   * default: false
   */
  clearable?: boolean
  /**
   * Option columns.
   *
   * default: 1
   */
  columns?: number

  /**
   * tree select data，[{children: []}]
   *
   * 树形结构数据项，[{children: []}]
   *
   * default: -
   */
  treeData?: Item[]

  /**
   * When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.
   *
   * 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   *
   * default: false
   */
  disabled?: ((data: Item) => boolean) | boolean

  /**
   * height
   *
   * 高度
   *
   * default: 250
   */
  height?: number

  /**
   * The maximum number of rows for a single render. Select uses lazy render to optimize performance under large amounts of data. If your table displays more than 10 rows, you can change the value of itemsInView.
   *
   * 单次render的最大行数。Select 采用了lazy render的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了10条，可以调整itemsInView
   *
   * default: 10
   */
  itemsInView?: number

  /**
   * Option height. List items are rendered using virtual lists, and when the option height changes, the correct height should be specified via lineHeight
   *
   * 选项高度。列表项使用虚拟列表渲染，当选项高度改变时，应该通过 lineHeight 来指定正确高度
   *
   * default: 34
   */
  lineHeight?: number

  /**
   * When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.
   *
   * 数据加载中，为true时会展示一个默认的[Spin](/components/Spin)组件，可以传入一个自定义的Spin代替
   *
   * default: false
   */
  loading?: boolean | ReactNode

  /**
   * if it is true, it will be multiple selection
   *
   * 是否是多选
   *
   * default: false
   */
  multiple?: boolean

  /**
   * If the onCreate event is set, the component is inputable. When onCreate is a function, the return value of this function is diaplay at the top as a new option. When onCreate is true, use the built-in functuon text => text.
   *
   * 如果设置了 onCreate 事件，组件为可输入状态。onCreate为函数时，将此函数返回值作为新的选项拆入最上方。onCreate为true时，使用默认函数 text => text
   *
   * default: -
   */
  onCreate?: ((input: string | Item) => Item | string) | boolean

  onFilter?: (text: string, from?: string) => void

  /**
   * The position of the pop-up layer, options: ['left', 'top', 'right', 'bottom']
   *
   * 弹出层位置
   *
   * default: auto
   */
  position?: Position

  /**
   * When it is a string, return d[string]. When it is a function, return the result of the function.
   *
   * 为 string 时，返回 d[string]。 为 function 时，返回函数结果
   *
   * default: -
   */
  renderItem?: ((data: Item, index?: number) => ReactNode) | LiteralUnion<Item>

  /**
   * size of select
   *
   * 尺寸
   *
   * default: 'default'
   */
  size?: RegularAttributes.Size

  /**
   * Merges selected values, valid only in multiselect mode
   *
   * 将选中值合并，只在多选模式下有效
   *
   *  default: false
   */
  compressed?: boolean | 'no-repeat'

  /**
   * when compressed is True,the comptessedBound can limit the numbers of multiple selected item's label
   *
   * 开启多选后，指定允许展示标签数量，超过后将折叠
   *
   * default: -
   */
  compressedBound?: number

  /**
   * When trim is true, blank characters are automatically deleted when lose focus。
   *
   * trim 为 true 时，失去焦点时会自动删除空白字符。
   *
   * default: false
   */
  trim?: boolean

  /**
   * option list is auto adapt
   *
   * 下拉列表宽度根据内容自由展开
   *
   * default: false
   */
  autoAdapt?: boolean

  /**
   * blur to select the data when filter data has only single. only work in filter.
   *
   * 当筛选数据仅为一条时，失焦后直接选中该条数据。仅在 Filter 下有效。
   *
   * default: false
   */
  filterSingleSelect?: boolean

  /**
   * the way to render not matched data value
   * 
   * 渲染未匹配值的方式
   *
   * default: none
   */
  renderUnmatched?: (data: ValueItem<Value>) => ReactNode

  /**
   * empty input after select value
   *
   * 选中后是否清空输入框内容
   *
   * default: false
   */
  emptyAfterSelect?: boolean

  /**
   * show dropdown arrow, only single select
   *
   * 是否显示下拉箭头，仅针对单选情况
   *
   * default: true
   */
  showArrow?: boolean

  /**
   * selected value while click under onCreate or onFilter
   *
   * onCreate 或 onFilter 在单选情况下单击值后是否选中值
   *
   * default: true
   */
  focusSelected?: boolean

  /**
   * compressed popover classname
   *
   * 多选合并展示弹出框的类名
   *
   * default: none
   */
  compressedClassName?: string

  /**
   * option list collapse callback
   *
   * 下拉列表展开/收起回调
   *
   * default: none
   */
  onCollapse?: (collapse: boolean) => void

  /**
   * The className of the selected result content container
   *
   * 选中结果内容容器的className
   *
   * default: none
   */
  resultClassName?: ((value: Item | ResultValue<Value>) => string) | string

  /**
   * There are onFilter and onCreate, select Option, automatically focus Input
   *
   * 存在onFilter和onCreate，选中 Option，自动focus Input
   *
   * default: false
   */
  reFocus?: boolean

  /**
   * Custom render option list header
   *
   * 自定义渲染 Option List Header
   *
   * default: null
   */
  header?: ReactElement

  /**
   * The maximum length of the input string in the Select input box
   *
   * Select 输入框输入字符串最大长度
   *
   * default:
   */
  maxLength?: number

  /**
   * inner title
   *
   * 内嵌标题
   *
   * default: -
   */
  innerTitle?: ReactNode

  /**
   * 用来转化粘贴文本中的换行
   *
   * Used to convert line breaks in pasted text
   *
   * default: ","
   */
  convertBr?: string | ((text: string) => string)

  /**
   * 自定义渲染下拉列表
   *
   * Custom render dropdown
   *
   * default: -
   */
  renderOptionList?: (list: ReactElement, info: { loading: boolean }) => ReactElement

  /**
   * expand option list while enter press
   *
   * 回车触发下拉框展开的时候调用
   *
   * default: -
   */
  onEnterExpand?: (e: React.KeyboardEvent<HTMLDivElement>) => boolean

  /**
   * hide the creat option while set onCreate
   *
   * 在使用创建选项时，在选项列表中隐藏该选项，回车后直接选中
   *
   * default: false
   */
  hideCreateOption?: boolean

  /**
   * width of option list
   *
   * 下拉列表宽度
   *
   * default: 100%
   */
  optionWidth?: number

  /**
   * select default content
   *
   * 默认占位内容 placeholder
   *
   * default: none
   */
  placeholder?: React.ReactNode

  /**
   * Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id.
   *
   * 生成key的辅助方法, 为函数时，使用此函数返回值, 为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id
   *
   * default: index
   */
  keygen: KeygenType<Item>

  /**
   * Option column width, only effective when columns > 1
   *
   * columns 大于 1 时，选项展示为多列布局模式
   *
   * default: 160
   */
  columnWidth?: number

  /**
   * group by
   *
   * 分组
   *
   * default: -
   */
  groupBy?: (record: Item, index: number, data: Item[]) => string

  /**
   * value is the datum.getValue().
   *
   * value 为 datum.getValue()
   *
   * default: -
   */
  onChange: (value: Value, data?: Item, checked?: boolean) => void

  /**
   * title of columns multiple select
   *
   * 多列选项多选时的标题文字
   *
   * default: none
   */
  columnsTitle?: ReactNode

  /**
   * expand all node, only in can be use in treeData
   *
   * 默认展开全部子节点, 仅树形数据下有效
   *
   * default: false
   */
  defaultExpandAll?: boolean

  /**
   * treeData，the key of the children data name
   *
   * 树形数据下，指定子数据的属性名
   *
   * default: 'children'
   */
  childrenKey?: string

  loader?: (key: ValueItem<Value>, data: Item) => void

  /**
   * custom empty copy
   *
   * 自定义 empty 文案
   *
   * default:
   */
  emptyText?: React.ReactNode

  /**
   * filter out value change callbacks with the same value
   *
   * 过滤掉相同值的回调
   *
   * default: false
   */
  filterSameChange?: boolean

  /**
   * By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match
   *
   * (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配
   *
   * default: (val, d) => val===format(d)
   */
  prediction?: (value: ValueItem<Value>, data: Item) => boolean

  /**
   * When it is a string, return d[string]. When it is a function, return the result of the function.
   *
   * 为 string 时，返回 d[string]。为 function 时，返回函数结果
   *
   * default: (val, d) => val===format(d)
   */
  renderResult?: ((data: Item, index?: number) => ReactNode)

  /**
   * show border bottom
   *
   * 仅仅展示下边框
   *
   * default: false
   */
  underline?: boolean
  data: Item[]
  value: Value
  defaultValue?: Value
  datum: List<Item, Value>
  filterText?: string
  onBlur: (e?: any) => void
  onFocus: (e?: any) => void
  result: ResultItem<Item>[]
  inputText?: string
  groupKey: string
  innerData: Item
  inputable?: boolean
  text?: React.ReactNode
  expanded?: string[]
}

/** ---------- optionList ---------- */
export type Control = 'mouse' | 'keyboard'
export interface OptionListProps<Item, Value> extends Omit<BaseSelectProps<Item, Value>, 'onChange'> {
  control: Control
  data: Item[]
  datum: List<Item, Value>
  focus?: boolean
  height: number
  itemsInView: number
  lineHeight: number
  onControlChange: (control: Control) => void
  onChange: (isActive: boolean, data: Item, index?: number) => void
  renderItem: ((data: Item, index?: number) => ReactNode)
  renderPending?: boolean
  selectId: string
  bindOptionFunc: (name: string, fn: Function) => void
  autoClass: string
  text: Object
  groupKey: keyof Item & string
  getRef: (el: HTMLElement) => void
  customHeader?: ReactNode
  filterText?: string
}

/** ---------- option ---------- */
export interface OptionProps<Item> {
  data: Item
  disabled?: boolean
  index?: number
  isActive?: boolean
  isHover?: boolean
  multiple?: boolean
  onClick: (isActive: boolean, data: Item, index?: number) => void
  onHover: Function
  renderItem: ((data: Item, index?: number) => ReactNode) | string
  groupKey: string
  filterText?: string
}

/** ---------- optionTree ---------- */
export interface OptionTreeProps<Item, Value> extends BaseSelectProps<Item, Value> {
  onChange: (_: any, data: Item, fromInput?: boolean) => void
  // loader: PropTypes.func,
  defaultExpanded?: string[]
  expanded?: string[]
  renderPending?: boolean
  treeData: Item[]
  datum: List<Item, Value>
  focus?: boolean
  onExpand?: () => void
  keygen: KeygenType<Item>
  renderItem: ((data: Item, index?: number) => ReactNode)
  selectId: string
  text: Object
  getRef?: () => void
  customHeader?: React.ReactNode
  expandIcons?: ReactNode[]
}

export interface UnMatchedValue<Value> {
  IS_NOT_MATCHED_VALUE: boolean
  value: Value
}

export type ResultValue<Value> = Value | UnMatchedValue<Value>

/** ---------- result ---------- */
export interface ResultProps<Item, Value>
  extends Omit<
    BaseSelectProps<Item, Value>,
    'renderItem' | 'onChange' | 'onBlur' | 'onFocus' | 'groupKey' | 'innerData' | 'value'
  > {
  datum: List<Item, Value>
  filterText?: string
  focus: boolean
  onRemove: (...args: any) => void
  onClear?: () => void
  onInputBlur: (text: string) => void
  onInputFocus: () => void
  result: ResultItem<Item>[]
  renderResult: ((data: Item | ResultValue<Value>, index?: number) => ReactNode)
  setInputReset: (fn: () => void) => void
  bindFocusInputFunc: (fn: (flag?: boolean) => void) => void
  // collapse: PropTypes.func,
  data: Item[]
}

/** ---------- more ---------- */
export interface MoreProps {
  className?: string
  data: React.ReactNode[]
  popoverClassName: string
  contentClassName: string
  dataId?: string
  trigger?: 'click' | 'hover'
  compressed?: boolean | 'no-repeat'
  cls?: (...args: any) => string
  showNum?: number
  more?: number
}

/** ---------- input ---------- */
export interface InputProps {
  focus: boolean
  focusSelected?: boolean
  trim?: boolean
  multiple?: boolean
  maxLength?: number
  onFilter: ((text: string) => void) | undefined
  convertBr?: string | ((text: string) => string)
  onInputBlur: (text: string) => void
  onInputFocus: () => void
  updatAble: boolean
  setInputReset: (fn: () => void) => void
  text?: React.ReactNode
  bindFocusInputFunc: (fn: (flag?: boolean) => void) => void
  // collapse: PropTypes.func,
}

/** ---------- boxList ---------- */
export interface BoxListProps<Item, Value>
  extends Omit<BaseSelectProps<Item, Value>, 'onChange' | 'renderItem' | 'data'> {
  data: Item[]
  columns: number
  onChange: (isActive: boolean, data: Item, index?: number) => void
  bindOptionFunc: (name: string, fn: Function) => void
  text: any
  selectId: string
  focus: boolean
  renderPending?: boolean
  renderItem: (data: Item, index: number) => React.ReactNode
  getRef?: (el: HTMLDivElement) => void
  customHeader: React.ReactNode
}

/** ---------- boxOption ---------- */
export interface BoxOptionProps<Item> {
  columns: number
  data: Item
  disabled: boolean
  index?: number
  isActive: boolean
  multiple?: boolean
  onClick: (isActive: boolean, data: Item, index?: number) => void
  renderItem: (data: Item, index?: number) => ReactNode
}

/** ---------- filter ---------- */
export interface FilterProps<Item, Value> {
  multiple?: boolean
  data?: Item[]
  datum: List<Item, Value>
  treeData?: Item[]
  childrenKey?: string
  onCreate?: ((input: string | Item) => Item | string) | boolean
  noCache?: boolean
  expanded?: string[]
  showHitDescendants?: boolean
  onAdvancedFilter?: (text: string) => ((data: Item) => boolean) | void
  keygen: KeygenType<Item>
  filterDelay?: number
  onFilter?: (text: string, from?: string) => ((data: Item) => boolean) | void
  hideCreateOption?: boolean
}

/** ---------- group ---------- */
export interface GroupProps<Item, Value> extends Omit<BaseSelectProps<Item, Value>, 'data'> {
  data: Item[]
  groupBy?: (record: Item, index: number, data: Item[]) => any

  /**
   *
   * 内部属性
   *
   */
  groupKey: string
}

export type GetFilterProps<Props, Item> = Omit<Props, 'filterText' | 'result' | 'innerData' | 'onFilter' | 'data'> & {
  /**
   * Options data
   *
   * 筛选后是否展示命中节点的后代节点
   *
   * default: -
   */
  data?: Item[]
  /**
   * When the onFilter is not empty, you can filter data by input. If the onFilter returns a function, use this function as a front-end filter. If return undefined, you can do your own backend filtering.
   *
   * onFilter 不为空时，可以输入过滤数据。onFilter 如果返回一个函数，使用这个函数做前端过滤。如果不返回，可以自行做后端过滤
   *
   * default: -
   */
  onFilter?: (text: string, from?: string) => ((data: Item) => boolean) | void | undefined
  /**
   * ms. The delay of user input triggering filter events
   *
   * 毫秒。用户输入触发 fitler 事件的延时
   *
   * default: 400
   */
  filterDelay?: number

  /**
   * Whether to show the descendant nodes of the hit node after filtering
   *
   * 筛选后是否展示命中节点的后代节点
   *
   * default: false
   */
  showHitDescendants?: boolean

  /**
   * data cache, if data change asynchronously, better set true
   *
   * 是否开启数据缓存，如果数据存在动态更新的情况建议开启
   *
   * default: false
   */
  noCache?: boolean
  onAdvancedFilter?: (text: string) => ((data: Item) => boolean) | void
}

export type GetLimitWrapProps<Props> = Omit<Props, 'limit'>

export type GetAdvancedFilterHOC<Props, Item> = Omit<Props, 'onAdvancedFilter'> & {
  /**
   * Use the onAdvancedFilter property to enable filtering to switch between filtering results and raw data for the current hierarchy.
   *
   * 使用 onAdvancedFilter 属性开启高级筛选，可针对当前层级在筛选结果和原始数据间切换
   *
   * default: -
   */
  onAdvancedFilter?: (text: string) => ((data: Item) => boolean) | void
}

export type GetTiledProps<Props> = Omit<Props, 'expandIcons'>

export type GetGroupProps<Props> = Omit<Props, 'groupKey'>

export type SelectPropsWidthAbsolute<Item, Value> = GetTableConsumerProps<BaseSelectProps<Item, Value>>
export type SelectPropsWidthGroup<Item, Value> = GetGroupProps<SelectPropsWidthAbsolute<Item, Value>>
export type SelectPropsWidthTiled<Item, Value> = GetTiledProps<SelectPropsWidthGroup<Item, Value>>
export type SelectPropsWidthFilter<Item, Value> = GetFilterProps<SelectPropsWidthTiled<Item, Value>, Item>
export type SelectPropsWidthAdvancedFilter<Item, Value> = GetAdvancedFilterHOC<
  SelectPropsWidthFilter<Item, Value>,
  Item
>
export type SelectPropsWidthDatum<Item, Value> = GetDatumListProps<
  SelectPropsWidthAdvancedFilter<Item, Value>,
  Item,
  Value,
  DataListDatumKey
>
export type SelectPropsWidthLimitWrap<Item, Value> = GetLimitWrapProps<SelectPropsWidthDatum<Item, Value>>
type DataListDatumKey = 'disabled' | 'limit' | 'format' | 'prediction' | 'separator'
export type SelectPropsWidthInputBorder<Item, Value> = GetInputBorderProps<SelectPropsWidthLimitWrap<Item, Value>>
export type SelectPropsWidthInputable<Item, Value> = GetInputableProps<SelectPropsWidthInputBorder<Item, Value>, Value>

export type SelectProps<Item, Value> = SelectPropsWidthInputable<Item, Value>

export declare class SelectClass<Item = any, Value = any> extends React.Component<SelectProps<Item, Value>, {}> {
  render(): JSX.Element
}

export type SelectType = typeof SelectClass
