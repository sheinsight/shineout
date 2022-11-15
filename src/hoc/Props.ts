import React, { ReactNode } from 'react'
import { ForceAdd, PartialKeys, RegularAttributes } from '../@types/common'
import { PopoverProps } from '../Popover/interface'

export type MovableType<U> = U & {
  moveable?: boolean
}

export type ResizableType<Props> = Props & {
  resizable?: boolean | string
}

export type ConfigType<Props> = Props

/** ------ inputBorder ------ * */
export interface InputBorderProps {
  className?: string
  style?: React.CSSProperties
  /**
   * Prompt information
   *
   * 提示信息
   *
   * default: none
   */
  tip?: ReactNode
  popover?: RegularAttributes.Position
  width?: string | number
  error?: Error
  /**
   * Vilidate popup properties, specific properties refer to Popover component description
   *
   * 校验弹框接受的属性，具体属性参考Popover组件说明
   *
   * default: none
   */
  popoverProps?: PopoverProps
  underline?: boolean
  autoFocus?: boolean
  border?: boolean
  // base props
  disabled?: boolean | (() => boolean)
  onBlur?: React.FocusEventHandler
  onFocus?: React.FocusEventHandler
  size?: RegularAttributes.Size
}

export type GetInputBorderProps<Props extends {}> = ForceAdd<
  Omit<PartialKeys<Props, 'onFocus' | 'onBlur'>, 'inputFocus'>,
  InputBorderProps
>

/** ------ delay ------ * */
export interface DelayProps {
  /**
   * User input triggers the onChange and to check interval, unit: ms.
   *
   * 用户输入触发 onChange 和校验间隔时间，单位 毫秒。
   *
   * default: 400
   */
  delay?: number
  value?: any
  onChange: (...args: any) => void
}
export type GetDelayProps<Props> = ForceAdd<Omit<Props, 'forceChange' | 'cancelChange'>, DelayProps>

/** ------ coin ------ * */
export interface CoinProps {
  value?: number | string | null
  onChange?: any
  type?: string
  onFocus?: (e: any) => void
  onBlur?: (e: any) => void
  onMouseDown?: React.MouseEventHandler
  onMouseUp?: React.MouseEventHandler
  /**
   * Show as thousands separator, valid only when type is 'number'
   *
   * 以千位分隔符展示,仅当type为number时有效
   *
   * default: false
   */
  coin?: boolean
}
export type GetCoinProps<Props> = ForceAdd<PartialKeys<Props, 'onFocus' | 'onBlur'>, CoinProps>

/** ------ trim ------ * */

export interface TrimProps {
  value?: any
  onChange?: (...args: any) => void
  onBlur?: (e: any) => void
  /**
   * When trim is true, blank characters are automatically deleted when lose focus。
   *
   * trim 为 true 时，失去焦点时会自动删除空白字符。
   *
   * default: false
   */
  trim?: boolean
}
export type GetTrimProps<Props> = ForceAdd<Props, TrimProps>
