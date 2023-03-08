export type MessageType = 'default' | 'success' | 'info' | 'warning' | 'danger'

export type PositionType = 'top' | 'middle' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
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
   * @default top
   * @override union
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
   * @en Distance from the top
   * @cn 距离顶部的距离
   */
  top?: string

  /**
   * @en target element
   * @cn 渲染的目标节点
   * @default document.body
   * @override union
   */
  container?: (() => HTMLElement) | HTMLElement
}

export interface MessageProps {
  onDestory: () => void
}
