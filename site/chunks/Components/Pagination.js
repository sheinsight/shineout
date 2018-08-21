/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Pagination/cn.md'
import en from 'doc/pages/components/Pagination/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法 \n 最基本的使用', 'Base \n The basic usage'),
    component: require('doc/pages/components/Pagination/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-1-base.js'),
  },
  {
    name: '2-size',
    title: locate('大小 \n 内置了 3 种大小供选择，small, default, large，默认为 default', 'Size \n Three sizes are built in for selection: small, default, large, default value is default.'),
    component: require('doc/pages/components/Pagination/example-2-size.js').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-2-size.js'),
  },
  {
    name: '3-layout',
    title: locate('布局 \n 通过 layout 属性来控制组件是否显示以及显示的位置', 'Layout \n Use the layout property to control whether the child elements is displayed and where is displayed.'),
    component: require('doc/pages/components/Pagination/example-3-layout.js').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-3-layout.js'),
  },
  {
    name: '4-text',
    title: locate('文字 \n 通过 text 替换文字', 'Text \n Set text property to replace the default text..'),
    component: require('doc/pages/components/Pagination/example-4-text.js').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-4-text.js'),
  },
  {
    name: '5-align',
    title: locate('位置 \n 内置了 3 种位置，left, center, right，默认为 left', 'Alignment \n Options: \'left\', \'center\', \'right\', the default value is left.'),
    component: require('doc/pages/components/Pagination/example-5-align.js').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-5-align.js'),
  },
  {
    name: '7-controlled',
    title: locate('受控组件 \n 同时设置 current 和 onChange 属性，可以作为受控组件使用', 'Controlled \n Set both the current and onChange properties for being used as a controlled component.'),
    component: require('doc/pages/components/Pagination/example-7-controlled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-7-controlled.js'),
  },
  {
    name: '8-disabled',
    title: locate('禁用 \n 设置 disabled 属性，可以禁用组件', 'Disabled \n Set the disabled property to disable the component.'),
    component: require('doc/pages/components/Pagination/example-8-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-8-disabled.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
