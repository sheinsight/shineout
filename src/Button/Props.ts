import * as React from 'react'
import { StandardProps, RegularAttributes, ForceAdd } from '../@types/common'

export type ButtonType = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'link'
export type ButtonShape = 'default' | 'circle' | 'round'

export interface OriginButtonProps extends StandardProps {
  /**
   * The content inside the button, can be a text icon, etc.
   *
   * 按钮里面的内容, 可以是文字图标等
   *
   * default: required
   */
  children?: React.ReactNode

  /**
   * Specifies the button should be disabled
   *
   * 禁用
   *
   * default: false
   */
  disabled?: boolean

  /**
   * If the href attribute is set, &lt;a> will be used instead of &lt;button>.
   *
   * 如果设置了 href 属性，将会用 <a> 代替 <button>
   *
   * default: -
   */
  href?: string

  /**
   * If present, target will be set onto <a> element.(Effective only when href is been set)
   *
   * 当设置了 href 属性时，target 会被设置到 <a> 元素上
   *
   * default: -
   */
  target?: '_self' | '_blank' | '_parent' | '_top' | string

  /**
   * When outline is true, the background is transparent.
   *
   * outline 为 true 时，显示透明背景的按钮
   *
   * default: false
   */
  outline?: boolean

  /**
   * size of button
   *
   * 按钮尺寸
   *
   * default: 'default'
   */
  size?: RegularAttributes.Size

  /**
   * type of button
   *
   * 按钮类型
   *
   * default: 'default'
   */
  type?: ButtonType

  /**
   * type of button original
   *
   * 按钮原生type属性
   *
   * default: 'button'
   */
  htmlType?: 'button' | 'reset' | 'submit'

  /**
   * text button
   *
   * 文字按钮，不展示边框和背景
   *
   * default: false
   */
  text?: boolean

  /**
   * button click callback
   *
   * 按钮点击回调
   *
   * default: none
   */
  onClick?: React.MouseEventHandler<HTMLElement>

  /**
   * For Button with only 2 Chinese characters, whether to insert a space between the two Chinese characters.
   *
   * 仅有2个汉字的按钮，是否在2个汉字中间插入空格
   *
   * default: false
   */
  space?: boolean

  /**
   * loading
   *
   * loading状态
   *
   * default: null
   */
  loading?: boolean

  /**
   * Can be set button shape
   *
   * 设置按钮形状
   *
   * default: 'default'
   */
  shape?: ButtonShape

  /**
   *  get button dom
   *
   *  获取按钮节点
   *
   *  default: -
   */
  onRef?: React.RefCallback<any>
}

export type ButtonProps = ForceAdd<OriginButtonProps, Omit<React.ButtonHTMLAttributes<any>, 'placeholder' | 'onSubmit'>>

export interface ButtonGroupProps extends StandardProps {
  /**
   * array of Button
   *
   * 由 Button 组成的 array
   *
   * default: required
   */
  children?: React.ReactNode

  /**
   * same as Button
   *
   * 同 Button；如果 Button 和 Group 同时设置 size，以 Group 为准
   *
   * default: -
   */
  size?: RegularAttributes.Size

  /**
   * same as Button
   *
   * 同 Button；如果 Button 未设置，使用此值
   *
   * default: -
   */
  outline?: boolean

  /**
   * same as Button
   *
   * 同 Button；如果 Button 和 Group 同时设置 type，以 Group 为准
   *
   * default: -
   */
  type?: ButtonType
}
