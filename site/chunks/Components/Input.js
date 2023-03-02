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

const api = '[{"title":"Input","properties":[{"name":"info","tag":{"en":"Infomation","cn":"提示信息"},"type":"number | ((msg: string) => string)"},{"name":"error","tag":{},"type":"Error"},{"name":"className","tag":{"en":"extend className","cn":"扩展className"},"type":"string"},{"name":"style","tag":{"en":"style object","cn":"内联样式"},"type":"CSSProperties"},{"name":"placeholder","tag":{"en":"Same as the native input tag","cn":"同原生 input 标签的 placeholder"},"type":"string"},{"name":"disabled","tag":{"en":"Disable component","cn":"禁用组件","default":"false"},"type":"boolean"},{"name":"value","tag":{"en":"value","cn":"输入值"},"type":"string"},{"name":"onChange","tag":{"en":"onChange","cn":"值改变回调"},"type":"(value?: string ) => void"},{"name":"beforeChange","tag":{"en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","cn":"值改变前的回调，当返回值不为空时将作为组件的新值","override":"(value: any , datum: FormDatum) => any"},"type":"(value: any , datum: FormDatum) => any"},{"name":"onError","tag":{"en":"rules validation callback","cn":"rules 校验回调"},"type":"(e?: Error ) => void"},{"name":"popover","tag":{"en":"The position where the text pop up","cn":"信息弹出位置"},"type":"| \\\"top-left\\\"\n  | \\\"top\\\"\n  | \\\"top-right\\\"\n  | \\\"left-top\\\"\n  | \\\"left\\\"\n  | \\\"left-bottom\\\"\n  | \\\"right-top\\\"\n  | \\\"right\\\"\n  | \\\"right-bottom\\\"\n  | \\\"bottom-left\\\"\n  | \\\"bottom\\\"\n  | \\\"bottom-right\\\"\n  | \\\"cover\\\""},{"name":"bind","tag":{"en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","cn":"当值改变是会联动校验 bind 中的字段, 需要配合Form 使用"},"type":"string[]"},{"name":"scuSkip","tag":{"inner":"内部属性"},"type":"string[]"},{"name":"defaultValue","tag":{"en":"default value","cn":"默认值"},"type":"string"},{"name":"reserveAble","tag":{"en":"If set to true, the form will not automatically delete the data after the component is uninstalled","cn":"设置为true 组件卸载后表单不自动删除数据"},"type":"boolean"},{"name":"rules","tag":{"en":"Validation rules, see Rule usage for details","cn":"校验规则 详见 Rule 用法","override":"RuleItem[]"},"type":"RuleItem[]"},{"name":"name","tag":{"en":"Form field, used with Form","cn":"表单字段,配合 Form 使用"},"type":"string"},{"name":"forceChangeOnValueSet","tag":{"inner":"内部属性"},"type":"boolean"},{"name":"size","tag":{"en":"size","cn":"尺寸","default":"\\\"default\\\"","override":"union"},"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"onFocus","tag":{"en":"The callback when Textarea focus","cn":"聚焦后的回调"},"type":"FocusEventHandler<Element>"},{"name":"onBlur","tag":{"en":"The callback of blur","cn":"失去焦点后的回调"},"type":"FocusEventHandler<Element>"},{"name":"tip","tag":{"en":"Prompt information","cn":"提示信息"},"type":"ReactNode"},{"name":"width","tag":{"en":"width","cn":"宽度"},"type":"number"},{"name":"popoverProps","tag":{"en":"Vilidate popup properties, specific properties refer to Popover component description","cn":"校验弹框接受的属性，具体属性参考Popover组件说明","type":""},"type":"PopoverProps"},{"name":"underline","tag":{"en":"show border bottom","cn":"仅仅展示下边框","default":"false"},"type":"boolean"},{"name":"autoFocus","tag":{"en":"Whether to automatically get the focus","cn":"是否自动获得焦点","default":"false"},"type":"boolean"},{"name":"border","tag":{"en":"Whether to display border","cn":"是否展示边框","default":"false"},"type":"boolean"},{"name":"delay","tag":{"en":"User input triggers the onChange and to check interval, unit: ms.","cn":"用户输入触发 onChange 和校验间隔时间，单位 毫秒。","default":": 400"},"type":"number"},{"name":"type","tag":{"en":"Same as the type of the native input tag","cn":"同原生 input 标签的 type","default":"\\\"text\\\""},"type":"string"},{"name":"onMouseDown","tag":{},"type":"MouseEventHandler<Element>"},{"name":"onMouseUp","tag":{},"type":"MouseEventHandler<Element>"},{"name":"coin","tag":{"en":"Show as thousands separator, valid only when type is \\\"number\\\"","cn":"以千位分隔符展示,仅当type为number时有效","default":"false"},"type":"boolean"},{"name":"innerTitle","tag":{"en":"inner title","cn":"内嵌标题"},"type":"ReactNode"},{"name":"placeTitle","tag":{"en":"Placeholder title, which needs to be used together with innerTitle","cn":"占位标题，需要配合 innerTitle 一起使用"},"type":"ReactNode"},{"name":"clearable","tag":{"en":"Remove content of the input when clicking the clear icon, clear event function","cn":"可点击清空图标删除输入框内容，为函数式表示清空回调","default":"false"},"type":"boolean | (() => void)"},{"name":"onEnterPress","tag":{"en":"The callback function for enter key","cn":"回车键回调函数"},"type":"(value: string, e?: any) => void"},{"name":"onKeyDown","tag":{"en":"The callback function for key down","cn":"键盘按下回调"},"type":"(e: KeyboardEvent<Element>) => void"},{"name":"onKeyUp","tag":{"en":"The callback function for key up","cn":"键盘按下后抬起的回调"},"type":"(e: KeyboardEvent<Element>) => void"},{"name":"maxLength","tag":{"en":"input max length","cn":"可输入最大长度"},"type":"number"},{"name":"forwardedRef","tag":{"en":"get input element","cn":"获取 input dom 元素"},"type":"(el: HTMLElement) => void"},{"name":"clearToUndefined","tag":{"en":"After clicking the clear button, the data becomes undefined","cn":"点击清除按钮后数据变为 undefined","default":"false"},"type":"boolean"},{"name":"digits","tag":{"en":"Decimal place limit (valid when type is number)","cn":"小数位限制(type 为 number 时生效)"},"type":"number"},{"name":"integerLimit","tag":{"en":"Integer bit limit (valid when type is number)","cn":"整数位数限制, 仅在type = number 下生效"},"type":"number"},{"name":"numType","tag":{"en":"Number type supports \\\"positive\\\" and \\\"non-negative\\\", only works when type = number","cn":"设置数字类型 支持 \\\"positive\\\" 和 \\\"non-negative\\\", 仅在type = number 下生效"},"type":"\\\"positive\\\" | \\\"non-negative\\\""},{"name":"autoSelect","tag":{"en":"Automatically select all data after mouse click","cn":"鼠标点击后自动全选数据","default":"false"},"type":"boolean"},{"name":"autoFix","tag":{"en":"Automatically fill up according to the precision limit of digits after out of focus","cn":"失焦后自动按照 digits 精度限制补足 (type 为 number 时生效)","default":"false"},"type":"boolean"},{"name":"htmlName","tag":{"en":"The original property of html","cn":"原生html属性"},"type":"string"},{"name":"trim","tag":{"en":"When trim is true, blank characters are automatically deleted when lose focus。","cn":"trim 为 true 时，失去焦点时会自动删除空白字符。","default":"false"},"type":"boolean"}]},{"title":"Input.Number","properties":[{"name":"info","tag":{"en":"Infomation","cn":"提示信息"},"type":"number | ((msg: string) => string)"},{"name":"error","tag":{},"type":"Error"},{"name":"className","tag":{"en":"extend className","cn":"扩展className"},"type":"string"},{"name":"style","tag":{"en":"style object","cn":"内联样式"},"type":"CSSProperties"},{"name":"placeholder","tag":{"en":"Same as the native input tag","cn":"同原生 input 标签的 placeholder"},"type":"string"},{"name":"disabled","tag":{"en":"Disable component","cn":"禁用组件","default":"false"},"type":"boolean"},{"name":"value","tag":{"en":"value","cn":"值"},"type":"string | number"},{"name":"onChange","tag":{"en":"onChange","cn":"值改变回调"},"type":"(value?: InputValue | number | null ) => void"},{"name":"beforeChange","tag":{"en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","cn":"值改变前的回调，当返回值不为空时将作为组件的新值","override":"(value: any , datum: FormDatum) => any"},"type":"(value: any , datum: FormDatum) => any"},{"name":"onError","tag":{"en":"rules validation callback","cn":"rules 校验回调"},"type":"(e?: Error ) => void"},{"name":"popover","tag":{"en":"The position where the text pop up","cn":"信息弹出位置"},"type":"| \\\"top-left\\\"\n  | \\\"top\\\"\n  | \\\"top-right\\\"\n  | \\\"left-top\\\"\n  | \\\"left\\\"\n  | \\\"left-bottom\\\"\n  | \\\"right-top\\\"\n  | \\\"right\\\"\n  | \\\"right-bottom\\\"\n  | \\\"bottom-left\\\"\n  | \\\"bottom\\\"\n  | \\\"bottom-right\\\"\n  | \\\"cover\\\""},{"name":"bind","tag":{"en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","cn":"当值改变是会联动校验 bind 中的字段, 需要配合Form 使用"},"type":"string[]"},{"name":"scuSkip","tag":{"inner":"内部属性"},"type":"string[]"},{"name":"defaultValue","tag":{"en":"default value","cn":"默认值"},"type":"string | number"},{"name":"reserveAble","tag":{"en":"If set to true, the form will not automatically delete the data after the component is uninstalled","cn":"设置为true 组件卸载后表单不自动删除数据"},"type":"boolean"},{"name":"rules","tag":{"en":"Validation rules, see Rule usage for details","cn":"校验规则 详见 Rule 用法","override":"RuleItem[]"},"type":"RuleItem[]"},{"name":"name","tag":{"en":"Form field, used with Form","cn":"表单字段,配合 Form 使用"},"type":"string"},{"name":"forceChangeOnValueSet","tag":{"inner":"内部属性"},"type":"boolean"},{"name":"size","tag":{"en":"size","cn":"尺寸","default":"\\\"default\\\"","override":"union"},"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"onFocus","tag":{"en":"The callback when Textarea focus","cn":"聚焦后的回调"},"type":"FocusEventHandler<Element>"},{"name":"onBlur","tag":{"en":"The callback of blur","cn":"失去焦点后的回调"},"type":"FocusEventHandler<Element>"},{"name":"tip","tag":{"en":"Prompt information","cn":"提示信息"},"type":"ReactNode"},{"name":"width","tag":{"en":"width","cn":"宽度"},"type":"number"},{"name":"popoverProps","tag":{"en":"Vilidate popup properties, specific properties refer to Popover component description","cn":"校验弹框接受的属性，具体属性参考Popover组件说明","type":""},"type":"PopoverProps"},{"name":"underline","tag":{"en":"show border bottom","cn":"仅仅展示下边框","default":"false"},"type":"boolean"},{"name":"autoFocus","tag":{"en":"Whether to automatically get the focus","cn":"是否自动获得焦点","default":"false"},"type":"boolean"},{"name":"border","tag":{"en":"Whether to display border","cn":"是否展示边框","default":"false"},"type":"boolean"},{"name":"forceChange","tag":{},"type":"(value: unknown, ...args: unknown[]) => void"},{"name":"cancelChange","tag":{},"type":"() => void"},{"name":"type","tag":{},"type":"string"},{"name":"onMouseDown","tag":{"en":"The callback function for mouse down","cn":"鼠标按下后的回调"},"type":"(e: MouseEvent<Element, MouseEvent>) => void"},{"name":"onMouseUp","tag":{"en":"The callback function for mouse up","cn":"鼠标按下后抬起的回调"},"type":"(e: MouseEvent<Element, MouseEvent>) => void"},{"name":"coin","tag":{"en":"Show as thousands separator, valid only when type is \\\"number\\\"","cn":"以千位分隔符展示,仅当type为number时有效","default":"false"},"type":"boolean"},{"name":"innerTitle","tag":{"en":"inner title","cn":"内嵌标题"},"type":"ReactNode"},{"name":"placeTitle","tag":{"en":"Placeholder title, which needs to be used together with innerTitle","cn":"占位标题，需要配合 innerTitle 一起使用"},"type":"ReactNode"},{"name":"clearable","tag":{"en":"Remove content of the input when clicking the clear icon, clear event function","cn":"可点击清空图标删除输入框内容，为函数式表示清空回调","default":"false"},"type":"boolean | (() => void)"},{"name":"onEnterPress","tag":{"en":"The callback function for enter key","cn":"回车键回调函数"},"type":"(value: string, e?: any) => void"},{"name":"onKeyDown","tag":{"en":"The callback function for key down","cn":"键盘按下回调"},"type":"(e: KeyboardEvent<Element>) => void"},{"name":"onKeyUp","tag":{"en":"The callback function for key up","cn":"键盘按下后抬起的回调"},"type":"(e: KeyboardEvent<Element>) => void"},{"name":"maxLength","tag":{"en":"input max length","cn":"可输入最大长度"},"type":"number"},{"name":"forwardedRef","tag":{"en":"get input element","cn":"获取 input dom 元素"},"type":"(el: HTMLElement) => void"},{"name":"clearToUndefined","tag":{"en":"After clicking the clear button, the data becomes undefined","cn":"点击清除按钮后数据变为 undefined","default":"false"},"type":"boolean"},{"name":"digits","tag":{"en":"Decimal place limit (valid when type is number)","cn":"小数位限制(type 为 number 时生效)"},"type":"number"},{"name":"integerLimit","tag":{"en":"Integer bit limit (valid when type is number)","cn":"整数位数限制, 仅在type = number 下生效"},"type":"number"},{"name":"numType","tag":{"en":"Number type supports \\\"positive\\\" and \\\"non-negative\\\", only works when type = number","cn":"设置数字类型 支持 \\\"positive\\\" 和 \\\"non-negative\\\", 仅在type = number 下生效"},"type":"\\\"positive\\\" | \\\"non-negative\\\""},{"name":"autoSelect","tag":{"en":"Automatically select all data after mouse click","cn":"鼠标点击后自动全选数据","default":"false"},"type":"boolean"},{"name":"autoFix","tag":{"en":"Automatically fill up according to the precision limit of digits after out of focus","cn":"失焦后自动按照 digits 精度限制补足 (type 为 number 时生效)","default":"false"},"type":"boolean"},{"name":"htmlName","tag":{"en":"The original property of html","cn":"原生html属性"},"type":"string"},{"name":"trim","tag":{"en":"When trim is true, blank characters are automatically deleted when lose focus。","cn":"trim 为 true 时，失去焦点时会自动删除空白字符。","default":"false"},"type":"boolean"},{"name":"min","tag":{"en":"The minimum value","cn":"最小值"},"type":"number"},{"name":"max","tag":{"en":"The maximum value","cn":"最大值"},"type":"number"},{"name":"step","tag":{"en":"Change the digital span. It can be decimal.","cn":"改变数字跨度，可为小数","default":"1"},"type":"number"},{"name":"allowNull","tag":{"en":"allow value is null","cn":"清空后值为null","default":"false"},"type":"boolean"},{"name":"hideArrow","tag":{"en":"Whether to hide increase/decrease buttons","cn":"是否隐藏增减按钮","default":"false"},"type":"boolean"}]},{"title":"Input.Password","properties":[{"name":"info","tag":{"en":"Infomation","cn":"提示信息"},"type":"number | ((msg: string) => string)"},{"name":"error","tag":{},"type":"Error"},{"name":"className","tag":{"en":"extend className","cn":"扩展className"},"type":"string"},{"name":"style","tag":{"en":"style object","cn":"内联样式"},"type":"CSSProperties"},{"name":"placeholder","tag":{"en":"Same as the native input tag","cn":"同原生 input 标签的 placeholder"},"type":"string"},{"name":"disabled","tag":{"en":"Disable component","cn":"禁用组件","default":"false"},"type":"boolean"},{"name":"value","tag":{"en":"value","cn":"输入值"},"type":"string"},{"name":"onChange","tag":{"en":"onChange","cn":"值改变回调"},"type":"(value?: string ) => void"},{"name":"beforeChange","tag":{"en":"The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component","cn":"值改变前的回调，当返回值不为空时将作为组件的新值","override":"(value: any , datum: FormDatum) => any"},"type":"(value: any , datum: FormDatum) => any"},{"name":"onError","tag":{"en":"rules validation callback","cn":"rules 校验回调"},"type":"(e?: Error ) => void"},{"name":"popover","tag":{"en":"The position where the text pop up","cn":"信息弹出位置"},"type":"| \\\"top-left\\\"\n  | \\\"top\\\"\n  | \\\"top-right\\\"\n  | \\\"left-top\\\"\n  | \\\"left\\\"\n  | \\\"left-bottom\\\"\n  | \\\"right-top\\\"\n  | \\\"right\\\"\n  | \\\"right-bottom\\\"\n  | \\\"bottom-left\\\"\n  | \\\"bottom\\\"\n  | \\\"bottom-right\\\"\n  | \\\"cover\\\""},{"name":"bind","tag":{"en":"When the value changes, it will link to verify the fields in the bind, which needs to be used with Form","cn":"当值改变是会联动校验 bind 中的字段, 需要配合Form 使用"},"type":"string[]"},{"name":"scuSkip","tag":{"inner":"内部属性"},"type":"string[]"},{"name":"defaultValue","tag":{"en":"default value","cn":"默认值"},"type":"string"},{"name":"reserveAble","tag":{"en":"If set to true, the form will not automatically delete the data after the component is uninstalled","cn":"设置为true 组件卸载后表单不自动删除数据"},"type":"boolean"},{"name":"rules","tag":{"en":"Validation rules, see Rule usage for details","cn":"校验规则 详见 Rule 用法","override":"RuleItem[]"},"type":"RuleItem[]"},{"name":"name","tag":{"en":"Form field, used with Form","cn":"表单字段,配合 Form 使用"},"type":"string"},{"name":"forceChangeOnValueSet","tag":{"inner":"内部属性"},"type":"boolean"},{"name":"size","tag":{"en":"size","cn":"尺寸","default":"\\\"default\\\"","override":"union"},"type":"\\\"small\\\" | \\\"default\\\" | \\\"large\\\""},{"name":"onFocus","tag":{"en":"The callback when Textarea focus","cn":"聚焦后的回调"},"type":"FocusEventHandler<Element>"},{"name":"onBlur","tag":{"en":"The callback of blur","cn":"失去焦点后的回调"},"type":"FocusEventHandler<Element>"},{"name":"tip","tag":{"en":"Prompt information","cn":"提示信息"},"type":"ReactNode"},{"name":"width","tag":{"en":"width","cn":"宽度"},"type":"number"},{"name":"popoverProps","tag":{"en":"Vilidate popup properties, specific properties refer to Popover component description","cn":"校验弹框接受的属性，具体属性参考Popover组件说明","type":""},"type":"PopoverProps"},{"name":"underline","tag":{"en":"show border bottom","cn":"仅仅展示下边框","default":"false"},"type":"boolean"},{"name":"autoFocus","tag":{"en":"Whether to automatically get the focus","cn":"是否自动获得焦点","default":"false"},"type":"boolean"},{"name":"border","tag":{"en":"Whether to display border","cn":"是否展示边框","default":"false"},"type":"boolean"},{"name":"forceChange","tag":{},"type":"(value: unknown, ...args: unknown[]) => void"},{"name":"cancelChange","tag":{},"type":"() => void"},{"name":"type","tag":{"en":"Same as the type of the native input tag","cn":"同原生 input 标签的 type","default":"\\\"text\\\""},"type":"string"},{"name":"coin","tag":{"en":"Show as thousands separator, valid only when type is \\\"number\\\"","cn":"以千位分隔符展示,仅当type为number时有效","default":"false"},"type":"boolean"},{"name":"innerTitle","tag":{"en":"inner title","cn":"内嵌标题"},"type":"ReactNode"},{"name":"placeTitle","tag":{"en":"Placeholder title, which needs to be used together with innerTitle","cn":"占位标题，需要配合 innerTitle 一起使用"},"type":"ReactNode"},{"name":"clearable","tag":{"en":"Remove content of the input when clicking the clear icon, clear event function","cn":"可点击清空图标删除输入框内容，为函数式表示清空回调","default":"false"},"type":"boolean | (() => void)"},{"name":"onEnterPress","tag":{"en":"The callback function for enter key","cn":"回车键回调函数"},"type":"(value: string, e?: any) => void"},{"name":"onKeyDown","tag":{"en":"The callback function for key down","cn":"键盘按下回调"},"type":"(e: KeyboardEvent<Element>) => void"},{"name":"onKeyUp","tag":{"en":"The callback function for key up","cn":"键盘按下后抬起的回调"},"type":"(e: KeyboardEvent<Element>) => void"},{"name":"maxLength","tag":{"en":"input max length","cn":"可输入最大长度"},"type":"number"},{"name":"forwardedRef","tag":{"en":"get input element","cn":"获取 input dom 元素"},"type":"(el: HTMLElement) => void"},{"name":"clearToUndefined","tag":{"en":"After clicking the clear button, the data becomes undefined","cn":"点击清除按钮后数据变为 undefined","default":"false"},"type":"boolean"},{"name":"digits","tag":{"en":"Decimal place limit (valid when type is number)","cn":"小数位限制(type 为 number 时生效)"},"type":"number"},{"name":"integerLimit","tag":{"en":"Integer bit limit (valid when type is number)","cn":"整数位数限制, 仅在type = number 下生效"},"type":"number"},{"name":"numType","tag":{"en":"Number type supports \\\"positive\\\" and \\\"non-negative\\\", only works when type = number","cn":"设置数字类型 支持 \\\"positive\\\" 和 \\\"non-negative\\\", 仅在type = number 下生效"},"type":"\\\"positive\\\" | \\\"non-negative\\\""},{"name":"autoSelect","tag":{"en":"Automatically select all data after mouse click","cn":"鼠标点击后自动全选数据","default":"false"},"type":"boolean"},{"name":"autoFix","tag":{"en":"Automatically fill up according to the precision limit of digits after out of focus","cn":"失焦后自动按照 digits 精度限制补足 (type 为 number 时生效)","default":"false"},"type":"boolean"},{"name":"htmlName","tag":{"en":"The original property of html","cn":"原生html属性"},"type":"string"},{"name":"trim","tag":{"en":"When trim is true, blank characters are automatically deleted when lose focus。","cn":"trim 为 true 时，失去焦点时会自动删除空白字符。","default":"false"},"type":"boolean"},{"name":"point","tag":{"en":"password symbol","cn":"密码符号","default":"\\\".\\\""},"type":"string"}]}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
