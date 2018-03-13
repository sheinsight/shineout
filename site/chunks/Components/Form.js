/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import log from 'doc/utils/log'
import locate from 'doc/locate'

import cn from 'doc/pages/components/Form/cn.md'
import en from 'doc/pages/components/Form/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Form/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-1-base.js'),
  },
  {
    title: locate('标签样式 \n 通过 labelWidth 和 labelAlign 改变标签宽度和对齐方式', 'Label'),
    component: require('doc/pages/components/Form/example-2-label.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-2-label.js'),
  },
  {
    title: locate('', ''),
    component: require('doc/pages/components/Form/example-3-label.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-3-label.js'),
  },
  {
    title: locate('水平布局', 'Inline'),
    component: require('doc/pages/components/Form/example-4-inline.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-4-inline.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
