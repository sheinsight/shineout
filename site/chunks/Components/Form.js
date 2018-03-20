/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Form/cn.md'
import en from 'doc/pages/components/Form/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Form/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-01-base.js'),
  },
  {
    title: locate('标签 \n 通过 labelWidth 和 labelAlign 改变标签宽度和对齐方式', 'Label'),
    component: require('doc/pages/components/Form/example-02-label.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-02-label.js'),
  },
  {
    title: locate(' \n labelAlign=&#34;top&#34;', ' \n labelAlign=&#34;top&#34;'),
    component: require('doc/pages/components/Form/example-03-label.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-03-label.js'),
  },
  {
    title: locate('水平布局 \n 设置 inline 属性使 Form 变为水平布局', 'Inline'),
    component: require('doc/pages/components/Form/example-04-inline.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-04-inline.js'),
  },
  {
    title: locate('提示信息 \n 在 Form.Item 上设置提示文案时，提示文案始终显示在组件下方', 'Label'),
    component: require('doc/pages/components/Form/example-05-tip.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-05-tip.js'),
  },
  {
    title: locate('\n 在 Input 或 Input.Group 上设置的 tip，会在组件 focus 时弹出显示', ''),
    component: require('doc/pages/components/Form/example-06-tip.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-06-tip.js'),
  },
  {
    title: locate('校验 \n 通过 rules 校验', 'Validate'),
    component: require('doc/pages/components/Form/example-07-validate.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-07-validate.js'),
  },
  {
    title: locate('\n 可以单个元素上设置 rules', 'Validate'),
    component: require('doc/pages/components/Form/example-08-validate.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-08-validate.js'),
  },
  {
    title: locate('数据处理 \n 不设置 datum 属性时，Form 内部会自动创建一个 Datum.Form 对象，可以自定义一个 Datum.Form 对象来控制数据。', 'Validate'),
    component: require('doc/pages/components/Form/example-09-datum.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-09-datum.js'),
  },
  {
    title: locate('联动', 'onChange'),
    component: require('doc/pages/components/Form/example-10-change.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-10-change.js'),
  },
  {
    title: locate('禁用 \n 使用 disabled 属性使表单内支持 disabled 属性的组件禁用，通常用在表单数据加载或提交时', 'disabled'),
    component: require('doc/pages/components/Form/example-11-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-11-disabled.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
