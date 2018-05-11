/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Sticky/cn.md'
import en from 'doc/pages/components/Sticky/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-top',
    title: locate('附着在顶部 20px', 'Sticky 20px to top'),
    component: require('doc/pages/components/Sticky/example-1-top.js').default,
    rawText: require('!raw-loader!doc/pages/components/Sticky/example-1-top.js'),
  },
  {
    name: '2-element',
    title: locate('附着在元素内', 'Sticky to element'),
    component: require('doc/pages/components/Sticky/example-2-element.js').default,
    rawText: require('!raw-loader!doc/pages/components/Sticky/example-2-element.js'),
  },
  {
    name: '3-bottom',
    title: locate('附着在底部', 'Sticky to bottom'),
    component: require('doc/pages/components/Sticky/example-3-bottom.js').default,
    rawText: require('!raw-loader!doc/pages/components/Sticky/example-3-bottom.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
