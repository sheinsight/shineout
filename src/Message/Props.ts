export type MessageType = 'default' | 'success' | 'info' | 'warning' | 'danger'

export type PositionType = 'top' | 'middle' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export interface MessageOptions {
  /**
   * extend className
   *
   * 类名
   *
   * default: -
   */
  className?: string
  /**
   * The callback function when the message is closed.
   *
   * 关闭后回调事件
   *
   * default: -
   */
  onClose?: () => void
  /**
   * The position where the message display
   *
   * 消息显示的位置
   *
   * default: top
   */
  position?: 'top' | 'middle' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  /**
   * title
   *
   * 标题文字
   *
   * default: -
   */
  title?: string

  /**
   * show close button
   *
   * 是否隐藏关闭按钮
   *
   * default: false
   */
  hideClose?: boolean

  /**
   * Distance from the top
   *
   * 距离顶部的距离
   *
   * default: -
   */
  top?: string
}

export interface MessageProps {
  onDestory: () => void
}
