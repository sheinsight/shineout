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
    title: locate('基本用法 \n 与 Tooltip 相比，Popover 可以控制样式，大小由内容决定', 'Base \n The basic usage.'),
    component: require('doc/pages/components/Popover/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-1-base.js'),
  },
  {
    name: '2-position',
    title: locate('弹出位置 \n 内置了十二个弹出的位置', 'Position \n Twelve pop-up positions are built in.'),
    component: require('doc/pages/components/Popover/example-2-position.js').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-2-position.js'),
  },
  {
    name: '3-click',
    title: locate('点击触发 \n 默认是移入组件触发，设置 trigger 为 \'click\'，可以改为点击触发', 'Trigger \n Set the trigger property to change the trigger event to \'click\'.'),
    component: require('doc/pages/components/Popover/example-3-click.js').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-3-click.js'),
  },
  {
    name: '4-func',
    title: locate('关闭事件 \n content 属性可以为一个函数，会传递 close 函数，用来在弹出面板内部处理关闭事件', 'Close \n Set the content property to a function, you can handle the close event inside the popup panel.'),
    component: require('doc/pages/components/Popover/example-4-func.js').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-4-func.js'),
  },
  {
    name: '5-type',
    title: locate('样式 \n 内置四种样式', 'Type \n Four styles are built in.'),
    component: require('doc/pages/components/Popover/example-5-type.js').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-5-type.js'),
  },
  {
    name: '6-type',
    title: locate(' \n 如果内置样式不满足需求，可以通过 background 和 border 自定义样式', ' \n Customize the style with background and border.'),
    component: require('doc/pages/components/Popover/example-6-type.js').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-6-type.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
