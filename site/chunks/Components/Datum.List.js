/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import log from 'doc/utils/log'
import locate from 'doc/locate'

import cn from 'doc/pages/components/Datum.List/cn.md'
import en from 'doc/pages/components/Datum.List/en.md'

const source = locate(cn, en)

const examples = [
]

log.start()
log.setType('disabled')
require('doc/pages/components/Datum.List/code-disabled.js')
log.setType('example')
require('doc/pages/components/Datum.List/code-example.js')
log.setType('format')
require('doc/pages/components/Datum.List/code-format.js')
log.setType('onchange')
require('doc/pages/components/Datum.List/code-onchange.js')
log.setType('prediction')
require('doc/pages/components/Datum.List/code-prediction.js')
log.setType('separator')
require('doc/pages/components/Datum.List/code-separator.js')

const logs = log.end()

const codes = {
  'disabled': {
    text: require('!raw-loader!doc/pages/components/Datum.List/code-disabled.js'),
    log: logs['disabled'],
  },
  'example': {
    text: require('!raw-loader!doc/pages/components/Datum.List/code-example.js'),
    log: logs['example'],
  },
  'format': {
    text: require('!raw-loader!doc/pages/components/Datum.List/code-format.js'),
    log: logs['format'],
  },
  'onchange': {
    text: require('!raw-loader!doc/pages/components/Datum.List/code-onchange.js'),
    log: logs['onchange'],
  },
  'prediction': {
    text: require('!raw-loader!doc/pages/components/Datum.List/code-prediction.js'),
    log: logs['prediction'],
  },
  'separator': {
    text: require('!raw-loader!doc/pages/components/Datum.List/code-separator.js'),
    log: logs['separator'],
  },
}

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
