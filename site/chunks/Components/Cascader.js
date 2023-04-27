/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Cascader/cn.md'
import en from 'doc/pages/components/Cascader/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基础的级联用法',
      'Base \n Basic usage of Cascader'
    ),
    component: require('doc/pages/components/Cascader/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-01-base.tsx'),

  },
  {
    name: '02-multiple',
    isTs: true,
    isTest: false,
    title: locate(
      '多选 \n 设置 mode 属性，使组件变为多选，mode 可选值如下 \n 0: 只返回完全选中的节点，包含父节点 \n 1: 返回全部选中的节点和半选中的父节点 \n 2: 只返回选中的子节点 \n 3: 如果父节点选中，只返回父节点',
      'Multiple \n Set the mode property change the component to multiple select \n 0: Return only the fully selected node, including the parent node. \n 1: Return the fully selected nodes and semi-selected parent nodes. \n 2: Return only the selected child node. \n 3: Return only the parent node, if the parent node is selected.'
    ),
    component: require('doc/pages/components/Cascader/example-02-multiple.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-02-multiple.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-02-multiple.tsx'),

  },
  {
    name: '03-hover',
    isTs: true,
    isTest: false,
    title: locate(
      '移入展开 \n 设置 expandTrigger 为 \'hover\' 或 \'hover-only\', 可以在鼠标移入节点时展开，默认为 \'click\' \n 如果值为 \'hover-only\'，父节点只能 hover 触发展开, 只有子节点可以点击选择值',
      'Hover \n Set expandTrigger to \'hover\' or \'hover-only\', expand the node when mouse hover, default value is \'click\'.'
    ),
    component: require('doc/pages/components/Cascader/example-03-hover.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-03-hover.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-03-hover.tsx'),

  },
  {
    name: '04-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n disabled 为函数时，根据返回结果禁用节点，同时禁用子节点 \n disabled 为 true 时，禁用全部节点',
      'disabled \n When the disabled property is a function, disable the node and its child nodes according to the returned result. \n When the disabled property is true, disable all nodes.'
    ),
    component: require('doc/pages/components/Cascader/example-04-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-04-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-04-disabled.tsx'),

  },
  {
    name: '05-lazyload',
    isTs: true,
    isTest: false,
    title: locate(
      '动态加载 \n 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数 \n 注意，在开启动态加载功能后，mode 属性仅支持 3 或 4 模式。',
      'Lazy load \n Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded. \n In addition, with lazyload enabled, the mode attribute only supports mode 3 or 4.'
    ),
    component: require('doc/pages/components/Cascader/example-05-lazyload.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-05-lazyload.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-05-lazyload.tsx'),

  },
  {
    name: '06-filter',
    isTs: true,
    isTest: false,
    title: locate(
      '筛选数据 \n onFilter 可用于数据过滤，不返回结果时，可实现服务端过滤；返回函数时，用于前端过滤。 \n 单选状态下筛选结果以列表展示，多选状态任保持树状结构展示。',
      'Filter \n onFilter can be used for data filtering, for server-side filtering when no results are returned, and for front-end filtering when a function is returned. \n Support in single selection state'
    ),
    component: require('doc/pages/components/Cascader/example-06-filter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-06-filter.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-06-filter.tsx'),

  },
  {
    name: '07-filter-widematch',
    isTs: true,
    isTest: false,
    title: locate(
      '宽泛筛选 \n 开启 wideMatch 后，将筛选出所有可能的匹配项目 \n ',
      'wideMatch \n Allows all possible matching options to be choosed \n '
    ),
    component: require('doc/pages/components/Cascader/example-07-filter-widematch.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-07-filter-widematch.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-07-filter-widematch.tsx'),

  },
  {
    name: '07-innertitle',
    isTs: true,
    isTest: false,
    title: locate(
      '内嵌标题 \n 使用 innerTitle 展示内嵌标题',
      'InnerTitle \n use innerTitle to display the inner title'
    ),
    component: require('doc/pages/components/Cascader/example-07-innertitle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-07-innertitle.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-07-innertitle.tsx'),

  },
  {
    name: '08-unmatch',
    isTs: true,
    isTest: false,
    title: locate(
      '展示未匹配选项 \n unmatch 为 true 时 展示 data 中不存在的值，renderUnmatched 用来自定义渲染未匹配值',
      'Show unmatched options \n show values that do not exist in data when unmatch is true, and the `renderUnmatched` props is used to customize rendering unmatched value'
    ),
    component: require('doc/pages/components/Cascader/example-08-unmatch.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-08-unmatch.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-08-unmatch.tsx'),

  },
  {
    name: '09-renderlist',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义渲染下拉列表 \n 使用 renderOptionList 来自定义渲染下拉列表',
      'custom render dropdown \n Use the renderOptionList property to customize the render dropdown list'
    ),
    component: require('doc/pages/components/Cascader/example-09-renderlist.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-09-renderlist.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-09-renderlist.tsx'),

  },
  {
    name: '10-final',
    isTs: true,
    isTest: false,
    title: locate(
      '只能选末级 \n 设置 final 属性',
      'Can only choose the last level \n Set the final property'
    ),
    component: require('doc/pages/components/Cascader/example-10-final.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-10-final.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/example-10-final.tsx'),

  },
  {
    name: 'test-001-compressed',
    isTs: true,
    isTest: true,
    title: locate(
      '超长合并选项 \n 设置 compressed 属性，当选项超长的时候会合并选项',
      'Extra long merge option \n Set the compressed attribute, when the option is too long, the option will be merged'
    ),
    component: require('doc/pages/components/Cascader/test-001-compressed.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/test-001-compressed.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/test-001-compressed.tsx'),

  },
  {
    name: 'test-002-expandtrigger-finaldismiss',
    isTs: true,
    isTest: true,
    title: locate(
      'expandTrigger 和 finalDismiss 示例',
      ''
    ),
    component: require('doc/pages/components/Cascader/test-002-expandtrigger-finaldismiss.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/test-002-expandtrigger-finaldismiss.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/test-002-expandtrigger-finaldismiss.tsx'),

  },
  {
    name: 'test-003-open',
    isTs: true,
    isTest: true,
    title: locate(
      '控制浮层显隐 \n open 控制浮层显隐',
      ''
    ),
    component: require('doc/pages/components/Cascader/test-003-open.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/test-003-open.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Cascader/test-003-open.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Cascader","properties":[{"name":"onCollapse","tag":{"cn":"下拉列表展开/收起回调","en":"options collapse callback","default":"","version":""},"required":false,"type":"((collapse: boolean) => void) "},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"placeholder","tag":{"cn":"占位符","en":"placeholder","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"disabled","tag":{"cn":"当 disabled 为 true 时，禁用整个选择框。如果 disabled 为函数，根据函数反回结果禁用选项","en":"When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function.","default":"false","version":""},"required":false,"type":"boolean | ((data: DataItem) => boolean) "},{"name":"value","tag":{"cn":"选中的 key （受控)","en":"Selected key (controlled)","default":"","version":""},"required":false,"type":"Value "},{"name":"onChange","tag":{"cn":"设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关","en":"When the onChange property is set, the selection box is displayed. The parameter is the current selected value, which is related to the mode property.","default":"","version":""},"required":false,"type":"(value: Value, selected?: DataItem ) => void"},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"required":false,"type":"((e?: Error ) => void) "},{"name":"popover","tag":{"cn":"校验信息弹出位置，参考 [Popover](/components/Popover)","en":"The position where the validation info pop up, see [Popover](/components/Popover)","default":"","version":""},"required":false,"type":"PopoverProps[\\\"position\\\"]"},{"name":"filterSameChange","tag":{"cn":"当两次选择的值相同时不触发 onChange","en":"onChange is not triggered when two selected values are the same","default":"false","version":""},"required":false,"type":"boolean "},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "},{"name":"defaultValue","tag":{"cn":"默认值  和 value 类型相同","en":"defaultValue 和 value 类型相同","default":"","version":""},"required":false,"type":"Value "},{"name":"reserveAble","tag":{"cn":"设置为 true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"required":false,"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段, 配合 Form 使用","en":"Form field, used with Form","default":"","version":""},"required":false,"type":"string "},{"name":"size","tag":{"cn":"尺寸","en":"size","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"onFocus","tag":{"cn":"聚焦事件","en":"focus event","default":"","version":""},"required":false,"type":"(e?: FocusEvent ) => void"},{"name":"onBlur","tag":{"cn":"失焦事件","en":"blur event","default":"","version":""},"required":false,"type":"(e?: MouseEvent ) => void"},{"name":"tip","tag":{"cn":"提示信息","en":"Prompt information","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"width","tag":{"cn":"输入框宽度","en":"input width","default":"","version":""},"required":false,"type":"string | number "},{"name":"popoverProps","tag":{"cn":"校验弹框接受的属性，具体属性参考 [Popover](/components/Popover)","en":"Vilidate popup properties, specific properties refer to [Popover](/components/Popover)","default":"","version":""},"required":false,"type":"PopoverProps "},{"name":"underline","tag":{"cn":"是否只展示下边框","en":"only display border bottom","default":"false","version":""},"required":false,"type":"boolean "},{"name":"border","tag":{"cn":"是否展示边框","en":"Whether to display border","default":"false","version":""},"required":false,"type":"boolean "},{"name":"onFilter","tag":{"cn":"onFilter 不为空时，可以输入过滤数据\\nonFilter 如果返回一个函数，使用这个函数做前端过滤\\n如果不返回，可以自行做后端过滤\\n单选状态下支持","en":"When the onFilter is not empty, you can filter data by input.\\nIf the onFilter returns a function, use this function as a front-end filter.\\nIf return undefined, you can do your own backend filtering.\\nsupport in single selection state","default":"","version":""},"required":false,"type":"((text: string) => void | ((data: DataItem) => boolean) ) "},{"name":"childrenKey","tag":{"cn":"指定子数据的属性名","en":"the key of the children data name","default":"\\\"children\\\"","version":""},"required":false,"type":"ObjectKey<DataItem> "},{"name":"filterDelay","tag":{"cn":"用户输入触发 fitler 事件的延时，单位为毫秒。","en":"The delay in milliseconds before the filter event is triggered by user input.","default":"\\\"children\\\"","version":""},"required":false,"type":"number "},{"name":"absolute","tag":{"cn":"为 true 时，选项弹出层在 DOM 中独立 render; 为函数时，返回值作为弹出层容器","en":"When it is true, the pop-up layer of option append into document.body; When it is a function, the return value is used as the popup layer container","default":"false","version":""},"required":false,"type":"boolean | (() => HTMLElement) "},{"name":"zIndex","tag":{"cn":"选项列表 z-index 值, 需要配合 absolute","en":"options z-index should use with absolute","default":"1000","version":""},"required":false,"type":"number "},{"name":"innerTitle","tag":{"cn":"内嵌标题","en":"inner title","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"mode","tag":{"cn":"选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得","en":"mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node. 4: What you choose is what you get.","default":"","version":""},"required":false,"type":"0 | 1 | 2 | 3 | 4 "},{"name":"final","tag":{"cn":"单选只支持选末级节点","en":"Only the last node can be selected","default":"","version":""},"required":false,"type":"boolean "},{"name":"renderOptionList","tag":{"cn":"自定义渲染下拉列表","en":"Custom render dropdown","default":"","version":""},"required":false,"type":"((list: ReactElement, info: { loading: boolean; }) => ReactElement) "},{"name":"renderUnmatched","tag":{"cn":"渲染未匹配值的方式","en":"Custom rendering unmatched values","default":"","version":""},"required":false,"type":"((data: any) => ReactNode) "},{"name":"open","tag":{"cn":"控制浮层显隐","en":"Set visible of cascader popup","default":"","version":""},"required":false,"type":"boolean "},{"name":"data","tag":{"cn":"数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点","en":"data. The child node is children. If the children value is null or its length is 0, it is render as a leaf node","default":"","version":""},"required":false,"type":"any[]"},{"name":"height","tag":{"cn":"下拉列表高度","en":"height of dropdown options","default":"300","version":""},"required":false,"type":"number "},{"name":"unmatch","tag":{"cn":"是否展示data中不存在的值","en":"render unmatch value","default":"true","version":""},"required":false,"type":"boolean "},{"name":"clearable","tag":{"cn":"是否显示清除数据图标","en":"If clearable is true, show clear value icon","default":"true","version":""},"required":false,"type":"boolean "},{"name":"wideMatch","tag":{"cn":"开启 wideMatch 后，将筛选出所有可能的匹配项目","en":"Allows all possible matching options to be choosed","default":"false","version":""},"required":false,"type":"boolean "},{"name":"showArrow","tag":{"cn":"是否显示下拉箭头，仅针对单选情况","en":"show dropdown arrow, only single select","default":"true","version":""},"required":false,"type":"boolean "},{"name":"finalDismiss","tag":{"cn":"选择末级节点后是否关闭选项列表","en":"close options after chose the final node","default":"false","version":""},"required":false,"type":"boolean "},{"name":"singleRemove","tag":{"cn":"支持单个节点删除","en":"Support single node deletion","default":"","version":""},"required":false,"type":"boolean "},{"name":"compressedBound","tag":{"cn":"开启多选后，指定允许展示标签数量，超过后将折叠","en":"when compressed is True,the comptessedBound can limit the numbers of multiple selected item\\\"s label","default":"","version":""},"required":false,"type":"number "},{"name":"loading","tag":{"cn":"下拉列表加载状态","en":"dropdown list loading state","default":"","version":""},"required":false,"type":"boolean | ReactNode"},{"name":"compressed","tag":{"cn":"将选中值合并。为\\\"no-repeat\\\"时弹出框中不重复展示值","en":"Merges selected values; the repeat value will not appear in the Popover when it is\\\"no-repeat\\\"","default":"false","version":""},"required":false,"type":"boolean | \\\"no-repeat\\\" "},{"name":"loader","tag":{"cn":"设置 loader 属性后，未定义 children 的节点视为动态加载节点，点击展开触发 loader 事件，children 为 null 或者长度为 0 视为叶子节点","en":"If the loader attribute is a function, the node with no children is regarded as dynamically loaded node. Click expanded button to trigger the loader event. The children property is null or its length is 0 will be regarded as a leaf node.","default":"","version":""},"required":false,"type":"((key: string | number, data: DataItem) => void) "},{"name":"expandTrigger","tag":{"cn":"节点展开触发方式","en":"Expand mode","default":"\\\"click\\\"","version":""},"required":false,"type":"\\\"hover\\\" | \\\"click\\\" | \\\"hover-only\\\" "},{"name":"keygen","tag":{"cn":"生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 \\\"id\\\"，相当于 (d) => d.id","en":"Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, \\\"id\\\" is the same thing as (d) => d.id.","default":"index","version":""},"required":true,"type":"((data: DataItem, parentKey?: string | number ) => string | number) | ObjectKey<DataItem>"},{"name":"getComponentRef","tag":{"cn":"绑定组件的引用, 可以调用某些组件的方法","en":"A reference to the binding component, you can call some component methods","default":"","version":""},"required":false,"type":"((comp: ComponentRef) => void) | { current: ComponentRef ; } "},{"name":"renderItem","tag":{"cn":"当 renderItem 为 string 时，返回 DataItem\\\\[string]。 若为函数时，则返回函数结果","en":"When \\\"renderItem\\\" is a string, it returns DataItem[string]. If it\\\"s a function, it returns the result of the function.","default":"d => d","version":""},"required":true,"type":"ObjectKey<DataItem> | ((data: DataItem, active?: boolean , id?: Value[0] ) => ReactNode)"},{"name":"renderResult","tag":{"cn":"选中后在结果中显示的内容，默认和 renderItem 相同","en":"The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected","default":"renderItem","version":""},"required":false,"type":"ObjectKey<DataItem> | ((data: DataItem, row: DataItem[]) => ReactNode) "}],"cn":"","en":""},{"title":"CascaderRef","isDetail":"true","properties":[{"name":"close","tag":{"cn":"关闭下拉框","en":"Close the drop-down box","default":"","version":""},"required":true,"type":"(e?: MouseEvent ) => void"}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
