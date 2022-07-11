/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Card/cn.md'
import en from 'doc/pages/components/Card/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base.tsx',
    isTs: true,
    title: locate(
      '基本用法 \n Card 内部由 Header, Body, Footer 三个自组件组成，可以组合或单独使用',
      'Base \n The card is composed of three components: Header, Body, and Footer. It can be combined or used separately.'
    ),
    component: require('doc/pages/components/Card/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Card/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Card/example-1-base.tsx'),

  },
  {
    name: '2-boxshadow.tsx',
    isTs: true,
    title: locate(
      '阴影 \n 可以通过 shadow 属性控制阴影',
      'BoxShadow \n Set the shadow property to determined how to display the shadow.'
    ),
    component: require('doc/pages/components/Card/example-2-boxshadow.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Card/example-2-boxshadow.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Card/example-2-boxshadow.tsx'),

  },
  {
    name: '3-form.tsx',
    isTs: true,
    title: locate(
      '表单 \n Card.Submit 可以用来触发 Card 内部表单提交',
      'Form \n Use Card.submit to trigger the submimt event of the form in the card.'
    ),
    component: require('doc/pages/components/Card/example-3-form.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Card/example-3-form.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Card/example-3-form.tsx'),

  },
  {
    name: '4-collapse.tsx',
    isTs: true,
    title: locate(
      '折叠 \n 设置 collapsible 可以折叠 Card，通过 collapsed 或 defaultCollapsed 属性控制状态',
      'Collapse \n Set collapsible can collapse the Card panel.'
    ),
    component: require('doc/pages/components/Card/example-4-collapse.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Card/example-4-collapse.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Card/example-4-collapse.tsx'),

  },
  {
    name: '5-accordion.tsx',
    isTs: true,
    title: locate(
      '手风琴 \n 使用 Card.Accordion 可以使一组 Card 实现手风琴效果（每次打开一个 Card）',
      'Accordion \n Put a group of Card in the Card.Accordion, only one panel can be expanded at the same time.'
    ),
    component: require('doc/pages/components/Card/example-5-accordion.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Card/example-5-accordion.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Card/example-5-accordion.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
