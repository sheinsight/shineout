import * as React from 'react'
import { AnchorHTMLAttributes } from 'react'
import { StandardProps } from '../@types/common'
import { StickyProps } from '../Sticky'

type ReactNode = React.ReactNode
export interface Props extends StandardProps {
  /**
   * Current active tab id or index
   *
   * 当前选中标签页（受控）
   *
   * default: 0
   */
  active?: string | number

  /**
   * set the label align
   *
   * 设置标签对齐方式
   *
   * default: 无
   */
  align?: 'left' | 'right' | 'vertical-left' | 'vertical-right'

  /**
   * Active background color
   *
   * 选中标签背景色
   *
   * default: -
   */
  background?: string

  /**
   * Border color
   *
   * 边框颜色
   *
   * default: -
   */
  border?: string

  /**
   * Whether can be collapsed
   *
   * 是否可折叠
   *
   * default: false
   */
  collapsible?: boolean

  /**
   * Default active tab id or index
   *
   * 默认选中标签页（非受控）
   *
   * default: 0
   */
  defaultActive?: string | number

  /**
   * Inactive background color
   *
   * 未选中标签背景色
   *
   * default: -
   */
  inactiveBackground?: string

  /**
   * extra element in tab bar
   *
   * tab bar 上额外的元素
   *
   * default: -
   */
  tabBarExtraContent?: string | ReactNode

  /**
   * style in tab bar
   *
   * tab bar 的样式对象
   *
   * default: -
   */
  tabBarStyle?: React.CSSProperties

  /**
   * Change callback
   *
   * 标签选中时触发回调事件
   *
   * default: -
   */
  onChange?: (key: any) => void

  /**
   * Options: ['card', 'line', 'button', 'bordered', 'dash']. If shape is not null, the style properties such as background, border will lose effect
   *
   * shape 不为空时，background 等颜色参数将会无效
   *
   * default: -
   */
  shape?: 'card' | 'line' | 'button' | 'bordered' | 'dash'

  /**
   * lazy load
   *
   * 是否开启懒加载
   *
   * default: true
   */
  lazy?: boolean

  /**
   * sticky header
   *
   * 头部浮动
   *
   * default: none
   */
  sticky?: boolean | number | StickyProps

  /**
   * switch tabs will scroll to Tabs
   *
   * 切换tab将自动滚动到Tabs
   *
   * default: none
   */
  switchToTop?: boolean

  /**
   * Whether to hide the dividing line
   *
   * 是否隐藏分割线
   *
   * default: false
   */
  hideSplit?: boolean

  /**
   * content
   *
   * 内容
   *
   * default: -
   */
  children: ReactNode

  /**
   * the color of tab's text
   *
   * 标签页文字颜色，仅当 shape 为 'card' 时生效
   *
   * default: -
   */
  color?: string
}

export interface TabsPanelProps extends StandardProps {
  /**
   * Background color, override the Tab's background
   *
   * 背景色，会覆盖 Tabs 的background
   *
   * default: -
   */
  background?: string

  /**
   * Border color, override the Tab's border
   *
   * 边框颜色，会覆盖 Tabs 的border
   *
   * default: -
   */
  border?: string

  /**
   * Specifies the Panel should be disabled
   *
   * 是否禁用
   *
   * default: false
   */
  disabled?: boolean

  /**
   * The default is index
   *
   * 选填，默认为 index
   *
   * default: -
   */
  id?: string | number

  /**
   * Tab content
   *
   * 标签标题内容
   *
   * default: required
   */
  tab?: string | ReactNode

  /**
   * content
   *
   * 内容
   *
   * default: -
   */
  children: ReactNode

  /**
   * default collapse state, effective when collapsible is set to true
   *
   * 默认折叠状态,当 collapsible 设置为 true 时生效
   *
   * default: -
   */
  defaultCollapsed?: boolean

  /**
   * auto fill the panel
   *
   * 自动填充内容区域
   *
   * default: false
   */
  autoFill?: boolean
}

export interface TabsLinkProps extends AnchorHTMLAttributes<any> {
  /**
   * Link content
   *
   * 链接内容
   *
   * default: required
   */
  children: React.ReactElement

  onClick?: () => void
}

interface BaseTabProps {
  id?: string | number
  isActive?: boolean
  moveToCenter?: (tabRect: DOMRect, last: boolean, first: boolean) => void
  onClick?: (id: string | number, isActive: boolean) => void
  last?: boolean
}

export interface TabProps extends Required<BaseTabProps> {
  background?: string
  border?: string
  children?: any
  color?: string
  disabled?: boolean
  isVertical?: boolean
  shape?: string
  onChange?: (key: string | number) => void
  align?: 'left' | 'right' | 'vertical-left' | 'vertical-right'
}

export interface TabsProps {
  active?: string | number
  align?: 'left' | 'right' | 'vertical-left' | 'vertical-right' | 'bottom'
  background?: string
  border?: string
  children?: any
  className?: string
  collapsible?: boolean
  color?: string
  defaultActive?: string | number
  defaultCollapsed?: boolean
  inactiveBackground?: string
  shape?: 'card' | 'line' | 'button' | 'bordered' | 'dash'
  style?: React.CSSProperties
  tabBarExtraContent?: string | ReactNode
  tabBarStyle?: React.CSSProperties
  lazy?: boolean
  autoFill?: boolean
  sticky?: boolean | number | StickyProps
  switchToTop?: boolean
  hideSplit?: boolean
  onChange?: (key: string | number) => void
}

export interface TabsChildProps {
  id: string | number
  isActive: boolean
  tab: any
  isVertical?: boolean
  align?: 'left' | 'right' | 'vertical-left' | 'vertical-right'
  background: string
  border?: string
  color: string
  disabled: boolean
  shape?: 'card' | 'line' | 'button' | 'bordered' | 'dash'
  last: boolean
}

export interface HeaderProps {
  border?: string
  collapsed?: boolean
  isVertical?: boolean
  onChange: (key: string | number) => void
  onCollapse?: (collapsed: boolean) => void
  shape?: string
  tabs: TabsChildProps[]
  tabBarExtraContent?: string | ReactNode
  tabBarStyle?: React.CSSProperties
  hideSplit?: boolean
}

export interface PanelProps {
  id?: string | number
  background?: string
  className?: string
  collapsed?: boolean
  collapsible?: boolean
  color?: string
  children?: ReactNode
  isActive?: boolean
  style?: React.CSSProperties
  lazy?: boolean
  tab?: string | ReactNode
  border?: string
  disabled?: boolean
}

export interface WrapperProps {
  active: string | number
  children?: ReactNode
  id?: string | number
}
