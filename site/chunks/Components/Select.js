/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Select/cn.md'
import en from 'doc/pages/components/Select/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Select/example-1-base.1.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-1-base.1.js'),
  },
  {
    title: locate('可清空', 'Clearable'),
    component: require('doc/pages/components/Select/example-3-clearable.js').default,
    rawText: require('!raw-loader!doc/pages/components/Select/example-3-clearable.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
