import * as React from 'react'
import { StandardProps } from '../@types/common'

type ReactNode = React.ReactNode

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
   * @cn 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为true即可
   * @override union
   */
  onClose?: ((e: React.MouseEvent<HTMLDivElement>) => void | Promise<any>) | boolean

  /**
   * @en the click callback
   * @cn 点击tag事件
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
   * @default *default*
   * @override union
   */
  type?: 'success' | 'info' | 'warning' | 'danger' | 'error' | 'default'

  /**
   * @en This event is triggered when Tag editing is completed (children must be string)
   * @cn Tag 编辑完成时触发该事件（children 必须为 string）
   */
  onCompleted?: (value: string) => void

  /**
   * @cn 可编辑输入框回车事件
   * @en Editable input box enter event
   */
  onEnterPress?: (value: string, e: React.KeyboardEvent<HTMLInputElement>) => void

  /**
   * @cn 可编辑输入框 keyUp 事件
   * @en Editable input box keyUp event
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
