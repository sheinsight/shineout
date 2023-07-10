(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[49],{1363:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(565),i=n(566),s=n(41),u=n(1364),l=n.n(u),c=n(1365),h=n.n(c),f=Object(s.b)(l.a,h.a),p=[{name:"1-base",isTs:!0,isTest:!1,title:Object(s.b)("基本用法 \n 多行文本输入框","Base \n Multi-line text input box"),component:n(1366).default,rawText:n(1367),parseTsText:n(1368)},{name:"2-autosize",isTs:!0,isTest:!1,title:Object(s.b)("自适应高度 \n autosize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可","Autosize \n When the autosize property is true, component will change height to fit the content. Set maxHeight to limit maximum height."),component:n(1369).default,rawText:n(1370),parseTsText:n(1371)},{name:"3-info",isTs:!0,isTest:!1,title:Object(s.b)("信息 \n 设置 info 为数字, 设定最大长度，用户 focus 时会显示用户已输入文字长度。 \n 如果超出长度， 则会报错. 不会隐藏。","Info \n Set info to number, set the maximum length, and the user's focus shows the length of text that the user has entered. \n If the length is exceeded, the error is reported. It is not hidden."),component:n(1372).default,rawText:n(1373),parseTsText:n(1374)},{name:"4-custom",isTs:!0,isTest:!1,title:Object(s.b)("自定义信息 \n 可以通过设置 info 为函数去自定义提示信息 \n 如果 info 返回类型为 Error，不会隐藏。","Custom Info \n can customize the info by setting info as a function \n if the functio return an Error , the info doesn't hide"),component:n(1375).default,rawText:n(1376),parseTsText:n(1377)},{name:"5-renderFooter",isTs:!0,isTest:!1,title:Object(s.b)("渲染底部信息 \n 渲染 textarea footer","RenderFooter \n render textarea footer"),component:n(1378).default,rawText:n(1379),parseTsText:n(1380)}];t.default=Object(a.a)(function(e){return o.a.createElement(i.b,Object.assign({},e,{codes:void 0,source:f,examples:p}))})},1364:function(e,t){e.exports="# Textarea *多行文本框*\n\n<example />\n\n## API\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| autosize | boolean | false | 高度是否随内容自动变化 |\n| defaultValue | string \\| number | | 默认值 |\n| delay | number | 400 | 用户输入触发 onChange 和校验间隔时间，单位 毫秒。|\n| info | (value: string) => string \\| number | 无 | 提示信息 |\n| name | string | 无 | Form 存取数据的名称 |\n| onChange | (value: string) => void | | 值改变回调函数 |\n| onEnterPress | (value: string) => void | | 回车键回调函数 |\n| placeholder | string | | 同原生 input 标签的 placeholder |\n| popover | 'top-left' \\| 'top' \\| 'top-right' \\| 'bottom-left' \\| 'bottom' \\| 'bottom-right' | | 信息弹出位置 |\n| rows | number | 4 | 最小行高，同原生 textarea rows 属性 |\n| maxHeight | number \\| string | 无 | 输入框的最大高度, 超过之后会出现滚动条 |\n| style | object | 无 | 最外层扩展样式 |\n| trim | boolean | false | trim 为 true 时，失去焦点时会自动删除空白字符。 |\n| resize | boolean | false | 是否可以伸缩高度 |\n| value | string \\| number | | defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖<br />在Form中，value会被表单接管，value无效 |\n| underline | boolean | false | 是否只展示下边框 |\n| disabled  | boolean | false | 是否禁用 |\n| onBlur | (e: Event)=> void | - | 失去焦点后的回调 |\n| renderFooter | ()=> ReactNode | - | 自定义底部附加信息 |\n"},1365:function(e,t){e.exports="# Textarea\n\n<example />\n\n## API\n\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| autosize | boolean | false | Whether the height changes automatically with the content |\n| defaultValue | string \\| number | | default value |\n| delay | number | 400 | User input triggers onChange and to check interval, unit: ms.|\n| info | (value: string) => string \\| number | - | Infomation |\n| name | string | none | The name that accesses data from Form |\n| onChange | (value: string) => void | | The callback function for changing value |\n| onEnterPress | (value: string) => void | | The callback function for enter key |\n| placeholder | string | | The same as the native placeholder tag. |\n| popover | 'top-left' \\| 'top' \\| 'top-right' \\| 'bottom-left' \\| 'bottom' \\| 'bottom-right' | | The position where the message pops up |\n| rows | number | 4 | The minimum row height. Same as native textarea rows property. |\n| maxHeight | number \\| string | - | the maxHeight of the textarea, scroll bars appear after more than |\n| style | object | - | Container element style |\n| trim | boolean | false | When trim is true, blank characters are automatically deleted when lose focus。 |\n| resize | boolean | false | support resize |\n| value | string \\| number | | DefaultValue and value can be set at the same time and defaultValue will be overridden by value. <br />In the Form, the value is taken over by the Form and lose efficacy. |\n| underline | boolean | false | only display border bottom  |\n| disabled  | boolean | false | disabled |\n| onBlur | (e: Event)=> void | - | The callback when Textarea blur |\n| renderFooter | ()=> ReactNode | - | Render textarea footer |\n"},1366:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(308);t.default=function(){return o.a.createElement(a.a,{rows:6,placeholder:"input something"})}},1367:function(e,t){e.exports="/**\n * cn - 基本用法\n *    -- 多行文本输入框\n * en - Base\n *    -- Multi-line text input box\n */\nimport React from 'react'\nimport { Textarea } from 'shineout'\n\nconst App: React.FC = () => <Textarea rows={6} placeholder=\"input something\" />\n\nexport default App\n"},1368:function(e,t){e.exports="/**\n * cn - 基本用法\n *    -- 多行文本输入框\n * en - Base\n *    -- Multi-line text input box\n */\nimport React from 'react';\nimport { Textarea } from 'shineout';\nconst App = () => <Textarea rows={6} placeholder=\"input something\"/>;\nexport default App;\n"},1369:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(308);t.default=function(){return o.a.createElement("div",null,o.a.createElement(a.a,{rows:2,autosize:!0,maxHeight:200,placeholder:"autosize"}),o.a.createElement("br",null),o.a.createElement(a.a,{rows:2,autosize:!0,defaultValue:"a\nu\nt\no\ns\ni\nz\ne",maxHeight:200,placeholder:"autosize"}))}},1370:function(e,t){e.exports="/**\n * cn - 自适应高度\n *    -- autosize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可\n * en - Autosize\n *    -- When the autosize property is true, component will change height to fit the content. Set maxHeight to limit maximum height.\n */\nimport React from 'react'\nimport { Textarea } from 'shineout'\n\nconst text = `a\nu\nt\no\ns\ni\nz\ne`\n\nconst App: React.FC = () => (\n  <div>\n    <Textarea rows={2} autosize maxHeight={200} placeholder=\"autosize\" />\n    <br />\n    <Textarea rows={2} autosize defaultValue={text} maxHeight={200} placeholder=\"autosize\" />\n  </div>\n)\n\nexport default App\n"},1371:function(e,t){e.exports="/**\n * cn - 自适应高度\n *    -- autosize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可\n * en - Autosize\n *    -- When the autosize property is true, component will change height to fit the content. Set maxHeight to limit maximum height.\n */\nimport React from 'react';\nimport { Textarea } from 'shineout';\nconst text = `a\nu\nt\no\ns\ni\nz\ne`;\nconst App = () => (<div>\n    <Textarea rows={2} autosize maxHeight={200} placeholder=\"autosize\"/>\n    <br />\n    <Textarea rows={2} autosize defaultValue={text} maxHeight={200} placeholder=\"autosize\"/>\n  </div>);\nexport default App;\n"},1372:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(308);t.default=function(){return o.a.createElement(a.a,{rows:4,trim:!0,placeholder:"input something",info:10})}},1373:function(e,t){e.exports="/**\n * cn - 信息\n *    -- 设置 info 为数字, 设定最大长度，用户 focus 时会显示用户已输入文字长度。\n *    -- 如果超出长度， 则会报错. 不会隐藏。\n * en - Info\n *    -- Set info to number, set the maximum length, and the user's focus shows the length of text that the user has entered.\n *    -- If the length is exceeded, the error is reported. It is not hidden.\n */\nimport React from 'react'\nimport { Textarea } from 'shineout'\n\nconst App: React.FC = () => <Textarea rows={4} trim placeholder=\"input something\" info={10} />\n\nexport default App\n"},1374:function(e,t){e.exports="/**\n * cn - 信息\n *    -- 设置 info 为数字, 设定最大长度，用户 focus 时会显示用户已输入文字长度。\n *    -- 如果超出长度， 则会报错. 不会隐藏。\n * en - Info\n *    -- Set info to number, set the maximum length, and the user's focus shows the length of text that the user has entered.\n *    -- If the length is exceeded, the error is reported. It is not hidden.\n */\nimport React from 'react';\nimport { Textarea } from 'shineout';\nconst App = () => <Textarea rows={4} trim placeholder=\"input something\" info={10}/>;\nexport default App;\n"},1375:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(308),i=function(e){if(!e||0===e.length)return null;var t="total is  ".concat(e.length);return e.length<=20?t:new Error(t)};t.default=function(){return o.a.createElement(a.a,{rows:4,trim:!0,placeholder:"input something",info:i})}},1376:function(e,t){e.exports="/**\n * cn - 自定义信息\n *    -- 可以通过设置 info 为函数去自定义提示信息\n *     -- 如果 info 返回类型为 Error，不会隐藏。\n * en - Custom Info\n *    -- can customize the info by setting info as a function\n *    -- if the functio return an Error , the info doesn't hide\n */\nimport React from 'react'\nimport { Textarea, TYPE } from 'shineout'\n\ntype TextareaProps = TYPE.Textarea.Props\n\nconst renderInfo: TextareaProps['info'] = value => {\n  if (!value || value.length === 0) return null\n  const text = `total is  ${value.length}`\n  if (value.length <= 20) return text\n  return new Error(text)\n}\n\nconst App: React.FC = () => <Textarea rows={4} trim placeholder=\"input something\" info={renderInfo} />\n\nexport default App\n"},1377:function(e,t){e.exports="/**\n * cn - 自定义信息\n *    -- 可以通过设置 info 为函数去自定义提示信息\n *     -- 如果 info 返回类型为 Error，不会隐藏。\n * en - Custom Info\n *    -- can customize the info by setting info as a function\n *    -- if the functio return an Error , the info doesn't hide\n */\nimport React from 'react';\nimport { Textarea } from 'shineout';\nconst renderInfo = value => {\n    if (!value || value.length === 0)\n        return null;\n    const text = `total is  ${value.length}`;\n    if (value.length <= 20)\n        return text;\n    return new Error(text);\n};\nconst App = () => <Textarea rows={4} trim placeholder=\"input something\" info={renderInfo}/>;\nexport default App;\n"},1378:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(308);function i(){return o.a.createElement("span",null,"Tip : Hello SHEIN !")}t.default=function(){return o.a.createElement(a.a,{rows:6,renderFooter:i,placeholder:"input something"})}},1379:function(e,t){e.exports="/**\n * cn - 渲染底部信息\n *    -- 渲染 textarea footer\n * en - RenderFooter\n *    -- render textarea footer\n */\nimport React from 'react'\nimport { Textarea } from 'shineout'\n\nfunction renderFooter() {\n  return <span>Tip : Hello SHEIN !</span>\n}\n\nconst App: React.FC = () => <Textarea rows={6} renderFooter={renderFooter} placeholder=\"input something\" />\n\nexport default App\n"},1380:function(e,t){e.exports="/**\n * cn - 渲染底部信息\n *    -- 渲染 textarea footer\n * en - RenderFooter\n *    -- render textarea footer\n */\nimport React from 'react';\nimport { Textarea } from 'shineout';\nfunction renderFooter() {\n    return <span>Tip : Hello SHEIN !</span>;\n}\nconst App = () => <Textarea rows={6} renderFooter={renderFooter} placeholder=\"input something\"/>;\nexport default App;\n"},308:function(e,t,n){"use strict";var r=n(21),o=n(193),a=n(60),i=n(82),d=n(15),s=n(4),u=n(5),l=n(1),c=n(20),h=n(6),f=n(7),p=n(2),m=n(0),g=n.n(m),x=n(14),b=n.n(x),v=n(9),T=n(17),w=n(34),y=n(197),z=n(90),j=n(62);function E(r){return function(){var e,t=Object(p.a)(r);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var n=Object(p.a)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Object(f.a)(this,e)}}var O=function(e){Object(h.a)(n,e);var t=E(n);function n(e){var r;return Object(s.a)(this,n),(r=t.call(this,e)).defaultInfo=function(e){if(!e||0===e.length)return null;var t=r.props.info,n="".concat(e.length," / ").concat(t);return e.length<=t?n:new Error(n)},r.state={height:0},r.bindShadow=r.bindShadow.bind(Object(l.a)(r)),r.handleBlur=r.handleBlur.bind(Object(l.a)(r)),r.handleChange=r.handleChange.bind(Object(l.a)(r)),r.handleKeyUp=r.handleKeyUp.bind(Object(l.a)(r)),r.resize=r.resize.bind(Object(l.a)(r)),r.defaultInfo=r.defaultInfo.bind(Object(l.a)(r)),r}return Object(u.a)(n,[{key:"componentDidMount",value:function(){Object(c.a)(Object(p.a)(n.prototype),"componentDidMount",this).call(this),this.props.autosize&&this.resize()}},{key:"componentDidUpdate",value:function(e){this.props.autosize&&e.value!==this.props.value&&this.resize(this.props.value)}},{key:"getTrim",value:function(){var e=this.props.trim;return void 0!==e?e:void 0!==v.a.trim&&v.a.trim}},{key:"bindShadow",value:function(e){this.shadow=e}},{key:"resize",value:function(e){(e||""===e)&&(this.shadow.value=e);var t=this.shadow?this.shadow.scrollHeight:0;this.setState({height:t})}},{key:"handleChange",value:function(e){this.props.onChange(e.target.value),this.props.autosize&&this.resize(e.target.value)}},{key:"handleKeyUp",value:function(e){var t=this.props.onEnterPress;13===e.keyCode&&t&&t(e.target.value,e)}},{key:"handleBlur",value:function(e){var t=e.target.value,n=this.props,r=n.forceChange,o=n.onBlur;this.getTrim()&&(t=t.trim(),e.target.value=t),r(t),o&&o(e)}},{key:"renderFooter",value:function(){var e=this.props,t=e.renderFooter,n=e.value;return t&&"function"==typeof t?g.a.createElement("div",{key:"footer",className:Object(w.a)("footer")},t(n)):null}},{key:"renderInfo",value:function(){var e=this.props.info,t="number"!=typeof e;if("function"!=typeof e&&t)return null;var n=(t?e:this.defaultInfo)(this.props.value);if(!n)return null;var r=n instanceof Error,o=r?n.message:n;return g.a.createElement("div",{key:"info",style:{minWidth:"auto"},className:Object(w.a)(Object(v.c)()?"bottom-left":"bottom-right",r?"error":"tip")},o)}},{key:"render",value:function(){var e=this.props,t=e.autosize,n=(e.onChange,e.maxHeight),r=(e.info,e.onEnterPress,e.resize),o=(e.renderFooter,e.inputFocus),a=e.innerTitle,i=e.placeTitle,s=Object(d.a)(e,["autosize","onChange","maxHeight","info","onEnterPress","resize","renderFooter","inputFocus","innerTitle","placeTitle"]),u=null==s.value?"":s.value,l=this.state.height||"auto",c=this.renderFooter(),h=t?Object(w.a)("auto-size"):Object(w.a)(r&&"textarea-resize"),f=b()(h,a&&Object(j.a)("hidable","item")),p=[g.a.createElement("textarea",Object.assign({},Object(y.a)(s),{key:"t",value:u,className:f,style:{height:l,maxHeight:n,overflow:"auto"},onChange:this.handleChange,onKeyUp:this.handleKeyUp,onBlur:this.handleBlur})),c,this.renderInfo()],m=b()(Object(w.a)("shadow"),a&&Object(j.a)("hidable","item"));return t&&p.push(g.a.createElement("textarea",{key:"s",ref:this.bindShadow,className:m,rows:s.rows,defaultValue:u})),g.a.createElement(z.a,{innerTitle:a,open:!!u||!!o,placeTitle:i},p)}}]),n}(T.b);O.defaultProps={rows:4,resize:!1};var F=O,I=Object(r.compose)(a.a,Object(i.a)({className:function(e){var t=e.value,n=e.renderFooter,r=null;return n&&"function"==typeof n&&(r=n(t)),r&&Object(w.a)("with-footer")}}),Object(o.a)(400))(F);I.displayName="ShineoutTextarea";t.a=I}}]);