import React from 'react'
import { StandardProps } from '../@types/common'
import { GetInputableProps } from '../Form/Props'
import { GetDelayProps } from '../hoc/Props'

export interface BaseProps extends StandardProps {
  /**
   * @inner 内部属性
   */
  error?: Error
  /**
   * @en Whether to show the border
   * @cn 是否显示外边框
   * @default false
   */
  bordered?: boolean
  /**
   * @en Whether to disable
   * @cn 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * @en Whether to show the clear button
   * @cn 是否展示清除按钮
   * @default true
   */
  clearable?: boolean
  /**
   * @en The same as the native placeholder tag
   * @cn 同原生属性
   */
  placeholder?: string
  /**
   * @en width of the editablearea
   * @cn 编辑域宽度
   */
  width?: number | string

  /**
   * @en the maxHeight of the textarea, scroll bars appear after more than
   * @cn 输入框的最大高度, 超过之后会出现滚动条
   */
  maxHeight?: number | string
  innerTitle?: React.ReactNode
  placeTitle?: React.ReactNode
  /**
   * @en blur event
   * @cn 失去焦点事件
   */
  onBlur?: (e: React.FocusEvent) => void

  /**
   * @en focus event
   * @cn 聚焦事件
   */
  onFocus?: (e: React.FocusEvent) => void

  /**
   * @en Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement
   * @cn 自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement
   */
  getPopupContainer?: () => HTMLElement

  /**
   * @inner 内部属性
   */
  onShowTextareaChange?: (value: boolean) => void

  /**
   * @en Render textarea footer
   * @cn 渲染 textarea footer
   */
  renderFooter?: (value: string) => React.ReactNode

  /**
   * @en Customize display results
   * @cn 自定义显示结果
   */
  renderResult?: (value: string) => React.ReactNode
  /**
   * @en Callback function when the value changes
   * @cn 值改变后的回调函数
   */
  onChange?: (value: string) => void
  /**
   * @en The value passed in when controlled
   * @cn 受控
   */
  value?: string
  /**
   * @en default value
   * @cn 默认值
   */
  defaultValue?: string
  /**
   * @en When trim is true, blank characters are automatically deleted when lose focus
   * @cn trim 为 true 时，失去焦点时会自动删除空白字符
   */
  trim?: boolean
  forceChange: (value: string) => void
}

export type EditableAreaPropsWidthDelay = GetDelayProps<BaseProps>
export type EditableAreaPropsWidthInputable = GetInputableProps<EditableAreaPropsWidthDelay, string>

/**
 * @title EditableArea
 */
export type EditableAreaProps = Omit<EditableAreaPropsWidthInputable, 'innerTitle' | 'placeTitle' | 'filterSameChange'>

export declare class EditableAreaClass extends React.Component<EditableAreaProps, {}> {
  render(): JSX.Element
}

export type EditableAreaType = typeof EditableAreaClass
