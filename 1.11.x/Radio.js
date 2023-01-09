(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[38],{1108:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(562),i=t(563),d=t(40),l=t(1109),u=t.n(l),c=t(1110),s=t.n(c),p=Object(d.b)(u.a,s.a),f=[{name:"1-base",isTs:!0,isTest:!1,title:Object(d.b)("基本用法 \n Radio.Group 通过数据来生成一组单选框。","Base \n Radio.Group generate a group of radios from an array."),component:t(1111).default,rawText:t(1112),parseTsText:t(1113)},{name:"2-group",isTs:!0,isTest:!1,title:Object(d.b)(" \n 将一组 Radio 放在 Radio.Group 中，以 React 组件方式调用。"," \n A series of radios group by Radio.Group."),component:t(1114).default,rawText:t(1115),parseTsText:t(1116)},{name:"3-format",isTs:!0,isTest:!1,title:Object(d.b)("复杂数据 \n 复杂的数据可以使用 format 处理 value","Complex data \n Complex data can use format to process value."),component:t(1117).default,rawText:t(1118),parseTsText:t(1119)},{name:"5-block",isTs:!0,isTest:!1,title:Object(d.b)("垂直布局 \n 默认为水平布局，设置 block 属性可以改为垂直布局","Vertical layout \n The default is horizontal layout and setting the block property can changed it to be vertical layout."),component:t(1120).default,rawText:t(1121),parseTsText:t(1122)},{name:"6-button-1",isTs:!0,isTest:!1,title:Object(d.b)("按钮样式 \n 设置 button 属性可以展示为按钮样式","Button \n set button to show button style"),component:t(1123).default,rawText:t(1124),parseTsText:t(1125)},{name:"6-button-2",isTs:!0,isTest:!1,title:Object(d.b)(" \n 设置 button 为 outline 可以展示透明背景的按钮样式"," \n set button with outline to show outline button style"),component:t(1126).default,rawText:t(1127),parseTsText:t(1128)},{name:"6-button-3",isTs:!0,isTest:!1,title:Object(d.b)(" \n 设置 size 可以控制按钮样式的大小"," \n size to set button style size"),component:t(1129).default,rawText:t(1130),parseTsText:t(1131)},{name:"7-disabled",isTs:!0,isTest:!1,title:Object(d.b)("禁用 \n 设置 disabled 为 true 时，禁用所有选项","Disabled \n Set disabled property is set to true, all the options is disabled."),component:t(1132).default,rawText:t(1133),parseTsText:t(1134)},{name:"8-disabled",isTs:!0,isTest:!1,title:Object(d.b)(" \n disabled 为函数时，根据函数返回结果实现有条件禁用"," \n When the disabled is a function, disbale the option that the function to return true."),component:t(1135).default,rawText:t(1136),parseTsText:t(1137)},{name:"9-toggle",isTs:!0,isTest:!1,title:Object(d.b)("支持取消 \n 使用组件形式来支持取消选中","Cancel \n Use component list for toggle radio"),component:t(1138).default,rawText:t(1139),parseTsText:t(1140)}];n.default=Object(r.a)(function(e){return o.a.createElement(i.b,Object.assign({},e,{codes:void 0,source:p,examples:f}))})},1109:function(e,n){e.exports="# Radio *单选框*\n\n<example />\n\n## API\n\nRadio 不能单独使用\n\n### Radio\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| checked | boolean \\| 'indeterminate' | 无 | checked 传入时为受控组件 |\n| disabled | boolean | false | 是否禁用 |\n| htmlValue | any | true | 选中时返回值 |\n\n### Radio.Group\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| defaultValue | any | | 默认值，设置 value 时，会覆盖 defaultValue |\n| data | any[] | 必填 | 数据项 |\n| disabled | (data: any) => boolean \\| boolean | false | 是否禁用 |\n| format | (data: any) => any \\| string | d => d | 格式化 value<br />默认值，返回原始数据<br />为string时，会作为key从原始数据中获取值，相当于 (d) => d\\[format\\]<br /> 为函数时，以函数返回结果作为 value |\n| keygen | ((data: any) => string) \\| string \\| true | 必填 | 生成每一项key的辅助方法<br />为 true 时，以数据项本身作为key，相当于 (d => d)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id) |\n| name | string | 无 | Form 存取数据的名称 |\n| onChange | (value: any) => void | 无 | value 为 datum.getValue() |\n| prediction | (value: any, data: any) => boolean | (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配 |\n| renderItem | (data: any) => ReactNode \\| string | 必填 | 为 string 时，返回 d\\[string]<br />为 function 时，返回函数结果 |\n| value | any | | 在Form中，value会被表单接管，value无效 |\n"},1110:function(e,n){e.exports="# Radio\n\n<example />\n\n## API\n\nRadio cannot be used alone.\n\n### Radio\n\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| checked | boolean \\| 'indeterminate' | - | if not set, use (value === htmlValue). |\n| disabled | boolean | false | disable checkbox |\n| htmlValue | any | true | Specifies the result |\n\n### Radio.Group\n\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| defaultValue | any | | default value. |\n| data | any[] | required | the data items |\n| disabled | (data: any) => boolean \\| boolean  | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |\n| format | (data: any) => any \\| string | d => d | Format value<br />Default value, return original data. <br />When it is a string, it will get the value from the original data as a key .The same as (d) => d\\[format\\]<br />When it is a function, the result returned by the function will be the value. |\n| keygen | ((data: any) => string) \\| string \\| true  | required | Key generator<br />When it is true, the data itself is used as the key equivalent to (d => d)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |\n| name | string | none | The name of a Form that accesses data |\n| onChange | (value: any) => void | none | value is the datum.getValue() |\n| prediction | (value: any, data: any) => boolean | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function used to determine whether match. |\n| renderItem | (data: any) => ReactNode \\| string | required | When it is a string, return d\\[string]<br />When it is a function, return the result of the function. |\n| value | any | | In the Form, value is taken over by the Form and the value will be invalid. |\n"},1111:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(304),i=["red","orange","yellow","green","cyan","blue","violet"];n.default=function(){return o.a.createElement(r.a.Group,{keygen:!0,data:i,defaultValue:"blue",renderItem:function(e){var n={borderBottom:"solid 1px ".concat(e),paddingBottom:2};return o.a.createElement("span",{style:n},e)}})}},1112:function(e,n){e.exports="/**\n * cn - 基本用法\n *    -- Radio.Group 通过数据来生成一组单选框。\n * en - Base\n *    -- Radio.Group generate a group of radios from an array.\n */\nimport React from 'react'\nimport { Radio, TYPE } from 'shineout'\n\ntype RadioGroupItem = string\ntype RadioGroupProps = TYPE.Radio.GroupProps<RadioGroupItem, string>\ntype RadioGroupRenderItem = RadioGroupProps['renderItem']\n\nconst data: RadioGroupItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\n\nconst App: React.FC = () => {\n  const renderItem: RadioGroupRenderItem = color => {\n    const style = { borderBottom: `solid 1px ${color}`, paddingBottom: 2 }\n\n    return <span style={style}>{color}</span>\n  }\n\n  return <Radio.Group keygen data={data} defaultValue=\"blue\" renderItem={renderItem} />\n}\n\nexport default App\n"},1113:function(e,n){e.exports="/**\n * cn - 基本用法\n *    -- Radio.Group 通过数据来生成一组单选框。\n * en - Base\n *    -- Radio.Group generate a group of radios from an array.\n */\nimport React from 'react';\nimport { Radio } from 'shineout';\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];\nconst App = () => {\n    const renderItem = color => {\n        const style = { borderBottom: `solid 1px ${color}`, paddingBottom: 2 };\n        return <span style={style}>{color}</span>;\n    };\n    return <Radio.Group keygen data={data} defaultValue=\"blue\" renderItem={renderItem}/>;\n};\nexport default App;\n"},1114:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(304),i=["red","orange","yellow","green","cyan","blue","violet"];n.default=function(){return o.a.createElement(r.a.Group,{keygen:!0,defaultValue:"yellow"},i.map(function(e){return o.a.createElement(r.a,{key:e,htmlValue:e},e)}))}},1115:function(e,n){e.exports="/**\n * cn -\n *    -- 将一组 Radio 放在 Radio.Group 中，以 React 组件方式调用。\n * en -\n *    -- A series of radios group by Radio.Group.\n */\nimport React from 'react'\nimport { Radio } from 'shineout'\n\nconst data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\n\nconst App: React.FC = () => (\n  <Radio.Group keygen defaultValue=\"yellow\">\n    {data.map(d => (\n      <Radio key={d} htmlValue={d}>\n        {d}\n      </Radio>\n    ))}\n  </Radio.Group>\n)\nexport default App\n"},1116:function(e,n){e.exports="/**\n * cn -\n *    -- 将一组 Radio 放在 Radio.Group 中，以 React 组件方式调用。\n * en -\n *    -- A series of radios group by Radio.Group.\n */\nimport React from 'react';\nimport { Radio } from 'shineout';\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];\nconst App = () => (<Radio.Group keygen defaultValue=\"yellow\">\n    {data.map(d => (<Radio key={d} htmlValue={d}>\n        {d}\n      </Radio>))}\n  </Radio.Group>);\nexport default App;\n"},1117:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(304),i=[{id:1,color:"red"},{id:2,color:"orange"},{id:3,color:"yellow"},{id:4,color:"green"},{id:5,color:"cyan"},{id:6,color:"blue"},{id:7,color:"violet"}];n.default=function(){return o.a.createElement(r.a.Group,{keygen:"id",data:i,format:"color",defaultValue:"blue",renderItem:"color"})}},1118:function(e,n){e.exports="/**\n * cn - 复杂数据\n *    -- 复杂的数据可以使用 format 处理 value\n * en - Complex data\n *    -- Complex data can use format to process value.\n */\nimport React from 'react'\nimport { Radio } from 'shineout'\n\ninterface RadioGroupItem {\n  id: number\n  color: string\n}\nconst data: RadioGroupItem[] = [\n  { id: 1, color: 'red' },\n  { id: 2, color: 'orange' },\n  { id: 3, color: 'yellow' },\n  { id: 4, color: 'green' },\n  { id: 5, color: 'cyan' },\n  { id: 6, color: 'blue' },\n  { id: 7, color: 'violet' },\n]\n\nconst App: React.FC = () => (\n  <Radio.Group keygen=\"id\" data={data} format=\"color\" defaultValue=\"blue\" renderItem=\"color\" />\n)\n\nexport default App\n"},1119:function(e,n){e.exports="/**\n * cn - 复杂数据\n *    -- 复杂的数据可以使用 format 处理 value\n * en - Complex data\n *    -- Complex data can use format to process value.\n */\nimport React from 'react';\nimport { Radio } from 'shineout';\nconst data = [\n    { id: 1, color: 'red' },\n    { id: 2, color: 'orange' },\n    { id: 3, color: 'yellow' },\n    { id: 4, color: 'green' },\n    { id: 5, color: 'cyan' },\n    { id: 6, color: 'blue' },\n    { id: 7, color: 'violet' },\n];\nconst App = () => (<Radio.Group keygen=\"id\" data={data} format=\"color\" defaultValue=\"blue\" renderItem=\"color\"/>);\nexport default App;\n"},1120:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(304),i=[{id:1,color:"red"},{id:2,color:"orange"},{id:3,color:"yellow"},{id:4,color:"green"},{id:5,color:"cyan"},{id:6,color:"blue"},{id:7,color:"violet"}];n.default=function(){return o.a.createElement(r.a.Group,{keygen:"id",block:!0,data:i,datum:{format:"id"},defaultValue:3,renderItem:"color"})}},1121:function(e,n){e.exports="/**\n * cn - 垂直布局\n *    -- 默认为水平布局，设置 block 属性可以改为垂直布局\n * en - Vertical layout\n *    -- The default is horizontal layout and setting the block property can changed it to be vertical layout.\n */\nimport React from 'react'\nimport { Radio } from 'shineout'\n\ninterface RadioGroupItem {\n  id: number\n  color: string\n}\n\nconst data: RadioGroupItem[] = [\n  { id: 1, color: 'red' },\n  { id: 2, color: 'orange' },\n  { id: 3, color: 'yellow' },\n  { id: 4, color: 'green' },\n  { id: 5, color: 'cyan' },\n  { id: 6, color: 'blue' },\n  { id: 7, color: 'violet' },\n]\n\nconst App: React.FC = () => (\n  <Radio.Group keygen=\"id\" block data={data} datum={{ format: 'id' }} defaultValue={3} renderItem=\"color\" />\n)\n\nexport default App\n"},1122:function(e,n){e.exports="/**\n * cn - 垂直布局\n *    -- 默认为水平布局，设置 block 属性可以改为垂直布局\n * en - Vertical layout\n *    -- The default is horizontal layout and setting the block property can changed it to be vertical layout.\n */\nimport React from 'react';\nimport { Radio } from 'shineout';\nconst data = [\n    { id: 1, color: 'red' },\n    { id: 2, color: 'orange' },\n    { id: 3, color: 'yellow' },\n    { id: 4, color: 'green' },\n    { id: 5, color: 'cyan' },\n    { id: 6, color: 'blue' },\n    { id: 7, color: 'violet' },\n];\nconst App = () => (<Radio.Group keygen=\"id\" block data={data} datum={{ format: 'id' }} defaultValue={3} renderItem=\"color\"/>);\nexport default App;\n"},1123:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(304),i=["red","orange","yellow"];n.default=function(){return o.a.createElement(r.a.Group,{button:!0,keygen:!0,data:i,defaultValue:"red"})}},1124:function(e,n){e.exports="/**\n * cn - 按钮样式\n *    -- 设置 button 属性可以展示为按钮样式\n * en - Button\n *    -- set button to show button style\n */\nimport React from 'react'\nimport { Radio } from 'shineout'\n\nconst data: string[] = ['red', 'orange', 'yellow']\n\nconst App: React.FC = () => <Radio.Group button keygen data={data} defaultValue=\"red\" />\n\nexport default App\n"},1125:function(e,n){e.exports="/**\n * cn - 按钮样式\n *    -- 设置 button 属性可以展示为按钮样式\n * en - Button\n *    -- set button to show button style\n */\nimport React from 'react';\nimport { Radio } from 'shineout';\nconst data = ['red', 'orange', 'yellow'];\nconst App = () => <Radio.Group button keygen data={data} defaultValue=\"red\"/>;\nexport default App;\n"},1126:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(304),i=["red","orange","yellow"];n.default=function(){return o.a.createElement(r.a.Group,{button:"outline",keygen:!0,data:i,defaultValue:"red"})}},1127:function(e,n){e.exports="/**\n * cn -\n *    -- 设置 button 为 outline 可以展示透明背景的按钮样式\n * en -\n *    -- set button with outline to show outline button style\n */\nimport React from 'react'\nimport { Radio } from 'shineout'\n\nconst data: string[] = ['red', 'orange', 'yellow']\n\nconst App: React.FC = () => <Radio.Group button=\"outline\" keygen data={data} defaultValue=\"red\" />\n\nexport default App\n"},1128:function(e,n){e.exports="/**\n * cn -\n *    -- 设置 button 为 outline 可以展示透明背景的按钮样式\n * en -\n *    -- set button with outline to show outline button style\n */\nimport React from 'react';\nimport { Radio } from 'shineout';\nconst data = ['red', 'orange', 'yellow'];\nconst App = () => <Radio.Group button=\"outline\" keygen data={data} defaultValue=\"red\"/>;\nexport default App;\n"},1129:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(304),i=["red","orange","yellow"];n.default=function(){return o.a.createElement("div",null,o.a.createElement(r.a.Group,{size:"small",button:!0,keygen:!0,data:i,defaultValue:"red"}),o.a.createElement(r.a.Group,{keygen:!0,button:!0,data:i,defaultValue:"red"}),o.a.createElement(r.a.Group,{size:"large",button:!0,keygen:!0,data:i,defaultValue:"red"}))}},1130:function(e,n){e.exports="/**\n * cn -\n *    -- 设置 size 可以控制按钮样式的大小\n * en -\n *    -- size to set button style size\n */\nimport React from 'react'\nimport { Radio } from 'shineout'\n\nconst data: string[] = ['red', 'orange', 'yellow']\n\nconst App: React.FC = () => (\n  <div>\n    <Radio.Group size=\"small\" button keygen data={data} defaultValue=\"red\" />\n    <Radio.Group keygen button data={data} defaultValue=\"red\" />\n    <Radio.Group size=\"large\" button keygen data={data} defaultValue=\"red\" />\n  </div>\n)\n\nexport default App\n"},1131:function(e,n){e.exports="/**\n * cn -\n *    -- 设置 size 可以控制按钮样式的大小\n * en -\n *    -- size to set button style size\n */\nimport React from 'react';\nimport { Radio } from 'shineout';\nconst data = ['red', 'orange', 'yellow'];\nconst App = () => (<div>\n    <Radio.Group size=\"small\" button keygen data={data} defaultValue=\"red\"/>\n    <Radio.Group keygen button data={data} defaultValue=\"red\"/>\n    <Radio.Group size=\"large\" button keygen data={data} defaultValue=\"red\"/>\n  </div>);\nexport default App;\n"},1132:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(304),i=["red","orange","yellow","green","cyan","blue","violet"];n.default=function(){return o.a.createElement(r.a.Group,{keygen:!0,disabled:!0,data:i,defaultValue:"blue",renderItem:function(e){return e}})}},1133:function(e,n){e.exports="/**\n * cn - 禁用\n *    -- 设置 disabled 为 true 时，禁用所有选项\n * en - Disabled\n *    -- Set disabled property is set to true, all the options is disabled.\n */\nimport React from 'react'\nimport { Radio } from 'shineout'\n\nconst data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\n\nconst App: React.FC = () => <Radio.Group keygen disabled data={data} defaultValue=\"blue\" renderItem={d => d} />\n\nexport default App\n"},1134:function(e,n){e.exports="/**\n * cn - 禁用\n *    -- 设置 disabled 为 true 时，禁用所有选项\n * en - Disabled\n *    -- Set disabled property is set to true, all the options is disabled.\n */\nimport React from 'react';\nimport { Radio } from 'shineout';\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];\nconst App = () => <Radio.Group keygen disabled data={data} defaultValue=\"blue\" renderItem={d => d}/>;\nexport default App;\n"},1135:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(304),i=["red","orange","yellow","green","cyan","blue","violet"];n.default=function(){return o.a.createElement(r.a.Group,{keygen:!0,data:i,disabled:function(e){return"yellow"===e},defaultValue:"blue",renderItem:function(e){return e}})}},1136:function(e,n){e.exports="/**\n * cn -\n *    -- disabled 为函数时，根据函数返回结果实现有条件禁用\n * en -\n *    -- When the disabled is a function, disbale the option that the function to return true.\n */\nimport React from 'react'\nimport { Radio } from 'shineout'\n\nconst data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\n\nconst App: React.FC = () => (\n  <Radio.Group keygen data={data} disabled={d => d === 'yellow'} defaultValue=\"blue\" renderItem={d => d} />\n)\n\nexport default App\n"},1137:function(e,n){e.exports="/**\n * cn -\n *    -- disabled 为函数时，根据函数返回结果实现有条件禁用\n * en -\n *    -- When the disabled is a function, disbale the option that the function to return true.\n */\nimport React from 'react';\nimport { Radio } from 'shineout';\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];\nconst App = () => (<Radio.Group keygen data={data} disabled={d => d === 'yellow'} defaultValue=\"blue\" renderItem={d => d}/>);\nexport default App;\n"},1138:function(e,n,t){"use strict";t.r(n);var o=t(24),r=t(0),i=t.n(r),d=t(304),l=["red","orange","yellow","green","cyan","blue","violet"];n.default=function(){var e=Object(r.useState)("red"),n=Object(o.a)(e,2),t=n[0],a=n[1];return i.a.createElement(d.a.Group,{keygen:!0,value:t,onChange:function(e){return a(e)}},l.map(function(e){return i.a.createElement("span",{key:e,onClick:function(){t===e&&setTimeout(function(){return a("")})}},i.a.createElement(d.a,{htmlValue:e},e))}))}},1139:function(e,n){e.exports="/**\n * cn - 支持取消\n *    -- 使用组件形式来支持取消选中\n * en - Cancel\n *    -- Use component list for toggle radio\n */\nimport React, { useState } from 'react'\nimport { Radio } from 'shineout'\n\ntype RadioGroupItem = string\n\nconst data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\n\nconst App: React.FC = () => {\n  const [current, setCurrent] = useState<RadioGroupItem>('red')\n\n  return (\n    <Radio.Group keygen value={current} onChange={c => setCurrent(c)}>\n      {data.map(d => (\n        <span\n          key={d}\n          onClick={() => {\n            if (current === d) setTimeout(() => setCurrent(''))\n          }}\n        >\n          <Radio htmlValue={d}>{d}</Radio>\n        </span>\n      ))}\n    </Radio.Group>\n  )\n}\n\nexport default App\n"},1140:function(e,n){e.exports="/**\n * cn - 支持取消\n *    -- 使用组件形式来支持取消选中\n * en - Cancel\n *    -- Use component list for toggle radio\n */\nimport React, { useState } from 'react';\nimport { Radio } from 'shineout';\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];\nconst App = () => {\n    const [current, setCurrent] = useState('red');\n    return (<Radio.Group keygen value={current} onChange={c => setCurrent(c)}>\n      {data.map(d => (<span key={d} onClick={() => {\n                if (current === d)\n                    setTimeout(() => setCurrent(''));\n            }}>\n          <Radio htmlValue={d}>{d}</Radio>\n        </span>))}\n    </Radio.Group>);\n};\nexport default App;\n"},304:function(e,n,t){"use strict";var a=t(21),o=t(60),r=t(74),s=t(561),i=t(4),d=t(5),l=t(1),u=t(20),c=t(6),p=t(7),f=t(2),m=t(0),b=t.n(m),y=t(14),h=t.n(y),g=t(17),R=t(22),v=t(10),k=t(61),x=t(186),w=t(9);function G(a){return function(){var e,n=Object(f.a)(a);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var t=Object(f.a)(this).constructor;e=Reflect.construct(n,arguments,t)}else e=n.apply(this,arguments);return Object(p.a)(this,e)}}var T=function(e){Object(c.a)(a,e);var t=G(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleClick=n.handleClick.bind(Object(l.a)(n)),n.handleUpdate=n.forceUpdate.bind(Object(l.a)(n)),n.handleRawChange=n.handleRawChange.bind(Object(l.a)(n)),n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){Object(u.a)(Object(f.a)(a.prototype),"componentDidMount",this).call(this),this.props.datum.subscribe(v.a,this.handleUpdate)}},{key:"componentWillUnmount",value:function(){Object(u.a)(Object(f.a)(a.prototype),"componentWillUnmount",this).call(this),this.props.datum.unsubscribe(v.a,this.handleUpdate)}},{key:"getContent",value:function(e,n){var t=this.props.renderItem;return"string"==typeof t?e[t]:"function"==typeof t?t(e,n):""}},{key:"handleClick",value:function(e,n,t){var a=this.props,o=a.data;a.datum.set(o[t])}},{key:"handleRawChange",value:function(e){this.props.datum.set(e)}},{key:"render",value:function(){var t=this,e=this.props,n=e.block,a=e.data,o=e.datum,r=e.keygen,i=e.children,d=e.button,l=e.size,u=Object(w.b)(),c=h()(Object(k.a)("group",n&&"block",d&&"button","outline"===d&&"outline",d&&l,u&&"rtl"),this.props.className);return void 0===a?b.a.createElement("div",{className:c},b.a.createElement(s.a,{value:{onRawChange:this.handleRawChange,checked:o.check.bind(o)}},i)):b.a.createElement("div",{className:c},a.map(function(e,n){return b.a.createElement(x.a,{checked:o.check(e),disabled:o.disabled(e),key:Object(R.b)(e,r,n),htmlValue:n,index:n,onChange:t.handleClick},t.getContent(e,n))}),i)}}]),a}(g.b);T.defaultProps={renderItem:function(e){return e}};var V=T,C=Object(s.b)(x.a);C.Group=Object(a.compose)(o.a,r.a.hoc({limit:1,bindProps:["disabled","format","prediction"],pure:!1}))(V),C.displayName="ShineoutRadio",C.Group.displayName="ShineoutRadioGroup";n.a=C},561:function(e,n,t){"use strict";t.d(n,"a",function(){return d}),t.d(n,"b",function(){return l});var a=t(0),o=t.n(a),r=t(38),i=Object(r.a)(),d=i.Provider,l=function(t){return function(n){return o.a.createElement(i.Consumer,null,function(e){return o.a.createElement(t,Object.assign({},n,e))})}}}}]);