import * as React from 'react'

export interface AlertProps {

  /**
   * Content, text or react component
   * 内容，文字或react组件
   * default: -
   */
  children?: React.ReactNode;

  /**
   * Extend className
   * 扩展className
   * default: -
   */
  className?: string;

  /**
   * When the type is true, the status icon is displayed according to the type property. If you need to display a custom icon, pass in ReactElement.
   * 为true时，根据type属性显示状态图标。如果需要显示自定义图标，传入ReactElement。
   * default: -
   */
  icon?: React.ReactElement | boolean;

  /**
   * The size for icon
   * icon 的尺寸
   * default: 14
   */
  iconSize?: number;

  /**
   * When onClose is empty, no close is displayed. If you need to close and do not need to handle callbacks, set it true.
   * 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为true即可
   * default: -
   */
  onClose?: (() => void) | boolean;

  /**
   * Container element style
   * 最外层扩展样式
   * default: -
   */
  style?: React.CSSProperties;

  /**
   * types
   * 类型
   * default: *warning*
   */
  type?: 'success' | 'info' | 'warning' | 'danger' | 'error';

}

declare class Alert extends React.Component<AlertProps> {
  render(): JSX.Element
}

export default Alert