import * as React from 'react'
import { StandardProps, KeygenType } from '../@types/common'

type ReactNode = React.ReactNode

export type StructureArray<T> = Array<T | StructureArray<T>>

/**
 * @title Breadcrumb
 */
export interface BreadcrumbProps<Item = BreadcrumbData> extends StandardProps {
  /**
   * @en The array of breadcrumb objects, see data
   * @cn 面包屑对象数组,见 data
   * @default []
   * @override any[]
   */
  data?: StructureArray<Item>

  /**
   * @en A breadcrumb separator which can be strings or custom elements
   * @cn 面包屑分隔符,可以是字符串或自定义的元素
   * @default "/"
   */
  separator?: string | ReactNode

  /**
   * @en Key generator.When it is true, the data itself is used as the key equivalent to (d => d);When it is a function, use its return value;When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id.
   * @cn 生成每一项key的辅助方法。为 true 时，以数据项本身作为key，相当于 (d => d)；为函数时，使用此函数返回值；为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id)
   * @override union
   */
  keygen?: KeygenType<Item>

  /**
   * @en Custom render
   * @cn 自定义渲染
   */
  renderItem?: (value: Item) => ReactNode
}

/**
 * @title BreadcrumbData
 *
 */
export interface BreadcrumbData {
  /**
   * @en The click event
   * @cn 点击事件
   *
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>

  /**
   * @en Displayed content
   * @cn 显示内容
   */
  title?: string | ReactNode

  /**
   * @en Link address
   * @cn 链接地址，onClick 属性二选一
   */
  url?: string

  /**
   * @en Custom icon
   * @cn 自定义图标
   */
  icon?: ReactNode
}
