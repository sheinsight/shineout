/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Tree/cn.md'
import en from 'doc/pages/components/Tree/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基础的 Tree 用法',
      'Base \n Basic usage of Tree'
    ),
    component: require('doc/pages/components/Tree/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tree/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Tree/example-01-base.tsx'),

  },
  {
    name: '02-icon',
    isTs: true,
    isTest: false,
    title: locate(
      '图标 \n 在 renderItem 中根据状态展示不同的图标',
      'Icons \n Display different icon in the renderItem.'
    ),
    component: require('doc/pages/components/Tree/example-02-icon.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tree/example-02-icon.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Tree/example-02-icon.tsx'),

  },
  {
    name: '03-click',
    isTs: true,
    isTest: false,
    title: locate(
      '点击事件 \n 设置 onClick 属性监听节点点击',
      'Click \n Set the onClick property to listen the node click.'
    ),
    component: require('doc/pages/components/Tree/example-03-click.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tree/example-03-click.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Tree/example-03-click.tsx'),

  },
  {
    name: '04-noline',
    isTs: true,
    isTest: false,
    title: locate(
      '无连接线 \n 设置 line 为 false，隐藏连接线',
      'Line \n Set the line property to false to hid the connecting line.'
    ),
    component: require('doc/pages/components/Tree/example-04-noline.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tree/example-04-noline.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Tree/example-04-noline.tsx'),

  },
  {
    name: '05-expanded',
    isTs: true,
    isTest: false,
    title: locate(
      '控制展开 \n 受控的展开（此示例数据量太大，第一次全部展开会比较慢）',
      'Expanded \n Controlled expansion (Because the data in this example is too large, it will be slower for the first time.)'
    ),
    component: require('doc/pages/components/Tree/example-05-expanded.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tree/example-05-expanded.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Tree/example-05-expanded.tsx'),

  },
  {
    name: '06-change',
    isTs: true,
    isTest: false,
    title: locate(
      '可选择 \n 选中值取值提供了 4 种模式 \n 0: 只返回完全选中的节点，包含父节点 \n 1: 返回全部选中的节点和半选中的父节点 \n 2: 只返回选中的子节点 \n 3: 如果父节点选中，只返回父节点 \n 4: 所选即所得',
      'onChange \n Selected values provide 4 modes \n 0: Return only the fully selected node, including the parent node. \n 1: Return the fully selected nodes and semi-selected parent nodes. \n 2: Return only the selected child node. \n 3: Return only the parent node, if the parent node is selected. \n 4: What you choose is what you get.'
    ),
    component: require('doc/pages/components/Tree/example-06-change.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tree/example-06-change.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Tree/example-06-change.tsx'),

  },
  {
    name: '07-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n disabled 为函数时，根据返回结果禁用节点，同时禁用子节点 \n disabled 为 true 时，禁用全部节点',
      'disabled \n When the disabled property is a function, disable the node and its child nodes according to the returned result. \n When the disabled property is true, disable all nodes.'
    ),
    component: require('doc/pages/components/Tree/example-07-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tree/example-07-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Tree/example-07-disabled.tsx'),

  },
  {
    name: '08-drag',
    isTs: true,
    isTest: false,
    title: locate(
      '拖动 \n 设置 onDrop 属性可以拖动节点，设置 dragSibling 限制兄弟节点之间拖动',
      'Drag \n Set the onDrop property to drag nodes.'
    ),
    component: require('doc/pages/components/Tree/example-08-drag.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tree/example-08-drag.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Tree/example-08-drag.tsx'),

  },
  {
    name: '08-styledrag',
    isTs: true,
    isTest: false,
    title: locate(
      '设置拖动样式 \n 可以通过 dragImageSelector, dragImageStyle, dragHoverExpand定义一些拖动的设置',
      'Set the drag style \n Some drag settings can be defined by dragImageSelector, dragImageStyle, dragHoverExpand'
    ),
    component: require('doc/pages/components/Tree/example-08-styledrag.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tree/example-08-styledrag.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Tree/example-08-styledrag.tsx'),

  },
  {
    name: '09-lazyload',
    isTs: true,
    isTest: false,
    title: locate(
      '动态加载 \n 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数',
      'Lazy load \n Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded.'
    ),
    component: require('doc/pages/components/Tree/example-09-lazyload.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tree/example-09-lazyload.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Tree/example-09-lazyload.tsx'),

  },
  {
    name: 'data',
    isTs: false,
    isTest: false,
    title: locate(
      '',
      ''
    ),
    component: require('doc/pages/components/Tree/example-data.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tree/example-data.js'),

  },
]

const codes = undefined

