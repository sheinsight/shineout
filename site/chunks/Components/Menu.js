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
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n Menu 通过数据来生成菜单项',
      'Base \n Menu generates menu items through data.'
    ),
    component: require('doc/pages/components/Menu/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/example-1-base.tsx'),

  },
  {
    name: '1-link',
    isTs: true,
    isTest: false,
    title: locate(
      '链接 \n 可以通过设置 linkKey 来渲染出对应的链接',
      'link \n Can render the corresponding link by setting linkKey'
    ),
    component: require('doc/pages/components/Menu/example-1-link.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-1-link.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/example-1-link.tsx'),

  },
  {
    name: '1-onClick',
    isTs: true,
    isTest: false,
    title: locate(
      '父菜单可选中 \n 设置 parentSelectable 使父级菜单支持单独选中 <br /> 此时父级菜单左侧区域用于选中，偏右侧区域用于展开和收起子菜单',
      'Parent Selectable \n Setting the parentSelectable property can make the parent menu trigger the onClick of the Menu after clicking'
    ),
    component: require('doc/pages/components/Menu/example-1-onClick.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-1-onClick.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/example-1-onClick.tsx'),

  },
  {
    name: '2-horizontal',
    isTs: true,
    isTest: false,
    title: locate(
      '水平布局 \n 设置 mode 为 "horizontal"，显示为水平布局（子菜单在右侧弹出）',
      'Horizontal \n Set mode to "horizontal" to display it as horizontal layout (submenu pops up on the right).'
    ),
    component: require('doc/pages/components/Menu/example-2-horizontal.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-2-horizontal.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/example-2-horizontal.tsx'),

  },
  {
    name: '3-vertical',
    isTs: true,
    isTest: false,
    title: locate(
      '垂直样式 \n 设置 mode 为 "vertical"，显示为垂直布局 \n 设置 mode 为 "vertical-auto" 可以自动选择弹出方向（上下）',
      'Vertical \n Set mode to "vertical" to display it as vertical layout. \n set \'vertical-auto\' auto popup position'
    ),
    component: require('doc/pages/components/Menu/example-3-vertical.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-3-vertical.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/example-3-vertical.tsx'),

  },
  {
    name: '4-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用菜单 \n 通过 disabled 属性可以禁用选项',
      'Disabled \n Disable the option by the disabled property.'
    ),
    component: require('doc/pages/components/Menu/example-4-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-4-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/example-4-disabled.tsx'),

  },
  {
    name: '5-selected',
    isTs: true,
    isTest: false,
    title: locate(
      '受控 \n active 参数控制选中选项',
      'Controlled \n Set active property to control the actived option.'
    ),
    component: require('doc/pages/components/Menu/example-5-selected.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-5-selected.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/example-5-selected.tsx'),

  },
  {
    name: '6-itemRender',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义渲染 \n 设置 renderItem 属性展现稍微复杂的内容',
      'RenderItem \n Set the renderItem property to show format content.'
    ),
    component: require('doc/pages/components/Menu/example-6-itemRender.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-6-itemRender.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/example-6-itemRender.tsx'),

  },
  {
    name: '7-click',
    isTs: true,
    isTest: false,
    title: locate(
      '点击事件 \n 如果选项未设置单独的 onClick 事件，点击后会调用 Menu 定义的 onClick 事件',
      'Click \n If the data item set the onClick event, this event is called. Otherwise, the onClick event defined by Menu is called.'
    ),
    component: require('doc/pages/components/Menu/example-7-click.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-7-click.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/example-7-click.tsx'),

  },
  {
    name: '8-dark',
    isTs: true,
    isTest: false,
    title: locate(
      '暗系主题 \n 内置了一个暗色的主题，通过 theme 使用',
      'Dark theme \n The dark theme.'
    ),
    component: require('doc/pages/components/Menu/example-8-dark.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-8-dark.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/example-8-dark.tsx'),

  },
  {
    name: '9-toggleDuration',
    isTs: true,
    isTest: false,
    title: locate(
      '菜单项状态改变后持续时间 \n 当鼠标从菜单项中移开时，菜单项会在停留指定时间后消失',
      'ToggleDuration \n When the mouse cursor is removed from  menuitem, the menuitem disappears for a specified period of time'
    ),
    component: require('doc/pages/components/Menu/example-9-toggleDuration.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-9-toggleDuration.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/example-9-toggleDuration.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
