import * as React from 'react'

type SpinName = 'default' | 
'chasing-dots' | 
'cube-grid' | 
'double-bounce' |
'fading-circle' |
'four-dots' |
'plane' |
'pulse' |
'ring' |
'scale-circle' |
'three-bounce' |
'wave'

declare class Spin extends React.Component<SpinProps, {}> {

  render(): JSX.Element;
}

export interface SpinProps {

  /**
   * color
   * 
   * 颜色
   * 
   * default: #6c757d
   */
  color?: string;

  /**
   * size
   * 
   * 尺寸
   * 
   * default: 40
   */
  size?: number | string;

  /**
   * type. See the example for optional values.
   * 
   * 类型，可选值见示例
   * 
   * default: 'fading-circle'
   */
  name?: SpinName;


  /**
   * loading
   * 
   * 是否载入
   * 
   * default: false
   */
  loading?: boolean;

}

export default Spin
