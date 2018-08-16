/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Checkbox/cn.md'
import en from 'doc/pages/components/Checkbox/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    title: locate('基本用法 \n 基本的 Checkbox', 'Base \n Basic Checkbox'),
    component: require('doc/pages/components/Checkbox/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-01-base.js'),
  },
  {
    name: '02-checked',
    title: locate('状态 \n checked 有三个值，选中(true)、未选中(false)、半选中(\'indeterminate\')。checked 设置时为受控组件（此示例没有处理 onChange 事件）。', 'Checked \n The checked has three values: true(checked), false(not checked), \'indeterminate\'(half-checked).'),
    component: require('doc/pages/components/Checkbox/example-02-checked.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-02-checked.js'),
  },
  {
    name: '03-value',
    title: locate('选中值 \n 未设置htmlValue的状态下，checkbox选中时返回true，如果设置 htmlValue，返回 htmlValue。未选中状态都是返回 undefined。', 'Value \n When the htmlValue is set, the checkbox return the htmlValue (checked) and undefined (not checked); \n When the htmlValue is not set, the checkbox selected return true (checked) and undefined (not checked);'),
    component: require('doc/pages/components/Checkbox/example-03-value.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-03-value.js'),
  },
  {
    name: '04-rawgroup',
    title: locate('一组复选框 \n 一组复选框可以放在 Checkbox.Group 中', 'Group \n A series of checkboxes group by Checkbox.Group.'),
    component: require('doc/pages/components/Checkbox/example-04-rawgroup.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-04-rawgroup.js'),
  },
  {
    name: '05-group',
    title: locate(' \n 可以直接通过数据来渲染一组 Checkbox', ' \n Render a group of checkboxes from data.'),
    component: require('doc/pages/components/Checkbox/example-05-group.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-05-group.js'),
  },
  {
    name: '06-format',
    title: locate('复杂数据 \n 复杂的数据可以使用 format 处理 value', 'Complex data \n Complex data can use format to process value.'),
    component: require('doc/pages/components/Checkbox/example-06-format.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-06-format.js'),
  },
  {
    name: '07-datum',
    title: locate(' \n 当 format 不能满足需求时，可以使用 Datum.List 进行处理', ' \n When the format does not satisfied your requirements, you can use <a href="#/components/Datum.List">Data.List</a> istead.'),
    component: require('doc/pages/components/Checkbox/example-07-datum.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-07-datum.js'),
  },
  {
    name: '08-block',
    title: locate('垂直布局 \n 默认是水平布局，设置 block 属性可以改为垂直布局', 'Block \n The default is horizontal layout, and setting the block property can change it to be vertical layout.'),
    component: require('doc/pages/components/Checkbox/example-08-block.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-08-block.js'),
  },
  {
    name: '09-disabled',
    title: locate('禁用 \n 设置 Checkbox.Group 的 disabled 为 true，禁用全部选项', 'Disabled \n Set the disabled property of Checkbox.Group to true, disable all the checkboxes.'),
    component: require('doc/pages/components/Checkbox/example-09-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-09-disabled.js'),
  },
  {
    name: '10-disabled',
    title: locate(' \n disabled 为函数时，根据函数结果实现有条件禁用', ' \n When the disabled is a function, disbale the option that the function to return true.'),
    component: require('doc/pages/components/Checkbox/example-10-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-10-disabled.js'),
  },
  {
    name: '11-input',
    title: locate('带输入 \n 设置 inputable 属性可以显示输入框，返回值为输入框内容', 'Inputable \n Set the inputable property to true can show the input box and the return value is the value of the input box.'),
    component: require('doc/pages/components/Checkbox/example-11-input.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-11-input.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
