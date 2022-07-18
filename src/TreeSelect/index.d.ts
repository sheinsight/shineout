import * as React from 'react'
import { CommonProps, keygenType, StandardProps, FormItemStandardProps, StructDataStandardProps } from "../@types/common"

type ReactNode = React.ReactNode;


export interface TreeSelectProps<Item, Value> extends StandardProps,
  FormItemStandardProps<Value>,
  StructDataStandardProps<Item>,
  Pick<CommonProps, 'absolute'>
{
  /**
   * show border bottom
   *
   * 仅仅展示下边框
   *
   * default: false
   */
   underline?: boolean;

  /**
   * width
   *
   * 宽度
   *
   * default: -
   */
  width?: number;

  /**
   * If clearable is true, show clear value icon
   *
   * 是否可清除值
   *
   * default: false
   */
  clearable?: boolean;

  /**
   * if it is true, it will be multiple selection
   *
   * 是否是多选
   *
   * default: false
   */
  multiple?: boolean;

  /**
   * In the Form, the value will be taken over by the form and the value will be invalid.
   *
   * 选中的 key （受控），多选时必须为array
   *
   * default:
   */
  value?: Value;

  /**
   * Initial value
   *
   * 初始值，多选时必须为array
   *
   * default:
   */
  defaultValue?: Value;

  /**
   * Default expanded node key.
   *
   * 默认展开的节点 key（非受控）
   *
   * default: -
   */
  defaultExpanded?: Value extends Array<any> ? Value: Value[];

  /**
   * When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function.
   *
   * 为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用
   *
   * default: false
   */
  disabled?: ((data: Item) => boolean) | boolean;

  /**
   * ms. The delay of user input triggering filter events
   *
   * 毫秒。用户输入触发 fitler 事件的延时
   *
   * default: 400
   */
  filterDelay?: number;

  /**
   * The name of a Form that accesses data
   *
   * Form 存取数据的名称
   *
   * default: -
   */
  name?: string;

  /**
   * Generate a auxiliary method for each key. If not filled, index will be used(not recommended,there may be problems with more than 10 data). When it is a function, use its return value. When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id.
   *
   * 生成每一项key的辅助方法。为 true 时，以数据项本身作为key，相当于 (d => d)。为函数时，使用此函数返回值。为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id)
   *
   * default: index
   */
  keygen?: keygenType<Item>;

  /**
   * Expanded node key (controlled)
   *
   * 展开的节点 key （受控）
   *
   * default: -
   */
  expanded?: Value extends Array<any> ? Value: Value[];

  /**
   * If the loader attribute is a function, the node with no children is regarded as dynamically loaded node. Click expanded button to trigger the loader event. The children property is null or its length is 0 will be regarded as a leaf node.
   *
   * 设置loader属性后，未定义children的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点
   *
   * default: -
   */
  loader?: (key: string) => void;

  /**
   * mode . 0: Returns only the fully selected node including the parent node.  1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node.
   *
   * 选中值模式。0: 只返回完全选中的节点，包含父节点。1: 返回全部选中的节点和半选中的父节点。2: 只返回选中的子节点。3: 如果父节点选中，只返回父节点
   *
   * default: 1
   */
  mode?: 0 | 1 | 2 | 3 | 4;

  /**
   * The callback function for expanding the node. The parameter is the key array of the currently expanded nodes.
   *
   * 节点展开回调，参数为当前展开节点 key 数组
   *
   * default: -
   */
  onExpand?: (expanded: Value extends Array<any> ? Value: Value[]) => void;

  /**
   * value is your picker now
   * 参数 为 当前选中值
   * default: -
   */
  onChange?: (value: Value) => void;

  /**
   * onChange additional parameters (current is the data of the clicked node, data is the currently selected data, checked is whether it is selected or canceled in the multi-select state)
   *
   * onChange 额外参数 (current 为点击的节点的数据， data为当前选中的数据， checked为多选状态下是选中还是取消)
   *
   * default: -
   */
  onChangeAddition?: (params: {
    current?: Item
    checked?: 0 | 1
    data?: (Value extends Array<any> ? Item[]: Item) | null
  }) => void;

  /**
   * When the onFilter is not empty, you can filter data by input. If the onFilter returns a function, use this function as a front-end filter. If return undefined, you can do your own backend filtering.
   *
   * onFilter 不为空时，可以输入过滤数据。 onFilter 如果返回一个函数，使用这个函数做前端过滤。 如果不返回，可以自行做后端过滤
   *
   * default: -
   */
  onFilter?: (text: string, from: 'string') => (data: Item) => boolean;

  /**
   * In the advanced filter mode, you can switch between the filter results and the original data for the current level by pressing the button
   *
   * 高级筛选模式，可针对当前层级在筛选结果和原始数据间切换
   *
   * default: -
   */
  onAdvancedFilter?: (text: string, form: string) => (data: Item) => boolean;

  /**
   * Merges selected values, valid only in multiselect mode
   *
   * 将选中值合并，只在多选模式下有效
   *
   * default: false
   */
  compressed?: boolean | 'no-repeat';

  /**
   * When it is true, the pop-up layer of option append into document.body.
   *
   * 为 true 时，选项弹出层在 DOM 中独立 render
   *
   * default: false
   */
  absolute?: boolean;

  /**
   * options z-index
   *
   * 选项列表 z-index 值
   *
   * default: 1000
   */
  zIndex?: number;

  /**
   * the key of the children data name
   *
   * 指定子数据的属性名
   *
   * default: 'children'
   */
  childrenKey?: string;

  /**
   * default expand all node
   *
   * 默认全部展开节点
   *
   * default: false
   */
  defaultExpandAll?: boolean;

  /**
   * Whether to show the descendant nodes of the hit node after filtering
   *
   * 筛选后是否展示命中节点的后代节点
   *
   * default: false
   */
  showHitDescendants?: boolean;

  /**
   * render unmatched value
   *
   * 渲染未匹配值的方式
   *
   * default: none
   */
  renderUnmatched?: (data: Item) => ReactNode;

  /**
   * option collapse callback
   *
   * 下拉列表展开/收起回调
   *
   * default: none
   */
  onCollapse?: (collapse: boolean) => void;

  /**
   * render unmatch value
   *
   * 是否展示data中不存在的值
   *
   * default: -
   */
  unmatch?: boolean;

  /**
   * inner title
   *
   * 内嵌标题
   *
   * default: -
   */
  innerTitle?: ReactNode;

  /**
   * 点击父节点后展开节点
   *
   * Click on the parent node to expand the node
   *
   * default: -
   */
  parentClickExpand?: boolean,

  /**
   * when compressed is True,the comptessedBound can limit the numbers of multiple selected item's label
   *
   * 开启多选后，指定允许展示标签数量，超过后将折叠
   *
   * default: -
   */
   compressedBound?: number;
}



declare class TreeSelect<Item = any, Value = any> extends React.Component<TreeSelectProps<Item, Value>, {}> {

  render(): JSX.Element;
}


export default TreeSelect
