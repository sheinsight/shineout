import React from 'react'
import { StandardProps } from '../@types/common'

type ReactNode = React.ReactNode

export interface ColorStep {
  form?: string
  to?: string
  [key: string]: string | undefined
}

export interface ProgressProps extends StandardProps {
  /**
   * @en popup to show children
   * @cn 是否通过弹出框展示children
   */
  popup?: boolean

  /**
   * @en Background color
   * @cn 背景色
   * @default '#e9ecef'
   */
  background?: string

  /**
   * @en Content
   * @cn 附加内容
   * @override union
   */
  children?: string | ReactNode

  /**
   * @en The foreground color can be set to the object to become a gradient
   * @cn 前景色, 可以设置为对象变成渐变.
   * @default primary
   * @override union
   */
  color?: string | ColorStep

  /**
   * @en Options: ['line', 'circle']
   * @cn 样式，可选值为 ['line', 'circle']
   * @default 'line'
   * @override union
   */
  shape?: 'line' | 'circle'

  /**
   * @en The width and height of 'circle' shape
   * @cn 进度条大小，仅对 circle 有效
   * @default 100
   */
  size?: number

  /**
   * @en The width of the stroke
   * @cn 线框宽度
   * @default 8
   */
  strokeWidth?: number

  /**
   * @en Container element style
   * @cn 最外层扩展样式
   */
  style?: React.CSSProperties

  /**
   * @en Built-in color, options: ['success', 'info', 'warning', 'danger']
   * @cn 内置配色，可选值为，['success', 'info', 'warning', 'danger']
   * @override union
   */
  type?: 'success' | 'info' | 'warning' | 'danger'

  /**
   * @en Percentage, 0 <= value <= 100
   * @cn 百分比值，0 <= value <= 100
   * @default 0
   */
  value?: number

  /**
   * @en The shape to be used at the end of open subpaths when they are stroked
   * @cn 进度条两端的描边形状
   */
  strokeLinecap?: React.SVGAttributes<any>['strokeLinecap']
}

export interface PopupProps {
  value?: number
  children?: ReactNode
}
