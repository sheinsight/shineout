/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Checkbox/cn.md'
import en from 'doc/pages/components/Checkbox/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基本的 Checkbox',
      'Base \n Basic Checkbox'
    ),
    component: require('doc/pages/components/Checkbox/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Checkbox/example-01-base.tsx'),

  },
  {
    name: '02-checked',
    isTs: true,
    isTest: false,
    title: locate(
      '状态 \n checked 有三个值，选中(true)、未选中(false)、半选中(\'indeterminate\')。checked 设置时为受控组件（此示例没有处理 onChange 事件）。',
      'Checked \n The checked has three values: true(checked), false(not checked), \'indeterminate\'(half-checked).'
    ),
    component: require('doc/pages/components/Checkbox/example-02-checked.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-02-checked.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Checkbox/example-02-checked.tsx'),

  },
  {
    name: '03-value',
    isTs: true,
    isTest: false,
    title: locate(
      '选中值 \n 未设置htmlValue的状态下，checkbox选中时返回true，如果设置 htmlValue，返回 htmlValue。未选中状态都是返回 undefined。',
      'Value \n When the htmlValue is set, the checkbox return the htmlValue (checked) and undefined (not checked); \n When the htmlValue is not set, the checkbox selected return true (checked) and undefined (not checked);'
    ),
    component: require('doc/pages/components/Checkbox/example-03-value.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-03-value.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Checkbox/example-03-value.tsx'),

  },
  {
    name: '04-rawgroup',
    isTs: true,
    isTest: false,
    title: locate(
      '一组复选框 \n 一组复选框可以放在 Checkbox.Group 中',
      'Group \n A series of checkboxes group by Checkbox.Group.'
    ),
    component: require('doc/pages/components/Checkbox/example-04-rawgroup.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-04-rawgroup.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Checkbox/example-04-rawgroup.tsx'),

  },
  {
    name: '05-group',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n 可以直接通过数据来渲染一组 Checkbox',
      ' \n Render a group of checkboxes from data.'
    ),
    component: require('doc/pages/components/Checkbox/example-05-group.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-05-group.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Checkbox/example-05-group.tsx'),

  },
  {
    name: '06-format',
    isTs: true,
    isTest: false,
    title: locate(
      '复杂数据 \n 复杂的数据可以使用 format 处理 value',
      'Complex data \n Complex data can use format to process value.'
    ),
    component: require('doc/pages/components/Checkbox/example-06-format.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-06-format.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Checkbox/example-06-format.tsx'),

  },
  {
    name: '08-block',
    isTs: true,
    isTest: false,
    title: locate(
      '垂直布局 \n 默认是水平布局，设置 block 属性可以改为垂直布局',
      'Block \n The default is horizontal layout, and setting the block property can change it to be vertical layout.'
    ),
    component: require('doc/pages/components/Checkbox/example-08-block.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-08-block.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Checkbox/example-08-block.tsx'),

  },
  {
    name: '09-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n 设置 Checkbox.Group 的 disabled 为 true，禁用全部选项',
      'Disabled \n Set the disabled property of Checkbox.Group to true, disable all the checkboxes.'
    ),
    component: require('doc/pages/components/Checkbox/example-09-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-09-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Checkbox/example-09-disabled.tsx'),

  },
  {
    name: '10-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n disabled 为函数时，根据函数结果实现有条件禁用',
      ' \n When the disabled is a function, disbale the option that the function to return true.'
    ),
    component: require('doc/pages/components/Checkbox/example-10-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-10-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Checkbox/example-10-disabled.tsx'),

  },
  {
    name: '11-input',
    isTs: true,
    isTest: false,
    title: locate(
      '带输入 \n 设置 inputable 属性可以显示输入框，返回值为输入框内容',
      'Inputable \n Set the inputable property to true can show the input box and the return value is the value of the input box.'
    ),
    component: require('doc/pages/components/Checkbox/example-11-input.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-11-input.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Checkbox/example-11-input.tsx'),

  },
  {
    name: '12-onClick',
    isTs: true,
    isTest: false,
    title: locate(
      '点击回调 \n 点击选择框后的回调',
      'OnClick \n Checkbox click callback'
    ),
    component: require('doc/pages/components/Checkbox/example-12-onClick.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Checkbox/example-12-onClick.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Checkbox/example-12-onClick.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Checkbox","properties":[{"name":"value","tag":{"en":"If checked is not set, checked status is value === htmlValue","cn":"如果 checked 未设置，checked 状态为 value === htmlValue"},"type":"any"},{"name":"onChange","tag":{"en":"value chane callback","cn":"值改变回调函数"},"type":"(value: any, checked: boolean | \\\"indeterminate\\\", index?: number ) => void"},{"name":"beforeChange","tag":{"en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","cn":"值改变前的回调，当返回值不为空时将作为组件的新值","override":"(value: any , datum?: FormDatum) => any"},"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"en":"rules validation callback","cn":"rules 校验回调"},"type":"(e?: Error ) => void"},{"name":"disabled","tag":{"en":"disable checkbox","cn":"是否禁用","default":"false"},"type":"boolean"},{"name":"bind","tag":{"en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","cn":"当值改变是会联动校验 bind 中的字段, 需要配合Form 使用"},"type":"string[]"},{"name":"defaultValue","tag":{"en":"defaultValue","cn":"默认值","override":"any"},"type":"any"},{"name":"reserveAble","tag":{"en":"If set to true, the form will not automatically delete the data after the component is uninstalled","cn":"设置为true 组件卸载后表单不自动删除数据"},"type":"boolean"},{"name":"rules","tag":{"en":"Validation rules, see Rule usage for details","cn":"校验规则 详见 Rule 用法","override":"RuleItem[]"},"type":"RuleItem[]"},{"name":"name","tag":{"en":"Form field, used with Form","cn":"表单字段,配合 Form 使用"},"type":"string | string[]"},{"name":"size","tag":{"en":"size","cn":"尺寸","default":"\\\"default\\\"","override":"union"},"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"className","tag":{"en":"extend className","cn":"扩展className"},"type":"string"},{"name":"style","tag":{"en":"style object","cn":"内联样式"},"type":"CSSProperties"},{"name":"inputable","tag":{"en":"Show input","cn":"开启后出现输入框","default":"false"},"type":"boolean"},{"name":"children","tag":{"en":"content","cn":"内容"},"type":"ReactNode"},{"name":"checked","tag":{"en":"if not set, use (value === htmlValue).","cn":"checked 传入时为受控组件"},"type":"boolean | \\\"indeterminate\\\" | ((htmlValue: any) => boolean | \\\"indeterminate\\\")"},{"name":"htmlValue","tag":{"en":"Specifies the result","cn":"选中时返回值","default":"true"},"type":"any"},{"name":"onClick","tag":{"en":"Checkbox click callback","cn":"勾选框点击回调","default":"false"},"type":"MouseEventHandler<HTMLInputElement>"}]},{"title":"Checkbox.Group","properties":[{"name":"value","tag":{"en":"In the Form, the value will be taken over by the form and the value will lose efficacy.","cn":"在Form中，value会被表单接管，value无效","override":"any"},"type":"any"},{"name":"onChange","tag":{"en":"值改变回调","cn":"value change callback"},"type":"(value: Value) => void"},{"name":"beforeChange","tag":{"en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","cn":"值改变前的回调，当返回值不为空时将作为组件的新值","override":"(value: any , datum?: FormDatum) => any"},"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"en":"rules validation callback","cn":"rules 校验回调"},"type":"(e?: Error ) => void"},{"name":"disabled","tag":{"en":"When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.","cn":"如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项","default":"false","override":"((data: Item) => boolean) | boolean"},"type":"((data: Item) => boolean) | boolean"},{"name":"bind","tag":{"en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","cn":"当值改变是会联动校验 bind 中的字段, 需要配合Form 使用"},"type":"string[]"},{"name":"defaultValue","tag":{"en":"defaultValue","cn":"默认值","override":"any"},"type":"any"},{"name":"reserveAble","tag":{"en":"If set to true, the form will not automatically delete the data after the component is uninstalled","cn":"设置为true 组件卸载后表单不自动删除数据"},"type":"boolean"},{"name":"rules","tag":{"en":"Validation rules, see Rule usage for details","cn":"校验规则 详见 Rule 用法","override":"RuleItem[]"},"type":"RuleItem[]"},{"name":"name","tag":{"en":"Form field, used with Form","cn":"表单字段,配合 Form 使用"},"type":"string | string[]"},{"name":"className","tag":{"en":"extend className","cn":"扩展className"},"type":"string"},{"name":"style","tag":{"en":"style object","cn":"内联样式"},"type":"CSSProperties"},{"name":"format","tag":{"en":"Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d[format] When it is a function, use its return value.","cn":"格式化 value。 默认值，返回原始数据。 为string时，会作为key从原始数据中获取值，相当于 (d) => d[format]。为函数时，以函数返回结果作为 value。","default":": d => d","override":"ObjectKey<Item> | ((data: Item) => Value extends (infer U)[] ? U : Value)"},"type":"ObjectKey<Item> | ((data: Item) => Value extends (infer U)[] ? U : Value)"},{"name":"children","tag":{"en":"Checkbox instance","cn":"Checkbox 实例"},"type":"ReactNode"},{"name":"separator","tag":{"en":"set with multiple, value will separator by this","cn":"多选情况下设置后，value 会处理为 separator 分隔的字符串。"},"type":"string"},{"name":"prediction","tag":{"en":"By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match","cn":"(val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配","default":"(val, d) => val===format(d)"},"type":"(value: Value extends (infer U)[] ? U : Value, data: DataItem) => boolean"},{"name":"renderItem","tag":{"en":"When it is a string, return d[string]. When it is a function, return the result of the function.","cn":"为 string 时，返回 d[string]。 为 function 时，返回函数结果","default":"d => d"},"type":"ObjectKey<DataItem> | ((data: DataItem, index?: number ) => ReactNode)"},{"name":"keygen","tag":{"en":"Key generator\\nWhen it is true, the data itself is used as the key equivalent to (d => d)\\nWhen it is a function, use its return value.\\nWhen it is a string，ues the value of the string.For example, \\\"id\\\" is the same thing as (d) => d.id.","cn":"生成每一项key的辅助方法\\n为 true 时，以数据项本身作为key，相当于 (d => d)\\n为函数时，使用此函数返回值\\n为string时，使用这个string对应的数据值。如 \\\"id\\\"，相当于 (d => d.id)"},"type":"ObjectKey<DataItem> | ((data: DataItem, index?: number) => KeygenResult) | true"},{"name":"block","tag":{"en":"The default is horizontal layout, and setting the block property can change it to be vertical layout.","cn":"垂直布局","default":"false"},"type":"boolean"},{"name":"data","tag":{"en":"data","cn":"数据项","override":"any[]"},"type":"any[]"}]}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
