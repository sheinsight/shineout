/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import log from 'doc/utils/log'
import locate from 'doc/locate'

import cn from 'doc/pages/components/Menu/cn.md'
import en from 'doc/pages/components/Menu/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Menu/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-1-base.js'),
  },
  {
    title: locate('水平布局', 'Base'),
    component: require('doc/pages/components/Menu/example-2-horizontal.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-2-horizontal.js'),
  },
  {
    title: locate('垂直样式', 'vertical'),
    component: require('doc/pages/components/Menu/example-3-vertical.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-3-vertical.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
