export interface ScrollContextProviderValue {
  element?: HTMLElement
  left?: number
  top?: number
}

export type GetScrollContextConsumerValue<U> = Omit<U, 'scrollElement' | 'scrollLeft' | 'scrollTop'>

