import { ComponentType, ReactNode } from 'react'
import { StandardProps } from '../@types/common'
import { ButtonType } from '../Button/Props'
import { AlertProps } from '../Alert/interface'

export interface PopoverContextValue {
  (id: string): void
}

export interface PopoverProviderProps {
  bindChain: PopoverContextValue
}

export type GetPopoverConsumerProps<P> = Omit<P, keyof PopoverProviderProps>

export type Position =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left-top'
  | 'left'
  | 'left-bottom'
  | 'right-top'
  | 'right'
  | 'right-bottom'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'
  | 'cover'
export type PopType = 'success' | 'info' | 'warning' | 'danger'
export type PriorityDirection = 'vertical' | 'horizontal' | 'auto'

export interface PanelProps extends StandardProps, PopoverProviderProps {
  /**
   * Pop-up background-color(with arrows)
   *
   * 弹出层背景色（含箭头）
   *
   * default: '#fff'
   */
  background?: string
  /**
   * The color of pop-up border(with arrows)
   *
   * 弹出层边框颜色（含箭头）
   *
   * default: '#dee2e6'
   */
  border?: string
  /**
   * Pop-up content.
   *
   * 弹出显示内容，如果内容为函数，则参数是主动关闭操作
   *
   * default: required
   */
  children?: ReactNode | ((close: ((e?: MouseEvent) => void)) => ReactNode)
  /**
   * Callback event when close.
   *
   * Popover 关闭时回调事件
   *
   * default: -
   */
  onClose?: () => void
  /**
   * Callback event when open.
   *
   * Popover 弹出回调事件
   *
   * default: -
   */
  onOpen?: () => void
  /**
   * The position of pop-up layer
   *
   * 弹出层位置
   *
   * default: 'top'
   */
  position?: Position
  /**
   * type of show
   *
   * 触发方式
   *
   * default: 'hover'
   */
  trigger?: 'click' | 'hover'
  /**
   * type of popover
   *
   * 类型
   *
   * default: none
   */
  type?: PopType
  /**
   * is visible (controlled)
   *
   * 是否显示(受控)
   *
   * default: -
   */
  visible?: boolean
  /**
   * the event of visible change
   *
   * 显示隐藏改变时事件
   *
   * default: -
   */
  onVisibleChange?: (visible: boolean) => void
  /**
   * default visible
   *
   * 默认是否显示
   *
   * default: -
   */
  defaultVisible?: boolean
  /**
   * the show delay of mouseenter(ms)
   *
   * 移入显示延迟(毫秒)
   *
   * default: 0
   */
  mouseEnterDelay?: number
  /**
   * the hidden delay of mouseleave (ms)
   *
   * 移除隐藏延迟(毫秒)
   *
   * default: 0
   */
  mouseLeaveDelay?: number
  /**
   * Popup location priority, default is left and right priority, only valid when position is not set, Options: ['vertical', 'horizontal']
   *
   * 弹出位置优先级, 默认为左右优先, 只在未设置 position 时生效, 可选值['vertical', 'horizontal', 'auto']
   *
   * default: 'vertical'
   */
  priorityDirection?: PriorityDirection
  /**
   * Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement
   *
   * 自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement
   *
   * default: none
   */
  getPopupContainer?: () => HTMLElement | null
  /**
   * scroll to dismiss, return el to order scroller
   *
   * 滚动来关闭气泡框，如果需要指定滚动元素，则通过函数返回
   *
   * default: false
   */
  scrollDismiss?: boolean | (() => HTMLElement | null)
  /**
   * show arrow
   *
   * 是否显示箭头
   *
   * default: true
   */
  showArrow?: boolean
  /**
   * z-index of popover
   *
   * Popover 层级
   *
   * default: 1060
   */
  zIndex?: number
  /**
   * Cancel the popup after clicking the element in mouseEnterDelay
   *
   * mouseEnterDelay 内点击元素后取消弹出
   *
   * default: false
   */
  clickToCancelDelay?: boolean
  /**
   * using inner styles
   *
   * 使用内置文本样式
   *
   * default: -
   */
  useTextStyle?: boolean
}

export interface PopoverConfirmProps extends Omit<PopoverProps, 'children' | 'type'> {
  /**
   * button text
   *
   * 按钮文字
   *
   * default: { ok: 'Ok', cancel: 'Cancel' }
   */
  text?: {
    ok?: string
    cancel?: string
  }
  /**
   * ok button click callback, will close tooltip while returned promise resolve
   *
   * 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip
   *
   * default: none
   */
  onOk?: () => void | Promise<any>
  /**
   * cancel button click callback, will close tooltip while returned promise resolve
   *
   * 点击取消按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip
   *
   * default: none
   */
  onCancel?: () => void | Promise<any>
  /**
   * ok button's type, same with button type
   *
   * 确认按钮的类型，与按钮类型相同
   *
   * default: danger
   */
  okType?: ButtonType
  /**
   * ok button's type, same with button type
   *
   * 确认按钮的类型，与按钮类型相同
   *
   * default: danger
   */
  icon?: AlertProps['icon']
  children: ReactNode
  /**
   * same with Alert type
   *
   * 类型同 Alert type 属性
   *
   * default: confirmwarning
   */
  type?: AlertProps['type']
}
export type PopoverProps = GetPopoverConsumerProps<PanelProps>
export interface PopoverContentProps extends Omit<PopoverProps, 'useTextStyle'> {}

export type PopoverType = ComponentType<PopoverProps> & {
  Confirm: ComponentType<PopoverConfirmProps>
  Content: ComponentType<PopoverContentProps>
}
