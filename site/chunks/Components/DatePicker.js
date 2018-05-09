/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/DatePicker/cn.md'
import en from 'doc/pages/components/DatePicker/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/DatePicker/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-01-base.js'),
  },
  {
    title: locate('格式化 \n 可以修改 format 来定义返回值和传入值的格式', 'Format'),
    component: require('doc/pages/components/DatePicker/example-02-format.js').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-02-format.js'),
  },
  {
    title: locate('选择星期', 'Week Type'),
    component: require('doc/pages/components/DatePicker/example-05-week.js').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-05-week.js'),
  },
  {
    title: locate('选择月', 'Month Type'),
    component: require('doc/pages/components/DatePicker/example-06-month.js').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-06-month.js'),
  },
  {
    title: locate('选择时间 \n 会根据 format 自动加载相应的选择列', 'Time Type'),
    component: require('doc/pages/components/DatePicker/example-07-time.js').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-07-time.js'),
  },
  {
    title: locate('选择日期时间', 'Datetime Type'),
    component: require('doc/pages/components/DatePicker/example-08-datetime.js').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-08-datetime.js'),
  },
  {
    title: locate('选择范围 \n 设置 range 属性可以选择范围，输入和返回的 value 为长度为 2 的数组', 'Range'),
    component: require('doc/pages/components/DatePicker/example-09-range-date.js').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-09-range-date.js'),
  },
  {
    title: locate('禁用', 'Disabled'),
    component: require('doc/pages/components/DatePicker/example-10-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-10-disabled.js'),
  },
  {
    title: locate(' \n disabled 为函数时，禁用返回为true的选项', ''),
    component: require('doc/pages/components/DatePicker/example-11-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-11-disabled.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
