/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Button/cn.md'
import en from 'doc/pages/components/Button/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Button/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-1-base.js'),
  },
  {
    name: '2-outline',
    title: locate('透明背景', 'Outline'),
    component: require('doc/pages/components/Button/example-2-outline.js').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-2-outline.js'),
  },
  {
    name: '3-disabled',
    title: locate('不可用', 'Disabled'),
    component: require('doc/pages/components/Button/example-3-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-3-disabled.js'),
  },
  {
    name: '4-size',
    title: locate('大小', 'Size'),
    component: require('doc/pages/components/Button/example-4-size.js').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-4-size.js'),
  },
  {
    name: '5-group',
    title: locate('组合', 'Group'),
    component: require('doc/pages/components/Button/example-5-group.js').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-5-group.js'),
  },
  {
    name: '6-href',
    title: locate('链接', 'Link'),
    component: require('doc/pages/components/Button/example-6-href.js').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-6-href.js'),
  },
  {
    name: '7-icon',
    title: locate('图标', 'Icon'),
    component: require('doc/pages/components/Button/example-7-icon.js').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-7-icon.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
