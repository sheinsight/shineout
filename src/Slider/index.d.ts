import * as React from 'react';
import { StandardProps, FormItemStandardProps, CommonProps } from '../@types/common'

export interface SliderProps<Value> extends
StandardProps, 
FormItemStandardProps<Value>
  {

  /**
   * Automatically hides the current value and scale
   * 
   * 是否自动隐藏当前值和刻度
   * 
   * default: false
   */
  autoHide?: boolean;

  /**
   * Disable component
   * 
   * 是否禁用组件
   * 
   * default: false
   */
  disabled?: boolean;  

  /**
   * Format displayed scale. When it is false, the scale is not displayed.
   * 
   * 格式化显示刻度，为false时，不显示刻度
   * 
   * default: v => v
   */
  formatScale?: (value: Value) => string | boolean;

  /**
   * Format displayed current value. When it is false, the current value is not displayed.
   * 
   * 格式化显示当前值，为false时，不显示当前值
   * 
   * default: 
   */
  formatValue?: (value: Value) => string | boolean;

  /**
   * height. Only effect when vertical is true
   * 
   * 高度，仅在 vertical 为 true 情况下有效
   * 
   * default: 200
   */
  height?: number;

  /**
   * Drag over the maximum event
   * 
   * 拖动超过最大值事件
   * 
   * default: -
   */
  onIncrease?: (value: Value) => boolean;

  /**
   * Whether to display double slider
   * 
   * 是否显示双滑块
   * 
   * default: false
   */
  range?: boolean;

  /**
   * Value range. An array whose length is greater than 2.
   * 
   * 取值范围，长度 >= 2 的数组
   * 
   * default: [0, 100]
   */
  scale?: number[];

  /**
   * Step size. Must be greater than or equal to 0; When it is 0, only the value specified by scale can be selected.
   * 
   * 步长，必须大于等于0；为0时，只能选取 scale 指定的值
   * 
   * default: 1
   */
  step?: number;

  /**
   * Whether to be vertical
   * 
   * 是否垂直
   * 
   * default: false
   */
  vertical?: boolean;
}

declare class Slider<Value = any> extends React.Component<SliderProps<Value>, {}> {}

export default Slider;
