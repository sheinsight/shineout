import * as React from 'react'
import { ReactNode } from 'react'
import { StandardProps } from '../@types/common'

/**
 * @title Gap
 */
export interface GapProps extends StandardProps {
  /**
   * @en column spacing in the horizontal direction
   * @cn 水平方向的列间距
   * @default 8
   */
  column?: number | string

  /**
   * @en vertical line spacing
   * @cn 垂直方向的行间距
   * @default 8
   */
  row?: number | string

  /**
   * @en the styles of child elements
   * @cn 子元素自定义样式
   */
  itemStyle?: React.CSSProperties

  /**
   * @en children
   * @cn 子元素
   */
  children?: ReactNode
}
