/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Image/cn.md'
import en from 'doc/pages/components/Image/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Image/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-01-base.js'),
  },
  {
    name: '02-shape',
    title: locate('形状', 'Shape'),
    component: require('doc/pages/components/Image/example-02-shape.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-02-shape.js'),
  },
  {
    name: '03-fit',
    title: locate('适应', 'fit'),
    component: require('doc/pages/components/Image/example-03-fit.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-03-fit.js'),
  },
  {
    name: '04-alt',
    title: locate('备用地址 \n 在 src 获取失败的情况下，自动使用 alt 属性设置的地址', 'alt'),
    component: require('doc/pages/components/Image/example-04-alt.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-04-alt.js'),
  },
  {
    name: '05-error',
    title: locate('错误处理 \n alt 属性失效或没有 alt 属性时，会显示 title 属性', 'alt'),
    component: require('doc/pages/components/Image/example-05-error.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-05-error.js'),
  },
  {
    name: '06-target',
    title: locate('跳转', 'Target'),
    component: require('doc/pages/components/Image/example-06-target.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-06-target.js'),
  },
  {
    name: '07-group',
    title: locate('跳转', 'Target'),
    component: require('doc/pages/components/Image/example-07-group.js').default,
    rawText: require('!raw-loader!doc/pages/components/Image/example-07-group.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
