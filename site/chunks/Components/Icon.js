/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Icon/cn.md'
import en from 'doc/pages/components/Icon/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-awesome',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 引入一个在线地址（本示例为 font-awesome）创建一个新的 Icon 组件，在需要使用的地方引入。',
      'Base \n Create a new compoennt with url, then use it anywhere.'
    ),
    component: require('doc/pages/components/Icon/example-1-awesome.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Icon/example-1-awesome.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Icon/example-1-awesome.tsx'),

  },
  {
    name: '2-iconfont',
    isTs: true,
    isTest: false,
    title: locate(
      '使用 Iconfont \n 可以在 iconfont.cn 定制一个图标，在项目中引入，支持font和svg两种方式',
      'Customize Font \n You can customize an icon in <a target="_blank" href="http://iconfont.cn">iconfont.cn</a> or <a target="_blank" href="http://fontastic.me/">fontastic.me</a>, support font and svg.'
    ),
    component: require('doc/pages/components/Icon/example-2-iconfont.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Icon/example-2-iconfont.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Icon/example-2-iconfont.tsx'),

  },
  {
    name: '3-size',
    isTs: true,
    isTest: false,
    title: locate(
      '样式 \n 通过 fontSize 和 type 属性可以便捷的设置大小和颜色，更多样式可以通过 style 属性设置。',
      'Style \n Set fontSize and type to change icon size and color.'
    ),
    component: require('doc/pages/components/Icon/example-3-size.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Icon/example-3-size.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Icon/example-3-size.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
