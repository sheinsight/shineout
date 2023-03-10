import { ReactNode, FocusEventHandler, KeyboardEvent, TextareaHTMLAttributes } from 'react'
import { InputTitleProps } from '../InputTitle/Props'
import { GetDelayProps, GetInputBorderProps } from '../hoc/Props'
import { GetInputableProps } from '../Form/Props'
import { ForceAdd } from '../@types/common'

export interface OriginTextareaProps extends Pick<InputTitleProps, 'innerTitle' | 'placeTitle'> {
  /**
   * @en Whether the height changes automatically with the content
   * @cn 高度是否随内容自动变化
   * @default false
   */
  autosize?: boolean
  /**
   * @en Infomation
   * @cn 提示信息
   * @override union
   */
  info?: number | ((value?: string) => ReactNode)
  /**
   * @en the maxHeight of the textarea, scroll bars appear after more than
   * @cn 输入框的最大高度, 超过之后会出现滚动条
   * @override union
   */
  maxHeight?: number | string
  /**
   * @en The callback when Textarea blur
   * @cn 失去焦点后的回调
   */
  onBlur?: FocusEventHandler<HTMLTextAreaElement>
  onChange: (value: string) => void
  forceChange: (value: string) => void
  onEnterPress?: (value: string, e: KeyboardEvent<HTMLTextAreaElement>) => void
  /**
   * @en The minimum row height. Same as native textarea rows property.
   * @cn 最小行高，同原生 textarea rows 属性
   * @default 4
   */
  rows?: number
  value?: string
  /**
   * @en support resize
   * @cn 是否可以伸缩高度
   * @default false
   */
  resize?: boolean
  /**
   * @en render textarea footer
   * @cn 渲染 textarea footer
   */
  renderFooter?: (value?: string) => ReactNode
  inputFocus?: boolean
  trim?: boolean
}

// 增加原生属性
type TextareaPropsWithOrigin = ForceAdd<OriginTextareaProps, TextareaHTMLAttributes<HTMLTextAreaElement>>

// hoc
export type TextareaPropsWithDelay = GetDelayProps<TextareaPropsWithOrigin>
type TextareaPropsWithBorder = GetInputBorderProps<TextareaPropsWithDelay>
type TextareaPropsWithInputAble = GetInputableProps<TextareaPropsWithBorder, string>

// 禁用一些属性
type TextareaPropsBan = Omit<TextareaPropsWithInputAble, 'innerTitle' | 'placeTitle'>

export type TextareaProps = TextareaPropsBan
