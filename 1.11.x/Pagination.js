(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[35],{1522:function(n,t,e){"use strict";e.r(t);var a=e(0),o=e.n(a),r=e(562),i=e(563),l=e(40),s=e(1523),u=e.n(s),p=e(1524),c=e.n(p),m=Object(l.b)(u.a,c.a),g=[{name:"1-base",isTs:!0,isTest:!1,title:Object(l.b)("基本用法 \n 最基本的使用","Base \n The basic usage"),component:e(1525).default,rawText:e(1526),parseTsText:e(1527)},{name:"10-span",isTs:!0,isTest:!1,title:Object(l.b)("按钮数量 \n 分页器页码按钮数量","Span \n The number of pagination buttons"),component:e(1528).default,rawText:e(1529),parseTsText:e(1530)},{name:"2-size",isTs:!0,isTest:!1,title:Object(l.b)("大小 \n 内置了 3 种大小供选择，small, default, large，默认为 default","Size \n Three sizes are built in for selection: small, default, large, default value is default."),component:e(1531).default,rawText:e(1532),parseTsText:e(1533)},{name:"3-layout",isTs:!0,isTest:!1,title:Object(l.b)("布局 \n 通过 layout 属性来控制组件是否显示以及显示的位置","Layout \n Use the layout property to control whether the child elements is displayed and where is displayed."),component:e(1534).default,rawText:e(1535),parseTsText:e(1536)},{name:"4-text",isTs:!0,isTest:!1,title:Object(l.b)("文字 \n 通过 text 替换文字","Text \n Set text property to replace the default text.."),component:e(1537).default,rawText:e(1538),parseTsText:e(1539)},{name:"5-align",isTs:!0,isTest:!1,title:Object(l.b)("位置 \n 内置了 3 种位置，left, center, right，默认为 left","Alignment \n Options: 'left', 'center', 'right', the default value is left."),component:e(1540).default,rawText:e(1541),parseTsText:e(1542)},{name:"7-controlled",isTs:!0,isTest:!1,title:Object(l.b)("受控组件 \n 同时设置 current 和 onChange 属性，可以作为受控组件使用","Controlled \n Set both the current and onChange properties for being used as a controlled component."),component:e(1543).default,rawText:e(1544),parseTsText:e(1545)},{name:"8-disabled",isTs:!0,isTest:!1,title:Object(l.b)("禁用 \n 设置 disabled 属性，可以禁用组件","Disabled \n Set the disabled property to disable the component."),component:e(1546).default,rawText:e(1547),parseTsText:e(1548)},{name:"9-simple",isTs:!0,isTest:!1,title:Object(l.b)("Simple 模式 \n layout 设置为 simple；注意：simple 模式不与其他layout共存。","Simple mode \n layout set to simple; Note: simple mode does not coexist with other layouts."),component:e(1549).default,rawText:e(1550),parseTsText:e(1551)}];t.default=Object(r.a)(function(n){return o.a.createElement(i.b,Object.assign({},n,{codes:void 0,source:m,examples:g}))})},1523:function(n,t){n.exports="# Pagination *分页*\n\n<example />\n\n## API \n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| align | 'left' \\| 'center' \\| 'right' | 'left' | 排布方式 |\n| className | string | 无 | 扩展className |\n| current | number | 无 | 当前页，如果传入值，组件为受控组件，必须通过onChange来处理回调 |\n| defaultCurrent | number | 1 | 初始页码 |\n| disabled | boolean | false | 禁用 |\n| layout | string[] | \\['links'] | 子组件布局，可选值为:<br />'links': 页码<br />'simple': 简约页码(和links不要同时使用)<br />'list': 每页数量选择<br />'jumper': 跳转页码<br />'simple': 极简模式<br />function({ current, total, pageSize }): 匿名函数，用来信息展示 |\n| onChange | (current: number, pageSize: number) => void | 无 | 页码或每页显示数量改变时回调<br />current: 新的页码<br />pageSize: 每页数量 |\n| pageSize | number | 10 | 每页数量 |\n| pageSizeList | number[] | \\[10, 20, 30, 50, 100] | 每页数量可选列表 |\n| size | 'large' \\| 'default' \\| 'small' | 'default' | 尺寸 |\n| text | object | 无 | 替换文案<br />prev: 上一页<br />next: 下一页<br />page: pageSizeList文字<br />jumper: 跳转输入框文字, '{input}' 为输入框占位 |\n| total | number | 0 | 总条目数。如果 total 小于 0，隐藏分页。 |\n| sizeListProps| object | 无 | 需要给分页数量的选择框的额外的属性 | \n| span| number | 5 | 分页器页码按钮数量 | \n"},1524:function(n,t){n.exports="# Pagination\n\n<example />\n\n## API \n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| align | 'left' \\| 'center' \\| 'right' | 'left' | align of pagination |\n| className | string | - | Extend className |\n| current | number | - | Current page. |\n| defaultCurrent | number | 1 | Initial page number |\n| disabled | boolean | false | Disabled |\n| layout | string[] | \\['links'] | The layout of child elements, options: <br />'links': page number<br />'simple': simple page number(Do not use both simple and links)<br />'list': page size selector<br />'jumper': jump to page number<br />'simple': minimalist mode<br />function({ current, total, pageSize }): custom information |\n| onChange | (current: number, pageSize: number) => void | - | The callback function when current page or pageSize is changing<br />current: new page number<br />pageSize: number of each page |\n| pageSize | number | 10 | Number of each page |\n| pageSizeList | number[] | \\[10, 20, 30, 50, 100] | The list of number of each page |\n| size | 'large' \\| 'default' \\| 'small' | 'default' | size of pagination |\n| text | object | none | Replaced text<br />prev: the previous page<br />next: the next page<br />page:the text of pageSizeList<br />jumper: jump to input box text, '{input}' pilaceholder for input box |\n| total | number | 0 | Total number. If total is less than 0, hide the Pagination. |\n| sizeListProps| object | - | Additional attributes which need to given page size selector  | \n| span| number | 5 | The number of pagination buttons | "},1525:function(n,t,e){"use strict";e.r(t);var a=e(0),o=e.n(a),r=e(309);t.default=function(){return o.a.createElement(r.a,{defaultCurrent:10,total:1e3})}},1526:function(n,t){n.exports="/**\n * cn - 基本用法\n *    -- 最基本的使用\n * en - Base\n *    -- The basic usage\n */\nimport React from 'react'\nimport { Pagination } from 'shineout'\n\nconst App: React.FC = () => <Pagination defaultCurrent={10} total={1000} />\n\nexport default App\n"},1527:function(n,t){n.exports="/**\n * cn - 基本用法\n *    -- 最基本的使用\n * en - Base\n *    -- The basic usage\n */\nimport React from 'react';\nimport { Pagination } from 'shineout';\nconst App = () => <Pagination defaultCurrent={10} total={1000}/>;\nexport default App;\n"},1528:function(n,t,e){"use strict";e.r(t);var a=e(0),o=e.n(a),r=e(309);t.default=function(){return o.a.createElement("div",null,o.a.createElement(r.a,{defaultCurrent:10,total:1e3,span:10}),o.a.createElement("br",null),o.a.createElement(r.a,{defaultCurrent:10,total:1e3,span:5}))}},1529:function(n,t){n.exports="/**\n * cn - 按钮数量\n *    -- 分页器页码按钮数量\n * en - Span\n *    -- The number of pagination buttons\n */\nimport React from 'react'\nimport { Pagination } from 'shineout'\n\nconst App: React.FC = () => (\n  <div>\n    <Pagination defaultCurrent={10} total={1000} span={10} />\n    <br />\n    <Pagination defaultCurrent={10} total={1000} span={5} />\n  </div>\n)\n\nexport default App\n"},1530:function(n,t){n.exports="/**\n * cn - 按钮数量\n *    -- 分页器页码按钮数量\n * en - Span\n *    -- The number of pagination buttons\n */\nimport React from 'react';\nimport { Pagination } from 'shineout';\nconst App = () => (<div>\n    <Pagination defaultCurrent={10} total={1000} span={10}/>\n    <br />\n    <Pagination defaultCurrent={10} total={1000} span={5}/>\n  </div>);\nexport default App;\n"},1531:function(n,t,e){"use strict";e.r(t);var a=e(0),o=e.n(a),r=e(309);t.default=function(){return o.a.createElement("div",null,o.a.createElement(r.a,{size:"small",total:1e3}),o.a.createElement("br",null),o.a.createElement(r.a,{total:1e3}),o.a.createElement("br",null),o.a.createElement(r.a,{size:"large",total:1e3}))}},1532:function(n,t){n.exports="/**\n * cn - 大小\n *    -- 内置了 3 种大小供选择，small, default, large，默认为 default\n * en - Size\n *    -- Three sizes are built in for selection: small, default, large, default value is default.\n */\nimport React from 'react'\nimport { Pagination } from 'shineout'\n\nconst App: React.FC = () => (\n  <div>\n    <Pagination size=\"small\" total={1000} />\n    <br />\n    <Pagination total={1000} />\n    <br />\n    <Pagination size=\"large\" total={1000} />\n  </div>\n)\n\nexport default App\n"},1533:function(n,t){n.exports="/**\n * cn - 大小\n *    -- 内置了 3 种大小供选择，small, default, large，默认为 default\n * en - Size\n *    -- Three sizes are built in for selection: small, default, large, default value is default.\n */\nimport React from 'react';\nimport { Pagination } from 'shineout';\nconst App = () => (<div>\n    <Pagination size=\"small\" total={1000}/>\n    <br />\n    <Pagination total={1000}/>\n    <br />\n    <Pagination size=\"large\" total={1000}/>\n  </div>);\nexport default App;\n"},1534:function(n,t,e){"use strict";e.r(t);var a=e(0),o=e.n(a),r=e(309),i=function(n){var t=n.total;return"total ".concat(t)};t.default=function(){return o.a.createElement(r.a,{total:128,pageSize:50,text:{jumper:"Go to {input}"},onChange:function(){for(var n=arguments.length,t=new Array(n),e=0;e<n;e++)t[e]=arguments[e];return console.log(t)},layout:["links","list",i,"jumper"]})}},1535:function(n,t){n.exports="/**\n * cn - 布局\n *    -- 通过 layout 属性来控制组件是否显示以及显示的位置\n * en - Layout\n *    -- Use the layout property to control whether the child elements is displayed and where is displayed.\n */\nimport React from 'react'\nimport { Pagination } from 'shineout'\n\nconst info = ({ total }: { total: number }) => `total ${total}`\n\nconst App: React.FC = () => (\n  <Pagination\n    total={128}\n    pageSize={50}\n    text={{ jumper: 'Go to {input}' }}\n    onChange={(...args) => console.log(args)}\n    layout={['links', 'list', info, 'jumper']}\n  />\n)\n\nexport default App\n"},1536:function(n,t){n.exports="/**\n * cn - 布局\n *    -- 通过 layout 属性来控制组件是否显示以及显示的位置\n * en - Layout\n *    -- Use the layout property to control whether the child elements is displayed and where is displayed.\n */\nimport React from 'react';\nimport { Pagination } from 'shineout';\nconst info = ({ total }) => `total ${total}`;\nconst App = () => (<Pagination total={128} pageSize={50} text={{ jumper: 'Go to {input}' }} onChange={(...args) => console.log(args)} layout={['links', 'list', info, 'jumper']}/>);\nexport default App;\n"},1537:function(n,t,e){"use strict";e.r(t);var a=e(0),o=e.n(a),r=e(309),i=["links","list",function(n){var t=n.current,e=n.pageSize,a=n.total,o=t*e;return a<o&&(o=a),"".concat((t-1)*e+1," to ").concat(o," of ").concat(a," items")}],l={next:"Next",page:"/ page",prev:"Previous"};t.default=function(){return o.a.createElement(r.a,{text:l,total:256,pageSize:50,layout:i})}},1538:function(n,t){n.exports="/**\n * cn - 文字\n *    -- 通过 text 替换文字\n * en - Text\n *    -- Set text property to replace the default text..\n */\nimport React from 'react'\nimport { Pagination, TYPE } from 'shineout'\n\ntype PaginationProps = TYPE.Pagination.Props\ntype PaginationText = TYPE.Pagination.TextParams\ntype PaginationLayout = PaginationProps['layout']\n\nconst info = ({ current, pageSize, total }: { current: number; pageSize: number; total: number }) => {\n  let to = current * pageSize\n  if (to > total) to = total\n  const from = (current - 1) * pageSize + 1\n  return `${from} to ${to} of ${total} items`\n}\n\nconst layout: PaginationLayout = ['links', 'list', info]\n\nconst text: PaginationText = {\n  next: 'Next',\n  page: '/ page',\n  prev: 'Previous',\n}\n\nconst App: React.FC = () => <Pagination text={text} total={256} pageSize={50} layout={layout} />\n\nexport default App\n"},1539:function(n,t){n.exports="/**\n * cn - 文字\n *    -- 通过 text 替换文字\n * en - Text\n *    -- Set text property to replace the default text..\n */\nimport React from 'react';\nimport { Pagination } from 'shineout';\nconst info = ({ current, pageSize, total }) => {\n    let to = current * pageSize;\n    if (to > total)\n        to = total;\n    const from = (current - 1) * pageSize + 1;\n    return `${from} to ${to} of ${total} items`;\n};\nconst layout = ['links', 'list', info];\nconst text = {\n    next: 'Next',\n    page: '/ page',\n    prev: 'Previous',\n};\nconst App = () => <Pagination text={text} total={256} pageSize={50} layout={layout}/>;\nexport default App;\n"},1540:function(n,t,e){"use strict";e.r(t);var a=e(0),o=e.n(a),r=e(309),i=function(n){var t=n.total;return"Total ".concat(t)},l=[i,"links"],s=["links",i];t.default=function(){return o.a.createElement("div",null,o.a.createElement(r.a,{align:"center",total:100,layout:s}),o.a.createElement("br",null),o.a.createElement(r.a,{align:"right",total:100,layout:l}))}},1541:function(n,t){n.exports="/**\n * cn - 位置\n *    -- 内置了 3 种位置，left, center, right，默认为 left\n * en - Alignment\n *    -- Options: 'left', 'center', 'right', the default value is left.\n */\nimport React from 'react'\nimport { Pagination, TYPE } from 'shineout'\n\ntype PaginationProps = TYPE.Pagination.Props\ntype PaginationLayout = PaginationProps['layout']\n\nconst info = ({ total }: { total: number }) => `Total ${total}`\n\nconst layoutRight: PaginationLayout = [info, 'links']\n\nconst layoutCenter: PaginationLayout = ['links', info]\n\nconst App: React.FC = () => (\n  <div>\n    <Pagination align=\"center\" total={100} layout={layoutCenter} />\n    <br />\n    <Pagination align=\"right\" total={100} layout={layoutRight} />\n  </div>\n)\n\nexport default App\n"},1542:function(n,t){n.exports="/**\n * cn - 位置\n *    -- 内置了 3 种位置，left, center, right，默认为 left\n * en - Alignment\n *    -- Options: 'left', 'center', 'right', the default value is left.\n */\nimport React from 'react';\nimport { Pagination } from 'shineout';\nconst info = ({ total }) => `Total ${total}`;\nconst layoutRight = [info, 'links'];\nconst layoutCenter = ['links', info];\nconst App = () => (<div>\n    <Pagination align=\"center\" total={100} layout={layoutCenter}/>\n    <br />\n    <Pagination align=\"right\" total={100} layout={layoutRight}/>\n  </div>);\nexport default App;\n"},1543:function(n,t,e){"use strict";e.r(t);var u=e(24),p=e(0),c=e.n(p),m=e(127),g=e(309),f=function(n){var t=n.current;return"Current page ".concat(t)},d={next:"Next",page:"/ page",prev:"Previous"};t.default=function(){var n=Object(p.useState)(1),t=Object(u.a)(n,2),e=t[0],a=t[1],o=Object(p.useState)(20),r=Object(u.a)(o,2),i=r[0],l=r[1],s=function(n,t){a(n),l(t)};return c.a.createElement("div",null,c.a.createElement("span",null,"跳转至："),c.a.createElement(m.a.Number,{min:1,max:50,value:e,onChange:function(n){return a(Number(n))},style:{width:100,marginBottom:20}}),c.a.createElement(g.a,{text:d,total:1e3,current:e,pageSize:i,onChange:s,layout:["links","list"]}),c.a.createElement("br",null),c.a.createElement(g.a,{current:e,onChange:s,pageSize:i,total:1e3,layout:["links",f]}))}},1544:function(n,t){n.exports="/**\n * cn - 受控组件\n *    -- 同时设置 current 和 onChange 属性，可以作为受控组件使用\n * en - Controlled\n *    -- Set both the current and onChange properties for being used as a controlled component.\n */\nimport React, { useState } from 'react'\nimport { Input, Pagination, TYPE } from 'shineout'\n\ntype PaginationProps = TYPE.Pagination.Props\ntype PaginationText = TYPE.Pagination.TextParams\ntype PaginationOnChange = PaginationProps['onChange']\n\nconst info = ({ current }: { current: number }) => `Current page ${current}`\n\nconst text: PaginationText = {\n  next: 'Next',\n  page: '/ page',\n  prev: 'Previous',\n}\n\nconst App: React.FC = () => {\n  const [current, setCurrent] = useState(1)\n  const [pageSize, setPageSize] = useState(20)\n\n  const handleChange: PaginationOnChange = (c, p) => {\n    setCurrent(c)\n    setPageSize(p)\n  }\n\n  const handleCurrentChange = (v: any) => setCurrent(Number(v))\n\n  return (\n    <div>\n      <span>跳转至：</span>\n\n      <Input.Number\n        min={1}\n        max={50}\n        value={current}\n        onChange={handleCurrentChange}\n        style={{ width: 100, marginBottom: 20 }}\n      />\n\n      <Pagination\n        text={text}\n        total={1000}\n        current={current}\n        pageSize={pageSize}\n        onChange={handleChange}\n        layout={['links', 'list']}\n      />\n      <br />\n      <Pagination current={current} onChange={handleChange} pageSize={pageSize} total={1000} layout={['links', info]} />\n    </div>\n  )\n}\n\nexport default App\n"},1545:function(n,t){n.exports="/**\n * cn - 受控组件\n *    -- 同时设置 current 和 onChange 属性，可以作为受控组件使用\n * en - Controlled\n *    -- Set both the current and onChange properties for being used as a controlled component.\n */\nimport React, { useState } from 'react';\nimport { Input, Pagination } from 'shineout';\nconst info = ({ current }) => `Current page ${current}`;\nconst text = {\n    next: 'Next',\n    page: '/ page',\n    prev: 'Previous',\n};\nconst App = () => {\n    const [current, setCurrent] = useState(1);\n    const [pageSize, setPageSize] = useState(20);\n    const handleChange = (c, p) => {\n        setCurrent(c);\n        setPageSize(p);\n    };\n    const handleCurrentChange = (v) => setCurrent(Number(v));\n    return (<div>\n      <span>跳转至：</span>\n\n      <Input.Number min={1} max={50} value={current} onChange={handleCurrentChange} style={{ width: 100, marginBottom: 20 }}/>\n\n      <Pagination text={text} total={1000} current={current} pageSize={pageSize} onChange={handleChange} layout={['links', 'list']}/>\n      <br />\n      <Pagination current={current} onChange={handleChange} pageSize={pageSize} total={1000} layout={['links', info]}/>\n    </div>);\n};\nexport default App;\n"},1546:function(n,t,e){"use strict";e.r(t);var a=e(0),o=e.n(a),r=e(309);t.default=function(){return o.a.createElement(r.a,{disabled:!0,defaultCurrent:10,layout:["links","list"],total:1e3})}},1547:function(n,t){n.exports="/**\n * cn - 禁用\n *    -- 设置 disabled 属性，可以禁用组件\n * en - Disabled\n *    -- Set the disabled property to disable the component.\n */\nimport React from 'react'\nimport { Pagination } from 'shineout'\n\nconst App: React.FC = () => <Pagination disabled defaultCurrent={10} layout={['links', 'list']} total={1000} />\n\nexport default App\n"},1548:function(n,t){n.exports="/**\n * cn - 禁用\n *    -- 设置 disabled 属性，可以禁用组件\n * en - Disabled\n *    -- Set the disabled property to disable the component.\n */\nimport React from 'react';\nimport { Pagination } from 'shineout';\nconst App = () => <Pagination disabled defaultCurrent={10} layout={['links', 'list']} total={1000}/>;\nexport default App;\n"},1549:function(n,t,e){"use strict";e.r(t);var a=e(0),o=e.n(a),r=e(309);t.default=function(){return o.a.createElement(r.a,{layout:["simple"],pageSize:20,total:100})}},1550:function(n,t){n.exports="/**\n * cn - Simple 模式\n *    -- layout 设置为 simple；注意：simple 模式不与其他layout共存。\n * en - Simple mode\n *    -- layout set to simple; Note: simple mode does not coexist with other layouts.\n */\nimport React from 'react'\nimport { Pagination } from 'shineout'\n\nconst App: React.FC = () => <Pagination layout={['simple']} pageSize={20} total={100} />\n\nexport default App\n"},1551:function(n,t){n.exports="/**\n * cn - Simple 模式\n *    -- layout 设置为 simple；注意：simple 模式不与其他layout共存。\n * en - Simple mode\n *    -- layout set to simple; Note: simple mode does not coexist with other layouts.\n */\nimport React from 'react';\nimport { Pagination } from 'shineout';\nconst App = () => <Pagination layout={['simple']} pageSize={20} total={100}/>;\nexport default App;\n"}}]);