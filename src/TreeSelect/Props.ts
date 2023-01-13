import * as React from 'react'
import { CommonProps, RegularAttributes, ResultItem, keyType, ValueItem } from '../@types/common'
import DatumTree, { TreeModeType } from '../Datum/Tree'
import { GetInputBorderProps } from '../hoc/Props'
import { GetInputableProps } from '../Form/Props'
import { TreeProps } from '../Tree/Props'
import { getTableConsumerProps } from '../Table/Props'

type ReactNode = React.ReactNode
export type FilterFormType = 'blur' | 'edit'
export type TreeSelectValueType = keyType | keyType[]

export interface ComponentRef<Item, Value> {
  getDataByValues: (values: Value) => Value extends any[] ? ResultItem<Item>[] : ResultItem<Item>
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
export interface OriginTreeSelectProps<Item, Value>
  extends Pick<CommonProps, 'absolute' | 'zIndex' | 'clearable'>,
    ExtendsTreeProps<Item, Value> {
  datum: DatumTree<Item>
  placeholder?: ReactNode
  /**
   * when compressed is True,the comptessedBound can limit the numbers of multiple selected item's label
   *
   * 开启多选后，指定允许展示标签数量，超过后将折叠
   *
   * default: -
   */
  compressedBound?: number
  /**
   * If clearable is true, show clear value icon
   *
   * 是否可清除值
   *
   * default: false
   */
  clearable?: boolean
  size?: RegularAttributes.Size
  filterText?: string
  result: ResultItem<Item>[]
  /**
   * render unmatched value
   *
   * 渲染未匹配值的方式
   *
   * default: none
   */
  renderUnmatched?: (data: ValueItem<Value>) => ReactNode
  /**
   * inner title
   *
   * 内嵌标题
   *
   * default: -
   */
  innerTitle?: ReactNode
  data: Item[]
  /**
   * Some methods of getting components Currently only support getDataByValue
   *
   * 获取组件的一些方法 目前只支持 getDataByValues
   *
   * default: -
   */
  getComponentRef?: ((ref: ComponentRef<Item, Value>) => void) | { current?: ComponentRef<Item, Value> }
  onFilter?: (text: string, from: FilterFormType) => void
  /**
   * Placeholder content when there is no data
   *
   * 无数据时的占位内容
   *
   * default: -
   */
  empty?: React.ReactNode
  /**
   * if it is true, it will be multiple selection
   *
   * 是否是多选
   *
   * default: false
   */
  multiple?: boolean
  onBlur: (e?: any) => void
  onFocus: (e?: any) => void
  /**
   * When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function.
   *
   * 为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用
   *
   * default: false
   */
  disabled?: ((data: Item) => boolean) | boolean
  /**
   * The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected
   *
   * 选中后在结果中显示的内容，默认和 renderItem 相同
   *
   * default: renderItem
   */
  renderResult?: (data: Item) => React.ReactNode
  /**
   * mode . 0: Returns only the fully selected node including the parent node.  1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node.
   *
   * 选中值模式。0: 只返回完全选中的节点，包含父节点。1: 返回全部选中的节点和半选中的父节点。2: 只返回选中的子节点。3: 如果父节点选中，只返回父节点
   *
   * default: 1
   */
  mode?: TreeModeType
  /**
   * The height of list
   *
   * 列表高度
   *
   * default: -
   */
  height?: number
  /**
   * option collapse callback
   *
   * 下拉列表展开/收起回调
   *
   * default: none
   */
  onCollapse?: (collapse: boolean) => void
  position?: 'drop-up' | 'drop-down'
  /**
   * Expand option list while enter press
   *
   * 回车触发下拉框展开的时候调用
   *
   * default: -
   */
  onEnterExpand?: (e: React.KeyboardEvent<HTMLDivElement>) => boolean
  /**
   * value is your picker now
   * 参数 为 当前选中值
   * default: -
   */
  onChange: (value: Value, selected?: Item, path?: (string | number)[]) => void

  /**
   * onChange additional parameters (current is the data of the clicked node, data is the currently selected data, checked is whether it is selected or canceled in the multi-select state)
   *
   * onChange 额外参数 (current 为点击的节点的数据， data为当前选中的数据， checked为多选状态下是选中还是取消)
   *
   * default: -
   */
  onChangeAddition?: (
    params: {
      current?: Item
      checked?: 0 | 1 | 2
      data?: Item[] | Item | null
    }
  ) => void
  /**
   * In the Form, the value will be taken over by the form and the value will be invalid.
   *
   * 选中的 key （受控），多选时必须为array
   *
   * default:
   */
  value?: Value
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

type TreeSelectPropsWithAbsolute<Item, Value> = getTableConsumerProps<OriginTreeSelectProps<Item, Value>>

export type TreeSelectPropsWithTied<Item, Value> = Omit<TreeSelectPropsWithAbsolute<Item, Value>, 'expandIcons'> & {
  onAdvancedFilter: boolean
  rawData: Item[]
}

export type TreeSelectPropsWithFilter<Item, Value> = Omit<
  TreeSelectPropsWithTied<Item, Value>,
  'filterText' | 'result' | 'rawData' | 'onFilter'
> & {
  noCache?: boolean
  /**
   * Whether to show the descendant nodes of the hit node after filtering
   *
   * 筛选后是否展示命中节点的后代节点
   *
   * default: false
   */
  showHitDescendants?: boolean
  /**
   * ms. The delay of user input triggering filter events
   *
   * 毫秒。用户输入触发 fitler 事件的延时
   *
   * default: 400
   */
  filterDelay?: number
  /** When the onFilter is not empty, you can filter data by input. If the onFilter returns a function, use this function as a front-end filter. If return undefined, you can do your own backend filtering.
   *
   * onFilter 不为空时，可以输入过滤数据。 onFilter 如果返回一个函数，使用这个函数做前端过滤。 如果不返回，可以自行做后端过滤
   *
   * default: -
   */
  onFilter?: (text: string, from: FilterFormType) => ((data: Item) => boolean) | void
}

export type TreeSelectPropsWithAdvancedFilter<Item, Value> = Omit<
  TreeSelectPropsWithFilter<Item, Value>,
  'onAdvancedFilter'
> & {
  /**
   * In the advanced filter mode, you can switch between the filter results and the original data for the current level by pressing the button
   *
   * 高级筛选模式，可针对当前层级在筛选结果和原始数据间切换
   *
   * default: -
   */
  onAdvancedFilter?: (text: string, from: FilterFormType) => (data: Item) => boolean
}

export type TreeSelectPropsWithDatum<Item, Value> = Omit<TreeSelectPropsWithAdvancedFilter<Item, Value>, 'datum'> & {
  unmatch?: boolean
}

type TreeSelectPropsWithBorder<Item, Value> = GetInputBorderProps<TreeSelectPropsWithDatum<Item, Value>>

type TreeSelectPropsWithInputable<Item, Value> = GetInputableProps<TreeSelectPropsWithBorder<Item, Value>, Value>

export type TreeSelectProps<Item, Value extends TreeSelectValueType> = TreeSelectPropsWithInputable<Item, Value>

export declare class TreeSelectClass<
  Item = any,
  Value extends TreeSelectValueType = TreeSelectValueType
> extends React.Component<TreeSelectProps<Item, Value>, {}> {
  render(): JSX.Element
}

export type TreeSelectType = typeof TreeSelectClass
