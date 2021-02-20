import * as React from 'react';
import { StandardProps, RegularAttributes, FormItemStandardProps, CommonProps } from '../@types/common'

type ReactNode = React.ReactNode;

export interface TextareaProps<Value> extends
StandardProps, 
FormItemStandardProps<Value>, 
Pick<CommonProps, 'absolute' | 'clearable' | 'zIndex'> 
{

  /**
   * Whether the height changes automatically with the content
   * 
   * 高度是否随内容自动变化
   * 
   * default: false
   */
  autosize?: boolean;


  /**
   * User input triggers onChange and to check interval, unit: ms.
   * 
   * 用户输入触发 onChange 和校验间隔时间，单位 毫秒。
   * 
   * default: 400
   */
  delay?: number;

  /**
   * Infomation
   * 
   * 提示信息
   * 
   * default: -
   */
  info?: ((value: string) => string) | number;

  /**
   * The callback function for enter key
   * 
   * 回车键回调函数
   * 
   * default: 
   */
  onEnterPress?: (value: string) => void;

  /**
   * The position where the message pops up
   * 
   * 信息弹出位置
   * 
   * default: 
   */
  popover?: RegularAttributes.Position;

  /**
   * The minimum row height. Same as native textarea rows property.
   * 
   * 最小行高，同原生 textarea rows 属性
   * 
   * default: 4
   */
  rows?: number;

  /**
   * the maxHeight of the textarea, scroll bars appear after more than
   * 
   * 输入框的最大高度, 超过之后会出现滚动条
   * 
   * default: -
   */
  maxHeight?: number | string;

  /**
   * When trim is true, blank characters are automatically deleted when lose focus。
   * 
   * trim 为 true 时，失去焦点时会自动删除空白字符。
   * 
   * default: false
   */
  trim?: boolean;

  /**
   * support resize
   * 
   * 是否可以伸缩高度
   * 
   * default: false
   */
  resize?: boolean;

}

declare class Textarea<Value = any> extends React.Component<TextareaProps<Value>, {}> {}

export default Textarea;
