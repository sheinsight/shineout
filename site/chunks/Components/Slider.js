/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Slider/cn.md'
import en from 'doc/pages/components/Slider/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Slider/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-01-base.js'),
  },
  {
    name: '02-range',
    title: locate('范围选择', 'Range'),
    component: require('doc/pages/components/Slider/example-02-range.js').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-02-range.js'),
  },
  {
    name: '03-scale',
    title: locate('自定义区间', 'Scale'),
    component: require('doc/pages/components/Slider/example-03-scale.js').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-03-scale.js'),
  },
  {
    name: '04-step',
    title: locate('自定义步长', 'Step'),
    component: require('doc/pages/components/Slider/example-04-step.js').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-04-step.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
