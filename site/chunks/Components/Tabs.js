/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Tabs/cn.md'
import en from 'doc/pages/components/Tabs/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法 \n 默认标签样式', 'Base \n Basic usage.'),
    component: require('doc/pages/components/Tabs/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-1-base.js'),
  },
  {
    name: '2-color',
    title: locate('自定义颜色 \n 自定义每个标签的字体颜色、边框颜色和背景色', 'Color \n Set the font color, border color, and background color for each label.'),
    component: require('doc/pages/components/Tabs/example-2-color.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-2-color.js'),
  },
  {
    name: '3-scroll',
    title: locate('滚动 \n 超出长度时，会自动出现滚动按钮', 'Scroll \n The slide button is displayed when the Tabs length exceeds the parent container'),
    component: require('doc/pages/components/Tabs/example-3-scroll.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-3-scroll.js'),
  },
  {
    name: '4-active',
    title: locate('受控 \n 通过 active 和 onChange 可以控制标签状态', 'Controlled \n Set active and onChange property to control active state.'),
    component: require('doc/pages/components/Tabs/example-4-active.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-4-active.js'),
  },
  {
    name: '5-shape-line',
    title: locate('样式 \n 设置 shape 为 \'line\'，标签显示为线条', 'Shape (line) \n The line type tabs.'),
    component: require('doc/pages/components/Tabs/example-5-shape-line.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-5-shape-line.js'),
  },
  {
    name: '6-shape-button',
    title: locate(' \n 设置 shape 为 \'button\'，标签显示为按钮', 'Shape (button) \n The button type tabs.'),
    component: require('doc/pages/components/Tabs/example-6-shape-button.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-6-shape-button.js'),
  },
  {
    name: '7-align',
    title: locate('右对齐 \n 设置 align="right" 使标签右对齐', 'Align \n set align to \'right\' to align labels to the right'),
    component: require('doc/pages/components/Tabs/example-7-align.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-7-align.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
