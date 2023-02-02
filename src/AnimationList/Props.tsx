import * as React from 'react'
import { GetScrollContextConsumerValue } from '../Scroll/Props'
import { GetZIndexConsumerProps } from '../Modal/Props'
import { ForceAdd, KeygenType, RegularAttributes, StandardProps } from '../@types/common'

type PickerPosition = 'left-bottom' | 'left-top' | 'right-bottom' | 'right-top'
type DropdownPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

export type ListDurationType = 'fast' | 'slow' | number
export type ListAnimationType = 'collapse' | 'fade' | 'scale-y' | 'scale-x'

export interface AbsoluteProps {
  focus?: boolean
  fixed?: boolean | 'min' // same width with parentElement
  parentElement?: HTMLElement
  position?: RegularAttributes.ListPosition | PickerPosition | DropdownPosition
  /**
   * When it is true, the pop-up layer of option append into document.body.
   *
   * 为 true 时，选项弹出层在 DOM 中独立 render
   *
   * default: false
   */
  absolute?: boolean | (() => HTMLElement)
  scrollElement?: HTMLElement
  scrollLeft?: number
  scrollTop?: number
  rootClass?: string
  /**
   * options z-index
   *
   * 选项列表 z-index 值
   *
   * default: 1000
   */
  zIndex?: number
  style?: React.CSSProperties
  autoClass?: string
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
  onMouseMove?: () => void
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
