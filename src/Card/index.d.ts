import * as React from 'react';
type ReactNode = React.ReactNode;


declare class CardSubmit extends React.Component<CardSubmitProps, {}> {
  render(): JSX.Element;
}

declare class CardAccordion extends React.Component<CardAccordionProps, {}> {
  render(): JSX.Element;
}

declare class CardFooter extends React.Component<CardFooterProps, {}> {
  render(): JSX.Element;
}

declare class CardBody extends React.Component<CardBodyProps, {}> {
  render(): JSX.Element;
}

declare class CardHeader extends React.Component<CardHeaderProps, {}> {
  render(): JSX.Element;
}


declare class Card extends React.Component<CardProps, {}> {
  static Header: typeof CardHeader;
  static Body: typeof CardBody;
  static Footer: typeof CardFooter;
  static Accordion: typeof CardAccordion;
  static Submit: typeof CardSubmit;

  render(): JSX.Element;
}

export interface CardProps {

  /**
   * Extend className
   * 扩展className
   * default: none
   */
  className?: string;

  /**
   * Whether can be collapsed，'bottom' can collaps on bottom
   * 是否可折叠，'bottom' 表示从下方点击折叠
   * default: false
   */
  collapsible?: boolean | 'bottom';

  /**
   * Whether to be collapsed.
   * 是否折叠，用于受控状态
   * default: -
   */
  collapsed?: boolean;

  /**
   * Initial collapsed state
   * 初始折叠状态（仅在 collapsible 为 true 时有效）
   * default: true
   */
  defaultCollapsed?: boolean;

  /**
   * Callback when collapsed state changed
   * 折叠状态改变时回调事件
   * default: -
   */
  onCollapse?: () => void;

  /**
   * Whether to show the shadow.'hover' - Display it when the mouse is over the element.true - Always show, false - Never show
   * 是否显示阴影。'hover' - 鼠标移到元素上显示。true - 总是显示, false - 从不显示
   * default: false
   */
  shadow?: true | false | 'hover';

  /**
   * Container element style
   * 最外层扩展样式
   * default: -
   */
  style?: React.CSSProperties;

  /**
   * Card.Accordion expand controlled key
   * 手风琴下控制展开的值
   * default: none
   */
  id?: any;

}

export interface CardHeaderProps {

  /**
   * Extend className
   * 扩展className
   * default: -
   */
  className?: string;

  /**
   * Element style
   * 最外层扩展样式
   * default: -
   */
  style?: React.CSSProperties;

}

export interface CardBodyProps {

  /**
   * Extend className
   * 扩展className
   * default: -
   */
  className?: string;

  /**
   * Element style
   * 最外层扩展样式
   * default: -
   */
  style?: React.CSSProperties;

}

export interface CardFooterProps {

  /**
   * Extend className
   * 扩展className
   * default: -
   */
  className?: string;

  /**
   * Element style
   * 最外层扩展样式
   * default: -
   */
  style?: React.CSSProperties;

}

export interface CardAccordionProps {

  /**
   * Active value. It is -1 when fully closed. Used in controlled state. be id while Card.id setted
   * 打开的值，全关闭时为 null，用于受控状态。默认为索引，若Card设置id后则为id。
   * default: none
   */
  active?: any;

  /**
   * The default active value for uncontrolled state, be id while Card.id setted
   * 默认打开的值，用于非受控状态。默认为索引，若Card设置id后则为id。
   * default: 0
   */
  defaultActive?: any;

  /**
   * The callback function when the panel is opened
   * 面板打开回调
   * default: none
   */
  onChange?: () => void;

}

export interface CardSubmitProps {

}

export default Card;
