/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Input/cn.md'
import en from 'doc/pages/components/Input/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n Input 通常需要和其他的组件配合使用，所以默认的宽度是 100%，默认 display 为 block \n 如果设置了 style.width，默认 display 为 inline-flex',
      'Base \n Input usually needs to be used with other components, so the default width is 100% and the default display is block. \n If the style.width is set, the default display is inline-flex.'
    ),
    component: require('doc/pages/components/Input/example-01-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-01-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-01-base.tsx'),

  },
  {
    name: '02-size',
    isTs: true,
    isTest: false,
    title: locate(
      '大小 \n 提供了三种尺寸的输入框，small、default、large',
      'Size \n There are three size of input, small, default, large.'
    ),
    component: require('doc/pages/components/Input/example-02-size.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-02-size.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-02-size.tsx'),

  },
  {
    name: '03-number',
    isTs: true,
    isTest: false,
    title: locate(
      '数字 \n type 为 number 时，输入时会做一次校验，禁止输入非数字类型字符 \n 设置 digits 属性限制小数位数 \n 设置 integerLimit 属性限制整数位数 \n 设置 numType 来限制格式, 支持 \'positive\' 和 \'non-negative\'',
      'Number \n When type is number, it is forbidden to input non-numeric characters, and the number of decimal places is limited according to the digits property \n set the digits property to limit the number of decimal places \n Set the integerLimit property to limit the number of integer digits \n set numType to limit the format of Number, support \'positive\' and \'non-negative\''
    ),
    component: require('doc/pages/components/Input/example-03-number.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-03-number.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-03-number.tsx'),

  },
  {
    name: '04-number',
    isTs: true,
    isTest: false,
    title: locate(
      ' \n Input.Number 组件，可以通过鼠标和上下键辅助输入',
      ' \n Input.Number component can be assisted by mouse and up and down keyboard.'
    ),
    component: require('doc/pages/components/Input/example-04-number.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-04-number.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-04-number.tsx'),

  },
  {
    name: '05-group',
    isTs: true,
    isTest: false,
    title: locate(
      '组合 \n Icon, span, string, Button 类型可以直接放入 Input.Group 中。需要背景色可以放在 b 标签中。',
      'Group \n The Icon, span, string and Button types can be placed directly into the Input.Group. Use b tag can change the background color.'
    ),
    component: require('doc/pages/components/Input/example-05-group.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-05-group.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-05-group.tsx'),

  },
  {
    name: '06-tip',
    isTs: true,
    isTest: false,
    title: locate(
      '提示文字 \n 在 input 上设置的 tip 在 focus 时弹出',
      'Tip \n The tip set on input pops up when it is focused.'
    ),
    component: require('doc/pages/components/Input/example-06-tip.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-06-tip.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-06-tip.tsx'),

  },
  {
    name: '07-validate',
    isTs: true,
    isTest: false,
    title: locate(
      '校验 \n 设置了 rules，会自动校验输入数据，设置了 popover 会在指定位置弹出 \n 如果没有设置 popover，不会弹出错误提示。 \n 有错误时，提示框不会隐藏。',
      'Validate \n When the rules property is set, it will automatically verify the input data. When the popover property is set, it will pop up at the specified location. \n If the popover property is not set, no error message will pop up. \n If input is invalid, the message will not be hidden.'
    ),
    component: require('doc/pages/components/Input/example-07-validate.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-07-validate.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-07-validate.tsx'),

  },
  {
    name: '08-disabled',
    isTs: true,
    isTest: false,
    title: locate(
      '禁用 \n 设置 disabled 属性禁用组件',
      'Disabled \n Set the disabled property to disable the component.'
    ),
    component: require('doc/pages/components/Input/example-08-disabled.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-08-disabled.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-08-disabled.tsx'),

  },
  {
    name: '09-password',
    isTs: true,
    isTest: false,
    title: locate(
      '密码 \n Input.Password 模拟密码输入框，用来阻止 Chrome 提示记住密码。',
      'Password \n Input.Password is a mock input of type \'password\', used for disable Chrome autofill.'
    ),
    component: require('doc/pages/components/Input/example-09-password.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-09-password.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-09-password.tsx'),

  },
  {
    name: '1-clearable',
    isTs: true,
    isTest: false,
    title: locate(
      '允许删除 \n Input 允许删除',
      'allow clear \n Input allow clear'
    ),
    component: require('doc/pages/components/Input/example-1-clearable.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-1-clearable.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-1-clearable.tsx'),

  },
  {
    name: '1-underline',
    isTs: true,
    isTest: false,
    title: locate(
      '下边框 \n 使用 underline 属性设置仅展示下边框',
      'Underline \n Use the underline property make only the bottom border display'
    ),
    component: require('doc/pages/components/Input/example-1-underline.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-1-underline.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-1-underline.tsx'),

  },
  {
    name: '10-innertitle',
    isTs: true,
    isTest: false,
    title: locate(
      '内嵌标题 \n 使用 innerTitle 展示内嵌标题',
      'inner title \n use innerTitle to display the inner title'
    ),
    component: require('doc/pages/components/Input/example-10-innertitle.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-10-innertitle.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-10-innertitle.tsx'),

  },
  {
    name: '11-autoSelect',
    isTs: true,
    isTest: false,
    title: locate(
      '自动选中 \n 使用 autoSelect 聚焦后自动选中文本',
      'auto select \n Use autoSelect to automatically select text after focusing'
    ),
    component: require('doc/pages/components/Input/example-11-autoSelect.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-11-autoSelect.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-11-autoSelect.tsx'),

  },
  {
    name: '12-trim',
    isTs: false,
    isTest: false,
    title: locate(
      '清除空格 \n trim 为 true 时，失去焦点时会自动删除空白字符。',
      'Clear space \n When trim is true, blank characters are automatically deleted when lose focus'
    ),
    component: require('doc/pages/components/Input/example-12-trim.js').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-12-trim.js'),

  },
  {
    name: '13-keypress',
    isTs: true,
    isTest: false,
    title: locate(
      '键盘事件 \n Input 支持部分键盘按键的事件，在按下按键后触发相应的事件',
      'Keyboard events \n Input supports events for some keyboard keys, which trigger the corresponding event when a key is pressed'
    ),
    component: require('doc/pages/components/Input/example-13-keypress.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-13-keypress.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-13-keypress.tsx'),

  },
  {
    name: '14-limit',
    isTs: true,
    isTest: false,
    title: locate(
      '限制输入 \n Input 支持部分限制输入功能，比如最大值、最小值、最大输入长度。',
      'Limit \n Input supports some rules of Input to limit the inputing, such as maximum, minimum, and maximum Input length.'
    ),
    component: require('doc/pages/components/Input/example-14-limit.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/example-14-limit.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/example-14-limit.tsx'),

  },
  {
    name: 'test-001-blurAndTrim',
    isTs: true,
    isTest: true,
    title: locate(
      'blur trim \n 修复 Form 中 点击提交按钮触发 input blur 的时候由于 delay 导致 form onSubmit 的input数据没有触发trim问题',
      ''
    ),
    component: require('doc/pages/components/Input/test-001-blurAndTrim.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Input/test-001-blurAndTrim.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Input/test-001-blurAndTrim.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Input","properties":[{"name":"value","tag":{"cn":"输入值","en":"value","default":""},"type":"string"},{"name":"onChange","tag":{"cn":"值改变回调","en":"onChange","default":""},"type":"(value?: string ) => void"},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":""},"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":""},"type":"(e?: Error ) => void"},{"name":"popover","tag":{"cn":"信息弹出位置","en":"The position where the text pop up","default":""},"type":"PopoverProps[\\\"position\\\"]"},{"name":"disabled","tag":{"cn":"禁用组件","en":"Disable component","default":"false"},"type":"boolean"},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":""},"type":"string[]"},{"name":"defaultValue","tag":{"cn":"默认值","en":"default value","default":""},"type":"string"},{"name":"reserveAble","tag":{"cn":"设置为true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":""},"type":"boolean"},{"name":"rules","tag":{"cn":"校验规则 详见 Rule 用法","en":"Validation rules, see Rule usage for details","default":""},"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段,配合 Form 使用","en":"Form field, used with Form","default":""},"type":"string"},{"name":"size","tag":{"cn":"尺寸","en":"size","default":"\\\"default\\\""},"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"delay","tag":{"cn":"用户输入触发 onChange 和校验间隔时间，单位 毫秒。","en":"User input triggers the onChange and to check interval, unit: ms.","default":"400"},"type":"number"},{"name":"clearable","tag":{"cn":"可点击清空图标删除输入框内容，为函数式表示清空回调","en":"Remove content of the input when clicking the clear icon, clear event function","default":"false"},"type":"boolean | (() => void)"},{"name":"placeholder","tag":{"cn":"同原生 input 标签的 placeholder","en":"Same as the native input tag","default":""},"type":"string"},{"name":"width","tag":{"cn":"宽度","en":"width","default":""},"type":"number"},{"name":"innerTitle","tag":{"cn":"内嵌标题","en":"inner title","default":""},"type":"ReactNode"},{"name":"placeTitle","tag":{"cn":"占位标题，需要配合 innerTitle 一起使用","en":"Placeholder title, which needs to be used together with innerTitle","default":""},"type":"ReactNode"},{"name":"onBlur","tag":{"cn":"失去焦点后的回调","en":"The callback of blur","default":""},"type":"FocusEventHandler<Element>"},{"name":"onFocus","tag":{"cn":"聚焦后的回调","en":"The callback when Textarea focus","default":""},"type":"FocusEventHandler<Element>"},{"name":"trim","tag":{"cn":"trim 为 true 时，失去焦点时会自动删除空白字符。","en":"When trim is true, blank characters are automatically deleted when lose focus。","default":"false"},"type":"boolean"},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":""},"type":"string"},{"name":"style","tag":{"cn":"内联样式","en":"style object","default":""},"type":"CSSProperties"},{"name":"info","tag":{"cn":"提示信息","en":"Infomation","default":""},"type":"number | ((msg: string) => string)"},{"name":"tip","tag":{"cn":"提示信息","en":"Prompt information","default":""},"type":"ReactNode"},{"name":"popoverProps","tag":{"cn":"校验弹框接受的属性，具体属性参考Popover组件说明","en":"Vilidate popup properties, specific properties refer to Popover component description","default":""},"type":"PopoverProps"},{"name":"underline","tag":{"cn":"仅仅展示下边框","en":"show border bottom","default":"false"},"type":"boolean"},{"name":"autoFocus","tag":{"cn":"是否自动获得焦点","en":"Whether to automatically get the focus","default":"false"},"type":"boolean"},{"name":"border","tag":{"cn":"是否展示边框","en":"Whether to display border","default":"false"},"type":"boolean"},{"name":"type","tag":{"cn":"同原生 input 标签的 type","en":"Same as the type of the native input tag","default":"\\\"text\\\""},"type":"string"},{"name":"coin","tag":{"cn":"以千位分隔符展示,仅当type为number时有效","en":"Show as thousands separator, valid only when type is \\\"number\\\"","default":"false"},"type":"boolean"},{"name":"onEnterPress","tag":{"cn":"回车键回调函数","en":"The callback function for enter key","default":""},"type":"(value: string, e?: any) => void"},{"name":"onKeyDown","tag":{"cn":"键盘按下回调","en":"The callback function for key down","default":""},"type":"(e: KeyboardEvent<Element>) => void"},{"name":"onKeyUp","tag":{"cn":"键盘按下后抬起的回调","en":"The callback function for key up","default":""},"type":"(e: KeyboardEvent<Element>) => void"},{"name":"maxLength","tag":{"cn":"可输入最大长度","en":"input max length","default":""},"type":"number"},{"name":"forwardedRef","tag":{"cn":"获取 input dom 元素","en":"get input element","default":""},"type":"(el: HTMLElement) => void"},{"name":"clearToUndefined","tag":{"cn":"点击清除按钮后数据变为 undefined","en":"After clicking the clear button, the data becomes undefined","default":"false"},"type":"boolean"},{"name":"digits","tag":{"cn":"小数位限制(type 为 number 时生效)","en":"Decimal place limit (valid when type is number)","default":""},"type":"number"},{"name":"integerLimit","tag":{"cn":"整数位数限制, 仅在type = number 下生效","en":"Integer bit limit (valid when type is number)","default":""},"type":"number"},{"name":"numType","tag":{"cn":"设置数字类型 支持 \\\"positive\\\" 和 \\\"non-negative\\\", 仅在type = number 下生效","en":"Number type supports \\\"positive\\\" and \\\"non-negative\\\", only works when type = number","default":""},"type":"\\\"positive\\\" | \\\"non-negative\\\""},{"name":"autoSelect","tag":{"cn":"鼠标点击后自动全选数据","en":"Automatically select all data after mouse click","default":"false"},"type":"boolean"},{"name":"autoFix","tag":{"cn":"失焦后自动按照 digits 精度限制补足 (type 为 number 时生效)","en":"Automatically fill up according to the precision limit of digits after out of focus","default":"false"},"type":"boolean"},{"name":"htmlName","tag":{"cn":"原生html属性","en":"The original property of html","default":""},"type":"string"}],"cn":"","en":""},{"title":"Input.Number","properties":[{"name":"value","tag":{"cn":"值","en":"value","default":""},"type":"string | number"},{"name":"onChange","tag":{"cn":"值改变回调","en":"onChange","default":""},"type":"(value?: InputValue | number | null ) => void"},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":""},"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":""},"type":"(e?: Error ) => void"},{"name":"popover","tag":{"cn":"信息弹出位置","en":"The position where the text pop up","default":""},"type":"PopoverProps[\\\"position\\\"]"},{"name":"disabled","tag":{"cn":"禁用组件","en":"Disable component","default":"false"},"type":"boolean"},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":""},"type":"string[]"},{"name":"defaultValue","tag":{"cn":"默认值","en":"default value","default":""},"type":"string | number"},{"name":"reserveAble","tag":{"cn":"设置为true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":""},"type":"boolean"},{"name":"rules","tag":{"cn":"校验规则 详见 Rule 用法","en":"Validation rules, see Rule usage for details","default":""},"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段,配合 Form 使用","en":"Form field, used with Form","default":""},"type":"string"},{"name":"size","tag":{"cn":"尺寸","en":"size","default":"\\\"default\\\""},"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"clearable","tag":{"cn":"可点击清空图标删除输入框内容，为函数式表示清空回调","en":"Remove content of the input when clicking the clear icon, clear event function","default":"false"},"type":"boolean | (() => void)"},{"name":"placeholder","tag":{"cn":"同原生 input 标签的 placeholder","en":"Same as the native input tag","default":""},"type":"string"},{"name":"width","tag":{"cn":"宽度","en":"width","default":""},"type":"number"},{"name":"innerTitle","tag":{"cn":"内嵌标题","en":"inner title","default":""},"type":"ReactNode"},{"name":"placeTitle","tag":{"cn":"占位标题，需要配合 innerTitle 一起使用","en":"Placeholder title, which needs to be used together with innerTitle","default":""},"type":"ReactNode"},{"name":"onBlur","tag":{"cn":"失去焦点后的回调","en":"The callback of blur","default":""},"type":"FocusEventHandler<Element>"},{"name":"onFocus","tag":{"cn":"聚焦后的回调","en":"The callback when Textarea focus","default":""},"type":"FocusEventHandler<Element>"},{"name":"trim","tag":{"cn":"trim 为 true 时，失去焦点时会自动删除空白字符。","en":"When trim is true, blank characters are automatically deleted when lose focus。","default":"false"},"type":"boolean"},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":""},"type":"string"},{"name":"style","tag":{"cn":"内联样式","en":"style object","default":""},"type":"CSSProperties"},{"name":"min","tag":{"cn":"最小值","en":"The minimum value","default":""},"type":"number"},{"name":"max","tag":{"cn":"最大值","en":"The maximum value","default":""},"type":"number"},{"name":"info","tag":{"cn":"提示信息","en":"Infomation","default":""},"type":"number | ((msg: string) => string)"},{"name":"tip","tag":{"cn":"提示信息","en":"Prompt information","default":""},"type":"ReactNode"},{"name":"popoverProps","tag":{"cn":"校验弹框接受的属性，具体属性参考Popover组件说明","en":"Vilidate popup properties, specific properties refer to Popover component description","default":""},"type":"PopoverProps"},{"name":"underline","tag":{"cn":"仅仅展示下边框","en":"show border bottom","default":"false"},"type":"boolean"},{"name":"autoFocus","tag":{"cn":"是否自动获得焦点","en":"Whether to automatically get the focus","default":"false"},"type":"boolean"},{"name":"border","tag":{"cn":"是否展示边框","en":"Whether to display border","default":"false"},"type":"boolean"},{"name":"onMouseDown","tag":{"cn":"鼠标按下后的回调","en":"The callback function for mouse down","default":""},"type":"(e: MouseEvent<Element, MouseEvent>) => void"},{"name":"onMouseUp","tag":{"cn":"鼠标按下后抬起的回调","en":"The callback function for mouse up","default":""},"type":"(e: MouseEvent<Element, MouseEvent>) => void"},{"name":"coin","tag":{"cn":"以千位分隔符展示,仅当type为number时有效","en":"Show as thousands separator, valid only when type is \\\"number\\\"","default":"false"},"type":"boolean"},{"name":"onEnterPress","tag":{"cn":"回车键回调函数","en":"The callback function for enter key","default":""},"type":"(value: string, e?: any) => void"},{"name":"onKeyDown","tag":{"cn":"键盘按下回调","en":"The callback function for key down","default":""},"type":"(e: KeyboardEvent<Element>) => void"},{"name":"onKeyUp","tag":{"cn":"键盘按下后抬起的回调","en":"The callback function for key up","default":""},"type":"(e: KeyboardEvent<Element>) => void"},{"name":"maxLength","tag":{"cn":"可输入最大长度","en":"input max length","default":""},"type":"number"},{"name":"forwardedRef","tag":{"cn":"获取 input dom 元素","en":"get input element","default":""},"type":"(el: HTMLElement) => void"},{"name":"clearToUndefined","tag":{"cn":"点击清除按钮后数据变为 undefined","en":"After clicking the clear button, the data becomes undefined","default":"false"},"type":"boolean"},{"name":"digits","tag":{"cn":"小数位限制(type 为 number 时生效)","en":"Decimal place limit (valid when type is number)","default":""},"type":"number"},{"name":"integerLimit","tag":{"cn":"整数位数限制, 仅在type = number 下生效","en":"Integer bit limit (valid when type is number)","default":""},"type":"number"},{"name":"numType","tag":{"cn":"设置数字类型 支持 \\\"positive\\\" 和 \\\"non-negative\\\", 仅在type = number 下生效","en":"Number type supports \\\"positive\\\" and \\\"non-negative\\\", only works when type = number","default":""},"type":"\\\"positive\\\" | \\\"non-negative\\\""},{"name":"autoSelect","tag":{"cn":"鼠标点击后自动全选数据","en":"Automatically select all data after mouse click","default":"false"},"type":"boolean"},{"name":"autoFix","tag":{"cn":"失焦后自动按照 digits 精度限制补足 (type 为 number 时生效)","en":"Automatically fill up according to the precision limit of digits after out of focus","default":"false"},"type":"boolean"},{"name":"htmlName","tag":{"cn":"原生html属性","en":"The original property of html","default":""},"type":"string"},{"name":"step","tag":{"cn":"改变数字跨度，可为小数","en":"Change the digital span. It can be decimal.","default":"1"},"type":"number"},{"name":"allowNull","tag":{"cn":"清空后值为null","en":"allow value is null","default":"false"},"type":"boolean"},{"name":"hideArrow","tag":{"cn":"是否隐藏增减按钮","en":"Whether to hide increase/decrease buttons","default":"false"},"type":"boolean"}],"cn":"","en":""},{"title":"Input.Password","properties":[{"name":"value","tag":{"cn":"输入值","en":"value","default":""},"type":"string"},{"name":"onChange","tag":{"cn":"值改变回调","en":"onChange","default":""},"type":"(value?: string ) => void"},{"name":"beforeChange","tag":{"cn":"值改变前的回调，当返回值不为空时将作为组件的新值","en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","default":""},"type":"(value: any , datum?: FormDatum) => any"},{"name":"onError","tag":{"cn":"rules 校验回调","en":"rules validation callback","default":""},"type":"(e?: Error ) => void"},{"name":"popover","tag":{"cn":"信息弹出位置","en":"The position where the text pop up","default":""},"type":"PopoverProps[\\\"position\\\"]"},{"name":"disabled","tag":{"cn":"禁用组件","en":"Disable component","default":"false"},"type":"boolean"},{"name":"bind","tag":{"cn":"当值改变是会联动校验 bind 中的字段, 需要配合Form 使用","en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","default":""},"type":"string[]"},{"name":"defaultValue","tag":{"cn":"默认值","en":"default value","default":""},"type":"string"},{"name":"reserveAble","tag":{"cn":"设置为true 组件卸载后表单不自动删除数据","en":"If set to true, the form will not automatically delete the data after the component is uninstalled","default":""},"type":"boolean"},{"name":"rules","tag":{"cn":"校验规则 详见 Rule 用法","en":"Validation rules, see Rule usage for details","default":""},"type":"RuleItem[]"},{"name":"name","tag":{"cn":"表单字段,配合 Form 使用","en":"Form field, used with Form","default":""},"type":"string"},{"name":"size","tag":{"cn":"尺寸","en":"size","default":"\\\"default\\\""},"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"clearable","tag":{"cn":"可点击清空图标删除输入框内容，为函数式表示清空回调","en":"Remove content of the input when clicking the clear icon, clear event function","default":"false"},"type":"boolean | (() => void)"},{"name":"placeholder","tag":{"cn":"同原生 input 标签的 placeholder","en":"Same as the native input tag","default":""},"type":"string"},{"name":"width","tag":{"cn":"宽度","en":"width","default":""},"type":"number"},{"name":"innerTitle","tag":{"cn":"内嵌标题","en":"inner title","default":""},"type":"ReactNode"},{"name":"placeTitle","tag":{"cn":"占位标题，需要配合 innerTitle 一起使用","en":"Placeholder title, which needs to be used together with innerTitle","default":""},"type":"ReactNode"},{"name":"onBlur","tag":{"cn":"失去焦点后的回调","en":"The callback of blur","default":""},"type":"FocusEventHandler<Element>"},{"name":"onFocus","tag":{"cn":"聚焦后的回调","en":"The callback when Textarea focus","default":""},"type":"FocusEventHandler<Element>"},{"name":"trim","tag":{"cn":"trim 为 true 时，失去焦点时会自动删除空白字符。","en":"When trim is true, blank characters are automatically deleted when lose focus。","default":"false"},"type":"boolean"},{"name":"className","tag":{"cn":"扩展className","en":"extend className","default":""},"type":"string"},{"name":"style","tag":{"cn":"内联样式","en":"style object","default":""},"type":"CSSProperties"},{"name":"info","tag":{"cn":"提示信息","en":"Infomation","default":""},"type":"number | ((msg: string) => string)"},{"name":"tip","tag":{"cn":"提示信息","en":"Prompt information","default":""},"type":"ReactNode"},{"name":"popoverProps","tag":{"cn":"校验弹框接受的属性，具体属性参考Popover组件说明","en":"Vilidate popup properties, specific properties refer to Popover component description","default":""},"type":"PopoverProps"},{"name":"underline","tag":{"cn":"仅仅展示下边框","en":"show border bottom","default":"false"},"type":"boolean"},{"name":"autoFocus","tag":{"cn":"是否自动获得焦点","en":"Whether to automatically get the focus","default":"false"},"type":"boolean"},{"name":"border","tag":{"cn":"是否展示边框","en":"Whether to display border","default":"false"},"type":"boolean"},{"name":"type","tag":{"cn":"同原生 input 标签的 type","en":"Same as the type of the native input tag","default":"\\\"text\\\""},"type":"string"},{"name":"coin","tag":{"cn":"以千位分隔符展示,仅当type为number时有效","en":"Show as thousands separator, valid only when type is \\\"number\\\"","default":"false"},"type":"boolean"},{"name":"onEnterPress","tag":{"cn":"回车键回调函数","en":"The callback function for enter key","default":""},"type":"(value: string, e?: any) => void"},{"name":"onKeyDown","tag":{"cn":"键盘按下回调","en":"The callback function for key down","default":""},"type":"(e: KeyboardEvent<Element>) => void"},{"name":"onKeyUp","tag":{"cn":"键盘按下后抬起的回调","en":"The callback function for key up","default":""},"type":"(e: KeyboardEvent<Element>) => void"},{"name":"maxLength","tag":{"cn":"可输入最大长度","en":"input max length","default":""},"type":"number"},{"name":"forwardedRef","tag":{"cn":"获取 input dom 元素","en":"get input element","default":""},"type":"(el: HTMLElement) => void"},{"name":"clearToUndefined","tag":{"cn":"点击清除按钮后数据变为 undefined","en":"After clicking the clear button, the data becomes undefined","default":"false"},"type":"boolean"},{"name":"digits","tag":{"cn":"小数位限制(type 为 number 时生效)","en":"Decimal place limit (valid when type is number)","default":""},"type":"number"},{"name":"integerLimit","tag":{"cn":"整数位数限制, 仅在type = number 下生效","en":"Integer bit limit (valid when type is number)","default":""},"type":"number"},{"name":"numType","tag":{"cn":"设置数字类型 支持 \\\"positive\\\" 和 \\\"non-negative\\\", 仅在type = number 下生效","en":"Number type supports \\\"positive\\\" and \\\"non-negative\\\", only works when type = number","default":""},"type":"\\\"positive\\\" | \\\"non-negative\\\""},{"name":"autoSelect","tag":{"cn":"鼠标点击后自动全选数据","en":"Automatically select all data after mouse click","default":"false"},"type":"boolean"},{"name":"autoFix","tag":{"cn":"失焦后自动按照 digits 精度限制补足 (type 为 number 时生效)","en":"Automatically fill up according to the precision limit of digits after out of focus","default":"false"},"type":"boolean"},{"name":"htmlName","tag":{"cn":"原生html属性","en":"The original property of html","default":""},"type":"string"},{"name":"point","tag":{"cn":"密码符号","en":"password symbol","default":"\\\".\\\""},"type":"string"}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
