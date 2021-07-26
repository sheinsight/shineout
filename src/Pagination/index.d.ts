import * as React from 'react'
import {StandardProps} from '../@types/common'

export interface SizeListProps {
  [propName: string]: any
}

export interface TextParams {
  prev?: string,
  next?: string,
  page?: string,
  jumper?: string,
}

export interface PaginationProps extends StandardProps {

  /**
   * align of pagination
   *
   * 排布方式
   *
   * default: 'left'
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Current page.
   *
   * 当前页，如果传入值，组件为受控组件，必须通过onChange来处理回调
   *
   * default: -
   */
  current?: number;

  /**
   * Initial page number
   *
   * 初始页码
   *
   * default: 1
   */
  defaultCurrent?: number;

  /**
   * Disabled
   *
   * 禁用
   *
   * default: false
   */
  disabled?: boolean;

  /**
   * The layout of child elements, options: 'links': page number。'simple': simple page number(Do not use both simple and links)。'list': page size selector。'jumper': jump to page number。'simple': minimalist mode。function({ current, total, pageSize }): custom information
   *
   * 子组件布局，可选值为:'links': 页码。'simple': 简约页码(和links不要同时使用)。'list': 每页数量选择。'jumper': 跳转页码。'simple': 极简模式。function({ current, total, pageSize }): 匿名函数，用来信息展示
   *
   * default: ['links']
   */
  layout?: string[];

  /**
   * The callback function when current page or pageSize is changing。current: new page number。pageSize: number of each page
   *
   * 页码或每页显示数量改变时回调。current: 新的页码。pageSize: 每页数量
   *
   * default: -
   */
  onChange?: (current: number, pageSize: number) => void;

  /**
   * Number of each page
   *
   * 每页数量
   *
   * default: 10
   */
  pageSize?: number;

  /**
   * The list of number of each page
   *
   * [10, 20, 30, 50, 100] | 每页数量可选列表
   *
   * default: [10, 20, 30, 50, 100]
   */
  pageSizeList?: number[];

  /**
   * size of pagination
   *
   * 尺寸
   *
   * default: 'default'
   */
  size?: 'large' | 'default' | 'small';

  /**
   * Replaced text。prev: the previous page。next: the next page。page:the text of pageSizeList。jumper: jump to input box text, '{input}' pilaceholder for input box
   *
   * 替换文案。prev: 上一页。next: 下一页。page: pageSizeList文字。jumper: 跳转输入框文字, '{input}' 为输入框占位
   *
   * default: none
   */
  text?: TextParams;

  /**
   * Total number. If total is less than 0, hide the Pagination.
   *
   * 总条目数。如果 total 小于 0，隐藏分页。
   *
   * default: 0
   */
  total?: number;

  /**
   * Additional attributes which need to given page size selector
   *
   * 需要给分页数量的选择框的额外的属性
   *
   * default: -
   */
  sizeListProps?: SizeListProps;

}

declare class Pagination extends React.Component<PaginationProps, any> {}

export default Pagination
