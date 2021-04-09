import * as React from 'react';
type ReactNode = React.ReactNode;
import { StandardProps } from '../@types/common'
import { StickyProps } from '../Sticky'


export interface TabsProps extends StandardProps {

  /**
   * Current active tab id or index
   * 
   * 当前选中标签页（受控）
   * 
   * default: 0
   */
  active?: string | number;

  /**
   * set the label align
   * 
   * 设置标签对齐方式
   * 
   * default: 无
   */
  align?: 'left' | 'right' | 'vertical-left' | 'vertical-right';

  /**
   * Active background color
   * 
   * 选中标签背景色
   * 
   * default: '#fff'
   */
  background?: string;

  /**
   * Border color
   * 
   * 边框颜色
   * 
   * default: '#ddd'
   */
  border?: string;

  /**
   * Whether can be collapsed
   * 
   * 是否可折叠
   * 
   * default: false
   */
  collapsible?: boolean;

  /**
   * Default active tab id or index
   * 
   * 默认选中标签页（非受控）
   * 
   * default: 0
   */
  defaultActive?: string | number;

  /**
   * Inactive background color
   * 
   * 未选中标签背景色
   * 
   * default: 'transparent'
   */
  inactiveBackground?: string;

  /**
   * extra element in tab bar
   * 
   * tab bar 上额外的元素
   * 
   * default: -
   */
  tabBarExtraContent?: string | ReactNode;

  /**
   * style in tab bar
   * 
   * tab bar 的样式对象
   * 
   * default: -
   */
  tabBarStyle?: React.CSSProperties;

  /**
   * Change callback
   * 
   * 标签选中时触发回调事件
   * 
   * default: -
   */
  onChange?: (key: any) => void;

  /**
   * Options: ['card', 'line', 'button', 'bordered', 'dash']. If shape is not null, the style properties such as background, border will lose effect
   * 
   * shape 不为空时，background 等颜色参数将会无效
   * 
   * default: -
   */
  shape?: 'card' | 'line' | 'button' | 'bordered' | 'dash';

  /**
   * lazy load
   * 
   * 是否开启懒加载
   * 
   * default: true
   */
  lazy?: boolean;

  /**
   * sticky header
   * 
   * 头部浮动
   * 
   * default: none
   */
  sticky?: boolean | number | StickyProps;

  /**
   * switch tabs will scroll to Tabs
   * 
   * 切换tab将自动滚动到Tabs
   * 
   * default: nonde
   */
  switchToTop?: boolean;
}

export interface TabsPanelProps extends StandardProps {

  /**
   * Background color, override the Tab's background
   * 
   * 背景色，会覆盖 Tabs 的background
   * 
   * default: -
   */
  background?: string;

  /**
   * Border color, override the Tab's border
   * 
   * 边框颜色，会覆盖 Tabs 的border
   * 
   * default: -
   */
  border?: string;

  /**
   * Specifies the Panel should be disabled
   * 
   * 是否禁用
   * 
   * default: false
   */
  disabled?: boolean;

  /**
   * The default is index
   * 
   * 选填，默认为 index
   * 
   * default: -
   */
  id?: string | number;

  /**
   * Tab content
   * 
   * 标签标题内容
   * 
   * default: required
   */
  tab?: string | ReactNode;

}

declare class TabsPanel extends React.Component<TabsPanelProps, {}> {
  render(): JSX.Element;
}


declare class Tabs extends React.Component<TabsProps, {}> {
  static Panel: typeof TabsPanel;

  render(): JSX.Element;
}

export default Tabs;
