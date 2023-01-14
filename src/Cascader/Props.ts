import React, { ReactNode } from 'react'
import { keyType, LiteralUnion, RegularAttributes, KeygenType, ObjectType, StandardProps } from '../@types/common'
import { GetInputableProps } from '../Form/Props'
import DatumTree, { TreeDatumOptions } from '../Datum/Tree'
import { GetInputBorderProps } from '../hoc/Props'
import { AbsoluteProps, GetAbsoluteProps } from '../AnimationList/Props'
import { GetTableConsumerProps } from '../Table/Props'
import { InputTitleProps } from '../InputTitle/Props'

interface componentRef {
  close: (e: MouseEvent) => void
  [propName: string]: any
}

export type BaseValue = (string | number)[]

/** ------ filterHoc ------ * */

export interface FilterProps<DataItem> {
  childrenKey?: LiteralUnion<DataItem>
  data: DataItem[]
  filterDelay: number
  keygen: KeygenType<DataItem>
  mode: 0 | 1 | 2 | 3 | 4
  onFilter?: (text: string) => ((data: DataItem) => boolean) | undefined | void
}

export type GetFilterProps<Props, DataItem> = Omit<
  Props,
  'filterText' | 'filterDataChange' | 'firstMatchNode' | 'onFilter' | 'childrenKey'
> & {
  onFilter?: FilterProps<DataItem>['onFilter']
  childrenKey?: FilterProps<DataItem>['childrenKey']
}

/** ------ Cascader ------ * */
export interface OriginCascaderProps<DataItem, Value extends BaseValue>
  extends Pick<AbsoluteProps, 'absolute' | 'zIndex'>,
    Pick<InputTitleProps, 'innerTitle'>,
    Pick<TreeDatumOptions<DataItem>, 'mode'>,
    Pick<StandardProps, 'style'> {
  /**
   * Selected key (controlled)
   *
   * 选中的 key （受控)
   *
   * default: -
   */
  value?: Value
  /**
   * data
   *
   * 数据
   *
   * default: empty data
   */
  data?: DataItem[]
  /**
   * height of dropdown options
   *
   * 下拉列表高度
   *
   * default: 300
   */
  height?: number
  /**
   * render unmatch value
   *
   * 是否展示data中不存在的值
   *
   * default: true
   */
  unmatch?: boolean
  /**
   * If clearable is true, show clear value icon
   *
   * 是否显示清除数据图标
   *
   * default: true
   */
  clearable?: boolean
  /**
   * Allows all possible matching options to be choosed
   *
   * 开启 wideMatch 后，将筛选出所有可能的匹配项目
   *
   * default: -
   */
  wideMatch?: boolean
  /**
   * show dropdown arrow, only single select
   *
   * 是否显示下拉箭头，仅针对单选情况
   *
   * default: true
   */
  showArrow?: boolean
  /**
   * close options after chose the final node
   *
   * 选择末级节点后是否关闭选项列表
   *
   * default: false
   */
  finalDismiss?: boolean
  /**
   * Support single node deletion
   *
   * 支持单个节点删除
   *
   * default: none
   */
  singleRemove?: boolean
  /**
   * when compressed is True,the comptessedBound can limit the numbers of multiple selected item's label
   *
   * 开启多选后，指定允许展示标签数量，超过后将折叠
   *
   * default: -
   */
  compressedBound?: number
  /**
   *  dropdown list loading state
   *
   *  下拉列表加载状态
   *
   *  default: -
   *
   */
  loading?: boolean | ReactNode
  /**
   * size
   *
   * 尺寸
   *
   * defualt: none
   */
  size?: RegularAttributes.Size
  /**
   * the key of the children data name
   *
   * 指定子数据的属性名
   *
   * default: 'children'
   */
  childrenKey: LiteralUnion<DataItem>
  /**
   * Merges selected values
   *
   * 将选中值合并
   *
   * default: false
   */
  compressed?: boolean | 'no-repeat'
  /**
   * options collapse callback
   *
   * 下拉列表展开/收起回调
   *
   * default: none
   */
  onCollapse?: (collapse: boolean) => void
  /**
   * If the loader attribute is a function, the node with no children is regarded as dynamically loaded node. Click expanded button to trigger the loader event. The children property is null or its length is 0 will be regarded as a leaf node.
   *
   * 设置loader属性后，未定义children的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点
   *
   * default:
   */
  loader?: (key: keyType, data: DataItem) => void
  /**
   * When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function.
   *
   * 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   *
   * default: false
   */
  disabled?: ((data: DataItem) => boolean) | boolean
  /**
   * Expand mode
   *
   * 节点展开触发方式
   *
   * default: 'click'
   */
  expandTrigger?: 'click' | 'hover' | 'hover-only'
  /**
   * When the onChange property is set, the selection box is displayed. The parameter is the current selected value, which is related to the mode property.
   *
   * 设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关
   *
   * default: -
   */
  onChange: (value: Value, selected?: DataItem) => void
  /**
   * When the onFilter is not empty, you can filter data by input.If the onFilter returns a function, use this function as a front-end filter.If return undefined, you can do your own backend filtering.support in single selection state.
   *
   * onFilter 不为空时，可以输入过滤数据;onFilter 如果返回一个函数，使用这个函数做前端过滤;如果不返回，可以自行做后端过滤;单选状态下支持
   *
   * default: -
   */
  onFilter?: (text: string) => void
  /**
   * Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id.
   *
   * 生成key的辅助方法, 为函数时，使用此函数返回值, 为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id
   *
   * default: index
   */
  keygen: ((data: DataItem, parentKey?: keyType) => keyType) | LiteralUnion<DataItem>
  /**
   *  A reference to the binding component, you can call some component methods
   *
   *  绑定组件的引用, 可以调用某些组件的方法
   *
   *  default: -
   *
   */
  getComponentRef?: (comp: componentRef) => void | { current?: componentRef }
  /**
   * When it is a string, return d[string]. When it is a function, return the result of the function.
   *
   * 为 string 时，返回 d[string]。 为 function 时，返回函数结果
   *
   * default: d => d
   */
  renderItem: LiteralUnion<DataItem> | ((data: DataItem, active?: boolean, id?: Value[0]) => React.ReactNode)
  /**
   * The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected
   *
   * 选中后在结果中显示的内容，默认和 renderItem 相同
   *
   * default: renderItem
   */
  renderResult?: LiteralUnion<DataItem> | ((data: DataItem, row: DataItem[]) => React.ReactNode)
  position?: 'drop-up' | 'drop-down'
  firstMatchNode: DataItem
  filterText: string
  filterDataChange: (data: DataItem) => boolean
  onBlur: (e?: MouseEvent) => void
  onFocus: (e?: FocusEvent) => void
  onItemClick?: (e: MouseEvent) => void
  placeholder?: ReactNode
  trim?: boolean
}

