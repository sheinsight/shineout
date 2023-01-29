(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[47],{1039:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(493),i=n(494),s=n(39),c=n(1040),l=n.n(c),d=n(1041),u=n.n(d),h=Object(s.b)(l.a,u.a),f=[{name:"1-base",title:Object(s.b)("基本用法 \n 基本的使用","Base \n Basic usage"),component:n(1042).default,rawText:n(1043)},{name:"2-controlled",title:Object(s.b)("受控 \n 组件受控","Controlled \n Component controlled"),component:n(1044).default,rawText:n(1045)},{name:"3-customTitle",title:Object(s.b)("自定义 \n 可以自定义标题, 按钮, 底部, 样式等属性","Customize \n Customizable title, button, bottom properties"),component:n(1046).default,rawText:n(1047)},{name:"4-selected",title:Object(s.b)("受控选中 \n 可以通过 selectedKeys 和 onSelectChange 去控制哪些列表项被选中 \n <b>注: 勾选的值均使用的是 keygen 的结果</b>","Controlled selected \n Can control which elements are selected by selectedKeys and onSelectChange"),component:n(1048).default,rawText:n(1049)},{name:"5-filter",title:Object(s.b)("筛选 \n 可以通过设置 onFilter 去筛选列表项","Filter \n Can filter list items by setting onFilter"),component:n(1050).default,rawText:n(1051)},{name:"6-loading",title:Object(s.b)("加载中 \n 穿梭框的加载中","Loading \n Loading"),component:n(1052).default,rawText:n(1053)},{name:"6-mloading",title:Object(s.b)(" \n 可以通过给 loading 设置数组的方式, 给两边设置一个不同的loading"," \n You can set an array for loading and set an unused loading for both sides"),component:n(1054).default,rawText:n(1055)}];t.default=Object(o.a)(function(e){return r.a.createElement(i.b,Object.assign({},e,{codes:void 0,source:h,examples:f}))})},1040:function(e,t){e.exports="# Transfer *穿梭框*\n\n<example />\n\n## API\n\n** *为了统一及方便使用, 与勾选有关的 api 均使用 keygen 作为结果, 所以需要必填 keygen 且保证不会出现重复的 keygen**\n\n\n| 属性 | 类型 | 默认值 | 说明 | 版本 |\n| --- | --- | --- | --- | --- |\n| value | any[] | 无 | 显示在右侧框数据的值集合 | |\n| titles | ReactNode[] | 无 | 两侧的标题, 顺序是从左到右 | |\n| data | any[] | 无 | 数据源 | |\n| format | (data: any) => any \\| string | d => d | 格式化 value<br />默认值，返回原始数据<br />为string时，会作为key从原始数据中获取值，相当于 (d) => d\\[format\\]<br /> 为函数时，以函数返回结果作为 value | |\n| prediction | (value: any, data: any) => boolean | (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配 | |\n| keygen | (data: any) => string \\| string \\| true | 必填 | 生成每一项key的辅助方法<br />为 true 时，以数据项本身作为key，相当于 (d => d)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id) | |\n| renderItem | (data: any) => ReactNode \\| string | 必填 | 为 string 时，返回 d\\[string]<br />为 function 时，返回函数结果 | |\n| footers | ReactNode[] | 无 | 底部元素, 顺序是从左到右 | |\n| operations | ReactNode[] | 无 | 操作元素, 顺序是从上到下 | |\n| operationIcon | boolean | true |  是否显示操作按钮的图标 | |\n| className | string | 无 | 扩展的 class | |\n| style | object | 无 |  扩展的样式 | |\n| listClassName | string | 无 | 列表扩展的 class | |\n| listStyle | object | 无 | 列表扩展的样式 | |\n| selectedKeys | any[] | 无 |  被勾选的列表 | |\n| defaultSelectedKeys | any[] | 无 |  默认被勾选的列表 | |\n| onSelectChange | (sourceKeys: any[], targetKeys: any[]) => void | 无 |   勾选触发的方法 | |\n| disabled | (data: any) => boolean \\| boolean| false | 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项 | |\n| empty | ReactNode | \"无数据\" | 无内容的展示 | |\n| onFilter | (text: string, value: any, isSource: boolean) => boolean | 无 | 筛选函数, 参数为: 输入文本, 数据, 是否为左侧数据 | |\n| loading| boolean \\| boolean[] | 无 | 加载中, 如果需要两侧加载中状态不一致, 需要传入数组 | |\n| onSearch | (text: string, isSource: boolean) => void | 无 | 输入框值变化的回调, 参数为: 输入文本, 是否为左侧数据 | 1.4.4 |\n"},1041:function(e,t){e.exports="# Transfer\n\n<example />\n\n## API\n\n** *For uniformity and ease of use, keygen is used as the result for the apis associated with the check, so keygen is required and no duplicate keygen is guaranteed.**\n\n\n| Property | Type | Default | Description | Version |\n| --- | --- | --- | --- | -- |\n| value | any[] | - | The set of values ​​displayed in the box data on the right | |\n| titles | ReactNode[] | - | Title on both sides, order from left to right | |\n| data | any[] | - | data source | |\n| format | (data: any) => any \\| string | d => d | Format value<br />The defaule value is return the original data.<br />When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\\[format\\]<br />When it is a function, use its return value. | |\n| prediction | (value: any, data: any) => boolean | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match | |\n| keygen | (data: any) => string \\| string \\| true | index | Generate a auxiliary method for each key<br />If not filled, index will be used(not recommended,there may be problems with more than 10 data)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. | |\n| renderItem | (data: any) => ReactNode \\| string | required | When it is a string, return d\\[string]<br />When it is a function, return the result of the function. | |\n| footers | ReactNode[] | - | Bottom element, order from left to right | |\n| operations | ReactNode[] | - | Operational elements, the order is from top to bottom | |\n| operationIcon | boolean | true |  Whether to display the icon of the action button | |\n| className | string | - | Expanded class | |\n| style | object | - |  Expanded style | |\n| listClassName | string | - | List extended class | |\n| listStyle | object | - | List extension style | |\n| selectedKeys | any[] | - |  Checked list | |\n| defaultSelectedKeys | any[] | - | Default checked list | |\n| onSelectChange | (sourceKeys: any[], targetKeys: any[]) => void | - |  Check the trigger method | |\n| disabled | (data: any) => boolean \\| boolean | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. | |\n| empty | ReactNode | \"no data\" | Contentless display | |\n| onFilter | (text: string, value: any, isSource: boolean) => boolean | - | Filter function. params: input text, the data, is data in left |\n| loading| boolean \\| boolean[] | - | Loading, if you need to have inconsistent states on both sides of the load, you need to pass in the array | |\n| onSearch | (text: string, isSource: boolean) => void | - | the callback of input change, params: input text, is data in the left | 1.4.4 |\n"},1042:function(e,t,n){"use strict";n.r(t);for(var a=n(0),r=n.n(a),o=n(1500),i=[],s=1;s<20;s++)i.push({id:s,content:"content ".concat(s)});t.default=function(){return r.a.createElement(o.a,{data:i,format:"id",renderItem:"content",keygen:"id",titles:["Source","Target"]})}},1043:function(e,t){e.exports="/**\n * cn - 基本用法\n *    -- 基本的使用\n * en - Base\n *    -- Basic usage\n */\nimport React from 'react'\nimport { Transfer } from 'shineout'\n\nconst data = []\n\nfor (let i = 1; i < 20; i++) {\n  data.push({\n    id: i,\n    content: `content ${i}`,\n  })\n}\n\nexport default function() {\n  return <Transfer data={data} format=\"id\" renderItem=\"content\" keygen=\"id\" titles={['Source', 'Target']} />\n}\n"},1044:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return f});for(var a=n(4),r=n(5),o=n(6),i=n(3),s=n(7),c=n(0),l=n.n(c),d=n(1500),u=[],h=1;h<20;h++)u.push({id:h,content:"content ".concat(h)});var f=function(e){function n(e){var t;return Object(a.a)(this,n),(t=Object(o.a)(this,Object(i.a)(n).call(this,e))).onChange=function(e){console.log(e),t.setState({value:e})},t.state={value:[1,3,5,7,9]},t}return Object(s.a)(n,e),Object(r.a)(n,[{key:"render",value:function(){return l.a.createElement(d.a,{data:u,value:this.state.value,onChange:this.onChange,format:"id",renderItem:"content",keygen:"id",disabled:function(e){return-1<e.content.indexOf("1")}})}}]),n}(c.Component)},1045:function(e,t){e.exports="/**\n * cn - 受控\n *    -- 组件受控\n * en - Controlled\n *    -- Component controlled\n */\nimport React, { Component } from 'react'\nimport { Transfer } from 'shineout'\n\nconst data = []\n\nfor (let i = 1; i < 20; i++) {\n  data.push({\n    id: i,\n    content: `content ${i}`,\n  })\n}\n\nexport default class extends Component {\n  constructor(props) {\n    super(props)\n    this.state = {\n      value: [1, 3, 5, 7, 9],\n    }\n  }\n\n  onChange = v => {\n    console.log(v)\n    this.setState({ value: v })\n  }\n\n  render() {\n    return (\n      <Transfer\n        data={data}\n        value={this.state.value}\n        onChange={this.onChange}\n        format=\"id\"\n        renderItem=\"content\"\n        keygen=\"id\"\n        disabled={d => d.content.indexOf('1') > -1}\n      />\n    )\n  }\n}\n"},1046:function(e,t,n){"use strict";n.r(t);for(var a=n(0),r=n.n(a),o=n(1500),i=n(47),s=[],c=1;c<20;c++)s.push({id:c,content:"content ".concat(c)});t.default=function(){return r.a.createElement(o.a,{titles:["I am left","I am right"],footers:[r.a.createElement(i.a,{style:{margin:4}},"left"),r.a.createElement(i.a,{style:{margin:4}},"right")],data:s,format:"id",renderItem:"content",keygen:"id",operations:["to right","to left"],listStyle:{height:240}})}},1047:function(e,t){e.exports="/**\n * cn - 自定义\n *    -- 可以自定义标题, 按钮, 底部, 样式等属性\n * en - Customize\n *    -- Customizable title, button, bottom properties\n */\nimport React from 'react'\nimport { Transfer, Button } from 'shineout'\n\nconst data = []\n\nfor (let i = 1; i < 20; i++) {\n  data.push({\n    id: i,\n    content: `content ${i}`,\n  })\n}\n\nexport default function() {\n  return (\n    <Transfer\n      titles={['I am left', 'I am right']}\n      footers={[<Button style={{ margin: 4 }}>left</Button>, <Button style={{ margin: 4 }}>right</Button>]}\n      data={data}\n      format=\"id\"\n      renderItem=\"content\"\n      keygen=\"id\"\n      operations={['to right', 'to left']}\n      listStyle={{ height: 240 }}\n    />\n  )\n}\n"},1048:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return m});for(var a=n(26),r=n(4),o=n(5),i=n(6),s=n(3),c=n(7),l=n(0),d=n.n(l),u=n(1500),h=[],f=1;f<20;f++)h.push({id:f,content:"content ".concat(f)});var m=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(i.a)(this,Object(s.a)(t).call(this,e))).selectChange=function(e,t){n.setState({selectedKeys:[].concat(Object(a.a)(e),Object(a.a)(t))})},n.change=function(e){console.log(e),n.setState({value:e})},n.state={value:[1,3,5,7,9],selectedKeys:[1,2,3,4]},n}return Object(c.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.state,t=e.selectedKeys,n=e.value;return d.a.createElement(u.a,{data:h,selectedKeys:t,onSelectChange:this.selectChange,value:n,onChange:this.change,format:"id",renderItem:"content",keygen:"id"})}}]),t}(l.Component)},1049:function(e,t){e.exports='/**\n * cn - 受控选中\n *    -- 可以通过 selectedKeys 和 onSelectChange 去控制哪些列表项被选中\n *    -- <b>注: 勾选的值均使用的是 keygen 的结果</b>\n * en - Controlled selected\n *    -- Can control which elements are selected by selectedKeys and onSelectChange\n */\nimport React, { Component } from \'react\'\nimport { Transfer } from \'shineout\'\n\nconst data = []\n\nfor (let i = 1; i < 20; i++) {\n  data.push({\n    id: i,\n    content: `content ${i}`,\n  })\n}\n\nexport default class extends Component {\n  constructor(props) {\n    super(props)\n    this.state = {\n      value: [1, 3, 5, 7, 9],\n      selectedKeys: [1, 2, 3, 4],\n    }\n  }\n\n  selectChange = (sourceKeys, targetKeys) => {\n    this.setState({ selectedKeys: [...sourceKeys, ...targetKeys] })\n  }\n\n  change = v => {\n    console.log(v)\n    this.setState({ value: v })\n  }\n\n  render() {\n    const { selectedKeys, value } = this.state\n    return (\n      <Transfer\n        data={data}\n        selectedKeys={selectedKeys}\n        onSelectChange={this.selectChange}\n        value={value}\n        onChange={this.change}\n        format="id"\n        renderItem="content"\n        keygen="id"\n      />\n    )\n  }\n}\n'},1050:function(e,t,n){"use strict";n.r(t);for(var a=n(0),r=n.n(a),o=n(1500),i=[],s=1;s<20;s++)i.push({id:s,content:"content ".concat(s)});t.default=function(){return r.a.createElement(o.a,{onFilter:function(e,t){return-1<t.content.indexOf(e)},data:i,format:"id",renderItem:"content",keygen:"id"})}},1051:function(e,t){e.exports='/**\n * cn - 筛选\n *    -- 可以通过设置 onFilter 去筛选列表项\n * en - Filter\n *    -- Can filter list items by setting onFilter\n */\nimport React from \'react\'\nimport { Transfer } from \'shineout\'\n\nconst data = []\n\nfor (let i = 1; i < 20; i++) {\n  data.push({\n    id: i,\n    content: `content ${i}`,\n  })\n}\n\nexport default function() {\n  return (\n    <Transfer onFilter={(t, d) => d.content.indexOf(t) > -1} data={data} format="id" renderItem="content" keygen="id" />\n  )\n}\n'},1052:function(e,t,n){"use strict";n.r(t);for(var a=n(0),r=n.n(a),o=n(1500),i=[],s=1;s<20;s++)i.push({id:s,content:"content ".concat(s)});t.default=function(){return r.a.createElement(o.a,{loading:!0,data:i,format:"id",renderItem:"content",keygen:"id",titles:["Source","Target"]})}},1053:function(e,t){e.exports="/**\n * cn - 加载中\n *    -- 穿梭框的加载中\n * en -  Loading\n *    -- Loading\n */\nimport React from 'react'\nimport { Transfer } from 'shineout'\n\nconst data = []\n\nfor (let i = 1; i < 20; i++) {\n  data.push({\n    id: i,\n    content: `content ${i}`,\n  })\n}\n\nexport default function() {\n  return <Transfer loading data={data} format=\"id\" renderItem=\"content\" keygen=\"id\" titles={['Source', 'Target']} />\n}\n"},1054:function(e,t,n){"use strict";n.r(t);for(var a=n(0),r=n.n(a),o=n(1500),i=[],s=1;s<20;s++)i.push({id:s,content:"content ".concat(s)});t.default=function(){return r.a.createElement(o.a,{loading:[!0,!1],data:i,format:"id",renderItem:"content",keygen:"id",titles:["Source","Target"]})}},1055:function(e,t){e.exports="/**\n * cn -\n *    -- 可以通过给 loading 设置数组的方式, 给两边设置一个不同的loading\n * en -\n *    -- You can set an array for loading and set an unused loading for both sides\n */\nimport React from 'react'\nimport { Transfer } from 'shineout'\n\nconst data = []\n\nfor (let i = 1; i < 20; i++) {\n  data.push({\n    id: i,\n    content: `content ${i}`,\n  })\n}\n\nexport default function() {\n  return (\n    <Transfer\n      loading={[true, false]}\n      data={data}\n      format=\"id\"\n      renderItem=\"content\"\n      keygen=\"id\"\n      titles={['Source', 'Target']}\n    />\n  )\n}\n"},1500:function(e,t,n){"use strict";var a=n(4),r=n(5),o=n(6),i=n(3),s=n(7),c=n(1),l=n(0),j=n.n(l),d=n(10),k=n.n(d),y=n(19),u=n(47),h=n(16),C=n(2),f=n(36),S=function(e){function n(e){var t;return Object(a.a)(this,n),(t=Object(o.a)(this,Object(i.a)(n).call(this,e))).toSource=t.change.bind(Object(c.a)(Object(c.a)(t)),0),t.toTarget=t.change.bind(Object(c.a)(Object(c.a)(t)),1),t}return Object(s.a)(n,e),Object(r.a)(n,[{key:"change",value:function(e){var t=this.props,n=t.setSelecteds,a=t.selecteds,r=t.datum,o=t.data,i=t.keygen,s=a[1-e].map(function(n){return o.find(function(e,t){return Object(y.b)(e,i,t)===n})});n(1-e,[]),r[e?"add":"remove"](s,void 0,void 0,!0)}},{key:"render",value:function(){var e=this.props,t=e.selecteds,n=e.operations,a=e.operationIcon,r=!0===e.disabled;return j.a.createElement("div",{className:Object(C.G)("btns")},j.a.createElement("div",null,j.a.createElement(u.a,{type:"primary",disabled:r||!t[0].length,size:"small",className:Object(C.G)("btns-button","btns-bottom"),onClick:this.toTarget},a&&f.a.AngleRight,n[0]),j.a.createElement("br",null),j.a.createElement(u.a,{type:"primary",disabled:r||!t[1].length,size:"small",className:Object(C.G)("btns-button"),onClick:this.toSource},a&&f.a.AngleLeft,n[1])))}}]),n}(h.a),v=n(50),O=n(66),x=n(505),E=n(22),m=n(26),b=n(34),N=n.n(b)()(),p=function(e){function n(e){var t;return Object(a.a)(this,n),(t=Object(o.a)(this,Object(i.a)(n).call(this,e))).check=t.check.bind(Object(c.a)(Object(c.a)(t))),t}return Object(s.a)(n,e),Object(r.a)(n,[{key:"check",value:function(e){var t=this.props,n=t.index,a=t.selecteds,r=t.checkKey,o=t.setSelecteds;o(n,e?[].concat(Object(m.a)(a[n]),[r]):a[n].filter(function(e){return e!==r}))}},{key:"render",value:function(){var e=this.props,t=e.content,n=e.selecteds,a=e.checkKey,r=e.index,o=e.disabled,i=e.itemClass;return j.a.createElement("div",{className:k()(Object(C.G)("item",o&&"item-disabled"),i)},j.a.createElement(x.a,{className:Object(C.G)("item-check"),onChange:this.check,disabled:o,checked:-1<n[r].indexOf(a)},t))}}]),n}(h.b),I=function(t){return j.a.createElement(N.Consumer,null,function(e){return j.a.createElement(p,Object.assign({},t,{selecteds:e.selecteds,setSelecteds:e.setSelecteds}))})},T=n(28),K=n(92),w=function(e){function n(e){var t;return Object(a.a)(this,n),(t=Object(o.a)(this,Object(i.a)(n).call(this,e))).state={filter:""},t.hasData=!1,t.getCheckAll=t.getCheckAll.bind(Object(c.a)(Object(c.a)(t))),t.checkAll=t.checkAll.bind(Object(c.a)(Object(c.a)(t))),t.filterChange=t.filterChange.bind(Object(c.a)(Object(c.a)(t))),t}return Object(s.a)(n,e),Object(r.a)(n,[{key:"getCheckAll",value:function(){var e=this.props,t=e.selecteds,n=e.data;return 0!==t.length&&(t.length===n.length||"indeterminate")}},{key:"checkAll",value:function(e){var t=this.props,n=t.setSelecteds,a=t.index,r=t.data,o=t.keygen,i=t.disabled;n(a,e?"function"==typeof i?r.reduce(function(e,t,n){return i(t)||e.push(Object(y.b)(t,o,n)),e},[]):r.map(function(e,t){return Object(y.b)(e,o,t)}):[])}},{key:"filterChange",value:function(e){var t=this.props,n=t.onSearch,a=t.index;n&&n(e,!a),this.setState({filter:e})}},{key:"render",value:function(){var a=this,e=this.props,t=e.title,n=e.data,r=e.renderItem,o=e.selecteds,i=e.keygen,s=e.index,c=e.footer,l=e.listClassName,d=e.listStyle,u=e.onFilter,h=e.empty,f=e.disabled,m=e.loading,b=e.onSearch,p=this.getCheckAll(),g=!0===f;return this.hasData=!1,j.a.createElement(O.a,{className:Object(C.G)("card")},j.a.createElement(O.a.Header,{className:Object(C.G)("card-header")},j.a.createElement("div",null,j.a.createElement(x.a,{onChange:this.checkAll,checked:p,disabled:g},p?"".concat(o.length," ").concat(Object(T.a)("selected")):Object(T.a)("selectAll"))),j.a.createElement("div",{className:Object(C.G)("card-header-title")},t)),(u||b)&&j.a.createElement("div",{className:Object(C.G)("filter")},j.a.createElement(K.a,{disabled:g,onChange:this.filterChange,placeholder:Object(T.a)("search"),clearable:!0,size:"small",value:this.state.filter})),j.a.createElement(v.a,{loading:m},j.a.createElement(O.a.Body,{className:k()(Object(C.G)("card-body"),l),style:d},n.map(function(e,t){var n=Object(y.b)(e,i,t);return u&&!u(a.state.filter,e,!s)?null:(a.hasData=!0,j.a.createElement(I,{key:n,disabled:g||"function"==typeof f&&f(e),index:s,checkKey:n,liData:e,content:Object(E.b)(r)(e)}))}),!this.hasData&&j.a.createElement("div",{className:Object(C.G)("empty")},h||Object(T.a)("noData")))),c&&j.a.createElement(O.a.Footer,{className:Object(C.G)("card-footer")},c))}}]),n}(h.a);function g(e,t){if(!e)return null;var a=t.data,r=t.keygen,o=t.datum,i=[],s=[];return e.forEach(function(n){var e=a.find(function(e,t){return Object(y.b)(e,r,t)===n});e&&(o.check(e)?s.push(n):i.push(n))}),[i,s]}var R=function(e){function n(e){var t;return Object(a.a)(this,n),(t=Object(o.a)(this,Object(i.a)(n).call(this,e))).state={selecteds:e.selectedKeys?g(e.selectedKeys,e):g(e.defaultSelectedKeys,e)||[[],[]]},t.getSelected=t.getSelected.bind(Object(c.a)(Object(c.a)(t))),t.setSelecteds=t.setSelecteds.bind(Object(c.a)(Object(c.a)(t))),t.getLoading=t.getLoading.bind(Object(c.a)(Object(c.a)(t))),t}return Object(s.a)(n,e),Object(r.a)(n,[{key:"getLoading",value:function(e){var t=this.props.loading;return Array.isArray(t)?t[e]:t}},{key:"getSelected",value:function(){return"selectedKeys"in this.props?g(this.props.selectedKeys,this.props):this.state.selecteds}},{key:"setSelecteds",value:function(e,t){var n=this.props.onSelectChange,a=this.state.selecteds,r=e?[a[0],t]:[t,a[1]];n&&n(r[0],r[1]),this.setState({selecteds:r})}},{key:"render",value:function(){var e=this.props,t=e.titles,a=e.data,r=e.datum,n=e.keygen,o=e.renderItem,i=e.footers,s=e.operations,c=e.operationIcon,l=e.className,d=e.style,u=e.listClassName,h=e.listStyle,f=e.onFilter,m=e.onSearch,b=e.empty,p=e.disabled,g=e.itemClass,y=this.getSelected();"value"in this.props&&this.props.datum.getValue()!==this.props.value&&this.props.datum.setValue(this.props.value);var v=a.filter(function(e){return!r.check(e)}),O=r.getValue().reduce(function(e,t){var n=r.getDataByValue(a,t);return n&&e.push(n),e},[]);return j.a.createElement("div",{className:k()(Object(C.G)("_"),l),style:d},j.a.createElement(N.Provider,{value:{selecteds:y,setSelecteds:this.setSelecteds,itemClass:g}},j.a.createElement(w,{title:t[0],selecteds:y[0],data:v,keygen:n,renderItem:o,setSelecteds:this.setSelecteds,index:0,footer:i[0],listClassName:u,listStyle:h,loading:this.getLoading(0),onFilter:f,empty:b,disabled:p,onSearch:m}),j.a.createElement(S,{selecteds:y,datum:r,setSelecteds:this.setSelecteds,keygen:n,sources:v,targets:O,operations:s,operationIcon:c,data:a,disabled:p}),j.a.createElement(w,{title:t[1],selecteds:y[1],data:O,keygen:n,renderItem:o,loading:this.getLoading(1),setSelecteds:this.setSelecteds,index:1,footer:i[1],listClassName:u,listStyle:h,onFilter:f,empty:b,disabled:p,onSearch:m})))}}]),n}(h.b);R.defaultProps={titles:[],data:[],footers:[],operations:[],operationIcon:!0,renderItem:function(e){return e}};var F=R,G=n(49),A=n(67),D=Object(E.a)(G.a,A.a.hoc({bindProps:["disabled","limit","format","prediction","separator"]}))(F);D.displayName="ShineoutTransfer";t.a=D},495:function(e,t,n){"use strict";n.d(t,"a",function(){return s}),n.d(t,"b",function(){return c});var a=n(0),r=n.n(a),o=n(34),i=n.n(o)()(),s=i.Provider,c=function(n){return function(t){return r.a.createElement(i.Consumer,null,function(e){return r.a.createElement(n,Object.assign({},t,e))})}}},505:function(e,t,n){"use strict";var a=n(49),r=n(22),c=n(75),o=n(67),i=n(4),s=n(5),l=n(6),d=n(3),u=n(24),h=n(7),f=n(1),m=n(0),b=n.n(m),p=n(10),g=n.n(p),y=n(16),v=n(19),O=n(9),j=n(495),k=n(2),C=function(e){function n(e){var t;return Object(i.a)(this,n),(t=Object(l.a)(this,Object(d.a)(n).call(this,e))).handleClick=t.handleClick.bind(Object(f.a)(Object(f.a)(t))),t.handleUpdate=t.handleUpdate.bind(Object(f.a)(Object(f.a)(t))),t.handleRawChange=t.handleRawChange.bind(Object(f.a)(Object(f.a)(t))),t}return Object(h.a)(n,e),Object(s.a)(n,[{key:"componentDidMount",value:function(){Object(u.a)(Object(d.a)(n.prototype),"componentDidMount",this).call(this),this.props.datum.subscribe(O.a,this.handleUpdate)}},{key:"componentWillUnmount",value:function(){Object(u.a)(Object(d.a)(n.prototype),"componentWillUnmount",this).call(this),this.props.datum.unsubscribe(O.a,this.handleUpdate)}},{key:"getContent",value:function(e){var t=this.props.renderItem;return"string"==typeof t?e[t]:"function"==typeof t?t(e):""}},{key:"handleUpdate",value:function(){this.forceUpdate()}},{key:"handleClick",value:function(e,t,n){var a=this.props,r=a.data,o=a.datum;t?o.add(r[n]):o.remove(r[n])}},{key:"handleRawChange",value:function(e,t){var n=this.props.datum;t?n.add(e):n.remove(e)}},{key:"render",value:function(){var n=this,e=this.props,t=e.block,a=e.data,r=e.datum,o=e.keygen,i=e.children,s=g()(Object(k.h)("group",t&&"block"),this.props.className);return void 0===a?b.a.createElement("div",{className:s},b.a.createElement(j.a,{value:{onRawChange:this.handleRawChange,checked:r.check.bind(r)}},i)):b.a.createElement("div",{className:s},a.map(function(e,t){return b.a.createElement(c.a,{checked:r.check(e),disabled:r.disabled(e),key:Object(v.b)(e,o,t),htmlValue:t,index:t,onChange:n.handleClick},n.getContent(e))}),i)}}]),n}(y.b);C.defaultProps={renderItem:function(e){return e}};var S=C,x=Object(r.a)(a.a,j.b)(c.a);x.Group=Object(r.a)(a.a,o.a.hoc({bindProps:["disabled","format","prediction","separator"]}))(S),x.Checkbox=c.a,x.displayName="ShineoutCheckbox",x.Group.displayName="ShineoutCheckboxGroup";t.a=x}}]);