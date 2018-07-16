/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Tabs/cn.md'
import en from 'doc/pages/components/Tabs/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Tabs/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-1-base.js'),
  },
  {
    name: '2-card',
    title: locate('自定义颜色', 'Color'),
    component: require('doc/pages/components/Tabs/example-2-card.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-2-card.js'),
  },
  {
    name: '3-scroll',
    title: locate('滚动 \n 超出长度时，会自动出现滚动按钮', 'Scroll'),
    component: require('doc/pages/components/Tabs/example-3-scroll.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-3-scroll.js'),
  },
  {
    name: '4-active',
    title: locate('受控', 'Active'),
    component: require('doc/pages/components/Tabs/example-4-active.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-4-active.js'),
  },
  {
    name: '5-shape-line',
    title: locate('样式 \n shape = &#39;line&#39;', 'Shape'),
    component: require('doc/pages/components/Tabs/example-5-shape-line.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-5-shape-line.js'),
  },
  {
    name: '6-shape-button',
    title: locate(' \n type = &#39;button&#39;', 'Shape'),
    component: require('doc/pages/components/Tabs/example-6-shape-button.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-6-shape-button.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
