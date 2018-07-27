/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Radio/cn.md'
import en from 'doc/pages/components/Radio/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法 \n Radio 必须以组的方式来使用', 'Base'),
    component: require('doc/pages/components/Radio/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-1-base.js'),
  },
  {
    name: '2-raw',
    title: locate(' \n 可以使用 React 组件方式调用', ''),
    component: require('doc/pages/components/Radio/example-2-raw.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-2-raw.js'),
  },
  {
    name: '3-block',
    title: locate('垂直布局 \n 默认为水平布局，设置 block 属性可以改为垂直布局', 'Block'),
    component: require('doc/pages/components/Radio/example-3-block.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-3-block.js'),
  },
  {
    name: '4-disabled',
    title: locate('禁用 \n 设置 disabled 为 true 时，禁用所有选项', 'Disabled'),
    component: require('doc/pages/components/Radio/example-4-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-4-disabled.js'),
  },
  {
    name: '5-disabled',
    title: locate(' \n 使用 datum disabled 实现有条件禁用', 'Disabled'),
    component: require('doc/pages/components/Radio/example-5-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-5-disabled.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
