import React, { ReactNode } from 'react'
import { keyType, LiteralUnion, StandardProps, RegularAttributes, KeygenType, ObjectType } from '../@types/common'
import { GetInputableProps } from '../Form/Props'
import DatumTree from '../Datum/Tree'
import { GetInputBorderProps } from '../hoc/Props'
import { GetAbsoluteProps } from '../AnimationList/Props'
import { getTableConsumerProps } from '../Table/Props'

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

export type GetFilterProps<Props, DataItem, Value extends BaseValue> = Omit<
  Props,
  'filterText' | 'filterDataChange' | 'firstMatchNode' | 'onFilter' | 'childrenKey'
> &
  Pick<BaseCascaderProps<DataItem, Value>, 'onFilter' | 'childrenKey'>

/** ------ Cascader ------ * */
export interface BaseCascaderProps<DataItem, Value extends BaseValue> extends StandardProps {
  value?: Value

  /**
   * data. The child node is children. If the children value is null or its length is 0, it is render as a leaf node.
   *
   * 数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点
   *
   * default: []
   */
  data?: DataItem[]
  height?: number

  /**
   * render unmatch value
   *
   * 是否展示data中不存在的值
   *
   * default: -
   */
  unmatch?: boolean

  /**
   * When it is true, the pop-up layer of option append into document.body.
   *
   * 为 true 时，选项弹出层在 DOM 中独立 render
   *
   * default: false
   */
  absolute?: boolean

  /**
   * show border bottom
   *
   * 仅仅展示下边框
   *
   * default: false
   */
  underline?: boolean

  /**
   * If clearable is true, show clear value icon
   *
   * 是否显示清除数据图标
   *
   * default: true
   */
  clearable?: boolean
  wideMatch?: boolean

  /**
   * show dropdown arrow, only single select
   *
   * 是否显示下拉箭头，仅针对单选情况
   *
   * default: true
   */
  showArrow?: boolean
  innerTitle?: ReactNode

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
   * mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node.
   *
   * 选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点
   *
   * default: -
   */
  mode?: 0 | 1 | 2 | 3 | 4

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
  childrenKey?: LiteralUnion<DataItem>

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
  onFilter?: (text: string) => ((data: DataItem) => boolean) | undefined | void

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
   *  When it is a string, return d\[string]. When it is a function, return the result of this function.
   *
   *  为 string 时，返回 d[string]，为 function 时，返回函数结果
   *
   *  default: -`
   *
   */
  renderItem: LiteralUnion<DataItem> | ((data: DataItem, active?: boolean, id?: Value[0]) => React.ReactNode)

  /**
   *  The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected
   *
   *  选中后在结果中显示的内容，默认和 renderItem 相同。返回 null 则不展示，result 为当前选中的所有值。
   *
   *  default: -
   *
   */
  renderResult?: LiteralUnion<DataItem> | ((data: DataItem, row: DataItem[]) => React.ReactNode)
  position?: 'drop-up' | 'drop-down'
  firstMatchNode: DataItem
  filterText: string
  filterDataChange: (data: DataItem) => boolean
  zIndex?: number
  onBlur: (e?: MouseEvent) => void
  onFocus: (e?: FocusEvent) => void
  onItemClick?: (e: MouseEvent) => void
  placeholder?: ReactNode
  trim?: boolean
}

/** ------ filterList ------ * */
export interface FilterListProps<DataItem, Value extends BaseValue>
  extends Pick<
    BaseCascaderProps<DataItem, Value>,
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
  datum: DatumTree<DataItem, Value>
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
    BaseCascaderProps<DataItem, Value>,
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
  extends Omit<BaseCascaderProps<DataItem, Value>, 'disabled'> {
  datum: DatumTree<DataItem, Value>
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
export type CascaderProps<Item, Value extends BaseValue> = GetInputableProps<
  GetInputBorderProps<GetFilterProps<BaseCascaderProps<Item, Value>, Item, Value>>,
  Value
>

export type CascaderPropsWidthAbsolute<Item, Value extends BaseValue> = getTableConsumerProps<
  BaseCascaderProps<Item, Value>
>
export type CascaderPropsWidthFilter<Item, Value extends BaseValue> = GetFilterProps<
  BaseCascaderProps<Item, Value>,
  Item,
  Value
>
export type CascderPropsWidthInputBorder<Item, Value extends BaseValue> = GetInputBorderProps<
  CascaderPropsWidthFilter<Item, Value>
>
export type CascaderPropwWidthInputable<Item, Value extends BaseValue> = GetInputableProps<
  CascderPropsWidthInputBorder<Item, Value>,
  Value
>
export type GetCascaderProps<Item, Value extends BaseValue> = CascaderPropwWidthInputable<Item, Value>

export declare class CascaderClass<Item, Value extends BaseValue> extends React.Component<
  GetCascaderProps<Item, Value>
> {
  render(): JSX.Element
}

export type CascaderType = typeof CascaderClass
