import React from 'react'
import {StandardProps} from '../@types/common'

type ReactNode = React.ReactNode;

interface ColorStep {
  form?: string;
  to?: string;
  [key: string]: string
}

export interface ProgressProps extends StandardProps {
  /**
   * Background color
   *
   * 背景色
   *
   * default: '#e9ecef'
   */
  background?: string;

  /**
   * Content
   *
   * 附加内容
   *
   * default: -
   */
  children?: string | ReactNode;

  /**
   * The foreground color can be set to the object to become a gradient
   *
   * 前景色, 可以设置为对象变成渐变.
   *
   * default: primary
   */
  color?: string | ColorStep;

  /**
   * Options: ['line', 'circle']
   *
   * 样式，可选值为 ['line', 'circle']
   *
   * default: 'line'
   */
  shape?: 'line' | 'circle';

  /**
   * The width and height of 'circle' shape
   *
   * 进度条大小，仅对 circle 有效
   *
   * default: 100
   */
  size?: number;

  /**
   * The width of the stroke
   *
   * 线框宽度
   *
   * default: 8
   */
  strokeWidth?: number;

  /**
   * Container element style
   *
   * 最外层扩展样式
   *
   * default: -
   */
  style?: React.CSSProperties;

  /**
   * Built-in color, options: ['success', 'info', 'warning', 'danger']
   *
   * 内置配色，可选值为，['success', 'info', 'warning', 'danger']
   *
   * default: -
   */
  type?: 'success' | 'info' | 'warning' | 'danger';

  /**
   * Percentage, 0 <= value <= 100
   *
   * 百分比值，0 <= value <= 100
   *
   * default: 0
   */
  value?: number;
}


declare class Progress extends React.Component<ProgressProps, {}> {}

export default Progress
