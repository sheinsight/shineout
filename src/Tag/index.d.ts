import * as React from 'react'
import {StandardProps} from '../@types/common'

type ReactNode = React.ReactNode


export interface TagProps extends StandardProps{

  /**
   * Content, text or react component
   *
   * 内容，文字或react组件
   *
   * default: -
   */
  children?: ReactNode;

  /**
   * background color,can set the tag's background color by it
   *
   * 背景色,可以自行的设置标签的背景色
   *
   * default: -
   */
  backgroundColor?: string;

  /**
   * When onClose is empty, no close is displayed. If you need to close and do not need to handle callbacks, set it true.
   *
   * 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为true即可
   *
   * default: -
   */
  onClose?: (() => void) | boolean;

  /**
   * the click callback
   *
   * 点击tag事件
   *
   * default: -
   */
  onClick?: (e: MouseEvent) => void;

  /**
   * is disabled
   *
   * 是否禁用
   *
   * default: false
   */
  disabled?: boolean;

  /**
   * types
   *
   * 类型
   *
   * default: *default*
   */
  type?: 'success' | 'info' | 'warning' | 'danger' | 'error' | 'default';

  /**
   * This event is triggered when Tag editing is completed (children must be string)
   *
   * Tag 编辑完成时触发该事件（children 必须为 string）
   *
   * default: -
   */
  onCompleted?: (value: string) => void;

}

declare class Tag extends React.Component<TagProps, {}> {

  render(): JSX.Element;
}

export default Tag
