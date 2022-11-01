import { PopoverProps } from '../Popover/interface'
import { RegularAttributes } from '../@types/common'

export type MovableType<U> = U & {
  moveable?: boolean
}

export type ResizableType<Props> = Props & {
  resizable?: boolean | string
}

export type filterKeys =
  | 'border'
  | 'className'
  | 'tip'
  | 'popover'
  | 'width'
  | 'error'
  | 'popoverProps'
  | 'underline'
  | 'style'

interface BaseBorderProps {
  onBlur?: <T>(e?: T) => void
  onFocus?: <T>(e?: T) => void
  inputFocus?: boolean
}
export interface InputBorderProps extends BaseBorderProps {
  autoFocus?: boolean
  disabled?: boolean | (() => boolean)
  size?: RegularAttributes.Size
  border?: boolean
  className?: string
  tip?: any
  popover?: RegularAttributes.Position
  width?: string | number
  error?: Error
  popoverProps?: PopoverProps
  underline?: boolean
  style?: React.CSSProperties
}

export type GetInputBorderProps<Props> = Props &
  Omit<Props, 'onFocus' | 'onBlur' | 'inputFocus'> &
  Required<Pick<InputBorderProps, 'onBlur' | 'onFocus'>>
