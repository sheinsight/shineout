/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import log from 'doc/utils/log'
import locate from 'doc/locate'

import cn from 'doc/pages/components/Rule/cn.md'
import en from 'doc/pages/components/Rule/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: 'locale',
    title: locate('', ''),
    component: require('doc/pages/components/Rule/example-locale.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rule/example-locale.js'),
  },
]

log.start()
log.setType('custom')
require('doc/pages/components/Rule/code-custom.js')
log.setType('length')
require('doc/pages/components/Rule/code-length.js')
log.setType('max')
require('doc/pages/components/Rule/code-max.js')
log.setType('min')
require('doc/pages/components/Rule/code-min.js')
log.setType('regExp')
require('doc/pages/components/Rule/code-regExp.js')
log.setType('required')
require('doc/pages/components/Rule/code-required.js')
log.setType('type')
require('doc/pages/components/Rule/code-type.js')

const logs = log.end()

const codes = {
  'custom': {
    text: require('!raw-loader!doc/pages/components/Rule/code-custom.js'),
    log: logs['custom'],
  },
  'length': {
    text: require('!raw-loader!doc/pages/components/Rule/code-length.js'),
    log: logs['length'],
  },
  'max': {
    text: require('!raw-loader!doc/pages/components/Rule/code-max.js'),
    log: logs['max'],
  },
  'min': {
    text: require('!raw-loader!doc/pages/components/Rule/code-min.js'),
    log: logs['min'],
  },
  'regExp': {
    text: require('!raw-loader!doc/pages/components/Rule/code-regExp.js'),
    log: logs['regExp'],
  },
  'required': {
    text: require('!raw-loader!doc/pages/components/Rule/code-required.js'),
    log: logs['required'],
  },
  'type': {
    text: require('!raw-loader!doc/pages/components/Rule/code-type.js'),
    log: logs['type'],
  },
}

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
