import React from 'react'
import { StandardProps } from '../@types/common'
import { GetInputableProps } from '../Form/Props'
import { GetTrimProps, GetDelayProps } from '../hoc/Props'

export interface BaseProps extends StandardProps {
  error?: Error

  /**
   * Whether to show the border
   *
   * 是否显示外边框
   *
   * default: false
   */
  bordered?: boolean

  /**
   * Whether to disable
   *
   * 是否禁用
   *
   * default: false
   */
  disabled?: boolean

  /**
   * Whether to show the clear button
   *
   * 是否展示清除按钮
   *
   * default: true
   */
  clearable?: boolean
  placeholder?: string

  /**
   * width of the editablearea
   *
   * 编辑域宽度
   *
   * default: none
   */
  width?: number | string

  /**
   * the maxHeight of the textarea, scroll bars appear after more than
   *
   * 输入框的最大高度, 超过之后会出现滚动条
   *
   * default: none
   */
  maxHeight?: number | string
  innerTitle?: React.ReactNode
  placeTitle?: React.ReactNode

  /**
   * blur event
   *
   * 失去焦点事件
   *
   * default: none
   */
  onBlur?: (e: React.FocusEvent) => void

  /**
   * focus event
   *
   * 聚焦事件
   *
   * default: none
   */
  onFocus?: (e: React.FocusEvent) => void

  /**
   * Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement
   *
   * 自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement
   *
   *  default: none
   */
  getPopupContainer?: () => HTMLElement

  /**
   * 内部属性
   */
  onShowTextareaChange?: (value: boolean) => void

  /**
   * render textarea footer
   *
   * 渲染 textarea footer
   *
   * default: -
   */
  renderFooter?: (value: string) => React.ReactNode

  /**
   * Customize display results
   *
   * 自定义显示结果
   *
   * default: -
   */
  renderResult?: (value: string) => React.ReactNode
  onChange?: (value: string) => void
  value?: string
}

export type EditableAreaPropsWidthTrim = GetTrimProps<BaseProps>
export type EditableAreaPropsWidthDelay = GetDelayProps<EditableAreaPropsWidthTrim>
export type EditableAreaPropsWidthInputable = GetInputableProps<EditableAreaPropsWidthDelay, string>
export type EditableAreaProps = Omit<EditableAreaPropsWidthInputable, 'innerTitle' | 'placeTitle'>

export declare class EditableAreaClass extends React.Component<EditableAreaProps, {}> {
  render(): JSX.Element
}

export type EditableAreaType = typeof EditableAreaClass
