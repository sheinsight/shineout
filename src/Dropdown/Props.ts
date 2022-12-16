import React from 'react'
import { StandardProps, RegularAttributes, CommonProps } from '../@types/common'
import { getTableConsumerProps } from '../Table/Props'

export type TriggerType = 'click' | 'hover'

export type DropdownItem = DropdownNode | React.ReactNode

export interface DropdownNode {
  /**
   * url属性不为空时，render为一个链接
   *
   * When the url is not empty, a url will be rendered.
   *
   * default: -
   */
  url?: string

  /**
   * url 不为空时有效
   *
   * It is valid when the url is not empty.
   *
   * default: -
   */
  target?: string

  /**
   * 禁用
   *
   * Disabled
   *
   * default: -
   */
  disabled?: boolean

  /**
   * 默认从content获取内容
   *
   * element
   *
   * default: -
   */
  content?: React.ReactNode
  children?: DropdownNode[]
  onClick?: (data: DropdownNode) => void
}

export interface ItemProps<Item> {
  data: DropdownNode
  itemClassName: string
  width: DropdownProps<Item>['width']
  onClick: DropdownProps<Item>['onClick']
  columns: DropdownProps<Item>['columns']
  renderItem: ((data: Item) => React.ReactNode) | string
}

export interface DropdownProps<Item extends DropdownItem> extends StandardProps, Pick<CommonProps, 'absolute'> {
  // hover?: boolean
  isSub?: boolean

  /**
   * Display multiple elements on the page. This property depends on the width attribute. Please set the number of columns and width appropriately.
   *
   * 页面多元素展示,此属性需要依赖width属性,请合理的设置列数和宽度
   *
   * default: -
   */
  columns?: number

  /**
   * same as Button
   *
   * 同 Button
   *
   * default: -
   */
  outline?: boolean

  /**
   * Specifies the dropdown should be disabled
   *
   * 禁用
   *
   * default: false
   */
  disabled?: boolean

  /**
   * Specifies the dropdown should be disabled
   *
   * 是否开启动画
   *
   * default: true
   */
  animation?: boolean

  /**
   * data of dropdown
   *
   * 下拉数据
   *
   * default: []
   */
  data: Item[]

  /**
   * Toggle mode
   *
   * 触发方式
   *
   * default: 'click'
   */
  trigger?: TriggerType

  /**
   * Displayed content of the button
   *
   * 按钮显示内容
   *
   * default: -
   */
  placeholder?: React.ReactNode

  /**
   * same as Button
   *
   * 同 Button
   *
   * default: 'default'
   */
  size?: RegularAttributes.Size

  /**
   * type of Dropdown
   *
   * 类型
   *
   * default: -
   */
  type?: RegularAttributes.Type | 'link'

  /**
   * The click event. The parameter is the rendered data. <br /> Note: if the onClick is set in the data, this method will be ignored and data.onclick will be called.
   *
   * 点击事件。参数为渲染的数据,注: 如果数据内设置了onClick，会忽略此方法，调用data.onClick
   *
   * default: -
   */
  onClick?: (data: DropdownNode) => void

  /**
   * The width of the pop-up option layer
   *
   * 弹出选项层的宽度
   *
   * default: -
   */
  width?: number

  /**
   * Set position property can control the direction and position of the drop-down menu
   *
   * 弹出的方向和位置
   *
   * default: 'auto'
   */
  position?:
    | 'left-top'
    | 'left-bottom'
    | 'right-top'
    | 'right-bottom'
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'auto'

  /**
   * Set the displayed content. If it is a string,  the corresponding value will be displayed.
   * If it is a function, the return value will be displayed and its parameter is the current data.
   *
   * 设置显示的内容,如果是字符串,则为对应的值。如果是函数,则返回值为显示的内容,参数为当条数据
   *
   * default: 'auto'
   */
  renderItem?: ((data: Item) => React.ReactNode) | string
}

export type GetDropDownProps<Props> = getTableConsumerProps<Props>
export declare class DropdownClass<Item> extends React.Component<GetDropDownProps<DropdownProps<Item>>, {}> {
  render(): JSX.Element
}

export type DropdownType = typeof DropdownClass
