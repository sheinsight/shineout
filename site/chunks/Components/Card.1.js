/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Card.1/cn.md'
import en from 'doc/pages/components/Card.1/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Card.1/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Card.1/example-1-base.js'),
  },
  {
    name: '2-boxshadow',
    title: locate('阴影 \n 可以通过 shadow 属性控制阴影', 'BoxShadow'),
    component: require('doc/pages/components/Card.1/example-2-boxshadow.js').default,
    rawText: require('!raw-loader!doc/pages/components/Card.1/example-2-boxshadow.js'),
  },
  {
    name: '3-form',
    title: locate('表单 \n Card.Submit 可以用来触发 Card 内部表单提交', 'Form'),
    component: require('doc/pages/components/Card.1/example-3-form.js').default,
    rawText: require('!raw-loader!doc/pages/components/Card.1/example-3-form.js'),
  },
  {
    name: '4-collapse',
    title: locate('折叠', 'Collapse'),
    component: require('doc/pages/components/Card.1/example-4-collapse.js').default,
    rawText: require('!raw-loader!doc/pages/components/Card.1/example-4-collapse.js'),
  },
  {
    name: '5-accordion',
    title: locate('手风琴 \n 使用 Card.Accordion 可以使一组 Card 实现手风琴效果（每次打开一个 Card）', 'Accordion'),
    component: require('doc/pages/components/Card.1/example-5-accordion.js').default,
    rawText: require('!raw-loader!doc/pages/components/Card.1/example-5-accordion.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
