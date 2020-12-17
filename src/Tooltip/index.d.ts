import * as React from 'react';
type ReactNode = React.ReactNode;



declare class Tooltip extends React.Component<TooltipProps, {}> {

  render(): JSX.Element;
}

export interface TooltipProps {

  /**
     * use animation
     * 弹出是否使用动画，默认为 true
     * default: true
     */
  animation?: boolean;

  /**
   * Extend className
   * 扩展className
   * default: none
   */
  className?: string;

  /**
   * The child element can only be a ReactElement.
   * 子元素只能为一个 ReactElement
   * default: required
   */
  children?: ReactNode;

  /**
   * The position of the pop-up layer, options: ['left', 'top', 'right', 'bottom']
   * 弹出层位置
   * default: 'top'
   */
  position?: 'left' | 'top' | 'right' | 'bottom';

  /**
   * Extend style
   * 扩展样式
   * default: -
   */
  style?: React.CSSProperties;

  /**
   * Pop up texts
   * 弹出文字
   * default: required
   */
  tip?: ReactNode;

  /**
   * Pop-up type, one of  ["hover", "click"]
   * 弹出方式
   * default: "hover"
   */
  trigger?: 'hover' | 'click';

  /**
   * make disabled element work
   * 使被禁用的元素正常显示提示
   * default: false
   */
  disabledChild?: boolean;

}

export default Tooltip;
