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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/example-1-base.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/example-1-link.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/example-1-onClick.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/example-10-frontCaret.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/example-2-horizontal.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/example-3-vertical.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/example-4-disabled.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/example-5-selected.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/example-6-itemRender.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/example-7-click.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/example-8-dark.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/test-001-link-func.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/test-002-tooggleDuration.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/test-003-renderLink-click.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/test-004-verticalauto.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/test-005-openKeys.tsx'),

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
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Menu/test-006-defaultOpenKeys.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Menu","properties":[{"name":"mode","tag":{"cn":"菜单样式","en":"style of menu","default":"\\\"inline\\\"","version":""},"required":true,"type":"\\\"inline\\\" | \\\"vertical\\\" | \\\"horizontal\\\" | \\\"vertical-auto\\\""},{"name":"data","tag":{"cn":"需要渲染成菜单的数据","en":"Menu items data","default":"[]","version":""},"required":false,"type":"object[]"},{"name":"theme","tag":{"cn":"主题","en":"theme of menu","default":"","version":""},"required":false,"type":"\\\"dark\\\" "},{"name":"height","tag":{"cn":"菜单高度","en":"menu height","default":"","version":""},"required":false,"type":"string | number "},{"name":"openKeys","tag":{"cn":"展开的菜单(受控)","en":"expended menu","default":"[]","version":""},"required":false,"type":"(string | number)[]"},{"name":"caretColor","tag":{"cn":"三角展开符颜色","en":"triangle expansion color","default":"","version":""},"required":false,"type":"string "},{"name":"frontCaret","tag":{"cn":"前置实心三角展开符","en":"Front solid triangle expansion","default":"","version":""},"required":false,"type":"boolean "},{"name":"inlineIndent","tag":{"cn":"每一层缩进宽度","en":"indent of each level","default":"24","version":""},"required":false,"type":"number "},{"name":"looseChildren","tag":{"cn":"如果 children 有设置则菜单项可展开","en":"menu item expandable if has children","default":"false","version":""},"required":false,"type":"boolean "},{"name":"keygen","tag":{"cn":"生成每一项key的辅助方法。为 true 时，以数据项本身作为key，相当于 (d => d)。为函数时，使用此函数返回值。为string时，使用这个string对应的数据值。如 \\\"id\\\"，相当于 (d => d.id)","en":"Key generator. When it is true, the data itself is used as the key equivalent to (d => d). When it is a function, use its return value. When it is a string，ues the value of the string. For example, \\\"id\\\" is the same thing as (d) => d.id.","default":"true","version":""},"required":true,"type":"ObjectKey<DataItem> | ((data: DataItem, index?: number) => string | number) | true"},{"name":"defaultOpenKeys","tag":{"cn":"初始展开的菜单;如果需要设置此值,则需要设置keygen,此值为一个包含key的数组","en":"Initial expanded menu","default":"[]","version":""},"required":false,"type":"(string | number)[]"},{"name":"parentSelectable","tag":{"cn":"父级菜单是否可选中","en":"parent menu Selectable","default":"false","version":""},"required":false,"type":"boolean "},{"name":"onClick","tag":{"cn":"子菜单点击事件,参数为当条数据","en":"The function will be called when the user clicks the menu item.","default":"","version":""},"required":false,"type":"((data: DataItem) => void) "},{"name":"active","tag":{"cn":"验证是否激活,参数为对应的数据对象,返回true则代表该菜单激活","en":"The item is actived when the active function return true.","default":"","version":""},"required":false,"type":"((data: DataItem) => boolean) "},{"name":"disabled","tag":{"cn":"是否禁用选项","en":"Whether to be disabled","default":"d => d.disabled","version":""},"required":false,"type":"((data: DataItem) => boolean) "},{"name":"frontCaretType","tag":{"cn":"前置三角展开符类型","en":"front triangle expansion symbol type","default":"\\\"solid\\\"","version":""},"required":false,"type":"\\\"hollow\\\" | \\\"solid\\\" "},{"name":"onOpenChange","tag":{"cn":"菜单展开/收起回调","en":"menu open change callback","default":"","version":""},"required":false,"type":"((keys: Key[]) => void) "},{"name":"linkKey","tag":{"cn":"需要注入子菜单的链接键值","en":"the key of inject the link value of the submenu","default":"","version":""},"required":false,"type":"ObjectKey<DataItem> | ((d: DataItem) => string) "},{"name":"renderItem","tag":{"cn":"元素渲染方式,如果为字符串,则会以对应的值作为显示内容;如果为函数,则以函数返回的结果作为显示内容,函数参数为对应的数据对象","en":"Element render mode. If it is a string, the corresponding value is taken as the display content; If it is a function, the result returned by the function is taken as the display content.","default":"\\\"title\\\"","version":""},"required":false,"type":"ObjectKey<DataItem> | ((data: DataItem, index: number) => ReactNode) "},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
