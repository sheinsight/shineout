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
    name: '1-top.tsx',
    isTs: true,
    title: locate(
      '基本 \n 附着在顶部 20px',
      'Basic \n Sticky 20px to top'
    ),
    component: require('doc/pages/components/Sticky/example-1-top.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Sticky/example-1-top.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Sticky/example-1-top.tsx'),

  },
  {
    name: '2-element.tsx',
    isTs: true,
    title: locate(
      '指定元素 \n 附着在元素内',
      'Element \n Sticky to element'
    ),
    component: require('doc/pages/components/Sticky/example-2-element.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Sticky/example-2-element.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Sticky/example-2-element.tsx'),

  },
  {
    name: '3-bottom.tsx',
    isTs: true,
    title: locate(
      '位置 \n 附着在底部',
      'Position \n Sticky to bottom'
    ),
    component: require('doc/pages/components/Sticky/example-3-bottom.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Sticky/example-3-bottom.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Sticky/example-3-bottom.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
