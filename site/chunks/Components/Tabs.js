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
    name: '01-base',
    title: locate(
      '基本用法 \n 默认标签样式',
      'Base \n Basic usage.'
    ),
    component: require('doc/pages/components/Tabs/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-01-base.js'),
  },
  {
    name: '02-disable',
    title: locate(
      '禁用 \n 禁用某一个标签',
      'disabled \n disable a tab.'
    ),
    component: require('doc/pages/components/Tabs/example-02-disable.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-02-disable.js'),
  },
  {
    name: '03-color',
    title: locate(
      '自定义颜色 \n 自定义每个标签的字体颜色、边框颜色和背景色',
      'Color \n Set the font color, border color, and background color for each label.'
    ),
    component: require('doc/pages/components/Tabs/example-03-color.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-03-color.js'),
  },
  {
    name: '04-scroll',
    title: locate(
      '滚动 \n 超出长度时，会自动出现滚动按钮',
      'Scroll \n The slide button is displayed when the Tabs length exceeds the parent container'
    ),
    component: require('doc/pages/components/Tabs/example-04-scroll.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-04-scroll.js'),
  },
  {
    name: '05-active',
    title: locate(
      '受控 \n 通过 active 和 onChange 可以控制标签状态',
      'Controlled \n Set active and onChange property to control active state.'
    ),
    component: require('doc/pages/components/Tabs/example-05-active.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-05-active.js'),
  },
  {
    name: '06-shape-line',
    title: locate(
      '样式 \n 设置 shape 为 \'line\'，标签显示为线条',
      'Shape (line) \n The line type tabs.'
    ),
    component: require('doc/pages/components/Tabs/example-06-shape-line.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-06-shape-line.js'),
  },
  {
    name: '07-shape-button',
    title: locate(
      ' \n 设置 shape 为 \'button\'，标签显示为按钮',
      ' \n The button type tabs.'
    ),
    component: require('doc/pages/components/Tabs/example-07-shape-button.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-07-shape-button.js'),
  },
  {
    name: '07-shape-dash',
    title: locate(
      ' \n 设置 shape 为 \'dash\'，标签显示为短线条',
      ' \n dash tab type'
    ),
    component: require('doc/pages/components/Tabs/example-07-shape-dash.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-07-shape-dash.js'),
  },
  {
    name: '08-align-right',
    title: locate(
      '对齐 \n 设置 align="right" 使标签右对齐',
      'Align \n set align to \'right\' to align labels to the right'
    ),
    component: require('doc/pages/components/Tabs/example-08-align-right.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-08-align-right.js'),
  },
  {
    name: '09-align-vertical-left',
    title: locate(
      ' \n 设置 align="vertical-left" 使标签垂直靠左',
      ' \n set align to \'vertical-left\' to align labels to the vertically left'
    ),
    component: require('doc/pages/components/Tabs/example-09-align-vertical-left.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-09-align-vertical-left.js'),
  },
  {
    name: '10-align-vertical-right',
    title: locate(
      ' \n 设置 align="vertical-right" 使标签垂直靠右',
      ' \n set align to \'vertical-right\' to align labels to the vertically right'
    ),
    component: require('doc/pages/components/Tabs/example-10-align-vertical-right.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-10-align-vertical-right.js'),
  },
  {
    name: '11-collapsible',
    title: locate(
      '展开 \n 设置 collapsible 为 true，会出现可展开图标，点击图标或 Tabs 头部空白区域，展开/折起内容。',
      'Collapsible \n Set the collapsible property to true, will show the arrow icon. User can click icon or header to expand/collapse the content.'
    ),
    component: require('doc/pages/components/Tabs/example-11-collapsible.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-11-collapsible.js'),
  },
  {
    name: '12-auto-fill',
    title: locate(
      '自动填充 \n 通过 autoFill 属性来使 Tabs.Panel 自动填充父元素空间',
      'AutoFill \n Panel to automatically fill the parent element space via the autoFill property'
    ),
    component: require('doc/pages/components/Tabs/example-12-auto-fill.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-12-auto-fill.js'),
  },
  {
    name: '12-extra',
    title: locate(
      '额外内容 \n 可以在标签页的右侧添加额外内容',
      'Extra Content \n Can add extra content on the right side of the tab'
    ),
    component: require('doc/pages/components/Tabs/example-12-extra.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-12-extra.js'),
  },
  {
    name: '12-link',
    title: locate(
      '链接 \n 使用链接作为标签',
      'Link \n Use link as every tab.'
    ),
    component: require('doc/pages/components/Tabs/example-12-link.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-12-link.js'),
  },
  {
    name: '13-sticky',
    title: locate(
      '头部附着 \n sticky 属性会开启头部附着功能；sticky=true时，开启附着在顶部；sticky=number时，代表附着顶部，且距离顶部的间距；sticky=StickyProps时，参数将传入 Sticky 组件内；switchToTop 属性支持是否自动滚动到Tabs。',
      'Sticky header \n sticky header in Tabs'
    ),
    component: require('doc/pages/components/Tabs/example-13-sticky.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-13-sticky.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
