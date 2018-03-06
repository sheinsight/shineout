/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import log from 'doc/utils/log'
import locate from 'doc/locate'

import cn from 'doc/pages/components/Spin/cn.md'
import en from 'doc/pages/components/Spin/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('default', 'default'),
    component: require('doc/pages/components/Spin/example-01-default.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-01-default.js'),
  },
  {
    title: locate('chasing-dots', 'chasing-dots'),
    component: require('doc/pages/components/Spin/example-02-chasing-dots.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-02-chasing-dots.js'),
  },
  {
    title: locate('cube-grid', 'cube-grid'),
    component: require('doc/pages/components/Spin/example-03-cube-grid.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-03-cube-grid.js'),
  },
  {
    title: locate('double-bounce', 'double-bounce'),
    component: require('doc/pages/components/Spin/example-04-double-bounce.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-04-double-bounce.js'),
  },
  {
    title: locate('fading-circle', 'fading-circle'),
    component: require('doc/pages/components/Spin/example-05-fading-circle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-05-fading-circle.js'),
  },
  {
    title: locate('four-dots', 'four-dots'),
    component: require('doc/pages/components/Spin/example-06-four-dots.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-06-four-dots.js'),
  },
  {
    title: locate('plane', 'plane'),
    component: require('doc/pages/components/Spin/example-07-plane.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-07-plane.js'),
  },
  {
    title: locate('pulse', 'pulse'),
    component: require('doc/pages/components/Spin/example-08-pulse.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-08-pulse.js'),
  },
  {
    title: locate('ring', 'ring'),
    component: require('doc/pages/components/Spin/example-09-ring.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-09-ring.js'),
  },
  {
    title: locate('scale-circle', 'scale-circle'),
    component: require('doc/pages/components/Spin/example-10-scale-circle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-10-scale-circle.js'),
  },
  {
    title: locate('three-bounce', 'three-bounce'),
    component: require('doc/pages/components/Spin/example-11-three-bounce.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-11-three-bounce.js'),
  },
  {
    title: locate('wave', 'wave'),
    component: require('doc/pages/components/Spin/example-12-wave.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-12-wave.js'),
  },
]

const codes = []

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
