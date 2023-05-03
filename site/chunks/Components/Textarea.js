/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Textarea/cn.md'
import en from 'doc/pages/components/Textarea/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 多行文本输入框',
      'Base \n Multi-line text input box'
    ),
    component: require('doc/pages/components/Textarea/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Textarea/example-1-base.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Textarea/example-1-base.tsx'),

  },
  {
    name: '2-autosize',
    isTs: true,
    isTest: false,
    title: locate(
      '自适应高度 \n autosize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可',
      'Autosize \n When the autosize property is true, component will change height to fit the content. Set maxHeight to limit maximum height.'
    ),
    component: require('doc/pages/components/Textarea/example-2-autosize.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Textarea/example-2-autosize.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Textarea/example-2-autosize.tsx'),

  },
  {
    name: '3-info',
    isTs: true,
    isTest: false,
    title: locate(
      '信息 \n 设置 info 为数字, 设定最大长度，用户 focus 时会显示用户已输入文字长度。 \n 如果超出长度， 则会报错. 不会隐藏。',
      'Info \n Set info to number, set the maximum length, and the user\'s focus shows the length of text that the user has entered. \n If the length is exceeded, the error is reported. It is not hidden.'
    ),
    component: require('doc/pages/components/Textarea/example-3-info.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Textarea/example-3-info.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Textarea/example-3-info.tsx'),

  },
  {
    name: '4-custom',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义信息 \n 可以通过设置 info 为函数去自定义提示信息 \n 如果 info 返回类型为 Error，不会隐藏。',
      'Custom Info \n can customize the info by setting info as a function \n if the functio return an Error , the info doesn\'t hide'
    ),
    component: require('doc/pages/components/Textarea/example-4-custom.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Textarea/example-4-custom.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Textarea/example-4-custom.tsx'),

  },
  {
    name: '5-renderFooter',
    isTs: true,
    isTest: false,
    title: locate(
      '渲染底部信息 \n 渲染 textarea footer',
      'RenderFooter \n render textarea footer'
    ),
    component: require('doc/pages/components/Textarea/example-5-renderFooter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Textarea/example-5-renderFooter.tsx'),
    parseTsText: require('!raw-loader!doc/pages/components/Textarea/example-5-renderFooter.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Textarea","properties":[{"name":"info","tag":{"cn":"提示信息","en":"Information","default":"","version":""},"required":false,"type":"number | ((value?: string ) => ReactNode) "},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"disabled","tag":{"cn":"是否禁用","en":"disabled","default":"false","version":""},"required":false,"type":"boolean "},{"name":"value","tag":{"cn":"defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖","en":"DefaultValue and value can be set at the same time and defaultValue will be overridden by value.","default":"","version":""},"required":false,"type":"string "},{"name":"onChange","tag":{"cn":"值改变回调函数","en":"The callback function for changing value","default":"","version":""},"required":false,"type":"(value: string) => void"},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":"","version":""},"required":false,"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":"","version":""},"required":false,"type":"((e?: Error ) => void) "},{"name":"popover","tag":{"cn":"校验信息弹出位置，参考 [Popover](/components/Popover)","en":"The position where the validation info pop up, see [Popover](/components/Popover)","default":"","version":""},"required":false,"type":"PopoverProps[\\\"position\\\"]"},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":"","version":""},"required":false,"type":"string[] "},{"name":"defaultValue","tag":{"cn":"默认值  和 value 类型相同","en":"defaultValue 和 value 类型相同","default":"","version":""},"required":false,"type":"Value "},{"name":"rules","tag":{"cn":"校验规则 详见 [Rule](/components/rule)","en":"Validation rules, see [Rule](/components/rule) usage for details","default":"","version":""},"required":false,"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段, 配合 Form 使用","en":"Form field, used with Form","default":"","version":""},"required":false,"type":"string "},{"name":"size","tag":{"cn":"尺寸","en":"size","default":"\\\"default\\\"","version":""},"required":false,"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"onFocus","tag":{"cn":"focus 事件回调函数","en":"callback function for blur focus","default":"","version":""},"required":false,"type":"FocusEventHandler<Element> "},{"name":"onBlur","tag":{"cn":"失去焦点后的回调","en":"The callback when Textarea blur","default":"","version":""},"required":false,"type":"FocusEventHandler<HTMLTextAreaElement> "},{"name":"tip","tag":{"cn":"提示信息","en":"Prompt information","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"width","tag":{"cn":"输入框宽度","en":"input width","default":"","version":""},"required":false,"type":"string | number "},{"name":"popoverProps","tag":{"cn":"校验弹框接受的属性，具体属性参考 [Popover](/components/Popover)","en":"Vilidate popup properties, specific properties refer to [Popover](/components/Popover)","default":"","version":""},"required":false,"type":"PopoverProps "},{"name":"underline","tag":{"cn":"是否只展示下边框","en":"only display border bottom","default":"false","version":""},"required":false,"type":"boolean "},{"name":"autoFocus","tag":{"cn":"是否自动获得焦点","en":"Whether to automatically get the focus","default":"false","version":""},"required":false,"type":"boolean "},{"name":"border","tag":{"cn":"是否展示边框","en":"Whether to display border","default":"false","version":""},"required":false,"type":"boolean "},{"name":"trim","tag":{"cn":"trim 为 true 时，失去焦点时会自动删除空白字符。","en":"When trim is true, blank characters are automatically deleted when lose focus","default":"false","version":""},"required":false,"type":"boolean "},{"name":"delay","tag":{"cn":"用户输入触发 onChange 和校验间隔时间，单位 毫秒。","en":"User input triggers the onChange and to check interval, unit: ms.","default":"400","version":""},"required":false,"type":"number "},{"name":"maxHeight","tag":{"cn":"输入框的最大高度, 超过之后会出现滚动条","en":"the maxHeight of the textarea, scroll bars appear after more than","default":"","version":""},"required":false,"type":"string | number "},{"name":"renderFooter","tag":{"cn":"渲染 textarea footer","en":"render textarea footer","default":"","version":""},"required":false,"type":"((value?: string ) => ReactNode) "},{"name":"onEnterPress","tag":{"cn":"回车键回调函数","en":"The callback function for enter key","default":"","version":""},"required":false,"type":"((value: string, e: KeyboardEvent<HTMLTextAreaElement>) => void) "},{"name":"autosize","tag":{"cn":"高度是否随内容自动变化","en":"Whether the height changes automatically with the content","default":"false","version":""},"required":false,"type":"boolean "},{"name":"rows","tag":{"cn":"最小行高，同原生 textarea rows 属性","en":"The minimum row height. Same as native textarea rows property.","default":"4","version":""},"required":false,"type":"number "},{"name":"resize","tag":{"cn":"是否可以伸缩高度","en":"support resize","default":"false","version":""},"required":false,"type":"boolean "}],"cn":"支持原生 textarea 所有属性","en":"Supports all attributes of native textarea"}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
