import * as React from 'react'
import { StandardProps, RegularAttributes, ForceAdd } from '../@types/common'

export type ButtonType = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'link'
export type ButtonShape = 'default' | 'circle' | 'round'

/**
 * @title Button
 */
export interface OriginButtonProps extends StandardProps {
  /**
   * @en The content inside the button, can be a text icon, etc.
   * @cn 按钮里面的内容, 可以是文字图标等
   */
  children?: React.ReactNode

  /**
   * @en Specifies the button should be disabled
   * @cn 禁用
   * @default false
   */
  disabled?: boolean

  /**
   * @en If the href attribute is set, &lt;a> will be used instead of &lt;button>.
   * @cn 如果设置了 href 属性，将会用 <a> 代替 <button>
   */
  href?: string

  /**
   * @en If present, target will be set onto <a> element.(Effective only when href is been set)
   * @cn 当设置了 href 属性时，target 会被设置到 <a> 元素上
   */
  target?: '_self' | '_blank' | '_parent' | '_top' | string

  /**
   * @en When outline is true, the background is transparent.
   * @cn outline 为 true 时，显示透明背景的按钮
   * @default false
   */
  outline?: boolean

  /**
   * @en size of button
   * @cn 按钮尺寸
   * @default 'default'
   * @override union
   */
  size?: RegularAttributes.Size

  /**
   * @en type of button
   * @cn 按钮类型
   * @default 'default'
   * @override union
   */
  type?: ButtonType

  /**
   * @en type of button original
   * @cn 按钮原生type属性
   * @default 'button'
   */
  htmlType?: 'button' | 'reset' | 'submit'

  /**
   * @en text button
   * @cn 文字按钮，不展示边框和背景
   * @default false
   */
  text?: boolean

  /**
   * @en button click callback
   * @cn 按钮点击回调
   */
  onClick?: React.MouseEventHandler<HTMLElement>

  /**
   * @en For Button with only 2 Chinese characters, whether to insert a space between the two Chinese characters.
   * @cn 仅有2个汉字的按钮，是否在2个汉字中间插入空格
   * @default false
   */
  space?: boolean

  /**
   * @en loading
   * @cn loading 状态
   * @default false
   */
  loading?: boolean

  /**
   * @en Can be set button shape
   * @cn 设置按钮形状
   * @default 'default'
   * @override union
   */
  shape?: ButtonShape

  /**
   *  @en get button dom
   *  @cn 获取按钮节点
   */
  onRef?: React.RefCallback<any>
}

export type ButtonProps = ForceAdd<OriginButtonProps, Omit<React.ButtonHTMLAttributes<any>, 'placeholder' | 'onSubmit'>>

/**
 * @title ButtonGroup
 */
export interface ButtonGroupProps extends StandardProps {
  /**
   * @en array of Button
   * @cn 由 Button 组成的 array
   */
  children: React.ReactNode

  /**
   * @en same as Button
   * @cn 同 Button；如果 Button 和 Group 同时设置 size，以 Group 为准
   * @override union
   */
  size?: RegularAttributes.Size

  /**
   * @en same as Button
   * @cn 同 Button；如果 Button 未设置，使用此值
   */
  outline?: boolean

  /**
   * @en same as Button
   * @cn 同 Button；如果 Button 和 Group 同时设置 type，以 Group 为准
   */
  type?: ButtonType
}
