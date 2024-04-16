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
    isTs: true,
    isTest: false,
    title: locate(
      'default \n name="default"',
      'default \n name="default"'
    ),
    component: require('doc/pages/components/Spin/example-01-01-default.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-01-01-default.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-01-01-default.tsx'),

  },
  {
    name: '01-02-tip',
    isTs: true,
    isTest: false,
    title: locate(
      'tip \n 自定义提示文案',
      'tip \n custom tip'
    ),
    component: require('doc/pages/components/Spin/example-01-02-tip.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-01-02-tip.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-01-02-tip.tsx'),

  },
  {
    name: '01-wrapper',
    isTs: true,
    isTest: false,
    title: locate(
      '包裹容器 \n 直接把内容内嵌到 Spin 中，将现有容器变为加载状态。',
      'Container \n children in Spin'
    ),
    component: require('doc/pages/components/Spin/example-01-wrapper.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-01-wrapper.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-01-wrapper.tsx'),

  },
  {
    name: '02-chasing-dots',
    isTs: true,
    isTest: false,
    title: locate(
      'chasing-dots \n name="chasing-dots"',
      'chasing-dots \n name="chasing-dots"'
    ),
    component: require('doc/pages/components/Spin/example-02-chasing-dots.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-02-chasing-dots.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-02-chasing-dots.tsx'),

  },
  {
    name: '03-cube-grid',
    isTs: true,
    isTest: false,
    title: locate(
      'cube-grid \n name="cube-grid"',
      'cube-grid \n name="cube-grid"'
    ),
    component: require('doc/pages/components/Spin/example-03-cube-grid.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-03-cube-grid.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-03-cube-grid.tsx'),

  },
  {
    name: '04-double-bounce',
    isTs: true,
    isTest: false,
    title: locate(
      'double-bounce \n name="double-bounce"',
      'double-bounce \n name="double-bounce"'
    ),
    component: require('doc/pages/components/Spin/example-04-double-bounce.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-04-double-bounce.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-04-double-bounce.tsx'),

  },
  {
    name: '05-fading-circle',
    isTs: true,
    isTest: false,
    title: locate(
      'fading-circle \n name="fading-circle"',
      'fading-circle \n name="fading-circle"'
    ),
    component: require('doc/pages/components/Spin/example-05-fading-circle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-05-fading-circle.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-05-fading-circle.tsx'),

  },
  {
    name: '06-four-dots',
    isTs: true,
    isTest: false,
    title: locate(
      'four-dots \n name="four-dots"',
      'four-dots \n name="four-dots"'
    ),
    component: require('doc/pages/components/Spin/example-06-four-dots.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-06-four-dots.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-06-four-dots.tsx'),

  },
  {
    name: '07-plane',
    isTs: true,
    isTest: false,
    title: locate(
      'plane \n name="plane"',
      'plane \n name="plane"'
    ),
    component: require('doc/pages/components/Spin/example-07-plane.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-07-plane.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-07-plane.tsx'),

  },
  {
    name: '08-pulse',
    isTs: true,
    isTest: false,
    title: locate(
      'pulse \n name="pulse"',
      'pulse \n name="pulse"'
    ),
    component: require('doc/pages/components/Spin/example-08-pulse.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-08-pulse.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-08-pulse.tsx'),

  },
  {
    name: '09-ring',
    isTs: true,
    isTest: false,
    title: locate(
      'ring \n name="ring"',
      'ring \n name="ring"'
    ),
    component: require('doc/pages/components/Spin/example-09-ring.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-09-ring.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-09-ring.tsx'),

  },
  {
    name: '10-scale-circle',
    isTs: true,
    isTest: false,
    title: locate(
      'scale-circle \n name="scale-circle"',
      'scale-circle \n name="scale-circle"'
    ),
    component: require('doc/pages/components/Spin/example-10-scale-circle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-10-scale-circle.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-10-scale-circle.tsx'),

  },
  {
    name: '11-three-bounce',
    isTs: true,
    isTest: false,
    title: locate(
      'three-bounce \n name="three-bounce"',
      'three-bounce \n name="three-bounce"'
    ),
    component: require('doc/pages/components/Spin/example-11-three-bounce.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-11-three-bounce.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-11-three-bounce.tsx'),

  },
  {
    name: '12-wave',
    isTs: true,
    isTest: false,
    title: locate(
      'wave \n name="wave"',
      'wave \n name="wave"'
    ),
    component: require('doc/pages/components/Spin/example-12-wave.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-12-wave.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-12-wave.tsx'),

  },
  {
    name: '13-chasing-ring',
    isTs: true,
    isTest: false,
    title: locate(
      'chasing-ring \n name="chasing-ring"',
      'chasing-ring \n name="chasing-ring"'
    ),
    component: require('doc/pages/components/Spin/example-13-chasing-ring.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Spin/example-13-chasing-ring.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Spin/example-13-chasing-ring.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Spin","properties":[{"name":"style","tag":{"cn":"Spin 元素扩展样式","en":"Spin external style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"className","tag":{"cn":"Spin 元素扩展 class","en":"Spin external class","default":"","version":""},"required":false,"type":"string "},{"name":"name","tag":{"cn":"类型","en":"type","default":"\\\"fading-circle\\\"","version":""},"required":false,"type":"| \\\"default\\\"  | \\\"chasing-dots\\\"  | \\\"cube-grid\\\"  | \\\"double-bounce\\\"  | \\\"fading-circle\\\"  | \\\"four-dots\\\"  | \\\"plane\\\"  | \\\"pulse\\\"  | \\\"ring\\\"  | \\\"scale-circle\\\"  | \\\"three-bounce\\\"  | \\\"wave\\\"  | \\\"chasing-ring\\\" "},{"name":"tip","tag":{"cn":"提示文案","en":"custom tip","default":"","version":""},"required":false,"type":"string | ReactElement "},{"name":"children","tag":{"cn":"作为包裹元素使用","en":"Spin has children","default":"","version":""},"required":false,"type":"string | ReactElement "},{"name":"size","tag":{"cn":"尺寸","en":"size","default":"40","version":""},"required":false,"type":"string | number "},{"name":"loading","tag":{"cn":"是否为加载中","en":"loading","default":"true","version":""},"required":false,"type":"boolean "},{"name":"color","tag":{"cn":"颜色","en":"color","default":"#6c757d","version":""},"required":false,"type":"string "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
