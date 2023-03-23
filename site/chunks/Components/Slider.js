/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Slider/cn.md'
import en from 'doc/pages/components/Slider/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 最基本的用法',
      'Base \n The basic usage.'
    ),
    component: require('doc/pages/components/Slider/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Slider/example-01-base.tsx'),

  },
  {
    name: '01-input',
    isTs: true,
    isTest: false,
    title: locate(
      '带输入框 \n 和 数组输入框 保持同步',
      'Input \n change with number input'
    ),
    component: require('doc/pages/components/Slider/example-01-input.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-01-input.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Slider/example-01-input.tsx'),

  },
  {
    name: '02-range',
    isTs: true,
    isTest: false,
    title: locate(
      '范围选择 \n 设置 range 属性显示为双滑块，输入(返回)值为长度为 2 的数组',
      'Range \n Set the range property to display double sliders, and value is an array of length 2.'
    ),
    component: require('doc/pages/components/Slider/example-02-range.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-02-range.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Slider/example-02-range.tsx'),

  },
  {
    name: '03-scale',
    isTs: true,
    isTest: false,
    title: locate(
      '区间 \n 设置 scale 属性可以自定义区间。',
      'Scale \n Set the scale property to customize the interval.'
    ),
    component: require('doc/pages/components/Slider/example-03-scale.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-03-scale.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Slider/example-03-scale.tsx'),

  },
  {
    name: '04-format',
    isTs: true,
    isTest: false,
    title: locate(
      '格式化 \n 通过 formatScale 属性自定义刻度显示信息 \n 通过 formatValue 属性自定义值显示信息',
      'Format \n Set the formatScale property to customize the display scale. \n Set the formatValue property to customize the display value.'
    ),
    component: require('doc/pages/components/Slider/example-04-format.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-04-format.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Slider/example-04-format.tsx'),

  },
  {
    name: '05-step',
    isTs: true,
    isTest: false,
    title: locate(
      '步长 \n 设置 step 属性，定义拖动的步长，默认为 1',
      'Step \n Set the step property to define the step size of the drag and the default value is 1.'
    ),
    component: require('doc/pages/components/Slider/example-05-step.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-05-step.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Slider/example-05-step.tsx'),

  },
  {
    name: '06-step',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n step 设定为 0 时，只能取 scale 内定义的值',
      ' \n When the step is set to 0, only the value defined in scale can be taken.'
    ),
    component: require('doc/pages/components/Slider/example-06-step.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-06-step.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Slider/example-06-step.tsx'),

  },
  {
    name: '07-hide',
    isTs: true,
    isTest: false,
    title: locate(
      '隐藏信息 \n autoHide 选项为 true 时，自动隐藏当前值和刻度',
      'Hide value \n When then autoHide property is true, automatically hide current values and scales.'
    ),
    component: require('doc/pages/components/Slider/example-07-hide.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-07-hide.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Slider/example-07-hide.tsx'),

  },
  {
    name: '08-hide',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 如果要彻底不显示刻度和当前值，设置 formatValue 和 fotmatScale 为 false',
      ' \n Set formatValue and fotmatScale to false to hide the scale and current values completely.'
    ),
    component: require('doc/pages/components/Slider/example-08-hide.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-08-hide.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Slider/example-08-hide.tsx'),

  },
  {
    name: '09-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n 设置 disabled 属性，禁用组件',
      'Disabled \n Set the disabled property to disable the component.'
    ),
    component: require('doc/pages/components/Slider/example-09-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-09-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Slider/example-09-disabled.tsx'),

  },
  {
    name: '10-vertical',
    isTs: true,
    isTest: false,
    title: locate(
      '垂直 \n 设置 vertical 属性，修改组件为垂直方向',
      'Vertical \n Set the vertical property to change the component vertical.'
    ),
    component: require('doc/pages/components/Slider/example-10-vertical.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-10-vertical.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Slider/example-10-vertical.tsx'),

  },
  {
    name: '11-increase',
    isTs: true,
    isTest: false,
    title: locate(
      '增长 \n 允许拖动到最右边的时候进行增长',
      'onIncrease \n can increase the maximum infinitely while dragging'
    ),
    component: require('doc/pages/components/Slider/example-11-increase.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Slider/example-11-increase.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Slider/example-11-increase.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Slider","properties":[{"name":"value","tag":{"cn":"当前值","en":"current value","default":"","version":""},"required":false,"type":"number | number[]"},{"name":"onChange","tag":{"cn":"值改变时回调函数","en":"The callback function when the value is changing.","default":"","version":""},"required":false,"type":"(value: Value) => void"},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"required":false,"type":"((e?: Error ) => void) "},{"name":"disabled","tag":{"cn":"是否禁用组件","en":"Disable component","default":"false","version":""},"required":false,"type":"boolean "},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "},{"name":"defaultValue","tag":{"cn":"默认值","en":"default value","default":"","version":""},"required":false,"type":"Value "},{"name":"reserveAble","tag":{"cn":"设置为 true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"required":false,"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段, 配合 Form 使用","en":"Form field, used with Form","default":"","version":""},"required":false,"type":"string "},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"height","tag":{"cn":"高度，仅在 vertical 为 true 情况下有效","en":"height. Only effect when vertical is true","default":"200","version":""},"required":false,"type":"number "},{"name":"range","tag":{"cn":"是否显示双滑块","en":"Whether to display double slider","default":"false","version":""},"required":false,"type":"boolean "},{"name":"vertical","tag":{"cn":"是否垂直","en":"Whether to be vertical","default":"false","version":""},"required":false,"type":"boolean "},{"name":"step","tag":{"cn":"步长，必须大于等于0；为0时，只能选取 scale 指定的值","en":"Step size. Must be greater than or equal to 0; When it is 0, only the value specified by scale can be selected.","default":"1","version":""},"required":false,"type":"number "},{"name":"autoHide","tag":{"cn":"是否自动隐藏当前值和刻度","en":"Automatically hides the current value and scale","default":"false","version":""},"required":false,"type":"boolean "},{"name":"formatScale","tag":{"cn":"格式化显示刻度，为 false 时，不显示刻度","en":"Format displayed scale. When it is false, the scale is not displayed.","default":"v => v","version":""},"required":false,"type":"false | ((value: number, index?: number ) => string | number) "},{"name":"formatValue","tag":{"cn":"格式化显示当前值，为 false 时，不显示当前值","en":"Format displayed current value. When it is false, the current value is not displayed.","default":"v => v","version":""},"required":false,"type":"false | ((value: number) => string) "},{"name":"scale","tag":{"cn":"取值范围，长度 >= 2 的数组","en":"Value range. An array whose length is greater than 2.","default":"[0, 100]","version":""},"required":false,"type":"number[] "},{"name":"onIncrease","tag":{"cn":"拖动超过最大值事件","en":"Drag over the maximum event","default":"","version":""},"required":false,"type":"(() => void) "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
