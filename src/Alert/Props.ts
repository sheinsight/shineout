import * as React from 'react'
import { StandardProps } from '../@types/common'
/**
 * @title Alert
 */
export interface AlertProps extends StandardProps {
  /**
   * @en Content, text or react component
   * @cn 内容，文字或 react 组件
   */
  children?: React.ReactNode

  /**
   * @en When the type is true, the status icon is displayed according to the type property. If you need to display a custom icon, pass in ReactElement.
   * @cn 为 true 时，根据 type 属性显示状态图标。如果需要显示自定义图标，传入 ReactElement。
   */
  icon?: React.ReactElement | boolean

  /**
   * @en The size for icon
   * @cn icon 的尺寸
   * @default 14
   */
  iconSize?: number

  /**
   * @en When onClose is empty, no close is displayed. If you need to close and do not need to handle callbacks, set it true.
   * @cn 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为 true 即可
   */
  onClose?: ((duration?: number, offsetHeight?: number) => void) | boolean

  /**
   * @en types
   * @cn 类型
   * @default 'warning'
   */
  type?: 'success' | 'info' | 'warning' | 'danger' | 'error' | 'confirmwarning'

  /**
   * @en show close button
   * @cn 是否隐藏关闭按钮
   * @default false
   */
  hideClose?: boolean

  /**
   * @inner 内部属性
   */
  outAnimation?: boolean

  /**
   * @cn custom close button
   * @en 自定义关闭按钮
   */
  closeItem?: React.ReactNode

  /**
   * @inner 内部属性
   */
  dismiss?: boolean

  /**
   * @inner 内部属性
   */
  duration?: number
}
