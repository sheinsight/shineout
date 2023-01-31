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
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n children 只能为一个 ReactElement并且不可以使用 Fragment \n 内置了四个弹出方向',
      'Base \n children can only be a ReactElement and cannot be a Fragment \n There are four pop-up directions built in.'
    ),
    component: require('doc/pages/components/Tooltip/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tooltip/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Tooltip/example-1-base.tsx'),

  },
  {
    name: '2-click',
    isTs: true,
    isTest: false,
    title: locate(
      '点击触发 \n 默认触发事件为 hover，如果需要点击触发，可以设置 trigger 为 click',
      'Click \n Set the trigger property to change the trigger event to \'click\'.'
    ),
    component: require('doc/pages/components/Tooltip/example-2-click.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tooltip/example-2-click.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Tooltip/example-2-click.tsx'),

  },
  {
    name: '3-disabled-inner',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用元素 \n 设置 disabledChild 来使内部禁用的元素正常工作',
      'Disabled \n Set disabledChild make disabled child work'
    ),
    component: require('doc/pages/components/Tooltip/example-3-disabled-inner.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tooltip/example-3-disabled-inner.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Tooltip/example-3-disabled-inner.tsx'),

  },
  {
    name: 'test-001-scroll',
    isTs: true,
    isTest: true,
    title: locate(
      '在 Scroll 中滚动会自动Tooltip更新位置 \n Scroll 中滚动',
      '在 Scroll 中滚动会自动Tooltip更新位置 \n Scroll 中滚动'
    ),
    component: require('doc/pages/components/Tooltip/test-001-scroll.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Tooltip/test-001-scroll.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Tooltip/test-001-scroll.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
