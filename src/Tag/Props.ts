import * as React from 'react'
import { StandardProps } from '../@types/common'

type ReactNode = React.ReactNode

/**
 * @title Tag
 */
export interface TagProps extends StandardProps {
  /**
   * @en Content, text or react component
   * @cn 内容，文字或react组件
   */
  children?: ReactNode

  /**
   * @en background color,can set the tag's background color by it
   * @cn 背景色,可以自行的设置标签的背景色
   */
  backgroundColor?: string

  /**
   * @en When onClose is empty, no close is displayed. If you need to close and do not need to handle callbacks, set it true.
   * @cn 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为 true 即可
   */
  onClose?: ((e: React.MouseEvent<HTMLDivElement>) => void | Promise<any>) | boolean

  /**
   * @en the click callback
   * @cn 点击 tag 事件
   */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void

  /**
   * @en is disabled
   * @cn 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * @en types
   * @cn 类型
   * @default "default"
   */
  type?: 'success' | 'info' | 'warning' | 'danger' | 'error' | 'default'

  /**
   * @en This event is triggered when Tag editing is completed (children must be string)
   * @cn Tag 编辑完成时触发该事件（children 必须为 string）
   */
  onCompleted?: (value: string) => void

  /**
   * @en Editable input box enter event
   * @cn 可编辑输入框回车事件
   */
  onEnterPress?: (value: string, e: React.KeyboardEvent<HTMLInputElement>) => void

  /**
   * @en Editable input box keyUp event
   * @cn 可编辑输入框 keyUp 事件
   */
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

/**
 * @title Tag.Input
 */
export interface TagInputProps {
  /**
   * @en in control
   * @cn 受控
   */
  value?: string
  /**
   * @en callback of blur event
   * @cn blur 事件回调
   */
  onBlur?: (value: string, e: React.FocusEvent<HTMLInputElement>) => void
  /**
   * @en value change callback
   * @cn value 改变 回调
   */
  onChange?: (value: string) => void
  /**
   * @en callback of keyup event
   * @cn keyup 事件回调
   */
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  /**
   * @en callback of enterPress event
   * @cn enterPress 事件回调
   */
  onEnterPress?: (value: string, e: React.KeyboardEvent<HTMLInputElement>) => void
  /**
   * @en callback of focus event
   * @cn focus 事件回调
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
}
