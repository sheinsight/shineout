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
    title: locate('基本用法 \n 基础的进度条', 'Base \n Basic progress bar'),
    component: require('doc/pages/components/Progress/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-1-base.js'),
  },
  {
    name: '2-type',
    title: locate('样式 \n 内置了四种样式，通过 type 来调用', 'Type \n There are 4 built-in style.'),
    component: require('doc/pages/components/Progress/example-2-type.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-2-type.js'),
  },
  {
    name: '3-color',
    title: locate(' \n 通过 color 使用自定义颜色', 'Color \n Use custom colors.'),
    component: require('doc/pages/components/Progress/example-3-color.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-3-color.js'),
  },
  {
    name: '4-circle',
    title: locate('圆形 \n 设置 shape 为 \'circle\'，显示为环形进度条', 'Circle \n Set the shape property to circle to display circular progress bar.'),
    component: require('doc/pages/components/Progress/example-4-circle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-4-circle.js'),
  },
  {
    name: '5-size',
    title: locate('大小 \n 通过 size 或 style 来控制大小 \n 通过 strokeWidth 属性来控制线框宽度', 'Size \n Set size(circle) or style(line) property to change the size.'),
    component: require('doc/pages/components/Progress/example-5-size.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-5-size.js'),
  },
  {
    name: '6-animation',
    title: locate('动态示例 \n value 变更时动画效果演示', 'Animation \n The animation for changing value.'),
    component: require('doc/pages/components/Progress/example-6-animation.js').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-6-animation.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
