import * as React from 'react';
type ReactNode = React.ReactNode;



declare class Select extends React.Component<SelectProps, {}> {

  render(): JSX.Element;
}

export interface SelectProps {
  /**
   * width
   * 宽度
   * default: null
   */
  width?: number;
  /**
   * expand style
   * 扩展外层style
   * default: null
   */
  style?: React.CSSProperties,
  /**
   * When it is true, the pop-up layer of option append into document.body.
   * 为 true 时，选项弹出层在 DOM 中独立 render
   * default: false
   */
  absolute?: boolean;

  /**
   * option list is auto adapt
   * 下拉列表宽度根据内容自由展开
   * default: false
   */
  autoAdapt?: boolean;

  /**
   * If clearable is true, show clear value icon
   * 是否可清除值
   * default: false
   */
  clearable?: boolean;

  /**
   * if it is true, it will be multiple selection
   * 是否是多选
   * default: false
   */
  multiple?: boolean;

  /**
   * Option columns.
   * 
   * default: 1
   */
  columns?: number;

  /**
   * Option column width, only effective when columns > 1
   * columns 大于 1 时，选项展示为多列布局模式
   * default: 160
   */
  columnWidth?: number;

  /**
   * Options data
   * 数据项，单条数据作为 value 的数据必须是唯一的
   * default: required
   */
  data?: any[];

  /**
   * tree select data，[{children: []}]
   * 树形结构数据项，[{children: []}]
   * default: -
   */
  treeData?: any[];

  /**
   * Initial value
   * 初始值
   * default: 
   */
  defaultValue?: any[];

  /**
   * When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.
   * 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * default: false
   */
  disabled?: (data: any) => boolean | boolean;

  /**
   * ms. The delay of user input triggering filter events
   * 毫秒。用户输入触发 fitler 事件的延时
   * default: 400
   */
  filterDelay?: number;

  /**
   * Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d[format] When it is a function, use its return value.
   * 格式化 value。 默认值，返回原始数据。 为string时，会作为key从原始数据中获取值，相当于 (d) => d[format]。为函数时，以函数返回结果作为 value。
   * default: d => d
   */
  format?: (data: any) => any | string;

  /**
   * The name of a Form that accesses data
   * Form 存取数据的名称
   * default: -
   */
  name?: string;

  /**
   * Generate a auxiliary method for each key. If not filled, index will be used(not recommended,there may be problems with more than 10 data). When it is a function, use its return value. When it is a string，ues the value of the string. For example, 'id' is the same thing as (d) => d.id.
   * 生成每一项key的辅助方法。为 true 时，以数据项本身作为key，相当于 (d => d)。为函数时，使用此函数返回值。为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id)
   * default: index
   */
  keygen?: ((data: any) => string) | string | true;

  /**
   * value is the datum.getValue().
   * 值发生改变时触发
   * default: -
   */
  onChange?: (value: any, data: any, checked: boolean) => void;

  /**
   * If the onCreate event is set, the component is inputable. When onCreate is a function, the return value of this function is diaplay at the top as a new option. When onCreate is true, use the built-in functuon text => text.
   * 如果设置了 onCreate 事件，组件为可输入状态。onCreate为函数时，将此函数返回值作为新的选项拆入最上方。onCreate为true时，使用默认函数 text => text
   * default: -
   */
  onCreate?: (input: string) => any | boolean;

  /**
   * When the onFilter is not empty, you can filter data by input. If the onFilter returns a function, use this function as a front-end filter. If return undefined, you can do your own backend filtering.
   * onFilter 不为空时，可以输入过滤数据。onFilter 如果返回一个函数，使用这个函数做前端过滤。如果不返回，可以自行做后端过滤
   * default: -
   */
  onFilter?: (text: string) => (data: any) => boolean;

  /**
   * By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match
   * (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配
   * default: (val, d) => val===format(d)
   */
  prediction?: (value: any, data: any) => boolean;

  /**
   * When it is a string, return d[string]. When it is a function, return the result of the function.
   * 为 string 时，返回 d[string]。 为 function 时，返回函数结果
   * default: required
   */
  renderItem?: (data: any) => ReactNode | string;

  /**
   * The content displayed in the result after selecting, if not set, use renderItem
   * 选中后在结果中显示的内容，默认和 renderItem 相同
   * default: renderItem
   */
  renderResult?: (data: any) => ReactNode | string;

  /**
   * In the Form, the value will be taken over by the form and the value will be invalid.
   * 在Form中，value会被表单接管，value无效
   * default: 
   */
  value?: any[] | string | object;

  /**
   * Merges selected values, valid only in multiselect mode
   * 将选中值合并，只在多选模式下有效
   * default: false
   */
  compressed?: boolean;

  /**
   * options z-index
   * 选项列表 z-index 值
   * default: 1000
   */
  zIndex?: number;

  /**
   * group by
   * 分组
   * default: -
   */
  groupBy?: (record: any, index: number, data: any) => any;

  /**
   * blur to select the data when filter data has only single. only work in filter.
   * 当筛选数据仅为一条时，失焦后直接选中该条数据。仅在 Filter 下有效。
   * default: false
   */
  filterSingleSelect?: boolean;

  /**
   * set with multiple, value will separator by this
   * 多选情况下设置后，value 会处理为 separator 分隔的字符串。
   * default: none
   */
  separator?: string;

  /**
   * treeData，the key of the children data name
   * 树形数据下，指定子数据的属性名
   * default: 'children'
   */
  childrenKey?: string;

  /**
   * expand all node, only in can be use in treeData
   * 默认展开全部子节点, 仅树形数据下有效
   * default: false
   */
  defaultExpandAll?: boolean;

  /**
   * the way to render not matched data value
   * 渲染未匹配值的方式
   * default: none
   */
  renderUnmatched?: (data: any) => ReactNode;

  /**
   * empty input after select value
   * 选中后是否清空输入框内容
   * default: false
   */
  emptyAfterSelect?: boolean;

  /**
   * show dropdown arrow, only single select
   * 是否显示下拉箭头，仅针对单选情况
   * default: true
   */
  showArrow?: boolean;

  /**
   * Whether to show the descendant nodes of the hit node after filtering
   * 筛选后是否展示命中节点的后代节点
   * default: false
   */
  showHitDescendants?: boolean;

  /**
   * selected value while click under onCreate or onFilter
   * onCreate 或 onFilter 在单选情况下单击值后是否选中值
   * default: true
   */
  focusSelected?: boolean;

  /**
   * data cache, if data change asynchronously, better set true
   * 是否开启数据缓存，如果数据存在动态更新的情况建议开启
   * default: false
   */
  noCache?: boolean;

  /**
   * compressed popover classname
   * 多选合并展示弹出框的类名
   * default: none
   */
  compressedClassName?: string;

  /**
   * option list collapse callback
   * 下拉列表展开/收起回调
   * default: none
   */
  onCollapse?: (collapse: boolean) => void;

  /**
   * The className of the selected result content container
   * 选中结果内容容器的className
   * default: none
   */
  resultClassName?: ((value: any) => string) | string;

  /**
   * title of columns multiple select
   * 多列选项多选时的标题文字
   * default: none
   */
  columnsTitle?: ReactNode;

}

export default Select;
