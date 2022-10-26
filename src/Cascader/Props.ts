import {
  keyType,
  LiteralUnion,
  StandardProps,
  RegularAttributes,
  FormItemStandardProps,
  StructDataStandardProps,
} from '../@types/common'
import React, { ReactNode } from 'react'
import { GetInputableProps } from '../Form/Props'

interface componentRef {
  close: (e: MouseEvent) => void
  [propName: string]: any
}

export interface CascaderProps<Item, Value>
  extends StandardProps,
    FormItemStandardProps<Value>,
    Omit<StructDataStandardProps<Item>, 'renderItem' | 'data'> {
  data?: Item[]
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
  childrenKey?: keyof Item & string
  compressed?: boolean | 'no-repeat'
  onCollapse?: (collapse: boolean) => void
  loader?: (key: keyType, data: Item) => void
  disabled?: ((data: Item) => boolean) | boolean
  expandTrigger?: 'click' | 'hover' | 'hover-only'
  onChange?: (value: Value, selected?: Item) => void
  onFilter?: (text: string) => (data: any) => boolean
  keygen: ((data: Item, parentKey?: keyType) => keyType) | keyof Item
  getComponentRef?: (comp: componentRef) => void | { current?: componentRef }
  renderItem?: LiteralUnion<Item> | ((data: Item, active?: boolean, id?: keyType) => React.ReactNode)
}

type Props<Item, Value> = GetInputableProps<CascaderProps<Item, Value>, Value>

export class CascaderClass<Item, Value> extends React.Component<Props<Item, Value>, {}> {
  // @ts-ignore
  render(): JSX.Element
}

export type CascaderType = typeof CascaderClass
