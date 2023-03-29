import { ReactNode } from 'react'
import { StandardProps } from '../@types/common'

export type GetZIndexConsumerProps<Props> = Props
export type Methods = 'success' | 'info' | 'warning' | 'error' | 'confirm' | 'normal'

/**
 * @title Modal
 */
export interface ModalProps extends StandardProps {
  /**
   * @en Whether to hide mask
   * @cn 是否隐藏遮罩
   * @default false
   */
  hideMask?: boolean
  /**
   * @en Whether to force the mask transparency (in multi-layer Modal, the transparency of other Modal masks except the first layer will be adjusted to 0.01)
   * @cn 是否强制设置遮罩透明度（多层Modal中，除第一层外的其他弹出层遮罩透明度会被调整为0.01）
   * @default false
   */
  forceMask?: boolean

  /**
   * @en Distance from top
   * @cn 弹框距离顶部距离
   * @default 10vh
   */
  top?: number | string

  /**
   * @en display with full screen
   * @cn 是否全屏展示
   * @default false
   */
  fullScreen?: boolean

  /**
   * @en Extend pop-up body style
   * @cn 扩展弹出层 body 的样式
   */
  bodyStyle?: React.CSSProperties

  /**
   * @en The content at the bottom
   * @cn 底部内容
   */
  footer?: ReactNode

  /**
   * @en Whether to close the mask when the mask is clicked
   * @cn 点击遮罩层是否关闭对话框, 设置为 null 右上角关闭图标会保留
   * @default true
   */
  maskCloseAble?: null | boolean

  /**
   * @en The opacity of the mask
   * @cn 遮罩层透明度
   * @default 0.25
   */
  maskOpacity?: number

  /**
   * @en Padding style of the content
   * @cn 内容内边距
   */
  padding?: number | string

  /**
   * @en Pop-up position
   * @cn 弹出位置
   */
  position?: 'top' | 'right' | 'bottom' | 'left'

  /**
   * @en the title of the pop-up layer
   * @cn 弹出层的标题
   */
  title?: ReactNode

  /**
   * @en When the usePortal is true, use ReactDOM.createPortal to create the pop-up layer, otherwise use ReactDOM.render. Use ReactDOM.render while func call.
   * @cn 为 true 时，使用 ReactDOM.createPortal 创建弹出层，为 false 时，使用 ReactDOM.render。函数式调用时使用 ReactDOM.render。
   * @default true
   */
  usePortal?: boolean

  /**
   * @en visible
   * @cn 是否显示
   * @default false
   */
  visible?: boolean

  /**
   * @en the width of the pop-up (not work after setting position)
   * @cn 弹出层宽度 （设置 position 后无效）
   * @default 500
   */
  width?: number | string
  /**
   * @en the height of the Modal (not work after setting position)
   * @cn 对话框高度 （设置 position 后无效）
   */
  height?: string | number

  /**
   * @en pop-up z-index
   * @cn 弹出层 z-index 值，注意：如果嵌套 Select 组件，并且 Select 组件含有 absolute 字段，需要修改 Select 的 z-index 的值
   * @default 1050
   */
  zIndex?: number

  /**
   * @en the root element of pop-up, the mask parent element
   * @cn 弹出层的根元素类名, 为遮罩层的父元素
   */
  rootClassName?: string

  /**
   * @en target element
   * @cn 渲染的目标节点
   * @default document.body
   */
  container?: (() => HTMLElement) | HTMLElement

  /**
   * @en pop-up support move
   * @cn 是否可移动
   * @default false
   */
  moveable?: boolean

  /**
   * @en mask background
   * @cn 遮罩背景色，设置后透明度将失效
   */
  maskBackground?: string

  /**
   * @en pop-up close callback
   * @cn 弹出层关闭回调
   */
  onClose?: () => void

  /**
   * @en Whether to destroy elements when it is closed
   * @cn 关闭时是否销毁元素
   * @default false
   */
  destroy?: boolean

  /**
   * @en hide the close button
   * @cn 是否隐藏关闭按钮
   */
  hideClose?: boolean

  /**
   * @en pop-up Title show status icon
   * @cn 弹出层 title 显示状态 icon
   */
  type?: 'info' | 'success' | 'warning' | 'error' | 'normal' | 'default'

  /**
   * @en toggle zoom animation
   * @cn 是否开启 zoom 动画效果
   * @default false
   */
  zoom?: boolean

  /**
   * @en press 'esc' to close
   * @cn 是否支持 esc 键关闭
   * @default true
   */
  esc?: boolean

  /**
   * @en events list of container element
   * @cn 外层元素所接受的事件列表，可用于在 createPortal 场景中阻止冒泡
   * @default {}
   */
  events?: object

  /**
   * @en can resize
   * @cn 是否可调整大小
   * @default false
   */
  resizable?: boolean

  /**
   * @en When the theme is antd, Set the content style padding to 0
   * @cn 当 Sheinout 采用 antd 主题时，取消内容区域的 padding
   */
  noPadding?: boolean
  /**
   * @inner 内部属性
   */
  drawer?: boolean

  /**
   * @en pop-up children
   * @cn 弹出层内容
   */
  children?: ReactNode
}

export interface ModalPanelProps
  extends StandardProps,
    Pick<
      ModalProps,
      | 'children'
      | 'footer'
      | 'maskCloseAble'
      | 'noPadding'
      | 'onClose'
      | 'padding'
      | 'position'
      | 'title'
      | 'type'
      | 'width'
      | 'moveable'
      | 'resizable'
      | 'hideClose'
      | 'zoom'
      | 'events'
      | 'fullScreen'
      | 'top'
      | 'bodyStyle'
      | 'hideMask'
    > {
  id?: string
  from?: string
  container?: Element
  drawer?: boolean
  autoFocusButton?: string
  height?: string | number
}

/**
 * @title ModalMethods
 */
interface ModalFunctionExternalOptions {
  /**
   * @en Content body
   * @cn 提示内容主体
   */
  content?: ReactNode

  /**
   * @en The event is triggered when the cancel button is clicked.
   * @cn 点击取消按钮时触发事件，仅在 confirm 方法中有效
   */
  onCancel?: () => void

  /**
   * @en The event is triggered when the modal is closed.
   * @cn 关闭 Modal 时触发
   */
  onClose?: () => void

  /**
   * @en The event is triggered when the ok button is clicked.
   * @cn 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭Modal
   */
  onOk?: () => void | Promise<any>

  /**
   * @en The text of button
   * @cn 按钮文字
   * @default { ok: 'Ok', cancel: 'Cancel' }
   */
  text?: { ok?: string; cancel?: string }

  /**
   * @en auto focus button
   * @cn 默认聚焦的按钮
   */
  autoFocusButton?: 'ok' | 'cancel'
}
export interface ModalFunctionOptions extends Omit<ModalProps, 'usePortal' | 'destroy'>, ModalFunctionExternalOptions {}

// innerOptions
export type Options = ModalFunctionOptions & {
  id: string
  from?: string
  usePortal?: ModalProps['usePortal']
  destroy?: ModalProps['destroy']
}
