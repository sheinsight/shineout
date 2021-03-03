import * as React from 'react'
import { PopoverProps } from '../Popover'
import { RuleParamsType } from '../Rule'
import { StandardProps, RegularAttributes, FormItemStandardProps, CommonProps } from '../@types/common'

type ReactNode = React.ReactNode;

export interface InputProps<Value> extends 
StandardProps, 
FormItemStandardProps<Value>, 
Pick<CommonProps, 'clearable'> {

  /**
   * User input triggers the onChange and to check interval, unit: ms.
   * 
   * 用户输入触发 onChange 和校验间隔时间，单位 毫秒。
   * 
   * default: 400
   */
  delay?: number;

  /**
   * The callback function for enter key
   * 
   * 回车键回调函数
   * 
   * default: -
   */
  onEnterPress?: (value: Value) => void;

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
   * Validation rules
   * 
   * 校验规则
   * 
   * default: -
   */
  rules?: RuleParamsType<Value, InputProps>
}

export interface InputNumberProps <Value> extends InputProps<Value> {

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
   * the digits of number
   * 
   * 数值的精度
   * 
   * default: -
   */
  digits?: number;

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

declare class Input<Value = any> extends React.Component<InputProps<Value>, {}> {
    static Number: typeof InputNumber;
}

declare class InputNumber<Value = number> extends React.Component<InputNumberProps<Value>, {}> {}

export default Input;
