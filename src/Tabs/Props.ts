import * as React from 'react'
import { AnchorHTMLAttributes } from 'react'
import { StandardProps } from '../@types/common'
import { StickyProps } from '../Sticky/Props'

type ReactNode = React.ReactNode
export interface Props extends StandardProps {
  /**
   * @en Current active tab id or index
   * @cn 当前选中标签页（受控）
   * @default 0
   * @override union
   */
  active?: string | number

  /**
   * @en set the label align
   * @cn 设置标签对齐方式
   * @default '无'
   * @override union
   */
  align?: 'left' | 'right' | 'vertical-left' | 'vertical-right'

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
   * @en Whether can be collapsed
   * @cn 是否可折叠
   * @default false
   */
  collapsible?: boolean

  /**
   * @en Default active tab id or index
   * @cn 默认选中标签页（非受控）
   * @default 0
   * @override union
   */
  defaultActive?: string | number

  /**
   * @en Inactive background color
   * @cn 未选中标签背景色
   */
  inactiveBackground?: string

  /**
   * @en extra element in tab bar
   * @cn tab bar 上额外的元素
   * @override union
   */
  tabBarExtraContent?: string | ReactNode

  /**
   * @en style in tab bar
   * @cn tab bar 的样式对象
   */
  tabBarStyle?: React.CSSProperties

  /**
   * @en Change callback
   * @cn 标签选中时触发回调事件
   */
  onChange?: (key: any) => void

  /**
   * @en Options: ['card', 'line', 'button', 'bordered', 'dash']. If shape is not null, the style properties such as background, border will lose effect
   * @cn shape 不为空时，background 等颜色参数将会无效
   * @override union
   */
  shape?: 'card' | 'line' | 'button' | 'bordered' | 'dash'

  /**
   * @en lazy load
   * @cn 是否开启懒加载
   * @default true
   */
  lazy?: boolean

  /**
   * @en sticky header
   * @cn 头部浮动
   * @override union
   */
  sticky?: boolean | number | StickyProps

  /**
   * @en switch tabs will scroll to Tabs
   * @cn 切换tab将自动滚动到Tabs
   */
  switchToTop?: boolean

  /**
   * @en Whether to hide the dividing line
   * @cn 是否隐藏分割线
   * @default false
   */
  hideSplit?: boolean

  /**
   * @en content
   * @cn 内容
   */
  children: ReactNode

  /**
   * @en the color of tab's text
   * @cn 标签页文字颜色，仅当 shape 为 'card' 时生效
   */
  color?: string
}

export interface TabsLinkProps extends AnchorHTMLAttributes<any> {
  /**
   * @en Link content
   * @cn 链接内容
   * @default required
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
export interface TabsProps<Key extends TabsBaseValue = TabsBaseValue> {
  active?: Key
  align?: 'left' | 'right' | 'vertical-left' | 'vertical-right' | 'bottom'
  background?: string
  border?: string
  children?: any
  className?: string
  collapsible?: boolean
  color?: string
  defaultActive?: Key
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
