import * as React from 'react'
import { StandardProps, ObjectType } from '../@types/common'
import { GetInputableProps } from '../Form/Props'
import { GetInputBorderProps, GetDelayProps, GetCoinProps, CoinProps } from '../hoc/Props'
import { InputTitleProps } from '../InputTitle/Props'

type ReactNode = React.ReactNode
export type NumType = 'positive' | 'non-negative'

type InputValue = string
export type NumberValueType = InputValue | number | null

type WidthInputHTMLAttribute<U> = U & Omit<React.InputHTMLAttributes<any>, keyof U>

export interface Props
  extends StandardProps,
    Pick<CoinProps, 'coin'>,
    Pick<InputTitleProps, 'innerTitle' | 'placeTitle'> {
  /**
   * @en value
   * @cn 输入值
   */
  value?: InputValue

  /**
   * @en onChange
   * @cn 值改变回调
   */
  onChange: (value?: InputValue) => void

  /**
   * @en width
   * @cn 宽度
   */
  width?: number

  /**
   * @en Remove content of the input when clicking the clear icon, clear event function
   * @cn 可点击清空图标删除输入框内容，为函数式表示清空回调
   * @default false
   */
  clearable?: boolean | (() => void)

  /**
   * @en The callback function for enter key
   * @cn 回车键回调函数
   */
  onEnterPress?: (value: InputValue, e?: any) => void

  /**
   * @en The callback function for key down
   * @cn 键盘按下回调
   */
  onKeyDown?: (e: React.KeyboardEvent) => void

  /**
   * @en The callback function for key up
   * @cn 键盘按下后抬起的回调
   */
  onKeyUp?: (e: React.KeyboardEvent) => void

  /**
   * @en Same as the type of the native input tag
   * @cn 同原生 input 标签的 type
   * @default 'text'
   */
  type?: string

  /**
   * @en Infomation
   * @cn 提示信息
   */
  info?: ((msg: string) => string) | number

  /**
   * @en input max length
   * @cn 可输入最大长度
   */
  maxLength?: number

  /**
   * @en get input element
   * @cn 获取 input dom 元素
   */
  forwardedRef?: (el: HTMLElement) => void

  /**
   * @en show border bottom
   * @cn 仅仅展示下边框
   * @default false
   */
  underline?: boolean

  /**
   *  @en After clicking the clear button, the data becomes undefined
   *  @cn 点击清除按钮后数据变为 undefined
   *  @default false
   */
  clearToUndefined?: boolean

  /**
   * @en Decimal place limit (valid when type is number)
   * @cn 小数位限制(type 为 number 时生效)
   */
  digits?: number

  /**
   *  @en Integer bit limit (valid when type is number)
   *  @cn 整数位数限制, 仅在 type = number 下生效
   */
  integerLimit?: number

  /**
   *  @en Number type supports 'positive' and 'non-negative', only works when type = number
   *  @cn 设置数字类型 支持 'positive' 和 'non-negative', 仅在 type = number 下生效
   *
   */
  numType?: NumType

  /**
   *  @en Automatically select all data after mouse click
   *  @cn 鼠标点击后自动全选数据
   *  @default false
   *
   */
  autoSelect?: boolean

  /**
   *  @en Automatically fill up according to the precision limit of digits after out of focus
   *  @cn 失焦后自动按照 digits 精度限制补足 (type 为 number 时生效)
   *  @default false
   *
   */
  autoFix?: boolean

  /**
   *  @en The original property of html
   *  @cn 原生 html 属性
   *
   */
  htmlName?: string

  /**
   *  @en Disable component
   *  @cn 禁用组件
   *  @default false
   *
   */
  disabled?: boolean
  inputFocus?: boolean
  /**
   *  @en The callback of blur
   *  @cn 失去焦点后的回调
   *
   */
  onBlur: React.FocusEventHandler
  /**
   * @en The callback when Textarea focus
   * @cn 聚焦后的回调
   */
  onFocus: React.FocusEventHandler
  cancelChange?: () => void
  forceChange?: (value: unknown, ...args: unknown[]) => void
  /**
   * @en Same as the native input tag
   * @cn 同原生 input 标签的 placeholder
   */
  placeholder?: string
  /**
   * @en Form field, used with Form
   * @cn 表单字段, 配合 Form 使用
   */
  name?: string
  /**
   * @en default value
   * @cn 默认值
   */
  defaultValue?: InputValue
  /**
   * @en When trim is true, blank characters are automatically deleted when lose focus。
   * @cn trim 为 true 时，失去焦点时会自动删除空白字符。
   * @default false
   */
  trim?: boolean
}

