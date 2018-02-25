/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
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
    title: locate('chasing-dots', 'chasing-dots'),
    component: require('doc/pages/components/Spin/example-chasing-dots.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-chasing-dots.js'),
  },
  {
    title: locate('cube-grid', 'cube-grid'),
    component: require('doc/pages/components/Spin/example-cube-grid.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-cube-grid.js'),
  },
  {
    title: locate('default', 'default'),
    component: require('doc/pages/components/Spin/example-default.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-default.js'),
  },
  {
    title: locate('double-bounce', 'double-bounce'),
    component: require('doc/pages/components/Spin/example-double-bounce.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-double-bounce.js'),
  },
  {
    title: locate('fading-circle', 'fading-circle'),
    component: require('doc/pages/components/Spin/example-fading-circle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-fading-circle.js'),
  },
  {
    title: locate('four-dots', 'four-dots'),
    component: require('doc/pages/components/Spin/example-four-dots.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-four-dots.js'),
  },
  {
    title: locate('plane', 'plane'),
    component: require('doc/pages/components/Spin/example-plane.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-plane.js'),
  },
  {
    title: locate('pulse', 'pulse'),
    component: require('doc/pages/components/Spin/example-pulse.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-pulse.js'),
  },
  {
    title: locate('ring', 'ring'),
    component: require('doc/pages/components/Spin/example-ring.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-ring.js'),
  },
  {
    title: locate('scale-circle', 'scale-circle'),
    component: require('doc/pages/components/Spin/example-scale-circle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-scale-circle.js'),
  },
  {
    title: locate('three-bounce', 'three-bounce'),
    component: require('doc/pages/components/Spin/example-three-bounce.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-three-bounce.js'),
  },
  {
    title: locate('wave', 'wave'),
    component: require('doc/pages/components/Spin/example-wave.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-wave.js'),
  },
]

export default navable(props => <MarkDown {...props} source={source} examples={examples} />)
