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
    name: '10-frontCaret',
    isTs: true,
    isTest: false,
    title: locate(
      '前置展开符 \n 使用 frontCaret 来前置展开符 \n 使用 frontCaretType 来设置展开图标类型',
      'put the expander in front \n use frontCaret to put the expander in front \n Use frontCaretType to set the Icon type'
    ),
    component: require('doc/pages/components/Menu/example-10-frontCaret.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/example-10-frontCaret.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/example-10-frontCaret.tsx'),

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
    name: 'test-001-link-func',
    isTs: true,
    isTest: true,
    title: locate(
      'LinkKey 使用函数 \n 可以通过设置 linkKey 为函数返回值作为链接地址',
      ''
    ),
    component: require('doc/pages/components/Menu/test-001-link-func.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/test-001-link-func.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/test-001-link-func.tsx'),

  },
  {
    name: 'test-002-tooggleDuration',
    isTs: true,
    isTest: true,
    title: locate(
      '菜单项状态改变后持续时间 \n 当鼠标从菜单项中移开时，菜单项会在停留指定时间后消失',
      'ToggleDuration \n When the mouse cursor is removed from  menuitem, the menuitem disappears for a specified period of time'
    ),
    component: require('doc/pages/components/Menu/test-002-tooggleDuration.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/test-002-tooggleDuration.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/test-002-tooggleDuration.tsx'),

  },
  {
    name: 'test-003-renderLink-click',
    isTs: true,
    isTest: true,
    title: locate(
      '自定义渲染成链接和点击测试 \n 如果自定义在最外层渲染 a 标签内部将不会再生成 a 标签',
      '自定义渲染成链接 \n 如果自定义在最外层渲染 a 标签内部将不会再生成 a 标签'
    ),
    component: require('doc/pages/components/Menu/test-003-renderLink-click.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/test-003-renderLink-click.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/test-003-renderLink-click.tsx'),

  },
  {
    name: 'test-004-verticalauto',
    isTs: true,
    isTest: true,
    title: locate(
      '垂直样式-vertical-auto \n 设置 mode 为 "vertical-auto" 可以自动选择弹出方向（上下）',
      'Vertical--vertical-auto \n set \'vertical-auto\' auto popup position'
    ),
    component: require('doc/pages/components/Menu/test-004-verticalauto.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/test-004-verticalauto.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/test-004-verticalauto.tsx'),

  },
  {
    name: 'test-005-openKeys',
    isTs: true,
    isTest: true,
    title: locate(
      'openKeys 受控 \n openKeys onOpenChange',
      'openKeys 受控 \n openKeys onOpenChange'
    ),
    component: require('doc/pages/components/Menu/test-005-openKeys.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/test-005-openKeys.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/test-005-openKeys.tsx'),

  },
  {
    name: 'test-006-defaultOpenKeys',
    isTs: true,
    isTest: true,
    title: locate(
      'defaultOpenKeys \n defaultOpenKeys',
      'defaultOpenKeys \n defaultOpenKeys'
    ),
    component: require('doc/pages/components/Menu/test-006-defaultOpenKeys.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Menu/test-006-defaultOpenKeys.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Menu/test-006-defaultOpenKeys.tsx'),

  },
]

const codes = undefined

const api = '[]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
