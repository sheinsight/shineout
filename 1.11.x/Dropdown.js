(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[21],{302:function(n,e,t){"use strict";var o=t(60),a=t(21),c=t(88),r=t(74),i=t(4),s=t(5),l=t(1),d=t(20),p=t(6),u=t(7),m=t(2),h=t(0),f=t.n(h),g=t(14),b=t.n(g),y=t(17),w=t(22),D=t(10),v=t(562),k=t(61);function S(o){return function(){var n,e=Object(m.a)(o);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}()){var t=Object(m.a)(this).constructor;n=Reflect.construct(e,arguments,t)}else n=e.apply(this,arguments);return Object(u.a)(this,n)}}var T=function(n){Object(p.a)(o,n);var t=S(o);function o(n){var e;return Object(i.a)(this,o),(e=t.call(this,n)).handleClick=e.handleClick.bind(Object(l.a)(e)),e.handleUpdate=e.handleUpdate.bind(Object(l.a)(e)),e.handleRawChange=e.handleRawChange.bind(Object(l.a)(e)),e}return Object(s.a)(o,[{key:"componentDidMount",value:function(){Object(d.a)(Object(m.a)(o.prototype),"componentDidMount",this).call(this),this.props.datum.subscribe(D.a,this.handleUpdate)}},{key:"componentWillUnmount",value:function(){Object(d.a)(Object(m.a)(o.prototype),"componentWillUnmount",this).call(this),this.props.datum.unsubscribe(D.a,this.handleUpdate)}},{key:"getContent",value:function(n){var e=this.props.renderItem;return"string"==typeof e?n[e]:"function"==typeof e?e(n):""}},{key:"handleUpdate",value:function(){this.forceUpdate()}},{key:"handleClick",value:function(n,e,t){var o=this.props,a=o.data,r=o.datum;e?r.add(a[t]):r.remove(a[t])}},{key:"handleRawChange",value:function(n,e){var t=this.props.datum;e?t.add(n):t.remove(n)}},{key:"render",value:function(){var t=this,n=this.props,e=n.block,o=n.data,a=n.datum,r=n.keygen,i=n.children,s=n.style,l=b()(Object(k.a)("group",["no-block","block"][Number(e)]),this.props.className);return void 0===o?f.a.createElement("div",{className:l,style:s},f.a.createElement(v.a,{value:{onRawChange:this.handleRawChange,checked:a.check.bind(a)}},i)):f.a.createElement("div",{className:l,style:s},o.map(function(n,e){return f.a.createElement(c.a,{checked:a.check(n),disabled:a.disabled(n),key:Object(w.b)(n,r,e),htmlValue:e,index:e,onChange:t.handleClick},t.getContent(n))}),i)}}]),o}(y.b);T.defaultProps={renderItem:function(n){return n}};var C=T,E=Object(a.compose)(o.a,v.b)(c.a);E.Group=Object(a.compose)(o.a,r.a.hoc({bindProps:["disabled","format","prediction","separator"]}))(C),E.Checkbox=c.a,E.displayName="ShineoutCheckbox",E.Group.displayName="ShineoutCheckboxGroup";e.a=E},304:function(n,e,t){"use strict";var o=t(0),u=t.n(o),a=t(46),r=t.n(a),m=t(110),i=t(4),s=t(5),l=t(1),c=t(6),d=t(7),p=t(2),h=t(41),f=t(17),g=t(123),b=t(22);function y(o){return function(){var n,e=Object(p.a)(o);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}()){var t=Object(p.a)(this).constructor;n=Reflect.construct(e,arguments,t)}else n=e.apply(this,arguments);return Object(d.a)(this,n)}}var w=function(n){Object(c.a)(o,n);var t=y(o);function o(n){var e;return Object(i.a)(this,o),(e=t.call(this,n)).state={messages:[]},e.removeMessage=e.removeMessage.bind(Object(l.a)(e)),e.handleClassName=function(){var n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"top",e=1<arguments.length?arguments[1]:void 0;return Object(m.a)("item","item-".concat(e?"dismissed":"show","-").concat(n))},e.handleStyle=function(n,e,t){if(!n||null==e)return null;var o={};switch(t){case"bottom-right":case"bottom-left":break;default:o={zIndex:-1,opacity:0,marginTop:-e}}return o},e}return Object(s.a)(o,[{key:"addMessage",value:function(e){var n=this,t=Object(b.c)();return this.setState(Object(h.a)(function(n){n.messages.push(Object.assign({id:t},e))})),0<e.duration&&setTimeout(function(){n.setState(Object(h.a)(function(n){n.messages.forEach(function(n){n.id===t&&(n.dismiss=!0)})}))},1e3*e.duration),this.closeMessageForAnimation.bind(this,t,200,200)}},{key:"removeMessage",value:function(e){var t,n=this.state.messages.filter(function(n){return n.id!==e||(n.onClose&&(t=n.onClose),!1)});0===n.length?this.props.onDestory():this.setState({messages:n}),t&&t()}},{key:"closeMessageForAnimation",value:function(){for(var n=this,e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];var a=t[0],r=t[1],i=t[2];r?(this.setState(Object(h.a)(function(n){n.messages.forEach(function(n){n.id===a&&(n.dismiss=!0,n.h=i+20)})})),setTimeout(function(){n.removeMessage(a)},r)):this.removeMessage(a)}},{key:"closeEvent",value:function(n,e){if(0===e)return this.removeMessage.bind(this,n)}},{key:"render",value:function(){var p=this;return[this.state.messages.map(function(n){var e=n.id,t=n.type,o=n.content,a=n.dismiss,r=n.h,i=n.title,s=n.top,l=n.className,c=n.position,d=n.hideClose;return u.a.createElement("div",{key:e,className:"".concat(p.handleClassName(c,a)," ").concat(l),style:p.handleStyle(a,r,c)},u.a.createElement(g.a,{outAnimation:!0,className:Object(m.a)("msg"),dismiss:a,hideClose:d,onClose:p.closeMessageForAnimation.bind(p,e),icon:!0,iconSize:i?20:14,style:{top:s},type:t},i&&u.a.createElement("h3",null,i),o))})]}}]),o}(f.b);w.displayName="ShineoutMessage";var D=w,v={},k={};function S(n){v[n]&&(r.a.unmountComponentAtNode(v[n]),document.body.removeChild(v[n]),delete v[n]),k[n]&&delete k[n]}function T(a){return new Promise(function(e){var n,t,o=k[a];o?e(o):r.a.render(u.a.createElement(D,{ref:function(n){k[a]=n,e(n)},onDestory:S.bind(null,a)}),(n=a,(t=document.createElement("div")).className=Object(m.a)("_",n),document.body.appendChild(t),v[n]=t))})}var C={},E=function(m){return function(e,t,n){var o=Object.assign({},C,n);t=[t,C.duration,3].find(function(n){return"number"==typeof n});var a=o.onClose,r=o.position,i=void 0===r?"top":r,s=o.title,l=o.className,c=void 0===l?"":l,d=o.top,p=void 0===d?"auto":d,u=o.hideClose;return T(i).then(function(n){return n.addMessage({content:e,duration:t,type:m,onClose:a,title:s,className:c,top:p,position:i,hideClose:u})})}};e.a={show:E("default"),success:E("success"),info:E("info"),warn:E("warning"),warning:E("warning"),danger:E("danger"),error:E("danger"),close:function(n){n?S(n):["top","middle","top-left","top-right","bottom-left","bottom-right"].forEach(function(n){S(n)})},setOptions:function(n){C=n}}},562:function(n,e,t){"use strict";t.d(e,"a",function(){return s}),t.d(e,"b",function(){return l});var o=t(0),a=t.n(o),r=t(38),i=Object(r.a)(),s=i.Provider,l=function(t){return function(e){return a.a.createElement(i.Consumer,null,function(n){return a.a.createElement(t,Object.assign({},e,n))})}}},727:function(n,e,t){"use strict";t.r(e);var o=t(0),a=t.n(o),r=t(563),i=t(564),s=t(40),l=t(728),c=t.n(l),d=t(729),p=t.n(d),u=Object(s.b)(c.a,p.a),m=[{name:"1-base",isTs:!0,isTest:!1,title:Object(s.b)("基本用法 \n Dropdown 通过数据来渲染，支持 json 格式数据、React 组件","Base \n Dropdown is rendered through data and supports json formatted data and React components."),component:t(730).default,rawText:t(731),parseTsText:t(732)},{name:"2-hover",isTs:!0,isTest:!1,title:Object(s.b)('触发 \n Dropdown 默认通过点击触发下拉行为，设置 trigger="hover" 属性可以改为移入触发','Trigger \n By default, Dropdown toggled clicking, setting trigger="hover" can toggled by mouse move in.'),component:t(733).default,rawText:t(734),parseTsText:t(735)},{name:"3-position",isTs:!0,isTest:!1,title:Object(s.b)("弹出位置 \n 设置 position 属性可以控制下拉菜单弹出的方向和位置","Position \n Set position property can control the direction and position of the drop-down menu."),component:t(736).default,rawText:t(737),parseTsText:t(738)},{name:"4-items",isTs:!0,isTest:!1,title:Object(s.b)("多列平铺 \n 设置 columns 属性可以让选项多列平铺","Multiple columns \n Set columns property can make the option multi-column tiled."),component:t(739).default,rawText:t(740),parseTsText:t(741)},{name:"5-split",isTs:!0,isTest:!1,title:Object(s.b)("组合 \n 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项","Group \n Dropdown can be combined with Button used in Button.Group."),component:t(742).default,rawText:t(743),parseTsText:t(744)},{name:"6-type",isTs:!0,isTest:!1,title:Object(s.b)("样式 \n 使用了和Button相同的 type 和 size 设置样式","type \n Style is set using the same type and size as Button."),component:t(745).default,rawText:t(746),parseTsText:t(747)},{name:"7-base",isTs:!0,isTest:!1,title:Object(s.b)("绝对定位 \n 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。","Absolute \n If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer."),component:t(748).default,rawText:t(749),parseTsText:t(750)}];e.default=Object(r.a)(function(n){return a.a.createElement(i.b,Object.assign({},n,{codes:void 0,source:u,examples:m}))})},728:function(n,e){n.exports="# Dropdown *下拉菜单*\n\n<example />\n\n## API\n\n### Dropdown\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| className | string | 无 | 扩展className |\n| columns | number | 无 | 页面多元素展示,此属性需要依赖width属性,请合理的设置列数和宽度 |\n| data | object[] | 必填 | 下拉数据，详见data |\n| disabled | boolean | false | 禁用 |\n| onClick | (data: object) => void | 无 | 点击事件。参数为渲染的数据, <br /> 注: 如果数据内设置了onClick，会忽略此方法，调用data.onClick |\n| outline | boolean | false | 同 [Button](/components/Button) |\n| placeholder | string \\| ReactNode | 必填 | 按钮显示内容 |\n| renderItem | (data: object) => ReactNode \\| string | 'content' | 设置显示的内容,如果是字符串,则为对应的值<br />如果是函数,则返回值为显示的内容,参数为当条数据 |\n| size | string | 'default' | 同 [Button](/components/Button) |\n| trigger | 'click' \\| 'hover' | 'click' | 触发方式 |\n| type | 'primary' \\| 'secondary' \\|  'success' \\| 'info' \\|  'warning' \\|  'danger' \\|  'link' | 'default' | 类型 |\n| width | number | 无 | 弹出选项层的宽度 |\n| animation | boolean | true | 是否开启动画 |\n| absolute | boolean \\| (() => element) | false | 为 true 时，选项弹出层在 BODY 下独立 render， 为函数时 选项弹出层在函数返回的 DOM 下render  |\n| position | 'left-top' \\| 'left-bottom' \\| 'right-top' \\| 'right-bottom' \\| 'top-right' \\| 'top-left' \\| 'bottom-right' \\| 'bottom-left' \\| 'auto' | 'auto' | 弹出层位置 |\n\n### DropdownData\n\ndata 选项有三种情况：\n\n- 为 ReactElement 时，直接显示此元素。\n\n- 为 object 且设置了 renderItem，显示 renderItem 返回的内容。\n\n- 为 object 且未设置 renderItem，按以下数据结构处理。\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| content | string \\| element | | 默认从content获取内容 |\n| url | string | 无 | url属性不为空时，render为一个链接 |\n| target | string | 无 | url 不为空时有效 |\n| onClick | function | 无 | 点击事件 |\n"},729:function(n,e){n.exports="# Dropdown\n\n<example />\n\n## API\n\n### Dropdown\n\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| className | string | none | Extend className |\n| columns | number | none | Display multiple elements on the page. This property depends on the width attribute. Please set the number of columns and width appropriately. |\n| data | object[] | required | See the detail in the data of the drop down box. |\n| disabled | boolean | false | disabled |\n| onClick | (data: object) => void | none | The click event. The parameter is the rendered data. <br /> Note: if the onClick is set in the data, this method will be ignored and data.onclick will be called. |\n| outline | boolean | false | The same as [Button](/components/Button) |\n| placeholder | string \\| ReactNode | required | Displayed content of the button |\n| renderItem | (data: object) => ReactNode \\| string | 'content' | Set the displayed content. If it is a string,  the corresponding value will be displayed. <br />If it is a function, the return value will be displayed and its parameter is the current data. |\n| size | string | 'default' | The same as [Button](/components/Button) |\n| trigger | 'click' \\| 'hover' | 'click' | Toggle mode, options |\n| type | 'primary' \\| 'secondary' \\|  'success' \\| 'info' \\|  'warning' \\|  'danger' \\|  'link' | 'default' | type of Dropdown |\n| width | number | none | The width of the pop-up option layer |\n| animation | boolean | true | animation toggle |\n| absolute \\| (() => element) | boolean | false | When it is true, the pop-up layer of option append into document.body. When it is function, the pop-up layer of option append into it's return DOM.  |\n| position | 'left-top' \\| 'left-bottom' \\| 'right-top' \\| 'right-bottom' \\| 'top-right' \\| 'top-left' \\| 'bottom-right' \\| 'bottom-left' \\| 'auto' | 'auto' | Set position property can control the direction and position of the drop-down menu.\n |\n\n\n### DropdownData\n\n- If data item is a ReactElement, render the item;\n- If data item is an object and renderItem is set, render the renderItem's result;\n- if data item is an object and renderItem is not set, handle the parameters as follows;\n\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| content | string \\| element | |  |\n| url | string | none | When the url is not empty, a url will be rendered. |\n| target | string | none | It is valid when the url is not empty. |\n| onClick | function | none | The click event |\n"},730:function(n,e,t){"use strict";t.r(e);var o=t(0),a=t.n(o),r=t(304),i=t(258),s=[{content:"Submenu",children:[{content:"Link to Google",target:"_blank",url:"https://google.com"},{content:"Disabled",disabled:!0}]},a.a.createElement("a",{href:"/"},"Home"),{content:"Message",onClick:function(){r.a.info("Some message.")}}];e.default=function(){return a.a.createElement(i.a,{placeholder:"Dropdown",data:s})}},731:function(n,e){n.exports="/**\n * cn - 基本用法\n *    -- Dropdown 通过数据来渲染，支持 json 格式数据、React 组件\n * en - Base\n *    -- Dropdown is rendered through data and supports json formatted data and React components.\n */\nimport React from 'react'\nimport { Dropdown, Message, TYPE } from 'shineout'\n\ntype DropdownProps = TYPE.Dropdown.Props\ntype DropdownData = DropdownProps['data']\n\nconst data: DropdownData = [\n  {\n    content: 'Submenu',\n    children: [\n      {\n        content: 'Link to Google',\n        target: '_blank',\n        url: 'https://google.com',\n      },\n      {\n        content: 'Disabled',\n        disabled: true,\n      },\n    ],\n  },\n  <a href=\"/\">Home</a>,\n  {\n    content: 'Message',\n    onClick: () => {\n      Message.info('Some message.')\n    },\n  },\n]\n\nconst App: React.FC = () => <Dropdown placeholder=\"Dropdown\" data={data} />\n\nexport default App\n"},732:function(n,e){n.exports="/**\n * cn - 基本用法\n *    -- Dropdown 通过数据来渲染，支持 json 格式数据、React 组件\n * en - Base\n *    -- Dropdown is rendered through data and supports json formatted data and React components.\n */\nimport React from 'react';\nimport { Dropdown, Message } from 'shineout';\nconst data = [\n    {\n        content: 'Submenu',\n        children: [\n            {\n                content: 'Link to Google',\n                target: '_blank',\n                url: 'https://google.com',\n            },\n            {\n                content: 'Disabled',\n                disabled: true,\n            },\n        ],\n    },\n    <a href=\"/\">Home</a>,\n    {\n        content: 'Message',\n        onClick: () => {\n            Message.info('Some message.');\n        },\n    },\n];\nconst App = () => <Dropdown placeholder=\"Dropdown\" data={data}/>;\nexport default App;\n"},733:function(n,e,t){"use strict";t.r(e);var o=t(0),a=t.n(o),r=t(258),i=[{content:"First",id:"1",children:[{id:"3",content:"optic 1"}]},{content:"Second",url:"http://www.google.com",id:"2",children:[{content:"topic 2",id:4,children:[{id:"6",content:"topic 3"}]}]}];e.default=function(){return a.a.createElement(r.a,{trigger:"hover",placeholder:"Hover",data:i})}},734:function(n,e){n.exports="/**\n * cn - 触发\n *    -- Dropdown 默认通过点击触发下拉行为，设置 trigger=\"hover\" 属性可以改为移入触发\n * en - Trigger\n *    -- By default, Dropdown toggled clicking, setting trigger=\"hover\" can toggled by mouse move in.\n */\nimport React from 'react'\nimport { Dropdown, TYPE } from 'shineout'\n\ntype DropdownProps = TYPE.Dropdown.Props\ntype DropdownData = DropdownProps['data']\n\nconst menu: DropdownData = [\n  {\n    content: 'First',\n    id: '1',\n    children: [\n      {\n        id: '3',\n        content: 'optic 1',\n      },\n    ],\n  },\n  {\n    content: 'Second',\n    url: 'http://www.google.com',\n    id: '2',\n    children: [\n      {\n        content: 'topic 2',\n        id: 4,\n        children: [\n          {\n            id: '6',\n            content: 'topic 3',\n          },\n        ],\n      },\n    ],\n  },\n]\n\nconst App: React.FC = () => <Dropdown trigger=\"hover\" placeholder=\"Hover\" data={menu} />\n\nexport default App\n"},735:function(n,e){n.exports="/**\n * cn - 触发\n *    -- Dropdown 默认通过点击触发下拉行为，设置 trigger=\"hover\" 属性可以改为移入触发\n * en - Trigger\n *    -- By default, Dropdown toggled clicking, setting trigger=\"hover\" can toggled by mouse move in.\n */\nimport React from 'react';\nimport { Dropdown } from 'shineout';\nconst menu = [\n    {\n        content: 'First',\n        id: '1',\n        children: [\n            {\n                id: '3',\n                content: 'optic 1',\n            },\n        ],\n    },\n    {\n        content: 'Second',\n        url: 'http://www.google.com',\n        id: '2',\n        children: [\n            {\n                content: 'topic 2',\n                id: 4,\n                children: [\n                    {\n                        id: '6',\n                        content: 'topic 3',\n                    },\n                ],\n            },\n        ],\n    },\n];\nconst App = () => <Dropdown trigger=\"hover\" placeholder=\"Hover\" data={menu}/>;\nexport default App;\n"},736:function(n,e,t){"use strict";t.r(e);var o=t(0),a=t.n(o),r=t(258),i={marginInlineEnd:12,marginBottom:12},s=[{content:"First",id:"1",children:[{content:"link1",id:"4"},{content:"link2",id:"5"}]},{content:"Second",url:"http://www.google.com",id:"2",children:[{content:"link3",id:6,onClick:function(){console.log("this is special")}},{content:"link4",id:7,children:[{id:"8",content:"link5"},{id:"9",content:"link6"}]}]}];e.default=function(){return a.a.createElement("div",null,a.a.createElement(r.a,{placeholder:"Right Top",style:i,position:"right-top",data:s}),a.a.createElement(r.a,{placeholder:"Bottom Left",style:i,position:"bottom-left",data:s}),a.a.createElement(r.a,{placeholder:"Bottom Right",style:i,position:"bottom-right",data:s}),a.a.createElement(r.a,{placeholder:"Left Top",style:i,position:"left-top",data:s}),a.a.createElement("br",null),a.a.createElement(r.a,{placeholder:"Right Bottom",style:i,position:"right-bottom",data:s}),a.a.createElement(r.a,{placeholder:"Top Left",style:i,position:"top-left",data:s}),a.a.createElement(r.a,{placeholder:"Top Right",style:i,position:"top-right",data:s}),a.a.createElement(r.a,{placeholder:"Left Bottom",style:i,position:"left-bottom",data:s}),a.a.createElement("br",null),a.a.createElement(r.a,{placeholder:"Auto Position",style:i,position:"auto",data:s}))}},737:function(n,e){n.exports="/**\n * cn - 弹出位置\n *    -- 设置 position 属性可以控制下拉菜单弹出的方向和位置\n * en - Position\n *    -- Set position property can control the direction and position of the drop-down menu.\n */\nimport React from 'react'\nimport { Dropdown, TYPE } from 'shineout'\n\ntype DropdownProps = TYPE.Dropdown.Props\ntype DropdownData = DropdownProps['data']\n\nconst style = { marginInlineEnd: 12, marginBottom: 12 }\n\nconst menu: DropdownData = [\n  {\n    content: 'First',\n    id: '1',\n    children: [\n      {\n        content: 'link1',\n        id: '4',\n      },\n      {\n        content: 'link2',\n        id: '5',\n      },\n    ],\n  },\n  {\n    content: 'Second',\n    url: 'http://www.google.com',\n    id: '2',\n    children: [\n      {\n        content: 'link3',\n        id: 6,\n        onClick: () => {\n          console.log('this is special')\n        },\n      },\n      {\n        content: 'link4',\n        id: 7,\n        children: [\n          {\n            id: '8',\n            content: 'link5',\n          },\n          {\n            id: '9',\n            content: 'link6',\n          },\n        ],\n      },\n    ],\n  },\n]\n\nconst App: React.FC = () => (\n  <div>\n    <Dropdown placeholder=\"Right Top\" style={style} position=\"right-top\" data={menu} />\n\n    <Dropdown placeholder=\"Bottom Left\" style={style} position=\"bottom-left\" data={menu} />\n\n    <Dropdown placeholder=\"Bottom Right\" style={style} position=\"bottom-right\" data={menu} />\n\n    <Dropdown placeholder=\"Left Top\" style={style} position=\"left-top\" data={menu} />\n\n    <br />\n\n    <Dropdown placeholder=\"Right Bottom\" style={style} position=\"right-bottom\" data={menu} />\n\n    <Dropdown placeholder=\"Top Left\" style={style} position=\"top-left\" data={menu} />\n\n    <Dropdown placeholder=\"Top Right\" style={style} position=\"top-right\" data={menu} />\n\n    <Dropdown placeholder=\"Left Bottom\" style={style} position=\"left-bottom\" data={menu} />\n\n    <br />\n\n    <Dropdown placeholder=\"Auto Position\" style={style} position=\"auto\" data={menu} />\n  </div>\n)\n\nexport default App\n"},738:function(n,e){n.exports="/**\n * cn - 弹出位置\n *    -- 设置 position 属性可以控制下拉菜单弹出的方向和位置\n * en - Position\n *    -- Set position property can control the direction and position of the drop-down menu.\n */\nimport React from 'react';\nimport { Dropdown } from 'shineout';\nconst style = { marginInlineEnd: 12, marginBottom: 12 };\nconst menu = [\n    {\n        content: 'First',\n        id: '1',\n        children: [\n            {\n                content: 'link1',\n                id: '4',\n            },\n            {\n                content: 'link2',\n                id: '5',\n            },\n        ],\n    },\n    {\n        content: 'Second',\n        url: 'http://www.google.com',\n        id: '2',\n        children: [\n            {\n                content: 'link3',\n                id: 6,\n                onClick: () => {\n                    console.log('this is special');\n                },\n            },\n            {\n                content: 'link4',\n                id: 7,\n                children: [\n                    {\n                        id: '8',\n                        content: 'link5',\n                    },\n                    {\n                        id: '9',\n                        content: 'link6',\n                    },\n                ],\n            },\n        ],\n    },\n];\nconst App = () => (<div>\n    <Dropdown placeholder=\"Right Top\" style={style} position=\"right-top\" data={menu}/>\n\n    <Dropdown placeholder=\"Bottom Left\" style={style} position=\"bottom-left\" data={menu}/>\n\n    <Dropdown placeholder=\"Bottom Right\" style={style} position=\"bottom-right\" data={menu}/>\n\n    <Dropdown placeholder=\"Left Top\" style={style} position=\"left-top\" data={menu}/>\n\n    <br />\n\n    <Dropdown placeholder=\"Right Bottom\" style={style} position=\"right-bottom\" data={menu}/>\n\n    <Dropdown placeholder=\"Top Left\" style={style} position=\"top-left\" data={menu}/>\n\n    <Dropdown placeholder=\"Top Right\" style={style} position=\"top-right\" data={menu}/>\n\n    <Dropdown placeholder=\"Left Bottom\" style={style} position=\"left-bottom\" data={menu}/>\n\n    <br />\n\n    <Dropdown placeholder=\"Auto Position\" style={style} position=\"auto\" data={menu}/>\n  </div>);\nexport default App;\n"},739:function(n,e,t){"use strict";t.r(e);for(var o=t(0),a=t.n(o),r=t(258),i=[],s=1;s<=30;s++)i.push({id:"".concat(s),content:"item".concat(s)});e.default=function(){return a.a.createElement(r.a,{placeholder:"Dropdown",width:500,columns:5,data:i})}},740:function(n,e){n.exports="/**\n * cn - 多列平铺\n *    -- 设置 columns 属性可以让选项多列平铺\n * en - Multiple columns\n *    -- Set columns property can make the option multi-column tiled.\n */\nimport React from 'react'\nimport { Dropdown, TYPE } from 'shineout'\n\ntype DropdownProps = TYPE.Dropdown.Props\ntype DropdownData = DropdownProps['data']\n\nconst menu: DropdownData = []\n\nfor (let i = 1; i <= 30; i++) {\n  menu.push({\n    id: `${i}`,\n    content: `item${i}`,\n  })\n}\n\nconst App: React.FC = () => <Dropdown placeholder=\"Dropdown\" width={500} columns={5} data={menu} />\n\nexport default App\n"},741:function(n,e){n.exports="/**\n * cn - 多列平铺\n *    -- 设置 columns 属性可以让选项多列平铺\n * en - Multiple columns\n *    -- Set columns property can make the option multi-column tiled.\n */\nimport React from 'react';\nimport { Dropdown } from 'shineout';\nconst menu = [];\nfor (let i = 1; i <= 30; i++) {\n    menu.push({\n        id: `${i}`,\n        content: `item${i}`,\n    });\n}\nconst App = () => <Dropdown placeholder=\"Dropdown\" width={500} columns={5} data={menu}/>;\nexport default App;\n"},742:function(n,e,t){"use strict";t.r(e);var o=t(0),a=t.n(o),r=t(67),i=t(304),s=t(258),l=[{content:"First"},{content:"Second",target:"_blank",url:"http://www.google.com"}];e.default=function(){return a.a.createElement(r.a.Group,null,a.a.createElement(r.a,{onClick:function(){return i.a.info("The left button clicked.")}},"Left"),a.a.createElement(r.a,null,"Center"),a.a.createElement(s.a,{data:l,position:"bottom-right",onClick:function(n){return i.a.info("The Dropdown clicked ".concat(n.content,"."))}}))}},743:function(n,e){n.exports="/**\n * cn - 组合\n *    -- 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项\n * en - Group\n *    -- Dropdown can be combined with Button used in Button.Group.\n */\nimport React from 'react'\nimport { Dropdown, Message, Button, TYPE } from 'shineout'\n\ntype DropdownProps = TYPE.Dropdown.Props\ntype DropdownData = DropdownProps['data']\n\nconst menu: DropdownData = [\n  {\n    content: 'First',\n  },\n  {\n    content: 'Second',\n    target: '_blank',\n    url: 'http://www.google.com',\n  },\n]\n\nconst App: React.FC = () => (\n  <Button.Group>\n    <Button onClick={() => Message.info('The left button clicked.')}>Left</Button>\n\n    <Button>Center</Button>\n\n    <Dropdown\n      data={menu}\n      position=\"bottom-right\"\n      onClick={data => Message.info(`The Dropdown clicked ${data.content}.`)}\n    />\n  </Button.Group>\n)\n\nexport default App\n"},744:function(n,e){n.exports="/**\n * cn - 组合\n *    -- 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项\n * en - Group\n *    -- Dropdown can be combined with Button used in Button.Group.\n */\nimport React from 'react';\nimport { Dropdown, Message, Button } from 'shineout';\nconst menu = [\n    {\n        content: 'First',\n    },\n    {\n        content: 'Second',\n        target: '_blank',\n        url: 'http://www.google.com',\n    },\n];\nconst App = () => (<Button.Group>\n    <Button onClick={() => Message.info('The left button clicked.')}>Left</Button>\n\n    <Button>Center</Button>\n\n    <Dropdown data={menu} position=\"bottom-right\" onClick={data => Message.info(`The Dropdown clicked ${data.content}.`)}/>\n  </Button.Group>);\nexport default App;\n"},745:function(n,e,t){"use strict";t.r(e);var g=t(24),b=t(0),y=t.n(b),o=t(304),w=t(201),D=t(302),v=t(258),k=[{content:"Submenu",children:[{content:"Link",target:"_blank",url:"https://google.com"},{content:"Disabled",disabled:!0}]},{content:"Message",onClick:function(){o.a.info("Some message.")}}],S={marginInlineEnd:20};e.default=function(){var n=Object(b.useState)("primary"),e=Object(g.a)(n,2),t=e[0],o=e[1],a=Object(b.useState)("default"),r=Object(g.a)(a,2),i=r[0],s=r[1],l=Object(b.useState)(!1),c=Object(g.a)(l,2),d=c[0],p=c[1],u=Object(b.useState)(!1),m=Object(g.a)(u,2),h=m[0],f=m[1];return y.a.createElement("div",null,y.a.createElement("div",{style:{marginBottom:20}},y.a.createElement("span",{style:{display:"inline-block"}},"type: "),y.a.createElement(w.a,{width:140,data:["primary","success","warning","danger"],value:t,style:S,keygen:function(n){return n},onChange:function(n){return o(n)}}),y.a.createElement("span",{style:{display:"inline-block"}},"size: "),y.a.createElement(w.a,{width:100,data:["small","default","large"],value:i,style:S,keygen:function(n){return n},onChange:function(n){return s(n)}}),y.a.createElement(D.a,{value:d,onChange:function(n){return p(n)}},"outline"),y.a.createElement(D.a,{value:h,onChange:function(n){return f(n)}},"disabled")),y.a.createElement(v.a,{placeholder:"Dropdown",data:k,disabled:h,outline:d,size:i,type:t}))}},746:function(n,e){n.exports="/**\n * cn - 样式\n *    -- 使用了和Button相同的 type 和 size 设置样式\n * en - type\n *    -- Style is set using the same type and size as Button.\n */\nimport React, { useState } from 'react'\nimport { Dropdown, Message, Select, Checkbox, TYPE } from 'shineout'\n\ntype SelectProps = TYPE.Select.Props<string, string>\ntype SelectData = SelectProps['data']\n\ntype DropdownProps = TYPE.Dropdown.Props\ntype DropdownData = DropdownProps['data']\ntype DropdownSize = DropdownProps['size']\ntype DropdownType = DropdownProps['type']\ntype DropdownOutline = DropdownProps['outline']\ntype DropdownDisabled = DropdownProps['disabled']\n\nconst menu: DropdownData = [\n  {\n    content: 'Submenu',\n    children: [\n      {\n        content: 'Link',\n        target: '_blank',\n        url: 'https://google.com',\n      },\n      {\n        content: 'Disabled',\n        disabled: true,\n      },\n    ],\n  },\n  {\n    content: 'Message',\n    onClick: () => {\n      Message.info('Some message.')\n    },\n  },\n]\n\nconst style: React.CSSProperties = { marginInlineEnd: 20 }\n\nconst App: React.FC = () => {\n  const [type, setType] = useState<DropdownType>('primary')\n  const [size, setSize] = useState<DropdownSize>('default')\n  const [outline, setOutline] = useState<DropdownOutline>(false)\n  const [disabled, setDisabled] = useState<DropdownDisabled>(false)\n  const sizes: SelectData = ['small', 'default', 'large']\n  const types: SelectData = ['primary', 'success', 'warning', 'danger']\n\n  return (\n    <div>\n      <div style={{ marginBottom: 20 }}>\n        <span style={{ display: 'inline-block' }}>type: </span>\n        <Select\n          width={140}\n          data={types}\n          value={type}\n          style={style}\n          keygen={d => d}\n          onChange={value => setType(value)}\n        />\n\n        <span style={{ display: 'inline-block' }}>size: </span>\n        <Select\n          width={100}\n          data={sizes}\n          value={size}\n          style={style}\n          keygen={d => d}\n          onChange={value => setSize(value)}\n        />\n\n        <Checkbox value={outline} onChange={value => setOutline(value)}>\n          outline\n        </Checkbox>\n\n        <Checkbox value={disabled} onChange={value => setDisabled(value)}>\n          disabled\n        </Checkbox>\n      </div>\n\n      <Dropdown placeholder=\"Dropdown\" data={menu} disabled={disabled} outline={outline} size={size} type={type} />\n    </div>\n  )\n}\n\nexport default App\n"},747:function(n,e){n.exports="/**\n * cn - 样式\n *    -- 使用了和Button相同的 type 和 size 设置样式\n * en - type\n *    -- Style is set using the same type and size as Button.\n */\nimport React, { useState } from 'react';\nimport { Dropdown, Message, Select, Checkbox } from 'shineout';\nconst menu = [\n    {\n        content: 'Submenu',\n        children: [\n            {\n                content: 'Link',\n                target: '_blank',\n                url: 'https://google.com',\n            },\n            {\n                content: 'Disabled',\n                disabled: true,\n            },\n        ],\n    },\n    {\n        content: 'Message',\n        onClick: () => {\n            Message.info('Some message.');\n        },\n    },\n];\nconst style = { marginInlineEnd: 20 };\nconst App = () => {\n    const [type, setType] = useState('primary');\n    const [size, setSize] = useState('default');\n    const [outline, setOutline] = useState(false);\n    const [disabled, setDisabled] = useState(false);\n    const sizes = ['small', 'default', 'large'];\n    const types = ['primary', 'success', 'warning', 'danger'];\n    return (<div>\n      <div style={{ marginBottom: 20 }}>\n        <span style={{ display: 'inline-block' }}>type: </span>\n        <Select width={140} data={types} value={type} style={style} keygen={d => d} onChange={value => setType(value)}/>\n\n        <span style={{ display: 'inline-block' }}>size: </span>\n        <Select width={100} data={sizes} value={size} style={style} keygen={d => d} onChange={value => setSize(value)}/>\n\n        <Checkbox value={outline} onChange={value => setOutline(value)}>\n          outline\n        </Checkbox>\n\n        <Checkbox value={disabled} onChange={value => setDisabled(value)}>\n          disabled\n        </Checkbox>\n      </div>\n\n      <Dropdown placeholder=\"Dropdown\" data={menu} disabled={disabled} outline={outline} size={size} type={type}/>\n    </div>);\n};\nexport default App;\n"},748:function(n,e,t){"use strict";t.r(e);var o=t(0),a=t.n(o),r=t(304),i=t(258),s=[{content:"Submenu",children:[{content:"Link to Google",target:"_blank",url:"https://google.com"},{content:"Disabled",disabled:!0}]},a.a.createElement("a",{href:"/"},"Home"),{content:"Message",onClick:function(){r.a.info("Some message.")}}];e.default=function(){return a.a.createElement("div",{style:{background:"#eee",padding:20,borderRadius:10,overflow:"hidden"}},a.a.createElement(i.a,{absolute:!0,placeholder:"Absolute",data:s}),a.a.createElement(i.a,{placeholder:"Default",data:s,style:{marginInlineStart:40}}))}},749:function(n,e){n.exports="/**\n * cn - 绝对定位\n *    -- 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。\n * en - Absolute\n *    -- If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer.\n */\nimport React from 'react'\nimport { Dropdown, Message, TYPE } from 'shineout'\n\ntype DropdownProps = TYPE.Dropdown.Props\ntype DropdownData = DropdownProps['data']\n\nconst data: DropdownData = [\n  {\n    content: 'Submenu',\n    children: [\n      {\n        content: 'Link to Google',\n        target: '_blank',\n        url: 'https://google.com',\n      },\n      {\n        content: 'Disabled',\n        disabled: true,\n      },\n    ],\n  },\n  <a href=\"/\">Home</a>,\n  {\n    content: 'Message',\n    onClick: () => {\n      Message.info('Some message.')\n    },\n  },\n]\n\nconst App: React.FC = () => (\n  <div style={{ background: '#eee', padding: 20, borderRadius: 10, overflow: 'hidden' }}>\n    <Dropdown absolute placeholder=\"Absolute\" data={data} />\n\n    <Dropdown placeholder=\"Default\" data={data} style={{ marginInlineStart: 40 }} />\n  </div>\n)\n\nexport default App\n"},750:function(n,e){n.exports="/**\n * cn - 绝对定位\n *    -- 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。\n * en - Absolute\n *    -- If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer.\n */\nimport React from 'react';\nimport { Dropdown, Message } from 'shineout';\nconst data = [\n    {\n        content: 'Submenu',\n        children: [\n            {\n                content: 'Link to Google',\n                target: '_blank',\n                url: 'https://google.com',\n            },\n            {\n                content: 'Disabled',\n                disabled: true,\n            },\n        ],\n    },\n    <a href=\"/\">Home</a>,\n    {\n        content: 'Message',\n        onClick: () => {\n            Message.info('Some message.');\n        },\n    },\n];\nconst App = () => (<div style={{ background: '#eee', padding: 20, borderRadius: 10, overflow: 'hidden' }}>\n    <Dropdown absolute placeholder=\"Absolute\" data={data}/>\n\n    <Dropdown placeholder=\"Default\" data={data} style={{ marginInlineStart: 40 }}/>\n  </div>);\nexport default App;\n"}}]);