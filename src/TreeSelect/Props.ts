import * as React from 'react'
import { RegularAttributes, ResultItem, KeygenResult, ValueItem } from '../@types/common'
import DatumTree, { TreeModeType } from '../Datum/Tree'
import { GetInputBorderProps } from '../hoc/Props'
import { GetInputableProps } from '../Form/Props'
import { TreeProps } from '../Tree/Props'
import { GetTableConsumerProps } from '../Table/Props'
import { AbsoluteProps } from '../AnimationList/Props'

type ReactNode = React.ReactNode
export type FilterFormType = 'blur' | 'edit'
export type TreeSelectValueType = KeygenResult | KeygenResult[]

/**
 * @title TreeSelectRef
 * @isDetail true
 */
export interface ComponentRef<DataItem, Value> {
  /**
   * @en Get the data corresponding to the value
   * @cn 获取 value 对应的 data
   */
  getDataByValues: (values: Value) => Value extends any[] ? ResultItem<DataItem>[] : ResultItem<DataItem>
}

export type ExtendsTreePropsKey =
  | 'mode'
  | 'data'
  | 'datum'
  | 'defaultExpanded'
  | 'defaultExpandAll'
  | 'disabled'
  | 'expanded'
  | 'keygen'
  | 'loader'
  | 'onExpand'
  | 'renderItem'
  | 'line'
  | 'parentClickExpand'
  | 'childrenKey'
  | 'expandIcons'

export type SetTreePropsKey = ExtendsTreePropsKey | 'value' | 'onChange' | 'onClick' | 'renderItem' | 'active'

type ExtendsTreeProps<Item, Value> = Pick<TreeProps<Item, Value extends any[] ? Value : Value[]>, ExtendsTreePropsKey>
export type SetTreeProps<Item, Value> = Partial<
  Pick<TreeProps<Item, Value extends any[] ? Value : Value[]>, SetTreePropsKey>
>

// 重写
export interface OriginTreeSelectProps<DataItem, Value>
  extends Pick<AbsoluteProps, 'absolute' | 'zIndex'>,
    Omit<ExtendsTreeProps<DataItem, Value>, 'data'> {
  datum: DatumTree<DataItem>
  /**
   * @en placeholder when value is empty
   * @cn value 为空时的占位符
   */
  placeholder?: ReactNode
  /**
   * @en when compressed is True,the comptessedBound can limit the numbers of multiple selected item's label
   * @cn 开启多选后，指定允许展示标签数量，超过后将折叠
   */
  compressedBound?: number
  /**
   * @en If clearable is true, show clear value icon
   * @cn 是否可清除值
   * @default false
   */
  clearable?: boolean
  /**
   * @en size
   * @cn 尺寸
   * @override union
   * @default 'default'
   */
  size?: RegularAttributes.Size
  filterText?: string
  result: ResultItem<DataItem>[]
  /**
   * @en ender unmatched value
   * @cn 渲染未匹配值的方式
   */
  renderUnmatched?: (data: ValueItem<Value>) => ReactNode
  /**
   * @en inner title
   * @cn 内嵌标题
   */
  innerTitle?: ReactNode
  /**
   * @en data source
   * @cn 数据源
   * @default []
   */
  data?: DataItem[]
  /**
   * @en Some methods of getting components Currently only support getDataByValue
   * @cn 获取组件的一些方法 目前只支持 getDataByValues
   */
  getComponentRef?: ((ref: ComponentRef<DataItem, Value>) => void) | { current?: ComponentRef<DataItem, Value> }
  onFilter?: (text: string, from: FilterFormType) => void
  /**
   * @en Placeholder content when there is no data
   * @cn 无数据时的占位内容
   */
  empty?: React.ReactNode
  /**
   * @en if it is true, it will be multiple selection
   * @cn 是否是多选
   * @default false
   */
  multiple?: boolean
  /**
   * @en callback function of blur event
   * @cn blur 事件回调函数
   */
  onBlur: (e?: any) => void
  /**
   * @en callback function of focus event
   * @cn focus 事件回调函数
   */
  onFocus: (e?: any) => void
  /**
   * @en When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function.
   * @cn 为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用
   * @default false
   */
  disabled?: ((data: DataItem) => boolean) | boolean
  /**
   * @en The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected
   * @cn 选中后在结果中显示的内容，默认和 renderItem 相同
   * @default renderItem
   */
  renderResult?: (data: DataItem) => React.ReactNode
  /**
   * @en mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node. 4: What you choose is what you get.
   * @cn 选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得
   * @default 1
   */
  mode?: TreeModeType
  /**
   * @en The height of list
   * @cn 列表高度
   * @default 300
   */
  height?: number
  /**
   * @en option collapse callback
   * @cn 下拉列表展开/收起回调
   */
  onCollapse?: (collapse: boolean) => void
  /**
   * @en Popup Position
   * @cn 弹出位置
   */
  position?: 'drop-up' | 'drop-down'
  /**
   * @en Expand option list while enter press
   * @cn 回车触发下拉框展开的时候调用
   */
  onEnterExpand?: (e: React.KeyboardEvent<HTMLDivElement>) => boolean
  /**
   * @en value is your picker now
   * @cn 参数 为 当前选中值
   */
  onChange: (value: Value, selected?: DataItem, path?: (string | number)[]) => void

  /**
   * @en onChange additional parameters (current is the data of the clicked node, data is the currently selected data, checked is whether it is selected or canceled in the multi-select state)
   * @cn onChange 额外参数 (current 为点击的节点的数据， data 为当前选中的数据， checked 为多选状态下是选中还是取消)
   */
  onChangeAddition?: (
    params: {
      current?: DataItem
      checked?: 0 | 1 | 2
      data?: DataItem[] | DataItem | null
    }
  ) => void
  /**
   * @en In the Form, the value will be taken over by the form and the value will be invalid.
   * @cn 选中的 key （受控），多选时必须为array
   */
  value?: Value
  /**
   * @en Merges selected values; the repeat value will not appear in the Popover when it is'no-repeat'.
   * @cn 将选中值合并，只在多选模式下有效；为 'no-repeat' 时弹出框中不重复展示值
   * @default false
   */
  compressed?: boolean | 'no-repeat'
}

