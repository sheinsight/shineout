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
    title: locate('基本用法 \n Message 封装了一组全局函数，方便在任意地方调用', 'Base \n Message has 6 static functions that are convenient to call anywhere。'),
    component: require('doc/pages/components/Message/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Message/example-1-base.js'),
  },
  {
    name: '2-duration',
    title: locate('显示时长 \n 通过 duration 属性可以控制消息显示的时长，默认为3秒，设为 0 时，需要用户手动关闭', 'Duration \n Set duration property to control the duration of the message display. The default value is 3 seconds. \n When duration is set to 0, the message will not hide automatically.'),
    component: require('doc/pages/components/Message/example-2-duration.js').default,
    rawText: require('!raw-loader!doc/pages/components/Message/example-2-duration.js'),
  },
  {
    name: '3-position',
    title: locate('显示位置 \n 默认情况下，消息显示在页面顶部，通过 position 可以修改为页面中间', 'Position \n By default, the message is displayed at the top of the page, set position to \'middle\' to display the message at the middle of the page.'),
    component: require('doc/pages/components/Message/example-3-position.js').default,
    rawText: require('!raw-loader!doc/pages/components/Message/example-3-position.js'),
  },
  {
    name: '4-close',
    title: locate('关闭回调 \n onClose 属性处理消息关闭事件', 'Close \n Set onClose to handle close event.'),
    component: require('doc/pages/components/Message/example-4-close.js').default,
    rawText: require('!raw-loader!doc/pages/components/Message/example-4-close.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
