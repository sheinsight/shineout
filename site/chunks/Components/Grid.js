/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Grid/cn.md'
import en from 'doc/pages/components/Grid/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    isTs: true,
    isTest: false,
    title: locate(
      '任意等分 \n Grid 的栅格体系是动态生成，可以实现任意等份',
      'Arbitrary \n Grid system is dynamic generated and can be any number.'
    ),
    component: require('doc/pages/components/Grid/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Grid/example-01-base.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Grid/example-01-base.tsx'),

  },
  {
    name: '02-offset',
    isTs: true,
    isTest: false,
    title: locate(
      '偏移 \n offset 属性可以设置偏移，取值方式和宽度相同',
      'Offset \n The offset property set the offset in the same way as the width.'
    ),
    component: require('doc/pages/components/Grid/example-02-offset.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Grid/example-02-offset.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Grid/example-02-offset.tsx'),

  },
  {
    name: '03-nested',
    isTs: true,
    isTest: false,
    title: locate(
      '嵌套 \n 嵌套的栅格',
      'Nested \n Nested grids'
    ),
    component: require('doc/pages/components/Grid/example-03-nested.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Grid/example-03-nested.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Grid/example-03-nested.tsx'),

  },
  {
    name: '04-gutter',
    isTs: true,
    isTest: false,
    title: locate(
      '间距 \n 通过 gutter 属性设置栅格间距',
      'Gutter \n Set grid spacing through the gutter property.'
    ),
    component: require('doc/pages/components/Grid/example-04-gutter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Grid/example-04-gutter.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Grid/example-04-gutter.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Grid","properties":[{"name":"gutter","tag":{"cn":"栅格之间间距","en":"Spacing between grids","default":"","version":""},"required":false,"type":"number "},{"name":"offset","tag":{"cn":"左偏移百分比，0 <= offset < 1","en":"Left offset percentage, 0 <= offset < 1","default":"0","version":""},"required":false,"type":"number "},{"name":"width","tag":{"cn":"宽度百分比，0 < number <= 1","en":"Percentage of width, 0 < number <= 1","default":"1","version":""},"required":false,"type":"number "},{"name":"responsive","tag":{"cn":"激活响应式的最小尺寸。sm: 568px; md: 768px; lg: 992px; xl: 1200px;\\n例如：设置为 sm 时，屏幕尺寸若低于568px，栅格系统的响应性将不会生效。","en":"The min size of responsive: sm: 568px; md: 768px; lg: 992px; xl: 1200px","default":"\\\"md\\\"","version":""},"required":false,"type":"\\\"sm\\\" | \\\"md\\\" | \\\"lg\\\" | \\\"xl\\\" "},{"name":"stretch","tag":{"cn":"是否撑满容器高度","en":"Stretch full height of content","default":"","version":""},"required":false,"type":"boolean "},{"name":"children","tag":{"cn":"子元素","en":"children","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
