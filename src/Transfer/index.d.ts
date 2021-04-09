import * as React from 'react'
import { StandardProps, StructDataStandardProps, FormItemStandardProps, ListItemStandardProps } from '../@types/common'

export interface TransferProps<Item, Value> extends 
StandardProps, 
StructDataStandardProps<Item>, 
FormItemStandardProps<Value>,
ListItemStandardProps<Item, Value>
{
  /**
   * desc: checked by default
   * 
   * 默认被勾选的列表
   * 
   * default: none
   */
  defaultSelectedKeys?: Value; 

  /**
   * desc: contentless display
   * 
   * 无内容的展示
   * 
   * default: "无数据"
   */
  empty?: React.ReactNode;

  /**
   * desc: footer node
   * 
   * 底部元素, 顺序是从左到右
   * 
   * default: none
   */
  footers?: React.ReactNode[];

  /**
   * desc: line height of list
   * 
   * 列表行高
   * 
   * default: 32
   */
  lineHeight?: number;

  /**
   * desc: list class name
   * 
   * 列表扩展的 class
   * 
   * default: none
   */
  listClassName?: string;

  /**
   * desc: list height
   * 
   * 列表高度
   * 
   * default: 180
   */
  listHeight?: number;

  /**
   * desc: expand list style
   * 
   * 列表扩展的样式
   * 
   * default: none
   */
  listStyle?: React.CSSProperties;

  /**
   * desc: loading
   * 
   * 加载中, 如果需要两侧加载中状态不一致, 需要传入数组
   * 
   * default: none
   */
  loading?: boolean | boolean[];

  /**
   * desc: fileter data
   * 
   * 筛选函数, 参数为: 输入文本, 数据, 是否为左侧数据
   * 
   * default: none
   */
  onFilter?: (text: string, data: Item, isSource: boolean) => boolean;

  /**
   * desc: seach event
   * 
   * 输入框值变化的回调, 参数为: 输入文本, 是否为左侧数据
   * 
   * default: none
   */
  onSearch?: (text: string, isSource: boolean) => void;

  /**
   * desc: select event
   * 
   * 勾选触发的方法
   * 
   * default: none
   */
  onSelectChange?: (sourceKeys: Value, targetKeys: Value) => void;

  /**
   * desc: whether to display the icon of the operation button
   * 
   * 是否显示操作按钮的图标
   * 
   * default: true
   */
  operationIcon?: boolean;

  /**
   * desc: operation nodes
   * 
   * 操作元素, 顺序是从上到下
   * 
   * default: none
   */
  operations?: React.ReactNode[];

  /**
   * desc: number of data loaded at one time
   * 
   * 一次加载的数据条数
   * 
   * default: 20
   */
  rowsInView?: number;

  /**
   * desc: checked lists
   * 
   * 被勾选的列表
   * 
   * default: none
   */
  selectedKeys?: Value[];

  /**
   * desc: title
   * 
   * 两侧的标题, 顺序是从左到右
   * 
   * default: none
   */
  titles?: React.ReactNode[];
}


declare class Transfer<Item = any, Value = any> extends React.Component<TransferProps<Item, Value>, {}> {}
export default Transfer