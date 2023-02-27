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
      '格式化 \n 传入值可为 日期对象，时间戳，字符串，通过format 属性可以定义返回值的格式. <br />支持通过 formatResult 属性单独格式化值展示格式. <br /><br /> <b>注: 我们使用的格式化字符串(date-fns)和 moment 是不一致的, 如: <br /> <br /> moment: YYYY  => date-fns: yyyy <br /> moment: DD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; => date-fns: dd <br /> moment: hh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  => date-fns: HH  </b><br /><br /> 详细的请参照 <a href="#heading-3-Format">Format<a>',
      'Format \n The format attribute defines the format of the return value.  <br /><br /> <b>tip: The format string we used (date-fns) and moment.js are inconsistent, such as: <br /> <br /> moment: YYYY  => date-fns: yyyy <br /> moment: DD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; => date-fns: dd <br /> moment: hh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  => date-fns: HH  </b><br /><br /> Please refer to the details <a href="#heading-3-Format">Format<a>'
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
    isTs: false,
    isTest: false,
    title: locate(
      ' \n 同时禁用日期和时间',
      ' \n Disable both special date and special time'
    ),
    component: require('doc/pages/components/DatePicker/example-11-disabled-date-time.js').default,
    rawText: require('!raw-loader!doc/pages/components/DatePicker/example-11-disabled-date-time.js'),

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
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
