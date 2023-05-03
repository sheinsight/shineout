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
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 默认标签样式',
      'Base \n Basic usage.'
    ),
    component: require('doc/pages/components/Tabs/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-01-base.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-01-base.tsx'),

  },
  {
    name: '02-disable',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n 禁用某一个标签',
      'disabled \n disable a tab.'
    ),
    component: require('doc/pages/components/Tabs/example-02-disable.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-02-disable.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-02-disable.tsx'),

  },
  {
    name: '03-color',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义颜色 \n 自定义每个标签的字体颜色、边框颜色和背景色',
      'Color \n Set the font color, border color, and background color for each label.'
    ),
    component: require('doc/pages/components/Tabs/example-03-color.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-03-color.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-03-color.tsx'),

  },
  {
    name: '04-scroll',
    isTs: true,
    isTest: false,
    title: locate(
      '滚动 \n 超出长度时，会自动出现滚动按钮',
      'Scroll \n The slide button is displayed when the Tabs length exceeds the parent container'
    ),
    component: require('doc/pages/components/Tabs/example-04-scroll.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-04-scroll.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-04-scroll.tsx'),

  },
  {
    name: '05-active',
    isTs: true,
    isTest: false,
    title: locate(
      '受控 \n 通过 active 和 onChange 可以控制标签状态',
      'Controlled \n Set active and onChange property to control active state.'
    ),
    component: require('doc/pages/components/Tabs/example-05-active.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-05-active.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-05-active.tsx'),

  },
  {
    name: '06-shape-line',
    isTs: true,
    isTest: false,
    title: locate(
      '样式 \n 设置 shape 为 \'line\'，标签显示为线条',
      'Shape (line) \n The line type tabs.'
    ),
    component: require('doc/pages/components/Tabs/example-06-shape-line.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-06-shape-line.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-06-shape-line.tsx'),

  },
  {
    name: '07-shape-button',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 设置 shape 为 \'button\'，标签显示为按钮',
      ' \n The button type tabs.'
    ),
    component: require('doc/pages/components/Tabs/example-07-shape-button.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-07-shape-button.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-07-shape-button.tsx'),

  },
  {
    name: '07-shape-dash',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 设置 shape 为 \'dash\'，标签显示为短线条',
      ' \n dash tab type'
    ),
    component: require('doc/pages/components/Tabs/example-07-shape-dash.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-07-shape-dash.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-07-shape-dash.tsx'),

  },
  {
    name: '08-align-right',
    isTs: true,
    isTest: false,
    title: locate(
      '对齐 \n 设置 align="right" 使标签右对齐',
      'Align \n set align to \'right\' to align labels to the right'
    ),
    component: require('doc/pages/components/Tabs/example-08-align-right.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-08-align-right.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-08-align-right.tsx'),

  },
  {
    name: '09-align-vertical-left',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 设置 align="vertical-left" 使标签垂直靠左',
      ' \n set align to \'vertical-left\' to align labels to the vertically left'
    ),
    component: require('doc/pages/components/Tabs/example-09-align-vertical-left.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-09-align-vertical-left.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-09-align-vertical-left.tsx'),

  },
  {
    name: '10-align-vertical-right',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 设置 align="vertical-right" 使标签垂直靠右',
      ' \n set align to \'vertical-right\' to align labels to the vertically right'
    ),
    component: require('doc/pages/components/Tabs/example-10-align-vertical-right.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-10-align-vertical-right.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-10-align-vertical-right.tsx'),

  },
  {
    name: '11-collapsible',
    isTs: true,
    isTest: false,
    title: locate(
      '展开 \n 设置 collapsible 为 true，会出现可展开图标，点击图标或 Tabs 头部空白区域，展开/折起内容。',
      'Collapsible \n Set the collapsible property to true, will show the arrow icon. User can click icon or header to expand/collapse the content.'
    ),
    component: require('doc/pages/components/Tabs/example-11-collapsible.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-11-collapsible.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-11-collapsible.tsx'),

  },
  {
    name: '12-auto-fill',
    isTs: true,
    isTest: false,
    title: locate(
      '自动填充 \n 通过 autoFill 属性来使 Tabs.Panel 自动填充父元素空间',
      'AutoFill \n Panel to automatically fill the parent element space via the autoFill property'
    ),
    component: require('doc/pages/components/Tabs/example-12-auto-fill.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-12-auto-fill.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-12-auto-fill.tsx'),

  },
  {
    name: '12-extra',
    isTs: true,
    isTest: false,
    title: locate(
      '额外内容 \n 可以在标签页的右侧添加额外内容',
      'Extra Content \n Can add extra content on the right side of the tab'
    ),
    component: require('doc/pages/components/Tabs/example-12-extra.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-12-extra.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-12-extra.tsx'),

  },
  {
    name: '12-link',
    isTs: true,
    isTest: false,
    title: locate(
      '链接 \n 使用链接作为标签',
      'Link \n Use link as every tab.'
    ),
    component: require('doc/pages/components/Tabs/example-12-link.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-12-link.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-12-link.tsx'),

  },
  {
    name: '13-sticky',
    isTs: true,
    isTest: false,
    title: locate(
      '头部附着 \n sticky 属性会开启头部附着功能；sticky=true时，开启附着在顶部；sticky=number时，代表附着顶部，且距离顶部的间距；sticky=StickyProps时，参数将传入 Sticky 组件内；switchToTop 属性支持是否自动滚动到Tabs。',
      'Sticky header \n sticky header in Tabs'
    ),
    component: require('doc/pages/components/Tabs/example-13-sticky.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-13-sticky.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Tabs/example-13-sticky.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Tabs","properties":[{"name":"active","tag":{"cn":"当前选中标签页（受控）","en":"Current active tab id or index","default":"0","version":""},"required":false,"type":"string | number"},{"name":"align","tag":{"cn":"设置标签对齐方式","en":"set the label align","default":"","version":""},"required":false,"type":"\\\"bottom\\\" | \\\"left\\\" | \\\"right\\\" | \\\"vertical-left\\\" | \\\"vertical-right\\\" "},{"name":"background","tag":{"cn":"选中标签背景色","en":"Active background color","default":"","version":""},"required":false,"type":"string "},{"name":"border","tag":{"cn":"边框颜色","en":"Border color","default":"","version":""},"required":false,"type":"string "},{"name":"children","tag":{"cn":"必须为 Panel 元素","en":"must be Panel","default":"","version":""},"required":false,"type":"any"},{"name":"collapsible","tag":{"cn":"是否可折叠","en":"Whether can be collapsed","default":"false","version":""},"required":false,"type":"boolean "},{"name":"color","tag":{"cn":"标签页文字颜色，仅当 shape 为 \\\"card\\\" 时生效","en":"the color of tab\\\"s text only when the shape is \\\"card\\\"","default":"","version":""},"required":false,"type":"string "},{"name":"defaultActive","tag":{"cn":"默认选中标签页（非受控）","en":"Default active tab id or index","default":"0","version":""},"required":false,"type":"string | number"},{"name":"defaultCollapsed","tag":{"cn":"默认折叠状态,当 collapsible 设置为 true 时生效","en":"default collapse state, effective when collapsible is set to true","default":"","version":""},"required":false,"type":"boolean "},{"name":"inactiveBackground","tag":{"cn":"未选中标签背景色","en":"Inactive background color","default":"","version":""},"required":false,"type":"string "},{"name":"shape","tag":{"cn":"shape 不为空时，background 等颜色参数将会无效","en":"If shape is not null, the style properties such as background, border will lose effect","default":"\\\"card\\\"","version":""},"required":false,"type":"\\\"button\\\" | \\\"line\\\" | \\\"bordered\\\" | \\\"card\\\" | \\\"dash\\\" "},{"name":"tabBarExtraContent","tag":{"cn":"tab bar 上额外的元素","en":"extra element in tab bar","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"tabBarStyle","tag":{"cn":"tab bar 的样式对象","en":"style in tab bar","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"lazy","tag":{"cn":"是否开启懒加载","en":"lazy load","default":"true","version":""},"required":false,"type":"boolean "},{"name":"autoFill","tag":{"cn":"自动填充内容区域","en":"auto fill the panel","default":"false","version":""},"required":false,"type":"boolean "},{"name":"sticky","tag":{"cn":"开启头部附着","en":"sticky header","default":"false","version":""},"required":false,"type":"number | boolean | StickyProps "},{"name":"switchToTop","tag":{"cn":"切换 tab 将自动滚动到 Tabs","en":"switch tabs will scroll to Tabs","default":"","version":""},"required":false,"type":"boolean "},{"name":"hideSplit","tag":{"cn":"是否隐藏分割线","en":"whether to hide the dividing line","default":"false","version":""},"required":false,"type":"boolean "},{"name":"onChange","tag":{"cn":"标签选中时触发回调事件","en":"Change callback","default":"","version":""},"required":false,"type":"((key: Key) => void) "},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "}],"cn":"","en":""},{"title":"Tabs.Panel","properties":[{"name":"id","tag":{"cn":"选填，默认为 index","en":"The default is index","default":"","version":""},"required":false,"type":"string | number "},{"name":"background","tag":{"cn":"背景色，会覆盖 Tabs 的background","en":"Background color, override the Tab\\\"s background","default":"","version":""},"required":false,"type":"string "},{"name":"color","tag":{"cn":"同 style.color","en":"same as style.color","default":"","version":""},"required":false,"type":"string "},{"name":"children","tag":{"cn":"Panel 内容","en":"Panel Content","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"tab","tag":{"cn":"标签标题内容","en":"Tab content","default":"","version":""},"required":true,"type":"ReactNode"},{"name":"border","tag":{"cn":"边框颜色，会覆盖 Tabs 的border","en":"Border color, override the Tab\\\"s border","default":"","version":""},"required":false,"type":"string "},{"name":"disabled","tag":{"cn":"是否禁用","en":"Specifies the Panel should be disabled","default":"false","version":""},"required":false,"type":"boolean "},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
