import React from 'react'
import { StandardProps } from '../@types/common'
import { GetInputableProps } from '../Form/Props'

export interface ContainerProps<Value extends number | number[]> extends StandardProps {
  /**
   * Automatically hides the current value and scale
   *
   * 是否自动隐藏当前值和刻度
   *
   * default: false
   */
  autoHide?: boolean

  /**
   * Format displayed scale. When it is false, the scale is not displayed.
   *
   * 格式化显示刻度，为false时，不显示刻度
   *
   * default: v => v
   */
  formatScale?: ((value: number, index?: number) => string | number) | false

  /**
   * Format displayed current value. When it is false, the current value is not displayed.
   *
   * 格式化显示当前值，为false时，不显示当前值
   *
   * default:
   */
  formatValue?: ((value: number) => string) | false

  /**
   * height. Only effect when vertical is true
   *
   * 高度，仅在 vertical 为 true 情况下有效
   *
   * default: 200
   */
  height?: number | string

  /**
   * Drag over the maximum event
   *
   * 值改变时回调函数
   *
   * default: [0, 100]
   */
  onChange: (value: Value) => void

  /**
   * Value range. An array whose length is greater than 2.
   *
   * 取值范围，长度 >= 2 的数组
   *
   * default: [0, 100]
   */
  scale?: number[]

  /**
   * Step size. Must be greater than or equal to 0; When it is 0, only the value specified by scale can be selected.
   *
   * 步长，必须大于等于0；为0时，只能选取 scale 指定的值
   *
   * default: 1
   */
  step?: number

  /**
   * current value
   *
   * 当前值
   *
   * default: -
   */
  value?: Value

  /**
   * default value
   *
   * 默认值
   *
   * default: -
   */
  defaultValue?: Value

  /**
   * Whether to be vertical
   *
   * 是否垂直
   *
   * default: false
   */
  vertical?: boolean

  /**
   * Whether to display double slider
   *
   * 是否显示双滑块
   *
   * default: false
   */
  range?: boolean

  /**
   * Disable component
   *
   * 是否禁用组件
   *
   * default: false
   */
  disabled?: boolean

  /**
   * Drag over the maximum event
   *
   * 拖动超过最大值事件
   *
   * default: -
   */
  onIncrease?: (value?: number) => void
}

export interface SliderProps<Value extends number | number[]>
  extends Pick<ContainerProps<Value>, 'disabled' | 'autoHide' | 'formatValue' | 'vertical' | 'onIncrease' | 'step'> {
  index: 0 | 1
  min?: number
  max?: number
  onChange: (index: 0 | 1, val: number) => void
  onDrag?: any
  scale: number[]
  value: number
}

export interface IndicatorProps {
  disabled?: boolean
  onDragStart: () => void
}

export type SliderPropsWidthInputable<Value extends number | number[]> = GetInputableProps<ContainerProps<Value>, Value>
export type GetSliderProps<Value extends number | number[]> = SliderPropsWidthInputable<Value>

export declare class SliderClass<Value extends number | number[]> extends React.Component<GetSliderProps<Value>, {}> {
  render(): JSX.Element
}

export type SliderType = typeof SliderClass
