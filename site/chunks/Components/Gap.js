/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Gap/cn.md'
import en from 'doc/pages/components/Gap/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: false,
    title: locate(
      '基本用法 \n 为子元素设置水平和垂直间距',
      'Base \n Set horizontal and vertical spacing for child elements'
    ),
    component: require('doc/pages/components/Gap/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Gap/example-1-base.js'),

  },
  {
    name: '2-custom',
    isTs: false,
    title: locate(
      '自定义间距 \n 通过 row 和 column 分别来调整垂直和水平间距',
      'Custom \n custom the vertical and horizontal spacing by row and column'
    ),
    component: require('doc/pages/components/Gap/example-2-custom.js').default,
    rawText: require('!raw-loader!doc/pages/components/Gap/example-2-custom.js'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
