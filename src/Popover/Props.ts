import { ComponentType, ReactNode } from 'react'
import { StandardProps } from '../@types/common'
import { ButtonType } from '../Button/Props'
import { AlertProps } from '../Alert/Props'

export interface PopoverContextValue {
  (id: string): void
}

export interface PopoverProviderProps {
  bindChain: PopoverContextValue
}

export type GetPopoverConsumerProps<P> = Omit<P, keyof PopoverProviderProps>

export type PopoverPositionType =
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
export type PriorityDirectionType = 'vertical' | 'horizontal' | 'auto'

export interface PanelProps extends StandardProps, PopoverProviderProps {
  /**
   * @en Pop-up background-color(with arrows)
   * @cn 弹出层背景色（含箭头）
   * @default '#fff'
   */
  background?: string
  /**
   * @en The color of pop-up border(with arrows)
   * @cn 弹出层边框颜色（含箭头）
   * @default '#dee2e6'
   */
  border?: string
  /**
   * @en Pop-up content.
   * @cn 弹出显示内容，如果内容为函数，则参数是主动关闭操作
   */
  children: ReactNode | ((close: ((e?: MouseEvent) => void)) => ReactNode)
  /**
   * @en Callback event when close.
   * @cn Popover 关闭时回调事件
   */
  onClose?: () => void
  /**
   * @en Callback event when open.
   * @cn Popover 弹出回调事件
   */
  onOpen?: () => void
  /**
   * @en The position of pop-up layer, default is "auto"
   * @cn 弹出层位置。若不设置，则默认为 auto
   */
  position?: PopoverPositionType
  /**
   * @en type of show
   * @cn 触发方式
   * @default 'hover'
   */
  trigger?: 'click' | 'hover'
  /**
   * @en type of popover
   * @cn 类型
   */
  type?: PopType
  /**
   * @en is visible (controlled)
   * @cn 是否显示(受控)
   */
  visible?: boolean
  /**
   * @en the event of visible change
   * @cn 显示隐藏改变时事件
   */
  onVisibleChange?: (visible: boolean) => void
  /**
   * @en default visible
   * @cn 默认是否显示
   */
  defaultVisible?: boolean
  /**
   * @en the show delay of mouseenter(ms)
   * @cn 移入显示延迟(毫秒)
   * @default 0
   */
  mouseEnterDelay?: number
  /**
   * @en the hidden delay of mouseleave (ms)
   * @cn 移除隐藏延迟(毫秒)
   * @default 0
   */
  mouseLeaveDelay?: number
  /**
   * @en Popup location priority, default is left and right priority, only valid when position is not set
   * @cn 弹出位置优先级, 默认为左右优先, 只在未设置 position 时生效
   * @default 'vertical'
   */
  priorityDirection?: PriorityDirectionType
  /**
   * @en Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement
   * @cn 自定义 Popover 容器，覆盖默认渲染在 body 下的行为, () => DOMElement
   */
  getPopupContainer?: () => HTMLElement | null
  /**
   * @en scroll to dismiss, return el to order scroller
   * @cn 滚动来关闭气泡框，如果需要指定滚动元素，则通过函数返回
   * @default false
   */
  scrollDismiss?: boolean | (() => HTMLElement | null)
  /**
   * @en show arrow
   * @cn 是否显示箭头
   * @default true
   */
  showArrow?: boolean
  /**
   * @en z-index of popover
   * @cn Popover 层级
   * @default 1060
   */
  zIndex?: number
  /**
   * @en Cancel the popup after clicking the element in mouseEnterDelay
   * @cn mouseEnterDelay 内点击元素后取消弹出
   * @default false
   */
  clickToCancelDelay?: boolean
  /**
   * @en using inner styles
   * @cn 使用内置文本样式
   */
  useTextStyle?: boolean
  /**
   * @en delete content dom when close
   * @cn 关闭 Popover 后销毁内容 dom
   * default: false
   */
  destroy?: boolean
}

/**
 * @title Popover.Confirm
 * @en Properties are basically the same as popovers, except for the following:
 * @cn 属性和 Popover 基本一致，除了以下:
 */
export interface PopoverConfirmSelfProps {
  /**
   * @en button text
   * @cn 按钮文字
   * @default { ok: 'Ok', cancel: 'Cancel' }
   */
  text?: {
    ok?: string
    cancel?: string
  }
  /**
   * @en ok button click callback, will close tooltip while returned promise resolve
   * @cn 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip
   */
  onOk?: () => void | Promise<any>
  /**
   * @en cancel button click callback, will close tooltip while returned promise resolve
   * @cn 点击取消按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip
   */
  onCancel?: () => void | Promise<any>
  /**
   * @en ok button's type, same with [Button](/components/Button) type
   * @cn 确认按钮的类型，与 [Button](/components/Button) 类型相同
   * @default "danger"
   */
  okType?: ButtonType
  /**
   * @en custom icon
   * @cn 自定义Icon
   */
  icon?: AlertProps['icon']
  /**
   * @en Pop-up content.
   * @cn 弹出显示内容
   */
  children: ReactNode
  /**
   * @en same with [Alert](/components/Alert) type
   * @cn 类型同 [Alert](/components/Alert) type 属性
   * @default "confirmwarning"
   */
  type?: AlertProps['type']
}

export interface PopoverConfirmProps extends Omit<PopoverProps, 'children' | 'type'>, PopoverConfirmSelfProps {}

/**
 * @title PopoverProps
 */
export type PopoverProps = GetPopoverConsumerProps<PanelProps>
export interface PopoverContentProps extends Omit<PopoverProps, 'useTextStyle'> {}

export type PopoverType = ComponentType<PopoverProps> & {
  Confirm: ComponentType<PopoverConfirmProps>
  Content: ComponentType<PopoverContentProps>
}
