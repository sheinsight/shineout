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
    title: locate('滚动', 'Scroll'),
    component: require('doc/pages/components/Tabs/example-3-scroll.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-3-scroll.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
