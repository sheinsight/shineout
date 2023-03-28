import { ReactNode } from 'react'

export type MessageType = 'default' | 'success' | 'info' | 'warning' | 'danger'

export type PositionType = 'top' | 'middle' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

/**
 * @title Message
 *
 * @cn Message 提供了一组方法供全局调用
 * Message.show(content, [duration], [options]) // 不带有icon，纯 Message 展示
 * Message.info(content, [duration], [options]) // 带有基础样式和icon
 * Message.success(content, [duration], [options])
 * Message.warn(content, [duration], [options])
 * Message.error(content, [duration], [options])
 * Message.close() // 关闭所有消息
 * Message.setOptions() // 设置默认选项，优先级低于实际调用时的选项
 *
 * @en Message provides a set of methods for global calls
 * Message.show(content, [duration], [options]) // No icon, pure message display
 * Message.info(content, [duration], [options]) // With basic style and icon
 * Message.success(content, [duration], [options])
 * Message.warn(content, [duration], [options])
 * Message.error(content, [duration], [options])
 * Message.close() // Close all messages
 * Message.setOptions() // set global options, priority is lower than the actual call option
 */

export interface MessageFuncArg {
  /**
   * @en The message content
   * @cn 消息内容
   */
  content: ReactNode
  /**
   * @en Message duration, unit: s; If it is set to 0, it must be manually closed.
   * @cn 消息持续时间，单位秒；如果设置为 0，必须手动关闭
   * @default 3
   */
  duration?: number
}
/**
 * @title MessageOptions
 */
export interface MessageOptions {
  /**
   * @en extend className
   * @cn 类名
   */
  className?: string
  /**
   * @en The callback function when the message is closed.
   * @cn 关闭后回调事件
   */
  onClose?: () => void
  /**
   * @en The position where the message display
   * @cn 消息显示的位置
   * @default "top"
   */
  position?: 'top' | 'middle' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  /**
   * @en title
   * @cn 标题文字
   */
  title?: string

  /**
   * @en show close button
   * @cn 是否隐藏关闭按钮
   * @default false
   */
  hideClose?: boolean

  /**
   * @en Distance from the top. Note that the Message container is 20px from the top by default. If you need the distance to be 0px from the top, you need to set it to -20px.
   * @cn 距离顶部的距离。注意，Message 容器距离顶部默认为 20px，如果需要距离顶部 0px，需要设置为 -20px
   * @default "auto"
   */
  top?: string

  /**
   * @en target element
   * @cn 渲染的目标节点
   * @default document.body
   */
  container?: (() => HTMLElement) | HTMLElement
}

export interface MessageProps {
  onDestory: () => void
}
