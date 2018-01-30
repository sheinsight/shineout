/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import locate from 'doc/locate'

import cn from 'doc/pages/components/Dropdown/cn.md'
import en from 'doc/pages/components/Dropdown/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基础', 'Base'),
    component: require('doc/pages/components/Dropdown/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-1-base.js'),
  },
  {
    title: locate('基础', 'Base'),
    component: require('doc/pages/components/Dropdown/example-2-position.js').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-2-position.js'),
  },
]

export default navable(props => <MarkDown {...props} source={source} examples={examples} />)
