/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Radio/cn.md'
import en from 'doc/pages/components/Radio/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Radio/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-1-base.js'),
  },
  {
    title: locate('垂直布局', 'Block'),
    component: require('doc/pages/components/Radio/example-2-block.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-2-block.js'),
  },
  {
    title: locate('禁用', 'Disabled'),
    component: require('doc/pages/components/Radio/example-3-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-3-disabled.js'),
  },
  {
    title: locate('\n 使用 datum disabled 实现有条件禁用', 'Disabled'),
    component: require('doc/pages/components/Radio/example-4-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-4-disabled.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
