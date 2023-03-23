/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Rate/cn.md'
import en from 'doc/pages/components/Rate/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n Rate 为一个函数，创建一个指定图标或文字的 Rate 组件，供多处复用。',
      'Base \n Rate is a function that creates a new custom Rate component that specifies an icon or text.'
    ),
    component: require('doc/pages/components/Rate/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Rate/example-01-base.tsx'),

  },
  {
    name: '01-half',
    isTs: true,
    isTest: false,
    title: locate(
      '半星 \n Rate 是否允许半星。',
      'Semi selection \n Rate whether to allow semi selection.'
    ),
    component: require('doc/pages/components/Rate/example-01-half.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-01-half.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Rate/example-01-half.tsx'),

  },
  {
    name: '02-color',
    isTs: true,
    isTest: false,
    title: locate(
      '颜色 \n 在创建组件时设置颜色',
      'Icon color \n Set the color when the component is created.'
    ),
    component: require('doc/pages/components/Rate/example-02-color.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-02-color.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Rate/example-02-color.tsx'),

  },
  {
    name: '04-max',
    isTs: true,
    isTest: false,
    title: locate(
      '最大值 \n 通过 max 属性设置选项最大值，默认为 5',
      'Max \n Set the maximum value of the option through the max attribute. The default value is 5.'
    ),
    component: require('doc/pages/components/Rate/example-04-max.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-04-max.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Rate/example-04-max.tsx'),

  },
  {
    name: '05-size',
    isTs: true,
    isTest: false,
    title: locate(
      '大小 \n 通过 size 属性可以设置大小',
      'Size \n Set the size through the size property.'
    ),
    component: require('doc/pages/components/Rate/example-05-size.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-05-size.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Rate/example-05-size.tsx'),

  },
  {
    name: '06-text',
    isTs: true,
    isTest: false,
    title: locate(
      '附加文字 \n text 属性可以为每个选项附加文字',
      'Text \n Set text property to append text to each item.'
    ),
    component: require('doc/pages/components/Rate/example-06-text.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-06-text.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Rate/example-06-text.tsx'),

  },
  {
    name: '07-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '只读 \n 设置 disabled 标示为只读，只读状态下，value可以传入小数',
      'Disabled \n Set disabled to true make it be read-only. When disabled, value can be passed in decimals.'
    ),
    component: require('doc/pages/components/Rate/example-07-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-07-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Rate/example-07-disabled.tsx'),

  },
  {
    name: '08-face',
    isTs: true,
    isTest: false,
    title: locate(
      '分级显示 \n 创建组件时可以使用数组显示不同分数下的选项，这种情况下，不支持带小数的value',
      'Array \n You can use arrays to display items with different scores when creating components. In this case, values with decimals are not supported.'
    ),
    component: require('doc/pages/components/Rate/example-08-face.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-08-face.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Rate/example-08-face.tsx'),

  },
  {
    name: '09-array',
    isTs: true,
    isTest: false,
    title: locate(
      '不重复选项 \n 默认情况下，会重复显示当前分值对应的选项，设置 repeat 属性为 false 可以按分值显示不同选项。',
      'No Repeat \n By default, the item corresponding to the current value is displayed repeatedly. Set repeat property to false to display different item by value.'
    ),
    component: require('doc/pages/components/Rate/example-09-array.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-09-array.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Rate/example-09-array.tsx'),

  },
  {
    name: '10-clearable',
    isTs: true,
    isTest: false,
    title: locate(
      '清除 \n 通过 clearable 属性可以设置再次点击清除 value。',
      'clear \n Set the clearable to clear value when click again.'
    ),
    component: require('doc/pages/components/Rate/example-10-clearable.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Rate/example-10-clearable.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Rate/example-10-clearable.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"RateFunction","subTitle":"(background, front): ReactClass","properties":[{"name":"background","tag":{"cn":"未选中元素背景","en":"Unselected element background","default":"","version":""},"required":true,"type":"ReactElement | string | Array<string | ReactElement>"},{"name":"front","tag":{"cn":"选中元素背景","en":"selected element background","default":"background","version":""},"required":false,"type":"ReactElement | string | Array<string | ReactElement>"}],"cn":"","en":""},{"title":"Rate","properties":[{"name":"value","tag":{"cn":"选中的 key （受控)","en":"Selected key (controlled)","default":"","version":""},"required":false,"type":"number"},{"name":"onChange","tag":{"cn":"值改变回调","en":"value change callback","default":"","version":""},"required":false,"type":"(value: number) => void"},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"required":false,"type":"((e?: Error ) => void) "},{"name":"disabled","tag":{"cn":"是否只读","en":"read-only","default":"false","version":""},"required":false,"type":"boolean "},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "},{"name":"defaultValue","tag":{"cn":"默认值  和 value 类型相同","en":"defaultValue 和 value 类型相同","default":"","version":""},"required":false,"type":"Value "},{"name":"reserveAble","tag":{"cn":"设置为 true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":"","version":""},"required":false,"type":"boolean "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段, 配合 Form 使用","en":"Form field, used with Form","default":"","version":""},"required":false,"type":"string "},{"name":"size","tag":{"cn":"图标大小","en":"the size of the icon","default":"20","version":""},"required":false,"type":"string | number "},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"text","tag":{"cn":"附加文字","en":"Text","default":"","version":""},"required":false,"type":"ReactNode[] "},{"name":"clearable","tag":{"cn":"是否允许再次点击后清除","en":"whether to allow clear when click again","default":"false","version":""},"required":false,"type":"boolean "},{"name":"max","tag":{"cn":"选项最大值，整数","en":"The maximum value of the option, integer","default":"5","version":""},"required":false,"type":"number "},{"name":"allowHalf","tag":{"cn":"是否允许半选","en":"Whether to allow semi selection","default":"false","version":""},"required":false,"type":"boolean "},{"name":"repeat","tag":{"cn":"为 true 时，显示的选项为当前分值对应选项的复制","en":"When repeat is true, display item is a copy of the item corresponding to the current value","default":"true","version":""},"required":false,"type":"boolean "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
