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
    title: locate('区间', 'Scale'),
    component: require('doc/pages/components/Slider/example-03-scale.js').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-03-scale.js'),
  },
  {
    name: '04-format',
    title: locate('格式化', 'format'),
    component: require('doc/pages/components/Slider/example-04-format.js').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-04-format.js'),
  },
  {
    name: '05-step',
    title: locate('步长', 'Step'),
    component: require('doc/pages/components/Slider/example-05-step.js').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-05-step.js'),
  },
  {
    name: '06-step',
    title: locate(' \n step 设定为 0 时，只能从 scale 内的值', 'Step'),
    component: require('doc/pages/components/Slider/example-06-step.js').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-06-step.js'),
  },
  {
    name: '07-hide',
    title: locate('隐藏 \n autoHide 选项为 true 时，自动隐藏当前值和刻度', 'autoHide'),
    component: require('doc/pages/components/Slider/example-07-hide.js').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-07-hide.js'),
  },
  {
    name: '08-hide',
    title: locate(' \n 如果要彻底不显示刻度和当前值，设置 formatValue 和 fotmatScale 为 false', 'autoHide'),
    component: require('doc/pages/components/Slider/example-08-hide.js').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-08-hide.js'),
  },
  {
    name: '09-vertical',
    title: locate('垂直', 'Vertical'),
    component: require('doc/pages/components/Slider/example-09-vertical.js').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-09-vertical.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
