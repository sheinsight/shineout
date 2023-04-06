import React, { ReactNode } from 'react'
import { StandardProps } from '../@types/common'

export type Mode = 'top' | 'bottom'

/**
 * @title Sticky
 */
export interface StickyProps extends StandardProps {
  /**
   * @en Extend style. The default z-Index after triggering the float is 900, and you can modify the z-Index of the style to change.
   * @cn 扩展样式。触发浮动后的默认 zIndex 为900，修改 style的 zIndex 来改变。
   */
  style?: React.CSSProperties
  /**
   * @en Offsets from the bottom.
   * @cn 距离底部多少偏移量触发
   */
  bottom?: number

  /**
   * @en Attached target. the default is the document.body. You can pass in an HTMLElement or css selector, and the target must be an ancestor node of the Sticky component.
   * @cn 附着的目标，默认为 document.body。可以传入 HTMLElement 或者 css selector，target 必须为 Sticky 组件的祖先节点
   */
  target?: string | HTMLElement

  /**
   * @en Offsets from the top.
   * @cn 距离顶部多少偏移量触发
   */
  top?: number

  /**
   * @en use css position:sticky while target is ordered
   * @cn 在指定 target 下，是否采用 css 方式实现附着效果
   * @default true
   */
  css?: boolean
  /**
   * @en When the adsorption effect, trigger the callback，this method is invalid when native sticky is used
   * @cn 吸附效果时，触发该回调，当使用原生 sticky 时该方法无效
   */
  onChange?: (isSticky: boolean) => void

  /**
   * @en children
   * @cn 子元素
   */
  children?: ReactNode

  /**
   * @inner 内部使用
   */
  needResetPostion?: boolean
}

export declare class Sticky extends React.Component<StickyProps, {}> {
  render(): JSX.Element
}

export type StickyType = typeof Sticky
