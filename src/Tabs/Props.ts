import * as React from 'react'
import { AnchorHTMLAttributes } from 'react'
import { StandardProps } from '../@types/common'
import { StickyProps } from '../Sticky/Props'

type ReactNode = React.ReactNode

export interface TabsLinkProps extends AnchorHTMLAttributes<any> {
  /**
   * @en Link content
   * @cn 链接内容
   */
  children: React.ReactNode

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
export type TabsBaseValue = string | number

/**
 * @title Tabs
 */
export interface TabsProps<Key extends TabsBaseValue = TabsBaseValue> extends StandardProps {
  /**
   * @en Current active tab id or index
   * @cn 当前选中标签页（受控）
   * @default 0
   * @override string | number
   */
  active?: Key
  /**
   * @en set the label align
   * @cn 设置标签对齐方式
   */
  align?: 'left' | 'right' | 'vertical-left' | 'vertical-right' | 'bottom'
  /**
   * @en Active background color
   * @cn 选中标签背景色
   */
  background?: string
  /**
   * @en Border color
   * @cn 边框颜色
   */
  border?: string
  /**
   * @en must be Panel
   * @cn 必须为 Panel 元素
   */
  children?: any
  /**
   * @en Whether can be collapsed
   * @cn 是否可折叠
   * @default false
   */
  collapsible?: boolean
  /**
   * @en the color of tab's text only when the shape is 'card'
   * @cn 标签页文字颜色，仅当 shape 为 'card' 时生效
   */
  color?: string
  /**
   * @en Default active tab id or index
   * @cn 默认选中标签页（非受控）
   * @override string | number
   * @default 0
   */
  defaultActive?: Key
  /**
   * @en default collapse state, effective when collapsible is set to true
   * @cn 默认折叠状态,当 collapsible 设置为 true 时生效
   */
  defaultCollapsed?: boolean
  /**
   * @en Inactive background color
   * @cn 未选中标签背景色
   */
  inactiveBackground?: string
  /**
   * @en If shape is not null, the style properties such as background, border will lose effect
   * @cn shape 不为空时，background 等颜色参数将会无效
   * @default 'card'
   */
  shape?: 'card' | 'line' | 'button' | 'bordered' | 'dash'
  /**
   * @en extra element in tab bar
   * @cn tab bar 上额外的元素
   */
  tabBarExtraContent?: string | ReactNode
  /**
   * @en style in tab bar
   * @cn tab bar 的样式对象
   */
  tabBarStyle?: React.CSSProperties
  /**
   * @en lazy load
   * @cn 是否开启懒加载
   * @default true
   */
  lazy?: boolean
  /**
   * @en auto fill the panel
   * @cn 自动填充内容区域
   * @default false
   */
  autoFill?: boolean
  /**
   * @en sticky header
   * @cn 开启头部附着
   * @default false
   */
  sticky?: boolean | number | StickyProps
  /**
   * @en switch tabs will scroll to Tabs
   * @cn 切换 tab 将自动滚动到 Tabs
   */
  switchToTop?: boolean
  /**
   * @en whether to hide the dividing line
   * @cn 是否隐藏分割线
   * @default false
   */
  hideSplit?: boolean
  /**
   * @en Change callback
   * @cn 标签选中时触发回调事件
   */
  onChange?: (key: Key) => void
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

/**
 * @title Tabs.Panel
 */
export interface PanelProps extends StandardProps {
  /**
   * @en The default is index
   * @cn 选填，默认为 index
   */
  id?: string | number
  /**
   * @en Background color, override the Tab's background
   * @cn 背景色，会覆盖 Tabs 的background
   */
  background?: string
  /**
   * @inner 内部属性
   */
  collapsed?: boolean
  /**
   * @inner 内部属性
   */
  collapsible?: boolean
  /**
   * @en same as style.color
   * @cn 同 style.color
   */
  color?: string
  /**
   * @en Panel Content
   * @cn Panel 内容
   */
  children?: ReactNode
  /**
   * @inner 内部属性
   */
  isActive?: boolean
  /**
   * @inner 内部属性
   */
  lazy?: boolean
  /**
   * @en Tab content
   * @cn 标签标题内容
   */
  tab: string | ReactNode
  /**
   * @en Border color, override the Tab's border
   * @cn 边框颜色，会覆盖 Tabs 的border
   */
  border?: string
  /**
   * @en Specifies the Panel should be disabled
   * @cn 是否禁用
   * @default false
   */
  disabled?: boolean
}

export interface WrapperProps extends PanelProps {
  active: string | number
}
