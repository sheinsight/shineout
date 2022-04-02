import * as React from 'react'
import { StandardProps, ListItemStandardProps } from '../@types/common'

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


export interface BreadcrumbProps<Item> extends StandardProps, Pick<ListItemStandardProps<Item>, 'keygen'>  {
  
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
