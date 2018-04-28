/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/DatePicker/cn.md'
import en from 'doc/pages/components/DatePicker/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/DatePicker/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-1-base.js'),
  },
  {
    title: locate('格式化', 'Format'),
    component: require('doc/pages/components/DatePicker/example-2-format.js').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-2-format.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
