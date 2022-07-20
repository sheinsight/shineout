/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Progress/cn.md'
import en from 'doc/pages/components/Progress/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: false,

    title: locate(
      '基本用法 \n 基础的进度条',
      'Base \n Basic progress bar'
    ),
    component: require('doc/pages/components/Progress/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-1-base.js'),

  },
  {
    name: '1-popup',
    isTs: false,

    title: locate(
      '弹出展示 \n 设置 popup 属性后，children 会通过弹出框展示',
      'Popup \n After setting the popup property, children will be displayed through a popup box'
    ),
    component: require('doc/pages/components/Progress/example-1-popup.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-1-popup.js'),

  },
  {
    name: '2-type',
    isTs: false,

    title: locate(
      '样式 \n 内置了四种样式，通过 type 来调用',
      'Type \n There are 4 built-in style.'
    ),
    component: require('doc/pages/components/Progress/example-2-type.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-2-type.js'),

  },
  {
    name: '3-color',
    isTs: false,

    title: locate(
      ' \n 通过 color 使用自定义颜色',
      'Color \n Use custom colors.'
    ),
    component: require('doc/pages/components/Progress/example-3-color.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-3-color.js'),

  },
  {
    name: '3-linear',
    isTs: false,

    title: locate(
      '渐变色 \n 当 color 为对象时可以设置渐变色, 推荐只使用两种颜色',
      'Gradient \n Gradient color can be set when color is an object, recommended only in two colors'
    ),
    component: require('doc/pages/components/Progress/example-3-linear.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-3-linear.js'),

  },
  {
    name: '4-circle',
    isTs: false,

    title: locate(
      '圆形 \n 设置 shape 为 \'circle\'，显示为环形进度条',
      'Circle \n Set the shape property to circle to display circular progress bar.'
    ),
    component: require('doc/pages/components/Progress/example-4-circle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-4-circle.js'),

  },
  {
    name: '5-size',
    isTs: false,

    title: locate(
      '大小 \n 通过 size 或 style 来控制大小 \n 通过 strokeWidth 属性来控制线框宽度',
      'Size \n Set size(circle) or style(line) property to change the size.'
    ),
    component: require('doc/pages/components/Progress/example-5-size.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-5-size.js'),

  },
  {
    name: '6-animation',
    isTs: false,

    title: locate(
      '动态示例 \n value 变更时动画效果演示',
      'Animation \n The animation for changing value.'
    ),
    component: require('doc/pages/components/Progress/example-6-animation.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-6-animation.js'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
