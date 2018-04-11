/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Modal/cn.md'
import en from 'doc/pages/components/Modal/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Modal/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-1-base.js'),
  },
  {
    title: locate('使用api', 'use api'),
    component: require('doc/pages/components/Modal/example-2-special.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-2-special.js'),
  },
  {
    title: locate('确认框', 'Confirm Modal'),
    component: require('doc/pages/components/Modal/example-3-confirm.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-3-confirm.js'),
  },
  {
    title: locate('内嵌form', 'use form'),
    component: require('doc/pages/components/Modal/example-4-form.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-4-form.js'),
  },
  {
    title: locate('多级modal', 'Multistage Modal'),
    component: require('doc/pages/components/Modal/example-5-multistage.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-5-multistage.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
