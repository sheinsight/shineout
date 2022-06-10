import * as React from 'react'
import { PopoverProps } from '../Popover'
import { StandardProps, RegularAttributes, FormItemStandardProps, CommonProps } from '../@types/common'

type ReactNode = React.ReactNode;
export type numType = "positive" | "non-negative";

export interface InputProps<Value> extends
  StandardProps,
  FormItemStandardProps<Value> {

  /**
   * width
   *
   * 宽度
   *
   * default: null
   */
  width?: number;

  /**
   * User input triggers the onChange and to check interval, unit: ms.
   *
   * 用户输入触发 onChange 和校验间隔时间，单位 毫秒。
   *
   * default: 400
   */
  delay?: number;

  /**
   * If clearable is true, show clear value icon
   *
   * 是否可清除值
   *
   * default: false
   */
  clearable?: boolean | (() => void);

  /**
   * The callback function for enter key
   *
   * 回车键回调函数
   *
   * default: -
   */
  onEnterPress?: (value: Value) => void;

  /**
   * The callback function for key down
   *
   * 键盘按下回调
   *
   * default: none
   */
  onKeyDown?: (e: KeyboardEvent) => void;

  /**
   * The callback function for key up
   *
   * 键盘按下后抬起的回调
   *
   * default: none
   */
  onKeyUp?: (e: KeyboardEvent) => void;

  /**
   * The position where the text pop up
   *
   * 信息弹出位置
   *
   * default: none
   */
  popover?: RegularAttributes.Position;

  /**
   * size of input
   *
   * 尺寸
   *
   * default: 'default'
   */
  size?: RegularAttributes.Size;

  /**
   * Prompt information
   *
   * 提示信息
   *
   * default: none
   */
  tip?: ReactNode;

  /**
   * When trim is true, blank characters are automatically deleted when lose focus。
   *
   * trim 为 true 时，失去焦点时会自动删除空白字符。
   *
   * default: false
   */
  trim?: boolean;

  /**
   * Same as the type of the native input tag
   *
   * 同原生 input 标签的 type
   *
   * default: 'text'
   */
  type?: string;

  /**
   * Show as thousands separator, valid only when type is 'number'
   *
   * 以千位分隔符展示,仅当type为number时有效
   *
   * default: false
   */
  coin?: boolean;

  /**
   * Infomation
   *
   * 提示信息
   *
   * default: -
   */
  info?: (msg: string) => string;

  /**
   * Vilidate popup properties, specific properties refer to Popover component description
   *
   * 校验弹框接受的属性，具体属性参考Popover组件说明
   *
   * default: none
   */
  popoverProps?: PopoverProps;

  /**
   * input max length
   *
   * 可输入最大长度
   *
   * default: none
   */
  maxLength?: number;

  /**
   * get input element
   *
   * 获取 input dom 元素
   *
   * default: -
   */
  forwardedRef?: (el: HTMLElement) => void;

  /**
   * show border bottom
   *
   * 仅仅展示下边框
   *
   * default: false
   */
  underline?: boolean;

  /**
   * inner title
   *
   * 内嵌标题
   *
   * default: -
   */
  innerTitle?: ReactNode;


  /**
   * Placeholder title, which needs to be used together with innerTitle
   *
   * 占位标题，需要配合 innerTitle 一起使用
   *
   * default: -
   */
  placeTitle?: ReactNode,

  /**
   *  After clicking the clear button, the data becomes undefined
   *
   *  点击清除按钮后数据变为 undefined
   *
   *  default: -
   *
   */
  clearToUndefined?: boolean,

  /**
   * Decimal place limit (valid when type is number)
   *
   * the digits of number 仅在type = number 下生效
   *
   * default: -
   */
  digits?: number;

  /**
   *  Integer bit limit (valid when type is number)
   *
   *  整数位数限制, 仅在type = number 下生效
   *
   *  default: -
   *
   */
  integerLimit?: number,

  /**
   *  Number type supports 'positive' and 'non-negative', only works when type = number
   *
   *  设置数字类型 支持 'positive' 和 'non-negative', 仅在type = number 下生效
   *
   *  default: -
   *
   */
  numType?: numType,

  /**
   *  nonnegative number (valid when type is number)
   *
   *  非负数，仅在type = number 下生效
   *
   *  default: -
   *
   */
  nonnegative?: boolean,

  /**
   *  Automatically select all data after mouse click
   *
   *  鼠标点击后自动全选数据
   *
   *  default: false
   *
   */
  autoSelect?: boolean,

  /**
   *  Automatically fill up according to the precision limit of digits after out of focus
   *
   *  失焦后自动按照 digits 精度限制补足 (type 为 number 时生效)
   *
   *  default: false
   *
   */
  autoFix?: boolean,

  /**
   *  The original property of html
   *
   *  原生html属性
   *
   *  default: -
   *
   */
  htmlName?: string,

  /**
   *  The callback of blur
   *
   *  失去焦点后的回调
   *
   *  default: -
   *
   */
  onBlur?: (e: Event) => void,

}

export interface InputNumberProps<Value> extends InputProps<Value> {

  /**
   * The maximum value
   *
   * 最大值
   *
   * default: -
   */
  max?: number;

  /**
   * The minimum value
   *
   * 最小值
   *
   * default: -
   */
  min?: number;

  /**
   * Change the digital span. It can be decimal.
   *
   * 改变数字跨度，可为小数
   *
   * default: 1
   */
  step?: number;

  /**
   * allow value is null
   *
   * 允许空值
   *
   * default: false
   */
  allowNull?: boolean;

  /**
   * Whether to show increase/decrease buttons
   *
   * 是否展示增减按钮
   *
   * default: false
   */
  hideArrow?: boolean;

}

export interface InputGroupProps<Value = any> extends InputProps<Value> {
  /**
   * children
   *
   * 子元素
   *
   * default: -
   */
  children?: ReactNode;
}

export interface InputPasswordProps<Value = any> extends InputProps<Value> {
  /**
   * password symbol
   *
   * 密码符号
   *
   * default: '.'
   */
  point?: 'string';
}

declare class InputGroup<Value = any> extends React.Component<InputProps<Value>, {}> { }


declare class InputNumber<Value = number> extends React.Component<InputNumberProps<Value>, {}> { }

declare class InputPassword<Value = string> extends React.Component<InputPasswordProps<Value>, {}> { }
declare class Input<Value = any> extends React.Component<InputProps<Value>, {}> {
  static Number: typeof InputNumber;

  static Group: typeof InputGroup;

  static Password: typeof InputPassword;
}

export default Input
