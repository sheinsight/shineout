import React, { ReactNode } from 'react'
import { KeygenResult, ObjectKey, RegularAttributes, KeygenType, ObjectType, StandardProps } from '../@types/common'
import { GetInputableProps } from '../Form/Props'
import DatumTree, { TreeDatumOptions } from '../Datum/Tree'
import { GetInputBorderProps } from '../hoc/Props'
import { AbsoluteProps, GetAbsoluteProps } from '../AnimationList/Props'
import { GetTableConsumerProps } from '../Table/Props'
import { InputTitleProps } from '../InputTitle/Props'

/**
 * @title CascaderRef
 * @isDetail true
 */
interface ComponentRef {
  /**
   * @en Close the drop-down box
   * @cn 关闭下拉框
   */
  close: (e?: MouseEvent) => void
}

export type CascaderBaseValue = (string | number)[]

/** ------ filterHoc ------ * */

export interface FilterProps<DataItem> extends Pick<TreeDatumOptions<DataItem>, 'mode'> {
  /**
   * @en the key of the children data name
   * @cn 指定子数据的属性名
   * @default 'children'
   */
  childrenKey?: ObjectKey<DataItem>
  data: DataItem[]

  /**
   * @en The delay in milliseconds before the filter event is triggered by user input.
   * @cn 用户输入触发 fitler 事件的延时，单位为毫秒。
   * @default 'children'
   */
  filterDelay?: number

  keygen: KeygenType<DataItem>
  /**
   *
   * @en When the onFilter is not empty, you can filter data by input.
   * If the onFilter returns a function, use this function as a front-end filter.
   * If return undefined, you can do your own backend filtering.
   * support in single selection state
   *
   * @cn onFilter 不为空时，可以输入过滤数据
   * onFilter 如果返回一个函数，使用这个函数做前端过滤
   * 如果不返回，可以自行做后端过滤
   * 单选状态下支持
   */
  onFilter?: (text: string) => ((data: DataItem) => boolean) | undefined | void
}

export type GetFilterProps<Props, DataItem> = Omit<
  Props,
  'filterText' | 'filterDataChange' | 'firstMatchNode' | 'onFilter' | 'childrenKey' | 'sourceData'
> &
  Pick<FilterProps<DataItem>, 'onFilter' | 'childrenKey' | 'filterDelay'>

