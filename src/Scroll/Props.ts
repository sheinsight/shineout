/** ------ context ------ */
import { CSSProperties, ReactNode } from 'react'

export interface ScrollContextProviderValue {
  element?: HTMLElement
  left?: number
  top?: number
}

export type ScrollFixedType = 'x' | 'y' | 'both'

export type GetScrollContextConsumerValue<U> = Omit<U, 'scrollElement' | 'scrollLeft' | 'scrollTop'>

/** ------ scroll ------ */
export interface ScrollProps {
  left: number
  top: number
  scrollHeight?: number
  scrollWidth?: number
  scrollX: boolean
  scrollY: boolean
  onScroll: (
    x: number,
    y: number,
    maxX: number,
    inner: HTMLElement,
    rectWidth: number,
    rectHeight: number,
    pixelX?: number,
    pixelY?: number,
    drag?: boolean
  ) => void
  stable?: boolean
  footer?: ReactNode
  innerScrollAttr?: string[]
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/** ------ bar ------ */
export interface BarProps {
  className?: string
  direction?: 'x' | 'y'
  forceHeight?: number
  length: number
  barLength: number
  offset: number
  onScroll: (offset: number) => void
  scrollLength: number
}

/** ------ fixedLength ------ */
export interface FixedLengthProps extends Omit<BarProps, 'barLength'> {}

/** ------ index ------ */
export interface ScrollIndexProps extends Omit<ScrollProps, 'left' | 'top' | 'scrollX' | 'scrollY'> {
  scrollLeft?: number
  scrollTop?: number
  scroll?: ScrollFixedType
  children?: ReactNode
}
