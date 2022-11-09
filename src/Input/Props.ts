import * as React from 'react'
import { PopoverProps } from '../Popover/interface'
import { StandardProps, RegularAttributes, FormItemStandardProps } from '../@types/common'
import { GetInputableProps } from '../Form/Props'
import { GetInputBorderProps, GetDelayProps } from '../hoc/Props'

type ReactNode = React.ReactNode
export type numType = 'positive' | 'non-negative'

export interface Props<Value = string> extends StandardProps, FormItemStandardProps<Value> {
  width?: number
  delay?: number
  clearable?: boolean | (() => void)
  onEnterPress?: (value: Value, e?: any) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  onKeyUp?: (e: React.KeyboardEvent) => void
  onMouseDown?: () => void
  onMouseUp?: () => void
  popover?: RegularAttributes.Position
  size?: RegularAttributes.Size
  tip?: ReactNode
  trim?: boolean
  type?: string
  coin?: boolean
  info?: ((msg: string) => string) | number
  popoverProps?: PopoverProps
  maxLength?: number
  forwardedRef?: (el: HTMLElement) => void
  underline?: boolean
  innerTitle?: ReactNode
  placeTitle?: ReactNode
  clearToUndefined?: boolean
  digits?: number
  integerLimit?: number
  numType?: numType
  nonnegative?: boolean
  autoSelect?: boolean
  autoFix?: boolean
  htmlName?: string
  disabled?: boolean
  inputFocus?: boolean
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  cancelChange?: () => void
  forceChange?: (value: unknown, ...args: unknown[]) => void
  onFocus?: (e: React.MouseEvent<HTMLElement>) => void
}

export type InputProps<Value> = GetInputableProps<GetInputBorderProps<GetDelayProps<Props<Value>>>, Value>

export class InputClass<Value = string> extends React.Component<InputProps<Value>, {}> {
  static Number: typeof InputNumberClass
  static Password: typeof InputPasswordClass
  static Group: typeof InputGroupClass
  // @ts-ignore
  render(): JSX.Element
}

export type InputType = typeof InputClass

export interface ClearProps {
  onClick: (e: React.ChangeEvent<Element>, clearClick: boolean) => void
  clearResult?: string
}

// Input.Number 对内
export interface InputNumber extends Props {
  min?: number
  max?: number
  step?: number
  value: string
  disabled?: boolean
  allowNull?: boolean
  hideArrow?: boolean
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange: (value: string | number | null | undefined) => void
}
// Input.Number 对外
export type InputNumberProps<Value = string> = GetInputableProps<GetInputBorderProps<InputNumber>, Value>

export class InputNumberClass extends React.Component<InputNumberProps, {}> {
  // @ts-ignore
  render(): JSX.Element
}

// Input.Password 对内
export interface InputPassword extends Props {
  point?: string
  value: string
  onChange: (value: string) => void
}

// Input.Password 对外
export type InputPasswordProps<Value = string> = GetInputableProps<GetInputBorderProps<InputPassword>, Value>

export class InputPasswordClass extends React.Component<InputPasswordProps, {}> {
  // @ts-ignore
  render(): JSX.Element
}

export interface InputGroupBaseProps {
  children: ReactNode
}

export interface InputGroupProps<Value = string> extends InputGroupBaseProps, InputProps<Value> {}

export class InputGroupClass extends React.Component<InputGroupProps, {}> {
  // @ts-ignore
  render(): JSX.Element
}
