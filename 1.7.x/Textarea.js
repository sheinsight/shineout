(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[50],{1078:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(557),i=n(559),s=n(40),u=n(1079),l=n.n(u),h=n(1080),c=n.n(h),f=Object(s.b)(l.a,c.a),m=[{name:"1-base",title:Object(s.b)("基本用法 \n 多行文本输入框","Base \n Multi-line text input box"),component:n(1081).default,rawText:n(1082)},{name:"2-autosize",title:Object(s.b)("自适应高度 \n autosize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可","Autosize \n When the autosize property is true, component will change height to fit the content. Set maxHeight to limit maximum height."),component:n(1083).default,rawText:n(1084)},{name:"3-info",title:Object(s.b)("信息 \n 设置 info 为数字, 设定最大长度，用户 focus 时会显示用户已输入文字长度。 \n 如果超出长度， 则会报错. 不会隐藏。","Info \n Set info to number, set the maximum length, and the user's focus shows the length of text that the user has entered. \n If the length is exceeded, the error is reported. It is not hidden."),component:n(1085).default,rawText:n(1086)},{name:"4-custom",title:Object(s.b)("自定义信息 \n 可以通过设置 info 为函数去自定义提示信息 \n 如果 info 返回类型为 Error，不会隐藏。","Custom Info \n can customize the info by setting info as a function \n if the functio return an Error , the info doesn't hide"),component:n(1087).default,rawText:n(1088)}];t.default=Object(r.a)(function(e){return o.a.createElement(i.b,Object.assign({},e,{codes:void 0,source:f,examples:m}))})},1079:function(e,t){e.exports="# Textarea *多行文本框*\n\n<example />\n\n## API\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| autosize | boolean | false | 高度是否随内容自动变化 |\n| defaultValue | string \\| number | | 默认值 |\n| delay | number | 400 | 用户输入触发 onChange 和校验间隔时间，单位 毫秒。|\n| info | (value: string) => string \\| number | 无 | 提示信息 |\n| name | string | 无 | Form 存取数据的名称 |\n| onChange | (value: string) => void | | 值改变回调函数 |\n| onEnterPress | (value: string) => void | | 回车键回调函数 |\n| placeholder | string | | 同原生 input 标签的 placeholder |\n| popover | 'top-left' \\| 'top' \\| 'top-right' \\| 'bottom-left' \\| 'bottom' \\| 'bottom-right' | | 信息弹出位置 |\n| rows | number | 4 | 最小行高，同原生 textarea rows 属性 |\n| maxHeight | number \\| string | 无 | 输入框的最大高度, 超过之后会出现滚动条 | \n| style | object | 无 | 最外层扩展样式 |\n| trim | boolean | false | trim 为 true 时，失去焦点时会自动删除空白字符。 |\n| resize | boolean | false | 是否可以伸缩高度 |\n| value | string \\| number | | defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖<br />在Form中，value会被表单接管，value无效 |\n| underline | boolean | false | 是否只展示下边框 |\n"},1080:function(e,t){e.exports="# Textarea\n\n<example />\n\n## API\n\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| autosize | boolean | false | Whether the height changes automatically with the content |\n| defaultValue | string \\| number | | default value |\n| delay | number | 400 | User input triggers onChange and to check interval, unit: ms.|\n| info | (value: string) => string \\| number | - | Infomation |\n| name | string | none | The name that accesses data from Form |\n| onChange | (value: string) => void | | The callback function for changing value |\n| onEnterPress | (value: string) => void | | The callback function for enter key |\n| placeholder | string | | The same as the native placeholder tag. |\n| popover | 'top-left' \\| 'top' \\| 'top-right' \\| 'bottom-left' \\| 'bottom' \\| 'bottom-right' | | The position where the message pops up |\n| rows | number | 4 | The minimum row height. Same as native textarea rows property. |\n| maxHeight | number \\| string | - | the maxHeight of the textarea, scroll bars appear after more than | \n| style | object | - | Container element style |\n| trim | boolean | false | When trim is true, blank characters are automatically deleted when lose focus。 |\n| resize | boolean | false | support resize |\n| value | string \\| number | | DefaultValue and value can be set at the same time and defaultValue will be overridden by value. <br />In the Form, the value is taken over by the Form and lose efficacy. |\n| underline | boolean | false | only display border bottom  |\n"},1081:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(302);t.default=function(){return o.a.createElement(r.a,{rows:6,placeholder:"input something"})}},1082:function(e,t){e.exports="/**\n * cn - 基本用法\n *    -- 多行文本输入框\n * en - Base\n *    -- Multi-line text input box\n */\nimport React from 'react'\nimport { Textarea } from 'shineout'\n\nexport default function() {\n  return <Textarea rows={6} placeholder=\"input something\" />\n}\n"},1083:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(302);t.default=function(){return o.a.createElement("div",null,o.a.createElement(r.a,{rows:2,autosize:!0,maxHeight:200,placeholder:"autosize"}),o.a.createElement("br",null),o.a.createElement(r.a,{rows:2,autosize:!0,value:"a\nu\nt\no\ns\ni\nz\ne",maxHeight:200,placeholder:"autosize"}))}},1084:function(e,t){e.exports="/**\n * cn - 自适应高度\n *    -- autosize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可\n * en - Autosize\n *    -- When the autosize property is true, component will change height to fit the content. Set maxHeight to limit maximum height.\n */\nimport React from 'react'\nimport { Textarea } from 'shineout'\n\nconst text = `a\nu\nt\no\ns\ni\nz\ne`\n\nexport default function () {\n  return (\n    <div>\n      <Textarea rows={2} autosize maxHeight={200} placeholder=\"autosize\" />\n      <br />\n      <Textarea rows={2} autosize value={text} maxHeight={200} placeholder=\"autosize\" />\n    </div>\n  )\n}\n"},1085:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(302);t.default=function(){return o.a.createElement(r.a,{rows:4,trim:!0,placeholder:"input something",info:10})}},1086:function(e,t){e.exports="/**\n * cn - 信息\n *    -- 设置 info 为数字, 设定最大长度，用户 focus 时会显示用户已输入文字长度。\n *    -- 如果超出长度， 则会报错. 不会隐藏。\n * en - Info\n *    -- Set info to number, set the maximum length, and the user's focus shows the length of text that the user has entered.\n *    -- If the length is exceeded, the error is reported. It is not hidden.\n */\nimport React from 'react'\nimport { Textarea } from 'shineout'\n\nexport default function() {\n  return <Textarea rows={4} trim placeholder=\"input something\" info={10} />\n}\n"},1087:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(302),i=function(e){if(!e||0===e.length)return null;var t="total is  ".concat(e.length);return e.length<=20?t:new Error(t)};t.default=function(){return o.a.createElement(r.a,{rows:4,trim:!0,placeholder:"input something",info:i})}},1088:function(e,t){e.exports="/**\n * cn - 自定义信息\n *    -- 可以通过设置 info 为函数去自定义提示信息\n *     -- 如果 info 返回类型为 Error，不会隐藏。\n * en - Custom Info\n *    -- can customize the info by setting info as a function\n *    -- if the functio return an Error , the info doesn't hide\n */\nimport React from 'react'\nimport { Textarea } from 'shineout'\n\nconst renderInfo = value => {\n  if (!value || value.length === 0) return null\n  const text = `total is  ${value.length}`\n  if (value.length <= 20) return text\n  return new Error(text)\n}\n\nexport default function() {\n  return <Textarea rows={4} trim placeholder=\"input something\" info={renderInfo} />\n}\n"},302:function(e,t,n){"use strict";var a=n(21),o=n(187),r=n(188),i=n(59),s=n(80),l=n(15),u=n(4),h=n(5),c=n(1),f=n(23),m=n(6),p=n(7),d=n(2),b=n(0),g=n.n(b),v=n(17),x=n(36),w=n(191);function y(a){return function(){var e,t=Object(d.a)(a);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var n=Object(d.a)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Object(p.a)(this,e)}}var z=function(e){Object(m.a)(n,e);var t=y(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).defaultInfo=function(e){if(!e||0===e.length)return null;var t=a.props.info,n="".concat(e.length," / ").concat(t);return e.length<=t?n:new Error(n)},a.state={height:0},a.bindShadow=a.bindShadow.bind(Object(c.a)(a)),a.handleBlur=a.handleBlur.bind(Object(c.a)(a)),a.handleChange=a.handleChange.bind(Object(c.a)(a)),a.handleKeyUp=a.handleKeyUp.bind(Object(c.a)(a)),a.resize=a.resize.bind(Object(c.a)(a)),a.defaultInfo=a.defaultInfo.bind(Object(c.a)(a)),a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){Object(f.a)(Object(d.a)(n.prototype),"componentDidMount",this).call(this),this.props.autosize&&this.resize()}},{key:"componentDidUpdate",value:function(e){this.props.autosize&&e.value!==this.props.value&&this.resize(this.props.value)}},{key:"bindShadow",value:function(e){this.shadow=e}},{key:"resize",value:function(e){(e||""===e)&&(this.shadow.value=e);var t=this.shadow?this.shadow.scrollHeight:0;this.setState({height:t})}},{key:"handleChange",value:function(e){this.props.onChange(e.target.value),this.props.autosize&&this.resize(e.target.value)}},{key:"handleKeyUp",value:function(e){var t=this.props.onEnterPress;13===e.keyCode&&t&&t(e.target.value,e)}},{key:"handleBlur",value:function(e){var t=e.target.value,n=this.props,a=n.forceChange,o=n.onBlur;o&&o(e),a(t)}},{key:"renderInfo",value:function(){var e=this.props.info,t="number"!=typeof e;if("function"!=typeof e&&t)return null;var n=(t?e:this.defaultInfo)(this.props.value);if(!n)return null;var a=n instanceof Error,o=a?n.message:n;return g.a.createElement("div",{key:"info",style:{minWidth:"auto"},className:Object(x.a)("bottom-right",a?"error":"tip")},o)}},{key:"render",value:function(){var e=this.props,t=e.autosize,n=(e.onChange,e.maxHeight),a=(e.info,e.onEnterPress,e.resize),o=Object(l.a)(e,["autosize","onChange","maxHeight","info","onEnterPress","resize"]),r=null==o.value?"":o.value,i=this.state.height||"auto",s=t?Object(x.a)("auto-size"):Object(x.a)(a&&"textarea-resize"),u=[g.a.createElement("textarea",Object.assign({},Object(w.a)(o),{key:"t",value:r,className:s,style:{height:i,maxHeight:n,overflow:"auto"},onChange:this.handleChange,onKeyUp:this.handleKeyUp,onBlur:this.handleBlur})),this.renderInfo()];return t&&u.push(g.a.createElement("textarea",{key:"s",ref:this.bindShadow,className:Object(x.a)("shadow"),rows:o.rows,defaultValue:r})),u}}]),n}(v.b);z.defaultProps={rows:4,resize:!1};var j=z,O=Object(a.compose)(i.a,Object(s.a)({}),Object(o.a)(400),r.a)(j);O.displayName="ShineoutTextarea";t.a=O}}]);