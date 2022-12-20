import React from 'react'
import { KeygenType, LiteralUnion } from '../@types/common'

export type Direction = 'X' | 'Y'

export type WH = 'width' | 'height'

export type Position = 'Top' | 'Left'

export type Mode = 'inline' | 'vertical' | 'horizontal' | 'vertical-auto'

export interface MenuProvider {
  bindItem: <Active, Open, InPath>(id: string, active: Active, open: Open, inPath: InPath) => [Active, Open, InPath]
  unbindItem: (id: string) => void
}

export type MenuProviderProps<U> = Omit<U, 'bindItem' | 'unbindItem'>

export interface RootProps<Item, Value> {
  mode: Mode
  data: Item[]
  theme?: 'dark'
  height?: number
  openKeys?: Value[]
  className?: string
  caretColor?: string
  frontCaret?: boolean
  inlineIndent?: number
  toggleDuration?: number
  looseChildren?: boolean
  keygen: KeygenType<Item>
  defaultOpenKeys?: Value[]
  parentSelectable?: boolean
  style?: React.CSSProperties
  onClick?: (data: Item) => void
  active?: (data: Item) => boolean
  disabled?: (data: Item) => boolean
  frontCaretType?: 'hollow' | 'solid'
  onOpenChange?: (keys: Value[]) => void
  linkKey?: ((d: Item) => string) | LiteralUnion<Item>
  renderItem: ((data: Item, index: number) => React.ReactElement | React.ReactNode) | LiteralUnion<Item>
}

export interface ListProps<Item> {
  mode: Mode
  path: string
  data: Item[]
  level: number
  open?: boolean
  topLine?: number
  className?: string
  bottomLine?: number
  caretColor?: string
  frontCaret?: boolean
  inlineIndent?: number
  looseChildren?: boolean
  toggleDuration?: number
  parentSelectable?: boolean
  style?: React.CSSProperties
  disabled?: (data: Item) => boolean
  frontCaretType?: 'hollow' | 'solid'
  linkKey?: ((d: Item) => string) | LiteralUnion<Item>
  onClick?: (id: string, data: Item) => void
  toggleOpenKeys: (id: string, open: boolean) => void
  keygen: KeygenType<Item>
  renderItem: ((data: Item, index: number) => React.ReactNode)
}

export interface BaseItemProps<Item> {
  children?: []
  disabled?: (data: Item) => boolean
  onClick?: boolean | ((id: string, data: Item) => void)
}
export interface ItemProps<Item> extends Omit<ListProps<Item>, 'data' | 'renderItem'> {
  data: Item
  index: number
  unbindItem: (id: string) => void
  renderItem: ((data: Item, index: number) => React.ReactNode)
  bindItem: <Active, Open, InPath>(id: string, active: Active, open: Open, inPath: InPath) => [Active, Open, InPath]
}
