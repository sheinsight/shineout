/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Menu/cn.md'
import en from 'doc/pages/components/Menu/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法 \n Menu 通过数据来生成菜单项', 'Base \n Menu generates menu items through data.'),
    component: require('doc/pages/components/Menu/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-1-base.js'),
  },
  {
    name: '2-horizontal',
    title: locate('水平布局 \n 设置 mode 为 "horizontal"，显示为水平布局（子菜单在右侧弹出）', 'Horizontal \n Set mode to "horizontal" to display it as horizontal layout (submenu pops up on the right).'),
    component: require('doc/pages/components/Menu/example-2-horizontal.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-2-horizontal.js'),
  },
  {
    name: '3-vertical',
    title: locate('垂直样式 \n 设置 mode 为 "vertical"，显示为垂直布局', 'Vertical \n Set mode to "vertical" to display it as vertical layout.'),
    component: require('doc/pages/components/Menu/example-3-vertical.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-3-vertical.js'),
  },
  {
    name: '4-disabled',
    title: locate('禁用菜单 \n 通过 disabled 属性可以禁用选项', 'Disabled \n Disable the option by the disabled property.'),
    component: require('doc/pages/components/Menu/example-4-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-4-disabled.js'),
  },
  {
    name: '5-selected',
    title: locate('受控 \n active 参数控制选中选项', 'Controlled \n Set active property to control the actived option.'),
    component: require('doc/pages/components/Menu/example-5-selected.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-5-selected.js'),
  },
  {
    name: '6-itemRender',
    title: locate('自定义渲染 \n 设置 renderItem 属性展现稍微复杂的内容', 'RenderItem \n Set the renderItem property to show format content.'),
    component: require('doc/pages/components/Menu/example-6-itemRender.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-6-itemRender.js'),
  },
  {
    name: '7-click',
    title: locate('点击事件 \n 如果选项未设置单独的 onClick 事件，点击后会调用 Menu 定义的 onClick 事件', 'Click \n If the data item set the onClick event, this event is called. Otherwise, the onClick event defined by Menu is called.'),
    component: require('doc/pages/components/Menu/example-7-click.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-7-click.js'),
  },
  {
    name: '8-dark',
    title: locate('暗系主题 \n 内置了一个暗色的主题，通过 theme 使用', 'Dark theme \n The dark theme.'),
    component: require('doc/pages/components/Menu/example-8-dark.js').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-8-dark.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
