import React, { ReactNode } from 'react'
import { ForceAdd, PartialKeys, RegularAttributes, StandardProps } from '../@types/common'
import { PopoverProps, PopoverPositionType } from '../Popover/Props'
import { PaginationProps } from '../Pagination/Props'

export type MovableType<U> = U & {
  /**
   * @en Is it possible to drag and drop to move
   * @cn 是否可以拖拽移动
   * @default false
   */
  moveable?: boolean
}

export type ResizableType<Props> = Props & {
  /**
   * @en Is it possible to drag the size
   * @cn 是否可以拖动大小
   * @default false
   */
  resizable?: boolean | 'x' | 'y' | 'xy'
}

export type ConfigType<Props> = Props

/** ------ inputBorder ------ * */
export interface InputBorderProps extends StandardProps {
  /**
   * @en Prompt information
   * @cn 提示信息
   */
  tip?: ReactNode
  /**
   * @en The position where the validation info pop up, see [Popover](/components/Popover)
   * @cn 校验信息弹出位置，参考 [Popover](/components/Popover)
   * @override PopoverProps["position"]
   */
  popover?: PopoverPositionType
  /**
   * @en input width
   * @cn 输入框宽度
   */
  width?: string | number
  /**
   * @inner 内部属性
   */
  error?: Error
  /**
   * @en Vilidate popup properties, specific properties refer to [Popover](/components/Popover)
   * @cn 校验弹框接受的属性，具体属性参考 [Popover](/components/Popover)
   * @type PopoverProps
   */
  popoverProps?: PopoverProps
  /**
   * @en only display border bottom
   * @cn 是否只展示下边框
   * @default false
   */
  underline?: boolean
  /**
   * @en Whether to automatically get the focus
   * @cn 是否自动获得焦点
   * @default false
   */
  autoFocus?: boolean
  /**
   * @en Whether to display border
   * @cn 是否展示边框
   * @default false
   */
  border?: boolean
  /**
   * @en disabled
   * @cn 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * @en callback function for blur event
   * @cn blur 事件回调函数
   */
  onBlur?: React.FocusEventHandler
  /**
   * @en callback function for blur focus
   * @cn focus 事件回调函数
   */
  onFocus?: React.FocusEventHandler
  /**
   * @en size
   * @cn 尺寸
   * @default "default"
   * @override union
   */
  size?: RegularAttributes.Size
}

export type GetInputBorderProps<Props extends { onFocus?: any; onBlur?: any }> = ForceAdd<
  Omit<PartialKeys<Props, 'onFocus' | 'onBlur'>, 'inputFocus'>,
  InputBorderProps
>

/** ------ delay ------ * */
export interface DelayProps {
  /**
   * @en User input triggers the onChange and to check interval, unit: ms.
   * @cn 用户输入触发 onChange 和校验间隔时间，单位 毫秒。
   * @default 400
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
  /**
   * @inner 同原生属性
   */
  onMouseDown?: React.MouseEventHandler
  /**
   * @inner 同原生属性
   */
  onMouseUp?: React.MouseEventHandler
  /**
   * @en Show as thousands separator, valid only when type is 'number'
   * @cn 以千位分隔符展示,仅当 type 为 number 时有效
   * @default false
   */
  coin?: boolean
}
export type GetCoinProps<Props extends { onFocus?: any; onBlur?: any }> = ForceAdd<
  PartialKeys<Props, 'onFocus' | 'onBlur'>,
  CoinProps
>

/** ------ hidable ------ * */
export type GetHidableConsumerProps<Props> = Props

/** ------ pagable ------ * */
export type GetPagableProps<Props> = Props & {
  /**
   * @en Show pagination See [Pagination](/components/Pagination) for details
   * @cn 展示分页 详见 [Pagination](/components/Pagination)
   */
  pagination?: PaginationProps
}
