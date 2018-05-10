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
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Rate/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-01-base.js'),
  },
  {
    title: locate('颜色 \n 创建函数时设置颜色', 'Icon color'),
    component: require('doc/pages/components/Rate/example-02-color.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-02-color.js'),
  },
  {
    title: locate('数组 \n 创建组件时可以使用数组来显示不同的选项', 'Array'),
    component: require('doc/pages/components/Rate/example-03-array.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-03-array.js'),
  },
  {
    title: locate('最大值 \n 通过max设置选项最大值', 'Array'),
    component: require('doc/pages/components/Rate/example-04-max.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-04-max.js'),
  },
  {
    title: locate('大小', 'Array'),
    component: require('doc/pages/components/Rate/example-05-size.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-05-size.js'),
  },
  {
    title: locate('文字', 'Text'),
    component: require('doc/pages/components/Rate/example-06-text.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-06-text.js'),
  },
  {
    title: locate('只读 \n 只读状态下，value可以传入小数', 'Readonly'),
    component: require('doc/pages/components/Rate/example-07-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-07-disabled.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
