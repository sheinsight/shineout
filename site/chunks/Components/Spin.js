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
    name: '01-01-default.tsx',
    isTs: true,
    title: locate(
      'default \n name="default"',
      'default \n name="default"'
    ),
    component: require('doc/pages/components/Spin/example-01-01-default.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-01-01-default.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Spin/example-01-01-default.tsx'),

  },
  {
    name: '01-02-tip.tsx',
    isTs: true,
    title: locate(
      'tip \n 自定义提示文案',
      'tip \n custom tip'
    ),
    component: require('doc/pages/components/Spin/example-01-02-tip.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-01-02-tip.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Spin/example-01-02-tip.tsx'),

  },
  {
    name: '01-wrapper.tsx',
    isTs: true,
    title: locate(
      '包裹容器 \n 直接把内容内嵌到 Spin 中，将现有容器变为加载状态。',
      'Container \n children in Spin'
    ),
    component: require('doc/pages/components/Spin/example-01-wrapper.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-01-wrapper.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Spin/example-01-wrapper.tsx'),

  },
  {
    name: '02-chasing-dots.tsx',
    isTs: true,
    title: locate(
      'chasing-dots \n name="chasing-dots"',
      'chasing-dots \n name="chasing-dots"'
    ),
    component: require('doc/pages/components/Spin/example-02-chasing-dots.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-02-chasing-dots.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Spin/example-02-chasing-dots.tsx'),

  },
  {
    name: '03-cube-grid.tsx',
    isTs: true,
    title: locate(
      'cube-grid \n name="cube-grid"',
      'cube-grid \n name="cube-grid"'
    ),
    component: require('doc/pages/components/Spin/example-03-cube-grid.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-03-cube-grid.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Spin/example-03-cube-grid.tsx'),

  },
  {
    name: '04-double-bounce.tsx',
    isTs: true,
    title: locate(
      'double-bounce \n name="double-bounce"',
      'double-bounce \n name="double-bounce"'
    ),
    component: require('doc/pages/components/Spin/example-04-double-bounce.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-04-double-bounce.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Spin/example-04-double-bounce.tsx'),

  },
  {
    name: '05-fading-circle.tsx',
    isTs: true,
    title: locate(
      'fading-circle \n name="fading-circle"',
      'fading-circle \n name="fading-circle"'
    ),
    component: require('doc/pages/components/Spin/example-05-fading-circle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-05-fading-circle.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Spin/example-05-fading-circle.tsx'),

  },
  {
    name: '06-four-dots.tsx',
    isTs: true,
    title: locate(
      'four-dots \n name="four-dots"',
      'four-dots \n name="four-dots"'
    ),
    component: require('doc/pages/components/Spin/example-06-four-dots.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-06-four-dots.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Spin/example-06-four-dots.tsx'),

  },
  {
    name: '07-plane.tsx',
    isTs: true,
    title: locate(
      'plane \n name="plane"',
      'plane \n name="plane"'
    ),
    component: require('doc/pages/components/Spin/example-07-plane.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-07-plane.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Spin/example-07-plane.tsx'),

  },
  {
    name: '08-pulse.tsx',
    isTs: true,
    title: locate(
      'pulse \n name="pulse"',
      'pulse \n name="pulse"'
    ),
    component: require('doc/pages/components/Spin/example-08-pulse.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-08-pulse.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Spin/example-08-pulse.tsx'),

  },
  {
    name: '09-ring.tsx',
    isTs: true,
    title: locate(
      'ring \n name="ring"',
      'ring \n name="ring"'
    ),
    component: require('doc/pages/components/Spin/example-09-ring.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-09-ring.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Spin/example-09-ring.tsx'),

  },
  {
    name: '10-scale-circle.tsx',
    isTs: true,
    title: locate(
      'scale-circle \n name="scale-circle"',
      'scale-circle \n name="scale-circle"'
    ),
    component: require('doc/pages/components/Spin/example-10-scale-circle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-10-scale-circle.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Spin/example-10-scale-circle.tsx'),

  },
  {
    name: '11-three-bounce.tsx',
    isTs: true,
    title: locate(
      'three-bounce \n name="three-bounce"',
      'three-bounce \n name="three-bounce"'
    ),
    component: require('doc/pages/components/Spin/example-11-three-bounce.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-11-three-bounce.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Spin/example-11-three-bounce.tsx'),

  },
  {
    name: '12-wave.tsx',
    isTs: true,
    title: locate(
      'wave \n name="wave"',
      'wave \n name="wave"'
    ),
    component: require('doc/pages/components/Spin/example-12-wave.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-12-wave.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Spin/example-12-wave.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
