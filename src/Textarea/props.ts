import { ReactNode, FocusEventHandler, KeyboardEvent, TextareaHTMLAttributes } from 'react'
import { InputTitleProps } from '../InputTitle/props'
import { GetDelayProps, GetInputBorderProps, GetTrimProps } from '../hoc/Props'
import { GetInputableProps } from '../Form/Props'
import { ForceAdd } from '../@types/common'

export interface OriginTextareaProps extends Pick<InputTitleProps, 'innerTitle' | 'placeTitle'> {
  /**
   * Whether the height changes automatically with the content
   *
   * 高度是否随内容自动变化
   *
   * default: false
   */
  autosize?: boolean
  /**
   * Infomation
   *
   * 提示信息
   *
   * default: -
   */
  info?: number | ((value?: string) => ReactNode)
  /**
   * the maxHeight of the textarea, scroll bars appear after more than
   *
   * 输入框的最大高度, 超过之后会出现滚动条
   *
   * default: -
   */
  maxHeight?: number | string
  /**
   * The callback when Textarea blur
   *
   * 失去焦点后的回调
   *
   * default: -
   */
  onBlur?: FocusEventHandler<HTMLTextAreaElement>
  onChange: (value: string) => void
  forceChange: (value: string) => void
  onEnterPress?: (value: string, e: KeyboardEvent<HTMLTextAreaElement>) => void
  /**
   * The minimum row height. Same as native textarea rows property.
   *
   * 最小行高，同原生 textarea rows 属性
   *
   * default: 4
   */
  rows?: number
  value?: string
  /**
   * support resize
   *
   * 是否可以伸缩高度
   *
   * default: false
   */
  resize?: boolean
  /**
   * render textarea footer
   *
   * 渲染 textarea footer
   *
   * default: -
   */
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
