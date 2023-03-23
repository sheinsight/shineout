/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Radio/cn.md'
import en from 'doc/pages/components/Radio/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n Radio.Group 通过数据来生成一组单选框。',
      'Base \n Radio.Group generate a group of radios from an array.'
    ),
    component: require('doc/pages/components/Radio/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-1-base.tsx'),

  },
  {
    name: '2-group',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 将一组 Radio 放在 Radio.Group 中，以 React 组件方式调用。',
      ' \n A series of radios group by Radio.Group.'
    ),
    component: require('doc/pages/components/Radio/example-2-group.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-2-group.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-2-group.tsx'),

  },
  {
    name: '3-format',
    isTs: true,
    isTest: false,
    title: locate(
      '复杂数据 \n 复杂的数据可以使用 format 处理 value',
      'Complex data \n Complex data can use format to process value.'
    ),
    component: require('doc/pages/components/Radio/example-3-format.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-3-format.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-3-format.tsx'),

  },
  {
    name: '5-block',
    isTs: true,
    isTest: false,
    title: locate(
      '垂直布局 \n 默认为水平布局，设置 block 属性可以改为垂直布局',
      'Vertical layout \n The default is horizontal layout and setting the block property can changed it to be vertical layout.'
    ),
    component: require('doc/pages/components/Radio/example-5-block.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-5-block.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-5-block.tsx'),

  },
  {
    name: '6-button-1',
    isTs: true,
    isTest: false,
    title: locate(
      '按钮样式 \n 设置 button 属性可以展示为按钮样式',
      'Button \n set button to show button style'
    ),
    component: require('doc/pages/components/Radio/example-6-button-1.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-6-button-1.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-6-button-1.tsx'),

  },
  {
    name: '6-button-2',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 设置 button 为 outline 可以展示透明背景的按钮样式',
      ' \n set button with outline to show outline button style'
    ),
    component: require('doc/pages/components/Radio/example-6-button-2.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-6-button-2.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-6-button-2.tsx'),

  },
  {
    name: '6-button-3',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 设置 size 可以控制按钮样式的大小',
      ' \n size to set button style size'
    ),
    component: require('doc/pages/components/Radio/example-6-button-3.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-6-button-3.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-6-button-3.tsx'),

  },
  {
    name: '7-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n 设置 disabled 为 true 时，禁用所有选项',
      'Disabled \n Set disabled property is set to true, all the options is disabled.'
    ),
    component: require('doc/pages/components/Radio/example-7-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-7-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-7-disabled.tsx'),

  },
  {
    name: '8-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n disabled 为函数时，根据函数返回结果实现有条件禁用',
      ' \n When the disabled is a function, disbale the option that the function to return true.'
    ),
    component: require('doc/pages/components/Radio/example-8-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-8-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-8-disabled.tsx'),

  },
  {
    name: '9-toggle',
    isTs: true,
    isTest: false,
    title: locate(
      '支持取消 \n 使用组件形式来支持取消选中',
      'Cancel \n Use component list for toggle radio'
    ),
    component: require('doc/pages/components/Radio/example-9-toggle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Radio/example-9-toggle.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Radio/example-9-toggle.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Radio","properties":[{"name":"children","tag":{"cn":"内容","en":"content","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"checked","tag":{"cn":"checked 传入时为受控组件","en":"if not set, use (value === htmlValue).","default":"","version":""},"required":false,"type":"boolean | \\\"indeterminate\\\""},{"name":"disabled","tag":{"cn":"是否禁用","en":"disable checkbox","default":"false","version":""},"required":false,"type":"boolean "},{"name":"name","tag":{"cn":"表单字段, 配合 Form 使用","en":"Form field, used with Form","default":"","version":""},"required":false,"type":"string "},{"name":"size","tag":{"cn":"尺寸","en":"size","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"default\\\" | \\\"small\\\" | \\\"large\\\""},{"name":"htmlValue","tag":{"cn":"选中时返回值","en":"Specifies the result","default":"true","version":""},"required":false,"type":"any"},{"name":"onClick","tag":{"cn":"勾选框点击回调","en":"Checkbox click callback","default":"","version":""},"required":false,"type":"MouseEventHandler<HTMLInputElement> "}],"cn":"Radio 不能单独使用","en":"Radio cannot be used alone."},{"title":"Radio.Group","properties":[{"name":"button","tag":{"cn":"设置 button 属性可以展示为按钮样式","en":"set button to show button style","default":"","version":""},"required":false,"type":"boolean | \\\"outline\\\" "},{"name":"children","tag":{"cn":"可以传入一组Radio","en":"You can pass in a set of Radio","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"disabled","tag":{"cn":"如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项","en":"When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.","default":"false","version":""},"required":false,"type":"((data: Item) => boolean) | boolean"},{"name":"value","tag":{"cn":"在 Form中，value 会被表单接管，value 无效","en":"In the Form, value is taken over by the Form and the value will be invalid.","default":"","version":""},"required":false,"type":"any"},{"name":"onChange","tag":{"cn":"值改变回调函数","en":"The callback function for changing value","default":"","version":""},"required":false,"type":"(value: Value, Data: DataItem) => void"},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"required":false,"type":"((e?: Error ) => void) "},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "},{"name":"defaultValue","tag":{"cn":"默认值  和 value 类型相同","en":"defaultValue 和 value 类型相同","default":"","version":""},"required":false,"type":"Value "},{"name":"reserveAble","tag":{"cn":"设置为 true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"required":false,"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段, 配合 Form 使用","en":"Form field, used with Form","default":"","version":""},"required":false,"type":"string "},{"name":"size","tag":{"cn":"尺寸","en":"size","default":"","version":""},"required":false,"type":"\\\"default\\\" | \\\"small\\\" | \\\"large\\\""},{"name":"data","tag":{"cn":"数据项","en":"the data items","default":"","version":""},"required":false,"type":"any[]"},{"name":"keygen","tag":{"cn":"生成每一项key的辅助方法\\n为 true 时，以数据项本身作为key，相当于 (d => d)\\n为函数时，使用此函数返回值\\n为string时，使用这个string对应的数据值。如 \\\"id\\\"，相当于 (d => d.id)","en":"Key generator\\nWhen it is true, the data itself is used as the key equivalent to (d => d)\\nWhen it is a function, use its return value.\\nWhen it is a string，ues the value of the string.For example, \\\"id\\\" is the same thing as (d) => d.id.","default":"","version":""},"required":true,"type":"ObjectKey<DataItem> | ((data: DataItem, index?: number) => KeygenResult) | true"},{"name":"renderItem","tag":{"cn":"为 string 时，返回 d\\\\[string]。 为 function 时，返回函数结果","en":"When it is a string, return d\\\\[string]. When it is a function, return the result of the function.","default":"d => d","version":""},"required":false,"type":"ObjectKey<DataItem> | ((data: DataItem, index?: number ) => ReactNode) "},{"name":"prediction","tag":{"cn":"(val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配","en":"By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match","default":"(val, d) => val===format(d)","version":""},"required":false,"type":"((value: Value extends (infer U)[] ? U : Value, data: DataItem) => boolean) "},{"name":"format","tag":{"cn":"格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d\\\\[format]; 为函数时，以函数返回结果作为 value。","en":"Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\\\\[format] When it is a function, use its return value.","default":"d => d","version":""},"required":false,"type":"ObjectKey<DataItem> | ((data: DataItem) => Value extends (infer U)[] ? U : Value) "},{"name":"block","tag":{"cn":"默认为水平布局，设置 block 属性可以改为垂直布局","en":"The default is horizontal layout and setting the block property can changed it to be vertical layout.","default":"","version":""},"required":false,"type":"boolean "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
