(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[40],{1175:function(e,n,r){"use strict";r.r(n);var t=r(0),s=r.n(t),o=r(562),a=r(563),l=r(579),i=r(40),u=r(1176),c=r.n(u),m=r(1177),g=r.n(m),p=Object(i.b)(c.a,g.a),d=[{name:"locale",isTs:!1,isTest:!1,title:Object(i.b)("",""),component:r(1178).default,rawText:r(1179)}];l.a.start(),l.a.setType("custom"),r(1180),l.a.setType("max"),r(1181),l.a.setType("min"),r(1182),l.a.setType("range"),r(1183),l.a.setType("regExp"),r(1184),l.a.setType("required"),r(1185),l.a.setType("type"),r(1186);var f=l.a.end(),h={custom:{text:r(1187),log:f.custom},max:{text:r(1188),log:f.max},min:{text:r(1189),log:f.min},range:{text:r(1190),log:f.range},regExp:{text:r(1191),log:f.regExp},required:{text:r(1192),log:f.required},type:{text:r(1193),log:f.type}};n.default=Object(o.a)(function(e){return s.a.createElement(a.b,Object.assign({},e,{codes:h,source:p,examples:d}))})},1176:function(e,n){e.exports="# Rule 表单校验规则\n\n<br />\n\n<br />\n\nShineout Form 内部定义了一套数据校验机制，在 Form 内的组件上通过 rules 属性进行配置。\n\n```\n<Input rules={[...rule]}>\n```\n\nrules 是一个数组，每一条包含一个以下格式的配置。\n\n## 规则\n\nrule 共有 5 种格式，按优先级分别为：\n\n- 函数：完全由调用者控制，理论上可以做所有校验。\n  ```\n  /**\n   value - 当前组件值\n   formdata - 表单内所有组件值 \n   callback - 结果回调\n   */ \n  (value, formdata, callback) => {\n    if (/\\d+/.test(value)) callback(true)\n    else callback(new Error('Password at least has one numeral.'))\n  }\n  // 或者返回 Promise，不需要处理 callback\n  (value) => new Promise((resolve, reject) => {\n    if (/\\d+/.test(value)) resolve(true)\n    else reject(new Error('Password at least has one numeral.'))\n  }\n  ```\n- 必填：根据 required 属性是否为 true 判断，非必填时不需填 false。\n  ```\n  { required: true, message: 'Please enter password.' }\n  ```\n\n- 长度：根据 min 或者 max 属性判断。\n  ```\n  { min: 7, message: 'Password must be at least 7 characters.' }\n  ```\n\n- 正则表达式：根据 regExp 来判断，可以是 RegExp 对象或 字符串。\n  ```\n  { regExp: /[a-z]+/i, message: 'Password at least has one letter.' }\n  ```\n\n- 类型：内置了一些常用的正则判断，不满足需求时，可以自定义正则表达式或使用 函数校验。\n  ```\n  { type: 'email', message: 'Please enter a valid email.' }\n  ```\n\n| 属性 | 类型 | 说明 |\n| --- | --- | --- | --- |\n| required | bool | 是否必填 |\n| min | number | 最小值，type 为 'number' 时，判断数值大小，其他类型判断 length |\n| max | number | 最大值，type 为 'number' 时，判断数值大小，其他类型判断 length |\n| regExp | string \\| RegExp | 正则表达式 |\n| type | string | 类型校验，可选值为 \\[ 'email', 'json', 'url', 'hex', 'number' ]，不支持的可以自定义 regExp 校验 |\n| message | string | 错误消息。可以使用 '{key}' 符号进行格式化。key 为当前rule的属性。如 {min: 20, message: '最小值为 {min}'}，会格式化为 '最小值为 20'。 |\n\n## Rule\n\n规则的编写比较繁琐，为了简化用户使用，定义了一个Rule函数，生成一个辅助对象，并内置了一些校验规则，供快速开发。\n\n```\nimport { Rule } from 'shineout'\n\nconst rule = Rule()\n\n<Input rules={[rule.required, rule.min(1)]}>\n```\n\n## 初始化\n\n```\nconst args = { key: { func, message }, ... }\nconst rule = Rule(args)\n```\n\n### 参数\n\nargs 为自定义规则，可为空。\n每个参数为一个对象，key 为返回的 函数名称。每个 value 有两个参数，func 和 message。\n\n#### - func *function(value, formData, callback, props)*\n校验函数\n```\nvalue: 当前 Field 值。\nformData: 当前表单全部数据。\ncallback: 回调函数，func 返回 Promise 时可不调用，否则必须执行。\nprops: 当前 Field 的 props，用来格式化 message。\n```\n\n例：\n\n```\nconst rule = Rule({\n  customRequired: {\n    func: (value, formData, callback, props) => {\n      callback(!!value ? true : new Error(props.title + ' is required.'))\n    }\n  }\n})\n```\n\n#### - message *string || function(props)*\n内置的规则会生成默认校验失败提示文案，如果需要覆盖默认文案，可以在初始化参数中覆盖。\n```\nmessage 为 string 时，返回 message。\nmessage 为 函数时，返回 message(props)，props 为当前 Field props。\n```\n\n例：\n\n```\nconst rule = Rule({\n  required: {\n    message: (props) => `The field ${props.title} is required.`\n  },\n  email: {\n    message: 'Email is invalid.'\n  }\n})\n```\n\n如果传入多个 args 时，会合并处理\n```\nconst funcs = {\n  customRequired: {\n    func: (value, formData, callback, props) => {\n      callback(!!value ? true : new Error(props.title + ' is required.'))\n    }\n  }\n}\nconst messages = {\n  customRequired: {\n    message: 'The field is required.'\n  }\n}\nconst rule = Rule(funcs, messages)\n```\n相当于\n```\nconst rule = Rule({\n  customRequired: {\n    func: (value, formData, callback, props) => {\n      callback(!!value ? true : new Error(props.title + ' is required.'))\n    },\n    message: 'The field is required.'\n  }\n})\n```\n\n通过这种方式可以把自定义的校验规则和语言包分别引入。\n\n### 返回值\n返回对象包含一组函数生成校验规则。每个函数会根据参数生成一条新的规则。\n\n```\nconst rule = Rule()\n\n<Input rules={[rule.required(), rule.min(1)]}>\n// 如果函数没有参数，可以只写函数名称\n<Input rules={[rule.required, rule.min(1)]}>\n```\n\n## 自定义校验\n<code name=\"custom\" />\n\n\n## 内置校验\n\n### required *function(message)*\n必填校验\n#### message|string: 可选\n#### 返回值：object\n\n<code name=\"required\" />\n\n### min *function(len, message)*\n最小值校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项\n#### len|integer: 必填，最小值\n#### message|string: 可选\n#### 返回值：object\n\n<code name=\"min\" />\n\n### max *function(len, message)*\n最大值校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项\n#### len|integer: 必填，最大值\n#### message|string: 可选\n#### 返回值：object\n\n<code name=\"max\" />\n\n### range *function(min, max, message)*\n数值范围校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项\n#### max|integer: 必填，最大值\n#### min|integer: 必填，最小值\n#### message|string: 可选\n#### 返回值：array\n\n<code name=\"range\" />\n\n### type *\\[type](message)*\n#### message|string: 可选\n#### 返回值：object\n内置了常用的类型校验，type可选值为 \\['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb', 'ipv4']\n\n<code name=\"type\" />\n\n### regExp *regExp(reg, message)*\n正则表达式校验\n#### reg|RegExp|string: 必填\n#### message|string: 可选\n#### 返回值：object\n\n<code name=\"regExp\" />\n\n## 内置文案\n\n当前语言内置校验文案如下，可以通过 setLocale 函数替换\n\n```\nimport { setLocale } from 'shineout'\nsetLocale({\n  rules: {\n    required: ...\n    type: ...\n  }\n})\n```\n\n<example name=\"locale\" />"},1177:function(e,n){e.exports="# Rule\n\n<br />\n\n<br />\n\nThe Form implements a set of data validation. That is configured through the rules property on the input component like 'Input, Select, Checkbox, ...'\n\n\n```\n<Input rules={[...rule]}>\n```\n\nrules is an array, each containing a rule with the following format.\n\n- Function:Completely controlled by the caller. you can theoretically do all the checking.\n  ```\n  /**\n   value - Current component value\n   formdata - All values in the form \n   callback - The result of verification\n   */ \n  (value, formdata, callback) => {\n    if (/\\d+/.test(value)) callback(true)\n    else callback(new Error('Password at least has one numeral.'))\n  }\n  // return a Promise，do not call callback\n  (value) => new Promise((resolve, reject) => {\n    if (/\\d+/.test(value)) resolve(true)\n    else reject(new Error('Password at least has one numeral.'))\n  }\n  ```\n\n- Required:Determine whether the required attribute is true or not. false is not required when it is not required.\n  ```\n  { required: true, message: 'Please enter password.' }\n  ```\n\n- Length:Judge by the min or max property.\n  ```\n  { min: 7, message: 'Password must be at least 7 characters.' }\n  ```\n\n- RegExp: Judge by the RegExp. It can be a RegExp object or a string.\n  ```\n  { regExp: /[a-z]+/i, message: 'Password at least has one letter.' }\n  ```\n\n- Type: Some common type validation are built in. \n  ```\n  { type: 'email', message: 'Please enter a valid email.' }\n  ```\n\n\n| Property | Type | Description |\n| --- | --- | --- | --- |\n| required | bool | whether to be required |\n| min | number | The minimum value. When type is 'number', validate the value. Otherwise, validate the value.length.  |\n| max | number | The maximum value. When type is 'number', validate the value. Otherwise, validate the value.length. |\n| regExp | string \\| RegExp | regular expression |\n| type | string | options: \\[ 'email', 'json', 'url', 'hex', 'number' ]. You can customize the regExp validation if it does not support it. |\n| message | string | The error message. You can use the '{key}' symbol to format. Key is a property of the current rule, such as {min: 20, message: 'minimum value is {min}'}, which is formatted as 'minimum value is 20'. |\n\n\n## Rule\n\nRule is a function return an object contains a set of validate function.\n\n```\nimport { Rule } from 'shineout'\n\nconst rule = Rule()\n\n<Input rules={[rule.required, rule.min(1)]}>\n```\n\n## Constructor\n\n```\nconst args = { key: { func, message }, ... }\nconst rule = Rule(args)\n```\n\n### Arguments\n\nThe args is optional.\nEach argument is an object, key is the validate function name. Each value has 2 properties, 'func' and 'message'.\n\n#### - func *function(value, formData, callback, props)*\nvalidate function\n```\nvalue: current field's value.\nformData: all form data.\ncallback: the callback function.\nprops: the props of current field.\n```\n\nexample:\n\n```\nconst rule = Rule({\n  customRequired: {\n    func: (value, formData, callback, props) => {\n      callback(!!value ? true : new Error(props.title + ' is required.'))\n    }\n  }\n})\n```\n\n#### - message *string || function(props)*\nBuilt-in rules use default error text, if you want change the default text, set message to overwrite.\n```\nif message type is string, return message.\nif message type is function，retrun message(props)，props is field's props.\n```\n\nexample：\n\n```\nconst rule = Rule({\n  required: {\n    message: (props) => `The field ${props.title} is required.`\n  },\n  email: {\n    message: 'Email is invalid.'\n  }\n})\n```\n\nMultiple arguments will be merged\n```\nconst funcs = {\n  customRequired: {\n    func: (value, formData, callback, props) => {\n      callback(!!value ? true : new Error(props.title + ' is required.'))\n    }\n  }\n}\nconst messages = {\n  customRequired: {\n    message: 'The field is required.'\n  }\n}\nconst rule = Rule(funcs, messages)\n```\nequivalent of\n```\nconst rule = Rule({\n  customRequired: {\n    func: (value, formData, callback, props) => {\n      callback(!!value ? true : new Error(props.title + ' is required.'))\n    },\n    message: 'The field is required.'\n  }\n})\n```\n\n### Return\n\n```\nconst rule = Rule()\n\n<Input rules={[rule.required(), rule.min(1)]}>\n// if the function has no argument, you can use it with out parentheses.\n<Input rules={[rule.required, rule.min(1)]}>\n```\n\n## Custom Validator\n<code name=\"custom\" />\n\n\n## Built-in Validator\n\n### required *function(message)*\n#### message|string: optional\n#### return: object\n\n<code name=\"required\" />\n\n### min *function(len, message)*\nMinimum check, automatically determines whether the check type is a string, number, or option base on the field type.\n#### len|integer: required\n#### message|string: optional\n#### retrun: object\n\n<code name=\"min\" />\n\n### max *function(len, message)*\nMax check, automatically determines whether the check type is a string, number, or option base on the field type.\n#### len|integer: required\n#### message|string: optional\n#### return: object\n\n<code name=\"max\" />\n\n### range *function(min, max, message)*\nRange check, automatically determines whether the check type is a string, number, or option base on the field type.\n#### min|integer: required\n#### max|integer: required\n#### message|string: optional\n#### return: array\n\n<code name=\"range\" />\n\n### type *\\[type](message)*\nType check, one of \\['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb', 'ipv4']\n#### message|string: optional\n#### return: object\n\n<code name=\"type\" />\n\n### regExp *regExp(reg, message)*\nRegular expression check\n#### reg|RegExp|string: required\n#### message|string: optional\n#### return: object\n\n<code name=\"regExp\" />\n\n## Built-in Text\n\nThe current built-in validation text as follows, which can be replaced by the setLocale function\n\n```\nimport { setLocale } from 'shineout'\nsetLocale({\n  rules: {\n    required: ...\n    type: ...\n  }\n})\n```\n\n<example name=\"locale\" />"},1178:function(e,n,r){"use strict";r.r(n);var t=r(0),s=r.n(t),o=r(36);n.default=function(){return s.a.createElement("pre",null,JSON.stringify(Object(o.a)("rules"),null,2))}},1179:function(e,n){e.exports="import React from 'react'\nimport { getLocale } from 'shineout/locale'\n\nexport default function() {\n  return <pre>{JSON.stringify(getLocale('rules'), null, 2)}</pre>\n}\n"},1180:function(e,n,r){"use strict";r.r(n);var t=r(146),s=Object(t.b)({isExisted:{func:function(e,n,r,t){n.list.includes(e)?r(new Error(t.message.replace("{title}",t.title))):r(!0)},message:"{title} is existed."}});console.log(s.isExisted())},1181:function(e,n,r){"use strict";r.r(n);var t=r(146),s=Object(t.b)();console.log(s.max(100)),console.log(s.max(100,"Nubmer must less than 100."))},1182:function(e,n,r){"use strict";r.r(n);var t=r(146),s=Object(t.b)();console.log(s.min(1)),console.log(s.min(1,"At least select one option."))},1183:function(e,n,r){"use strict";r.r(n);var t=r(146),s=Object(t.b)();console.log(s.range(1,100)),console.log(s.range(1,100,"Nubmer must between 1 - 100."))},1184:function(e,n,r){"use strict";r.r(n);var t=r(146),s=Object(t.b)();console.log(s.regExp("^[\\d\\s ().-]+$")),console.log(s.regExp("^[\\d\\s ().-]+$","Please enter a valid tel."))},1185:function(e,n,r){"use strict";r.r(n);var t=r(146),s=Object(t.b)();console.log(s.required("something wrong."));var o=Object(t.b)({required:{message:"init message."}});console.log(o.required())},1186:function(e,n,r){"use strict";r.r(n);var t=r(146),s=Object(t.b)();console.log(s.email()),console.log(s.email("Email is invalid.")),console.log(s.integer("Please enter a valid age.")),console.log(s.number("Please enter a valid price.")),console.log(s.url("The url is not valid.")),console.log(s.hex("The color is not valid."))},1187:function(e,n){e.exports="import { Rule } from 'shineout'\n\nconst rule = Rule({\n  isExisted: {\n    func: (value, formData, callback, props) => {\n      if (formData.list.includes(value)) {\n        callback(new Error(props.message.replace('{title}', props.title)))\n      } else {\n        callback(true)\n      }\n    },\n    message: '{title} is existed.',\n  },\n})\nconsole.log(rule.isExisted())\n"},1188:function(e,n){e.exports="import { Rule } from 'shineout'\n\nconst rule = Rule()\nconsole.log(rule.max(100))\nconsole.log(rule.max(100, 'Nubmer must less than 100.'))\n"},1189:function(e,n){e.exports="import { Rule } from 'shineout'\n\nconst rule = Rule()\nconsole.log(rule.min(1))\nconsole.log(rule.min(1, 'At least select one option.'))\n"},1190:function(e,n){e.exports="import { Rule } from 'shineout'\n\nconst rule = Rule()\nconsole.log(rule.range(1, 100))\nconsole.log(rule.range(1, 100, 'Nubmer must between 1 - 100.'))\n"},1191:function(e,n){e.exports="import { Rule } from 'shineout'\n\nconst rule = Rule()\nconsole.log(rule.regExp('^[\\\\d\\\\s ().-]+$'))\nconsole.log(rule.regExp('^[\\\\d\\\\s ().-]+$', 'Please enter a valid tel.'))\n"},1192:function(e,n){e.exports="import { Rule } from 'shineout'\n\nconst rule = Rule()\nconsole.log(rule.required('something wrong.'))\n\nconst rule2 = Rule({\n  required: {\n    message: 'init message.',\n  },\n})\nconsole.log(rule2.required())\n"},1193:function(e,n){e.exports="import { Rule } from 'shineout'\n\nconst rule = Rule()\nconsole.log(rule.email())\nconsole.log(rule.email('Email is invalid.'))\nconsole.log(rule.integer('Please enter a valid age.'))\nconsole.log(rule.number('Please enter a valid price.'))\nconsole.log(rule.url('The url is not valid.'))\nconsole.log(rule.hex('The color is not valid.'))\n"},579:function(e,n,r){"use strict";var t=r(4),s=r(5),o=window.console,a=function(){function e(){Object(t.a)(this,e),this.logs={default:[]},this.current=this.logs.default}return Object(s.a)(e,[{key:"setType",value:function(e){this.logs[e]||(this.logs[e]=[]),this.current=this.logs[e]}},{key:"log",value:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var t=n.map(function(e){return"".concat((n=e,JSON.stringify(n,function(e,n){return"function"==typeof n?"fn#fn".concat(n.toString(),"fn#fn"):n},2)));var n});this.current.push(t)}}]),e}();n.a={start:function(){window.console=new a},setType:function(e){window.console.setType(e)},end:function(){var e=window.console.logs;return window.console=o,e}}}}]);