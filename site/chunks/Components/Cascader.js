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
    title: locate(
      '基本用法 \n 基础的级联用法',
      'Base \n Basic usage of Cascader'
    ),
    component: require('doc/pages/components/Cascader/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-01-base.js'),
  },
  {
    name: '02-multiple',
    title: locate(
      '多选 \n 设置 mode 属性，使组件变为多选，mode 可选值如下 \n 0: 只返回完全选中的节点，包含父节点 \n 1: 返回全部选中的节点和半选中的父节点 \n 2: 只返回选中的子节点 \n 3: 如果父节点选中，只返回父节点',
      'Multiple \n Set the mode property change the component to multiple select \n 0: Return only the fully selected node, including the parent node. \n 1: Return the fully selected nodes and semi-selected parent nodes. \n 2: Return only the selected child node. \n 3: Return only the parent node, if the parent node is selected.'
    ),
    component: require('doc/pages/components/Cascader/example-02-multiple.js').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-02-multiple.js'),
  },
  {
    name: '03-hover',
    title: locate(
      '移入展开 \n 设置 expandTrigger 为 \'hover\' 或 \'hover-only\', 可以在鼠标移入节点时展开，默认为 \'click\' \n 如果值为 \'hover-only\'，父节点只能 hover 触发展开, 只有子节点可以点击选择值',
      'Hover \n Set expandTrigger to \'hover\' or \'hover-only\', expand the node when mouse hover, default value is \'click\'.'
    ),
    component: require('doc/pages/components/Cascader/example-03-hover.js').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-03-hover.js'),
  },
  {
    name: '04-disabled',
    title: locate(
      '禁用 \n disabled 为函数时，根据返回结果禁用节点，同时禁用子节点 \n disabled 为 true 时，禁用全部节点',
      'disabled \n When the disabled property is a function, disable the node and its child nodes according to the returned result. \n When the disabled property is true, disable all nodes.'
    ),
    component: require('doc/pages/components/Cascader/example-04-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-04-disabled.js'),
  },
  {
    name: '05-lazyload',
    title: locate(
      '动态加载 \n 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数',
      'Lazy load \n Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded.'
    ),
    component: require('doc/pages/components/Cascader/example-05-lazyload.js').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-05-lazyload.js'),
  },
  {
    name: '06-filter',
    title: locate(
      '筛选数据 \n onFilter 可用于数据过滤，不返回结果时，可实现服务端过滤；返回函数时，用于前端过滤。 \n 单选状态下筛选结果以列表展示，多选状态任保持树状结构展示。',
      'Filter \n onFilter can be used for data filtering, for server-side filtering when no results are returned, and for front-end filtering when a function is returned. \n Support in single selection state'
    ),
    component: require('doc/pages/components/Cascader/example-06-filter.js').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-06-filter.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
