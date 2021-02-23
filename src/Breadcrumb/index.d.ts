import * as React from 'react'
import { StandardProps, keyType } from '../@types/common'

type ReactNode = React.ReactNode;

interface BreadcrumbData  {


  /**
   * The click event
   *
   * 点击事件
   *
   * default: (event)=>void
   */
  onClick?: (event: Event)=>void;


  /**
   * Displayed content
   *
   * 显示内容
   *
   * default: null
   */
  title?: string| ReactNode;


  /**
   * Link address
   *
   * 链接地址，onClick 属性二选一
   *
   * default: null
   */
  url?: string;


}


export interface BreadcrumbProps<Item> extends StandardProps  {
  /**
   * Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id.
   * 
   * 生成key的辅助方法, 为函数时，使用此函数返回值, 为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id
   * 
   * default: index
   */
  keygen: ((data: Item) => keyType) | string | true;
  
  /**
   * The array of breadcrumb objects, see data
   *
   * 面包屑对象数组,见 data
   *
   * default: []
   */
  data?: Array<Item>;


  /**
   * A breadcrumb separator which can be strings or custom elements
   *
   * 面包屑分隔符,可以是字符串或自定义的元素
   *
   * default: "/"
   */
  separator?: string|ReactNode;
}


declare class Breadcrumb<Item = BreadcrumbData> extends React.PureComponent<BreadcrumbProps<Item>, {}> {}


export default Breadcrumb
