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
    name: '01-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 最基本的用法',
      'Base \n The basic usage'
    ),
    component: require('doc/pages/components/DatePicker/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-01-base.tsx'),

  },
  {
    name: '02-format',
    isTs: true,
    isTest: false,
    title: locate(
      '格式化 \n 传入值可为 日期对象，时间戳，字符串，通过format 属性可以定义返回值的格式. <br />支持通过 formatResult 属性单独格式化值展示格式. <br /><br /> <b>注: 我们使用dayjs格式化 <br /> 详细的请参照 <a href="#heading-3-Format">Format<a>',
      'Format \n The format attribute defines the format of the return value.  <br /><br /> <b>tip: The format string we used (date-fns) and moment.js are inconsistent, such as: <br /> <br /> moment: YYYY  => date-fns: YYYY <br /> moment: DD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; => date-fns: DD <br /> moment: hh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  => date-fns: HH  </b><br /><br /> Please refer to the details <a href="#heading-3-Format">Format<a>'
    ),
    component: require('doc/pages/components/DatePicker/example-02-format.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-02-format.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-02-format.tsx'),

  },
  {
    name: '03-size',
    isTs: true,
    isTest: false,
    title: locate(
      '尺寸 \n 内置了三种尺寸，small、default、large',
      'Size \n There are three built-in size: small、default、large.'
    ),
    component: require('doc/pages/components/DatePicker/example-03-size.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-03-size.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-03-size.tsx'),

  },
  {
    name: '04-day',
    isTs: true,
    isTest: false,
    title: locate(
      '选择天 \n 设置 type 为 date，选择 天',
      'Day Mode \n Set type to be date to select day.'
    ),
    component: require('doc/pages/components/DatePicker/example-04-day.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-04-day.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-04-day.tsx'),

  },
  {
    name: '04-minmax',
    isTs: true,
    isTest: false,
    title: locate(
      '最大最小时间 \n 可以通过设置 min/max 去设置一个选择时间的最大最小值. 推荐在单选且datetime 类型下使用',
      'min max date \n The basic usage'
    ),
    component: require('doc/pages/components/DatePicker/example-04-minmax.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-04-minmax.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-04-minmax.tsx'),

  },
  {
    name: '05-week',
    isTs: true,
    isTest: false,
    title: locate(
      '选择星期 \n 设置 type 为 week，选择星期',
      'Week Mode \n Set type to be week to select week.'
    ),
    component: require('doc/pages/components/DatePicker/example-05-week.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-05-week.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-05-week.tsx'),

  },
  {
    name: '06-a-month',
    isTs: true,
    isTest: false,
    title: locate(
      '选择月 \n 设置 type 为 month，选择月',
      'Month Mode \n Set type to be month to select month.'
    ),
    component: require('doc/pages/components/DatePicker/example-06-a-month.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-06-a-month.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-06-a-month.tsx'),

  },
  {
    name: '06-b-quarter',
    isTs: true,
    isTest: false,
    title: locate(
      '选择季度 \n 设置 type 为 quarter，选择季度',
      'Quarter Mode \n Set type to be quarter to select month.'
    ),
    component: require('doc/pages/components/DatePicker/example-06-b-quarter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-06-b-quarter.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-06-b-quarter.tsx'),

  },
  {
    name: '06-c-year',
    isTs: true,
    isTest: false,
    title: locate(
      '选择年 \n 设置 type 为 year，选择年',
      'Year Mode \n Set type to be year to select year.'
    ),
    component: require('doc/pages/components/DatePicker/example-06-c-year.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-06-c-year.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-06-c-year.tsx'),

  },
  {
    name: '07-a-time',
    isTs: true,
    isTest: false,
    title: locate(
      '选择时间 \n 设置 type 为 time，选择时间，根据 format 自动加载相应的选择列',
      'Time Mode \n Set type to be time to select time and automatically load the corresponding selection column according to the format property.'
    ),
    component: require('doc/pages/components/DatePicker/example-07-a-time.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-07-a-time.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-07-a-time.tsx'),

  },
  {
    name: '07-b-time-step',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 步进设置',
      'Step \n Set step of TimePicker'
    ),
    component: require('doc/pages/components/DatePicker/example-07-b-time-step.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-07-b-time-step.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-07-b-time-step.tsx'),

  },
  {
    name: '08-datetime',
    isTs: true,
    isTest: false,
    title: locate(
      '选择日期时间 \n 设置 type 为 datetime，选择日期 + 时间',
      'Datetime Mode \n Set type to be datetime to select date and time.'
    ),
    component: require('doc/pages/components/DatePicker/example-08-datetime.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-08-datetime.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-08-datetime.tsx'),

  },
  {
    name: '09-range-date',
    isTs: true,
    isTest: false,
    title: locate(
      '范围选择 \n 设置 range 属性可以选择范围，输入和返回的 value 为长度为 2 的数组',
      'Range \n Set the range property to select range, the input value and return value is an array of length 2.'
    ),
    component: require('doc/pages/components/DatePicker/example-09-range-date.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-09-range-date.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-09-range-date.tsx'),

  },
  {
    name: '09-range-month',
    isTs: true,
    isTest: false,
    title: locate(
      '默认月份 \n 设置  defaultRangeMonth 可以设置范围选择的初始面板月份.优先级低于 value 和 defaultValue, 值为时间对象或者时间戳',
      'Range \n Set the range property to select range, the input value and return value is an array of length 2.'
    ),
    component: require('doc/pages/components/DatePicker/example-09-range-month.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-09-range-month.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-09-range-month.tsx'),

  },
  {
    name: '09-single',
    isTs: true,
    isTest: false,
    title: locate(
      '允许单选 \n 可以设置范围选择的时候只选择一侧.',
      'allow single \n can set range select only select single'
    ),
    component: require('doc/pages/components/DatePicker/example-09-single.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-09-single.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-09-single.tsx'),

  },
  {
    name: '09-squick',
    isTs: true,
    isTest: false,
    title: locate(
      '快速选择 \n 可以配置一些快速选择的选项, 日期可以是 Date, 时间戳, 或者字符串,字符串需要和所格式填写的 format 一致',
      'Quick select \n can configure some options for quick selection. The date can be Date, timestamp, or string. The string needs to be in the same format as the format.'
    ),
    component: require('doc/pages/components/DatePicker/example-09-squick.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-09-squick.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-09-squick.tsx'),

  },
  {
    name: '10-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n disabled 为 true 时，禁用整个日期选择。',
      'Disabled \n When the disabled is true, disable all the date selection.'
    ),
    component: require('doc/pages/components/DatePicker/example-10-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-10-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-10-disabled.tsx'),

  },
  {
    name: '11-disabled-date-time',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 同时禁用日期和时间',
      ' \n Disable both special date and special time'
    ),
    component: require('doc/pages/components/DatePicker/example-11-disabled-date-time.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-11-disabled-date-time.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-11-disabled-date-time.tsx'),

  },
  {
    name: '11-disabled-type',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n disabledTime 属性支持单独禁用时间。',
      ' \n The disabledTime attribute supports separate disable time.'
    ),
    component: require('doc/pages/components/DatePicker/example-11-disabled-type.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-11-disabled-type.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-11-disabled-type.tsx'),

  },
  {
    name: '11-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n disabled 为函数时，禁用返回为true的选项, disable 应该用于禁用一些特殊的时间, 如果需要使用比如现在以前的时间不能选择的, 推荐使用 min/max。（注意：如果只想单独禁用时间，可使用 disabledTime 属性。）',
      ' \n When the disabled is a function, disbale should be used to disable some special time, if you need to use such as now before the time can not be selected, it is recommended to use min/max. (Note: If you only want to disable the time alone, you can use the disabledTime attribute.)'
    ),
    component: require('doc/pages/components/DatePicker/example-11-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-11-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-11-disabled.tsx'),

  },
  {
    name: '12-inputable',
    isTs: true,
    isTest: false,
    title: locate(
      '可输入 \n 设置 inputable 使日期可输入',
      'Inputable \n Set inputable to true, you can change the value by input'
    ),
    component: require('doc/pages/components/DatePicker/example-12-inputable.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-12-inputable.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-12-inputable.tsx'),

  },
  {
    name: '13-absolute',
    isTs: true,
    isTest: false,
    title: locate(
      '绝对定位 \n 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。（非必要情况下不建议）',
      'Absolute \n If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer. (not recommended if not necessary)'
    ),
    component: require('doc/pages/components/DatePicker/example-13-absolute.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-13-absolute.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-13-absolute.tsx'),

  },
  {
    name: '14-innertitle',
    isTs: true,
    isTest: false,
    title: locate(
      '内嵌标题 \n 使用 innerTitle 展示内嵌标题',
      'inner title \n -- use innerTitle to display the inner title'
    ),
    component: require('doc/pages/components/DatePicker/example-14-innertitle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-14-innertitle.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-14-innertitle.tsx'),

  },
  {
    name: '15-position',
    isTs: true,
    isTest: false,
    title: locate(
      '弹出框位置 \n 通过设置 position 指定弹出面板的位置。默认为自动',
      'Position \n Set Position can control the different position of DatePicker'
    ),
    component: require('doc/pages/components/DatePicker/example-15-position.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-15-position.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-15-position.tsx'),

  },
  {
    name: '16-timezone',
    isTs: true,
    isTest: false,
    title: locate(
      '时区 \n 设置 timeZone',
      'timeZone \n set timeZone'
    ),
    component: require('doc/pages/components/DatePicker/example-16-timezone.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-16-timezone.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-16-timezone.tsx'),

  },
  {
    name: '17-clearable',
    isTs: true,
    isTest: false,
    title: locate(
      '可清空 \n 允许清空内容',
      'Clearable \n Could be clearable'
    ),
    component: require('doc/pages/components/DatePicker/example-17-clearable.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-17-clearable.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-17-clearable.tsx'),

  },
  {
    name: '18-clearable',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 在清空值时抛出抛出 undefined',
      ' \n onChange get undefined while clear value'
    ),
    component: require('doc/pages/components/DatePicker/example-18-clearable.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-18-clearable.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-18-clearable.tsx'),

  },
  {
    name: '19-default-picker-value',
    isTs: true,
    isTest: false,
    title: locate(
      '面板默认时间 \n 打开面板后的默认时间，仅在未选择日期时生效',
      'DefaultPickerValue \n default date of panel，work under has no value'
    ),
    component: require('doc/pages/components/DatePicker/example-19-default-picker-value.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-19-default-picker-value.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/example-19-default-picker-value.tsx'),

  },
  {
    name: 'test-001-control',
    isTs: true,
    isTest: true,
    title: locate(
      '完全受控 \n 通过封装实现完全受控',
      '完全受控 \n 通过封装实现完全受控'
    ),
    component: require('doc/pages/components/DatePicker/test-001-control.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/test-001-control.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/test-001-control.tsx'),

  },
  {
    name: 'test-002-time-range-max',
    isTs: true,
    isTest: true,
    title: locate(
      'timepicker range max \n timepicker max 和 range 一起使用导致禁用逻辑错误',
      ''
    ),
    component: require('doc/pages/components/DatePicker/test-002-time-range-max.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/test-002-time-range-max.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/test-002-time-range-max.tsx'),

  },
  {
    name: 'test-003-open',
    isTs: true,
    isTest: true,
    title: locate(
      '控制弹层（受控） \n DatePicker 通过 open 控制弹层的显示和隐藏。请注意，将面板设置成常开时，建议同时设置 position 属性，否则面板易遮挡其他内容。',
      'Dropdown list controlled by open property \n The dropdown list of Datepicker controlled by open property'
    ),
    component: require('doc/pages/components/DatePicker/test-003-open.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/test-003-open.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/DatePicker/test-003-open.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"DatePicker","properties":[{"name":"onCollapse","tag":{"cn":"下拉列表展开/收起回调","en":"option list collapse callback","default":"","version":""},"required":false,"type":"((collapse: boolean) => void) "},{"name":"align","tag":{"cn":"值水平排布方式","en":"horizontal align of the value","default":"\\\"center\\\"","version":""},"required":false,"type":"\\\"left\\\" | \\\"center\\\" | \\\"right\\\" "},{"name":"children","tag":{"cn":"额外渲染的节点","en":"extra children","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"placeholder","tag":{"cn":"占位文字。range 属性不为空时，为长度为2的数组","en":"placeholder text. When the range property is not empty, it is an array of length 2.","default":"","version":""},"required":false,"type":"string | string[] "},{"name":"disabled","tag":{"cn":"如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项","en":"When the value is true, disabled all options; When the value is function, disable the options that this function returns true.","default":"false","version":""},"required":false,"type":"boolean | ((date: Date, type?: \\\"start\\\" | \\\"end\\\" , value0?: Date , value1?: Date ) => boolean) "},{"name":"value","tag":{"cn":"值为 string 时，需要和 format 属性匹配。\\n 非 string 会格式化为 string。\\n range 属性为 true 时，值为长度为2的数组","en":"When the value is string, it needs to match the format attribute.\\n When the range property is true, the value is an array of length 2.","default":"","version":""},"required":false,"type":"DateTimeType | DateTimeType[]"},{"name":"onChange","tag":{"cn":"值改变回调函数","en":"a callback when the value is changing","default":"","version":""},"required":false,"type":"((value: Value, quickSelect?: {  name: string, value: Value } | null ) => void) "},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"required":false,"type":"((e?: Error ) => void) "},{"name":"popover","tag":{"cn":"校验信息弹出位置，参考 [Popover](/components/Popover)","en":"The position where the validation info pop up, see [Popover](/components/Popover)","default":"","version":""},"required":false,"type":"PopoverProps[\\\"position\\\"]"},{"name":"filterSameChange","tag":{"cn":"当两次选择的值相同时不触发 onChange","en":"onChange is not triggered when two selected values are the same","default":"false","version":""},"required":false,"type":"boolean "},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "},{"name":"defaultValue","tag":{"cn":"默认值  和 value 类型相同","en":"defaultValue 和 value 类型相同","default":"","version":""},"required":false,"type":"Value "},{"name":"reserveAble","tag":{"cn":"设置为 true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"required":false,"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段, 配合 Form 使用","en":"Form field, used with Form","default":"","version":""},"required":false,"type":"string | string[] "},{"name":"size","tag":{"cn":"不同尺寸","en":"There are three built-in size: small、default、large.","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"onFocus","tag":{"cn":"focus 事件回调","en":"focus event callback","default":"","version":""},"required":false,"type":"(e: any) => void"},{"name":"onBlur","tag":{"cn":"blur 事件回调","en":"blur event callback","default":"","version":""},"required":false,"type":"(e: any) => void"},{"name":"tip","tag":{"cn":"提示信息","en":"Prompt information","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"width","tag":{"cn":"输入框宽度","en":"input width","default":"","version":""},"required":false,"type":"string | number "},{"name":"popoverProps","tag":{"cn":"校验弹框接受的属性，具体属性参考 [Popover](/components/Popover)","en":"Vilidate popup properties, specific properties refer to [Popover](/components/Popover)","default":"","version":""},"required":false,"type":"PopoverProps "},{"name":"underline","tag":{"cn":"是否只展示下边框","en":"only display border bottom","default":"false","version":""},"required":false,"type":"boolean "},{"name":"border","tag":{"cn":"是否展示边框","en":"Whether to display border","default":"false","version":""},"required":false,"type":"boolean "},{"name":"absolute","tag":{"cn":"为 true 时，选项弹出层在 DOM 中独立 render; 为函数时，返回值作为弹出层容器","en":"When it is true, the pop-up layer of option append into document.body; When it is a function, the return value is used as the popup layer container","default":"false","version":""},"required":false,"type":"boolean | (() => HTMLElement) "},{"name":"zIndex","tag":{"cn":"选项列表 z-index 值, 需要配合 absolute","en":"options z-index should use with absolute","default":"1000","version":""},"required":false,"type":"number "},{"name":"innerTitle","tag":{"cn":"内嵌标题","en":"inner title","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"open","tag":{"cn":"控制浮层显隐","en":"Set visible of datepicker popup","default":"","version":""},"required":false,"type":"boolean "},{"name":"clearable","tag":{"cn":"是否显示清除数据图标","en":"If clearable is true, show clear value icon","default":"true","version":""},"required":false,"type":"boolean "},{"name":"position","tag":{"cn":"弹出框位置","en":"Set Position can control the different position of DatePicker","default":"","version":""},"required":false,"type":"\\\"left-top\\\" | \\\"left-bottom\\\" | \\\"right-top\\\" | \\\"right-bottom\\\" "},{"name":"type","tag":{"cn":"时间类型","en":"type of datepicker","default":"\\\"date\\\"","version":""},"required":false,"type":"\\\"date\\\" | \\\"time\\\" | \\\"datetime\\\" | \\\"month\\\" | \\\"week\\\" | \\\"quarter\\\" | \\\"year\\\" "},{"name":"inputable","tag":{"cn":"可输入","en":"Allow enter something into DatePicker","default":"false","version":""},"required":false,"type":"boolean "},{"name":"format","tag":{"cn":"不同type对应的默认值。\\\"date\\\": \\\"YYYY-MM-DD\\\"; \\\"time\\\": \\\"HH:mm:ss\\\"; \\\"week\\\": \\\"GGGG WW\\\"; \\\"month\\\": \\\"YYYY-MM\\\"; \\\"quarter\\\": \\\"YYYY-\\\\[Q]Q\\\";  \\\"year\\\": \\\"YYYY\\\"; \\\"datetime\\\": \\\"YYYY-MM-DD HH:mm:ss\\\"","en":"default values for different types: \\\"date\\\": \\\"YYYY-MM-DD\\\"; \\\"time\\\": \\\"HH:mm:ss\\\"; \\\"week\\\": \\\"GGGG WW\\\"; \\\"month\\\": \\\"YYYY-MM\\\"; \\\"week\\\": \\\"GGGG WW\\\"; \\\"quarter\\\": \\\"YYYY-\\\\[Q]Q\\\"; \\\"year\\\": \\\"YYYY\\\"; \\\"datetime\\\": \\\"YYYY-MM-DD HH:mm:ss\\\"","default":"","version":""},"required":false,"type":"string "},{"name":"formatResult","tag":{"cn":"对选中时间进行格式化","en":"Format the selected time","default":"props.format","version":""},"required":false,"type":"string | ((date: Date) => string) "},{"name":"range","tag":{"cn":"范围跨度，单位 **秒**，为 true 时表示不限制选择范围。","en":"range span，unit: **second**，When it is true, selection scope is not limited.","default":"","version":""},"required":false,"type":"number | boolean "},{"name":"allowSingle","tag":{"cn":"是否允许单选, 仅在 range 模式下有效","en":"allow single select, only in range can set","default":"false","version":""},"required":false,"type":"boolean "},{"name":"defaultTime","tag":{"cn":"选择日期时默认的时间, 格式为: \\\"HH:mm:ss\\\"","en":"Default time when selecting a date, the format is: \\\"HH:mm:ss\\\"","default":"","version":""},"required":false,"type":"DateTimeType | DateTimeType[]"},{"name":"quickSelect","tag":{"cn":"快速选择, 仅在 range 模式下有效, name: 文字提示, value: 时间范围","en":"quick select, only in range can set, name: tip, value: range date","default":"","version":""},"required":false,"type":"{name: string, value: Value}[]"},{"name":"min","tag":{"cn":"可选最小值","en":"option min value","default":"","version":""},"required":false,"type":"Date | number | string "},{"name":"max","tag":{"cn":"可选最大值","en":"option max value","default":"","version":""},"required":false,"type":"Date | number | string "},{"name":"defaultRangeMonth","tag":{"cn":"范围选择的初始月份, 值为时间对象 或者时间戳, 仅在 range 模式下生效, 优先级低于 value 和 defaultValue","en":"The initial month of range selection, the value is a time object, valid only in range mode, and the priority is lower than value and defaultValue","default":"","version":""},"required":false,"type":"(Date | number | string )[] "},{"name":"defaultPickerValue","tag":{"cn":"面板默认时间，在未选择日期时生效","en":"default date of panel，work under has no value","default":"","version":""},"required":false,"type":"Date | number | string  | (Date | number | string )[]"},{"name":"hourStep","tag":{"cn":"小时选项步长","en":"hour step","default":"","version":""},"required":false,"type":"number "},{"name":"minuteStep","tag":{"cn":"分钟选项步长","en":"minute step","default":"","version":""},"required":false,"type":"number "},{"name":"secondStep","tag":{"cn":"秒选项步长","en":"second step","default":"","version":""},"required":false,"type":"number "},{"name":"onPickerChange","tag":{"cn":"值改变回调，有别于 onChange, onPickerChange会在每项值改变的时候执行","en":"value onchange callback (every type of date)","default":"","version":""},"required":false,"type":"((value: DateTimeType | DateTimeType[], quickSelect: void | {  name: string, value: Value } , areaType: \\\"year\\\" | \\\"month\\\" | \\\"week\\\" | \\\"day\\\" | \\\"time\\\" | \\\"quick\\\" | \\\"quarter\\\") => void) "},{"name":"disabledTime","tag":{"cn":"禁用指定 Time。","en":"Disable the specified Time.","default":"","version":""},"required":false,"type":"string | ((time: string) => boolean) "},{"name":"clearWithUndefined","tag":{"cn":"清空值时抛出 undefined","en":"onChange get undefined while clear","default":"false","version":""},"required":false,"type":"boolean "},{"name":"timeZone","tag":{"cn":"设置默认时区,格式为/^([+-]\\\\d{2})$/ 支持 \\\"-12\\\" 到 \\\"+13\\\"","en":"Set the default time zone, the format is /^([+-]\\\\d{2})$/ Support \\\"-12\\\" to \\\"+13\\\"","default":"","version":""},"required":false,"type":"string "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
