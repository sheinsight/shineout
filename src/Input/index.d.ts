import * as React from 'react';
import { PopoverProps } from '../Popover'
import { RuleParamsType } from '../Rule'
type ReactNode = React.ReactNode;


declare class InputNumber extends React.Component<InputNumberProps, {}> {
  render(): JSX.Element;
}


declare class Input extends React.Component<InputProps, {}> {
  static Number: typeof InputNumber;

  render(): JSX.Element;
}

export interface InputProps<T = any> {

  /**
   * Default value
   * 默认值
   * default: -
   */
  defaultValue?: string | number;

  /**
   * User input triggers the onChange and to check interval, unit: ms.
   * 用户输入触发 onChange 和校验间隔时间，单位 毫秒。
   * default: 400
   */
  delay?: number;

  /**
   * The name of Form which access data
   * Form 存取数据的名称
   * default: none
   */
  name?: string;

  /**
   * The callback function when the value is changing
   * 值改变回调函数
   * default: -
   */
  onChange?: (value: string) => void;

  /**
   * The callback function for enter key
   * 回车键回调函数
   * default: -
   */
  onEnterPress?: (value: string) => void;

  /**
   * Same as the native input tag
   * 同原生 input 标签的 placeholder
   * default: -
   */
  placeholder?: string;

  /**
   * The position where the text pop up
   * 信息弹出位置
   * default: none
   */
  popover?: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';

  /**
   * size of input
   * 尺寸
   * default: 'default'
   */
  size?: 'large' | 'default' | 'small';

  /**
   * Container element style
   * 最外层扩展样式
   * default: -
   */
  style?: React.CSSProperties;

  /**
   * Prompt information
   * 提示信息
   * default: none
   */
  tip?: ReactNode;

  /**
   * When trim is true, blank characters are automatically deleted when lose focus。
   * trim 为 true 时，失去焦点时会自动删除空白字符。
   * default: false
   */
  trim?: boolean;

  /**
   * Same as the type of the native input tag
   * 同原生 input 标签的 type
   * default: 'text'
   */
  type?: string;

  /**
   * The defaultValue and value can be set at the same time and defaultValue will be overridden by value。In the Form, the value will be taken over by the form and the value will lose efficacy.
   * defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖。在Form中，value会被表单接管，value无效
   * default: -
   */
  value?: string | number;

  /**
   * Remove content of the input when clicking the clear icon, clear event function
   * 可点击清空图标删除输入框内容，为函数式表示清空回调
   * default: false
   */
  clearable?: () => void | boolean;

  /**
   * Show as thousands separator, valid only when type is 'number'
   * 以千位分隔符展示,仅当type为number时有效
   * default: false
   */
  coin?: boolean;

  /**
   * Infomation
   * 提示信息
   * default: -
   */
  info?: (value: string) => string | number;

  /**
   * Vilidate popup properties, specific properties refer to Popover component description
   * 校验弹框接受的属性，具体属性参考Popover组件说明
   * default: none
   */
  popoverProps?: PopoverProps;

  /**
   * input max length
   * 可输入最大长度
   * default: none
   */
  maxLength?: number;

  /**
   * Validation rules
   * 校验规则
   * default: -
   */
  rules?: RuleParamsType<T>
}

export interface InputNumberProps {

  /**
   * The maximum value
   * 最大值
   * default: -
   */
  max?: number;

  /**
   * The minimum value
   * 最小值
   * default: -
   */
  min?: number;

  /**
   * Change the digital span. It can be decimal.
   * 改变数字跨度，可为小数
   * default: 1
   */
  step?: number;

  /**
   * the digits of number
   * 数值的精度
   * default: -
   */
  digits?: number;

  /**
   * allow value is null
   * 允许空值
   * default: false
   */
  allowNull?: boolean;

  /**
   * Whether to show increase/decrease buttons
   * 是否展示增减按钮
   * default: false
   */
  hideArrow?: boolean;

  /**
   * Show as thousands separator
   * 以千位分隔符展示
   * default: false
   */
  coin?: boolean;

}

export default Input;
