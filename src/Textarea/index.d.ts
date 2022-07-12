import * as React from 'react'
import { StandardProps, RegularAttributes, FormItemStandardProps } from '../@types/common'
import { ReactNode } from "react"

export interface TextareaProps<Value> extends
StandardProps,
FormItemStandardProps<Value>
  {

  /**
   * show border bottom
   *
   * 仅仅展示下边框
   *
   * default: false
   */
  underline?: boolean;

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
  onEnterPress?: (value: Value) => void;

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

  /**
   * disabled
   *
   * 禁用
   *
   * default: false
   */
  disabled?: boolean;

  /**
   * inner title
   *
   * 内嵌标题
   *
   * default: -
   */
  // 暂时屏蔽该属性
  // innerTitle?: ReactNode,
  /**
   * Placeholder title, which needs to be used together with innerTitle
   *
   * 占位标题，需要配合 innerTitle 一起使用
   *
   * default: -
   */
  placeTitle?: ReactNode,

  /**
   * render textarea footer
   *
   * 渲染 textarea footer
   *
   * default: -
   */
  renderFooter?: ReactNode,

  /**
   * Customize display results
   *
   * 自定义显示结果
   *
   * default: -
   */
  renderResult?: ()=> ReactNode,

  /**
   * The callback when Textarea blur
   *
   * 失去焦点后的回调
   *
   * default: -
   */
  onBlur?: (e: Event)=> void,

}

declare class Textarea<Value = any> extends React.Component<TextareaProps<Value>, {}> {
  render(): JSX.Element
}

export default Textarea
