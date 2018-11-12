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
    name: '01-base',
    title: locate('基本用法 \n 表单内置了类似双向绑定的机制，根据表单元素的 name 属性自动下发、收集数据', 'Base \n The form has a two-way binding mechanism built in, automatically sending and collecting data based on the name property of the form element.'),
    component: require('doc/pages/components/Form/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-01-base.js'),
  },
  {
    name: '02-label',
    title: locate('标签 \n 通过 labelWidth 和 labelAlign 改变标签宽度和对齐方式', 'Label \n Set labelWidth and labelAlign to change label with and alignment.'),
    component: require('doc/pages/components/Form/example-02-label.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-02-label.js'),
  },
  {
    name: '03-label',
    title: locate(' \n labelAlign="top"', ' \n labelAlign="top"'),
    component: require('doc/pages/components/Form/example-03-label.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-03-label.js'),
  },
  {
    name: '04-inline',
    title: locate('水平布局 \n 设置 inline 属性使 Form 变为水平布局', 'Inline \n Set the inline to true make the Form horizontal.'),
    component: require('doc/pages/components/Form/example-04-inline.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-04-inline.js'),
  },
  {
    name: '05-tip',
    title: locate('提示信息 \n 在 Form.Item 上设置提示文案时，提示文案始终显示在组件下方。', 'Tips \n Set the tip property on Form.Item, the prompt text is displayed below the component.'),
    component: require('doc/pages/components/Form/example-05-tip.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-05-tip.js'),
  },
  {
    name: '06-tip',
    title: locate(' \n 在 Input 或 Input.Group 上设置的 tip，会在组件 focus 时弹出显示。通过 popover 可以控制弹出位置。', ' \n Set the tip property on the Input or Input.Group will pop up when the component is focused. The position where it pop up can be controlled via popover property.'),
    component: require('doc/pages/components/Form/example-06-tip.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-06-tip.js'),
  },
  {
    name: '07-validate',
    title: locate('校验 \n 通过 rules 校验，每个字段的 rules 是一个数组，可以使用多条规则。', 'Validate \n Validate by rules.'),
    component: require('doc/pages/components/Form/example-07-validate.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-07-validate.js'),
  },
  {
    name: '08-validate',
    title: locate(' \n 某些复杂的数据，如多层嵌套的数据，可以在单个元素上设置 rules \n 设置 scrollToError 属性，在 form 提交校验失败时自动滚动到第一个错误的组件', ' \n Some complex data, such as multi-level nested data, can set rules on a single element. \n Set the scrollToError property, scroll to the first invalid element when the form submission validation fails.'),
    component: require('doc/pages/components/Form/example-08-validate.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-08-validate.js'),
  },
  {
    name: '09-datum',
    title: locate('数据处理 \n Form 内部通过 Datum.Form 对象来处理数据，通常情况下，用户只需要 onSumbit 中的 formdata 提交即可。 \n 如果有额外的需求，可以自定义一个 Datum.Form 对象来处理数据。', 'Datum.Form \n Forms internally process data through the Datum.Form object. Typically, users only need to get formdata on onSumbit. \n You can customize a Datum.Form object to process the data.'),
    component: require('doc/pages/components/Form/example-09-datum.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-09-datum.js'),
  },
  {
    name: '10-flow',
    title: locate('联动 \n 出于性能的考虑，Form 内部数据是隔离的，一个组件改变，不会触发另一个组件变化。 \n 需要联动的场景，可以使用 Flow 组件来实现。如果设置了 names 属性，只监听 names 包含的字段变化，如果没有设置，会监听 Form 内所有数据的变化。', 'Flow \n For performance reasons, internal data of the Form is isolated and changing one component does not trigger another component to change. \n If one component depends on another component\'s value, place it in the Flow component.'),
    component: require('doc/pages/components/Form/example-10-flow.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-10-flow.js'),
  },
  {
    name: '11-disabled',
    title: locate('禁用 \n 使用 disabled 属性使表单内支持 disabled 属性的组件禁用，通常用在表单数据加载或提交时', 'Disabled \n Use the disabled property to make the Form support to disable component.'),
    component: require('doc/pages/components/Form/example-11-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-11-disabled.js'),
  },
  {
    name: '12-field',
    title: locate('字段 \n 支持 value 和 onChange 的组件可以放在 Form.Field 中。 \n children 为 ReactElement时，必须支持 value 和 onChange 属性 \n children 为 Function 时，返回一个或一组 ReactElement，在函数内部自行处理 value 和 onChange', 'Field \n Components that support value property and onChange property can be placed in a Form.Field . \n When the children property is a ReactElement, the value property and onChange property must be supported. \n When the children property is a function, return one or one group of ReactElement.'),
    component: require('doc/pages/components/Form/example-12-field.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-12-field.js'),
  },
  {
    name: '13-func-field',
    title: locate(' \n 示例：使用 Form.Field 引入 react-color', ' \n Example: use Form.Field to introduce react-color.'),
    component: require('doc/pages/components/Form/example-13-func-field.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-13-func-field.js'),
  },
  {
    name: '14-loop',
    title: locate('遍历 \n Form.Loop 通过 name 属性从 Form 中获取一个类型为 array 的 value，遍历这个 value 生成一组子组件。', 'Loop \n Form.Loop takes a value whose type is the array from the form via the name property, and iterates over this value to generate a set of subcomponents.'),
    component: require('doc/pages/components/Form/example-14-loop.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-14-loop.js'),
  },
  {
    name: '15-block',
    title: locate('表单块 \n Block 类似 Form，可以存取数据，只是没有 Submit 能力。一般用在 Form 中处理复杂数据。 \n Block 内组件设置的 name 只在这个 Block 内有效，只能存取 Block 的 value 中的数据，不能存取 Form 的数据。', 'Block \n Block is similar to Form, can access data, but does not have the ability to submit. \n The name set in the Block component is valid only in this block. It can only access the data in the value of the block and cannot access the data of the Form.'),
    component: require('doc/pages/components/Form/example-15-block.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-15-block.js'),
  },
  {
    name: '16-block',
    title: locate(' \n 上例可以使用 Form.Block 改写', ' \n The above example can be overwritten with Form.Block.'),
    component: require('doc/pages/components/Form/example-16-block.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-16-block.js'),
  },
  {
    name: '17-nested',
    title: locate('嵌套数据 \n Form.Block 配合 Form.Field 使用，可以处理多层嵌套数据', 'Nested data \n Form.Block can handle multiple levels of nested data by working with Form.Field.'),
    component: require('doc/pages/components/Form/example-17-nested.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-17-nested.js'),
  },
  {
    name: '18-block-field',
    title: locate(' \n Form.BlockField 合并了 Form.Field 和 Form.Block，可以简化如上', ' \n Form.BlockField combines Form.Field and Form.Block and can be simplified as above.'),
    component: require('doc/pages/components/Form/example-18-block-field.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-18-block-field.js'),
  },
  {
    name: '19-nested',
    title: locate(' \n 更简单的处理多级嵌套数据的方法，在 name 中用 . 分隔字段名称。', ' \n A simpler way to handle multi-level nested data is to separate the field names in name with \'.\' .'),
    component: require('doc/pages/components/Form/example-19-nested.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-19-nested.js'),
  },
  {
    name: '20-array',
    title: locate('数组 name \n 数据为数组类型的组件，name 可以传入一个相应的数组，来分别处理数组内的单个数据', 'Array name \n The name of component whose data is an array can be passed in a corresponding array to process individual data in the array.'),
    component: require('doc/pages/components/Form/example-20-array.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-20-array.js'),
  },
  {
    name: '21-mode',
    title: locate('模式 \n 使用 Form.useMode 可以创建一组指定 key 的组件，配合 Form 设置的 mode 属性过滤显示指定的元素', 'Mode \n Form.useMode create a set of components, filters the specified element with the mode attribute of the Form.'),
    component: require('doc/pages/components/Form/example-21-mode.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-21-mode.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
