import { ReactNode, Component } from 'react'
import { ButtonProps } from '../Button/Props'
import { RegularAttributes, StandardProps } from '../@types/common'
import { ResizableType, MovableType } from '../hoc/Props'

export interface OriginCardProps extends StandardProps {
  /**
   * Whether can be collapsed，'bottom' can collaps on bottom
   *
   * 是否可折叠，'bottom' 表示从下方点击折叠
   *
   * default: false
   */
  collapsible?: boolean | 'bottom'

  /**
   * Whether to be collapsed.
   *
   * 是否折叠，用于受控状态
   *
   * default: -
   */
  collapsed?: boolean

  /**
   * Initial collapsed state
   *
   * 初始折叠状态（仅在 collapsible 为 true 时有效）
   *
   * default: true
   */
  defaultCollapsed?: boolean

  /**
   * Callback when collapsed state changed
   *
   * 折叠状态改变时回调事件
   *
   * default: -
   */
  onCollapse?: (collapsed: boolean) => void

  /**
   * Whether to show the shadow.'hover' - Display it when the mouse is over the element.true - Always show, false - Never show
   *
   * 是否显示阴影。'hover' - 鼠标移到元素上显示。true - 总是显示, false - 从不显示
   *
   * default: false
   */
  shadow?: true | false | 'hover'

  /**
   * Card.Accordion expand controlled key
   *
   * 手风琴下控制展开的值
   *
   * default: none
   */
  id?: any

  /**
   * children
   *
   * 子元素
   *
   * default: -
   */
  children?: ReactNode

  /**
   * get Card dom
   *
   * 获取 Card dom
   *
   * default: -
   */
  forwardedRef?: (el: HTMLDivElement) => void
}

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
   * align
   *
   * 对齐方式
   *
   * default: none
   */
  align?: RegularAttributes.Align

  /**
   * children
   *
   * 子元素
   *
   * default: -
   */
  children?: ReactNode

  /**
   * 内部属性由 Card 透传
   */
  collapsed?: boolean
}

export type CardHeaderProps = CardConsumerType<OriginCardHeaderProps, CardHeaderUseContext>

export interface OriginCardBodyProps extends StandardProps, Pick<CardContextValueType, CardBodyUseContext> {
  /**
   * children
   *
   * 子元素
   *
   * default: -
   */
  children?: ReactNode
}

export type CardBodyProps = CardConsumerType<OriginCardBodyProps, CardBodyUseContext>

export interface CardFooterProps extends StandardProps {
  /**
   * align
   *
   * 对齐方式
   *
   * default: none
   */
  align?: RegularAttributes.Align

  /**
   * children
   *
   * 子元素
   *
   * default: none
   */
  children?: ReactNode
}

export interface CardAccordionProps<T> {
  /**
   * Active value. It is -1 when fully closed. Used in controlled state. be id while Card.id setted
   *
   * 打开的值，全关闭时为 null，用于受控状态。默认为索引，若Card设置id后则为id。
   *
   * default: none
   */
  active?: T | null

  /**
   * The default active value for uncontrolled state, be id while Card.id setted
   *
   * 默认打开的值，用于非受控状态。默认为索引，若Card设置id后则为id。
   *
   * default: 0
   */
  defaultActive?: T | null

  /**
   * The callback function when the panel is opened
   *
   * 面板打开回调
   *
   * default: none
   */
  onChange?: (active: T | null) => void

  /**
   * children
   *
   * 子元素
   *
   * default: none
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
