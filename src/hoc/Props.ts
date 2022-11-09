import { RegularAttributes } from '../@types/common'
import { PopoverProps } from '../Popover/interface'
import { ForceAdd } from '../@types/common'
export type MovableType<U> = U & {
  moveable?: boolean
}

export type ResizableType<Props> = Props & {
  resizable?: boolean | string
}

type InputBorderFilterType =
  | 'border'
  | 'className'
  | 'tip'
  | 'popover'
  | 'width'
  | 'error'
  | 'popoverProps'
  | 'underline'
  | 'style'
interface BaseInputBorderProps {
  onBlur?: (e: React.MouseEvent<HTMLElement>) => void
  onFocus?: (e: React.MouseEvent<HTMLElement>) => void
  inputFocus?: boolean
}
export interface InputBorderProps {
  autoFocus?: boolean
  disabled?: boolean | (() => boolean)
  onBlur?: (e: React.MouseEvent<HTMLElement>) => void
  onFocus?: (e: React.MouseEvent<HTMLElement>) => void
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

// 过滤掉原生属性 onFocus onBlur
type InputBorderPropsFiltered<Props> = Omit<Props, 'onFocus' | 'onBlur' | InputBorderFilterType>
// 将 onBlur onFocus 变成可选
type HandleValueProps<Props extends BaseInputBorderProps> = Omit<Props, 'onBlur' | 'onFocus'> &
  Partial<Pick<Props, 'onBlur' | 'onFocus'>>
// inputborder 中增加一些属性
type AddInputBorderProps<Props> = ForceAdd<HandleValueProps<Props>, BaseInputBorderProps>

export type GetInputBorderProps<Props> = AddInputBorderProps<Props> & InputBorderPropsFiltered<InputBorderProps>

export interface DelayProps<Value> {
  delay?: number
  value?: Value
  onChange: (...args: any) => void
}

export type GetDelayProps<Props> = Omit<Props, 'forceChange' | 'cancelChange'>

export interface CoinProps {
  value?: string | number
  type?: string
  onFocus?: (e: React.MouseEvent<HTMLElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onMouseDown?: (e: React.MouseEvent<HTMLElement>) => void
  onMouseUp?: (e: React.MouseEvent<HTMLElement>) => void
  onChange?: (value: string) => void
  coin?: boolean
}
