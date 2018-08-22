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
    name: '01-default',
    title: locate('default \n name="default"', 'default \n name="default"'),
    component: require('doc/pages/components/Spin/example-01-default.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-01-default.js'),
  },
  {
    name: '02-chasing-dots',
    title: locate('chasing-dots \n name="chasing-dots"', 'chasing-dots \n name="chasing-dots"'),
    component: require('doc/pages/components/Spin/example-02-chasing-dots.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-02-chasing-dots.js'),
  },
  {
    name: '03-cube-grid',
    title: locate('cube-grid \n name="cube-grid"', 'cube-grid \n name="cube-grid"'),
    component: require('doc/pages/components/Spin/example-03-cube-grid.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-03-cube-grid.js'),
  },
  {
    name: '04-double-bounce',
    title: locate('double-bounce \n name="double-bounce"', 'double-bounce \n name="double-bounce"'),
    component: require('doc/pages/components/Spin/example-04-double-bounce.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-04-double-bounce.js'),
  },
  {
    name: '05-fading-circle',
    title: locate('fading-circle \n name="fading-circle"', 'fading-circle \n name="fading-circle"'),
    component: require('doc/pages/components/Spin/example-05-fading-circle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-05-fading-circle.js'),
  },
  {
    name: '06-four-dots',
    title: locate('four-dots \n name="four-dots"', 'four-dots \n name="four-dots"'),
    component: require('doc/pages/components/Spin/example-06-four-dots.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-06-four-dots.js'),
  },
  {
    name: '07-plane',
    title: locate('plane \n name="plane"', 'plane \n name="plane"'),
    component: require('doc/pages/components/Spin/example-07-plane.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-07-plane.js'),
  },
  {
    name: '08-pulse',
    title: locate('pulse \n name="pulse"', 'pulse \n name="pulse"'),
    component: require('doc/pages/components/Spin/example-08-pulse.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-08-pulse.js'),
  },
  {
    name: '09-ring',
    title: locate('ring \n name="ring"', 'ring \n name="ring"'),
    component: require('doc/pages/components/Spin/example-09-ring.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-09-ring.js'),
  },
  {
    name: '10-scale-circle',
    title: locate('scale-circle \n name="scale-circle"', 'scale-circle \n name="scale-circle"'),
    component: require('doc/pages/components/Spin/example-10-scale-circle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-10-scale-circle.js'),
  },
  {
    name: '11-three-bounce',
    title: locate('three-bounce \n name="three-bounce"', 'three-bounce \n name="three-bounce"'),
    component: require('doc/pages/components/Spin/example-11-three-bounce.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-11-three-bounce.js'),
  },
  {
    name: '12-wave',
    title: locate('wave \n name="wave"', 'wave \n name="wave"'),
    component: require('doc/pages/components/Spin/example-12-wave.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-12-wave.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
