/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import log from 'doc/utils/log'
import locate from 'doc/locate'

import cn from 'doc/pages/components/Icon/cn.md'
import en from 'doc/pages/components/Icon/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('使用font-icon', 'use font-icon'),
    component: require('doc/pages/components/Icon/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Icon/example-1-base.js'),
  },
  {
    title: locate('使用 font awesome', 'use font awesome'),
    component: require('doc/pages/components/Icon/example-2-fontA.js').default,
    rawText: require('!raw-loader!doc/pages/components/Icon/example-2-fontA.js'),
  },
]

const codes = []

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
