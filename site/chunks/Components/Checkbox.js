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
    name: '1-base',
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Checkbox/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-1-base.js'),
  },
  {
    name: '2-checked',
    title: locate('状态 \n checked 有三个值，选中、未选中、半选。checked 设置时为受控组件（此示例没有处理）。', 'Checked'),
    component: require('doc/pages/components/Checkbox/example-2-checked.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-2-checked.js'),
  },
  {
    name: '3-value',
    title: locate('选中值 \n 未设置htmlValue的状态下，checkbox选中时返回true，如果设置 htmlValue，返回 htmlValue，未选中返回 undefined。', 'Value'),
    component: require('doc/pages/components/Checkbox/example-3-value.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-3-value.js'),
  },
  {
    name: '4-array',
    title: locate('一组多选框', 'Group'),
    component: require('doc/pages/components/Checkbox/example-4-array.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-4-array.js'),
  },
  {
    name: '4-group',
    title: locate('\n 复杂的数据可以使用 datum 进行处理', ''),
    component: require('doc/pages/components/Checkbox/example-4-group.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-4-group.js'),
  },
  {
    name: '4-rawgroup',
    title: locate(' \n React 组件方式', ''),
    component: require('doc/pages/components/Checkbox/example-4-rawgroup.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-4-rawgroup.js'),
  },
  {
    name: '5-block',
    title: locate('垂直布局', 'Block'),
    component: require('doc/pages/components/Checkbox/example-5-block.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-5-block.js'),
  },
  {
    name: '6-disabled',
    title: locate('禁用', 'Disabled'),
    component: require('doc/pages/components/Checkbox/example-6-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-6-disabled.js'),
  },
  {
    name: '7-disabled',
    title: locate('\n 使用 datum disabled 实现有条件禁用', 'Disabled'),
    component: require('doc/pages/components/Checkbox/example-7-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-7-disabled.js'),
  },
  {
    name: '8-input',
    title: locate('带输入', 'Base'),
    component: require('doc/pages/components/Checkbox/example-8-input.js').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-8-input.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
