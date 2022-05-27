import * as React from 'react'
import { StandardProps } from '../@types/common'
import { ReactNode } from "react"

export interface GapProps extends StandardProps{

  /**
   * column spacing in the horizontal direction
   *
   * 水平方向的列间距
   *
   * default: 8
   */
  column?: number | string;

  /**
   * vertical line spacing
   *
   * 垂直方向的行间距
   *
   * default: 8
   */
  row?: number | string;

  /**
   * the styles of child elements
   * 
   * 子元素自定义样式
   * 
   * default: -
   */
   itemStyle?: React.CSSProperties;

}

declare class Gap extends React.Component<GapProps, any> {}

export default Gap
