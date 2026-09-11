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
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n Popover 放置在一个组件内部弹出',
      'Base \n The basic usage.'
    ),
    component: require('doc/pages/components/Popover/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-1-base.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Popover/example-1-base.tsx'),

  },
  {
    name: '1-controll',
    isTs: true,
    isTest: false,
    title: locate(
      '受控 \n 可以通过 visible 去控制',
      'controll \n Use cisible to controll the show/hidden'
    ),
    component: require('doc/pages/components/Popover/example-1-controll.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-1-controll.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Popover/example-1-controll.tsx'),

  },
  {
    name: '10-container',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义容器 \n 使用 getPopupContainer 指定渲染的目标容器',
      'Custom container \n use getPopupContainer return target container'
    ),
    component: require('doc/pages/components/Popover/example-10-container.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-10-container.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Popover/example-10-container.tsx'),

  },
  {
    name: '11-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用元素 \n 当父元素被禁用，可以将 Popver 和禁用元素置于同一层级，并用元素将他们包裹',
      'Disabled \n When the parent element is disabled, you can place the Popver and the disabled element in the same hierarchy and wrap them with the element'
    ),
    component: require('doc/pages/components/Popover/example-11-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-11-disabled.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Popover/example-11-disabled.tsx'),

  },
  {
    name: '12-content',
    isTs: true,
    isTest: false,
    title: locate(
      '默认样式 \n Popover.Content 添加 padding 和  maxLength 的默认样式',
      'default style \n Popover.Content adds default styles for padding and maxLength'
    ),
    component: require('doc/pages/components/Popover/example-12-content.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-12-content.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Popover/example-12-content.tsx'),

  },
  {
    name: '13-useTextStyle',
    isTs: true,
    isTest: false,
    title: locate(
      '内置文本样式 \n 当采用自定义函数渲染时，允许通过useTextStyle来使用采用内置的文本样式',
      'useTextStyle \n Render by the innerstyle of text when the children prop is render function'
    ),
    component: require('doc/pages/components/Popover/example-13-useTextStyle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-13-useTextStyle.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Popover/example-13-useTextStyle.tsx'),

  },
  {
    name: '2-delay',
    isTs: true,
    isTest: false,
    title: locate(
      '延迟 \n 可以设置展示延时和关闭延时',
      'delay \n the hidden/show delay'
    ),
    component: require('doc/pages/components/Popover/example-2-delay.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-2-delay.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Popover/example-2-delay.tsx'),

  },
  {
    name: '2-position',
    isTs: true,
    isTest: false,
    title: locate(
      '弹出位置 \n 内置了十二个弹出的位置',
      'Position \n Twelve pop-up positions are built in.'
    ),
    component: require('doc/pages/components/Popover/example-2-position.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-2-position.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Popover/example-2-position.tsx'),

  },
  {
    name: '3-click',
    isTs: true,
    isTest: false,
    title: locate(
      '点击触发 \n 默认是移入组件触发，设置 trigger 为 \'click\'，可以改为点击触发',
      'Trigger \n Set the trigger property to change the trigger event to \'click\'.'
    ),
    component: require('doc/pages/components/Popover/example-3-click.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-3-click.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Popover/example-3-click.tsx'),

  },
  {
    name: '4-confirm',
    isTs: true,
    isTest: false,
    title: locate(
      '确认 \n Popover.Confirm 提供弹出气泡式的确认框',
      'Confirm \n Popover.Confirm provide popover confirm.'
    ),
    component: require('doc/pages/components/Popover/example-4-confirm.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-4-confirm.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Popover/example-4-confirm.tsx'),

  },
  {
    name: '5-func',
    isTs: true,
    isTest: false,
    title: locate(
      '关闭事件 \n content 属性可以为一个函数，会传递 close 函数，用来在弹出面板内部处理关闭事件',
      'Close \n Set the content property to a function, you can handle the close event inside the popup panel.'
    ),
    component: require('doc/pages/components/Popover/example-5-func.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-5-func.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Popover/example-5-func.tsx'),

  },
  {
    name: '6-type',
    isTs: true,
    isTest: false,
    title: locate(
      '样式 \n 内置四种样式',
      'Type \n Four styles are built in.'
    ),
    component: require('doc/pages/components/Popover/example-6-type.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-6-type.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Popover/example-6-type.tsx'),

  },
  {
    name: '7-type',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 如果内置样式不满足需求，可以通过 background 和 border 自定义样式',
      ' \n Customize the style with background and border.'
    ),
    component: require('doc/pages/components/Popover/example-7-type.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-7-type.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Popover/example-7-type.tsx'),

  },
  {
    name: '9-event',
    isTs: true,
    isTest: false,
    title: locate(
      '事件 \n 提供了onOpen 和 onClose 事件',
      'Events \n provider onOpen and onClose event'
    ),
    component: require('doc/pages/components/Popover/example-9-event.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-9-event.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Popover/example-9-event.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"PopoverProps","properties":[{"name":"children","tag":{"cn":"弹出显示内容，如果内容为函数，则参数是主动关闭操作","en":"Pop-up content.","default":"","version":""},"required":true,"type":"ReactNode | ((close: (e?: MouseEvent ) => void) => ReactNode)"},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"border","tag":{"cn":"弹出层边框颜色（含箭头）","en":"The color of pop-up border(with arrows)","default":"\\\"#dee2e6\\\"","version":""},"required":false,"type":"string "},{"name":"zIndex","tag":{"cn":"Popover 层级","en":"z-index of popover","default":"1060","version":""},"required":false,"type":"number "},{"name":"showArrow","tag":{"cn":"是否显示箭头","en":"show arrow","default":"true","version":""},"required":false,"type":"boolean "},{"name":"position","tag":{"cn":"弹出层位置。若不设置，则默认为 auto","en":"The position of pop-up layer, default is \\\"auto\\\"","default":"","version":""},"required":false,"type":"| \\\"top-left\\\"  | \\\"top\\\"  | \\\"top-right\\\"  | \\\"left-top\\\"  | \\\"left\\\"  | \\\"left-bottom\\\"  | \\\"right-top\\\"  | \\\"right\\\"  | \\\"right-bottom\\\"  | \\\"bottom-left\\\"  | \\\"bottom\\\"  | \\\"bottom-right\\\"  | \\\"cover\\\" "},{"name":"background","tag":{"cn":"弹出层背景色（含箭头）","en":"Pop-up background-color(with arrows)","default":"\\\"#fff\\\"","version":""},"required":false,"type":"string "},{"name":"onClose","tag":{"cn":"Popover 关闭时回调事件","en":"Callback event when close.","default":"","version":""},"required":false,"type":"(() => void) "},{"name":"onOpen","tag":{"cn":"Popover 弹出回调事件","en":"Callback event when open.","default":"","version":""},"required":false,"type":"(() => void) "},{"name":"trigger","tag":{"cn":"触发方式","en":"type of show","default":"\\\"hover\\\"","version":""},"required":false,"type":"\\\"hover\\\" | \\\"click\\\" "},{"name":"type","tag":{"cn":"类型","en":"type of popover","default":"","version":""},"required":false,"type":"\\\"success\\\" | \\\"info\\\" | \\\"warning\\\" | \\\"danger\\\" "},{"name":"visible","tag":{"cn":"是否显示(受控)","en":"is visible (controlled)","default":"","version":""},"required":false,"type":"boolean "},{"name":"onVisibleChange","tag":{"cn":"显示隐藏改变时事件","en":"the event of visible change","default":"","version":""},"required":false,"type":"((visible: boolean) => void) "},{"name":"defaultVisible","tag":{"cn":"默认是否显示","en":"default visible","default":"","version":""},"required":false,"type":"boolean "},{"name":"mouseEnterDelay","tag":{"cn":"移入显示延迟(毫秒)","en":"the show delay of mouseenter(ms)","default":"0","version":""},"required":false,"type":"number "},{"name":"mouseLeaveDelay","tag":{"cn":"移除隐藏延迟(毫秒)","en":"the hidden delay of mouseleave (ms)","default":"0","version":""},"required":false,"type":"number "},{"name":"priorityDirection","tag":{"cn":"弹出位置优先级, 默认为左右优先, 只在未设置 position 时生效","en":"Popup location priority, default is left and right priority, only valid when position is not set","default":"\\\"vertical\\\"","version":""},"required":false,"type":"\\\"vertical\\\" | \\\"horizontal\\\" | \\\"auto\\\" "},{"name":"getPopupContainer","tag":{"cn":"自定义 Popover 容器，覆盖默认渲染在 body 下的行为, () => DOMElement","en":"Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement","default":"","version":""},"required":false,"type":"(() => HTMLElement | null) "},{"name":"scrollDismiss","tag":{"cn":"滚动来关闭气泡框，如果需要指定滚动元素，则通过函数返回","en":"scroll to dismiss, return el to order scroller","default":"false","version":""},"required":false,"type":"boolean | (() => HTMLElement | null) "},{"name":"clickToCancelDelay","tag":{"cn":"mouseEnterDelay 内点击元素后取消弹出","en":"Cancel the popup after clicking the element in mouseEnterDelay","default":"false","version":""},"required":false,"type":"boolean "},{"name":"useTextStyle","tag":{"cn":"使用内置文本样式","en":"using inner styles","default":"","version":""},"required":false,"type":"boolean "},{"name":"destroy","tag":{"cn":"关闭 Popover 后销毁内容 dom\\ndefault: false","en":"delete content dom when close","default":"","version":""},"required":false,"type":"boolean "}],"cn":"","en":""},{"title":"Popover.Confirm","properties":[{"name":"text","tag":{"cn":"按钮文字","en":"button text","default":"{ ok: \\\"Ok\\\", cancel: \\\"Cancel\\\" }","version":""},"required":false,"type":"{ ok?: string ; cancel?: string ; } "},{"name":"onOk","tag":{"cn":"点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip","en":"ok button click callback, will close tooltip while returned promise resolve","default":"","version":""},"required":false,"type":"(() => void | Promise<any>) "},{"name":"onCancel","tag":{"cn":"点击取消按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip","en":"cancel button click callback, will close tooltip while returned promise resolve","default":"","version":""},"required":false,"type":"(() => void | Promise<any>) "},{"name":"okType","tag":{"cn":"确认按钮的类型，与 [Button](/components/Button) 类型相同","en":"ok button\\\"s type, same with [Button](/components/Button) type","default":"\\\"danger\\\"","version":""},"required":false,"type":"\\\"default\\\" | \\\"primary\\\" | \\\"secondary\\\" | \\\"success\\\" | \\\"warning\\\" | \\\"danger\\\" | \\\"link\\\" "},{"name":"icon","tag":{"cn":"自定义Icon","en":"custom icon","default":"","version":""},"required":false,"type":"boolean | ReactElement "},{"name":"children","tag":{"cn":"弹出显示内容","en":"Pop-up content.","default":"","version":""},"required":true,"type":"ReactNode"},{"name":"type","tag":{"cn":"类型同 [Alert](/components/Alert) type 属性","en":"same with [Alert](/components/Alert) type","default":"\\\"confirmwarning\\\"","version":""},"required":false,"type":"\\\"success\\\" | \\\"info\\\" | \\\"warning\\\" | \\\"danger\\\" | \\\"error\\\" | \\\"confirmwarning\\\" "}],"cn":"属性和 Popover 基本一致，除了以下:","en":"Properties are basically the same as popovers, except for the following:"}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
