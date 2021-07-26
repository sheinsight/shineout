import * as React from 'react'
import { StandardProps } from '../@types/common'

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

}

declare class Gap extends React.Component<GapProps, any> {}

export default Gap
