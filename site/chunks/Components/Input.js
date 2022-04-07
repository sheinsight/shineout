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
    name: '01-base',
    title: locate(
      '基本用法 \n Input 通常需要和其他的组件配合使用，所以默认的宽度是 100%，默认 display 为 block \n 如果设置了 style.width，默认 display 为 inline-flex',
      'Base \n Input usually needs to be used with other components, so the default width is 100% and the default display is block. \n If the style.width is set, the default display is inline-flex.'
    ),
    component: require('doc/pages/components/Input/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-01-base.js'),
  },
  {
    name: '02-size',
    title: locate(
      '大小 \n 提供了三种尺寸的输入框，small、default、large',
      'Size \n There are three size of input, small, default, large.'
    ),
    component: require('doc/pages/components/Input/example-02-size.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-02-size.js'),
  },
  {
    name: '03-number',
    title: locate(
      '数字 \n type 为 number 时，输入时会做一次校验，禁止输入非数字类型字符，并且根据 digits 属性限制小数位数',
      'Number \n When type is number, it is forbidden to input non-numeric characters, and the number of decimal places is limited according to the digits property'
    ),
    component: require('doc/pages/components/Input/example-03-number.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-03-number.js'),
  },
  {
    name: '04-number',
    title: locate(
      ' \n Input.Number 组件，可以通过鼠标和上下键辅助输入',
      ' \n Input.Number component can be assisted by mouse and up and down keyboard.'
    ),
    component: require('doc/pages/components/Input/example-04-number.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-04-number.js'),
  },
  {
    name: '05-group',
    title: locate(
      '组合 \n Icon, span, string, Button 类型可以直接放入 Input.Group 中。需要背景色可以放在 b 标签中。',
      'Group \n The Icon, span, string and Button types can be placed directly into the Input.Group. Use b tag can change the background color.'
    ),
    component: require('doc/pages/components/Input/example-05-group.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-05-group.js'),
  },
  {
    name: '06-tip',
    title: locate(
      '提示文字 \n 在 input 上设置的 tip 在 focus 时弹出',
      'Tip \n The tip set on input pops up when it is focused.'
    ),
    component: require('doc/pages/components/Input/example-06-tip.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-06-tip.js'),
  },
  {
    name: '07-validate',
    title: locate(
      '校验 \n 设置了 rules，会自动校验输入数据，设置了 popover 会在指定位置弹出 \n 如果没有设置 popover，不会弹出错误提示。 \n 有错误时，提示框不会隐藏。',
      'Validate \n When the rules property is set, it will automatically verify the input data. When the popover property is set, it will pop up at the specified location. \n If the popover property is not set, no error message will pop up. \n If input is invalid, the message will not be hidden.'
    ),
    component: require('doc/pages/components/Input/example-07-validate.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-07-validate.js'),
  },
  {
    name: '08-disabled',
    title: locate(
      '禁用 \n 设置 disabled 属性禁用组件',
      'Disabled \n Set the disabled property to disable the component.'
    ),
    component: require('doc/pages/components/Input/example-08-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-08-disabled.js'),
  },
  {
    name: '09-password',
    title: locate(
      '密码 \n Input.Password 模拟密码输入框，用来阻止 Chrome 提示记住密码。',
      'Password \n Input.Password is a mock input of type \'password\', used for disable Chrome autofill.'
    ),
    component: require('doc/pages/components/Input/example-09-password.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-09-password.js'),
  },
  {
    name: '1-clearable',
    title: locate(
      '允许删除 \n Input 允许删除',
      'allow clear \n Input allow clear'
    ),
    component: require('doc/pages/components/Input/example-1-clearable.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-1-clearable.js'),
  },
  {
    name: '1-underline',
    title: locate(
      '下边框 \n 使用 underline 属性设置仅展示下边框',
      'Underline \n Use the underline property make only the bottom border display'
    ),
    component: require('doc/pages/components/Input/example-1-underline.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-1-underline.js'),
  },
  {
    name: '10-innertitle',
    title: locate(
      '内嵌标题 \n 使用 innerTitle 展示内嵌标题',
      'inner title \n use innerTitle to display the inner title'
    ),
    component: require('doc/pages/components/Input/example-10-innertitle.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-10-innertitle.js'),
  },
  {
    name: '11-autoSelect',
    title: locate(
      '自动选中 \n 使用 autoSelect 聚焦后自动选中文本',
      'auto select \n Use autoSelect to automatically select text after focusing'
    ),
    component: require('doc/pages/components/Input/example-11-autoSelect.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-11-autoSelect.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
