(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[22],{308:function(e,t,n){"use strict";var r=n(21),a=n(193),o=n(60),i=n(82),f=n(15),l=n(4),s=n(5),u=n(1),c=n(20),d=n(6),p=n(7),h=n(2),b=n(0),m=n.n(b),v=n(14),g=n.n(v),y=n(9),E=n(17),x=n(34),T=n(197),C=n(90),j=n(62);function O(r){return function(){var e,t=Object(h.a)(r);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var n=Object(h.a)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Object(p.a)(this,e)}}var w=function(e){Object(d.a)(n,e);var t=O(n);function n(e){var r;return Object(l.a)(this,n),(r=t.call(this,e)).defaultInfo=function(e){if(!e||0===e.length)return null;var t=r.props.info,n="".concat(e.length," / ").concat(t);return e.length<=t?n:new Error(n)},r.state={height:0},r.bindShadow=r.bindShadow.bind(Object(u.a)(r)),r.handleBlur=r.handleBlur.bind(Object(u.a)(r)),r.handleChange=r.handleChange.bind(Object(u.a)(r)),r.handleKeyUp=r.handleKeyUp.bind(Object(u.a)(r)),r.resize=r.resize.bind(Object(u.a)(r)),r.defaultInfo=r.defaultInfo.bind(Object(u.a)(r)),r}return Object(s.a)(n,[{key:"componentDidMount",value:function(){Object(c.a)(Object(h.a)(n.prototype),"componentDidMount",this).call(this),this.props.autosize&&this.resize()}},{key:"componentDidUpdate",value:function(e){this.props.autosize&&e.value!==this.props.value&&this.resize(this.props.value)}},{key:"getTrim",value:function(){var e=this.props.trim;return void 0!==e?e:void 0!==y.a.trim&&y.a.trim}},{key:"bindShadow",value:function(e){this.shadow=e}},{key:"resize",value:function(e){(e||""===e)&&(this.shadow.value=e);var t=this.shadow?this.shadow.scrollHeight:0;this.setState({height:t})}},{key:"handleChange",value:function(e){this.props.onChange(e.target.value),this.props.autosize&&this.resize(e.target.value)}},{key:"handleKeyUp",value:function(e){var t=this.props.onEnterPress;13===e.keyCode&&t&&t(e.target.value,e)}},{key:"handleBlur",value:function(e){var t=e.target.value,n=this.props,r=n.forceChange,a=n.onBlur;this.getTrim()&&(t=t.trim(),e.target.value=t),r(t),a&&a(e)}},{key:"renderFooter",value:function(){var e=this.props,t=e.renderFooter,n=e.value;return t&&"function"==typeof t?m.a.createElement("div",{key:"footer",className:Object(x.a)("footer")},t(n)):null}},{key:"renderInfo",value:function(){var e=this.props.info,t="number"!=typeof e;if("function"!=typeof e&&t)return null;var n=(t?e:this.defaultInfo)(this.props.value);if(!n)return null;var r=n instanceof Error,a=r?n.message:n;return m.a.createElement("div",{key:"info",style:{minWidth:"auto"},className:Object(x.a)(Object(y.c)()?"bottom-left":"bottom-right",r?"error":"tip")},a)}},{key:"render",value:function(){var e=this.props,t=e.autosize,n=(e.onChange,e.maxHeight),r=(e.info,e.onEnterPress,e.resize),a=(e.renderFooter,e.inputFocus),o=e.innerTitle,i=e.placeTitle,l=Object(f.a)(e,["autosize","onChange","maxHeight","info","onEnterPress","resize","renderFooter","inputFocus","innerTitle","placeTitle"]),s=null==l.value?"":l.value,u=this.state.height||"auto",c=this.renderFooter(),d=t?Object(x.a)("auto-size"):Object(x.a)(r&&"textarea-resize"),p=g()(d,o&&Object(j.a)("hidable","item")),h=[m.a.createElement("textarea",Object.assign({},Object(T.a)(l),{key:"t",value:s,className:p,style:{height:u,maxHeight:n,overflow:"auto"},onChange:this.handleChange,onKeyUp:this.handleKeyUp,onBlur:this.handleBlur})),c,this.renderInfo()],b=g()(Object(x.a)("shadow"),o&&Object(j.a)("hidable","item"));return t&&h.push(m.a.createElement("textarea",{key:"s",ref:this.bindShadow,className:b,rows:l.rows,defaultValue:s})),m.a.createElement(C.a,{innerTitle:o,open:!!s||!!a,placeTitle:i},h)}}]),n}(E.b);w.defaultProps={rows:4,resize:!1};var A=w,R=Object(r.compose)(o.a,Object(i.a)({className:function(e){var t=e.value,n=e.renderFooter,r=null;return n&&"function"==typeof n&&(r=n(t)),r&&Object(x.a)("with-footer")}}),Object(a.a)(400))(A);R.displayName="ShineoutTextarea";t.a=R},327:function(e,t,n){"use strict";var r=n(21),a=n(193),o=n(60),i=n(4),l=n(5),s=n(1),u=n(6),c=n(7),d=n(2),p=n(0),h=n.n(p),b=n(14),f=n.n(b),m=n(9),v=n(308),g=n(127),y=n(91),E=(n(31),n(985)),x=n.n(E),T=n(8),C=Object(T.a)(x.a,"editableArea"),j=n(52),O=n(25),w=n(34),A=n(90),R=n(62);function P(r){return function(){var e,t=Object(d.a)(r);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var n=Object(d.a)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Object(c.a)(this,e)}}var F=function(){};var k=function(e){Object(u.a)(r,e);var n=P(r);function r(e){var t;return Object(i.a)(this,r),(t=n.call(this,e)).state={showTextarea:!1},t.bindContainer=t.bindElement.bind(Object(s.a)(t),"container"),t.bindInput=t.bindElement.bind(Object(s.a)(t),"input"),t.renderInput=t.renderInput.bind(Object(s.a)(t)),t.renderPlace=t.renderPlace.bind(Object(s.a)(t)),t.renderTextarea=t.renderTextarea.bind(Object(s.a)(t)),t.onChange=t.onChange.bind(Object(s.a)(t)),t.onBlur=t.onBlur.bind(Object(s.a)(t)),t.autoFocus=t.autoFocus.bind(Object(s.a)(t)),t.handleFocus=t.handleFocus.bind(Object(s.a)(t)),t.showPop=t.updateShowTextarea.bind(Object(s.a)(t),!0),t.hidePop=t.updateShowTextarea.bind(Object(s.a)(t),!1),t.handleClear=t.onChange.bind(Object(s.a)(t),""),t}return Object(l.a)(r,[{key:"componentDidUpdate",value:function(e,t){var n=this.state.showTextarea;t.showTextarea!==n&&n&&this.autoFocus()}},{key:"onChange",value:function(e){var t=this.props.onChange;"function"==typeof t&&t(e)}},{key:"onBlur",value:function(e){var t=this.props,n=t.onBlur,r=t.forceChange;this.hidePop();var a=e.target.value;this.getTrim()&&(a=a.trim(),e.target.value=a),r(a),"function"==typeof n&&n(e)}},{key:"getTrim",value:function(){var e=this.props.trim;return void 0!==e?e:void 0!==m.a.trim&&m.a.trim}},{key:"getErrorProps",value:function(){var e={};return"error"in this.props&&(e.error=this.props.error),e}},{key:"updateShowTextarea",value:function(e){e&&this.input&&(this.width=Object(O.getParent)(this.input,".".concat(C("input"))).offsetWidth),this.setState({showTextarea:e}),this.props.onShowTextareaChange&&this.props.onShowTextareaChange(e)}},{key:"handleFocus",value:function(e){var t=this.props.onFocus;"function"==typeof t&&t(e)}},{key:"bindElement",value:function(e,t){this[e]=t}},{key:"autoFocus",value:function(){if(this.container){var e=this.container.querySelector(".".concat(C("text-area")," textarea.so-input-auto-size"));e&&O.focusElement.end(e)}}},{key:"renderTextarea",value:function(){var e=this.state.showTextarea,t=this.props,n=t.placeholder,r=t.maxHeight,a=t.value,o=t.innerTitle,i=t.placeTitle,l=t.renderFooter;return e?h.a.createElement("div",{ref:this.bindContainer},h.a.createElement(v.a,Object.assign({className:C("text-area"),autosize:!0,innerTitle:o,placeTitle:i,value:a,rows:1,delay:0,onChange:this.onChange,onBlur:this.onBlur,onFocus:this.handleFocus,placeholder:n,maxHeight:r,renderFooter:l},this.getErrorProps()))):null}},{key:"renderResult",value:function(){var e=this.props,t=e.placeholder,n=e.disabled,r=e.value,a=e.renderResult,o=e.placeTitle,i=e.innerTitle,l=e.error,s=a(r);return h.a.createElement("div",{tabIndex:n?void 0:0,className:f()(C("input"),Object(w.a)("_",l&&"invalid",n&&"disabled")),onFocus:this.showPop},h.a.createElement(A.a,{placeTitle:o,innerTitle:i,open:!!r},h.a.createElement("div",{className:f()(Object(w.a)("spare"),i&&Object(R.a)("hidable","item")),ref:this.bindInput},s||h.a.createElement("div",{className:Object(w.a)("placeholder")},t||h.a.createElement("br",null)))))}},{key:"renderInput",value:function(){var e=this.props,t=e.placeholder,n=e.disabled,r=e.value,a=e.innerTitle,o=e.placeTitle;return h.a.createElement(g.a,Object.assign({innerTitle:a,placeTitle:o,forwardedRef:this.bindInput,placeholder:t,value:function(e){if(!e&&0!==e)return"";var t=String(e).split("\n");return 1<t.length?"".concat(t[0],"..."):String(e)}(r),onChange:F,className:C("input"),onFocus:this.showPop,disabled:n},this.getErrorProps()))}},{key:"renderPlace",value:function(){var e=this.props.renderResult;return e&&"function"==typeof e?this.renderResult():this.renderInput()}},{key:"render",value:function(){var e=this.state.showTextarea,t=this.props,n=t.width,r=t.style,a=t.className,o=t.bordered,i=t.clearable,l=t.getPopupContainer,s=t.value,u=f()(a,C("_",!o&&"none-bordered")),c=Object.assign({width:n},r),d={width:this.width};return h.a.createElement("div",{className:u,style:c},this.renderPlace(),h.a.createElement(y.a,{visible:e,showArrow:!1,className:C("popover"),position:"cover",style:d,getPopupContainer:l},this.renderTextarea()),i&&s?h.a.createElement("div",{className:C("clear"),onClick:this.handleClear},j.a.CloseCircle):null)}}]),r}(h.a.PureComponent);k.defaultProps={bordered:!1};var S=k,N=Object(r.compose)(o.a,Object(a.a)(400))(S);N.displayName="ShineoutEditableArea";t.a=N},981:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(565),i=n(566),l=n(40),s=n(982),u=n.n(s),c=n(983),d=n.n(c),p=Object(l.b)(u.a,d.a),h=[{name:"01-base",isTs:!0,isTest:!1,title:Object(l.b)("基本用法 \n EditableArea 默认展示一行，超过一行的内容用...代替","Base \n Editablearea displays one line by default, and more than one line is replaced by ..."),component:n(984).default,rawText:n(986),parseTsText:n(987)},{name:"02-controlled",isTs:!0,isTest:!1,title:Object(l.b)("受控 \n 传递value, onChange使组件受控","Controlled \n Pass value and onChange props to make the component controlled"),component:n(988).default,rawText:n(989),parseTsText:n(990)},{name:"03-container",isTs:!0,isTest:!1,title:Object(l.b)("自定义容器 \n 在内滚容器中使用此组件，可使用 getPopupContainer 指定渲染的目标容器，使之随之滚动","Custom container \n use getPopupContainer return target container"),component:n(991).default,rawText:n(992),parseTsText:n(993)},{name:"04-renderFooter",isTs:!0,isTest:!1,title:Object(l.b)("渲染 textarea footer \n 在输入框内嵌入标题","RenderFooter \n render textarea footer"),component:n(994).default,rawText:n(995),parseTsText:n(996)},{name:"05-renderResult",isTs:!0,isTest:!1,title:Object(l.b)("自定义显示结果 \n 自定义显示结果","RenderResult \n Customize display results"),component:n(997).default,rawText:n(998),parseTsText:n(999)}];t.default=Object(o.a)(function(e){return a.a.createElement(i.b,Object.assign({},e,{codes:void 0,source:p,examples:h}))})},982:function(e,t){e.exports="# EditableArea *可编辑域*\n\n<example />\n\n## API\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| defaultValue | string | 无 | 设置初始值 |\n| value | string | 无 | 受控时，传入的value |\n| className | string | 无 | 扩展外层className |\n| onChange | (value: string) => void | 无 | 值改变时的回调函数，和value一起设置时使组件受控 |\n| style | object | 无 | 组件最外层的扩展样式 |\n| bordered | boolean | false | 是否显示外边框 |\n| disabled | boolean | false | 是否禁用 |\n| clearable | boolean | true | 是否展示清除按钮 |\n| placeholder | string | 无 | 同原生 textarea 标签的 placeholder |\n| delay | number | 400 | 用户输入触发 onChange 和校验间隔时间，单位 毫秒 |\n| trim | boolean | false | trim 为 true 时，失去焦点时会自动删除空白字符 |\n| onBlur | (e: MouseEvent) => void | 无 | 失去焦点事件 |\n| onFocus | (e: MouseEvent) => void | 无 | 聚焦事件 |\n| maxHeight | number \\| string | 无 | 输入框的最大高度, 超过之后会出现滚动条 |\n| getPopupContainer | () => HTMLElement | 无 | 自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement |\n| width | number \\| string | 无 | 编辑域宽度 |\n| renderFooter | (value: string)=> ReactNode | - | 渲染 textarea footer |\n| renderResult | (value: string)=> ReactNode | - | 自定义显示结果 |\n"},983:function(e,t){e.exports="# EditableArea\n\n<example />\n\n## API\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| defaultValue | string | none | Set initial value |\n| value | string | none | The value passed in when controlled |\n| className | string | none | The outermost extension className of a component |\n| onChange | (value: string) => void | none | Callback function when the value changes, making the component controlled when set with value |\n| style | object | none | The outermost extension style of a component |\n| bordered | boolean | false | Whether to show the border |\n| disabled | boolean | false | Whether to disable |\n| clearable | boolean | true | Whether to show the clear button |\n| placeholder | string | none | The same as the native placeholder tag |\n| delay | number | 400 | User input triggers the onChange and to check interval, unit: ms. |\n| trim | boolean | false | When trim is true, blank characters are automatically deleted when lose focus |\n| onBlur | (e: MouseEvent) => void | none | blur event |\n| onFocus | (e: MouseEvent) => void | none | focus event |\n| maxHeight | number \\| string | - | the maxHeight of the textarea, scroll bars appear after more than |\n| getPopupContainer | () => HTMLElement | none | Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement |\n| width | number \\| string | none | width of the editablearea |\n| renderFooter | (value: string)=> ReactNode | - | render textarea footer |\n| renderResult | (value: string)=> ReactNode | - | Customize display results |\n\n"},984:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(327);t.default=function(){return a.a.createElement(o.a,{bordered:!0,placeholder:"input something"})}},985:function(e,t){},986:function(e,t){e.exports="/**\n * cn - 基本用法\n *    -- EditableArea 默认展示一行，超过一行的内容用...代替\n * en - Base\n *    -- Editablearea displays one line by default, and more than one line is replaced by ...\n */\n\nimport React from 'react'\nimport { EditableArea } from 'shineout'\n\nconst App: React.FC = () => <EditableArea bordered placeholder=\"input something\" />\n\nexport default App\n"},987:function(e,t){e.exports="/**\n * cn - 基本用法\n *    -- EditableArea 默认展示一行，超过一行的内容用...代替\n * en - Base\n *    -- Editablearea displays one line by default, and more than one line is replaced by ...\n */\nimport React from 'react';\nimport { EditableArea } from 'shineout';\nconst App = () => <EditableArea bordered placeholder=\"input something\"/>;\nexport default App;\n"},988:function(e,t,n){"use strict";n.r(t);var a=n(24),o=n(0),i=n.n(o),l=n(327);t.default=function(){var e=Object(o.useState)(""),t=Object(a.a)(e,2),n=t[0],r=t[1];return i.a.createElement(l.a,{width:400,value:n,placeholder:"Input something",onChange:function(e){return r(e)},onBlur:function(){return console.log("EditableArea: onBlur")}})}},989:function(e,t){e.exports="/**\n * cn - 受控\n *    -- 传递value, onChange使组件受控\n * en - Controlled\n *    -- Pass value and onChange props to make the component controlled\n */\n\nimport React, { useState } from 'react'\nimport { EditableArea, TYPE } from 'shineout'\n\ntype EditableAreaProps = TYPE.EditableArea.Props\ntype EditableAreaValue = EditableAreaProps['value']\n\nconst App: React.FC = () => {\n  const [value, setValue] = useState<EditableAreaValue>('')\n\n  return (\n    <EditableArea\n      width={400}\n      value={value}\n      placeholder=\"Input something\"\n      onChange={val => setValue(val)}\n      onBlur={() => console.log('EditableArea: onBlur')}\n    />\n  )\n}\n\nexport default App\n"},990:function(e,t){e.exports="/**\n * cn - 受控\n *    -- 传递value, onChange使组件受控\n * en - Controlled\n *    -- Pass value and onChange props to make the component controlled\n */\nimport React, { useState } from 'react';\nimport { EditableArea } from 'shineout';\nconst App = () => {\n    const [value, setValue] = useState('');\n    return (<EditableArea width={400} value={value} placeholder=\"Input something\" onChange={val => setValue(val)} onBlur={() => console.log('EditableArea: onBlur')}/>);\n};\nexport default App;\n"},991:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(327);t.default=function(){return a.a.createElement("div",{id:"popup-target",style:{height:200,overflow:"auto",position:"relative",padding:10}},a.a.createElement("div",{style:{height:100}}),a.a.createElement(o.a,{bordered:!0,maxHeight:100,placeholder:"scroll in container",getPopupContainer:function(){return document.querySelector("#popup-target")}}),a.a.createElement("div",{style:{height:140}}))}},992:function(e,t){e.exports="/**\n * cn - 自定义容器\n *    -- 在内滚容器中使用此组件，可使用 getPopupContainer 指定渲染的目标容器，使之随之滚动\n * en - Custom container\n *    -- use getPopupContainer return target container\n */\nimport React from 'react'\nimport { EditableArea } from 'shineout'\n\nconst App: React.FC = () => {\n  const container = (): HTMLElement => document.querySelector('#popup-target')!\n  return (\n    <div id=\"popup-target\" style={{ height: 200, overflow: 'auto', position: 'relative', padding: 10 }}>\n      <div style={{ height: 100 }} />\n\n      <EditableArea bordered maxHeight={100} placeholder=\"scroll in container\" getPopupContainer={container} />\n\n      <div style={{ height: 140 }} />\n    </div>\n  )\n}\n\nexport default App\n"},993:function(e,t){e.exports="/**\n * cn - 自定义容器\n *    -- 在内滚容器中使用此组件，可使用 getPopupContainer 指定渲染的目标容器，使之随之滚动\n * en - Custom container\n *    -- use getPopupContainer return target container\n */\nimport React from 'react';\nimport { EditableArea } from 'shineout';\nconst App = () => {\n    const container = () => document.querySelector('#popup-target');\n    return (<div id=\"popup-target\" style={{ height: 200, overflow: 'auto', position: 'relative', padding: 10 }}>\n      <div style={{ height: 100 }}/>\n\n      <EditableArea bordered maxHeight={100} placeholder=\"scroll in container\" getPopupContainer={container}/>\n\n      <div style={{ height: 140 }}/>\n    </div>);\n};\nexport default App;\n"},994:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(327);t.default=function(){return a.a.createElement("div",null,a.a.createElement(o.a,{bordered:!0,renderFooter:function(){return a.a.createElement("div",null,"Tip")},placeholder:"input something"}))}},995:function(e,t){e.exports="/**\n * cn - 渲染 textarea footer\n *    -- 在输入框内嵌入标题\n * en - RenderFooter\n *    -- render textarea footer\n */\n\nimport React from 'react'\nimport { EditableArea, TYPE } from 'shineout'\n\ntype EditableAreaProps = TYPE.EditableArea.Props\ntype EditableAreaRenderFooter = EditableAreaProps['renderFooter']\n\nconst App: React.FC = () => {\n  const renderFooter: EditableAreaRenderFooter = () => <div>Tip</div>\n\n  return (\n    <div>\n      <EditableArea bordered renderFooter={renderFooter} placeholder=\"input something\" />\n    </div>\n  )\n}\n\nexport default App\n"},996:function(e,t){e.exports="/**\n * cn - 渲染 textarea footer\n *    -- 在输入框内嵌入标题\n * en - RenderFooter\n *    -- render textarea footer\n */\nimport React from 'react';\nimport { EditableArea } from 'shineout';\nconst App = () => {\n    const renderFooter = () => <div>Tip</div>;\n    return (<div>\n      <EditableArea bordered renderFooter={renderFooter} placeholder=\"input something\"/>\n    </div>);\n};\nexport default App;\n"},997:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(327);t.default=function(){return a.a.createElement("div",null,a.a.createElement(o.a,{bordered:!0,renderResult:function(){return a.a.createElement("div",null,"Guessing what I inputed ?")},placeholder:"input something"}))}},998:function(e,t){e.exports="/**\n * cn - 自定义显示结果\n *    -- 自定义显示结果\n * en - RenderResult\n *    -- Customize display results\n */\n\nimport React from 'react'\nimport { EditableArea, TYPE } from 'shineout'\n\ntype EditableAreaProps = TYPE.EditableArea.Props\ntype EditableAreaRenderResult = EditableAreaProps['renderResult']\n\nconst App: React.FC = () => {\n  const renderResult: EditableAreaRenderResult = () => <div>Guessing what I inputed ?</div>\n\n  return (\n    <div>\n      <EditableArea bordered renderResult={renderResult} placeholder=\"input something\" />\n    </div>\n  )\n}\n\nexport default App\n"},999:function(e,t){e.exports="/**\n * cn - 自定义显示结果\n *    -- 自定义显示结果\n * en - RenderResult\n *    -- Customize display results\n */\nimport React from 'react';\nimport { EditableArea } from 'shineout';\nconst App = () => {\n    const renderResult = () => <div>Guessing what I inputed ?</div>;\n    return (<div>\n      <EditableArea bordered renderResult={renderResult} placeholder=\"input something\"/>\n    </div>);\n};\nexport default App;\n"}}]);