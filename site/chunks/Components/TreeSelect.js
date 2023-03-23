/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/TreeSelect/cn.md'
import en from 'doc/pages/components/TreeSelect/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基础的TreeSelect用法。',
      'Base \n Basic usage of TreeSelect.'
    ),
    component: require('doc/pages/components/TreeSelect/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/TreeSelect/example-01-base.tsx'),

  },
  {
    name: '02-mutiple',
    isTs: true,
    isTest: false,
    title: locate(
      '多选 \n 通过设置 multiple 来实现多选。',
      'Multiple \n Set multiple to Multiple choices.'
    ),
    component: require('doc/pages/components/TreeSelect/example-02-mutiple.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-02-mutiple.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/TreeSelect/example-02-mutiple.tsx'),

  },
  {
    name: '03-filter',
    isTs: true,
    isTest: false,
    title: locate(
      '筛选 \n onFilter 返回函数时，使用这个函数做前端过滤。',
      'Filter \n OnFilter is a function to filter data.'
    ),
    component: require('doc/pages/components/TreeSelect/example-03-filter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-03-filter.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/TreeSelect/example-03-filter.tsx'),

  },
  {
    name: '03-h-advanced-filter',
    isTs: true,
    isTest: false,
    title: locate(
      '高级筛选 \n 高级筛选模式下，可针对当前层级在筛选结果和原始数据间切换 \n 设置 onAdvancedFilter 属性开启高级筛选，仅支持前端筛选',
      'Advanced Filter \n In the advanced filter mode, you can switch between the filter results and the original data for the current level by pressing the button \n Set the onAdvancedFilter property to enable advanced filtering, only front-end filtering is supported'
    ),
    component: require('doc/pages/components/TreeSelect/example-03-h-advanced-filter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-03-h-advanced-filter.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/TreeSelect/example-03-h-advanced-filter.tsx'),

  },
  {
    name: '04-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n 设置 disabled 禁用选项',
      'Disabled \n Set disabled to disabled item.'
    ),
    component: require('doc/pages/components/TreeSelect/example-04-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-04-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/TreeSelect/example-04-disabled.tsx'),

  },
  {
    name: '05-loader',
    isTs: true,
    isTest: false,
    title: locate(
      '动态加载 \n 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数。',
      'Lazy load \n Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded.'
    ),
    component: require('doc/pages/components/TreeSelect/example-05-loader.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-05-loader.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/TreeSelect/example-05-loader.tsx'),

  },
  {
    name: '06-innertitle',
    isTs: true,
    isTest: false,
    title: locate(
      '内嵌标题 \n 使用 innerTitle 展示内嵌标题',
      'inner title \n use innerTitle to display the inner title'
    ),
    component: require('doc/pages/components/TreeSelect/example-06-innertitle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-06-innertitle.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/TreeSelect/example-06-innertitle.tsx'),

  },
  {
    name: '07-componentref',
    isTs: true,
    isTest: false,
    title: locate(
      '组件方法 \n 通过 getComponentRef 获取一些组件方法目前支持 getDataByValues',
      'Component method \n Get some component methods through getComponentRef currently support getDataByValues'
    ),
    component: require('doc/pages/components/TreeSelect/example-07-componentref.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-07-componentref.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/TreeSelect/example-07-componentref.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"TreeSelect","properties":[{"name":"value","tag":{"cn":"选中的 key （受控），多选时必须为array","en":"In the Form, the value will be taken over by the form and the value will be invalid.","default":"","version":""},"required":false,"type":"Value "},{"name":"onChange","tag":{"cn":"参数 为 当前选中值","en":"value is your picker now","default":"","version":""},"required":false,"type":"(value: Value, selected?: DataItem , path?: (string | number)[] ) => void"},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"required":false,"type":"((e?: Error ) => void) "},{"name":"popover","tag":{"cn":"信息弹出位置，参考 [Popover](/components/Popover)","en":"The position where the text pop up, see [Popover](/components/Popover)","default":"","version":""},"required":false,"type":"PopoverProps[\\\"position\\\"]"},{"name":"disabled","tag":{"cn":"为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用","en":"When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function.","default":"false","version":""},"required":false,"type":"boolean | ((data: DataItem) => boolean) "},{"name":"filterSameChange","tag":{"cn":"当两次选择的值相同时不触发onChange","en":"onChange is not triggered when two selected values are the same","default":"false","version":""},"required":false,"type":"boolean "},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "},{"name":"defaultValue","tag":{"cn":"默认值  和 value 类型相同","en":"defaultValue 和 value 类型相同","default":"","version":""},"required":false,"type":"Value "},{"name":"reserveAble","tag":{"cn":"设置为true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"required":false,"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段, 配合 Form 使用","en":"Form field, used with Form","default":"","version":""},"required":false,"type":"string | string[] "},{"name":"size","tag":{"cn":"尺寸","en":"size","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"multiple","tag":{"cn":"是否是多选","en":"if it is true, it will be multiple selection","default":"false","version":""},"required":false,"type":"boolean "},{"name":"renderResult","tag":{"cn":"选中后在结果中显示的内容，默认和 renderItem 相同","en":"The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected","default":"renderItem","version":""},"required":false,"type":"((data: DataItem) => ReactNode) "},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"placeholder","tag":{"cn":"value 为空时的占位符","en":"placeholder when value is empty","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"autoFocus","tag":{"cn":"是否自动获得焦点","en":"Whether to automatically get the focus","default":"false","version":""},"required":false,"type":"boolean "},{"name":"onFocus","tag":{"cn":"focus 事件回调函数","en":"callback function of focus event","default":"","version":""},"required":false,"type":"(e?: any) => void"},{"name":"onBlur","tag":{"cn":"blur 事件回调函数","en":"callback function of blur event","default":"","version":""},"required":false,"type":"(e?: any) => void"},{"name":"onCollapse","tag":{"cn":"下拉列表展开/收起回调","en":"option collapse callback","default":"","version":""},"required":false,"type":"((collapse: boolean) => void) "},{"name":"line","tag":{"cn":"是否显示连接线","en":"whether show line","default":"true","version":""},"required":false,"type":"boolean "},{"name":"tip","tag":{"cn":"提示信息","en":"Prompt information","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"width","tag":{"cn":"输入框宽度","en":"input width","default":"","version":""},"required":false,"type":"string | number "},{"name":"popoverProps","tag":{"cn":"校验弹框接受的属性，具体属性参考 [Popover](/components/Popover)","en":"Vilidate popup properties, specific properties refer to [Popover](/components/Popover)","default":"","version":""},"required":false,"type":"PopoverProps "},{"name":"underline","tag":{"cn":"是否只展示下边框","en":"only display border bottom","default":"false","version":""},"required":false,"type":"boolean "},{"name":"border","tag":{"cn":"是否展示边框","en":"Whether to display border","default":"false","version":""},"required":false,"type":"boolean "},{"name":"onFilter","tag":{"cn":"onFilter 不为空时，可以输入过滤数据。 onFilter 如果返回一个函数，使用这个函数做前端过滤。 如果不返回，可以自行做后端过滤","en":"When the onFilter is not empty, you can filter data by input. If the onFilter returns a function, use this function as a front-end filter. If return undefined, you can do your own backend filtering.","default":"","version":""},"required":false,"type":"((text: string, from: \\\"blur\\\" | \\\"edit\\\") => void | ((data: Item) => boolean)) "},{"name":"childrenKey","tag":{"cn":"指定子数据的属性名","en":"specify the name of the subdata","default":"children","version":""},"required":false,"type":"ObjectKey<DataItem> "},{"name":"absolute","tag":{"cn":"为 true 时，选项弹出层在 DOM 中独立 render; 为函数时，返回值作为弹出层容器","en":"When it is true, the pop-up layer of option append into document.body; When it is a function, the return value is used as the popup layer container","default":"false","version":""},"required":false,"type":"boolean | (() => HTMLElement) "},{"name":"zIndex","tag":{"cn":"选项列表 z-index 值, 需要配合 absolute","en":"options z-index should use with absolute","default":"1000","version":""},"required":false,"type":"number "},{"name":"innerTitle","tag":{"cn":"内嵌标题","en":"inner title","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"mode","tag":{"cn":"选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得","en":"mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node. 4: What you choose is what you get.","default":"1","version":""},"required":false,"type":"0 | 1 | 2 | 3 | 4 "},{"name":"renderUnmatched","tag":{"cn":"渲染未匹配值的方式","en":"ender unmatched value","default":"","version":""},"required":false,"type":"((data: Value extends (infer U)[] ? U : Value) => ReactNode) "},{"name":"data","tag":{"cn":"数据源","en":"data source","default":"","version":""},"required":true,"type":"DataItem[]"},{"name":"height","tag":{"cn":"列表高度","en":"The height of list","default":"","version":""},"required":false,"type":"number "},{"name":"clearable","tag":{"cn":"是否可清除值","en":"If clearable is true, show clear value icon","default":"false","version":""},"required":false,"type":"boolean "},{"name":"compressedBound","tag":{"cn":"开启多选后，指定允许展示标签数量，超过后将折叠","en":"when compressed is True,the comptessedBound can limit the numbers of multiple selected item\\\"s label","default":"","version":""},"required":false,"type":"number "},{"name":"compressed","tag":{"cn":"将选中值合并，只在多选模式下有效；为\\\"no-repeat\\\"时弹出框中不重复展示值","en":"Merges selected values; the repeat value will not appear in the Popover when it is\\\"no-repeat\\\".","default":"","version":""},"required":false,"type":"boolean | \\\"no-repeat\\\" "},{"name":"loader","tag":{"cn":"设置loader属性后，未定义children的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点","en":"dynamically load nodes","default":"","version":""},"required":false,"type":"((key: Value extends (infer U)[] ? U : Value, data: DataItem) => void) "},{"name":"keygen","tag":{"cn":"生成key的辅助方法, 为函数时，使用此函数返回值, 为string时，使用这个string对应的数据值。如 \\\"id\\\"，相当于 (d) => d.id","en":"Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, \\\"id\\\" is the same thing as (d) => d.id.","default":"index","version":""},"required":true,"type":"ObjectKey<DataItem> | ((data: DataItem, parentKey: string | number) => string | number)"},{"name":"getComponentRef","tag":{"cn":"获取组件的一些方法 目前只支持 getDataByValues","en":"Some methods of getting components Currently only support getDataByValue","default":"","version":""},"required":false,"type":"((ref: ComponentRef<DataItem, Value>) => void) | { current?: ComponentRef<DataItem, Value> ; } "},{"name":"renderItem","tag":{"cn":"为 string 时，返回 d[string]。 为 function 时，返回函数结果","en":"When it is a string, return d[string]. When it is a function, return the result of the function.","default":"","version":""},"required":true,"type":"ObjectKey<DataItem> | ((data: DataItem, expanded: boolean, active: boolean, id: string | number) => ReactNode)"},{"name":"position","tag":{"cn":"弹出位置","en":"Popup Position","default":"","version":""},"required":false,"type":"\\\"drop-down\\\" | \\\"drop-up\\\" "},{"name":"empty","tag":{"cn":"无数据时的占位内容","en":"Placeholder content when there is no data","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"onAdvancedFilter","tag":{"cn":"高级筛选模式，可针对当前层级在筛选结果和原始数据间切换","en":"In the advanced filter mode, you can switch between the filter results and the original data for the current level by pressing the button","default":"","version":""},"required":false,"type":"((text: string, from: \\\"blur\\\" | \\\"edit\\\") => (data: Item) => boolean) "},{"name":"onExpand","tag":{"cn":"节点展开回调，参数为当前展开节点 key 数组","en":"expand event","default":"","version":""},"required":false,"type":"((value: (string | number)[]) => void) "},{"name":"expanded","tag":{"cn":"展开的节点 key （受控）","en":"expanded node","default":"","version":""},"required":false,"type":"(string | number)[] "},{"name":"defaultExpanded","tag":{"cn":"默认展开的节点 key（非受控）","en":"default expanded nodes","default":"","version":""},"required":false,"type":"(string | number)[] "},{"name":"defaultExpandAll","tag":{"cn":"默认展开所有节点","en":"expanded all nodes","default":"false","version":""},"required":false,"type":"boolean "},{"name":"onEnterExpand","tag":{"cn":"回车触发下拉框展开的时候调用","en":"Expand option list while enter press","default":"","version":""},"required":false,"type":"((e: KeyboardEvent<HTMLDivElement>) => boolean) "},{"name":"filterDelay","tag":{"cn":"毫秒。用户输入触发 fitler 事件的延时","en":"ms. The delay of user input triggering filter events","default":"400","version":""},"required":false,"type":"number "},{"name":"showHitDescendants","tag":{"cn":"筛选后是否展示命中节点的后代节点","en":"Whether to show the descendant nodes of the hit node after filtering","default":"false","version":""},"required":false,"type":"boolean "},{"name":"parentClickExpand","tag":{"cn":"点击父节点展开","en":"Expand by click parent node","default":"false","version":""},"required":false,"type":"boolean "},{"name":"onChangeAddition","tag":{"cn":"onChange 额外参数 (current 为点击的节点的数据， data为当前选中的数据， checked为多选状态下是选中还是取消)","en":"onChange additional parameters (current is the data of the clicked node, data is the currently selected data, checked is whether it is selected or canceled in the multi-select state)","default":"","version":""},"required":false,"type":"((params: { current?: DataItem ; checked?: 0 | 1 | 2 ; data?: DataItem | DataItem[] | null ; }) => void) "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
