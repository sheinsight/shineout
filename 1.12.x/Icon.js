(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[28],{757:function(n,e,t){"use strict";t.r(e);var o=t(0),a=t.n(o),c=t(565),s=t(566),i=t(41),r=t(758),m=t.n(r),f=t(759),l=t.n(f),p=Object(i.b)(m.a,l.a),u=[{name:"1-awesome",isTs:!0,isTest:!1,title:Object(i.b)("基本用法 \n 引入一个在线地址（本示例为 font-awesome）创建一个新的 Icon 组件，在需要使用的地方引入。","Base \n Create a new compoennt with url, then use it anywhere."),component:t(760).default,rawText:t(761),parseTsText:t(762)},{name:"2-iconfont",isTs:!0,isTest:!1,title:Object(i.b)("使用 Iconfont \n 可以在 iconfont.cn 定制一个图标，在项目中引入，支持font和svg两种方式",'Customize Font \n You can customize an icon in <a target="_blank" href="http://iconfont.cn">iconfont.cn</a> or <a target="_blank" href="http://fontastic.me/">fontastic.me</a>, support font and svg.'),component:t(763).default,rawText:t(764),parseTsText:t(765)},{name:"3-size",isTs:!0,isTest:!1,title:Object(i.b)("样式 \n 通过 fontSize 和 type 属性可以便捷的设置大小和颜色，更多样式可以通过 style 属性设置。","Style \n Set fontSize and type to change icon size and color."),component:t(766).default,rawText:t(767),parseTsText:t(768)}];e.default=Object(c.a)(function(n){return a.a.createElement(s.b,Object.assign({},n,{codes:void 0,source:p,examples:u}))})},758:function(n,e){n.exports="# Icon *图标*\n组件库没有内置图标集，而是提供了一个函数生成一个新的图标组件。<br />\n一个项目内可以创建多个不同名称的图标组件。\n\n<example />\n\n## API\n\n### Icon *function(url, fontFamily, prefix):ReactClass*\n函数，返回一个新的组件，一个项目内可以创建多个，但是 fontFamily 不能相同\n\n| 参数 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| url | string |  | 图标css或js文件地址，使用在线地址，不需要引入到项目中。如果在 link或script 中已经引用过，可以为空(null) |\n| fontFamily | string | 'iconfont' | font-family 需要和引入的css/js文件内的font-family一致 |\n| prefix | string | 'icon' | 类名前缀 |\n\n### MyIcon *Icon函数创建的图标组件*\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| children | string | 无 | 图标 unicode 编码，和 name 二选一 |\n| name | string | '' | 图标类名（去除前缀的部分），值参照具体使用的图标库 |\n| fontSize | string | 无 | 图标大小，和 style.fontSize 相同 |\n| style | object | 无 | 扩展样式，可以用来设定特定的大小和颜色等 |\n| type | string | 'default' | 内置颜色，可选值为 \\['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger'] |"},759:function(n,e){n.exports="# Icon\nIcon is  a function to generate a new ReactClass with css path.\n<br />\nMultiple icon components with different names can be created in a project.\n\n<example />\n\n## API\n\n### Icon *function(url, fontFamily, prefix):ReactClass*\nFunction, returns a new component. A project can create more than one, but fontFamily must be the unique.\n\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| url | string |  | The address of css or js file of the icon. If it has been introduced in the link/script tag, it can be empty. |\n| fontFamily | string | 'iconfont' | The font-family needs to be the same as the font-family in the introduced CSS/JS file. |\n| prefix | string | 'icon' | The prefix of the class |\n\n### IconComponent *Component created by the Icon function*\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| children | string | - | The unicode code of the icon. |\n| name | string | '' | The name of the icon class (without prefix). |\n| fontSize | string | - | The size of the icon, same as the style.fontSize. |\n| style | object | - | Extend style. |\n| type | string | 'default' | Built-in color, options: \\['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger'] |\n"},760:function(n,e,t){"use strict";t.r(e);var o=t(0),a=t.n(o),c=t(154),s={marginInlineEnd:20},i=Object(c.a)("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css","FontAwesome","fa");e.default=function(){return a.a.createElement("div",null,a.a.createElement(i,{style:s,name:"home"}),a.a.createElement(i,{style:s,name:"info",type:"info"}),a.a.createElement(i,{style:s,name:"close",type:"danger"}),a.a.createElement(i,{style:s,name:"check",type:"success"}))}},761:function(n,e){n.exports='/**\n * cn - 基本用法\n *    -- 引入一个在线地址（本示例为 font-awesome）创建一个新的 Icon 组件，在需要使用的地方引入。\n * en - Base\n *    -- Create a new compoennt with url, then use it anywhere.\n */\nimport React from \'react\'\nimport { Icon } from \'shineout\'\n\nconst url = \'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\'\nconst margin = { marginInlineEnd: 20 }\nconst FontAwesome = Icon(url, \'FontAwesome\', \'fa\')\n\nconst App: React.FC = () => (\n  <div>\n    <FontAwesome style={margin} name="home" />\n    <FontAwesome style={margin} name="info" type="info" />\n    <FontAwesome style={margin} name="close" type="danger" />\n    <FontAwesome style={margin} name="check" type="success" />\n  </div>\n)\n\nexport default App\n'},762:function(n,e){n.exports='/**\n * cn - 基本用法\n *    -- 引入一个在线地址（本示例为 font-awesome）创建一个新的 Icon 组件，在需要使用的地方引入。\n * en - Base\n *    -- Create a new compoennt with url, then use it anywhere.\n */\nimport React from \'react\';\nimport { Icon } from \'shineout\';\nconst url = \'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\';\nconst margin = { marginInlineEnd: 20 };\nconst FontAwesome = Icon(url, \'FontAwesome\', \'fa\');\nconst App = () => (<div>\n    <FontAwesome style={margin} name="home"/>\n    <FontAwesome style={margin} name="info" type="info"/>\n    <FontAwesome style={margin} name="close" type="danger"/>\n    <FontAwesome style={margin} name="check" type="success"/>\n  </div>);\nexport default App;\n'},763:function(n,e,t){"use strict";t.r(e);var o=t(0),a=t.n(o),c=t(154),s=Object(c.a)("//at.alicdn.com/t/font_550076_uyvw3e8ul8w4gqfr.css"),i=Object(c.a)("//at.alicdn.com/t/font_1725436_8gldxw9bjlu.js"),r={marginInlineEnd:20};e.default=function(){return a.a.createElement("div",null,a.a.createElement(i,{style:r,name:"qingtian"}),a.a.createElement(i,{style:r,name:"wanduoyun"}),a.a.createElement(s,{style:r},""),a.a.createElement(s,{style:r,name:"info",type:"info"}))}},764:function(n,e){n.exports='/**\n * cn - 使用 Iconfont\n *    -- 可以在 iconfont.cn 定制一个图标，在项目中引入，支持font和svg两种方式\n * en - Customize Font\n *    -- You can customize an icon in <a target="_blank" href="http://iconfont.cn">iconfont.cn</a> or <a target="_blank" href="http://fontastic.me/">fontastic.me</a>, support font and svg.\n */\nimport React from \'react\'\nimport { Icon, TYPE } from \'shineout\'\n\ntype IconComponent = TYPE.Icon.Com\n\nconst FontIconfont: IconComponent = Icon(\'//at.alicdn.com/t/font_550076_uyvw3e8ul8w4gqfr.css\')\nconst SVGIconfont: IconComponent = Icon(\'//at.alicdn.com/t/font_1725436_8gldxw9bjlu.js\')\nconst margin: React.CSSProperties = { marginInlineEnd: 20 }\n\nconst App: React.FC = () => (\n  <div>\n    <SVGIconfont style={margin} name="qingtian" />\n    <SVGIconfont style={margin} name="wanduoyun" />\n    <FontIconfont style={margin}>&#xe64e;</FontIconfont>\n    <FontIconfont style={margin} name="info" type="info" />\n  </div>\n)\n\nexport default App\n'},765:function(n,e){n.exports='/**\n * cn - 使用 Iconfont\n *    -- 可以在 iconfont.cn 定制一个图标，在项目中引入，支持font和svg两种方式\n * en - Customize Font\n *    -- You can customize an icon in <a target="_blank" href="http://iconfont.cn">iconfont.cn</a> or <a target="_blank" href="http://fontastic.me/">fontastic.me</a>, support font and svg.\n */\nimport React from \'react\';\nimport { Icon } from \'shineout\';\nconst FontIconfont = Icon(\'//at.alicdn.com/t/font_550076_uyvw3e8ul8w4gqfr.css\');\nconst SVGIconfont = Icon(\'//at.alicdn.com/t/font_1725436_8gldxw9bjlu.js\');\nconst margin = { marginInlineEnd: 20 };\nconst App = () => (<div>\n    <SVGIconfont style={margin} name="qingtian"/>\n    <SVGIconfont style={margin} name="wanduoyun"/>\n    <FontIconfont style={margin}>&#xe64e;</FontIconfont>\n    <FontIconfont style={margin} name="info" type="info"/>\n  </div>);\nexport default App;\n'},766:function(n,e,t){"use strict";t.r(e);var o=t(0),a=t.n(o),c=t(186),s={marginInlineEnd:20};e.default=function(){return a.a.createElement("div",null,a.a.createElement(c.a,{style:s,name:"home"}),a.a.createElement(c.a,{style:s,name:"home",type:"info",fontSize:18}),a.a.createElement(c.a,{style:s,name:"home",type:"success",fontSize:"24px"}),a.a.createElement(c.a,{style:{fontSize:30,color:"#f5222d"},name:"home"}))}},767:function(n,e){n.exports='/**\n * cn - 样式\n *    -- 通过 fontSize 和 type 属性可以便捷的设置大小和颜色，更多样式可以通过 style 属性设置。\n * en - Style\n *    -- Set fontSize and type to change icon size and color.\n */\nimport React from \'react\'\nimport FontAwesome from \'./FontAwesome\'\n\nconst margin: React.CSSProperties = { marginInlineEnd: 20 }\n\nconst App: React.FC = () => (\n  <div>\n    <FontAwesome style={margin} name="home" />\n    <FontAwesome style={margin} name="home" type="info" fontSize={18} />\n    <FontAwesome style={margin} name="home" type="success" fontSize="24px" />\n    <FontAwesome style={{ fontSize: 30, color: \'#f5222d\' }} name="home" />\n  </div>\n)\n\nexport default App\n'},768:function(n,e){n.exports='/**\n * cn - 样式\n *    -- 通过 fontSize 和 type 属性可以便捷的设置大小和颜色，更多样式可以通过 style 属性设置。\n * en - Style\n *    -- Set fontSize and type to change icon size and color.\n */\nimport React from \'react\';\nimport FontAwesome from \'./FontAwesome\';\nconst margin = { marginInlineEnd: 20 };\nconst App = () => (<div>\n    <FontAwesome style={margin} name="home"/>\n    <FontAwesome style={margin} name="home" type="info" fontSize={18}/>\n    <FontAwesome style={margin} name="home" type="success" fontSize="24px"/>\n    <FontAwesome style={{ fontSize: 30, color: \'#f5222d\' }} name="home"/>\n  </div>);\nexport default App;\n'}}]);