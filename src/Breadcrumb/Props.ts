import * as React from 'react'
import { StandardProps, keygenType } from '../@types/common'

type ReactNode = React.ReactNode

export interface BreadcrumbData {
  /**
   * The click event
   *
   * 点击事件
   *
   * default: (event)=>void
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>

  /**
   * Displayed content
   *
   * 显示内容
   *
   * default: null
   */
  title?: string | ReactNode

  /**
   * Link address
   *
   * 链接地址，onClick 属性二选一
   *
   * default: null
   */
  url?: string

  /**
   * Custom render
   *
   * 自定义渲染
   *
   * default: -
   */
  renderItem?: (value: BreadcrumbData) => ReactNode

  /**
   * Custom icon
   *
   * 自定义图标
   *
   * default: -
   */
  icon?: ReactNode
}

export type StructureArray<T> = Array<T | StructureArray<T>>

export interface BreadcrumbProps<Item = BreadcrumbData> extends StandardProps {
  /**
   * The array of breadcrumb objects, see data
   *
   * 面包屑对象数组,见 data
   *
   * default: []
   */
  data?: StructureArray<Item>

  /**
   * A breadcrumb separator which can be strings or custom elements
   *
   * 面包屑分隔符,可以是字符串或自定义的元素
   *
   * default: "/"
   */
  separator?: string | ReactNode

  /**
   * Key generator.When it is true, the data itself is used as the key equivalent to (d => d);When it is a function, use its return value;When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id.
   *
   * 生成每一项key的辅助方法。为 true 时，以数据项本身作为key，相当于 (d => d)；为函数时，使用此函数返回值；为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id)
   *
   * default: -
   */
  keygen?: keygenType<Item>

  /**
   * Custom render
   *
   * 自定义渲染
   *
   * default: -
   */
  renderItem?: (value: BreadcrumbData) => ReactNode
}
