import * as React from 'react';
import { CardSubmitProps } from '../Card'
type ReactNode = React.ReactNode;

export interface ModalProps {

  /**
   * Extend className
   * 扩展className
   * default: -
   */
  className?: string;

  /**
   * Extend modal body style
   * 扩展 modal body 的样式
   * default: -
   */
  bodyStyle?: React.CSSProperties;

  /**
   * The content at the bottom
   * 底部内容
   * default: -
   */
  footer?: ReactNode;

  /**
   * Whether to close the mask when the mask is clicked
   * 点击遮罩层是否关闭对话框
   * default: true
   */
  maskCloseAble?: boolean;

  /**
   * The opacity of the mask
   * 遮罩层透明度
   * default: 0.25
   */
  maskOpacity?: number;

  /**
   * Padding style of the content
   * 内容内边距
   * default: 16
   */
  padding?: number | string;

  /**
   * Pop-up position, one of ['top', 'right', 'bottom', 'left']
   * 弹出位置，可选值为 ['top', 'right', 'bottom', 'left']
   * default: -
   */
  position?: string;

  /**
   * Extend style
   * 最外层扩展样式
   * default: -
   */
  style?: React.CSSProperties;

  /**
   * the title of the pop-up layer
   * 弹出层的标题
   * default: -
   */
  title?: ReactNode;

  /**
   * When the usePortal is true, use ReactDOM.createPortal to create the pop-up layer, otherwise use ReactDOM.render.
   * 为 true 时，使用 ReactDOM.createPortal 创建弹出层，为 false 时，使用 ReactDOM.render
   * default: true
   */
  usePortal?: boolean;

  /**
   * visible
   * 是否显示
   * default: false
   */
  visible?: boolean;

  /**
   * the width of the Modal
   * 对话框宽度
   * default: 500
   */
  width?: number | string;

  /**
   * Modal z-index
   * 对话框 z-index 值，注意：如 Modal 嵌套 Select 组件，并且 Select 组件含有 absolute 字段，需要修改 Select 的 z-index的值
   * default: 1050
   */
  zIndex?: number;

  /**
   * the root element of modal, the mask parent element
   * modal 的根元素类名, 为遮罩层的父元素
   * default: -
   */
  rootClassName?: string;

  /**
   * target element
   * 渲染的目标节点
   * default: document.body
   */
  container?: (() => HTMLElement) | HTMLElement;

  /**
   * modal support move
   * 是否可移动
   * default: false
   */
  moveable?: boolean;

  /**
   * modal resizable
   * 是否可调整大小
   * default: false
   */
  resizable?: boolean;

  /**
   * mask background
   * 遮罩背景色，设置后透明度将失效
   * default: null
   */
  maskBackground?: string;

  /**
   * modal close callback
   * 模态框关闭回调
   * default: none
   */
  onClose?: () => void;

  /**
   * Whether to destroy elements when it is closed
   * 关闭时是否销毁元素
   * default: false
   */
  destroy?: boolean;

  /**
   * hide the close button
   * 是否隐藏关闭按钮
   * default: none
   */
  hideClose?: boolean;

  /**
   * Modal Title show status icon
   * Modal title 显示状态icon
   * default: null
   */
  type?: 'info' | 'success' | 'warning' | 'error' | 'normal';

  /**
   * toggle zoom animation
   * 是否开启 zoom 动画效果
   * default: false
   */
  zoom?: boolean;

}

declare class ModalSubmit extends React.Component<CardSubmitProps> {
  render(): JSX.Element
}

declare class Modal extends React.Component<ModalProps, {}> {
  static Submit: typeof ModalSubmit;
  render(): JSX.Element;
}

export interface ModalFunctionOptions {
  /**
   * Content body
   * 提示内容主体
   * default: null
   */
  content?: ReactNode | string,
  /**
   * title
   * 标题
   * default: null
   */
  title?: string,
  /**
   * The event is triggered when the cancel button is clicked.
   * 点击取消按钮时触发事件，仅在 confirm 方法中有效
   * default: null
   */
  onCancel?: () => void,
  /**
   * The event is triggered when the modal is closed.
   * 关闭Modal时触发
   * default: null
   */
  onClose?: () => void,
  /**
   * The event is triggered when the ok button is clicked.
   * 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭Modal
   * default: null
   */
  onOk?: () => void | Promise<any>,
  /**
   * The text of button
   * 按钮文字
   * default: { ok: 'Ok', cancel: 'Cancel' }
   */
  text?: { ok?: string, cancel?: string },
  /**
   * auto focus button, one of ['ok', 'cancel']
   * 默认聚焦的按钮, 可选值 ['ok', 'cancel']
   * default: null
   */
  autoFocusButton?: string
}

declare namespace Modal {
  function info(methodOptions: ModalFunctionOptions): void
  function success(methodOptions: ModalFunctionOptions): void
  function error(methodOptions: ModalFunctionOptions): void
  function confirm(methodOptions: ModalFunctionOptions): void
  function show(methodOptions: ModalFunctionOptions): void
}

export default Modal;
