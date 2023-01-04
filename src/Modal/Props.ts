import { ReactNode } from 'react'
import { StandardProps } from '../@types/common'

export type GetZIndexConsumerProps<Props> = Props
export type Methods = 'success' | 'info' | 'warning' | 'error' | 'confirm' | 'normal'

export interface ModalProps extends StandardProps {
  /**
   * Whether to force the mask transparency (in multi-layer Modal, the transparency of other Modal masks except the first layer will be adjusted to 0.01)
   *
   * 是否强制设置遮罩透明度（多层Modal中，除第一层外的其他Modal遮罩透明度会被调整为0.01）
   *
   * default: false
   */
  forceMask?: boolean

  /**
   * Distance from top
   *
   * 模态框距离顶部距离
   *
   * default: 10vh
   */
  top?: number | string

  /**
   * Use the fullScreen property to display the modal in full screen
   *
   * 使用 fullScreen 属性来使对话框全屏展示
   *
   * default: false
   */
  fullScreen?: boolean

  /**
   * Extend modal body style
   *
   * 扩展 modal body 的样式
   *
   * default: -
   */
  bodyStyle?: React.CSSProperties

  /**
   * The content at the bottom
   *
   * 底部内容
   *
   * default: -
   */
  footer?: ReactNode | any[]

  /**
   * Whether to close the mask when the mask is clicked
   *
   * 点击遮罩层是否关闭对话框
   *
   * default: true
   */
  maskCloseAble?: boolean | null

  /**
   * The opacity of the mask
   *
   * 遮罩层透明度
   *
   * default: 0.25
   */
  maskOpacity?: number

  /**
   * Padding style of the content
   *
   * 内容内边距
   *
   * default: 16
   */
  padding?: number | string

  /**
   * Pop-up position, one of ['top', 'right', 'bottom', 'left']
   *
   * 弹出位置，可选值为 ['top', 'right', 'bottom', 'left']
   *
   * default: -
   */
  position?: 'top' | 'right' | 'bottom' | 'left'

  /**
   * the title of the pop-up layer
   *
   * 弹出层的标题
   *
   * default: -
   */
  title?: ReactNode

  /**
   * When the usePortal is true, use ReactDOM.createPortal to create the pop-up layer, otherwise use ReactDOM.render. Use ReactDOM.render while func call.
   *
   * 为 true 时，使用 ReactDOM.createPortal 创建弹出层，为 false 时，使用 ReactDOM.render。函数式调用时使用 ReactDOM.render。
   *
   * default: true
   */
  usePortal?: boolean

  /**
   * visible
   *
   * 是否显示
   *
   * default: false
   */
  visible?: boolean

  /**
   * the width of the Modal ( only works under normal modal )
   *
   * 对话框宽度 （仅在常规对话框下生效）
   *
   * default: 500
   */
  width?: number | string

  /**
   * Modal z-index
   *
   * 对话框 z-index 值，注意：如 Modal 嵌套 Select 组件，并且 Select 组件含有 absolute 字段，需要修改 Select 的 z-index的值
   *
   * default: 1050
   */
  zIndex?: number

  /**
   * the root element of modal, the mask parent element
   *
   * modal 的根元素类名, 为遮罩层的父元素
   *
   * default: -
   */
  rootClassName?: string

  /**
   * target element
   *
   * 渲染的目标节点
   *
   * default: document.body
   */
  container?: (() => HTMLElement) | HTMLElement

  /**
   * modal support move
   *
   * 是否可移动
   *
   * default: false
   */
  moveable?: boolean

  /**
   * mask background
   *
   * 遮罩背景色，设置后透明度将失效
   *
   * default: null
   */
  maskBackground?: string

  /**
   * modal close callback
   *
   * 模态框关闭回调
   *
   * default: none
   */
  onClose?: () => void

  /**
   * Whether to destroy elements when it is closed
   *
   * 关闭时是否销毁元素
   *
   * default: false
   */
  destroy?: boolean

  /**
   * hide the close button
   *
   * 是否隐藏关闭按钮
   *
   * default: none
   */
  hideClose?: boolean

  /**
   * Modal Title show status icon
   *
   * Modal title 显示状态icon
   *
   * default: null
   */
  type?: 'info' | 'success' | 'warning' | 'error' | 'normal' | 'default'

  /**
   * toggle zoom animation
   *
   * 是否开启 zoom 动画效果
   *
   * default: false
   */
  zoom?: boolean

  /**
   * press 'esc' to close
   *
   * 是否支持 esc 键关闭
   *
   * default: true
   */
  esc?: boolean

  /**
   * events list of container element
   *
   * 外层元素所接受的事件列表，可用于在 createPortal 场景中阻止冒泡
   *
   * default: {}
   */
  events?: object

  /**
   * can resize
   *
   * 是否可调整大小
   *
   * default: false
   */
  resizable?: boolean

  /**
   * When the theme is antd, Set the content style padding to 0
   *
   * 当Sheinout采用 antd 主题时，取消内容区域的padding
   *
   * default: -
   */
  noPadding?: boolean

  height?: string | number

  drawer?: boolean

  children?: ReactNode
}

export interface ModalPanelProps
  extends StandardProps,
    Pick<
      ModalProps,
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
    > {
  id?: string
  from?: string
  container?: Element
  drawer?: boolean
  autoFocusButton?: string
  height?: string | number
}

export interface ModalFunctionOptions extends Omit<ModalProps, 'usePortal' | 'destroy'> {
  /**
   * Content body
   *
   * 提示内容主体
   *
   * default: null
   */
  content?: ReactNode

  /**
   * The event is triggered when the cancel button is clicked.
   *
   * 点击取消按钮时触发事件，仅在 confirm 方法中有效
   *
   * default: null
   */
  onCancel?: () => void

  /**
   * The event is triggered when the modal is closed.
   *
   * 关闭Modal时触发
   *
   * default: null
   */
  onClose?: () => void

  /**
   * The event is triggered when the ok button is clicked.
   *
   * 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭Modal
   *
   * default: null
   */
  onOk?: () => void | Promise<any>

  /**
   * The text of button
   *
   * 按钮文字
   *
   * default: { ok: 'Ok', cancel: 'Cancel' }
   */
  text?: { ok?: string; cancel?: string }

  /**
   * auto focus button, one of ['ok', 'cancel']
   *
   * 默认聚焦的按钮, 可选值 ['ok', 'cancel']
   *
   * default: null
   */
  autoFocusButton?: string

  /**
   * When the theme is antd, Set the content style padding to 0
   *
   * 当Sheinout采用 antd 主题时，取消内容区域的padding
   *
   * default: -
   */
  noPadding?: boolean
}

// innerOptions
export type Options = ModalFunctionOptions & {
  id: string
  from?: string
  usePortal?: ModalProps['usePortal']
  destroy?: ModalProps['destroy']
}
