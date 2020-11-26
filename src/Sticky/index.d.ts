import * as React from 'react';
type ReactNode = React.ReactNode;



declare class Sticky extends React.Component<StickyProps, {}> {

  render(): JSX.Element;
}

export interface StickyProps {

  /**
   * Offsets from the bottom.
   * 距离底部多少偏移量触发
   * default: -
   */
  bottom?: number;

  /**
   * Extend className
   * 扩展className
   * default: -
   */
  className?: string;

  /**
   * Extend style. The default z-Index after triggering the float is 900, and you can modify the z-Index of the style to change.
   * 扩展样式。触发浮动后的默认zIndex为900，修改style的zIndex来改变。
   * default: -
   */
  style?: React.CSSProperties;

  /**
   * Attached target. the default is the document.body. You can pass in an HTMLElement or css selector, and the target must be an ancestor node of the Sticky component.
   * 附着的目标，默认为document.body。可以传入HTMLElement或者css selector，target 必须为 Sticky 组件的祖先节点
   * default: none
   */
  target?: string | HTMLElement;

  /**
   * Offsets from the top.
   * 距离顶部多少偏移量触发
   * default: none
   */
  top?: number;

  /**
   * use css position:sticky while target is ordered
   * 在指定 target 下，是否采用css方式实现附着效果
   * default: true
   */
  css?: bool;

}

export default Sticky;
