/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import log from 'doc/utils/log'
import locate from 'doc/locate'

import cn from 'doc/pages/components/Menu/cn.md'
import en from 'doc/pages/components/Menu/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Menu/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-1-base.js'),
  },
]

log.start()


const logs = log.end()

const codes = {
}

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
