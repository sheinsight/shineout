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
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基本的使用',
      'Base \n Basic usage'
    ),
    component: require('doc/pages/components/Transfer/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Transfer/example-1-base.tsx'),

  },
  {
    name: '2-controlled',
    isTs: true,
    isTest: false,
    title: locate(
      '受控 \n 组件受控',
      'Controlled \n Component controlled'
    ),
    component: require('doc/pages/components/Transfer/example-2-controlled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-2-controlled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Transfer/example-2-controlled.tsx'),

  },
  {
    name: '3-customTitle',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义 \n 可以自定义标题, 按钮, 底部, 样式等属性',
      'Customize \n Customizable title, button, bottom properties'
    ),
    component: require('doc/pages/components/Transfer/example-3-customTitle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-3-customTitle.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Transfer/example-3-customTitle.tsx'),

  },
  {
    name: '4-selected',
    isTs: true,
    isTest: false,
    title: locate(
      '受控选中 \n 可以通过 selectedKeys 和 onSelectChange 去控制哪些列表项被选中 \n <b>注: 勾选的值均使用的是 keygen 的结果</b>',
      'Controlled selected \n Can control which elements are selected by selectedKeys and onSelectChange'
    ),
    component: require('doc/pages/components/Transfer/example-4-selected.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-4-selected.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Transfer/example-4-selected.tsx'),

  },
  {
    name: '5-filter',
    isTs: true,
    isTest: false,
    title: locate(
      '筛选 \n 可以通过设置 onFilter 去筛选列表项',
      'Filter \n Can filter list items by setting onFilter'
    ),
    component: require('doc/pages/components/Transfer/example-5-filter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-5-filter.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Transfer/example-5-filter.tsx'),

  },
  {
    name: '6-loading',
    isTs: true,
    isTest: false,
    title: locate(
      '加载中 \n 穿梭框的加载中',
      'Loading \n Loading'
    ),
    component: require('doc/pages/components/Transfer/example-6-loading.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-6-loading.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Transfer/example-6-loading.tsx'),

  },
  {
    name: '6-mloading',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 可以通过给 loading 设置数组的方式, 给两边设置一个不同的loading',
      ' \n You can set an array for loading and set an unused loading for both sides'
    ),
    component: require('doc/pages/components/Transfer/example-6-mloading.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-6-mloading.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Transfer/example-6-mloading.tsx'),

  },
  {
    name: '7-bigdata',
    isTs: true,
    isTest: false,
    title: locate(
      '性能 \n Transfer 内部使用了虚拟列表来优化性能，本例加载了10000条数据',
      ' \n Transfer uses a lazy loading to optimize performance. This example loads 10,000 pieces of data.'
    ),
    component: require('doc/pages/components/Transfer/example-7-bigdata.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-7-bigdata.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Transfer/example-7-bigdata.tsx'),

  },
  {
    name: '8-renderFilter',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义过滤渲染 \n 自定义渲染过滤框区域内容',
      'RenderFilter \n Custom render filter'
    ),
    component: require('doc/pages/components/Transfer/example-8-renderFilter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-8-renderFilter.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Transfer/example-8-renderFilter.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
