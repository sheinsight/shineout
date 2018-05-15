/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Image/cn.md'
import en from 'doc/pages/components/Image/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Image/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-01-base.js'),
  },
  {
    name: '02-shape',
    title: locate('形状', 'Shape'),
    component: require('doc/pages/components/Image/example-02-shape.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-02-shape.js'),
  },
  {
    name: '03-fit',
    title: locate('适配', 'fit'),
    component: require('doc/pages/components/Image/example-03-fit.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-03-fit.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