export type InputPropsWithCoin = GetCoinProps<Props>
export type InputPropsWithDelay = GetDelayProps<InputPropsWithCoin>
export type InputPropsWithBorder = GetInputBorderProps<InputPropsWithDelay>
/**
 * @title Input
 */
export type InputPropsWithInputable = Omit<GetInputableProps<InputPropsWithBorder, InputValue>, 'filterSameChange'>
export type InputProps = WidthInputHTMLAttribute<InputPropsWithInputable>

export interface ClearProps {
  onClick: (e: React.ChangeEvent<Element>, clearClick: boolean) => void
  clearResult?: string
}

export interface InputNumber extends Omit<Props, 'value' | 'defaultValue' | 'onChange' | 'type'> {
  /**
   * @en The minimum value
   * @cn 最小值
   */
  min?: number

  /**
   * @en The maximum value
   * @cn 最大值
   */
  max?: number

  /**
   * @en Change the digital span. It can be decimal.
   * @cn 改变数字跨度，可为小数
   * @default 1
   */
  step?: number
  /**
   * @en value
   * @cn 值
   */
  value?: NumberValueType
  /**
   * @en default value
   * @cn 默认值
   */
  defaultValue?: NumberValueType
  /**
   * @en allow value is null
   * @cn 清空后值为 null
   * @default false
   */
  allowNull?: boolean

  /**
   * @en Whether to hide increase/decrease buttons
   * @cn 是否隐藏增减按钮
   * @default false
   */
  hideArrow?: boolean
  /**
   * @en onChange
   * @cn 值改变回调
   */
  onChange: (value?: NumberValueType) => void
  /**
   * @en The callback function for mouse down
   * @cn 鼠标按下后的回调
   */
  onMouseDown?: (e: React.MouseEvent) => void

  /**
   * @en The callback function for mouse up
   * @cn 鼠标按下后抬起的回调
   */
  onMouseUp?: (e: React.MouseEvent) => void
}

export type InputNumberPropsWithCoin = GetCoinProps<InputNumber>
export type InputNumberPropsWithBorder = GetInputBorderProps<InputNumberPropsWithCoin>
/**
 * @title Input.Number
 */
export type InputNumberPropsWithInputable = Omit<
  GetInputableProps<InputNumberPropsWithBorder, NumberValueType>,
  'filterSameChange' | 'forceChange' | 'cancelChange' | 'type'
>
export type InputNumberProps = WidthInputHTMLAttribute<InputNumberPropsWithInputable>

export interface InputPassword extends Props {
  /**
   * @en password symbol
   * @cn 密码符号
   * @default "."
   */
  point?: string
}

export type InputPasswordPropsWithInputable = Omit<
  GetInputableProps<GetInputBorderProps<InputPassword>, string>,
  'filterSameChange' | 'forceChange' | 'cancelChange'
>

export type InputPasswordProps = WidthInputHTMLAttribute<InputPasswordPropsWithInputable>
export interface InputGroupBaseProps {
  children?: ReactNode
}

export interface InputGroupProps extends InputGroupBaseProps, ObjectType {}

export declare class InputNumberClass extends React.Component<InputNumberProps, {}> {
  render(): JSX.Element
}
export declare class InputGroupClass extends React.Component<InputGroupProps, {}> {
  render(): JSX.Element
}
export declare class InputPasswordClass extends React.Component<InputPasswordProps, {}> {
  render(): JSX.Element
}

export declare class InputClass extends React.Component<InputProps, {}> {
  static Number: typeof InputNumberClass

  static Password: typeof InputPasswordClass

  static Group: typeof InputGroupClass

  render(): JSX.Element
}

export type InputType = typeof InputClass
