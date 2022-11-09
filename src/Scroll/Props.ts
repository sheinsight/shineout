
export interface ScrollContextProviderValue {
  element?: HTMLElement
  left?: number
  top?: number
}

export type GetScrollContextConsumerValue<U> = Omit<U, 'scrollElement' | 'scrollLeft' | 'scrollTop'>

export interface BarProps {
  barLength?: number
  className?: string
  direction?: 'x' | 'y'
  forceHeight?: number
  length?: number
  offset?: number
  onScroll: () => void,
  scrollLength: number,
}


