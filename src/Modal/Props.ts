import { ReactNode } from 'react'
import { StandardProps } from '../@types/common'

export type GetZIndexConsumerProps<Props> = Props
export type Methods = 'success' | 'info' | 'warning' | 'error' | 'confirm' | 'normal'

export interface ModalProps extends StandardProps {
  /**
   * @en Whether to force the mask transparency (in multi-layer Modal, the transparency of other Modal masks except the first layer will be adjusted to 0.01)
   * @cn 是否强制设置遮罩透明度（多层Modal中，除第一层外的其他Modal遮罩透明度会被调整为0.01）
   * @default false
   */
  forceMask?: boolean

  /**
   * @en Distance from top
   * @cn 模态框距离顶部距离
   * @default 10vh
   * @override union
   */
  top?: number | string

  /**
   * @en Use the fullScreen property to display the modal in full screen
   * @cn 使用 fullScreen 属性来使对话框全屏展示
   * @default false
   */
  fullScreen?: boolean

  /**
   * @en Extend modal body style
   * @cn 扩展 modal body 的样式
   */
  bodyStyle?: React.CSSProperties

  /**
   * @en The content at the bottom
   * @cn 底部内容
   * @override union
   */
  footer?: ReactNode | any[]

  /**
   * @en Whether to close the mask when the mask is clicked
   * @cn 点击遮罩层是否关闭对话框
   * @default true
   * @override union
   */
  maskCloseAble?: boolean | null

  /**
   * @en The opacity of the mask
   * @cn 遮罩层透明度
   * @default 0.25
   */
  maskOpacity?: number

  /**
   * @en Padding style of the content
   * @cn 内容内边距
   * @default 16
   * @override union
   */
  padding?: number | string

  /**
   * @en Pop-up position, one of ['top', 'right', 'bottom', 'left']
   * @cn 弹出位置，可选值为 ['top', 'right', 'bottom', 'left']
   * @override union
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
   * @en the width of the Modal ( only works under normal modal )
   * @cn 对话框宽度 （仅在常规对话框下生效）
   * @default 500
   * @override union
   */
  width?: number | string

  /**
   * @en Modal z-index
   * @cn 对话框 z-index 值，注意：如 Modal 嵌套 Select 组件，并且 Select 组件含有 absolute 字段，需要修改 Select 的 z-index的值
   * @default 1050
   */
  zIndex?: number

  /**
   * @en the root element of modal, the mask parent element
   * @cn modal 的根元素类名, 为遮罩层的父元素
   */
  rootClassName?: string

  /**
   * @en target element
   * @cn 渲染的目标节点
   * @default document.body
   * @override union
   */
  container?: (() => HTMLElement) | HTMLElement

  /**
   * @en modal support move
   * @cn 是否可移动
   * @default false
   */
  moveable?: boolean

  /**
   * @en mask background
   * @cn 遮罩背景色，设置后透明度将失效
   * @default null
   */
  maskBackground?: string

  /**
   * @en modal close callback
   * @cn 模态框关闭回调
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
   * @en Modal Title show status icon
   * @cn Modal title 显示状态icon
   * @default null
   * @override union
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
   * @cn 当Sheinout采用 antd 主题时，取消内容区域的padding
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
   * @en Content body
   * @cn 提示内容主体
   * @default null
   */
  content?: ReactNode

  /**
   * @en The event is triggered when the cancel button is clicked.
   * @cn 点击取消按钮时触发事件，仅在 confirm 方法中有效
   * @default null
   */
  onCancel?: () => void

  /**
   * @en The event is triggered when the modal is closed.
   * @cn 关闭Modal时触发
   * @default null
   */
  onClose?: () => void

  /**
   * @en The event is triggered when the ok button is clicked.
   * @cn 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭Modal
   * @default null
   * @override union
   */
  onOk?: () => void | Promise<any>

  /**
   * @en The text of button
   * @cn 按钮文字
   * @default { ok: 'Ok', cancel: 'Cancel' }
   */
  text?: { ok?: string; cancel?: string }

  /**
   * @en auto focus button, one of ['ok', 'cancel']
   * @cn 默认聚焦的按钮, 可选值 ['ok', 'cancel']
   * @default null
   */
  autoFocusButton?: string

  /**
   * @en When the theme is antd, Set the content style padding to 0
   * @cn 当Sheinout采用 antd 主题时，取消内容区域的padding
   */
  noPadding?: boolean
  children?: ReactNode
}

// innerOptions
export type Options = ModalFunctionOptions & {
  id: string
  from?: string
  usePortal?: ModalProps['usePortal']
  destroy?: ModalProps['destroy']
}
