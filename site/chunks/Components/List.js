/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/List/cn.md'
import en from 'doc/pages/components/List/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    title: locate(
      '基本用法 \n 基础的List用法。',
      'Base \n Basic List usage.'
    ),
    component: require('doc/pages/components/List/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-01-base.js'),
  },
  {
    name: '02-checkbox',
    title: locate(
      '选择行 \n 设置 onChange 属性，会自动添加选择行',
      'Select \n Set the onChange property will automatically add a row with checkbox.'
    ),
    component: require('doc/pages/components/List/example-02-checkbox.js').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-02-checkbox.js'),
  },
  {
    name: '03-footer',
    title: locate(
      '加载更多 \n 通过 footer 属性，可实现加载更多功能',
      'Load more \n Through the footer attribute, you can load more functions.'
    ),
    component: require('doc/pages/components/List/example-03-footer.js').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-03-footer.js'),
  },
  {
    name: '04-scroll-load',
    title: locate(
      '滚动加载 \n 设置 scrollLoading 属性，当滚动到底部时，会自动调用改属性',
      'scroll loading \n Set the scrollLoad property, when the scroll to the bottom, it will automatically call to change the property.'
    ),
    component: require('doc/pages/components/List/example-04-scroll-load.js').default,
    rawText: require('!raw-loader!doc/pages/components/List/example-04-scroll-load.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
