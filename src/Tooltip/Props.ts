import { ReactNode, CSSProperties, FC } from 'react'
import { StandardProps } from '../@types/common'
import { GetScrollContextConsumerValue } from '../Scroll/Props'
// import { PopoverPositionType } from '../Popover/Props'

export type ToolPosition = 'top' | 'left' | 'right' | 'bottom'
export type TriggerType = 'click' | 'hover'
export interface ContainerOptions {
  show: (props: ContainerProps, id: string, innerStyle?: CSSProperties) => void
  hide: () => void
  move: (id: string, pos: Pick<CSSProperties, 'left' | 'right' | 'top' | 'bottom'>) => void
  isCurrent: (id: string) => boolean
}
export interface ContainerProps extends StandardProps {
  /**
   * @en use animation
   * @cn 弹出是否使用动画
   * @default true
   */
  animation?: boolean
  /**
   * @en The child element can only be a ReactElement.
   * @cn 子元素只能为一个 ReactElement
   */
  children: ReactNode
  /**
   * @en The position of the pop-up layer
   * @cn 弹出层位置
   * @default 'top'
   */
  position?: ToolPosition
  /**
   * @inner 内部属性在 scrollContext 中获取
   */
  scrollElement?: HTMLElement
  /**
   * @inner 内部属性在 scrollContext 中获取
   */
  scrollLeft?: number
  /**
   * @inner 内部属性在 scrollContext 中获取
   */
  scrollTop?: number
  /**
   * @en Pop-up type
   * @cn 弹出方式
   * @default "hover"
   */
  trigger?: TriggerType
  /**
   * @en make disabled element work
   * @cn 使被禁用的元素正常显示提示
   * @default false
   */
  disabledChild?: boolean
  /**
   * @en Pop up texts
   * @cn 弹出文字
   */
  tip: ReactNode
  /**
   * @en Popup delay
   * @cn 弹出延迟
   * @default 0
   */
  delay?: number
}

/**
 * @title Tooltip
 */
export type TooltipProps = GetScrollContextConsumerValue<ContainerProps>

export type TooltipType = FC<TooltipProps>
