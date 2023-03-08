import { ReactElement, ReactNode } from 'react'
import { StandardProps } from '../@types/common'
import { GetInputableProps } from '../Form/Props'

export declare interface OriginRateProps extends ArgProps, StandardProps {
  /**
   * @en Whether to allow semi selection
   * @cn 是否允许半选
   * @default false
   */
  allowHalf?: boolean

  /**
   * @en whether to allow clear when click again
   * @cn 是否允许再次点击后清除
   * @default false
   */
  clearable?: boolean

  /**
   * @en read-only
   * @cn 是否只读
   * @default false
   */
  disabled?: boolean

  /**
   * @en The maximum value of the option, integer
   * @cn 选项最大值，整数
   * @default 5
   */
  max?: number

  /**
   * @en When repeat is true, display item is a copy of the item corresponding to the current value
   * @cn 为 true 时，显示的选项为当前分值对应选项的复制
   * @default true
   */
  repeat?: boolean

  /**
   * @en the size of the icon
   * @cn 图标大小
   * @default 20
   * @override union
   */
  size?: number | string

  /**
   * @en Text
   * @cn 附加文字
   */
  text?: Array<ReactNode>

  /**
   * @en Selected key (controlled)
   * @cn 选中的 key （受控)
   */
  value: number

  /**
   * @en value change callback
   * @cn 值改变回调
   */
  onChange: (value: number) => void
}
export interface ArgProps {
  /**
   * @en Unselected element background
   * @cn 未选中元素背景
   * @override union
   */
  background?: ReactElement | string | Array<string | ReactElement>

  /**
   * @en selected element background
   * @cn 选中元素背景
   * @override union
   */
  front?: ReactElement | string | Array<string | ReactElement>
}

export type RateProps = GetInputableProps<Omit<OriginRateProps, keyof ArgProps>, string>
