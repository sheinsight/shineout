import * as React from 'react'

// type ReactNode = React.ReactNode
import { StandardProps } from '../@types/common'

export interface StickyProps extends StandardProps {
  /**
   * Offsets from the bottom.
   * 
   * 距离底部多少偏移量触发
   * 
   * default: -
   */
  bottom?: number;

  /**
   * Attached target. the default is the document.body. You can pass in an HTMLElement or css selector, and the target must be an ancestor node of the Sticky component.
   * 
   * 附着的目标，默认为document.body。可以传入HTMLElement或者css selector，target 必须为 Sticky 组件的祖先节点
   * 
   * default: none
   */
  target?: string | HTMLElement;

  /**
   * Offsets from the top.
   * 
   * 距离顶部多少偏移量触发
   * 
   * default: none
   */
  top?: number;

  /**
   * use css position:sticky while target is ordered
   * 
   * 在指定 target 下，是否采用css方式实现附着效果
   * 
   * default: true
   */
  css?: bool;
  /**
   * When the adsorption effect, trigger the callback
   * 
   * 吸附效果时，触发该回调
   * 
   * default: null
   */
  onChange?: (isSticky: boolean) => void;
}

declare class Sticky extends React.Component<StickyProps, {}> {
  render(): JSX.Element
}

export default Sticky
