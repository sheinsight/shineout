/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Grid/cn.md'
import en from 'doc/pages/components/Grid/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base.tsx',
    isTs: true,
    title: locate(
      '任意等分 \n Grid 的栅格体系是动态生成，可以实现任意等份',
      'Arbitrary \n Grid system is dynamic generated and can be any number.'
    ),
    component: require('doc/pages/components/Grid/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Grid/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Grid/example-01-base.tsx'),

  },
  {
    name: '02-offset.tsx',
    isTs: true,
    title: locate(
      '偏移 \n offset 属性可以设置偏移，取值方式和宽度相同',
      'Offset \n The offset property set the offset in the same way as the width.'
    ),
    component: require('doc/pages/components/Grid/example-02-offset.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Grid/example-02-offset.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Grid/example-02-offset.tsx'),

  },
  {
    name: '03-nested.tsx',
    isTs: true,
    title: locate(
      '嵌套 \n 嵌套的栅格',
      'Nested \n Nested grids'
    ),
    component: require('doc/pages/components/Grid/example-03-nested.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Grid/example-03-nested.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Grid/example-03-nested.tsx'),

  },
  {
    name: '04-gutter.tsx',
    isTs: true,
    title: locate(
      '间距 \n 通过 gutter 属性设置栅格间距',
      'Gutter \n Set grid spacing through the gutter property.'
    ),
    component: require('doc/pages/components/Grid/example-04-gutter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Grid/example-04-gutter.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Grid/example-04-gutter.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
