(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[13],{301:function(e,n,t){"use strict";var o=t(60),a=t(21),d=t(88),r=t(74),c=t(4),l=t(5),i=t(1),u=t(20),s=t(6),h=t(7),p=t(2),b=t(0),m=t.n(b),k=t(14),f=t.n(k),x=t(17),C=t(22),y=t(10),v=t(562),g=t(61);function T(o){return function(){var e,n=Object(p.a)(o);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var t=Object(p.a)(this).constructor;e=Reflect.construct(n,arguments,t)}else e=n.apply(this,arguments);return Object(h.a)(this,e)}}var G=function(e){Object(s.a)(o,e);var t=T(o);function o(e){var n;return Object(c.a)(this,o),(n=t.call(this,e)).handleClick=n.handleClick.bind(Object(i.a)(n)),n.handleUpdate=n.handleUpdate.bind(Object(i.a)(n)),n.handleRawChange=n.handleRawChange.bind(Object(i.a)(n)),n}return Object(l.a)(o,[{key:"componentDidMount",value:function(){Object(u.a)(Object(p.a)(o.prototype),"componentDidMount",this).call(this),this.props.datum.subscribe(y.a,this.handleUpdate)}},{key:"componentWillUnmount",value:function(){Object(u.a)(Object(p.a)(o.prototype),"componentWillUnmount",this).call(this),this.props.datum.unsubscribe(y.a,this.handleUpdate)}},{key:"getContent",value:function(e){var n=this.props.renderItem;return"string"==typeof n?e[n]:"function"==typeof n?n(e):""}},{key:"handleUpdate",value:function(){this.forceUpdate()}},{key:"handleClick",value:function(e,n,t){var o=this.props,a=o.data,r=o.datum;n?r.add(a[t]):r.remove(a[t])}},{key:"handleRawChange",value:function(e,n){var t=this.props.datum;n?t.add(e):t.remove(e)}},{key:"render",value:function(){var t=this,e=this.props,n=e.block,o=e.data,a=e.datum,r=e.keygen,c=e.children,l=e.style,i=f()(Object(g.a)("group",["no-block","block"][Number(n)]),this.props.className);return void 0===o?m.a.createElement("div",{className:i,style:l},m.a.createElement(v.a,{value:{onRawChange:this.handleRawChange,checked:a.check.bind(a)}},c)):m.a.createElement("div",{className:i,style:l},o.map(function(e,n){return m.a.createElement(d.a,{checked:a.check(e),disabled:a.disabled(e),key:Object(C.b)(e,r,n),htmlValue:n,index:n,onChange:t.handleClick},t.getContent(e))}),c)}}]),o}(x.b);G.defaultProps={renderItem:function(e){return e}};var V=G,w=Object(a.compose)(o.a,v.b)(d.a);w.Group=Object(a.compose)(o.a,r.a.hoc({bindProps:["disabled","format","prediction","separator"]}))(V),w.Checkbox=d.a,w.displayName="ShineoutCheckbox",w.Group.displayName="ShineoutCheckboxGroup";n.a=w},562:function(e,n,t){"use strict";t.d(n,"a",function(){return l}),t.d(n,"b",function(){return i});var o=t(0),a=t.n(o),r=t(38),c=Object(r.a)(),l=c.Provider,i=function(t){return function(n){return a.a.createElement(c.Consumer,null,function(e){return a.a.createElement(t,Object.assign({},n,e))})}}},833:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(563),c=t(564),l=t(40),i=t(834),d=t.n(i),u=t(835),s=t.n(u),h=Object(l.b)(d.a,s.a),p=[{name:"01-base",isTs:!0,isTest:!1,title:Object(l.b)("基本用法 \n 基本的 Checkbox","Base \n Basic Checkbox"),component:t(836).default,rawText:t(837),parseTsText:t(838)},{name:"02-checked",isTs:!0,isTest:!1,title:Object(l.b)("状态 \n checked 有三个值，选中(true)、未选中(false)、半选中('indeterminate')。checked 设置时为受控组件（此示例没有处理 onChange 事件）。","Checked \n The checked has three values: true(checked), false(not checked), 'indeterminate'(half-checked)."),component:t(839).default,rawText:t(840),parseTsText:t(841)},{name:"03-value",isTs:!0,isTest:!1,title:Object(l.b)("选中值 \n 未设置htmlValue的状态下，checkbox选中时返回true，如果设置 htmlValue，返回 htmlValue。未选中状态都是返回 undefined。","Value \n When the htmlValue is set, the checkbox return the htmlValue (checked) and undefined (not checked); \n When the htmlValue is not set, the checkbox selected return true (checked) and undefined (not checked);"),component:t(842).default,rawText:t(843),parseTsText:t(844)},{name:"04-rawgroup",isTs:!0,isTest:!1,title:Object(l.b)("一组复选框 \n 一组复选框可以放在 Checkbox.Group 中","Group \n A series of checkboxes group by Checkbox.Group."),component:t(845).default,rawText:t(846),parseTsText:t(847)},{name:"05-group",isTs:!0,isTest:!1,title:Object(l.b)(" \n 可以直接通过数据来渲染一组 Checkbox"," \n Render a group of checkboxes from data."),component:t(848).default,rawText:t(849),parseTsText:t(850)},{name:"06-format",isTs:!0,isTest:!1,title:Object(l.b)("复杂数据 \n 复杂的数据可以使用 format 处理 value","Complex data \n Complex data can use format to process value."),component:t(851).default,rawText:t(852),parseTsText:t(853)},{name:"08-block",isTs:!0,isTest:!1,title:Object(l.b)("垂直布局 \n 默认是水平布局，设置 block 属性可以改为垂直布局","Block \n The default is horizontal layout, and setting the block property can change it to be vertical layout."),component:t(854).default,rawText:t(855),parseTsText:t(856)},{name:"09-disabled",isTs:!0,isTest:!1,title:Object(l.b)("禁用 \n 设置 Checkbox.Group 的 disabled 为 true，禁用全部选项","Disabled \n Set the disabled property of Checkbox.Group to true, disable all the checkboxes."),component:t(857).default,rawText:t(858),parseTsText:t(859)},{name:"10-disabled",isTs:!0,isTest:!1,title:Object(l.b)(" \n disabled 为函数时，根据函数结果实现有条件禁用"," \n When the disabled is a function, disbale the option that the function to return true."),component:t(860).default,rawText:t(861),parseTsText:t(862)},{name:"11-input",isTs:!0,isTest:!1,title:Object(l.b)("带输入 \n 设置 inputable 属性可以显示输入框，返回值为输入框内容","Inputable \n Set the inputable property to true can show the input box and the return value is the value of the input box."),component:t(863).default,rawText:t(864),parseTsText:t(865)},{name:"12-onClick",isTs:!0,isTest:!1,title:Object(l.b)("点击回调 \n 点击选择框后的回调","OnClick \n Checkbox click callback"),component:t(866).default,rawText:t(867),parseTsText:t(868)}];n.default=Object(r.a)(function(e){return a.a.createElement(c.b,Object.assign({},e,{codes:void 0,source:h,examples:p}))})},834:function(e,n){e.exports="# Checkbox *复选框*\n\nCheckbox 可以单独使用。一组Checkbox使用时，使用一个Array类型的属性 data 来控制选项。\n\n<example />\n\n## API\n\n### Checkbox\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| checked | boolean \\| 'indeterminate' | 无 | checked 传入时为受控组件 |\n| disabled | boolean | false | 是否禁用 |\n| htmlValue | any | true | 选中时返回值 |\n| name | string | 无 | Form 存取数据的名称 |\n| onChange | (value: any, checked: boolean) => void | 无 | 选中时，value 为 htmlValue，checked 为 true<br />未选中时，value 为 undefined，checked 为 false |\n| value | any | 无 | 如果 checked 未设置，checked 状态为 value === htmlValue |\n| inputable | boolean | false | 开启后出现输入框 |\n| onClick | (e: MouseEvent) => void | 无 | 点击后的回调 |\n\n### Checkbox.Group\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| data | any[] | 必填 | 数据项 |\n| defaultValue | any[] | | 初始值 |\n| disabled | (data: any) => boolean \\| boolean | false | 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项 |\n| format | (data: any) => any \\| string | d => d | 格式化 value<br />默认值，返回原始数据<br />为string时，会作为key从原始数据中获取值，相当于 (d) => d\\[format\\]<br /> 为函数时，以函数返回结果作为 value |\n| name | string | 无 | Form 存取数据的名称 |\n| keygen | ((data: any) => string) \\| string \\| true | 必填 | 生成每一项key的辅助方法<br />为 true 时，以数据项本身作为key，相当于 (d => d)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id) |\n| onChange | (value: any[]) => void | 无 | value 为 datum.getValue() |\n| prediction | (value: any, data: any) => boolean |  (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配 |\n| renderItem | (data: any) => ReactNode \\| string | 必填 | 为 string 时，返回 d\\[string]<br />为 function 时，返回函数结果 |\n| value | any[] | | 在Form中，value会被表单接管，value无效 |\n| block | boolean | false | 垂直布局 |\n"},835:function(e,n){e.exports="# Checkbox\n\n<example />\n\n## API\n\n### Checkbox\n\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| checked | boolean \\| 'indeterminate' | - | if not set, use (value === htmlValue). |\n| disabled | boolean | false | disable checkbox |\n| htmlValue | any | true | Specifies the result |\n| name | string | - | The name of the Form which access data |\n| onChange | (value: any, checked: boolean) => void | - | When selected, value is htmlValue and checked is true.<br />When not selected, value is undefined and checked is false. |\n| value | any | - |  |\n| inputable | boolean | false | Show input |\n| onClick | (e: MouseEvent) => void | - | Checkbox click callback |\n\n### Checkbox.Group\n\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| data | any[] | required | The data item |\n| datum | object | - | If the format and prediction does not satisfied your requirements, you can pass in a [Datum.List](/components/Datum.List) object or the Datum.List configuration to process data. |\n| defaultValue | any[] | [] | Initial value |\n| disabled | (data: any) => boolean \\| boolean | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |\n| format | ((data: any) => any) | string | d => d | format value |\n| name | string | - | The name of the Form which access data |\n| keygen | ((data: any) => string) \\| string \\| true | required | Key generator<br />When it is true, the data itself is used as the key equivalent to (d => d)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |\n| onChange | (value: any[]) => void  | - | value is datum.getValue() |\n| prediction | (value: any, data: any) => boolean |  (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match |\n| renderItem | (data: any) => ReactNode \\| string | required | When it is a string, return d\\[string]<br />When it is a function, return the result of the function. |\n| value | any[] | - | In the Form, the value will be taken over by the form and the value will lose efficacy. |\n| block | boolean | false | Vertical layout |\n"},836:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(301);n.default=function(){return a.a.createElement(r.a,null,"Checkbox")}},837:function(e,n){e.exports="/**\n * cn - 基本用法\n *    -- 基本的 Checkbox\n * en - Base\n *    -- Basic Checkbox\n */\nimport React from 'react'\nimport { Checkbox } from 'shineout'\n\nconst App: React.FC = () => <Checkbox>Checkbox</Checkbox>\n\nexport default App\n"},838:function(e,n){e.exports="/**\n * cn - 基本用法\n *    -- 基本的 Checkbox\n * en - Base\n *    -- Basic Checkbox\n */\nimport React from 'react';\nimport { Checkbox } from 'shineout';\nconst App = () => <Checkbox>Checkbox</Checkbox>;\nexport default App;\n"},839:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(301);n.default=function(){return a.a.createElement("div",null,a.a.createElement(r.a,{checked:!1},"not checked"),a.a.createElement(r.a,{checked:!0},"checked"),a.a.createElement(r.a,{checked:"indeterminate"},"indeterminate"))}},840:function(e,n){e.exports="/**\n * cn - 状态\n *    -- checked 有三个值，选中(true)、未选中(false)、半选中('indeterminate')。checked 设置时为受控组件（此示例没有处理 onChange 事件）。\n * en - Checked\n *    -- The checked has three values: true(checked), false(not checked), 'indeterminate'(half-checked).\n */\nimport React from 'react'\nimport { Checkbox } from 'shineout'\n\nconst App: React.FC = () => (\n  <div>\n    <Checkbox checked={false}>not checked</Checkbox>\n    <Checkbox checked>checked</Checkbox>\n    <Checkbox checked=\"indeterminate\">indeterminate</Checkbox>\n  </div>\n)\n\nexport default App\n"},841:function(e,n){e.exports="/**\n * cn - 状态\n *    -- checked 有三个值，选中(true)、未选中(false)、半选中('indeterminate')。checked 设置时为受控组件（此示例没有处理 onChange 事件）。\n * en - Checked\n *    -- The checked has three values: true(checked), false(not checked), 'indeterminate'(half-checked).\n */\nimport React from 'react';\nimport { Checkbox } from 'shineout';\nconst App = () => (<div>\n    <Checkbox checked={false}>not checked</Checkbox>\n    <Checkbox checked>checked</Checkbox>\n    <Checkbox checked=\"indeterminate\">indeterminate</Checkbox>\n  </div>);\nexport default App;\n"},842:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(301);n.default=function(){return a.a.createElement(r.a,{htmlValue:"ok",defaultValue:"ok"},'value is "ok"')}},843:function(e,n){e.exports="/**\n * cn - 选中值\n *    -- 未设置htmlValue的状态下，checkbox选中时返回true，如果设置 htmlValue，返回 htmlValue。未选中状态都是返回 undefined。\n * en - Value\n *    -- When the htmlValue is set, the checkbox return the htmlValue (checked) and undefined (not checked);\n *    -- When the htmlValue is not set, the checkbox selected return true (checked) and undefined (not checked);\n */\nimport React from 'react'\nimport { Checkbox } from 'shineout'\n\nconst App: React.FC = () => (\n  <Checkbox htmlValue=\"ok\" defaultValue=\"ok\">\n    {'value is \"ok\"'}\n  </Checkbox>\n)\n\nexport default App\n"},844:function(e,n){e.exports="/**\n * cn - 选中值\n *    -- 未设置htmlValue的状态下，checkbox选中时返回true，如果设置 htmlValue，返回 htmlValue。未选中状态都是返回 undefined。\n * en - Value\n *    -- When the htmlValue is set, the checkbox return the htmlValue (checked) and undefined (not checked);\n *    -- When the htmlValue is not set, the checkbox selected return true (checked) and undefined (not checked);\n */\nimport React from 'react';\nimport { Checkbox } from 'shineout';\nconst App = () => (<Checkbox htmlValue=\"ok\" defaultValue=\"ok\">\n    {'value is \"ok\"'}\n  </Checkbox>);\nexport default App;\n"},845:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(301),c=[{id:1,color:"red"},{id:2,color:"cyan"},{id:3,color:"blue"},{id:4,color:"green"},{id:5,color:"yellow"},{id:6,color:"orange"},{id:7,color:"violet"}];n.default=function(){return a.a.createElement(r.a.Group,{keygen:"id",defaultValue:[3,5]},c.map(function(e){return a.a.createElement(r.a,{key:e.id,htmlValue:e.id},e.color)}))}},846:function(e,n){e.exports="/**\n * cn - 一组复选框\n *    -- 一组复选框可以放在 Checkbox.Group 中\n * en - Group\n *    -- A series of checkboxes group by Checkbox.Group.\n */\nimport React from 'react'\nimport { Checkbox, TYPE } from 'shineout'\n\ninterface GroupData {\n  id: number\n  color: string\n}\ntype CheckboxGroupProps = TYPE.Checkbox.GroupProps<GroupData, number>\ntype CheckboxGroupData = CheckboxGroupProps['data']\n\nconst data: CheckboxGroupData = [\n  { id: 1, color: 'red' },\n  { id: 2, color: 'cyan' },\n  { id: 3, color: 'blue' },\n  { id: 4, color: 'green' },\n  { id: 5, color: 'yellow' },\n  { id: 6, color: 'orange' },\n  { id: 7, color: 'violet' },\n]\n\nconst App: React.FC = () => (\n  <Checkbox.Group keygen=\"id\" defaultValue={[3, 5]}>\n    {data.map(d => (\n      <Checkbox key={d.id} htmlValue={d.id}>\n        {d.color}\n      </Checkbox>\n    ))}\n  </Checkbox.Group>\n)\n\nexport default App\n"},847:function(e,n){e.exports="/**\n * cn - 一组复选框\n *    -- 一组复选框可以放在 Checkbox.Group 中\n * en - Group\n *    -- A series of checkboxes group by Checkbox.Group.\n */\nimport React from 'react';\nimport { Checkbox } from 'shineout';\nconst data = [\n    { id: 1, color: 'red' },\n    { id: 2, color: 'cyan' },\n    { id: 3, color: 'blue' },\n    { id: 4, color: 'green' },\n    { id: 5, color: 'yellow' },\n    { id: 6, color: 'orange' },\n    { id: 7, color: 'violet' },\n];\nconst App = () => (<Checkbox.Group keygen=\"id\" defaultValue={[3, 5]}>\n    {data.map(d => (<Checkbox key={d.id} htmlValue={d.id}>\n        {d.color}\n      </Checkbox>))}\n  </Checkbox.Group>);\nexport default App;\n"},848:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(301),c=["red","orange","yellow","green","cyan","blue","violet"],l=function(e){var n={borderBottom:"solid 1px ".concat(e),paddingBottom:2};return a.a.createElement("span",{style:n},e)};n.default=function(){return a.a.createElement(r.a.Group,{keygen:function(e){return e},data:c,defaultValue:["blue","cyan"],renderItem:l})}},849:function(e,n){e.exports="/**\n * cn -\n *    -- 可以直接通过数据来渲染一组 Checkbox\n * en -\n *    -- Render a group of checkboxes from data.\n */\nimport React from 'react'\nimport { Checkbox, TYPE } from 'shineout'\n\ntype DataItem = string\ntype CheckboxGroupProps = TYPE.Checkbox.GroupProps<DataItem, string>\ntype CheckboxGroupData = CheckboxGroupProps['data']\ntype CheckboxGroupRenderItem = CheckboxGroupProps['renderItem']\n\nconst data: CheckboxGroupData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\n\nconst renderItem: CheckboxGroupRenderItem = color => {\n  const style = { borderBottom: `solid 1px ${color}`, paddingBottom: 2 }\n  return <span style={style}>{color}</span>\n}\n\nconst App: React.FC = () => (\n  <Checkbox.Group keygen={c => c} data={data} defaultValue={['blue', 'cyan']} renderItem={renderItem} />\n)\n\nexport default App\n"},850:function(e,n){e.exports="/**\n * cn -\n *    -- 可以直接通过数据来渲染一组 Checkbox\n * en -\n *    -- Render a group of checkboxes from data.\n */\nimport React from 'react';\nimport { Checkbox } from 'shineout';\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];\nconst renderItem = color => {\n    const style = { borderBottom: `solid 1px ${color}`, paddingBottom: 2 };\n    return <span style={style}>{color}</span>;\n};\nconst App = () => (<Checkbox.Group keygen={c => c} data={data} defaultValue={['blue', 'cyan']} renderItem={renderItem}/>);\nexport default App;\n"},851:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(301),c=[{id:1,color:"red"},{id:2,color:"cyan"},{id:3,color:"blue"},{id:4,color:"green"},{id:5,color:"yellow"},{id:6,color:"orange"},{id:7,color:"violet"}];n.default=function(){return a.a.createElement(r.a.Group,{keygen:"id",data:c,format:"color",defaultValue:["blue","cyan"],renderItem:function(e){var n={borderBottom:"solid 1px ".concat(e.color),paddingBottom:2};return a.a.createElement("span",{style:n},e.color)}})}},852:function(e,n){e.exports="/**\n * cn - 复杂数据\n *    -- 复杂的数据可以使用 format 处理 value\n * en - Complex data\n *    -- Complex data can use format to process value.\n */\nimport React from 'react'\nimport { Checkbox, TYPE } from 'shineout'\n\ninterface DataItem {\n  id: number\n  color: string\n}\ntype CheckboxGroupProps = TYPE.Checkbox.GroupProps<DataItem, string>\ntype CheckboxGroupData = CheckboxGroupProps['data']\ntype CheckboxGroupRenderItem = CheckboxGroupProps['renderItem']\n\nconst data: CheckboxGroupData = [\n  { id: 1, color: 'red' },\n  { id: 2, color: 'cyan' },\n  { id: 3, color: 'blue' },\n  { id: 4, color: 'green' },\n  { id: 5, color: 'yellow' },\n  { id: 6, color: 'orange' },\n  { id: 7, color: 'violet' },\n]\n\nconst App: React.FC = () => {\n  const renderItem: CheckboxGroupRenderItem = d => {\n    const style = { borderBottom: `solid 1px ${d.color}`, paddingBottom: 2 }\n    return <span style={style}>{d.color}</span>\n  }\n\n  return (\n    <Checkbox.Group keygen=\"id\" data={data} format=\"color\" defaultValue={['blue', 'cyan']} renderItem={renderItem} />\n  )\n}\n\nexport default App\n"},853:function(e,n){e.exports="/**\n * cn - 复杂数据\n *    -- 复杂的数据可以使用 format 处理 value\n * en - Complex data\n *    -- Complex data can use format to process value.\n */\nimport React from 'react';\nimport { Checkbox } from 'shineout';\nconst data = [\n    { id: 1, color: 'red' },\n    { id: 2, color: 'cyan' },\n    { id: 3, color: 'blue' },\n    { id: 4, color: 'green' },\n    { id: 5, color: 'yellow' },\n    { id: 6, color: 'orange' },\n    { id: 7, color: 'violet' },\n];\nconst App = () => {\n    const renderItem = d => {\n        const style = { borderBottom: `solid 1px ${d.color}`, paddingBottom: 2 };\n        return <span style={style}>{d.color}</span>;\n    };\n    return (<Checkbox.Group keygen=\"id\" data={data} format=\"color\" defaultValue={['blue', 'cyan']} renderItem={renderItem}/>);\n};\nexport default App;\n"},854:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(301),c=[{id:1,color:"red"},{id:2,color:"cyan"},{id:3,color:"blue"},{id:4,color:"green"},{id:5,color:"yellow"},{id:6,color:"orange"},{id:7,color:"violet"}];n.default=function(){return a.a.createElement(r.a.Group,{block:!0,keygen:"id",data:c,renderItem:"color",datum:{format:"color"},defaultValue:["blue","cyan"]})}},855:function(e,n){e.exports="/**\n * cn - 垂直布局\n *    -- 默认是水平布局，设置 block 属性可以改为垂直布局\n * en - Block\n *    -- The default is horizontal layout, and setting the block property can change it to be vertical layout.\n */\nimport React from 'react'\nimport { Checkbox, TYPE } from 'shineout'\n\ninterface DataItem {\n  id: number\n  color: string\n}\ntype CheckboxGroupProps = TYPE.Checkbox.GroupProps<DataItem, string>\ntype CheckboxGroupData = CheckboxGroupProps['data']\n\nconst data: CheckboxGroupData = [\n  { id: 1, color: 'red' },\n  { id: 2, color: 'cyan' },\n  { id: 3, color: 'blue' },\n  { id: 4, color: 'green' },\n  { id: 5, color: 'yellow' },\n  { id: 6, color: 'orange' },\n  { id: 7, color: 'violet' },\n]\n\nconst App: React.FC = () => (\n  <Checkbox.Group\n    block\n    keygen=\"id\"\n    data={data}\n    renderItem=\"color\"\n    datum={{ format: 'color' }}\n    defaultValue={['blue', 'cyan']}\n  />\n)\n\nexport default App\n"},856:function(e,n){e.exports="/**\n * cn - 垂直布局\n *    -- 默认是水平布局，设置 block 属性可以改为垂直布局\n * en - Block\n *    -- The default is horizontal layout, and setting the block property can change it to be vertical layout.\n */\nimport React from 'react';\nimport { Checkbox } from 'shineout';\nconst data = [\n    { id: 1, color: 'red' },\n    { id: 2, color: 'cyan' },\n    { id: 3, color: 'blue' },\n    { id: 4, color: 'green' },\n    { id: 5, color: 'yellow' },\n    { id: 6, color: 'orange' },\n    { id: 7, color: 'violet' },\n];\nconst App = () => (<Checkbox.Group block keygen=\"id\" data={data} renderItem=\"color\" datum={{ format: 'color' }} defaultValue={['blue', 'cyan']}/>);\nexport default App;\n"},857:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(301),c=["red","orange","yellow","green","cyan","blue","violet"];n.default=function(){return a.a.createElement("div",null,a.a.createElement(r.a.Group,{disabled:!0,keygen:!0,data:c,defaultValue:["blue","cyan"],renderItem:function(e){return e}}),a.a.createElement("br",null),a.a.createElement(r.a,{disabled:!0,checked:!1},"not checked"),a.a.createElement(r.a,{disabled:!0,checked:!0},"checked"),a.a.createElement(r.a,{disabled:!0,checked:"indeterminate"},"indeterminate"))}},858:function(e,n){e.exports="/**\n * cn - 禁用\n *    -- 设置 Checkbox.Group 的 disabled 为 true，禁用全部选项\n * en - Disabled\n *    -- Set the disabled property of Checkbox.Group to true, disable all the checkboxes.\n */\nimport React from 'react'\nimport { Checkbox, TYPE } from 'shineout'\n\ntype DataItem = string\ntype CheckboxGroupProps = TYPE.Checkbox.GroupProps<DataItem, string>\ntype CheckboxGroupData = CheckboxGroupProps['data']\n\nconst data: CheckboxGroupData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\n\nconst App: React.FC = () => (\n  <div>\n    <Checkbox.Group disabled keygen data={data} defaultValue={['blue', 'cyan']} renderItem={d => d} />\n    <br />\n    <Checkbox disabled checked={false}>\n      not checked\n    </Checkbox>\n    <Checkbox disabled checked>\n      checked\n    </Checkbox>\n    <Checkbox disabled checked=\"indeterminate\">\n      indeterminate\n    </Checkbox>\n  </div>\n)\n\nexport default App\n"},859:function(e,n){e.exports="/**\n * cn - 禁用\n *    -- 设置 Checkbox.Group 的 disabled 为 true，禁用全部选项\n * en - Disabled\n *    -- Set the disabled property of Checkbox.Group to true, disable all the checkboxes.\n */\nimport React from 'react';\nimport { Checkbox } from 'shineout';\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];\nconst App = () => (<div>\n    <Checkbox.Group disabled keygen data={data} defaultValue={['blue', 'cyan']} renderItem={d => d}/>\n    <br />\n    <Checkbox disabled checked={false}>\n      not checked\n    </Checkbox>\n    <Checkbox disabled checked>\n      checked\n    </Checkbox>\n    <Checkbox disabled checked=\"indeterminate\">\n      indeterminate\n    </Checkbox>\n  </div>);\nexport default App;\n"},860:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(301),c=["red","orange","yellow","green","cyan","blue","violet"];n.default=function(){return a.a.createElement("div",null,a.a.createElement(r.a.Group,{data:c,disabled:function(e){return"yellow"===e},keygen:!0,defaultValue:["blue"],renderItem:function(e){return e}}))}},861:function(e,n){e.exports="/**\n * cn -\n *    -- disabled 为函数时，根据函数结果实现有条件禁用\n * en -\n *    -- When the disabled is a function, disbale the option that the function to return true.\n */\nimport React from 'react'\nimport { Checkbox, TYPE } from 'shineout'\n\ntype DataItem = string\ntype CheckboxGroupProps = TYPE.Checkbox.GroupProps<DataItem, string>\ntype CheckboxGroupData = CheckboxGroupProps['data']\n\nconst data: CheckboxGroupData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\n\nconst App: React.FC = () => (\n  <div>\n    <Checkbox.Group data={data} disabled={d => d === 'yellow'} keygen defaultValue={['blue']} renderItem={d => d} />\n  </div>\n)\n\nexport default App\n"},862:function(e,n){e.exports="/**\n * cn -\n *    -- disabled 为函数时，根据函数结果实现有条件禁用\n * en -\n *    -- When the disabled is a function, disbale the option that the function to return true.\n */\nimport React from 'react';\nimport { Checkbox } from 'shineout';\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];\nconst App = () => (<div>\n    <Checkbox.Group data={data} disabled={d => d === 'yellow'} keygen defaultValue={['blue']} renderItem={d => d}/>\n  </div>);\nexport default App;\n"},863:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(301);n.default=function(){return a.a.createElement(r.a,{inputable:!0},"more...")}},864:function(e,n){e.exports="/**\n * cn - 带输入\n *    -- 设置 inputable 属性可以显示输入框，返回值为输入框内容\n * en - Inputable\n *    -- Set the inputable property to true can show the input box and the return value is the value of the input box.\n */\nimport React from 'react'\nimport { Checkbox } from 'shineout'\n\nconst App: React.FC = () => <Checkbox inputable>more...</Checkbox>\n\nexport default App\n"},865:function(e,n){e.exports="/**\n * cn - 带输入\n *    -- 设置 inputable 属性可以显示输入框，返回值为输入框内容\n * en - Inputable\n *    -- Set the inputable property to true can show the input box and the return value is the value of the input box.\n */\nimport React from 'react';\nimport { Checkbox } from 'shineout';\nconst App = () => <Checkbox inputable>more...</Checkbox>;\nexport default App;\n"},866:function(e,n,t){"use strict";t.r(n);var a=t(24),r=t(0),c=t.n(r),l=t(301);n.default=function(){var e=Object(r.useState)(0),n=Object(a.a)(e,2),t=n[0],o=n[1];return c.a.createElement("div",null,c.a.createElement(l.a,{onClick:function(){return o(t+1)}},"Click Me"," ".concat(t," Times!")))}},867:function(e,n){e.exports="/**\n * cn - 点击回调\n *    -- 点击选择框后的回调\n * en - OnClick\n *    -- Checkbox click callback\n */\nimport React, { useState } from 'react'\nimport { Checkbox } from 'shineout'\n\nconst App: React.FC = () => {\n  const [total, setTotal] = useState(0)\n\n  return (\n    <div>\n      <Checkbox onClick={() => setTotal(total + 1)}>\n        Click Me\n        {` ${total} Times!`}\n      </Checkbox>\n    </div>\n  )\n}\n\nexport default App\n"},868:function(e,n){e.exports="/**\n * cn - 点击回调\n *    -- 点击选择框后的回调\n * en - OnClick\n *    -- Checkbox click callback\n */\nimport React, { useState } from 'react';\nimport { Checkbox } from 'shineout';\nconst App = () => {\n    const [total, setTotal] = useState(0);\n    return (<div>\n      <Checkbox onClick={() => setTotal(total + 1)}>\n        Click Me\n        {` ${total} Times!`}\n      </Checkbox>\n    </div>);\n};\nexport default App;\n"}}]);