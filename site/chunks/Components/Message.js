/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import locate from 'doc/locate'

import cn from 'doc/pages/components/Message/cn.md'
import en from 'doc/pages/components/Message/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Message/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Message/example-1-base.js'),
  },
  {
    title: locate('duration', 'duration'),
    component: require('doc/pages/components/Message/example-2-duration.js').default,
    rawText: require('!raw-loader!doc/pages/components/Message/example-2-duration.js'),
  },
  {
    title: locate('位置 position', 'Position Center'),
    component: require('doc/pages/components/Message/example-3-position.js').default,
    rawText: require('!raw-loader!doc/pages/components/Message/example-3-position.js'),
  },
  {
    title: locate('回调 onClose', 'Event onClose'),
    component: require('doc/pages/components/Message/example-4-close.js').default,
    rawText: require('!raw-loader!doc/pages/components/Message/example-4-close.js'),
  },
]

export default navable(props => <MarkDown {...props} source={source} examples={examples} />)
