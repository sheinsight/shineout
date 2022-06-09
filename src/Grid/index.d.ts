import * as React from 'react'
import { StandardProps } from '../@types/common'

export type responsiveType = 'sm' | 'md' | 'lg' | 'xl'

export interface GridProps extends StandardProps {

  /**
   * Spacing between grids
   *
   * 栅格之间间距
   *
   * default: none
   */
  gutter?: number;

  /**
   * Left offset percentage, 0 <= offset < 1
   *
   * 左偏移百分比，0 <= offset < 1
   *
   * default: 0
   */
  offset?: number;


  /**
   * Percentage of width, 0 < number <= 1
   *
   * 宽度百分比，0 < number <= 1
   *
   * default: 1
   */
  width?: number;


  /**
   * The types of '@media'
   *
   * 媒体查询的尺寸类型
   *
   * default: 'md'
   */
  responsive?: responsiveType;


  /**
   * Stretch full height of content
   *
   * 是否撑满容器高度
   *
   * default: 1
   */
  stretch?: boolean;

}

declare class Grid extends React.Component<GridProps, any> { }

export default Grid
