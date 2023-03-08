import { ReactNode } from 'react'
import { StandardProps } from '../@types/common'

export type ResponsiveType = 'sm' | 'md' | 'lg' | 'xl'

/**
 * @title Grid
 */
export interface GridProps extends StandardProps {
  /**
   * @en Spacing between grids
   * @cn 栅格之间间距
   */
  gutter?: number

  /**
   * @en Left offset percentage, 0 <= offset < 1
   * @cn 左偏移百分比，0 <= offset < 1
   * @default 0
   */
  offset?: number

  /**
   * @en Percentage of width, 0 < number <= 1
   * @cn 宽度百分比，0 < number <= 1
   * @default 1
   */
  width?: number

  /**
   * @en The min size of responsive: sm: 568px; md: 768px; lg: 992px; xl: 1200px
   * @cn 激活响应式的最小尺寸。sm: 568px; md: 768px; lg: 992px; xl: 1200px
   * @default 'md'
   */
  responsive?: ResponsiveType

  /**
   * @en Stretch full height of content
   * @cn 是否撑满容器高度
   * @default 1
   */
  stretch?: boolean

  /**
   * @en children
   * @cn 子元素
   */
  children?: ReactNode
}
