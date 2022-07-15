/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Switch/cn.md'
import en from 'doc/pages/components/Switch/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base.tsx',
    isTs: true,
    title: locate(
      '基本用法 \n 基本的 Switch',
      'Base \n Base Switch.'
    ),
    component: require('doc/pages/components/Switch/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Switch/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Switch/example-1-base.tsx'),

  },
  {
    name: '2-disabled.tsx',
    isTs: true,
    title: locate(
      '禁用 \n 设置 disabled 为 true 禁用 switch',
      'Disabled \n disabled check while disabled true'
    ),
    component: require('doc/pages/components/Switch/example-2-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Switch/example-2-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Switch/example-2-disabled.tsx'),

  },
  {
    name: '3-content.tsx',
    isTs: true,
    title: locate(
      '内容 \n 为每个状态添加描述',
      'Base \n Description for every status.'
    ),
    component: require('doc/pages/components/Switch/example-3-content.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Switch/example-3-content.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Switch/example-3-content.tsx'),

  },
  {
    name: '4-size.tsx',
    isTs: true,
    title: locate(
      '大小 \n 通过 size 设置 Switch 大小',
      'Size \n size set'
    ),
    component: require('doc/pages/components/Switch/example-4-size.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Switch/example-4-size.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Switch/example-4-size.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
