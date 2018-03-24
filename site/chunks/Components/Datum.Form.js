/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import log from 'doc/utils/log'
import locate from 'doc/locate'

import cn from 'doc/pages/components/Datum.Form/cn.md'
import en from 'doc/pages/components/Datum.Form/en.md'

const source = locate(cn, en)

const examples = [
]

log.start()
log.setType('example')
require('doc/pages/components/Datum.Form/code-example.js')

const logs = log.end()

const codes = {
  'example': {
    text: require('!raw-loader!doc/pages/components/Datum.Form/code-example.js'),
    log: logs['example'],
  },
}

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
