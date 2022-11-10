import { ReactElement, ReactNode } from "react"
import { StandardProps } from "../@types/common"
import { GetInputableProps } from "../Form/Props"




export declare interface OriginRateProps extends ArgProps, StandardProps{
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

  /**
   * Selected key (controlled)
   *
   * 选中的 key （受控)
   *
   * default: -
   */
  value: number;

  /**
   * value change callback
   *
   * 值改变回调
   *
   * default: -
   */
  onChange: (value: number) => void;

}
export interface ArgProps {
  /**
   * Unselected element background
   *
   * 未选中元素背景
   *
   * default: -
   */
  background?: ReactElement | Array<ReactElement>;

  /**
   * selected element background
   *
   * 选中元素背景
   *
   * default: -
   */
  front?: ReactElement | Array<ReactElement>;
}


export type RateProps = GetInputableProps<Omit<OriginRateProps, keyof ArgProps>, string>