export interface OriginCascaderProps<DataItem, Value extends CascaderBaseValue>
  extends Pick<AbsoluteProps, 'absolute' | 'zIndex'>,
    Pick<InputTitleProps, 'innerTitle'>,
    Pick<TreeDatumOptions<DataItem>, 'mode'>,
    Pick<StandardProps, 'style'> {
  /**
   * @inner 源数据
   */
  sourceData?: DataItem[]
  /**
   * @en Form field, used with Form
   * @cn 表单字段, 配合 Form 使用
   */
  name?: string
  /**
   * @en Only the last node can be selected
   * @cn 单选只支持选末级节点
   */
  final?: boolean
  /**
   * @en Custom render dropdown
   * @cn 自定义渲染下拉列表
   */
  renderOptionList?: (list: React.ReactElement, info: { loading: boolean }) => React.ReactElement
  /**
   * @en Custom rendering unmatched values
   * @cn 渲染未匹配值的方式
   */
  renderUnmatched?: (data: any) => ReactNode
  inputFocus: boolean
  /**
   * @en Set visible of cascader popup
   * @cn 控制浮层显隐
   */
  open?: boolean
  /**
   * @en Selected key (controlled)
   * @cn 选中的 key （受控)
   */
  value?: Value
  /**
   * @en data. The child node is children. If the children value is null or its length is 0, it is render as a leaf node
   * @cn 数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点
   * @override any[]
   */
  data?: DataItem[]
  /**
   * @en height of dropdown options
   * @cn 下拉列表高度
   * @default 300
   */
  height?: number
  /**
   * @en render unmatch value
   * @cn 是否展示data中不存在的值
   * @default true
   */
  unmatch?: boolean
  /**
   * @en If clearable is true, show clear value icon
   * @cn 是否显示清除数据图标
   * @default true
   */
  clearable?: boolean
  /**
   * @en Allows all possible matching options to be choosed
   * @cn 开启 wideMatch 后，将筛选出所有可能的匹配项目
   * @default false
   */
  wideMatch?: boolean
  /**
   * @en show dropdown arrow, only single select
   * @cn 是否显示下拉箭头，仅针对单选情况
   * @default true
   */
  showArrow?: boolean
  /**
   * @en close options after chose the final node
   * @cn 选择末级节点后是否关闭选项列表
   * @default false
   */
  finalDismiss?: boolean
  /**
   * @en Support single node deletion
   * @cn 支持单个节点删除
   */
  singleRemove?: boolean
  /**
   * @en when compressed is True,the comptessedBound can limit the numbers of multiple selected item's label
   * @cn 开启多选后，指定允许展示标签数量，超过后将折叠
   */
  compressedBound?: number
  /**
   *  @en dropdown list loading state
   *  @cn 下拉列表加载状态
   *  @override boolean | ReactNode
   *
   */
  loading?: boolean | ReactNode
  /**
   * @en size
   * @cn 尺寸
   * @override union
   * @default 'default'
   */
  size?: RegularAttributes.Size
  /**
   * @en the key of the children data name
   * @cn 指定子数据的属性名
   * @default 'children'
   */
  childrenKey: ObjectKey<DataItem>
  /**
   * @en Merges selected values; the repeat value will not appear in the Popover when it is'no-repeat'
   * @cn 将选中值合并。为'no-repeat'时弹出框中不重复展示值
   * @default false
   */
  compressed?: boolean | 'no-repeat'
  /**
   * @en options collapse callback
   * @cn 下拉列表展开/收起回调
   */
  onCollapse?: (collapse: boolean) => void
  /**
   * @en If the loader attribute is a function, the node with no children is regarded as dynamically loaded node. Click expanded button to trigger the loader event. The children property is null or its length is 0 will be regarded as a leaf node.
   * @cn 设置 loader 属性后，未定义 children 的节点视为动态加载节点，点击展开触发 loader 事件，children 为 null 或者长度为 0 视为叶子节点
   */
  loader?: (key: KeygenResult, data: DataItem) => void
  /**
   * @en When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function.
   * @cn 当 disabled 为 true 时，禁用整个选择框。如果 disabled 为函数，根据函数反回结果禁用选项
   * @default false
   */
  disabled?: ((data: DataItem) => boolean) | boolean
  /**
   * @en Expand mode
   * @cn 节点展开触发方式
   * @default 'click'
   */
  expandTrigger?: 'click' | 'hover' | 'hover-only'
  /**
   * @en When the onChange property is set, the selection box is displayed. The parameter is the current selected value, which is related to the mode property.
   * @cn 设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关
   */
  onChange: (value: Value, selected?: DataItem) => void
  /**
   * @en When the onFilter is not empty, you can filter data by input.If the onFilter returns a function, use this function as a front-end filter.If return undefined, you can do your own backend filtering.support in single selection state.
   * @cn onFilter 不为空时，可以输入过滤数据;onFilter 如果返回一个函数，使用这个函数做前端过滤;如果不返回，可以自行做后端过滤;单选状态下支持
   */
  onFilter?: (text: string) => void
  /**
   * @en Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id.
   * @cn 生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 'id'，相当于 (d) => d.id
   * @default index
   */
  keygen: ((data: DataItem, parentKey?: KeygenResult) => KeygenResult) | ObjectKey<DataItem>
  /**
   *  @en A reference to the binding component, you can call some component methods
   *  @cn 绑定组件的引用, 可以调用某些组件的方法
   *
   */
  getComponentRef?: ((comp: ComponentRef) => void) | { current: ComponentRef | undefined }
  /**
   * @en When 'renderItem' is a string, it returns DataItem[string]. If it's a function, it returns the result of the function.
   * @cn 当 renderItem 为 string 时，返回 DataItem\\[string]。 若为函数时，则返回函数结果
   * @default d => d
   */
  renderItem: ObjectKey<DataItem> | ((data: DataItem, active?: boolean, id?: Value[0]) => React.ReactNode)
  /**
   * @en The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected
   * @cn 选中后在结果中显示的内容，默认和 renderItem 相同
   * @default renderItem
   */
  renderResult?: ObjectKey<DataItem> | ((data: DataItem, row: DataItem[]) => React.ReactNode)
  /**
   * @inner 弹出位置
   */
  position?: 'drop-up' | 'drop-down'
  firstMatchNode: DataItem
  filterText: string
  filterDataChange: (data: DataItem) => boolean
  /**
   * @en blur event
   * @cn 失焦事件
   */
  onBlur: (e?: MouseEvent) => void
  /**
   * @en focus event
   * @cn 聚焦事件
   */
  onFocus: (e?: FocusEvent) => void
  /**
   * @en placeholder
   * @cn 占位符
   */
  placeholder?: ReactNode
  /**
   * @inner 内部属性
   */
  trim?: boolean
}

