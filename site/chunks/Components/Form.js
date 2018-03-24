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
    title: locate('提示信息 \n 在 Form.Item 上设置提示文案时，提示文案始终显示在组件下方。', 'Label'),
    component: require('doc/pages/components/Form/example-05-tip.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-05-tip.js'),
  },
  {
    title: locate('\n 在 Input 或 Input.Group 上设置的 tip，会在组件 focus 时弹出显示。popover 可以控制弹出位置。', ''),
    component: require('doc/pages/components/Form/example-06-tip.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-06-tip.js'),
  },
  {
    title: locate('校验 \n 通过 rules 校验，每个字段的 rules 是一个数组，可以使用多条规则。', 'Validate'),
    component: require('doc/pages/components/Form/example-07-validate.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-07-validate.js'),
  },
  {
    title: locate('\n 可以在单个元素上设置 rules', 'Validate'),
    component: require('doc/pages/components/Form/example-08-validate.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-08-validate.js'),
  },
  {
    title: locate('数据处理 \n Form 内部通过 Datum.Form 对象来处理数据，通常情况下，用户只需要 onSumbit 中的 formdata 提交即可。 \n 如果有额外的需求，可以自定义一个 Datum.Form 对象来处理数据。', 'Datum.Form'),
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
  {
    title: locate('字段 Form.Field \n 支持 value 和 onChange 的组件可以放在 Form.Field 中。', 'Field'),
    component: require('doc/pages/components/Form/example-12-field.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-12-field.js'),
  },
  {
    title: locate('遍历 Form.Loop \n Form.Loop 通过 name 属性从 Form 中获取一个类型为 array 的 value，遍历这个 value 生成一组子组件。', 'Loop'),
    component: require('doc/pages/components/Form/example-14-loop.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-14-loop.js'),
  },
  {
    title: locate('表单块 Form.Block \n Block 类似 Form，可以存取数据，只是没有 Submit 能力。一般用在 Form 中处理复杂数据。 \n Block 内组件设置的 name 只在这个 Block 内有效，只能存取 Block 的 value 中的数据，不能存取 Form 的数据。', 'Block'),
    component: require('doc/pages/components/Form/example-15-block.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-15-block.js'),
  },
  {
    title: locate(' \n 上例可以使用 Form.Block 改写', ''),
    component: require('doc/pages/components/Form/example-16-block.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-16-block.js'),
  },
  {
    title: locate('嵌套数据 \n Form.Block 配合 Form.Field 使用，可以处理多层数据', 'Nested data'),
    component: require('doc/pages/components/Form/example-17-block.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-17-block.js'),
  },
  {
    title: locate(' \n 更简单的处理多级嵌套数据的方法，在 name 中用 . 分隔字段名称。', 'Datum.Form.flatten'),
    component: require('doc/pages/components/Form/example-18-nested.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-18-nested.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
