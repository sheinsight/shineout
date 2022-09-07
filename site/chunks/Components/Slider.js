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

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
