import React, { ReactNode } from 'react'
import { PaginationProps } from '../Pagination'
import { StandardProps, StructDataStandardProps, ListItemStandardProps, RegularAttributes } from '../@types/common'

export interface ListProps<Item, Value>
  extends StandardProps,
    StructDataStandardProps<Item>,
    ListItemStandardProps<Item, Value> {
  value?: Value[]
  fixed?: boolean
  height?: number
  bordered?: boolean
  lineHeight?: number
  rowsInView?: number
  empty?: string | ReactNode
  scrollLoading?: () => void
  pagination?: PaginationProps
  size?: RegularAttributes.Size
  loading?: boolean | ReactNode
  footer?: ReactNode | (() => ReactNode)
  onChange?: (rowData: Value[], index: number) => void
  rowClassName?: (rowData: Item, index: number) => string
}

export interface ListBaseItemProps {
  desc?: string
  title?: string
  colNum?: number
  className?: string
  extra?: Array<ReactNode> | ReactNode
  avatar?: string | ReactNode | (() => ReactNode)
  content?: string | ReactNode | (() => ReactNode)
}

export class BaseItemClass extends React.Component<ListBaseItemProps, {}> {
  // @ts-ignore
  render(): JSX.Element
}

export class ListClass<Item, Value> extends React.Component<ListProps<Item, Value>, {}> {
  static BaseItem: typeof BaseItemClass
  // @ts-ignore
  render(): JSX.Element
}

export type ListType = typeof ListClass
