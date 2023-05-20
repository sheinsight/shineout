import * as React from 'react'
import {
  StandardProps,
  RegularAttributes,
  KeygenType,
  ValueItem,
  ResultItem,
  ObjectKey,
  ValueArr,
} from '../@types/common'
import List from '../Datum/List'
import { GetTableConsumerProps } from '../Table/Props'
import { GetInputableProps, InputableProps } from '../Form/Props'
import { GetInputBorderProps } from '../hoc/Props'
import { GetDatumListProps } from '../Datum/Props'
import { AbsoluteProps, GetAbsoluteProps } from '../AnimationList/Props'
import { TreeProps } from '../Tree/Props'

type ReactNode = React.ReactNode
type ReactElement = React.ReactElement

type ExpandTreeKeys =
  | 'onExpand'
  | 'expanded'
  | 'defaultExpanded'
  | 'defaultExpandAll'
  | 'expandIcons'
  | 'loader'
  | 'childrenKey'
export interface BaseSelectProps<DataItem, Value>
  extends StandardProps,
    Pick<AbsoluteProps, 'absolute' | 'zIndex'>,
    Pick<InputableProps<Value>, 'formDatum'>,
    Pick<TreeProps<DataItem, ValueArr<Value>>, ExpandTreeKeys> {
  /**
   * @inner 内部属性
   */
  getResultByValue: (value: Value) => ResultItem<DataItem>
  /**
   * @inner 内部属性
   */
  inputFocus: boolean
  /**
   * @en Form field, used with Form
   * @cn 表单字段, 配合 Form 使用
   */
  name?: string
  /**
   * @en If clearable is true, show clear value icon
   * @cn 是否可清除值
   * @default false
   */
  clearable?: boolean
  /**
   * @en Option columns.
   * @cn columns 大于 1 时，选项展示为多列布局模式
   * @default 1
   */
  columns?: number

  /**
   * @en tree select data，[{children: []}]
   * @cn 树形结构数据项，[{children: []}]
   * @override object[]
   */
  treeData?: DataItem[]

  /**
   * @en When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.
   * @cn 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * @default false
   */
  disabled?: ((data: DataItem) => boolean) | boolean

  /**
   * @en height
   * @cn 高度
   * @default 250
   */
  height?: number

  /**
   * @en The maximum number of rows for a single render. Select uses lazy render to optimize performance under large amounts of data. If your table displays more than 10 rows, you can change the value of itemsInView.
   * @cn 单次 render 的最大行数。Select 采用了lazy render 的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了 10 条，可以调整 itemsInView
   * @default 10
   */
  itemsInView?: number

  /**
   * @en Option height. List items are rendered using virtual lists, and when the option height changes, the correct height should be specified via lineHeight
   * @cn 选项高度。列表项使用虚拟列表渲染，当选项高度改变时，应该通过 lineHeight 来指定正确高度
   * @default 34
   */
  lineHeight?: number

  /**
   * @en When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.
   * @cn 数据加载中，为true时会展示一个默认的 [Spin](/components/Spin) 组件，可以传入一个自定义的Spin代替
   * @override boolean | ReactNode
   * @default false
   */
  loading?: boolean | ReactNode

  /**
   * @en if it is true, it will be multiple selection
   * @cn 是否是多选
   * @default false
   */
  multiple?: boolean

  /**
   * @en If the onCreate event is set, the component is inputable. When onCreate is a function, the return value of this function is diaplay at the top as a new option. When onCreate is true, use the built-in functuon text => text.
   * @cn 如果设置了 onCreate 事件，组件为可输入状态。onCreate 为函数时，将此函数返回值作为新的选项拆入最上方。onCreate 为 true 时，使用默认函数 text => text
   */
  onCreate?: ((input: string | DataItem) => DataItem | string) | boolean

  onFilter?: (text: string, from?: string) => void

  /**
   * @en The position of the pop-up layer, options: ['left', 'top', 'right', 'bottom']
   * @cn 弹出层位置
   * @default auto
   */
  position?: RegularAttributes.ListPosition

  /**
   * @en When it is a string, return d\\[string]. When it is a function, return the result of the function.
   * @cn 为 string 时，返回 d\\[string]。 为 function 时，返回函数结果
   * @default d => d
   */
  renderItem?: ((data: DataItem, index?: number) => ReactNode) | ObjectKey<DataItem>

  /**
   * @en size of select
   * @cn 尺寸
   * @default 'default'
   * @override union
   */
  size?: RegularAttributes.Size

  /**
   * @en Merges selected values, valid only in multiselect mode
   * @cn 将选中值合并，只在多选模式下有效; 为 'no-repeat' 时弹出框中不重复展示值
   * @default false
   */
  compressed?: boolean | 'no-repeat'

  /**
   * @en when compressed is True,the comptessedBound can limit the numbers of multiple selected item's label
   * @cn 开启多选后，指定允许展示标签数量，超过后将折叠
   */
  compressedBound?: number

  /**
   * @en When trim is true, blank characters are automatically deleted when lose focus。
   * @cn trim 为 true 时，失去焦点时会自动删除空白字符。
   * @default false
   */
  trim?: boolean

  /**
   * @en option list is auto adapt
   * @cn 下拉列表宽度根据内容自由展开
   * @default false
   */
  autoAdapt?: boolean

  /**
   * @en blur to select the data when filter data has only single. only work in filter.
   * @cn 当筛选数据仅为一条时，失焦后直接选中该条数据。仅在 Filter 下有效。
   * @default false
   */
  filterSingleSelect?: boolean

  /**
   * @en the way to render not matched data value
   * @cn 渲染未匹配值的方式
   */
  renderUnmatched?: (data: ValueItem<Value>) => ReactNode

  /**
   * @en empty input after select value
   * @cn 选中后是否清空输入框内容
   * @default false
   */
  emptyAfterSelect?: boolean

  /**
   * @en show dropdown arrow, only single select
   * @cn 是否显示下拉箭头，仅针对单选情况
   * @default true
   */
  showArrow?: boolean

  /**
   * @en selected value while click under onCreate or onFilter
   * @cn onCreate 或 onFilter 在单选情况下单击值后是否选中值
   * @default true
   */
  focusSelected?: boolean

  /**
   * @en compressed popover classname
   * @cn 多选合并展示弹出框的类名
   */
  compressedClassName?: string

  /**
   * @en option list collapse callback
   * @cn 下拉列表展开/收起回调
   */
  onCollapse?: (collapse: boolean) => void

  /**
   * @en The className of the selected result content container
   * @cn 选中结果内容容器的className
   */
  resultClassName?: ((value: DataItem) => string) | string

  /**
   * @en There are onFilter and onCreate, select Option, automatically focus Input
   * @cn 存在 onFilter 和 onCreate，选中 Option，自动 focus Input
   * @default false
   */
  reFocus?: boolean

  /**
   * @en Custom render option list header
   * @cn 自定义渲染 Option List Header
   */
  header?: ReactElement

  /**
   * @en The maximum length of the input string in the Select input box
   * @cn Select 输入框输入字符串最大长度
   */
  maxLength?: number

  /**
   * @en inner title
   * @cn 内嵌标题
   */
  innerTitle?: ReactNode

  /**
   * @cn 用来转化粘贴文本中的换行
   * @en Used to convert line breaks in pasted text
   * @default ","
   */
  convertBr?: string | ((text: string) => string)

  /**
   * @cn 自定义渲染下拉列表
   * @en Custom render dropdown
   */
  renderOptionList?: (list: ReactElement, info: { loading: boolean }) => ReactElement

  /**
   * @en expand option list while enter press
   * @cn 回车触发下拉框展开的时候调用
   */
  onEnterExpand?: (e: React.KeyboardEvent<HTMLDivElement>) => boolean

  /**
   * @en hide the creat option while set onCreate
   * @cn 在使用创建选项时，在选项列表中隐藏该选项，回车后直接选中
   * @default false
   */
  hideCreateOption?: boolean

  /**
   * @en width of option list
   * @cn 下拉列表宽度
   * @default 100%
   */
  optionWidth?: number

  /**
   * @en select default content
   * @cn 默认占位内容 placeholder
   */
  placeholder?: React.ReactNode

  /**
   * @en Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id.
   * @cn 生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 'id'，相当于 (d) => d.id
   * @default index
   */
  keygen: KeygenType<DataItem>

  /**
   * @en Option column width, only effective when columns > 1
   * @cn columns 大于 1 时，选项展示为多列布局模式
   * @default 160
   */
  columnWidth?: number

  /**
   * @en group by
   * @cn 分组
   */
  groupBy?: (record: DataItem, index: number, data: DataItem[]) => string

  /**
   * @en change callback
   * @cn 值改变回调
   */
  onChange: (value: Value, data?: DataItem, checked?: boolean) => void

  /**
   * @en title of columns multiple select
   * @cn 多列选项多选时的标题文字
   */
  columnsTitle?: ReactNode

  /**
   * @en expand all node, only in can be use in treeData
   * @cn 默认展开全部子节点, 仅树形数据下有效
   * @default false
   */
  defaultExpandAll?: boolean

  /**
   * @en custom empty copy
   * @cn 自定义 empty 文案
   */
  emptyText?: React.ReactNode

  /**
   * @en filter out value change callbacks with the same value
   * @cn 过滤掉相同值的回调
   * @default false
   */
  filterSameChange?: boolean

  /**
   * @en By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match
   * @cn 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配
   * @default (val, d) => val===format(d)
   */
  prediction?: (value: ValueItem<Value>, data: DataItem) => boolean

  /**
   * @en The content displayed in the result after selecting, if not set, use renderItem
   * @cn 为 选中后在结果中显示的内容，默认和 renderItem 相同
   * @default renderItem
   */
  renderResult?: ((data: DataItem, index?: number) => ReactNode)

  /**
   * @en show border bottom
   * @cn 仅仅展示下边框
   * @default false
   */
  underline?: boolean

  /**
   * @en Set visible of select popup
   * @cn 控制浮层显隐
   */
  open?: boolean
  data: DataItem[]
  /**
   * @en In the Form, the value will be taken over by the form and the value will be invalid.
   * @cn 在 Form 中，value 会被表单接管，value 无效
   * @override any
   */
  value: Value
  /**
   * @en Initial value
   * @cn 默认值 通过 Value 类型
   */
  defaultValue?: Value
  datum: List<DataItem, Value>
  filterText?: string
  /**
   * @en blur callback
   * @cn blur 回调
   */
  onBlur: (e?: any) => void
  /**
   * @en focus callback
   * @cn focus 回调
   */
  onFocus: (e?: any) => void
  result: ResultItem<DataItem>[]
  inputText?: string
  groupKey: string
  innerData: DataItem
  inputable?: boolean
  /**
   * @inner 内部属性
   */
  text?: { noData?: string }
}

