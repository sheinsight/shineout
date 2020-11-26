import * as React from 'react';
type ReactNode = React.ReactNode;



declare class Spin extends React.Component<SpinProps, {}> {

  render(): JSX.Element;
}

export interface SpinProps {

  /**
   * color
   * 颜色
   * default: #6c757d
   */
  color?: string;

  /**
   * size
   * 尺寸
   * default: 40
   */
  size?: number | string;

  /**
   * type. See the example for optional values.
   * 类型，可选值见示例
   * default: 'fading-circle'
   */
  name?: string;

}

export default Spin;
