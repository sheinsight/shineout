/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Rate/cn.md'
import en from 'doc/pages/components/Rate/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Rate/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-01-base.js'),
  },
  {
    name: '02-color',
    title: locate('颜色 \n 创建函数时设置颜色', 'Icon color'),
    component: require('doc/pages/components/Rate/example-02-color.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-02-color.js'),
  },
  {
    name: '04-max',
    title: locate('最大值 \n 通过max设置选项最大值', 'Array'),
    component: require('doc/pages/components/Rate/example-04-max.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-04-max.js'),
  },
  {
    name: '05-size',
    title: locate('大小', 'Array'),
    component: require('doc/pages/components/Rate/example-05-size.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-05-size.js'),
  },
  {
    name: '06-text',
    title: locate('文字', 'Text'),
    component: require('doc/pages/components/Rate/example-06-text.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-06-text.js'),
  },
  {
    name: '07-disabled',
    title: locate('只读 \n 只读状态下，value可以传入小数', 'Readonly'),
    component: require('doc/pages/components/Rate/example-07-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-07-disabled.js'),
  },
  {
    name: '08-face',
    title: locate('分级显示 \n 创建组件时可以使用数组显示不同分数下的选项，这种情况下，不支持带小数的value', 'Array'),
    component: require('doc/pages/components/Rate/example-08-face.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-08-face.js'),
  },
  {
    name: '09-array',
    title: locate('不重复选项 \n 选项为数组时，设置 repeat 属性为 false 可以平铺选项', 'No Repeat'),
    component: require('doc/pages/components/Rate/example-09-array.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-09-array.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
