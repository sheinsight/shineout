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
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基础的进度条',
      'Base \n Basic progress bar'
    ),
    component: require('doc/pages/components/Progress/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Progress/example-1-base.tsx'),

  },
  {
    name: '1-popup',
    isTs: true,
    isTest: false,
    title: locate(
      '弹出展示 \n 设置 popup 属性后，children 会通过弹出框展示',
      'Popup \n After setting the popup property, children will be displayed through a popup box'
    ),
    component: require('doc/pages/components/Progress/example-1-popup.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-1-popup.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Progress/example-1-popup.tsx'),

  },
  {
    name: '2-type',
    isTs: true,
    isTest: false,
    title: locate(
      '样式 \n 内置了四种样式，通过 type 来调用',
      'Type \n There are 4 built-in style.'
    ),
    component: require('doc/pages/components/Progress/example-2-type.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-2-type.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Progress/example-2-type.tsx'),

  },
  {
    name: '3-color',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 通过 color 使用自定义颜色',
      'Color \n Use custom colors.'
    ),
    component: require('doc/pages/components/Progress/example-3-color.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-3-color.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Progress/example-3-color.tsx'),

  },
  {
    name: '3-linear',
    isTs: true,
    isTest: false,
    title: locate(
      '渐变色 \n 当 color 为对象时可以设置渐变色, 推荐只使用两种颜色',
      'Gradient \n Gradient color can be set when color is an object, recommended only in two colors'
    ),
    component: require('doc/pages/components/Progress/example-3-linear.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-3-linear.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Progress/example-3-linear.tsx'),

  },
  {
    name: '4-circle',
    isTs: true,
    isTest: false,
    title: locate(
      '圆形 \n 设置 shape 为 \'circle\'，显示为环形进度条',
      'Circle \n Set the shape property to circle to display circular progress bar.'
    ),
    component: require('doc/pages/components/Progress/example-4-circle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-4-circle.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Progress/example-4-circle.tsx'),

  },
  {
    name: '5-size',
    isTs: true,
    isTest: false,
    title: locate(
      '大小 \n 通过 size 或 style 来控制大小 \n 通过 strokeWidth 属性来控制线框宽度',
      'Size \n Set size(circle) or style(line) property to change the size.'
    ),
    component: require('doc/pages/components/Progress/example-5-size.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-5-size.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Progress/example-5-size.tsx'),

  },
  {
    name: '6-animation',
    isTs: true,
    isTest: false,
    title: locate(
      '动态示例 \n value 变更时动画效果演示',
      'Animation \n The animation for changing value.'
    ),
    component: require('doc/pages/components/Progress/example-6-animation.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Progress/example-6-animation.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Progress/example-6-animation.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Progress","properties":[{"name":"popup","tag":{"cn":"是否通过弹出框展示children","en":"popup to show children","default":"","version":""},"required":false,"type":"boolean "},{"name":"background","tag":{"cn":"背景色","en":"Background color","default":"\\\"#e9ecef\\\"","version":""},"required":false,"type":"string "},{"name":"children","tag":{"cn":"附加内容","en":"Content","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"color","tag":{"cn":"前景色, 可以设置为对象变成渐变.","en":"The foreground color can be set to the object to become a gradient","default":"primary","version":""},"required":false,"type":"string | {  form?: string , to?: string  } "},{"name":"shape","tag":{"cn":"样式","en":"Options","default":"\\\"line\\\"","version":""},"required":false,"type":"\\\"circle\\\" | \\\"line\\\" "},{"name":"size","tag":{"cn":"进度条大小，仅对 circle 有效","en":"The width and height of \\\"circle\\\" shape","default":"100","version":""},"required":false,"type":"number "},{"name":"strokeWidth","tag":{"cn":"线框宽度","en":"The width of the stroke","default":"8","version":""},"required":false,"type":"number "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"type","tag":{"cn":"内置配色","en":"Built-in color","default":"","version":""},"required":false,"type":"\\\"success\\\" | \\\"info\\\" | \\\"warning\\\" | \\\"danger\\\" "},{"name":"value","tag":{"cn":"百分比值，0 <= value <= 100","en":"Percentage, 0 <= value <= 100","default":"0","version":""},"required":false,"type":"number "},{"name":"strokeLinecap","tag":{"cn":"进度条两端的描边形状","en":"The shape to be used at the end of open subpaths when they are stroked","default":"","version":""},"required":false,"type":"\\\"round\\\" | \\\"butt\\\" | \\\"square\\\" | \\\"inherit\\\" "},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
