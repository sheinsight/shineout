/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Input/cn.md'
import en from 'doc/pages/components/Input/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基本用法 \n *Input 通常需要和其他的组件配合使用，所以默认的宽度是 100%', 'Base'),
    component: require('doc/pages/components/Input/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-1-base.js'),
  },
  {
    title: locate('大小 \n 提供了三种尺寸的输入框', 'Size'),
    component: require('doc/pages/components/Input/example-2-size.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-2-size.js'),
  },
  {
    title: locate('数字 \n type=number 时，会做一次校验，禁止输入非数字类型字符，并且根据 digits 属性限制小数位数', 'number type'),
    component: require('doc/pages/components/Input/example-3-type.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-3-type.js'),
  },
  {
    title: locate('组合 Input.Group \n Icon, span, string, Button 类型可以直接放入 Input.Group 中。需要背景色可以放在 b 标签中。', 'Group'),
    component: require('doc/pages/components/Input/example-4-group.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-4-group.js'),
  },
  {
    title: locate('禁用', 'Disabled'),
    component: require('doc/pages/components/Input/example-5-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-5-disabled.js'),
  },
  {
    title: locate('提示文字 \n 在 input 上设置的 tip 在 focus 时弹出', 'tip'),
    component: require('doc/pages/components/Input/example-6-tip.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-6-tip.js'),
  },
  {
    title: locate('校验 \n 设置了 rules，会自动校验输入数据，设置了 popover 会在指定位置弹出 \n 如果没有设置 popover，不会弹出错误提示。 \n 有错误时，提示框不会隐藏。', 'validate'),
    component: require('doc/pages/components/Input/example-7-validate.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-7-validate.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
