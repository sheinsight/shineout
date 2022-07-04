/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Radio/cn.md'
import en from 'doc/pages/components/Radio/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base.tsx',
    isTs: true,
    title: locate(
      '基本用法 \n Radio.Group 通过数据来生成一组单选框。',
      'Base \n Radio.Group generate a group of radios from an array.'
    ),
    component: require('doc/pages/components/Radio/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-1-base.tsx'),

  },
  {
    name: '2-group.tsx',
    isTs: true,
    title: locate(
      ' \n 将一组 Radio 放在 Radio.Group 中，以 React 组件方式调用。',
      ' \n A series of radios group by Radio.Group.'
    ),
    component: require('doc/pages/components/Radio/example-2-group.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-2-group.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-2-group.tsx'),

  },
  {
    name: '3-format.tsx',
    isTs: true,
    title: locate(
      '复杂数据 \n 复杂的数据可以使用 format 处理 value',
      'Complex data \n Complex data can use format to process value.'
    ),
    component: require('doc/pages/components/Radio/example-3-format.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-3-format.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-3-format.tsx'),

  },
  {
    name: '5-block.tsx',
    isTs: true,
    title: locate(
      '垂直布局 \n 默认为水平布局，设置 block 属性可以改为垂直布局',
      'Vertical layout \n The default is horizontal layout and setting the block property can changed it to be vertical layout.'
    ),
    component: require('doc/pages/components/Radio/example-5-block.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-5-block.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-5-block.tsx'),

  },
  {
    name: '6-button-1.tsx',
    isTs: true,
    title: locate(
      '按钮样式 \n 设置 button 属性可以展示为按钮样式',
      'Button \n set button to show button style'
    ),
    component: require('doc/pages/components/Radio/example-6-button-1.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-6-button-1.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-6-button-1.tsx'),

  },
  {
    name: '6-button-2.tsx',
    isTs: true,
    title: locate(
      ' \n 设置 button 为 outline 可以展示透明背景的按钮样式',
      ' \n set button with outline to show outline button style'
    ),
    component: require('doc/pages/components/Radio/example-6-button-2.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-6-button-2.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-6-button-2.tsx'),

  },
  {
    name: '6-button-3.tsx',
    isTs: true,
    title: locate(
      ' \n 设置 size 可以控制按钮样式的大小',
      ' \n size to set button style size'
    ),
    component: require('doc/pages/components/Radio/example-6-button-3.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-6-button-3.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-6-button-3.tsx'),

  },
  {
    name: '7-disabled.tsx',
    isTs: true,
    title: locate(
      '禁用 \n 设置 disabled 为 true 时，禁用所有选项',
      'Disabled \n Set disabled property is set to true, all the options is disabled.'
    ),
    component: require('doc/pages/components/Radio/example-7-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-7-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-7-disabled.tsx'),

  },
  {
    name: '8-disabled.tsx',
    isTs: true,
    title: locate(
      ' \n disabled 为函数时，根据函数返回结果实现有条件禁用',
      ' \n When the disabled is a function, disbale the option that the function to return true.'
    ),
    component: require('doc/pages/components/Radio/example-8-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-8-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-8-disabled.tsx'),

  },
  {
    name: '9-toggle.tsx',
    isTs: true,
    title: locate(
      '支持取消 \n 使用组件形式来支持取消选中',
      'Cancel \n Use component list for toggle radio'
    ),
    component: require('doc/pages/components/Radio/example-9-toggle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-9-toggle.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-9-toggle.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
