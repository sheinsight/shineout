/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Menu/cn.md'
import en from 'doc/pages/components/Menu/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Menu/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-1-base.js'),
  },
  {
    name: '2-horizontal',
    title: locate('水平布局', 'Base'),
    component: require('doc/pages/components/Menu/example-2-horizontal.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-2-horizontal.js'),
  },
  {
    name: '3-vertical',
    title: locate('垂直样式', 'vertical'),
    component: require('doc/pages/components/Menu/example-3-vertical.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-3-vertical.js'),
  },
  {
    name: '4-disabled',
    title: locate('禁用菜单', 'Disabled'),
    component: require('doc/pages/components/Menu/example-4-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-4-disabled.js'),
  },
  {
    name: '5-selected',
    title: locate('默认展开,默认选中', 'default opened or selected'),
    component: require('doc/pages/components/Menu/example-5-selected.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-5-selected.js'),
  },
  {
    name: '6-itemRender',
    title: locate('自定义渲染', 'customize render'),
    component: require('doc/pages/components/Menu/example-6-itemRender.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-6-itemRender.js'),
  },
  {
    name: '7-click',
    title: locate('自定义选中事件', 'customize click event'),
    component: require('doc/pages/components/Menu/example-7-click.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-7-click.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
