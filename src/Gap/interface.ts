import * as React from 'react'
import { ReactNode } from 'react'
import { StandardProps } from '../@types/common'

export interface GapProps extends StandardProps {
  /**
   * column spacing in the horizontal direction
   *
   * 水平方向的列间距
   *
   * default: 8
   */
  column?: number | string

  /**
   * vertical line spacing
   *
   * 垂直方向的行间距
   *
   * default: 8
   */
  row?: number | string

  /**
   * the styles of child elements
   *
   * 子元素自定义样式
   *
   * default: -
   */
  itemStyle?: React.CSSProperties

  /**
   * children
   *
   * 子元素
   *
   * default: -
   */
  children?: ReactNode
}

declare class Gap extends React.Component<GapProps, any> {
  render(): JSX.Element
}

export default Gap
