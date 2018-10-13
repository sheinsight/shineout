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
    name: '1-base',
    title: locate('基本用法 \n 基础的级联用法', 'Base \n Basic usage of Cascader'),
    component: require('doc/pages/components/Cascader/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-1-base.js'),
  },
  {
    name: '2-multiple',
    title: locate('多选 \n 设置 mode 属性，使组件变为多选，mode 可选值如下 \n 0: 只返回完全选中的节点，包含父节点 \n 1: 返回全部选中的节点和半选中的父节点 \n 2: 只返回选中的子节点 \n 3: 如果父节点选中，只返回父节点', 'Multiple \n Set the mode property change the component to multiple select \n 0: Return only the fully selected node, including the parent node. \n 1: Return the fully selected nodes and semi-selected parent nodes. \n 2: Return only the selected child node. \n 3: Return only the parent node, if the parent node is selected.'),
    component: require('doc/pages/components/Cascader/example-2-multiple.js').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-2-multiple.js'),
  },
  {
    name: '3-disabled',
    title: locate('禁用 \n disabled 为函数时，根据返回结果禁用节点，同时禁用子节点 \n disabled 为 true 时，禁用全部节点', 'disabled \n When the disabled property is a function, disable the node and its child nodes according to the returned result. \n When the disabled property is true, disable all nodes.'),
    component: require('doc/pages/components/Cascader/example-3-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Cascader/example-3-disabled.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
