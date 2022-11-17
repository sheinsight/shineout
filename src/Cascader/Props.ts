import React, { ReactNode } from 'react'
import { keyType, LiteralUnion, StandardProps, RegularAttributes, keygenType, ObjectType } from '../@types/common'
import { GetInputableProps } from '../Form/Props'
import DatumTree from '../Datum/Tree'
import { GetInputBorderProps } from '../hoc/Props'
import { GetAbsoluteProps } from '../AnimationList/Props'

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
  keygen: keygenType<DataItem>
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
export interface OriginCascaderProps<DataItem, Value extends BaseValue> extends StandardProps {
  value?: Value
  data?: DataItem[]
  height?: number
  unmatch?: boolean
  absolute?: boolean
  underline?: boolean
  clearable?: boolean
  wideMatch?: boolean
  showArrow?: boolean
  innerTitle?: ReactNode
  finalDismiss?: boolean
  singleRemove?: boolean
  compressedBound?: number
  mode?: 0 | 1 | 2 | 3 | 4
  loading?: boolean | ReactNode
  size?: RegularAttributes.Size
  childrenKey: LiteralUnion<DataItem>
  compressed?: boolean | 'no-repeat'
  onCollapse?: (collapse: boolean) => void
  loader?: (key: keyType, data: DataItem) => void
  disabled?: ((data: DataItem) => boolean) | boolean
  expandTrigger?: 'click' | 'hover' | 'hover-only'
  onChange: (value: Value, selected?: DataItem) => void
  onFilter?: (text: string) => void
  keygen: ((data: DataItem, parentKey?: keyType) => keyType) | LiteralUnion<DataItem>
  getComponentRef?: (comp: componentRef) => void | { current?: componentRef }
  renderItem: LiteralUnion<DataItem> | ((data: DataItem, active?: boolean, id?: Value[0]) => React.ReactNode)
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
  GetInputBorderProps<GetFilterProps<OriginCascaderProps<Item, Value>, Item>>,
  Value
>

export declare class CascaderClass<Item, Value extends BaseValue> extends React.Component<
  CascaderProps<Item, Value>,
  {}
> {
  render(): JSX.Element
}

export type CascaderType = typeof CascaderClass
