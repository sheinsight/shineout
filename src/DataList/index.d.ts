import * as React from 'react'
import { StandardProps, StructDataStandardProps, ListItemStandardProps } from '../@types/common'

type ReactNode = React.ReactNode;


export interface ListProps<Item, Value> extends StandardProps,
  StructDataStandardProps<Item>,
  ListItemStandardProps<Item, Value> {


  /**
   * show border
   *
   * 是否显示边框
   *
   * default: null
   */
  bordered?: boolean;


  /**
   * What to display when no data
   *
   * 无数据时展示的内容
   *
   * default:null
   */
  empty?: string | ReactNode;


  /**
   * virtualized list
   *
   * 是否启用虚拟列表
   *
   * default: false
   */
  fixed?: boolean;


  /**
   * The content at the bottom
   *
   * 底部内容
   *
   * default: null
   */
  footer?: ReactNode;


  /**
   * height of item
   *
   * 列表项高度
   *
   * default: 32
   */
  lineHeight?: number;


  /**
   * loading
   *
   * 加载中
   *
   * default: false
   */
  loading?: boolean| ReactNode;


  /**
   * Select the row ,rowData is the selected data, rowIndex is the selected row number. If the data needs to be formatted, it is recommended to configure format
   *
   * 选择行。rowData为选中的数据，rowIndex为选中行号。如果需要数据需要格式化的处理，建议配置 format。
   *
   * default: null
   */
  onChange?: (rowData: Item, index: number) => void;


  /**
   * custom row className
   *
   * 自定义行 className
   *
   * default: null
   */
  rowClassName?: (rowData: Item, index: number) => string;


  /**
   * 同时展示的列表项数量
   *
   * Number of list items displayed at the same time
   *
   * default: 10
   */
  rowsInView?: number;


  /**
   * Triggered when scrolling to the bottom
   *
   * 滚动到底部时触发
   *
   * default: null
   */
  scrollLoading?: () => void;


  /**
   * The current selected value.
   *
   * 当前选中值，格式和 onChange 返回值一致
   *
   * default: none
   */
  value?: Value[];
}

export interface ListBaseItemProps{


  /**
   * List images
   *
   * 列表元素的图标
   *
   * default: null
   */
  avatar?: string| ReactNode |(() => ReactNode);


  /**
   * Item className
   *
   * Item 容器的className
   *
   * default: null
   */
  className?: string;


  /**
   * List content
   *
   * 列表内容
   *
   * default: null
   */
  content?: string| ReactNode |(() => ReactNode);


  /**
   * Description
   *
   * 描述
   *
   * default: null
   */
  desc?: string;

  /**
   * Content area on the right side of the list
   *
   * 列表右侧内容
   *
   * default: null
   */
  extra?: Array<ReactNode>|ReactNode;


  /**
   * The title of the list
   *
   * 列表元素的标题
   *
   * default: null
   */
  title?: string;


}


declare class ListBaseItem extends React.Component<ListBaseItemProps, {}> {
  render(): JSX.Element;
}

declare class List<Item = any, Value = any> extends React.Component<ListProps<Item, Value>, {}> {
  static BaseItem: typeof ListBaseItem;

  render(): JSX.Element;
}

export default List
