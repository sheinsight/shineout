import { GetScrollContextConsumerValue } from '../Scroll/Props'
import { GetZIndexConsumerProps } from '../Modal/Props'
import { ForceAdd } from '../@types/common'

type ListPosition = 'drop-down' | 'drop-up'
type PickerPosition = 'left-bottom' | 'left-top' | 'right-bottom' | 'right-top'
type DropdownPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

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
