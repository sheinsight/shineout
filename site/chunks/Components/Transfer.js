/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Transfer/cn.md'
import en from 'doc/pages/components/Transfer/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate(
      '基本用法 \n 基本的使用',
      'Base \n Basic usage'
    ),
    component: require('doc/pages/components/Transfer/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-1-base.js'),
  },
  {
    name: '2-controlled',
    title: locate(
      '受控 \n 组件受控',
      'Controlled \n Component controlled'
    ),
    component: require('doc/pages/components/Transfer/example-2-controlled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-2-controlled.js'),
  },
  {
    name: '3-customTitle',
    title: locate(
      '自定义 \n 可以自定义标题, 按钮, 底部, 样式等属性',
      'Customize \n Customizable title, button, bottom properties'
    ),
    component: require('doc/pages/components/Transfer/example-3-customTitle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-3-customTitle.js'),
  },
  {
    name: '4-selected',
    title: locate(
      '受控选中 \n 可以通过 selectedKeys 和 onSelectChange 去控制哪些列表项被选中 \n <b>注: 勾选的值均使用的是 keygen 的结果</b>',
      'Controlled selected \n Can control which elements are selected by selectedKeys and onSelectChange'
    ),
    component: require('doc/pages/components/Transfer/example-4-selected.js').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-4-selected.js'),
  },
  {
    name: '5-filter',
    title: locate(
      '筛选 \n 可以通过设置 onFilter 去筛选列表项',
      'Filter \n Can filter list items by setting onFilter'
    ),
    component: require('doc/pages/components/Transfer/example-5-filter.js').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-5-filter.js'),
  },
  {
    name: '6-loading',
    title: locate(
      '加载中 \n 穿梭框的加载中',
      'Loading \n Loading'
    ),
    component: require('doc/pages/components/Transfer/example-6-loading.js').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-6-loading.js'),
  },
  {
    name: '6-mloading',
    title: locate(
      ' \n 可以通过给 loading 设置数组的方式, 给两边设置一个不同的loading',
      ' \n You can set an array for loading and set an unused loading for both sides'
    ),
    component: require('doc/pages/components/Transfer/example-6-mloading.js').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-6-mloading.js'),
  },
  {
    name: '7-bigdata',
    title: locate(
      '性能 \n Transfer 内部使用了虚拟列表来优化性能，本例加载了10000条数据',
      ' \n Transfer uses a lazy loading to optimize performance. This example loads 10,000 pieces of data.'
    ),
    component: require('doc/pages/components/Transfer/example-7-bigdata.js').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-7-bigdata.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
