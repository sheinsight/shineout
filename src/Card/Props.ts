import { ReactNode, Component } from 'react'
import { ButtonProps } from '../Button/Props'
import { RegularAttributes, StandardProps } from '../@types/common'
import { ResizableType, MovableType } from '../hoc/Props'

export interface OriginCardProps extends StandardProps {
  /**
   * @en Whether can be collapsed，'bottom' can collaps on bottom
   * @cn 是否可折叠，'bottom' 表示从下方点击折叠
   * @default false
   */
  collapsible?: boolean | 'bottom'

  /**
   * @en Whether to be collapsed.
   * @cn 是否折叠，用于受控状态
   */
  collapsed?: boolean

  /**
   * @en Initial collapsed state
   * @cn 初始折叠状态（仅在 collapsible 为 true 时有效）
   * @default true
   */
  defaultCollapsed?: boolean

  /**
   * @en Callback when collapsed state changed
   * @cn 折叠状态改变时回调事件
   */
  onCollapse?: (collapsed: boolean) => void

  /**
   * @en Whether to show the shadow.'hover' - Display it when the mouse is over the element.true - Always show, false - Never show
   * @cn 是否显示阴影\n 'hover' - 鼠标移到元素上显示;\n true - 总是显示;\n false - 从不显示
   * @default false
   */
  shadow?: Boolean | 'hover'

  /**
   * @en Card.Accordion expand controlled key
   * @cn 手风琴下控制展开的值
   */
  id?: any

  /**
   * @en children
   * @cn 子元素
   */
  children?: ReactNode

  /**
   * @en get Card dom
   * @cn 获取 Card dom
   */
  forwardedRef?: (el: HTMLDivElement) => void
}

/**
 * @title Card
 */
export type CardProps = MovableType<ResizableType<OriginCardProps>>

export type CardContextValueType = {
  collapsed?: boolean
  onCollapse: () => void
  collapsible: 'bottom' | boolean
  formStatus: string
  onSubmit: (value: EventTarget) => void
  setFormStatus?: (status: string) => void
}

export type CardHeaderUseContext = 'collapsed' | 'onCollapse'
export type CardBodyUseContext = 'collapsed' | 'collapsible' | 'onCollapse'
export type CardSubmitUseContext = 'onSubmit' | 'formStatus'

export type CardConsumerType<U, key extends string> = Omit<U, key>

export interface OriginCardHeaderProps extends StandardProps, Pick<CardContextValueType, CardHeaderUseContext> {
  /**
   * @en align
   * @cn 对齐方式
   * @override union
   */
  align?: RegularAttributes.Align

  /**
   * @en children
   * @cn 子元素
   */
  children?: ReactNode

  /**
   * @inner 内部属性由 Card 透传
   */
  collapsed?: boolean
}

/**
 * @title Card.Header
 */
export type CardHeaderProps = CardConsumerType<OriginCardHeaderProps, CardHeaderUseContext>

export interface OriginCardBodyProps extends StandardProps, Pick<CardContextValueType, CardBodyUseContext> {
  /**
   * @en children
   * @cn 子元素
   */
  children?: ReactNode
}

/**
 * @title Card.Body
 */
export type CardBodyProps = CardConsumerType<OriginCardBodyProps, CardBodyUseContext>

/**
 * @title Card.Footer
 */
export interface CardFooterProps extends StandardProps {
  /**
   * @en align
   * @cn 对齐方式
   * @override union
   */
  align?: RegularAttributes.Align

  /**
   * @cn children
   * @en 子元素
   */
  children?: ReactNode
}

/**
 * @title Card.Accordion
 */
export interface CardAccordionProps<T> {
  /**
   * @en Active value. It is -1 when fully closed. Used in controlled state. be id while Card.id setted
   * @cn 打开的值，全关闭时为 null，用于受控状态。默认为索引，若 Card 设置 id 后则为 id。
   * @override any
   */
  active?: T | null

  /**
   * @en The default active value for uncontrolled state, be id while Card.id setted
   * @cn 默认打开的值，用于非受控状态。默认为索引，若 Card 设置 id 后则为 id。
   * @default 0
   * @override any
   */
  defaultActive?: T | null

  /**
   * @en The callback function when the panel is opened
   * @cn 面板打开回调
   * @override (active: any) => void
   */
  onChange?: (active: T | null) => void

  /**
   * @en children
   * @cn 子元素
   */
  children?: ReactNode
}

export interface OriginCardSubmitProps extends ButtonProps, Pick<CardContextValueType, CardSubmitUseContext> {}

export type CardSubmitProps = CardConsumerType<OriginCardSubmitProps, CardSubmitUseContext>

export class Header extends Component<CardHeaderProps, {}> {
  // @ts-ignore
  render(): JSX.Element
}
export class Body extends Component<CardBodyProps, {}> {
  // @ts-ignore
  render(): JSX.Element
}
export class Footer extends Component<CardFooterProps, {}> {
  // @ts-ignore
  render(): JSX.Element
}
export class Submit extends Component<CardSubmitProps, {}> {
  // @ts-ignore
  render(): JSX.Element
}
export class Accordion<T> extends Component<CardAccordionProps<T>, {}> {
  // @ts-ignore
  render(): JSX.Element
}
export class Card extends Component<CardProps, {}> {
  static Header: typeof Header

  static Body: typeof Body

  static Footer: typeof Footer

  static Submit: typeof Submit

  static Accordion: typeof Accordion

  // @ts-ignore
  render(): JSX.Element
}

export type CardType = typeof Card
