/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Transfer/cn.md'
import en from 'doc/pages/components/Transfer/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate(
      '基本用法 \n 基本的使用',
      'Base \n Basic usage'
    ),
    component: require('doc/pages/components/Transfer/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-1-base.js'),
  },
  {
    name: '2-controlled',
    title: locate(
      '受控 \n 组件受控',
      'Controlled \n Component controlled'
    ),
    component: require('doc/pages/components/Transfer/example-2-controlled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-2-controlled.js'),
  },
  {
    name: '2-customTitle',
    title: locate(
      '自定义 \n 可以自定义标题, 按钮, 底部等属性',
      'Customize \n Customizable title, button, bottom properties'
    ),
    component: require('doc/pages/components/Transfer/example-2-customTitle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Transfer/example-2-customTitle.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
