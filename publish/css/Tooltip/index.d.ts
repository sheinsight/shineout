import * as React from 'react'
import {StandardProps} from "../@types/common"

type ReactNode = React.ReactNode;

export interface TooltipProps extends StandardProps{

  /**
   * The child element can only be a ReactElement.
   *
   * 子元素只能为一个 ReactElement
   *
   * default: required
   */
  children: ReactNode;

  /**
   * Pop up texts
   *
   * 弹出文字
   *
   * default: required
   */
  tip: ReactNode;

  /**
   * use animation
   *
   * 弹出是否使用动画，默认为 true
   *
   * default: true
   */
  animation?: boolean;

  /**
   * The position of the pop-up layer, options: ['left', 'top', 'right', 'bottom']
   *
   * 弹出层位置
   *
   * default: 'top'
   */
  position?: 'left' | 'top' | 'right' | 'bottom';

  /**
   * Pop-up type, one of  ["hover", "click"]
   *
   * 弹出方式
   *
   * default: "hover"
   */
  trigger?: 'hover' | 'click';

  /**
   * make disabled element work
   *
   * 使被禁用的元素正常显示提示
   *
   * default: false
   */
  disabledChild?: boolean;

}

declare class Tooltip extends React.Component<TooltipProps, {}> {

  render(): JSX.Element;
}

export default Tooltip
