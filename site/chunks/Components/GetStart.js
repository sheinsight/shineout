/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/GetStart/cn.md'
import en from 'doc/pages/components/GetStart/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: 'locale',
    title: locate('', ''),
    component: require('doc/pages/components/GetStart/example-locale.js').default,
    rawText: require('!raw-loader!doc/pages/components/GetStart/example-locale.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
