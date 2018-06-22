/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Progress/cn.md'
import en from 'doc/pages/components/Progress/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Progress/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-1-base.js'),
  },
  {
    name: '2-type',
    title: locate('颜色 \n 通过 type 使用内置的颜色，或者使用 color 指定颜色', 'Color'),
    component: require('doc/pages/components/Progress/example-2-type.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-2-type.js'),
  },
  {
    name: '3-circle',
    title: locate('圆形', 'Circle'),
    component: require('doc/pages/components/Progress/example-3-circle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-3-circle.js'),
  },
  {
    name: '4-size',
    title: locate('大小', 'Size'),
    component: require('doc/pages/components/Progress/example-4-size.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-4-size.js'),
  },
  {
    name: '5-animation',
    title: locate('动态示例', 'Animation'),
    component: require('doc/pages/components/Progress/example-5-animation.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-5-animation.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