/** ---------- optionList ---------- */
export type Control = 'mouse' | 'keyboard'
export interface OptionListProps<Item, Value>
  extends Pick<
      BaseSelectProps<Item, Value>,
      | 'hideCreateOption'
      | 'loading'
      | 'keygen'
      | 'multiple'
      | 'renderOptionList'
      | 'data'
      | 'datum'
      | 'text'
      | 'groupKey'
      | 'emptyText'
    >,
    Pick<Required<BaseSelectProps<Item, Value>>, 'itemsInView' | 'lineHeight' | 'height'> {
  control: Control
  focus?: boolean
  onControlChange: (control: Control) => void
  onChange: (isActive: boolean, data: Item) => void
  renderItem: ((data: Item, index?: number) => ReactNode)
  renderPending?: boolean
  selectId: string
  bindOptionFunc: (name: string, fn: Function) => void
  autoClass: string
  getRef: (el: HTMLElement) => void
  customHeader?: ReactNode
  filterText?: string
  style: React.CSSProperties
}
export declare class WrappedOptionListComp<Item, Value> extends React.Component<
  GetAbsoluteProps<OptionListProps<Item, Value>>,
  any
> {
  render: () => JSX.Element
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
export interface OptionTreeProps<Item, Value>
  extends Pick<
    BaseSelectProps<Item, Value>,
    ExpandTreeKeys | 'loading' | 'treeData' | 'loader' | 'emptyText' | 'height' | 'renderOptionList' | 'text'
  > {
  onChange: (_: any, data: Item, fromInput?: boolean) => void
  renderPending?: boolean
  treeData: Item[]
  datum: List<Item, Value>
  focus?: boolean
  keygen: KeygenType<Item>
  renderItem: ((data: Item, index?: number) => ReactNode)
  selectId: string
  getRef?: () => void
  customHeader?: React.ReactNode
  style?: React.CSSProperties
}

export declare class WrappedOptionTreeComp<Item, Value> extends React.Component<
  GetAbsoluteProps<OptionTreeProps<Item, Value>>,
  any
> {
  render: () => JSX.Element
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
    'renderItem' | 'onChange' | 'onBlur' | 'onFocus' | 'groupKey' | 'innerData' | 'value' | 'inputFocus' | 'result'
  > {
  datum: List<Item, Value>
  filterText?: string
  focus: boolean
  onRemove: (...args: any) => void
  onClear?: () => void
  onInputBlur: (text: string) => void
  onInputFocus: () => void
  renderResult: ((data: Item | ResultValue<Value>, index?: number) => ReactNode)
  setInputReset: (fn: () => void) => void
  bindFocusInputFunc: (fn: (flag?: boolean) => void) => void
  // collapse: PropTypes.func,
  data: Item[]
  values: any[]
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
  extends Pick<
    BaseSelectProps<Item, Value>,
    | 'datum'
    | 'keygen'
    | 'renderResult'
    | 'multiple'
    | 'lineHeight'
    | 'columnWidth'
    | 'data'
    | 'loading'
    | 'renderOptionList'
    | 'emptyText'
    | 'itemsInView'
    | 'height'
    | 'columnsTitle'
  > {
  columns: number
  onChange: (isActive: boolean, data: Item) => void
  bindOptionFunc: (name: string, fn: Function) => void
  text: any
  selectId: string
  focus: boolean
  renderPending?: boolean
  renderItem: (data: Item, index?: number) => React.ReactNode
  getRef?: (el: HTMLDivElement) => void
  customHeader: React.ReactNode
  style: React.CSSProperties
}

export declare class WrappedBoxListComp<Item, Value> extends React.Component<
  GetAbsoluteProps<BoxListProps<Item, Value>>,
  any
> {
  render: () => JSX.Element
}

/** ---------- boxOption ---------- */
export interface BoxOptionProps<Item> {
  columns: number
  data: Item
  disabled: boolean
  isActive: boolean
  multiple?: boolean
  onClick: (isActive: boolean, data: Item) => void
  renderItem: (data: Item) => ReactNode
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

export type GetFilterProps<Props, Item> = Omit<
  Props,
  'filterText' | 'result' | 'innerData' | 'onFilter' | 'data' | 'inputText' | 'inputable'
> & {
  /**
   * @en Options data
   * @cn 筛选后是否展示命中节点的后代节点
   */
  data?: Item[]
  /**
   * @en When the onFilter is not empty, you can filter data by input. If the onFilter returns a function, use this function as a front-end filter. If return undefined, you can do your own backend filtering.
   * @cn onFilter 不为空时，可以输入过滤数据。onFilter 如果返回一个函数，使用这个函数做前端过滤。如果不返回，可以自行做后端过滤
   */
  onFilter?: (text: string, from?: string) => ((data: Item) => boolean) | void | undefined
  /**
   * @en ms. The delay of user input triggering filter events
   * @cn 毫秒。用户输入触发 fitler 事件的延时
   * @default 400
   */
  filterDelay?: number

  /**
   * @en Whether to show the descendant nodes of the hit node after filtering
   * @cn 筛选后是否展示命中节点的后代节点
   * @default false
   */
  showHitDescendants?: boolean

  /**
   * @en data cache, if data change asynchronously, better set true
   * @cn 是否开启数据缓存，如果数据存在动态更新的情况建议开启
   * @default false
   */
  noCache?: boolean
  onAdvancedFilter?: (text: string) => ((data: Item) => boolean) | void
}

export type GetLimitWrapProps<Props> = Omit<Props, 'limit'>

export type GetAdvancedFilterHOC<Props, Item> = Omit<Props, 'onAdvancedFilter'> & {
  /**
   * @en Use the onAdvancedFilter property to enable filtering to switch between filtering results and raw data for the current hierarchy.
   * @cn 使用 onAdvancedFilter 属性开启高级筛选，可针对当前层级在筛选结果和原始数据间切换
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
export type SelectPropsWidthInputable<Item, Value> = Omit<
  GetInputableProps<SelectPropsWidthInputBorder<Item, Value>, Value>,
  'autoFocus'
>

/**
 * @title Select
 */
export type SelectProps<Item, Value> = SelectPropsWidthInputable<Item, Value>

export declare class SelectClass<Item = any, Value = any> extends React.Component<SelectProps<Item, Value>, {}> {
  render(): JSX.Element
}

export type SelectType = typeof SelectClass
