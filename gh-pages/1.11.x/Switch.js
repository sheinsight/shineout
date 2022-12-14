(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[45],{1321:function(n,e,t){"use strict";t.r(e);var a=t(0),i=t.n(a),c=t(563),o=t(564),s=t(40),r=t(1322),l=t.n(r),u=t(1323),d=t.n(u),m=Object(s.b)(l.a,d.a),h=[{name:"1-base",isTs:!0,isTest:!1,title:Object(s.b)("基本用法 \n 基本的 Switch","Base \n Base Switch."),component:t(1324).default,rawText:t(1325),parseTsText:t(1326)},{name:"2-disabled",isTs:!0,isTest:!1,title:Object(s.b)("禁用 \n 设置 disabled 为 true 禁用 switch","Disabled \n disabled check while disabled true"),component:t(1327).default,rawText:t(1328),parseTsText:t(1329)},{name:"3-content",isTs:!0,isTest:!1,title:Object(s.b)("内容 \n 为每个状态添加描述","Base \n Description for every status."),component:t(1330).default,rawText:t(1331),parseTsText:t(1332)},{name:"4-size",isTs:!0,isTest:!1,title:Object(s.b)("大小 \n 通过 size 设置 Switch 大小","Size \n size set"),component:t(1333).default,rawText:t(1334),parseTsText:t(1335)}];e.default=Object(c.a)(function(n){return i.a.createElement(o.b,Object.assign({},n,{codes:void 0,source:m,examples:h}))})},1322:function(n,e){n.exports="# Switch *开关选择器*\n\n<example />\n\n## API\n\n### Switch\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| checked | boolean | 无 | 当前选中状态，checked 传入时为受控组件 |\n| disabled | boolean | false | 是否禁用 |\n| name | string | 无 | Form 存取数据的名称 |\n| onChange | (checked: boolean) => void | 无 | checked 表示选中状态 |\n| content | ReactNode[] | 无 | 选中和未选中时的内容 |\n| size | 'default' \\| 'small' \\| 'large' | default | 开关大小 |\n| value | boolean | 无 | checked 未设置的情况下， checked = value |\n| defaultValue | boolean | 无 | 初始值 |\n\n"},1323:function(n,e){n.exports="# Switch *Switching Selector*\n\n<example />\n\n## API\n\n### Switch\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| checked | boolean | none | checked status，will in control when pass |\n| disabled | boolean | false | disable switch |\n| name | string | none | The name of the Form which access data |\n| onChange | (checked: boolean) => void | none | checked is status |\n| content | ReactNode[] | none | content with checked and unchecked |\n| size | 'default' \\| 'small' \\| 'large' | 'default' | size of switch |\n| value | boolean | none | set while no checked |\n| defaultValue | boolean | none | init value |\n"},1324:function(n,e,t){"use strict";t.r(e);var a=t(0),i=t.n(a),c=t(314);e.default=function(){return i.a.createElement(c.a,null)}},1325:function(n,e){n.exports="/**\n * cn - 基本用法\n *    -- 基本的 Switch\n * en - Base\n *    -- Base Switch.\n */\nimport React from 'react'\nimport { Switch } from 'shineout'\n\nconst App: React.FC = () => <Switch />\n\nexport default App\n"},1326:function(n,e){n.exports="/**\n * cn - 基本用法\n *    -- 基本的 Switch\n * en - Base\n *    -- Base Switch.\n */\nimport React from 'react';\nimport { Switch } from 'shineout';\nconst App = () => <Switch />;\nexport default App;\n"},1327:function(n,e,t){"use strict";t.r(e);var i=t(24),c=t(0),o=t.n(c),s=t(314),r=t(67);e.default=function(){var n=Object(c.useState)(!0),e=Object(i.a)(n,2),t=e[0],a=e[1];return o.a.createElement("div",null,o.a.createElement(s.a,{disabled:t}),o.a.createElement(r.a,{style:{marginInlineStart:14},type:"primary",onClick:function(){a(!t)}},"Toggle"))}},1328:function(n,e){n.exports="/**\n * cn - 禁用\n *    -- 设置 disabled 为 true 禁用 switch\n * en - Disabled\n *    -- disabled check while disabled true\n */\nimport React, { useState } from 'react'\nimport { Switch, Button } from 'shineout'\n\nconst App: React.FC = () => {\n  const [disabled, setDisabled] = useState(true)\n\n  const handleToggle = () => {\n    setDisabled(!disabled)\n  }\n  return (\n    <div>\n      <Switch disabled={disabled} />\n\n      <Button style={{ marginInlineStart: 14 }} type=\"primary\" onClick={handleToggle}>\n        Toggle\n      </Button>\n    </div>\n  )\n}\n\nexport default App\n"},1329:function(n,e){n.exports="/**\n * cn - 禁用\n *    -- 设置 disabled 为 true 禁用 switch\n * en - Disabled\n *    -- disabled check while disabled true\n */\nimport React, { useState } from 'react';\nimport { Switch, Button } from 'shineout';\nconst App = () => {\n    const [disabled, setDisabled] = useState(true);\n    const handleToggle = () => {\n        setDisabled(!disabled);\n    };\n    return (<div>\n      <Switch disabled={disabled}/>\n\n      <Button style={{ marginInlineStart: 14 }} type=\"primary\" onClick={handleToggle}>\n        Toggle\n      </Button>\n    </div>);\n};\nexport default App;\n"},1330:function(n,e,t){"use strict";t.r(e);var a=t(0),i=t.n(a),c=t(314),o=t(185);e.default=function(){return i.a.createElement("div",null,i.a.createElement(c.a,{defaultValue:!0,content:["开","关"]}),i.a.createElement("br",null),i.a.createElement(c.a,{content:[i.a.createElement(o.a,{name:"btc"}),i.a.createElement(o.a,{name:"yen"})]}))}},1331:function(n,e){n.exports="/**\n * cn - 内容\n *    -- 为每个状态添加描述\n * en - Base\n *    -- Description for every status.\n */\nimport React from 'react'\nimport { Switch } from 'shineout'\nimport FontAwesome from '../Icon/FontAwesome'\n\nconst App: React.FC = () => (\n  <div>\n    <Switch defaultValue content={['开', '关']} />\n\n    <br />\n\n    <Switch content={[<FontAwesome name=\"btc\" />, <FontAwesome name=\"yen\" />]} />\n  </div>\n)\n\nexport default App\n"},1332:function(n,e){n.exports="/**\n * cn - 内容\n *    -- 为每个状态添加描述\n * en - Base\n *    -- Description for every status.\n */\nimport React from 'react';\nimport { Switch } from 'shineout';\nimport FontAwesome from '../Icon/FontAwesome';\nconst App = () => (<div>\n    <Switch defaultValue content={['开', '关']}/>\n\n    <br />\n\n    <Switch content={[<FontAwesome name=\"btc\"/>, <FontAwesome name=\"yen\"/>]}/>\n  </div>);\nexport default App;\n"},1333:function(n,e,t){"use strict";t.r(e);var a=t(0),i=t.n(a),c=t(314);e.default=function(){return i.a.createElement("div",null,i.a.createElement(c.a,{size:"small"}),i.a.createElement("br",null),i.a.createElement(c.a,null),i.a.createElement("br",null),i.a.createElement(c.a,{size:"large"}))}},1334:function(n,e){n.exports="/**\n * cn - 大小\n *    -- 通过 size 设置 Switch 大小\n * en - Size\n *    -- size set\n */\nimport React from 'react'\nimport { Switch } from 'shineout'\n\nexport default function() {\n  return (\n    <div>\n      <Switch size=\"small\" />\n\n      <br />\n\n      <Switch />\n\n      <br />\n\n      <Switch size=\"large\" />\n    </div>\n  )\n}\n"},1335:function(n,e){n.exports="/**\n * cn - 大小\n *    -- 通过 size 设置 Switch 大小\n * en - Size\n *    -- size set\n */\nimport React from 'react';\nimport { Switch } from 'shineout';\nexport default function () {\n    return (<div>\n      <Switch size=\"small\"/>\n\n      <br />\n\n      <Switch />\n\n      <br />\n\n      <Switch size=\"large\"/>\n    </div>);\n}\n"},314:function(n,e,t){"use strict";var a=t(60),i=t(21),c=t(143),o=Object(c.a)("switch"),s=t(562),r=Object(i.compose)(a.a,s.b)(o);r.displayName="ShineoutSwitch",r.Switch=o;e.a=r},562:function(n,e,t){"use strict";t.d(e,"a",function(){return s}),t.d(e,"b",function(){return r});var a=t(0),i=t.n(a),c=t(38),o=Object(c.a)(),s=o.Provider,r=function(t){return function(e){return i.a.createElement(o.Consumer,null,function(n){return i.a.createElement(t,Object.assign({},e,n))})}}}}]);