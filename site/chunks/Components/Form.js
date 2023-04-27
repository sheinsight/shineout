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
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 表单内置了类似双向绑定的机制，根据表单元素的 name 属性自动下发、收集数据',
      'Base \n The form has a two-way binding mechanism built in, automatically sending and collecting data based on the name property of the form element.'
    ),
    component: require('doc/pages/components/Form/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-01-base.tsx'),

  },
  {
    name: '02-controlform',
    isTs: true,
    isTest: false,
    title: locate(
      '表单方法 \n 可以通过 formRef 去获得表单的一些方法集, 包含校验, 清空校验, 提交等.',
      'Form Methods \n You can use formRef to get some methods of the form, including validation, clear validation, submission, etc.'
    ),
    component: require('doc/pages/components/Form/example-02-controlform.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-02-controlform.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-02-controlform.tsx'),

  },
  {
    name: '02-label',
    isTs: true,
    isTest: false,
    title: locate(
      '标签 \n 通过 labelWidth 和 labelAlign 改变标签宽度和对齐方式',
      'Label \n Set labelWidth and labelAlign to change label with and alignment.'
    ),
    component: require('doc/pages/components/Form/example-02-label.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-02-label.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-02-label.tsx'),

  },
  {
    name: '03-label-vertical',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 当 label 文字存在换行时，可使用 labelVerticalAlign 来控制垂直方向对齐方式',
      ' \n Use labelVerticalAlign to control vertical alignment when there is a line break in the label text'
    ),
    component: require('doc/pages/components/Form/example-03-label-vertical.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-03-label-vertical.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-03-label-vertical.tsx'),

  },
  {
    name: '03-label',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n labelAlign="top"',
      ' \n labelAlign="top"'
    ),
    component: require('doc/pages/components/Form/example-03-label.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-03-label.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-03-label.tsx'),

  },
  {
    name: '04-inline',
    isTs: true,
    isTest: false,
    title: locate(
      '水平布局 \n 设置 inline 属性使 Form 变为水平布局',
      'Inline \n Set the inline property to true to make the Form horizontal.'
    ),
    component: require('doc/pages/components/Form/example-04-inline.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-04-inline.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-04-inline.tsx'),

  },
  {
    name: '05-tip',
    isTs: true,
    isTest: false,
    title: locate(
      '提示信息 \n 在 Form.Item 上设置提示文案时，提示文案始终显示在组件下方。',
      'Tips \n Set the tip property on Form.Item, the prompt text is displayed below the component.'
    ),
    component: require('doc/pages/components/Form/example-05-tip.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-05-tip.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-05-tip.tsx'),

  },
  {
    name: '06-tip',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 在 Input 或 Input.Group 上设置的 tip，会在组件 focus 时弹出显示。通过 popover 可以控制弹出位置。',
      ' \n Set the tip property on the Input or Input.Group will pop up when the component is focused. The position where it pop up can be controlled via popover property.'
    ),
    component: require('doc/pages/components/Form/example-06-tip.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-06-tip.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-06-tip.tsx'),

  },
  {
    name: '07-validate',
    isTs: true,
    isTest: false,
    title: locate(
      '校验 \n 通过 Rule 对象，可以使用内置的规则。规则详见 Rule',
      'Validate \n Creating new rules object through built-in Rule.'
    ),
    component: require('doc/pages/components/Form/example-07-validate.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-07-validate.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-07-validate.tsx'),

  },
  {
    name: '08-validate',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 通过 Rule 参数对校验规则进行扩展。',
      ' \n The validation rules can be extended by parameters.'
    ),
    component: require('doc/pages/components/Form/example-08-validate.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-08-validate.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-08-validate.tsx'),

  },
  {
    name: '08-x-validate-bind',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 使用 bind 属性进行联动校验',
      ' \n use bind to Linkage verification'
    ),
    component: require('doc/pages/components/Form/example-08-x-validate-bind.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-08-x-validate-bind.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-08-x-validate-bind.tsx'),

  },
  {
    name: '08-y-validate-keep-height',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 使用 keepErrorHeight 使得单行错误提示不会撑开页面高度',
      ' \n Use keepErrorHeight so that a single-line error prompt will not stretch the page height'
    ),
    component: require('doc/pages/components/Form/example-08-y-validate-keep-height.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-08-y-validate-keep-height.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-08-y-validate-keep-height.tsx'),

  },
  {
    name: '09-server-validate',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 通过给 Form 设置 error，实现后端校验数据展示。在表单值被改变后，对应后端校验数据会被清空。<br />前端校验优先级大于后端校验。',
      ' \n By setting an error on the Form, the back-end validation data is presented. After the form value is changed, the corresponding back-end validation data is cleared. <br /> front-end validation priority is greater than back-end validation.'
    ),
    component: require('doc/pages/components/Form/example-09-server-validate.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-09-server-validate.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-09-server-validate.tsx'),

  },
  {
    name: '11-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n 使用 disabled 属性使表单内支持 disabled 属性的组件禁用，通常用在表单数据加载或提交时',
      'Disabled \n Use the disabled property to make the Form support to disable component.'
    ),
    component: require('doc/pages/components/Form/example-11-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-11-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-11-disabled.tsx'),

  },
  {
    name: '12-field',
    isTs: true,
    isTest: false,
    title: locate(
      '字段 \n 支持 value 和 onChange 的组件可以放在 Form.Field 中。 \n children 为 ReactElement时，必须支持 value 和 onChange 属性 \n children 为 Function 时，返回一个或一组 ReactElement，在函数内部自行处理 value 和 onChange',
      'Field \n Components that support value property and onChange property can be put in a Form.Field . \n When the children property is a ReactElement, the value and onChange property must be provided. \n When the children property is a function, return one or one group of ReactElement.'
    ),
    component: require('doc/pages/components/Form/example-12-field.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-12-field.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-12-field.tsx'),

  },
  {
    name: '13-func-field',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 示例：使用 Form.Field 引入 react-color',
      ' \n Example: use Form.Field to introduce react-color.'
    ),
    component: require('doc/pages/components/Form/example-13-func-field.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-13-func-field.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-13-func-field.tsx'),

  },
  {
    name: '14-fieldset',
    isTs: true,
    isTest: false,
    title: locate(
      'FieldSet (Object) \n Form.FieldSet 可以处理对象类型的字段',
      'FieldSet (Object) \n Form.FieldSet handles fields of object type'
    ),
    component: require('doc/pages/components/Form/example-14-fieldset.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-14-fieldset.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-14-fieldset.tsx'),

  },
  {
    name: '15-fieldset',
    isTs: true,
    isTest: false,
    title: locate(
      'FieldSet (Loop) \n FieldSet children 为函数时，根据 name 从 Form 中获取 value （类型为 array），遍历这个 value 生成一组子组件。',
      'FieldSet (Loop) \n When FieldSet\'s children is a function, takes the value (type is array) from the form by the name property, and generate a set of subcomponents.'
    ),
    component: require('doc/pages/components/Form/example-15-fieldset.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-15-fieldset.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-15-fieldset.tsx'),

  },
  {
    name: '16-fieldset',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n FieldSet 内部如果只有一个Field而非对象，设置Field 的 name 为 "" 值',
      ' \n If FieldSet\'s children is a single Field, set Field name to "" .'
    ),
    component: require('doc/pages/components/Form/example-16-fieldset.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-16-fieldset.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-16-fieldset.tsx'),

  },
  {
    name: '17-flow',
    isTs: true,
    isTest: false,
    title: locate(
      '联动 \n 在通常情况下，Form 不通过 value 和 onChange 方式处理数据，只是在 submit 的时候获取数据提交。 \n 这种情况下，需要联动时，可以使用 Flow 组件来实现。如果设置了 names 属性，只监听 names 包含的字段变化，如果没有设置，会监听 Form 内所有数据的变化。',
      'Flow \n For performance reasons, internal data of the Form is isolated and changing one component does not trigger another component to change. \n If one component depends on another component\'s value, place it in the Flow component.'
    ),
    component: require('doc/pages/components/Form/example-17-flow.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-17-flow.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-17-flow.tsx'),

  },
  {
    name: '19-nested',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 更简单的处理多级嵌套数据的方法，在 name 中用 . 分隔字段名称。',
      ' \n A simpler way to handle multi-level nested data is to separate the field names in name with \'.\' .'
    ),
    component: require('doc/pages/components/Form/example-19-nested.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-19-nested.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-19-nested.tsx'),

  },
  {
    name: '20-array',
    isTs: true,
    isTest: false,
    title: locate(
      '数组 name \n 数据为数组类型的组件，name 可以传入一个相应的数组，来分别处理数组内的单个数据',
      'Array name \n While the component\'s data type is array, name can accept an array to process item individually.'
    ),
    component: require('doc/pages/components/Form/example-20-array.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-20-array.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-20-array.tsx'),

  },
  {
    name: '21-mode',
    isTs: true,
    isTest: false,
    title: locate(
      '模式 \n 使用 Form.useMode 可以创建一组指定 key 的组件，配合 Form 设置的 mode 属性过滤显示指定的元素',
      'Mode \n Form.useMode creates a set of components, filters the specified element with the mode attribute of the Form.'
    ),
    component: require('doc/pages/components/Form/example-21-mode.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Form/example-21-mode.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Form/example-21-mode.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Form","properties":[{"name":"children","tag":{"cn":"Form 内容","en":"Form Content","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"disabled","tag":{"cn":"是否禁用，为 true 时，表单内所有元素 disabled 都为 true","en":"When disabled is true, all the elements in the form are disabled.","default":"false","version":""},"required":false,"type":"boolean "},{"name":"value","tag":{"cn":"表单数据","en":"Form value","default":"","version":""},"required":false,"type":"object"},{"name":"onChange","tag":{"cn":"表单内组件值变化函数","en":"callback function, executed when the value is changing","default":"","version":""},"required":false,"type":"((value: Value) => void) "},{"name":"onError","tag":{"cn":"异常回调处理","en":"callback when the error happens","default":"","version":""},"required":false,"type":"((e: Error) => void) "},{"name":"defaultValue","tag":{"cn":"Form 默认值","en":"Form default value","default":"","version":""},"required":false,"type":"object"},{"name":"rules","tag":{"cn":"校验规则","en":"Validation rules","default":"","version":""},"required":false,"type":"object"},{"name":"size","tag":{"cn":"表单元素的尺寸","en":"Form element size","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"mode","tag":{"cn":"模式，和 useMode 配合使用","en":"mode, with useMode","default":"","version":""},"required":false,"type":"string "},{"name":"initValidate","tag":{"cn":"设置 value 后是否自动校验","en":"validate after set value","default":"","version":""},"required":false,"type":"boolean "},{"name":"removeUndefined","tag":{"cn":"是否删除值为 undefined 的字段，默认值为删除","en":"When removeUndefined is true, remove undefined value on submit.","default":"true","version":""},"required":false,"type":"boolean "},{"name":"labelAlign","tag":{"cn":"默认为空，跟随主题样式。","en":"The default is empty, follow the theme style.","default":"","version":""},"required":false,"type":"\\\"left\\\" | \\\"right\\\" | \\\"top\\\" "},{"name":"labelVerticalAlign","tag":{"cn":"默认顶部对齐","en":"the default value is top.","default":"\\\"top\\\"","version":""},"required":false,"type":"\\\"bottom\\\" | \\\"top\\\" | \\\"middle\\\" "},{"name":"labelWidth","tag":{"cn":"标签宽度，labelAlign 为 \\\"top\\\" 时无效。","en":"The width of label. It is invalid when labelAlign is \\\"top\\\".","default":"140px","version":""},"required":false,"type":"string | number "},{"name":"keepErrorHeight","tag":{"cn":"单行错误提示不撑开页面高度","en":"Single-line error prompt will not stretch the page height","default":"false","version":""},"required":false,"type":"boolean "},{"name":"inline","tag":{"cn":"是否水平布局","en":"When inline is true, the form is horizontal layout","default":"false","version":""},"required":false,"type":"boolean "},{"name":"onReset","tag":{"cn":"校验规则","en":"Validation rules","default":"","version":""},"required":false,"type":"(() => void) "},{"name":"onSubmit","tag":{"cn":"表单提交函数。表单内部校验失败时不会触发。","en":"the function for Form Submission.  When the internal validation fails, it will not be triggered.","default":"","version":""},"required":false,"type":"((data: Value, detail?: any, event?: Event ) => void) "},{"name":"scrollToError","tag":{"cn":"校验失败时是否滚动到第一个校验失败组件，该值为数字时，表示相对于顶部的偏移量","en":"When the verification fails, whether to scroll to the first verification failure component, when the value is a number, it means the offset relative to the top","default":"false","version":""},"required":false,"type":"number | boolean "},{"name":"throttle","tag":{"cn":"ms, 两次提交间隔时长（防止重复提交）","en":"ms, the interval between two submissions(Prevent repeat submission)","default":"1000","version":""},"required":false,"type":"number "},{"name":"formRef","tag":{"cn":"绑定 form 的引用, 可以调用某些 form 的方法","en":"bind form ref, Can call some form methods","default":"","version":""},"required":false,"type":"((form: FormRef<Value>) => void) | { current?: FormRef<Value> ; } "}],"cn":"","en":""},{"title":"Form.Item","properties":[{"name":"children","tag":{"cn":"表单元素","en":"form element","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"required","tag":{"cn":"必填标记，纯展示用，不会触发校验","en":"Required tags for pure display. Do not trigger validation","default":"false","version":""},"required":false,"type":"boolean "},{"name":"tip","tag":{"cn":"提示文案","en":"Prompting information","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"labelAlign","tag":{"cn":"默认为空，跟随主题样式。","en":"The default is empty, follow the theme style.","default":"","version":""},"required":false,"type":"\\\"left\\\" | \\\"right\\\" | \\\"top\\\" "},{"name":"labelVerticalAlign","tag":{"cn":"标签垂直方向对齐方式","en":"label vertical align","default":"\\\"top\\\"","version":""},"required":false,"type":"\\\"bottom\\\" | \\\"top\\\" | \\\"middle\\\" "},{"name":"labelWidth","tag":{"cn":"标签宽度，labelAlign 为 \\\"top\\\" 时无效。","en":"The width of label. It is invalid when labelAlign is \\\"top\\\".","default":"140px","version":""},"required":false,"type":"string | number "},{"name":"keepErrorHeight","tag":{"cn":"单行错误提示不撑开页面高度","en":"Single-line error prompt will not stretch the page height","default":"false","version":""},"required":false,"type":"boolean "},{"name":"label","tag":{"cn":"未定义时，标签不会 render，也不会占位。如果无内容需要占位，使用空字符串 \\\"\\\"。","en":"When it is undefined, the tag does not be rendered or occupy space. If there is no content, but it needs to be occupied, you can use an empty string \\\"\\\".","default":"","version":""},"required":false,"type":"ReactNode"}],"cn":"表单项，主要用来布局，显示标签，提示文案信息等","en":"Used to layout, display labels, tips, errors, etc"},{"title":"Form.Field","properties":[{"name":"children","tag":{"cn":"支持 value 和 onChange 的 React 组件，或者函数，函数object属性如下\\nvalue: 根据 name 从上级 Form 或 Form.Block 获取的值\\nerror：数据校验错误信息，类型为 Error\\nonChange: 值改变回调函数\\ndisabled: 继承 Form 的 disabled 属性","en":"React components that support value and onChange or function. The function object attribute is as follows:\\nvalue: The value obtained from the parent Form or Form.Block by name.\\nerror: the error information of data validation. type is Error.\\nonChange: The callback when the value is changing.\\ndisabled: inherit the disabled attribute of Form.","default":"","version":""},"required":true,"type":"((opts: object) => ReactNode) | ReactNode"},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"required":false,"type":"((e?: Error ) => void) "},{"name":"filterSameChange","tag":{"cn":"当两次选择的值相同时不触发 onChange","en":"onChange is not triggered when two selected values are the same","default":"false","version":""},"required":false,"type":"boolean "},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "},{"name":"defaultValue","tag":{"cn":"默认值  和 value 类型相同","en":"defaultValue 和 value 类型相同","default":"","version":""},"required":false,"type":"Value "},{"name":"reserveAble","tag":{"cn":"设置为 true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"required":false,"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段, 配合 Form 使用","en":"Form field, used with Form","default":"","version":""},"required":false,"type":"string | string[] "}],"cn":"用于处理自定义表单组件，使自定义表单组件实现通过rules校验，存储数据功能","en":"Used to handle custom form components, enabling custom form components to get/store/validate value from formdata by name."},{"title":"Form.FieldSet","properties":[{"name":"children","tag":{"cn":"children 不为 function，用来处理 object 类型数据，children 内的 name 会拼接 FieldSet name，如 FieldSet name 为 \\\"a\\\", children 元素name 为 b，children 实际处理的数据为 a.b;\\nchildren 为 function 时，用来处理数组数据。options 属性为\\nlist: name 下的全部数据。\\nvalue: 根据name获取的值的单条数据。\\nonChange: 子组件数据改变回调。\\nonRemove: 子组件删除回调。\\nindex: 当前项索引。\\nonInsert: 在当前项之前插入一条数据。\\nonAppend: 在当前项之后附加一条数据。","en":"When children type is not function, handle a set data type of object\\nWhen children type is function, handle a group of data type of array. options property:\\nlist: all data of name.\\nvalue: a single piece of data for the value obtained by name.\\nonChange: a callback when the value is changing.\\nonRemove: a callback when a child component is removed.\\nindex: the current index.\\nonInsert: Insert a piece of data before the current item.\\nonAppend: Insert a piece of data after the current item.","default":"","version":""},"required":true,"type":"((opts: object) => ReactNode) |ReactNode"},{"name":"defaultValue","tag":{"cn":"默认值","en":"default Value","default":"","version":""},"required":false,"type":"Value[] "},{"name":"rules","tag":{"cn":"校验规则","en":"Validation rules","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"name","tag":{"cn":"从 Form 中存取数据的名称","en":"The name that accesses data from from","default":"","version":""},"required":true,"type":"string"},{"name":"empty","tag":{"cn":"数据为空时展示内容。（仅在children为function时有效）","en":"Show content when data is empty. (only valid when children is function)","default":"","version":""},"required":false,"type":"((onInsert: (value: Value) => void) => ReactNode) "}],"cn":"用来处理 object 类型 字段和数组。","en":"Handle a set(group) data from form by name"},{"title":"Form.Flow","properties":[{"name":"children","tag":{"cn":"datum 为 Datum.Form 对象","en":"datum is the object of Datum.Form.","default":"","version":""},"required":true,"type":"(datum: FormDatum) => ReactNode"},{"name":"names","tag":{"cn":"names 为空时，Form 内任意值变化会触发 Flow 更新；不为空时，只监听指定字段变化","en":"Specifying which fields to change trigger the Flow update.","default":"","version":""},"required":false,"type":"string[] "}],"cn":"","en":""},{"title":"FormRef","isDetail":"true","properties":[{"name":"getValue","tag":{"cn":"返回表单的值","en":"return form value","default":"","version":""},"required":true,"type":"() => Value"},{"name":"validate","tag":{"cn":"校验表单","en":"Validate form","default":"","version":""},"required":true,"type":"() => Promise<any>"},{"name":"validateFields","tag":{"cn":"校验表单指定字段","en":"Validation form fields","default":"","version":""},"required":true,"type":"(fields: string | string[]) => Promise<any>"},{"name":"validateFieldsWithError","tag":{"cn":"校验可以通过 catch 获取报错信息","en":"The verification can get the error message through Promise.catch","default":"","version":""},"required":true,"type":"(fields: string | string[]) => Promise<any>"},{"name":"clearValidate","tag":{"cn":"清除校验","en":"Clear check","default":"","version":""},"required":true,"type":"() => void"},{"name":"submit","tag":{"cn":"提交表单, withValidate: 是否校验","en":"Submit Form, withValidate: Whether to verify","default":"","version":""},"required":true,"type":"(withValidate?: boolean ) => void"},{"name":"reset","tag":{"cn":"重置表单","en":"reset form","default":"","version":""},"required":true,"type":"() => void"}],"cn":"Form 实例的一些方法","en":"Form instance method"}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
