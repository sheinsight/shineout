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
    title: locate('default \n name=&#34;default&#34;', 'default \n name=&#34;default&#34;'),
    component: require('doc/pages/components/Spin/example-01-default.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-01-default.js'),
  },
  {
    name: '02-chasing-dots',
    title: locate('chasing-dots \n name=&#34;chasing-dots&#34;', 'chasing-dots \n name=&#34;chasing-dots&#34;'),
    component: require('doc/pages/components/Spin/example-02-chasing-dots.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-02-chasing-dots.js'),
  },
  {
    name: '03-cube-grid',
    title: locate('cube-grid \n name=&#34;cube-grid&#34;', 'cube-grid \n name=&#34;cube-grid&#34;'),
    component: require('doc/pages/components/Spin/example-03-cube-grid.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-03-cube-grid.js'),
  },
  {
    name: '04-double-bounce',
    title: locate('double-bounce \n name=&#34;double-bounce&#34;', 'double-bounce \n name=&#34;double-bounce&#34;'),
    component: require('doc/pages/components/Spin/example-04-double-bounce.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-04-double-bounce.js'),
  },
  {
    name: '05-fading-circle',
    title: locate('fading-circle \n name=&#34;fading-circle&#34;', 'fading-circle \n name=&#34;fading-circle&#34;'),
    component: require('doc/pages/components/Spin/example-05-fading-circle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-05-fading-circle.js'),
  },
  {
    name: '06-four-dots',
    title: locate('four-dots \n name=&#34;four-dots&#34;', 'four-dots \n name=&#34;four-dots&#34;'),
    component: require('doc/pages/components/Spin/example-06-four-dots.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-06-four-dots.js'),
  },
  {
    name: '07-plane',
    title: locate('plane \n name=&#34;plane&#34;', 'plane \n name=&#34;plane&#34;'),
    component: require('doc/pages/components/Spin/example-07-plane.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-07-plane.js'),
  },
  {
    name: '08-pulse',
    title: locate('pulse \n name=&#34;pulse&#34;', 'pulse \n name=&#34;pulse&#34;'),
    component: require('doc/pages/components/Spin/example-08-pulse.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-08-pulse.js'),
  },
  {
    name: '09-ring',
    title: locate('ring \n name=&#34;ring&#34;', 'ring \n name=&#34;ring&#34;'),
    component: require('doc/pages/components/Spin/example-09-ring.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-09-ring.js'),
  },
  {
    name: '10-scale-circle',
    title: locate('scale-circle \n name=&#34;scale-circle&#34;', 'scale-circle \n name=&#34;scale-circle&#34;'),
    component: require('doc/pages/components/Spin/example-10-scale-circle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-10-scale-circle.js'),
  },
  {
    name: '11-three-bounce',
    title: locate('three-bounce \n name=&#34;three-bounce&#34;', 'three-bounce \n name=&#34;three-bounce&#34;'),
    component: require('doc/pages/components/Spin/example-11-three-bounce.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-11-three-bounce.js'),
  },
  {
    name: '12-wave',
    title: locate('wave \n name=&#34;wave&#34;', 'wave \n name=&#34;wave&#34;'),
    component: require('doc/pages/components/Spin/example-12-wave.js').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-12-wave.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
