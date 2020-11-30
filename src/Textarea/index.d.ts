import * as React from 'react';
type ReactNode = React.ReactNode;



declare class Textarea extends React.Component<TextareaProps, {}> {

  render(): JSX.Element;
}

export interface TextareaProps {

  /**
   * Whether the height changes automatically with the content
   * 高度是否随内容自动变化
   * default: false
   */
  autosize?: boolean;

  /**
   * default value
   * 默认值
   * default: 
   */
  defaultValue?: string | number;

  /**
   * User input triggers onChange and to check interval, unit: ms.
   * 用户输入触发 onChange 和校验间隔时间，单位 毫秒。
   * default: 400
   */
  delay?: number;

  /**
   * Infomation
   * 提示信息
   * default: -
   */
  info?: ((value: string) => string) | number;

  /**
   * The name that accesses data from Form
   * Form 存取数据的名称
   * default: none
   */
  name?: string;

  /**
   * The callback function for changing value
   * 值改变回调函数
   * default: 
   */
  onChange?: (value: string) => void;

  /**
   * The callback function for enter key
   * 回车键回调函数
   * default: 
   */
  onEnterPress?: (value: string) => void;

  /**
   * The same as the native placeholder tag.
   * 同原生 input 标签的 placeholder
   * default: 
   */
  placeholder?: string;

  /**
   * The position where the message pops up
   * 信息弹出位置
   * default: 
   */
  popover?: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';

  /**
   * The minimum row height. Same as native textarea rows property.
   * 最小行高，同原生 textarea rows 属性
   * default: 4
   */
  rows?: number;

  /**
   * the maxHeight of the textarea, scroll bars appear after more than
   * 输入框的最大高度, 超过之后会出现滚动条
   * default: -
   */
  maxHeight?: number | string;

  /**
   * Container element style
   * 最外层扩展样式
   * default: -
   */
  style?: React.CSSProperties;

  /**
   * When trim is true, blank characters are automatically deleted when lose focus。
   * trim 为 true 时，失去焦点时会自动删除空白字符。
   * default: false
   */
  trim?: boolean;

  /**
   * support resize
   * 是否可以伸缩高度
   * default: false
   */
  resize?: boolean;

  /**
   * DefaultValue and value can be set at the same time and defaultValue will be overridden by value. In the Form, the value is taken over by the Form and lose efficacy.
   * defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖。在Form中，value会被表单接管，value无效
   * default: 
   */
  value?: string | number;

}

export default Textarea;
