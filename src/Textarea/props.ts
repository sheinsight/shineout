import { ReactNode, FocusEventHandler, KeyboardEvent, TextareaHTMLAttributes } from 'react'
import { InputTitleProps } from '../InputTitle/props'
import { GetDelayProps, GetInputBorderProps, GetTrimProps } from '../hoc/Props'
import { GetInputableProps } from '../Form/Props'
import { ForceAdd } from '../@types/common'

export interface OriginTextareaProps extends Pick<InputTitleProps, 'innerTitle' | 'placeTitle'> {
  autosize?: boolean
  info?: number | ((value?: string) => ReactNode)
  maxHeight?: number
  onBlur?: FocusEventHandler<HTMLTextAreaElement>
  onChange: (value: string) => void
  forceChange: (value: string) => void
  onEnterPress?: (value: string, e: KeyboardEvent<HTMLTextAreaElement>) => void
  rows?: number
  value?: string
  resize?: boolean
  renderFooter?: (value?: string) => ReactNode
  inputFocus?: boolean
}

// 增加原生属性
type TextareaPropsWithOrigin = ForceAdd<OriginTextareaProps, TextareaHTMLAttributes<HTMLTextAreaElement>>

// hoc
type TextareaPropsWithTrim = GetTrimProps<TextareaPropsWithOrigin>
export type TextareaPropsWithDelay = GetDelayProps<TextareaPropsWithTrim>
type TextareaPropsWithBorder = GetInputBorderProps<TextareaPropsWithDelay>
type TextareaPropsWithInputAble = GetInputableProps<TextareaPropsWithBorder, string>

// 禁用一些属性
type TextareaPropsBan = Omit<TextareaPropsWithInputAble, 'innerTitle' | 'placeTitle'>

export type TextareaProps = TextareaPropsBan