export interface ResultProps<Item, Value>
  extends Pick<
    OriginTreeSelectProps<Item, Value>,
    | 'keygen'
    | 'data'
    | 'innerTitle'
    | 'renderUnmatched'
    | 'compressedBound'
    | 'compressed'
    | 'placeholder'
    | 'multiple'
    | 'datum'
    | 'disabled'
    | 'result'
    | 'onFilter'
    | 'filterText'
  > {
  renderResult: (d: Item) => ReactNode
  setInputReset: (fn: () => void) => void
  focus: boolean
  onRemove: (data: ResultItem<Item>) => void
  onClear?: () => void
}

export interface InputProps {
  onFilter?: (text: string, from?: string) => void
  focus: boolean
  multiple?: boolean
  updatAble: boolean
  setInputReset: (fn: () => void) => void
  text: React.ReactNode
}

type TreeSelectPropsWithAbsolute<Item, Value> = GetTableConsumerProps<OriginTreeSelectProps<Item, Value>>

export type TreeSelectPropsWithTied<Item, Value> = Omit<TreeSelectPropsWithAbsolute<Item, Value>, 'expandIcons'> & {
  onAdvancedFilter: boolean
  rawData: Item[]
}

export type TreeSelectPropsWithFilter<Item, Value> = Omit<
  TreeSelectPropsWithTied<Item, Value>,
  'filterText' | 'result' | 'rawData' | 'onFilter'
> & {
  /**
   * @en By default, the value of the cache corresponds to the label. If the data changes, set noCache = true
   * @cn 默认会缓存 value 对应 label, 如果 data 会变化需要设置 noCache = true
   */
  noCache?: boolean
  /**
   * @en Whether to show the descendant nodes of the hit node after filtering
   * @cn 筛选后是否展示命中节点的后代节点
   * @default false
   */
  showHitDescendants?: boolean
  /**
   * @en ms. The delay of user input triggering filter events
   * @cn 毫秒。用户输入触发 fitler 事件的延时
   * @default 400
   */
  filterDelay?: number
  /**
   * @en When the onFilter is not empty, you can filter data by input. If the onFilter returns a function, use this function as a front-end filter. If return undefined, you can do your own backend filtering.
   * @cn onFilter 不为空时，可以输入过滤数据。 onFilter 如果返回一个函数，使用这个函数做前端过滤。 如果不返回，可以自行做后端过滤
   */
  onFilter?: (text: string, from: FilterFormType) => ((data: Item) => boolean) | void
}

export type TreeSelectPropsWithAdvancedFilter<Item, Value> = Omit<
  TreeSelectPropsWithFilter<Item, Value>,
  'onAdvancedFilter'
> & {
  /**
   * @en In the advanced filter mode, you can switch between the filter results and the original data for the current level by pressing the button
   * @cn 高级筛选模式，可针对当前层级在筛选结果和原始数据间切换
   */
  onAdvancedFilter?: (text: string, from: FilterFormType) => (data: Item) => boolean
}

export type TreeSelectPropsWithDatum<Item, Value> = Omit<TreeSelectPropsWithAdvancedFilter<Item, Value>, 'datum'> & {
  /**
   * @en render unmatch value
   * @cn 是否展示data中不存在的值
   * @default true
   */
  unmatch?: boolean
}

type TreeSelectPropsWithBorder<Item, Value> = Omit<
  GetInputBorderProps<TreeSelectPropsWithDatum<Item, Value>>,
  'autoFocus'
>

type TreeSelectPropsWithInputable<Item, Value> = GetInputableProps<TreeSelectPropsWithBorder<Item, Value>, Value>

/**
 * @title TreeSelect
 */
export type TreeSelectProps<Item, Value extends TreeSelectValueType> = TreeSelectPropsWithInputable<Item, Value>

export declare class TreeSelectClass<
  Item = any,
  Value extends TreeSelectValueType = TreeSelectValueType
> extends React.Component<TreeSelectProps<Item, Value>, {}> {
  render(): JSX.Element
}

export type TreeSelectType = typeof TreeSelectClass
