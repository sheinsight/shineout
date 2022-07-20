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
    isTs: false,
    isTest: false,
    title: locate(
      '基本用法 \n 基础的TreeSelect用法。',
      'Base \n Basic usage of TreeSelect.'
    ),
    component: require('doc/pages/components/TreeSelect/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-01-base.js'),

  },
  {
    name: '02-mutiple',
    isTs: false,
    isTest: false,
    title: locate(
      '多选 \n 通过设置 multiple 来实现多选。',
      'Multiple \n Set multiple to Multiple choices.'
    ),
    component: require('doc/pages/components/TreeSelect/example-02-mutiple.js').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-02-mutiple.js'),

  },
  {
    name: '03-filter',
    isTs: false,
    isTest: false,
    title: locate(
      '筛选 \n onFilter 返回函数时，使用这个函数做前端过滤。',
      'Filter \n OnFilter is a function to filter data.'
    ),
    component: require('doc/pages/components/TreeSelect/example-03-filter.js').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-03-filter.js'),

  },
  {
    name: '03-h-advanced-filter',
    isTs: false,
    isTest: false,
    title: locate(
      '高级筛选 \n 高级筛选模式下，可针对当前层级在筛选结果和原始数据间切换 \n 设置 onAdvancedFilter 属性开启高级筛选，仅支持前端筛选',
      'Advanced Filter \n In the advanced filter mode, you can switch between the filter results and the original data for the current level by pressing the button \n Set the onAdvancedFilter property to enable advanced filtering, only front-end filtering is supported'
    ),
    component: require('doc/pages/components/TreeSelect/example-03-h-advanced-filter.js').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-03-h-advanced-filter.js'),

  },
  {
    name: '04-disabled',
    isTs: false,
    isTest: false,
    title: locate(
      '禁用 \n 设置 disabled 禁用选项',
      'Disabled \n Set disabled to disabled item.'
    ),
    component: require('doc/pages/components/TreeSelect/example-04-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-04-disabled.js'),

  },
  {
    name: '05-loader',
    isTs: false,
    isTest: false,
    title: locate(
      '动态加载 \n 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数。',
      'Lazy load \n Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded.'
    ),
    component: require('doc/pages/components/TreeSelect/example-05-loader.js').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-05-loader.js'),

  },
  {
    name: '06-innertitle',
    isTs: false,
    isTest: false,
    title: locate(
      '内嵌标题 \n 使用 innerTitle 展示内嵌标题',
      'inner title \n use innerTitle to display the inner title'
    ),
    component: require('doc/pages/components/TreeSelect/example-06-innertitle.js').default,
    rawText: require('!raw-loader!doc/pages/components/TreeSelect/example-06-innertitle.js'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
