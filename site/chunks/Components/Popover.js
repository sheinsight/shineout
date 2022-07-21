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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-1-base.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-1-controll.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-10-container.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-11-disabled.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-12-content.tsx'),

  },
  {
    name: '13-nested',
    isTs: true,
    isTest: false,
    title: locate(
      '嵌套使用 \n 使用多个 Popover 进行嵌套展示',
      'Nested of Popovers \n Using more than one Popover by nested'
    ),
    component: require('doc/pages/components/Popover/example-13-nested.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-13-nested.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-13-nested.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-13-useTextStyle.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-2-delay.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-2-position.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-3-click.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-4-confirm.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-5-func.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-6-type.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-7-type.tsx'),

  },
  {
    name: '8-old',
    isTs: true,
    isTest: false,
    title: locate(
      '旧API \n 旧接口使用 Popover 包在组件外使用，通过 content 传递内容，已不推荐',
      'Old API \n Old API, is out of date.'
    ),
    component: require('doc/pages/components/Popover/example-8-old.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Popover/example-8-old.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-8-old.tsx'),

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
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Popover/example-9-event.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
