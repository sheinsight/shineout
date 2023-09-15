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
    isTs: false,
    isTest: false,
    title: locate(
      '',
      ''
    ),
    component: require('doc/pages/components/Rule/example-locale.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rule/example-locale.js'),

  },
]

log.start()
log.setType('custom.js')
require('doc/pages/components/Rule/code-custom.js.js')
log.setType('max.js')
require('doc/pages/components/Rule/code-max.js.js')
log.setType('min.js')
require('doc/pages/components/Rule/code-min.js.js')
log.setType('range.js')
require('doc/pages/components/Rule/code-range.js.js')
log.setType('regExp.js')
require('doc/pages/components/Rule/code-regExp.js.js')
log.setType('required.js')
require('doc/pages/components/Rule/code-required.js.js')
log.setType('type.js')
require('doc/pages/components/Rule/code-type.js.js')

const logs = log.end()

const codes = {
  'custom.js': {
    text: require('!raw-loader!doc/pages/components/Rule/code-custom.js.js'),
    log: logs['custom.js'],
  },
  'max.js': {
    text: require('!raw-loader!doc/pages/components/Rule/code-max.js.js'),
    log: logs['max.js'],
  },
  'min.js': {
    text: require('!raw-loader!doc/pages/components/Rule/code-min.js.js'),
    log: logs['min.js'],
  },
  'range.js': {
    text: require('!raw-loader!doc/pages/components/Rule/code-range.js.js'),
    log: logs['range.js'],
  },
  'regExp.js': {
    text: require('!raw-loader!doc/pages/components/Rule/code-regExp.js.js'),
    log: logs['regExp.js'],
  },
  'required.js': {
    text: require('!raw-loader!doc/pages/components/Rule/code-required.js.js'),
    log: logs['required.js'],
  },
  'type.js': {
    text: require('!raw-loader!doc/pages/components/Rule/code-type.js.js'),
    log: logs['type.js'],
  },
}

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
