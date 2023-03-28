import { CSSProperties, ReactElement, ReactNode } from 'react'

import { ConfigType } from '../hoc/Props'

export type SpinName =
  | 'default'
  | 'chasing-dots'
  | 'cube-grid'
  | 'double-bounce'
  | 'fading-circle'
  | 'four-dots'
  | 'plane'
  | 'pulse'
  | 'ring'
  | 'scale-circle'
  | 'three-bounce'
  | 'wave'
  | 'chasing-ring'

export interface OriginSpinProps {
  wrapperClass?: string
  wrapperStyle?: CSSProperties
  size: number | string
  /**
   * @en color
   * @cn 颜色
   * @default #6c757d
   */
  color?: string
  spinClass: (...args: (string | undefined)[]) => string
  render?: (spinClass: OriginSpinProps['spinClass'], i: number, props: OriginSpinProps) => ReactNode
  style?: CSSProperties
  count?: number
  itemStyle?: CSSProperties
  itemClass?: string
  itemSize?: number | string
}

export interface TypeSpinProps
  extends Omit<OriginSpinProps, 'style' | 'spinClass' | 'count' | 'render' | 'itemStyle' | 'itemClass' | 'itemSize'> {}

/**
 * @title Spin
 */
export interface BaseSpinProps extends Omit<TypeSpinProps, 'size' | 'wrapperClass' | 'wrapperStyle'> {
  /**
   * @en Spin external style
   * @cn Spin 元素扩展样式
   */
  style?: CSSProperties
  /**
   * @en Spin external class
   * @cn Spin 元素扩展 class
   */
  className?: string
  /**
   * @en type
   * @cn 类型
   * @default "fading-circle"
   */
  name?: SpinName
  /**
   * @en custom tip
   * @cn 提示文案
   */
  tip?: ReactElement | string
  /**
   * @en Spin has children
   * @cn 作为包裹元素使用
   */
  children?: ReactElement | string
  /**
   * @en size
   * @cn 尺寸
   * @default 40
   */
  size?: number | string
  /**
   * @en loading
   * @cn 是否为加载中
   * @default true
   */
  loading?: boolean
}

export type SpinProps = ConfigType<BaseSpinProps>
