import * as React from 'react'
import { StandardProps, RegularAttributes } from '../@types/common'
import { StandardProps }  from '../@types/common'

type ReactNode = React.ReactNode

export interface PopoverProps extends StandardProps {

  /**
   * Pop-up background-color(with arrows)
   *
   * 弹出层背景色（含箭头）
   *
   * default: '#fff'
   */
  background?: string;

  /**
   * is visible (controlled)
   *
   * 是否显示(受控)
   *
   * default: -
   */
  visible?: boolean;

  /**
   * the event of visible change
   *
   * 显示隐藏改变时事件
   *
   * default: -
   */
  onVisibleChange?: (visible: boolean) => void;

  /**
   * the show delay of mouseenter(ms)
   *
   * 移入显示延迟(毫秒)
   *
   * default: 0
   */
  mouseEnterDelay?: number;

  /**
   * the hidden delay of mouseleave (ms)
   *
   * 移除隐藏延迟(毫秒)
   *
   * default: 0
   */
  mouseLeaveDelay?: number;

  /**
   * The color of pop-up border(with arrows)
   *
   * 弹出层边框颜色（含箭头）
   *
   * default: '#dee2e6'
   */
  border?: string;


  /**
   * Pop-up content.
   *
   * 弹出显示内容，如果内容为函数，则参数是主动关闭操作
   *
   * default: required
   */
  children?: ReactNode | ((close: (() => void)) => ReactNode);

  /**
   * Callback event when close.
   *
   * Popover 关闭时回调事件
   *
   * default: -
   */
  onClose?: () => void;

  /**
   * Callback event when open.
   *
   * Popover 弹出回调事件
   *
   * default: -
   */
  onOpen?: () => void;

  /**
   * The position of pop-up layer
   *
   * 弹出层位置
   *
   * default: 'top'
   */
  position?: 'top-left' | 'top' | 'top-right' | 'left-top' | 'left' | 'left-bottom' | 'right-top' | 'right' | 'right-bottom' | 'bottom-left' | 'bottom' | 'bottom-right';


  /**
   * type of show
   *
   * 触发方式
   *
   * default: 'hover'
   */
  trigger?: 'click' | 'hover';

  /**
   * type of popover
   *
   * 类型
   *
   * default: none
   */
  type?: 'success' | 'info' | 'warning' | 'danger';

  /**
   * Old API, out of date
   * .
   * 旧接口，如果content为空，父组件作为触发元素
   *
   * default:
   */
  content?: ((close: () => void) => void) | ReactNode;

  /**
   * Popup location priority, default is left and right priority, only valid when position is not set, Options: ['vertical', 'horizontal']
   *
   * 弹出位置优先级, 默认为左右优先, 只在未设置 position 时生效, 可选值['vertical', 'horizontal']
   *
   * default: 'vertical'
   */
  priorityDirection?: string;

  /**
   * Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement
   *
   * 自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement
   *
   * default: none
   */
  getPopupContainer?: () => HTMLElement;

  /**
   * scroll to dismiss, return el to order scroller
   *
   * 滚动来关闭气泡框，如果需要指定滚动元素，则通过函数返回
   *
   * default: false
   */
  scrollDismiss?: (() => HTMLElement) | boolean;

  /**
   * show arrow
   *
   * 是否显示箭头
   *
   * default: true
   */
  showArrow?: boolean;

}

export interface PopoverConfirmProps extends PopoverProps{

  /**
   * ok button click callback, will close tooltip while returned promise resolve
   *
   * 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip
   *
   * default: none
   */
  onOk?: () => void;

  /**
   * cancel button click callback, will close tooltip while returned promise resolve
   *
   * 点击取消按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip
   *
   * default: none
   */
  onCancel?: () => void;

  /**
   * button text
   *
   * 按钮文字
   *
   * default: { ok: 'Ok', cancel: 'Cancel' }
   */
  text?: { ok?: string, cancel?: string };

  /**
   * icon type [*success*, *info*, *warning*, *danger(error)*]
   *
   * icon的类型，4 选 1，[*success*, *info*, *warning*, *danger(error)*]
   *
   * default: *warning*
   */
  type?: string;

  /**
   * ok button's type, same with button type
   * 
   * 确认按钮的类型，与按钮类型相同
   * 
   * default: primary
   */
  okType?: RegularAttributes.Type;
}

declare class PopoverConfirm extends React.Component<PopoverConfirmProps, {}> {
  render(): JSX.Element;
}

declare class Popover extends React.Component<PopoverProps, {}> {
  static Confirm: typeof PopoverConfirm;

  render(): JSX.Element;
}

export default Popover
