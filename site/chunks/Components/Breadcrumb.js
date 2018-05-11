/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Breadcrumb/cn.md'
import en from 'doc/pages/components/Breadcrumb/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法', 'base'),
    component: require('doc/pages/components/Breadcrumb/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Breadcrumb/example-1-base.js'),
  },
  {
    name: '2-separator',
    title: locate('自定义分隔符(字符串和reactNode)', 'separator(string and reactNode)'),
    component: require('doc/pages/components/Breadcrumb/example-2-separator.js').default,
    rawText: require('!raw-loader!doc/pages/components/Breadcrumb/example-2-separator.js'),
  },
  {
    name: '3-icon',
    title: locate('图标', 'icon'),
    component: require('doc/pages/components/Breadcrumb/example-3-icon.js').default,
    rawText: require('!raw-loader!doc/pages/components/Breadcrumb/example-3-icon.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
