import { ReactNode, FocusEventHandler, KeyboardEvent, TextareaHTMLAttributes } from 'react'
import { InputTitleProps } from '../InputTitle/Props'
import { GetDelayProps, GetInputBorderProps } from '../hoc/Props'
import { GetInputableProps } from '../Form/Props'
import { ForceAdd } from '../@types/common'

export interface OriginTextareaProps extends Pick<InputTitleProps, 'innerTitle' | 'placeTitle'> {
  /**
   * @en Form field, used with Form
   * @cn 表单字段, 配合 Form 使用
   */
  name?: string
  /**
   * @en Whether the height changes automatically with the content
   * @cn 高度是否随内容自动变化
   * @default false
   */
  autosize?: boolean
  /**
   * @en Information
   * @cn 提示信息
   */
  info?: number | ((value?: string) => ReactNode)
  /**
   * @en the maxHeight of the textarea, scroll bars appear after more than
   * @cn 输入框的最大高度, 超过之后会出现滚动条
   */
  maxHeight?: number | string
  /**
   * @en The callback when Textarea blur
   * @cn 失去焦点后的回调
   */
  onBlur?: FocusEventHandler<HTMLTextAreaElement>
  /**
   * @en The callback function for changing value
   * @cn 值改变回调函数
   */
  onChange: (value: string) => void
  forceChange: (value: string) => void
  /**
   * @en The callback function for enter key
   * @cn 回车键回调函数
   */
  onEnterPress?: (value: string, e: KeyboardEvent<HTMLTextAreaElement>) => void
  /**
   * @en Key up callback function
   * @cn 按键抬起回调函数
   */
  onKeyUp?: (e: KeyboardEvent<HTMLTextAreaElement>) => void
  /**
   * @en The minimum row height. Same as native textarea rows property.
   * @cn 最小行高，同原生 textarea rows 属性
   * @default 4
   */
  rows?: number
  /**
   * @en DefaultValue and value can be set at the same time and defaultValue will be overridden by value.
   * @cn defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖
   */
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
  /**
   * @en When trim is true, blank characters are automatically deleted when lose focus
   * @cn trim 为 true 时，失去焦点时会自动删除空白字符。
   * @default false
   */
  trim?: boolean
}

// hoc
export type TextareaPropsWithDelay = GetDelayProps<OriginTextareaProps>
type TextareaPropsWithBorder = GetInputBorderProps<TextareaPropsWithDelay>
/**
 * @title Textarea
 * @en Supports all attributes of native textarea
 * @cn 支持原生 textarea 所有属性
 */
type TextareaPropsWithInputAble = Omit<
  GetInputableProps<TextareaPropsWithBorder, string>,
  'innerTitle' | 'placeTitle' | 'reserveAble' | 'filterSameChange'
>

// 增加原生属性
type TextareaPropsWithOrigin = ForceAdd<TextareaPropsWithInputAble, TextareaHTMLAttributes<HTMLTextAreaElement>>

export type TextareaProps = TextareaPropsWithOrigin
