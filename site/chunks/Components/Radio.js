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
    name: '1-base',
    title: locate('基本用法 \n Radio.Group 通过数据来生成一组单选框。', 'Base \n Radio.Group generate a group of radios from an array.'),
    component: require('doc/pages/components/Radio/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-1-base.js'),
  },
  {
    name: '2-group',
    title: locate(' \n 将一组 Radio 放在 Radio.Group 中，以 React 组件方式调用。', ' \n A series of radios group by Radio.Group.'),
    component: require('doc/pages/components/Radio/example-2-group.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-2-group.js'),
  },
  {
    name: '3-format',
    title: locate('复杂数据 \n 复杂的数据可以使用 format 处理 value', 'Complex data \n Complex data can use format to process value.'),
    component: require('doc/pages/components/Radio/example-3-format.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-3-format.js'),
  },
  {
    name: '4-datum',
    title: locate(' \n 当 format 不能满足需求时，可以使用 Datum.List 进行处理', ' \n When the format does not satisfied your requirements, you can use <a href="#/components/Datum.List">Data.List</a> istead.'),
    component: require('doc/pages/components/Radio/example-4-datum.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-4-datum.js'),
  },
  {
    name: '5-block',
    title: locate('垂直布局 \n 默认为水平布局，设置 block 属性可以改为垂直布局', 'Vertical layout \n The default is horizontal layout and setting the block property can changed it to be vertical layout.'),
    component: require('doc/pages/components/Radio/example-5-block.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-5-block.js'),
  },
  {
    name: '6-disabled',
    title: locate('禁用 \n 设置 disabled 为 true 时，禁用所有选项', 'Disabled \n Set disabled property is set to true, all the options is disabled.'),
    component: require('doc/pages/components/Radio/example-6-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-6-disabled.js'),
  },
  {
    name: '7-disabled',
    title: locate(' \n disabled 为函数时，根据函数返回结果实现有条件禁用', ' \n When the disabled is a function, disbale the option that the function to return true.'),
    component: require('doc/pages/components/Radio/example-7-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-7-disabled.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
