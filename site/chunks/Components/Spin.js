/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Spin/cn.md'
import en from 'doc/pages/components/Spin/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-01-default',
    isTs: false,
    isTest: false,
    title: locate(
      'default \n name="default"',
      'default \n name="default"'
    ),
    component: require('doc/pages/components/Spin/example-01-01-default.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-01-01-default.js'),

  },
  {
    name: '01-02-tip',
    isTs: false,
    isTest: false,
    title: locate(
      'tip \n 自定义提示文案',
      'tip \n custom tip'
    ),
    component: require('doc/pages/components/Spin/example-01-02-tip.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-01-02-tip.js'),

  },
  {
    name: '01-wrapper',
    isTs: false,
    isTest: false,
    title: locate(
      '包裹容器 \n 直接把内容内嵌到 Spin 中，将现有容器变为加载状态。',
      'Container \n children in Spin'
    ),
    component: require('doc/pages/components/Spin/example-01-wrapper.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-01-wrapper.js'),

  },
  {
    name: '02-chasing-dots',
    isTs: false,
    isTest: false,
    title: locate(
      'chasing-dots \n name="chasing-dots"',
      'chasing-dots \n name="chasing-dots"'
    ),
    component: require('doc/pages/components/Spin/example-02-chasing-dots.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-02-chasing-dots.js'),

  },
  {
    name: '03-cube-grid',
    isTs: false,
    isTest: false,
    title: locate(
      'cube-grid \n name="cube-grid"',
      'cube-grid \n name="cube-grid"'
    ),
    component: require('doc/pages/components/Spin/example-03-cube-grid.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-03-cube-grid.js'),

  },
  {
    name: '04-double-bounce',
    isTs: false,
    isTest: false,
    title: locate(
      'double-bounce \n name="double-bounce"',
      'double-bounce \n name="double-bounce"'
    ),
    component: require('doc/pages/components/Spin/example-04-double-bounce.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-04-double-bounce.js'),

  },
  {
    name: '05-fading-circle',
    isTs: false,
    isTest: false,
    title: locate(
      'fading-circle \n name="fading-circle"',
      'fading-circle \n name="fading-circle"'
    ),
    component: require('doc/pages/components/Spin/example-05-fading-circle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-05-fading-circle.js'),

  },
  {
    name: '06-four-dots',
    isTs: false,
    isTest: false,
    title: locate(
      'four-dots \n name="four-dots"',
      'four-dots \n name="four-dots"'
    ),
    component: require('doc/pages/components/Spin/example-06-four-dots.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-06-four-dots.js'),

  },
  {
    name: '07-plane',
    isTs: false,
    isTest: false,
    title: locate(
      'plane \n name="plane"',
      'plane \n name="plane"'
    ),
    component: require('doc/pages/components/Spin/example-07-plane.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-07-plane.js'),

  },
  {
    name: '08-pulse',
    isTs: false,
    isTest: false,
    title: locate(
      'pulse \n name="pulse"',
      'pulse \n name="pulse"'
    ),
    component: require('doc/pages/components/Spin/example-08-pulse.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-08-pulse.js'),

  },
  {
    name: '09-ring',
    isTs: false,
    isTest: false,
    title: locate(
      'ring \n name="ring"',
      'ring \n name="ring"'
    ),
    component: require('doc/pages/components/Spin/example-09-ring.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-09-ring.js'),

  },
  {
    name: '10-scale-circle',
    isTs: false,
    isTest: false,
    title: locate(
      'scale-circle \n name="scale-circle"',
      'scale-circle \n name="scale-circle"'
    ),
    component: require('doc/pages/components/Spin/example-10-scale-circle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-10-scale-circle.js'),

  },
  {
    name: '11-three-bounce',
    isTs: false,
    isTest: false,
    title: locate(
      'three-bounce \n name="three-bounce"',
      'three-bounce \n name="three-bounce"'
    ),
    component: require('doc/pages/components/Spin/example-11-three-bounce.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-11-three-bounce.js'),

  },
  {
    name: '12-wave',
    isTs: false,
    isTest: false,
    title: locate(
      'wave \n name="wave"',
      'wave \n name="wave"'
    ),
    component: require('doc/pages/components/Spin/example-12-wave.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-12-wave.js'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
