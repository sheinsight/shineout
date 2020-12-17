import * as React from 'react';
type ReactNode = React.ReactNode;



declare class Grid extends React.Component<GridProps, {}> {

  render(): JSX.Element;
}

export interface GridProps {

  /**
   * Extend className
   * 扩展className
   * default: none
   */
  className?: string;

  /**
   * Spacing between grids
   * 栅格之间间距
   * default: none
   */
  gutter?: number;

  /**
   * Left offset percentage, 0 <= offset < 1
   * 左偏移百分比，0 <= offset < 1
   * default: 0
   */
  offset?: number;

  /**
   * Container element style
   * 最外层扩展样式
   * default: -
   */
  style?: React.CSSProperties;

  /**
   * Percentage of width, 0 < number <= 1
   * 宽度百分比，0 < number <= 1
   * default: 1
   */
  width?: number;

}

export default Grid;
