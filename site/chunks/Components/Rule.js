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
    isTs: true,
    isTest: false,
    title: locate(
      '',
      ''
    ),
    component: require('doc/pages/components/Rule/example-locale.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Rule/example-locale.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Rule/example-locale.tsx'),

  },
]

log.start()
log.setType('custom')
require('doc/pages/components/Rule/code-custom.ts')
log.setType('max')
require('doc/pages/components/Rule/code-max.ts')
log.setType('min')
require('doc/pages/components/Rule/code-min.ts')
log.setType('range')
require('doc/pages/components/Rule/code-range.ts')
log.setType('regExp')
require('doc/pages/components/Rule/code-regExp.ts')
log.setType('required')
require('doc/pages/components/Rule/code-required.ts')
log.setType('type')
require('doc/pages/components/Rule/code-type.ts')

const logs = log.end()

const codes = {
  'custom': {
    text: require('!raw-loader!doc/pages/components/Rule/code-custom.ts'),
    log: logs['custom'],
  },
  'max': {
    text: require('!raw-loader!doc/pages/components/Rule/code-max.ts'),
    log: logs['max'],
  },
  'min': {
    text: require('!raw-loader!doc/pages/components/Rule/code-min.ts'),
    log: logs['min'],
  },
  'range': {
    text: require('!raw-loader!doc/pages/components/Rule/code-range.ts'),
    log: logs['range'],
  },
  'regExp': {
    text: require('!raw-loader!doc/pages/components/Rule/code-regExp.ts'),
    log: logs['regExp'],
  },
  'required': {
    text: require('!raw-loader!doc/pages/components/Rule/code-required.ts'),
    log: logs['required'],
  },
  'type': {
    text: require('!raw-loader!doc/pages/components/Rule/code-type.ts'),
    log: logs['type'],
  },
}

const api = '[]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
