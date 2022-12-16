import React from 'react'
import { StandardProps, RegularAttributes, CommonProps, StructDataStandardProps, ObjectType } from '../@types/common'
import { getTableConsumerProps } from '../Table/Props'

export type TriggerType = 'click' | 'hover'

export type DropdownItem = DropdownNode | React.ReactNode | ObjectType

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
   * 默认从content获取内容
   *
   * element
   *
   * default: -
   */

  /**
   * 禁用
   *
   * Disabled
   *
   * default: -
   */
  disabled?: boolean
  content?: React.ReactNode
  children?: DropdownItem[]
  onClick?: (data: DropdownNode) => void
}

export interface DropdownProps
  extends StandardProps,
    Pick<StructDataStandardProps<DropdownNode>, 'renderItem'>,
    Pick<CommonProps, 'absolute'> {
  hover?: boolean
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
  data: DropdownItem[]

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
}

export type GetDropDownProps<Props> = getTableConsumerProps<Props>
export declare class DropdownClass extends React.Component<GetDropDownProps<DropdownProps>, {}> {
  render(): JSX.Element
}

export type DropdownType = typeof DropdownClass