const api = '[{"title":"Tree","properties":[{"name":"active","tag":{"cn":"激活节点的key","en":"active node key","default":"","version":""},"required":false,"type":"string | number "},{"name":"data","tag":{"cn":"数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点","en":"active nodes","default":"[]","version":""},"required":true,"type":"DataItem[]"},{"name":"defaultExpanded","tag":{"cn":"默认展开的节点 key（非受控）","en":"default expanded nodes","default":"","version":""},"required":false,"type":"(string | number)[] "},{"name":"defaultValue","tag":{"cn":"默认选中的 key （非受控）","en":"Default selected key (not controlled)","default":"","version":""},"required":false,"type":"Value "},{"name":"disabled","tag":{"cn":"显示选择框时有效，为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用","en":"control whether the node can be chosen","default":"","version":""},"required":false,"type":"boolean | ((data: DataItem) => boolean) "},{"name":"expanded","tag":{"cn":"展开的节点 key （受控）","en":"expanded node","default":"","version":""},"required":false,"type":"(string | number)[] "},{"name":"line","tag":{"cn":"是否显示连接线","en":"whether show line","default":"true","version":""},"required":false,"type":"boolean "},{"name":"loader","tag":{"cn":"设置loader属性后，未定义children的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点","en":"dynamically load nodes","default":"","version":""},"required":false,"type":"((key: Value extends (infer U)[] ? U : Value, data: DataItem) => void) "},{"name":"mode","tag":{"cn":"选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得","en":"mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node. 4: What you choose is what you get.","default":"1","version":""},"required":false,"type":"0 | 1 | 2 | 3 | 4 "},{"name":"onChange","tag":{"cn":"设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关","en":"change event","default":"","version":""},"required":false,"type":"((value: Value, id: string | number) => void) "},{"name":"onClick","tag":{"cn":"节点点击事件","en":"click event","default":"","version":""},"required":false,"type":"((data: DataItem, key: string | number, path: {  children: (string | number)[], path: (string | number)[], isDisabled: boolean, indexPath: number[], index: number }) => void) "},{"name":"onExpand","tag":{"cn":"节点展开回调，参数为当前展开节点 key 数组","en":"expand event","default":"","version":""},"required":false,"type":"((value: (string | number)[]) => void) "},{"name":"onDrop","tag":{"cn":"设置 onDrop 属性时，为可拖动状态","en":"drop event","default":"","version":""},"required":false,"type":"((data: DataItem[], key: string | number, targetKey: string | number, position: number) => void) "},{"name":"value","tag":{"cn":"选中的 key （受控）","en":"Selected key (controlled)","default":"","version":""},"required":false,"type":"(string | number)[]"},{"name":"parentClickExpand","tag":{"cn":"点击父节点展开","en":"Expand by click parent node","default":"false","version":""},"required":false,"type":"boolean "},{"name":"defaultExpandAll","tag":{"cn":"默认展开所有节点","en":"expanded all nodes","default":"false","version":""},"required":false,"type":"boolean "},{"name":"dataUpdate","tag":{"cn":"是否监听 data 变化更新数据","en":"Whether to monitor data changes to update data","default":"true","version":""},"required":false,"type":"boolean "},{"name":"childrenKey","tag":{"cn":"指定子数据的属性名","en":"specify the name of the subdata","default":"children","version":""},"required":false,"type":"ObjectKey<DataItem> "},{"name":"expandIcons","tag":{"cn":"自定义展开/收起按钮","en":"DIY icon when expanded","default":"","version":""},"required":false,"type":"[ExpandIconType<DataItem>, ExpandIconType<DataItem>] "},{"name":"dragImageStyle","tag":{"cn":"拖拽图片的原生style样式","en":"dom style when drop images","default":"","version":""},"required":false,"type":"object "},{"name":"doubleClickExpand","tag":{"cn":"双击是否展开节点","en":"if need to double-click to expand","default":"false","version":""},"required":false,"type":"boolean "},{"name":"dragSibling","tag":{"cn":"是否只能平级拖拽","en":"whether it can only be dragged at the same level","default":"","version":""},"required":false,"type":"boolean "},{"name":"keygen","tag":{"cn":"生成key的辅助方法, 为函数时，使用此函数返回值, 为string时，使用这个string对应的数据值。如 \\\"id\\\"，相当于 (d) => d.id","en":"Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, \\\"id\\\" is the same thing as (d) => d.id.","default":"index","version":""},"required":true,"type":"ObjectKey<DataItem> | ((data: DataItem, parentKey: string | number) => string | number)"},{"name":"dragImageSelector","tag":{"cn":"定义拖拽图片的选择器","en":"selector when dray image","default":"","version":""},"required":false,"type":"string | ((data: DataItem) => string) "},{"name":"childrenClass","tag":{"cn":"子节点 class, 函数的参数为该条叶子节点数据","en":"the class of children, the params of function is data","default":"","version":""},"required":false,"type":"string | ((data: DataItem) => string) "},{"name":"leafClass","tag":{"cn":"叶子节点的 class, 函数的参数为该条叶子节点数据","en":"the class of lead, the params of function is data","default":"","version":""},"required":false,"type":"string | ((data: DataItem) => string) "},{"name":"renderItem","tag":{"cn":"为 string 时，返回 d[string]。 为 function 时，返回函数结果","en":"When it is a string, return d[string]. When it is a function, return the result of the function.","default":"","version":""},"required":true,"type":"ObjectKey<DataItem> | ((data: DataItem, expanded: boolean, active: boolean, id: string | number) => ReactNode)"},{"name":"dragHoverExpand","tag":{"cn":"拖拽时自动展开含有子节点的节点","en":"automatically expand nodes with child nodes when dragging","default":"false","version":""},"required":false,"type":"boolean "},{"name":"iconClass","tag":{"cn":"展开/收起按钮的类名","en":"class name of icon","default":"","version":""},"required":false,"type":"string "},{"name":"nodeClass","tag":{"cn":"节点的class，如果是函数，参数为该节点数据","en":"class name of node","default":"","version":""},"required":false,"type":"string | ((data: DataItem) => string) "},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
