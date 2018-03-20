/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Alert/cn.md'
import en from 'doc/pages/components/Alert/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Alert/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Alert/example-1-base.js'),
  },
  {
    title: locate('类型 type', 'type'),
    component: require('doc/pages/components/Alert/example-2-type.js').default,
    rawText: require('!raw-loader!doc/pages/components/Alert/example-2-type.js'),
  },
  {
    title: locate('关闭 onClose', 'onClose'),
    component: require('doc/pages/components/Alert/example-3-close.js').default,
    rawText: require('!raw-loader!doc/pages/components/Alert/example-3-close.js'),
  },
  {
    title: locate('图标 icon', 'with icon'),
    component: require('doc/pages/components/Alert/example-4-icon.js').default,
    rawText: require('!raw-loader!doc/pages/components/Alert/example-4-icon.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
