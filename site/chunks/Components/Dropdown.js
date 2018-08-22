/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Dropdown/cn.md'
import en from 'doc/pages/components/Dropdown/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法 \n Dropdown 通过数据来渲染，支持 json 格式数据、React 组件', 'Base \n Dropdown is rendered through data and supports json formatted data and React components.'),
    component: require('doc/pages/components/Dropdown/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-1-base.js'),
  },
  {
    name: '2-hover',
    title: locate('触发 \n Dropdown 默认通过点击触发下拉行为，设置 trigger="hover" 属性可以改为移入触发', 'Trigger \n By default, Dropdown toggled clicking, setting trigger="hover" can toggled by mouse move in.'),
    component: require('doc/pages/components/Dropdown/example-2-hover.js').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-2-hover.js'),
  },
  {
    name: '3-position',
    title: locate('弹出位置 \n 设置 position 属性可以控制下拉菜单弹出的方向和位置', 'Position \n Set position property can control the direction and position of the drop-down menu.'),
    component: require('doc/pages/components/Dropdown/example-3-position.js').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-3-position.js'),
  },
  {
    name: '4-items',
    title: locate('多列平铺 \n 设置 columns 属性可以让选项多列平铺', 'Multiple columns \n Set columns property can make the option multi-column tiled.'),
    component: require('doc/pages/components/Dropdown/example-4-items.js').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-4-items.js'),
  },
  {
    name: '5-split',
    title: locate('组合 \n 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项', 'Group \n Dropdown can be combined with Button used in Button.Group.'),
    component: require('doc/pages/components/Dropdown/example-5-split.js').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-5-split.js'),
  },
  {
    name: '6-type',
    title: locate('样式 \n 使用了和Button相同的 type 和 size 设置样式', 'type \n Style is set using the same type and size as Button.'),
    component: require('doc/pages/components/Dropdown/example-6-type.js').default,
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-6-type.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
