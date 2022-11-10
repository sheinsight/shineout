import * as React from 'react'
import { StandardProps } from '../@types/common'

type ReactNode = React.ReactNode

export interface CardContextValueType {
  /**
   *  inner attribute, get form context
   *
   *  内部属性，从context获取
   */
  container?: HTMLDivElement
}

export type GetCardConsumerProps<U> = Omit<U, keyof CardContextValueType>

export interface CardGroupProps extends StandardProps {
  /**
   * group height
   *
   * 卡片组高度
   *
   * default: none
   */
  height?: number

  /**
   * card min width
   *
   * 卡片最小宽度
   *
   * default: none
   */
  cardWidth?: number

  /**
   * items count each row, not work while cardWidth setted
   *
   * 列数，设置 cardWidth 后该属性将失效
   *
   * default: 3
   */
  columns?: number

  /**
   * grid style
   *
   * 卡片网格样式
   *
   * default: none
   */
  gridStyle?: React.CSSProperties

  /**
   * gutter width horizontal and vertical, if diff shoud set gridStyle
   *
   * 卡片横向纵向间距，如果两个间距相互独立可以通过 gridStyle 调整
   *
   * default: 16
   */
  gutter?: number

  /**
   * children
   *
   * 子元素
   *
   * default: -
   */
  children?: ReactNode
}

export interface CardGroupItemProps<T> extends StandardProps, CardContextValueType {
  /**
   * desc: lazy load placeholder, enable lazy load while set
   *
   * 懒加载占位元素，设置后卡片将开启懒加载
   *
   * default: none
   */
  placeholder?: ReactNode

  /**
   * desc: checked status, hide while not set
   *
   * checked 表示选中状态，不设置则不显示选择框
   *
   * default: -
   */
  checked?: boolean | undefined

  /**
   * desc: disable checkbox
   *
   * 是否禁用选择框
   *
   * default: false
   */
  disabled?: boolean

  /**
   * desc: Specifies the result
   *
   * 选中时返回值
   *
   * default: true
   */
  value?: T

  /**
   * desc: check changed, value is the value props
   *
   * 选中状态变化事件，checked表示选中状态，value代表对应的值
   *
   * default: -
   */
  onChange?: (checked: boolean, value: T) => void

  /**
   * children
   *
   * 子元素
   *
   * default: -
   */
  children?: ReactNode
}
export type GetCardGroupItemProps<T> = GetCardConsumerProps<CardGroupItemProps<T>>
export declare class CardGroupItem<Value = any> extends React.Component<GetCardGroupItemProps<Value>, {}> {
  render(): JSX.Element
}

export declare class CardGroup extends React.Component<CardGroupProps, {}> {
  static Item: typeof CardGroupItem

  render(): JSX.Element
}

export type CardGroupType = typeof CardGroup
