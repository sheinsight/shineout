/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Card/cn.md'
import en from 'doc/pages/components/Card/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n Card 内部由 Header, Body, Footer 三个自组件组成，可以组合或单独使用',
      'Base \n The card is composed of three components: Header, Body, and Footer. It can be combined or used separately.'
    ),
    component: require('doc/pages/components/Card/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Card/example-1-base.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Card/example-1-base.tsx'),

  },
  {
    name: '2-boxshadow',
    isTs: true,
    isTest: false,
    title: locate(
      '阴影 \n 可以通过 shadow 属性控制阴影',
      'BoxShadow \n Set the shadow property to determined how to display the shadow.'
    ),
    component: require('doc/pages/components/Card/example-2-boxshadow.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Card/example-2-boxshadow.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Card/example-2-boxshadow.tsx'),

  },
  {
    name: '3-form',
    isTs: true,
    isTest: false,
    title: locate(
      '表单 \n Card.Submit 可以用来触发 Card 内部表单提交',
      'Form \n Use Card.submit to trigger the submimt event of the form in the card.'
    ),
    component: require('doc/pages/components/Card/example-3-form.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Card/example-3-form.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Card/example-3-form.tsx'),

  },
  {
    name: '4-collapse',
    isTs: true,
    isTest: false,
    title: locate(
      '折叠 \n 设置 collapsible 可以折叠 Card，通过 collapsed 或 defaultCollapsed 属性控制状态',
      'Collapse \n Set collapsible can collapse the Card panel.'
    ),
    component: require('doc/pages/components/Card/example-4-collapse.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Card/example-4-collapse.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Card/example-4-collapse.tsx'),

  },
  {
    name: '5-accordion',
    isTs: true,
    isTest: false,
    title: locate(
      '手风琴 \n 使用 Card.Accordion 可以使一组 Card 实现手风琴效果（每次打开一个 Card）',
      'Accordion \n Put a group of Card in the Card.Accordion, only one panel can be expanded at the same time.'
    ),
    component: require('doc/pages/components/Card/example-5-accordion.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Card/example-5-accordion.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Card/example-5-accordion.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Card","properties":[{"name":"collapsible","tag":{"cn":"是否可折叠，\\\"bottom\\\" 表示从下方点击折叠","en":"Whether can be collapsed，\\\"bottom\\\" can collaps on bottom","default":"false","version":""},"required":false,"type":"boolean | \\\"bottom\\\" "},{"name":"collapsed","tag":{"cn":"是否折叠，用于受控状态","en":"Whether to be collapsed.","default":"","version":""},"required":false,"type":"boolean "},{"name":"defaultCollapsed","tag":{"cn":"初始折叠状态（仅在 collapsible 为 true 时有效）","en":"Initial collapsed state","default":"true","version":""},"required":false,"type":"boolean "},{"name":"onCollapse","tag":{"cn":"折叠状态改变时回调事件","en":"Callback when collapsed state changed","default":"","version":""},"required":false,"type":"((collapsed: boolean) => void) "},{"name":"shadow","tag":{"cn":"是否显示阴影\\n \\\"hover\\\" - 鼠标移到元素上显示;\\n true - 总是显示;\\n false - 从不显示","en":"Whether to show the shadow.\\\"hover\\\" - Display it when the mouse is over the element.true - Always show, false - Never show","default":"false","version":""},"required":false,"type":"Boolean | \\\"hover\\\" "},{"name":"id","tag":{"cn":"手风琴下控制展开的值","en":"Card.Accordion expand controlled key","default":"","version":""},"required":false,"type":"any"},{"name":"children","tag":{"cn":"子元素","en":"children","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"forwardedRef","tag":{"cn":"获取 Card dom","en":"get Card dom","default":"","version":""},"required":false,"type":"((el: HTMLDivElement) => void) "},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"resizable","tag":{"cn":"是否可以拖动大小","en":"Is it possible to drag the size","default":"false","version":""},"required":false,"type":"boolean | \\\"x\\\" | \\\"y\\\" | \\\"xy\\\" "},{"name":"moveable","tag":{"cn":"是否可以拖拽移动","en":"Is it possible to drag and drop to move","default":"false","version":""},"required":false,"type":"boolean "}],"cn":"","en":""},{"title":"Card.Header","properties":[{"name":"align","tag":{"cn":"对齐方式","en":"align","default":"","version":""},"required":false,"type":"\\\"left\\\" | \\\"center\\\" | \\\"right\\\""},{"name":"children","tag":{"cn":"子元素","en":"children","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "}],"cn":"","en":""},{"title":"Card.Body","properties":[{"name":"children","tag":{"cn":"子元素","en":"children","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "}],"cn":"","en":""},{"title":"Card.Footer","properties":[{"name":"align","tag":{"cn":"对齐方式","en":"align","default":"","version":""},"required":false,"type":"\\\"left\\\" | \\\"center\\\" | \\\"right\\\""},{"name":"children","tag":{"cn":"children","en":"子元素","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "}],"cn":"","en":""},{"title":"Card.Accordion","properties":[{"name":"active","tag":{"cn":"打开的值，全关闭时为 null，用于受控状态。默认为索引，若 Card 设置 id 后则为 id。","en":"Active value. It is -1 when fully closed. Used in controlled state. be id while Card.id setted","default":"","version":""},"required":false,"type":"any"},{"name":"defaultActive","tag":{"cn":"默认打开的值，用于非受控状态。默认为索引，若 Card 设置 id 后则为 id。","en":"The default active value for uncontrolled state, be id while Card.id setted","default":"0","version":""},"required":false,"type":"any"},{"name":"onChange","tag":{"cn":"面板打开回调","en":"The callback function when the panel is opened","default":"","version":""},"required":false,"type":"(active: any) => void"},{"name":"children","tag":{"cn":"子元素","en":"children","default":"","version":""},"required":false,"type":"ReactNode"}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
