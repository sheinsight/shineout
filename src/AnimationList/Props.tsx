import * as React from 'react'
import { GetScrollContextConsumerValue } from '../Scroll/Props'
import { GetZIndexConsumerProps } from '../Modal/Props'
import { ForceAdd, KeygenType, StandardProps } from '../@types/common'

type ListPosition = 'drop-down' | 'drop-up'
type PickerPosition = 'left-bottom' | 'left-top' | 'right-bottom' | 'right-top'
type DropdownPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

export type ListDurationType = 'fast' | 'slow' | number
export type ListAnimationType = 'collapse' | 'fade' | 'scale-y' | 'scale-x'

export interface AbsoluteProps {
  focus?: boolean
  fixed?: boolean | 'min' // same width with parentElement
  parentElement?: HTMLElement
  position?: ListPosition | PickerPosition | DropdownPosition
  absolute?: boolean | (() => HTMLElement)
  scrollElement?: HTMLElement
  scrollLeft?: number
  scrollTop?: number
  rootClass?: string
  zIndex?: number
  style?: React.CSSProperties
  autoClass?: StyleSheet
  value?: any
  getResetPosition?: (resetFunc: () => void) => void
  autoAdapt?: boolean
}

type GetAbsolutePropsIn<Props> = Omit<ForceAdd<Props, AbsoluteProps>, 'getRef'>

export type GetAbsoluteProps<Props> = GetZIndexConsumerProps<GetScrollContextConsumerValue<GetAbsolutePropsIn<Props>>>

/** -----------List----------* */
export interface ListProps extends StandardProps {
  show?: boolean
  getRef?: (el: HTMLDivElement) => void
  children?: React.ReactNode
}

/** -----------lazyList----------* */
export interface LazyListProps<DataItem> extends StandardProps {
  stay?: boolean
  data: DataItem[]
  lineHeight?: number
  colNum?: number
  itemsInView?: number
  height?: number
  renderItem: (d: DataItem, i: number) => React.ReactNode
  keygen: KeygenType<DataItem>
  // 强制触发更新
  force?: any
}
