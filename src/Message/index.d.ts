
import * as React from 'react'

export interface MessageOptions {
  /**
   * extend className
   * 
   * 类名
   * 
   * default: -
   */
  className?: string,
  /**
   * The callback function when the message is closed.
   * 
   * 关闭后回调事件
   * 
   * default: -
   */
  onClose?: () => void,
  /**
   * The position where the message display
   * 
   * 消息显示的位置
   * 
   * default: top
   */
  position?: 'top' | 'middle' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  /**
   * title
   * 
   * 标题文字
   * 
   * default: -
   */
  title?: string,

  /**
   * show close button
   * 
   * 是否隐藏关闭按钮
   * 
   * default: false
   */
  hideClose?: boolean,
}

declare namespace Message {
  function show(content: React.ReactNode, duration?: number, options?: MessageOptions): void;
  function info(content: React.ReactNode, duration?: number, options?: MessageOptions): void;
  function success(content: React.ReactNode, duration?: number, options?: MessageOptions): void;
  function warn(content: React.ReactNode, duration?: number, options?: MessageOptions): void;
  function error(content: React.ReactNode, duration?: number, options?: MessageOptions): void;
  function close(): void;
}

export default Message