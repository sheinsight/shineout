/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import locate from 'doc/locate'

import cn from 'doc/pages/Components/Button/cn.md'
import en from 'doc/pages/Components/Button/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('类型 type', 'Type'),
    component: require('doc/pages/Components/Button/example-1-type.js').default,
    rawText: require('!raw-loader!doc/pages/Components/Button/example-1-type.js'),
  },
]

export default navable(props => <MarkDown {...props} source={source} examples={examples} />)