/** ------ filterList ------ * */
export interface FilterListProps<DataItem, Value extends CascaderBaseValue>
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
    | 'renderOptionList'
  > {
  shouldFinal: boolean
  fixed: string
  focus: boolean
  parentElement: HTMLElement
  'data-id': string
  datum: DatumTree<DataItem>
  getRef: () => void
  onChange: (value: Value, Data?: DataItem) => void
  onPathChange: (key: Value[0], item: DataItem | null, keys: Value, is?: boolean) => void
}

export interface FilterItemProps<DataItem, Value extends CascaderBaseValue>
  extends Omit<FilterListProps<DataItem, Value>, 'data' | 'childrenKey' | 'height' | 'loading' | 'wideMatch'> {
  data: DataItem[]
}

export declare class FilterList<DataItem, Value extends CascaderBaseValue> extends React.Component<
  GetAbsoluteProps<FilterListProps<DataItem, Value>>,
  any
> {
  render(): JSX.Element
}

export type FilterListType = typeof FilterList

/** ------ CascaderList ------ * */
export interface CascaderListProps<DataItem, Value extends CascaderBaseValue>
  extends Pick<
    OriginCascaderProps<DataItem, Value>,
    'renderItem' | 'keygen' | 'loader' | 'expandTrigger' | 'childrenKey' | 'data'
  > {
  shouldFinal: boolean
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
export interface NodeProps<DataItem, Value extends CascaderBaseValue>
  extends Omit<CascaderListProps<DataItem, Value>, 'data'> {
  active: boolean
  data: DataItem
}

/** ------ result ------ * */

export interface ResultProps<DataItem, Value extends CascaderBaseValue>
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
type CascaderPropsWithTableConsumber<Item, Value extends CascaderBaseValue> = GetTableConsumerProps<
  OriginCascaderProps<Item, Value>
>
type CascaderPropsWithFilter<Item, Value extends CascaderBaseValue> = GetFilterProps<
  CascaderPropsWithTableConsumber<Item, Value>,
  Item
>
type CascaderPropsWithBorder<Item, Value extends CascaderBaseValue> = Omit<
  GetInputBorderProps<CascaderPropsWithFilter<Item, Value>>,
  'autoFocus'
>
type CascaderPropsWithInput<Item, Value extends CascaderBaseValue> = GetInputableProps<
  CascaderPropsWithBorder<Item, Value>,
  Value
>

/**
 * @title Cascader
 */
export type CascaderProps<Item, Value extends CascaderBaseValue> = CascaderPropsWithInput<Item, Value>

export declare class CascaderClass<Item, Value extends CascaderBaseValue> extends React.Component<
  CascaderProps<Item, Value>,
  {}
> {
  render(): JSX.Element
}

export type CascaderType = typeof CascaderClass
