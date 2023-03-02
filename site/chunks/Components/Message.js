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
]

const codes = undefined

const api = '[]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
