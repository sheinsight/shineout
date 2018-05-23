/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Popover/cn.md'
import en from 'doc/pages/components/Popover/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Popover/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-1-base.js'),
  },
  {
    name: '2-position',
    title: locate('弹出位置', 'Position'),
    component: require('doc/pages/components/Popover/example-2-position.js').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-2-position.js'),
  },
  {
    name: '3-click',
    title: locate('点击触发', 'Click'),
    component: require('doc/pages/components/Popover/example-3-click.js').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-3-click.js'),
  },
  {
    name: '4-func',
    title: locate('关闭事件', 'onClose'),
    component: require('doc/pages/components/Popover/example-4-func.js').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-4-func.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
