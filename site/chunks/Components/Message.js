/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Message/cn.md'
import en from 'doc/pages/components/Message/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n Message 封装了一组全局函数，方便在任意地方调用，包括常规（不带/带icon）、Success、Warn、Error和关闭所有消息提醒。',
      'Base \n Message has 6 static functions that are convenient to call anywhere, includes normal(with/without icon)、success、warn、error and close all messages'
    ),
    component: require('doc/pages/components/Message/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Message/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Message/example-1-base.tsx'),

  },
  {
    name: '2-duration',
    isTs: true,
    isTest: false,
    title: locate(
      '显示时长 \n 通过 duration 属性可以控制消息显示的时长，默认为3秒；当设定为 0s 时，则需要用户手动关闭 Message',
      'Duration \n Set duration property to control the duration of the message display. The default value is 3 seconds. \n When duration is set to 0, the message will not hide automatically.'
    ),
    component: require('doc/pages/components/Message/example-2-duration.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Message/example-2-duration.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Message/example-2-duration.tsx'),

  },
  {
    name: '3-position',
    isTs: true,
    isTest: false,
    title: locate(
      '弹出位置 \n 设置 positoin 参数，修改显示位置，可以实现消息提醒展示位置，可选值：top, middle, top-left, top-right, bottom-left, bottom-right。',
      'Notification \n Set position property to specify the pop-up layer location, optional value: top, middle, top-left, top-right, bottom-left, bottom-right.'
    ),
    component: require('doc/pages/components/Message/example-3-position.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Message/example-3-position.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Message/example-3-position.tsx'),

  },
  {
    name: '4-close',
    isTs: true,
    isTest: false,
    title: locate(
      '关闭回调 \n 通过第三个参数[options]的 onClose 属性处理消息关闭回调。以下用例将在 Message 关闭后弹出新的 Message。',
      'Close \n Set onClose to handle close event.'
    ),
    component: require('doc/pages/components/Message/example-4-close.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Message/example-4-close.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Message/example-4-close.tsx'),

  },
  {
    name: '5-manual-close',
    isTs: true,
    isTest: false,
    title: locate(
      '手动关闭 \n Message 会异步返回一个关闭函数，调用它来关闭当前 Messsage',
      'Close \n Message return close func async'
    ),
    component: require('doc/pages/components/Message/example-5-manual-close.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Message/example-5-manual-close.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Message/example-5-manual-close.tsx'),

  },
  {
    name: '6-container',
    isTs: true,
    isTest: false,
    title: locate(
      '指定容器 \n 使用 container 来指定 Message 渲染的目标节点',
      'Target \n Set container to render target node'
    ),
    component: require('doc/pages/components/Message/example-6-container.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Message/example-6-container.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Message/example-6-container.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Message","properties":[{"name":"content","tag":{"cn":"消息内容","en":"The message content","default":"","version":""},"type":"ReactNode"},{"name":"duration","tag":{"cn":"消息持续时间，单位秒；如果设置为 0，必须手动关闭","en":"Message duration, unit: s; If it is set to 0, it must be manually closed.","default":"3","version":""},"type":"number"}],"cn":"Message 提供了一组方法供全局调用\\nMessage.show(content, [duration], [options]) // 不带有icon，纯 Message 展示\\nMessage.info(content, [duration], [options]) // 带有基础样式和icon\\nMessage.success(content, [duration], [options])\\nMessage.warn(content, [duration], [options])\\nMessage.error(content, [duration], [options])\\nMessage.close() // 关闭所有消息\\nMessage.setOptions() // 设置默认选项，优先级低于实际调用时的选项","en":"Message provides a set of methods for global calls\\nMessage.show(content, [duration], [options]) // No icon, pure message display\\nMessage.info(content, [duration], [options]) // With basic style and icon\\nMessage.success(content, [duration], [options])\\nMessage.warn(content, [duration], [options])\\nMessage.error(content, [duration], [options])\\nMessage.close() // Close all messages\\nMessage.setOptions() // set global options, priority is lower than the actual call option"},{"title":"MessageOptions","properties":[{"name":"className","tag":{"cn":"类名","en":"extend className","default":"","version":""},"type":"string"},{"name":"onClose","tag":{"cn":"关闭后回调事件","en":"The callback function when the message is closed.","default":"","version":""},"type":"() => void"},{"name":"position","tag":{"cn":"消息显示的位置","en":"The position where the message display","default":"","version":""},"type":"\\\"top-left\\\" | \\\"top\\\" | \\\"top-right\\\" | \\\"bottom-left\\\" | \\\"bottom-right\\\" | \\\"middle\\\""},{"name":"title","tag":{"cn":"标题文字","en":"title","default":"","version":""},"type":"string"},{"name":"hideClose","tag":{"cn":"是否隐藏关闭按钮","en":"show close button","default":"","version":""},"type":"boolean"},{"name":"top","tag":{"cn":"距离顶部的距离","en":"Distance from the top","default":"","version":""},"type":"string"},{"name":"container","tag":{"cn":"渲染的目标节点","en":"target element","default":"document.body","version":""},"type":"HTMLElement | (() => HTMLElement)"}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
