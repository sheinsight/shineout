/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/CardGroup/cn.md'
import en from 'doc/pages/components/CardGroup/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base.tsx',
    isTs: true,
    title: locate(
      '基本用法 \n 基础的卡片组用法',
      'Base \n Basic CardGroup'
    ),
    component: require('doc/pages/components/CardGroup/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/CardGroup/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/CardGroup/example-1-base.tsx'),

  },
  {
    name: '2-width.tsx',
    isTs: true,
    title: locate(
      '限定宽度 \n 设置 cardWidth 限定卡片最小宽度',
      'Width \n set cardWidth limited min-width'
    ),
    component: require('doc/pages/components/CardGroup/example-2-width.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/CardGroup/example-2-width.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/CardGroup/example-2-width.tsx'),

  },
  {
    name: '3-lazyload.tsx',
    isTs: true,
    title: locate(
      '懒加载 \n 设置 Item 的 placeholder 后会开启懒加载 \n placeholder 必须要有一定的高度，否则懒加载无法有效果',
      'Lazyload \n enable lazyload while set placeholder on Item \n placehoder\'s height should beyond zero'
    ),
    component: require('doc/pages/components/CardGroup/example-3-lazyload.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/CardGroup/example-3-lazyload.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/CardGroup/example-3-lazyload.tsx'),

  },
  {
    name: '4-checkbox.tsx',
    isTs: true,
    title: locate(
      '多选 \n 使用 checked 使 Item 支持多选',
      'Checkbox \n set checked to support checkbox'
    ),
    component: require('doc/pages/components/CardGroup/example-4-checkbox.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/CardGroup/example-4-checkbox.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/CardGroup/example-4-checkbox.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
