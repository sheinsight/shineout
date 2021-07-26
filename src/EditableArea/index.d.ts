import React from 'react'
import {StandardProps, FormItemStandardProps} from '../@types/common'

export interface EditableAreaProps extends StandardProps, FormItemStandardProps<string> {

  /**
   * Whether to show the border
   *
   * 是否显示外边框
   *
   * default: false
   */
  bordered?: boolean;

  /**
   * Whether to show the clear button
   *
   * 是否展示清除按钮
   *
   * default: true
   */
  clearable?: boolean;

  /**
   * User input triggers the onChange and to check interval, unit: ms.
   *
   * 用户输入触发 onChange 和校验间隔时间，单位 毫秒
   *
   * default: 400
   */
  delay?: number;

  /**
   * Whether to disable
   *
   * 是否禁用
   *
   * default: false
   */
  disabled?: boolean;

  /**
   * Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement
   *
   * 自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement
   *
   *  default: none
   */
  getPopupContainer?: () => HTMLElement;

  /**
   * the maxHeight of the textarea, scroll bars appear after more than
   *
   * 输入框的最大高度, 超过之后会出现滚动条
   *
   * default: none
   */
  maxHeight?: number | string;

  /**
   * blur event
   *
   * 失去焦点事件
   *
   * default: none
   */
  onBlur?: (e: MouseEvent) => void;

  /**
   * focus event
   *
   * 聚焦事件
   *
   * default: none
   */
  onFocus?: (e: MouseEvent) => void;

  /**
   * When trim is true, blank characters are automatically deleted when lose focus
   *
   * trim 为 true 时，失去焦点时会自动删除空白字符
   *
   * default: false
   */
  trim?: boolean;

  /**
   * width of the editablearea
   *
   * 编辑域宽度
   *
   * default: none
   */
  width?: number | string;
}

declare class EditableArea extends React.PureComponent<EditableAreaProps, any>{}

export default EditableArea
