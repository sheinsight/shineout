import * as React from 'react'
import { StandardProps } from '../@types/common'

type ReactNode = React.ReactNode

export interface CardContextValueType {
  /**
   *  @inner 内部属性，从context获取
   */
  container?: HTMLDivElement
}

export type GetCardConsumerProps<U> = Omit<U, keyof CardContextValueType>

export interface OriginCardGroupProps extends StandardProps {
  /**
   * @en group height
   * @cn 卡片组高度
   */
  height?: number

  /**
   * @en card min width
   * @cn 卡片最小宽度
   */
  cardWidth?: number

  /**
   * @en items count each row, not work while cardWidth setted
   * @cn 列数，设置 cardWidth 后该属性将失效
   * @default 3
   */
  columns?: number

  /**
   * @en grid style
   * @cn 卡片网格样式
   */
  gridStyle?: React.CSSProperties

  /**
   * @en gutter width horizontal and vertical, if diff shoud set gridStyle
   * @cn 卡片横向纵向间距，如果两个间距相互独立可以通过 gridStyle 调整
   * @default 16
   */
  gutter?: number

  /**
   * @en children
   * @cn 子元素
   */
  children?: ReactNode
}

/**
 * @title CardGroup
 */
export type CardGroupProps = OriginCardGroupProps

export interface BaseCardGroupItemProps<Value> extends StandardProps, CardContextValueType {
  /**
   * @en lazy load placeholder, enable lazy load while set
   * @cn 懒加载占位元素，设置后卡片将开启懒加载
   *
   */
  placeholder?: ReactNode

  /**
   * @en checked status, hide while not set
   * @cn checked 表示选中状态，不设置则不显示选择框
   */
  checked?: boolean | undefined

  /**
   * @en disable checkbox
   *
   * @cn 是否禁用选择框
   *
   * @default false
   */
  disabled?: boolean

  /**
   * @en Specifies the result
   * @cn 选中时返回值
   * @default true
   * @override any
   */
  value?: Value

  /**
   * @en check changed, value is the value props
   * @cn 选中状态变化事件，checked表示选中状态，value代表对应的值
   *
   */
  onChange?: (checked: boolean, value: Value) => void

  /**
   * @en children
   * @cn 子元素
   */
  children?: ReactNode
}

/**
 * @title CardGroup.Item
 */
export type CardGroupItemProps<T> = GetCardConsumerProps<BaseCardGroupItemProps<T>>
export declare class CardGroupItem<Value = any> extends React.Component<CardGroupItemProps<Value>, {}> {
  render(): JSX.Element
}

export declare class CardGroup extends React.Component<CardGroupProps, {}> {
  static Item: typeof CardGroupItem

  render(): JSX.Element
}

export type CardGroupType = typeof CardGroup