/** ------ filterList ------ * */
export interface FilterListProps<DataItem, Value extends BaseValue>
  extends Pick<
    OriginCascaderProps<DataItem, Value>,
    | 'wideMatch'
    | 'onFilter'
    | 'filterText'
    | 'zIndex'
    | 'data'
    | 'childrenKey'
    | 'renderItem'
    | 'filterDataChange'
    | 'height'
    | 'loading'
    | 'expandTrigger'
    | 'placeholder'
  > {
  fixed: string
  focus: boolean
  parentElement: HTMLElement
  'data-id': string
  datum: DatumTree<DataItem>
  getRef: () => void
  onChange: (value: Value, Data?: DataItem) => void
  onPathChange: (key: Value[0], item: DataItem | null, keys: Value, is?: boolean) => void
}

export interface FilterItemProps<DataItem, Value extends BaseValue>
  extends Omit<FilterListProps<DataItem, Value>, 'data' | 'childrenKey' | 'height' | 'loading' | 'wideMatch'> {
  data: DataItem[]
}

export declare class FilterList<DataItem, Value extends BaseValue> extends React.Component<
  GetAbsoluteProps<FilterListProps<DataItem, Value>>,
  any
> {
  render(): JSX.Element
}

export type FilterListType = typeof FilterList

/** ------ CascaderList ------ * */
export interface CascaderListProps<DataItem, Value extends BaseValue>
  extends Pick<
    OriginCascaderProps<DataItem, Value>,
    'renderItem' | 'keygen' | 'loader' | 'onItemClick' | 'expandTrigger' | 'childrenKey' | 'data'
  > {
  datum: FilterListProps<DataItem, Value>['datum']
  onChange: FilterListProps<DataItem, Value>['onChange']
  onPathChange: FilterListProps<DataItem, Value>['onPathChange']
  multiple: boolean
  text?: ObjectType
  id: Value[0]
  parentId: Value[0]
  path: Value
}

/** ------ Node ------ * */
export interface NodeProps<DataItem, Value extends BaseValue> extends Omit<CascaderListProps<DataItem, Value>, 'data'> {
  active: boolean
  data: DataItem
}

/** ------ result ------ * */

export interface ResultProps<DataItem, Value extends BaseValue>
  extends Omit<OriginCascaderProps<DataItem, Value>, 'disabled'> {
  datum: DatumTree<DataItem>
  onPathChange: FilterListProps<DataItem, Value>['onPathChange']
  showList: () => void
  focus: boolean
  handleRemove: (data: DataItem) => void
  onClear: () => void
  multiple: boolean
  bindInput: (Input: any) => void
  selectId: string
}

export interface ResultItemProps<DataItem> {
  children: ReactNode
  close: (data: DataItem, isPopover: boolean, e: Event) => void
  className: string
  data: DataItem
  isPopover: boolean
  singleRemove?: boolean
  click: (data: DataItem, isPopover: boolean) => void
  only: boolean
}

/** ------ CascaderProps ------ * */
type CascaderPropsWithTableConsumber<Item, Value extends BaseValue> = GetTableConsumerProps<
  OriginCascaderProps<Item, Value>
>
type CascaderPropsWithFilter<Item, Value extends BaseValue> = GetFilterProps<
  CascaderPropsWithTableConsumber<Item, Value>,
  Item
>
type CascaderPropsWithBorder<Item, Value extends BaseValue> = GetInputBorderProps<CascaderPropsWithFilter<Item, Value>>
type CascaderPropsWithInput<Item, Value extends BaseValue> = GetInputableProps<
  CascaderPropsWithBorder<Item, Value>,
  Value
>
export type CascaderProps<Item, Value extends BaseValue> = CascaderPropsWithInput<Item, Value>

export declare class CascaderClass<Item, Value extends BaseValue> extends React.Component<
  CascaderProps<Item, Value>,
  {}
> {
  render(): JSX.Element
}

export type CascaderType = typeof CascaderClass
