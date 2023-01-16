import * as React from 'react'
import { StandardProps } from '../@types/common'

type ReactNode = React.ReactNode

export interface TagProps extends StandardProps {
  /**
   * Content, text or react component
   *
   * 内容，文字或react组件
   *
   * default: -
   */
  children?: ReactNode

  /**
   * background color,can set the tag's background color by it
   *
   * 背景色,可以自行的设置标签的背景色
   *
   * default: -
   */
  backgroundColor?: string

  /**
   * When onClose is empty, no close is displayed. If you need to close and do not need to handle callbacks, set it true.
   *
   * 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为true即可
   *
   * default: -
   */
  onClose?: ((e: React.MouseEvent<HTMLDivElement>) => void | Promise<any>) | boolean

  /**
   * the click callback
   *
   * 点击tag事件
   *
   * default: -
   */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void

  /**
   * is disabled
   *
   * 是否禁用
   *
   * default: false
   */
  disabled?: boolean

  /**
   * types
   *
   * 类型
   *
   * default: *default*
   */
  type?: 'success' | 'info' | 'warning' | 'danger' | 'error' | 'default'

  /**
   * This event is triggered when Tag editing is completed (children must be string)
   *
   * Tag 编辑完成时触发该事件（children 必须为 string）
   *
   * default: -
   */
  onCompleted?: (value: string) => void

  /**
   * 可编辑输入框回车事件
   *
   * Editable input box enter event
   *
   * default: -
   */
  onEnterPress?: (value: string, e: React.KeyboardEvent<HTMLInputElement>) => void

  /**
   * 可编辑输入框 keyUp 事件
   *
   * Editable input box keyUp event
   *
   * default: -
   */
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export interface TagInputProps {
  value?: string
  onBlur?: (value: string, e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (value: string) => void
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onEnterPress?: (value: string, e: React.KeyboardEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
}
