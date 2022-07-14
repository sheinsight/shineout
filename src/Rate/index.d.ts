import React, { ReactNode } from 'react'
import { FormItemStandardProps } from '../@types/common'

export declare interface RateProps extends
  Pick<FormItemStandardProps<number>, 'value' | 'defaultValue' | 'onChange'> {
  /**
   * Whether to allow semi selection
   *
   * 是否允许半选
   *
   * default: false
   */
  allowHalf?: boolean;

  /**
   * whether to allow clear when click again
   *
   * 是否允许再次点击后清除
   *
   * default: false
   */
  clearable?: boolean;

  /**
   * read-only
   *
   * 是否只读
   *
   * default: false
   */
  disabled?: boolean;

  /**
   * The maximum value of the option, integer
   *
   * 选项最大值，整数
   *
   * default: 5
   */
  max?: number;

  /**
   * When repeat is true, display item is a copy of the item corresponding to the current value
   *
   * 为 true 时，显示的选项为当前分值对应选项的复制
   *
   * default: true
   */
  repeat?: boolean;

  /**
   * the size of the icon
   *
   * 图标大小
   *
   * default: 20
   */
  size?: number | string;

  /**
   * Text
   *
   * 附加文字
   *
   * default: -
   */
  text?: Array<ReactNode>;
}

declare class RateComponent extends React.Component<RateProps, any> {
  render(): JSX.Element
}
type shape = React.ReactElement | string | Array<string | React.ReactElement>
declare function Rate(background: shape, front: shape): (typeof RateComponent)

export default Rate
