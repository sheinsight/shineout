/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Tooltip/cn.md'
import en from 'doc/pages/components/Tooltip/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法 \n 内置了四个弹出方向', 'Base \n There are four pop-up directions built in.'),
    component: require('doc/pages/components/Tooltip/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tooltip/example-1-base.js'),
  },
  {
    name: '2-click',
    title: locate('点击触发 \n 默认触发事件为 hover，如果需要点击触发，可以设置 trigger 为 click', 'Click \n Set the trigger property to change the trigger event to \'click\'.'),
    component: require('doc/pages/components/Tooltip/example-2-click.js').default,
    rawText: require('!raw-loader!doc/pages/components/Tooltip/example-2-click.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
