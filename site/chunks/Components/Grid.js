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
    name: '01-base',
    title: locate('任意等分 \n Grid 的栅格体系是动态生成，可以实现任意等份', 'Arbitrary \n Grid system is dynamic generated and can be any number.'),
    component: require('doc/pages/components/Grid/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Grid/example-01-base.js'),
  },
  {
    name: '02-offset',
    title: locate('偏移 \n offset 属性可以设置偏移，取值方式和宽度相同', 'Offset \n The offset property set the offset in the same way as the width.'),
    component: require('doc/pages/components/Grid/example-02-offset.js').default,
    rawText: require('!raw-loader!doc/pages/components/Grid/example-02-offset.js'),
  },
  {
    name: '03-nested',
    title: locate('嵌套 \n 嵌套的栅格', 'Nested \n Nested grids'),
    component: require('doc/pages/components/Grid/example-03-nested.js').default,
    rawText: require('!raw-loader!doc/pages/components/Grid/example-03-nested.js'),
  },
  {
    name: '04-gutter',
    title: locate('间距 \n 通过 gutter 属性设置栅格间距', 'Gutter \n Set grid spacing through the gutter property.'),
    component: require('doc/pages/components/Grid/example-04-gutter.js').default,
    rawText: require('!raw-loader!doc/pages/components/Grid/example-04-gutter.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
