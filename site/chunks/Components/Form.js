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
    title: locate(
      '基本用法 \n 表单内置了类似双向绑定的机制，根据表单元素的 name 属性自动下发、收集数据',
      'Base \n The form has a two-way binding mechanism built in, automatically sending and collecting data based on the name property of the form element.'
    ),
    component: require('doc/pages/components/Form/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-01-base.js'),
  },
  {
    name: '02-controlform',
    title: locate(
      '表单方法 \n 可以通过 formRef 去获得表单的一些方法集, 包含校验, 清空校验, 提交等.',
      'Form Methods \n You can use formRef to get some methods of the form, including validation, clear validation, submission, etc.'
    ),
    component: require('doc/pages/components/Form/example-02-controlform.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-02-controlform.js'),
  },
  {
    name: '02-label',
    title: locate(
      '标签 \n 通过 labelWidth 和 labelAlign 改变标签宽度和对齐方式',
      'Label \n Set labelWidth and labelAlign to change label with and alignment.'
    ),
    component: require('doc/pages/components/Form/example-02-label.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-02-label.js'),
  },
  {
    name: '03-label-vertical',
    title: locate(
      ' \n 当 label 文字存在换行时，可使用 labelVerticalAlign 来控制垂直方向对齐方式',
      ' \n Use labelVerticalAlign to control vertical alignment when there is a line break in the label text'
    ),
    component: require('doc/pages/components/Form/example-03-label-vertical.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-03-label-vertical.js'),
  },
  {
    name: '03-label',
    title: locate(
      ' \n labelAlign="top"',
      ' \n labelAlign="top"'
    ),
    component: require('doc/pages/components/Form/example-03-label.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-03-label.js'),
  },
  {
    name: '04-inline',
    title: locate(
      '水平布局 \n 设置 inline 属性使 Form 变为水平布局',
      'Inline \n Set the inline property to true to make the Form horizontal.'
    ),
    component: require('doc/pages/components/Form/example-04-inline.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-04-inline.js'),
  },
  {
    name: '05-tip',
    title: locate(
      '提示信息 \n 在 Form.Item 上设置提示文案时，提示文案始终显示在组件下方。',
      'Tips \n Set the tip property on Form.Item, the prompt text is displayed below the component.'
    ),
    component: require('doc/pages/components/Form/example-05-tip.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-05-tip.js'),
  },
  {
    name: '06-tip',
    title: locate(
      ' \n 在 Input 或 Input.Group 上设置的 tip，会在组件 focus 时弹出显示。通过 popover 可以控制弹出位置。',
      ' \n Set the tip property on the Input or Input.Group will pop up when the component is focused. The position where it pop up can be controlled via popover property.'
    ),
    component: require('doc/pages/components/Form/example-06-tip.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-06-tip.js'),
  },
  {
    name: '07-validate',
    title: locate(
      '校验 \n 通过 Rule 对象，可以使用内置的规则。规则详见 Rule',
      'Validate \n Creating new rules object through built-in Rule.'
    ),
    component: require('doc/pages/components/Form/example-07-validate.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-07-validate.js'),
  },
  {
    name: '08-validate',
    title: locate(
      ' \n 通过 Rule 参数对校验规则进行扩展。',
      ' \n The validation rules can be extended by parameters.'
    ),
    component: require('doc/pages/components/Form/example-08-validate.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-08-validate.js'),
  },
  {
    name: '08-x-validate-bind',
    title: locate(
      ' \n 使用 bind 属性进行联动校验',
      ' \n use bind to Linkage verification'
    ),
    component: require('doc/pages/components/Form/example-08-x-validate-bind.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-08-x-validate-bind.js'),
  },
  {
    name: '09-server-validate',
    title: locate(
      ' \n 通过给 Form 设置 error，实现后端校验数据展示。在表单值被改变后，对应后端校验数据会被清空。<br />前端校验优先级大于后端校验。',
      ' \n By setting an error on the Form, the back-end validation data is presented. After the form value is changed, the corresponding back-end validation data is cleared. <br /> front-end validation priority is greater than back-end validation.'
    ),
    component: require('doc/pages/components/Form/example-09-server-validate.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-09-server-validate.js'),
  },
  {
    name: '11-disabled',
    title: locate(
      '禁用 \n 使用 disabled 属性使表单内支持 disabled 属性的组件禁用，通常用在表单数据加载或提交时',
      'Disabled \n Use the disabled property to make the Form support to disable component.'
    ),
    component: require('doc/pages/components/Form/example-11-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-11-disabled.js'),
  },
  {
    name: '12-field',
    title: locate(
      '字段 \n 支持 value 和 onChange 的组件可以放在 Form.Field 中。 \n children 为 ReactElement时，必须支持 value 和 onChange 属性 \n children 为 Function 时，返回一个或一组 ReactElement，在函数内部自行处理 value 和 onChange',
      'Field \n Components that support value property and onChange property can be put in a Form.Field . \n When the children property is a ReactElement, the value and onChange property must be provided. \n When the children property is a function, return one or one group of ReactElement.'
    ),
    component: require('doc/pages/components/Form/example-12-field.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-12-field.js'),
  },
  {
    name: '13-func-field',
    title: locate(
      ' \n 示例：使用 Form.Field 引入 react-color',
      ' \n Example: use Form.Field to introduce react-color.'
    ),
    component: require('doc/pages/components/Form/example-13-func-field.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-13-func-field.js'),
  },
  {
    name: '14-fieldset',
    title: locate(
      'FieldSet (Object) \n Form.FieldSet 可以处理对象类型的字段',
      'FieldSet (Object) \n Form.FieldSet handles fields of object type'
    ),
    component: require('doc/pages/components/Form/example-14-fieldset.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-14-fieldset.js'),
  },
  {
    name: '15-fieldset',
    title: locate(
      'FieldSet (Loop) \n FieldSet children 为函数时，根据 name 从 Form 中获取 value （类型为 array），遍历这个 value 生成一组子组件。',
      'FieldSet (Loop) \n When FieldSet\'s children is a function, takes the value (type is array) from the form by the name property, and generate a set of subcomponents.'
    ),
    component: require('doc/pages/components/Form/example-15-fieldset.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-15-fieldset.js'),
  },
  {
    name: '16-fieldset',
    title: locate(
      ' \n FieldSet 内部如果只有一个Field而非对象，设置Field 的 name 为 "" 值',
      ' \n If FieldSet\'s children is a single Field, set Field name to "" .'
    ),
    component: require('doc/pages/components/Form/example-16-fieldset.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-16-fieldset.js'),
  },
  {
    name: '17-flow',
    title: locate(
      '联动 \n 在通常情况下，Form 不通过 value 和 onChange 方式处理数据，只是在 submit 的时候获取数据提交。 \n 这种情况下，需要联动时，可以使用 Flow 组件来实现。如果设置了 names 属性，只监听 names 包含的字段变化，如果没有设置，会监听 Form 内所有数据的变化。',
      'Flow \n For performance reasons, internal data of the Form is isolated and changing one component does not trigger another component to change. \n If one component depends on another component\'s value, place it in the Flow component.'
    ),
    component: require('doc/pages/components/Form/example-17-flow.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-17-flow.js'),
  },
  {
    name: '19-nested',
    title: locate(
      ' \n 更简单的处理多级嵌套数据的方法，在 name 中用 . 分隔字段名称。',
      ' \n A simpler way to handle multi-level nested data is to separate the field names in name with \'.\' .'
    ),
    component: require('doc/pages/components/Form/example-19-nested.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-19-nested.js'),
  },
  {
    name: '20-array',
    title: locate(
      '数组 name \n 数据为数组类型的组件，name 可以传入一个相应的数组，来分别处理数组内的单个数据',
      'Array name \n While the component\'s data type is array, name can accept an array to process item individually.'
    ),
    component: require('doc/pages/components/Form/example-20-array.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-20-array.js'),
  },
  {
    name: '21-mode',
    title: locate(
      '模式 \n 使用 Form.useMode 可以创建一组指定 key 的组件，配合 Form 设置的 mode 属性过滤显示指定的元素',
      'Mode \n Form.useMode creates a set of components, filters the specified element with the mode attribute of the Form.'
    ),
    component: require('doc/pages/components/Form/example-21-mode.js').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-21-mode.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
