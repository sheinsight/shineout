(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[26],{2057:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),a=n(563),s=n(564),c=n(40),o=n(2058),l=n.n(o),d=n(2059),u=n.n(d),f=Object(c.b)(l.a,u.a),h=[{name:"01-base",isTs:!0,isTest:!1,title:Object(c.b)("任意等分 \n Grid 的栅格体系是动态生成，可以实现任意等份","Arbitrary \n Grid system is dynamic generated and can be any number."),component:n(2060).default,rawText:n(2061),parseTsText:n(2062)},{name:"02-offset",isTs:!0,isTest:!1,title:Object(c.b)("偏移 \n offset 属性可以设置偏移，取值方式和宽度相同","Offset \n The offset property set the offset in the same way as the width."),component:n(2063).default,rawText:n(2064),parseTsText:n(2065)},{name:"03-nested",isTs:!0,isTest:!1,title:Object(c.b)("嵌套 \n 嵌套的栅格","Nested \n Nested grids"),component:n(2066).default,rawText:n(2067),parseTsText:n(2068)},{name:"04-gutter",isTs:!0,isTest:!1,title:Object(c.b)("间距 \n 通过 gutter 属性设置栅格间距","Gutter \n Set grid spacing through the gutter property."),component:n(2069).default,rawText:n(2070),parseTsText:n(2071)}];t.default=Object(a.a)(function(e){return i.a.createElement(s.b,Object.assign({},e,{codes:void 0,source:f,examples:h}))})},2058:function(e,t){e.exports="# Grid *栅格*\n\n动态栅格体系，用于某些不适合使用 flex 的地方\n\n<example />\n\n## API\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| className | string | 无 | 扩展className |\n| gutter | number | 无 | 栅格之间间距 |\n| offset | number | 0 | 左偏移百分比，0 <= offset < 1 |\n| style | object | 无 | 最外层扩展样式 |\n| width | number | 1 | 宽度百分比，0 < number <= 1 |\n| responsive | 'sm' \\| 'md' \\| 'lg' \\| 'xl' | 'md' | 激活响应式的最小尺寸： <br /> sm: 568px  <br />md: 768px  <br />lg: 992px  <br />xl: 1200px <br /> 例如：设置为 sm 时，屏幕尺寸若低于568px，栅格系统的响应性将不会生效。|\n| stretch | boolean | 无 | 是否撑满容器高度 |\n"},2059:function(e,t){e.exports="# Grid\n\n<example />\n\n# API\n\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| className | string | none | Extend className |\n| gutter | number | none | Spacing between grids |\n| offset | number | 0 | Left offset percentage, 0 <= offset < 1 |\n| style | object | - | Container element style |\n| width | number | 1 | Percentage of width, 0 < number <= 1 |\n| responsive | 'sm' \\| 'md' \\| 'lg' \\| 'xl' | 'md' | The min size of responsive: <br /> sm: 568px  <br />md: 768px  <br />lg: 992px  <br />xl: 1200px|\n| stretch | boolean | - | Stretch full height of content |"},2060:function(e,t,n){"use strict";n.r(t);var i=n(24),a=n(0),s=n.n(a),c=n(310),o=n(315),l={color:"#fff",paddingLeft:8,background:"#3399ff"},d={background:"#f2f2f2",marginBottom:4,lineHeight:"30px"};t.default=function(){var e=Object(a.useState)(5),t=Object(i.a)(e,2),n=t[0],r=t[1];return s.a.createElement("div",null,s.a.createElement(c.a,{step:0,value:n,formatValue:!1,onChange:function(e){r(e)},scale:[1,2,3,5,8,13,21,34,55]}),s.a.createElement("div",{style:{height:20}}),Array.from({length:n}).map(function(e,t){return s.a.createElement("div",{key:t,style:d},s.a.createElement(o.a,{width:(t+1)/n,style:l},"".concat(t+1,"/").concat(n)))}))}},2061:function(e,t){e.exports="/**\n * cn - 任意等分\n *    -- Grid 的栅格体系是动态生成，可以实现任意等份\n * en - Arbitrary\n *    -- Grid system is dynamic generated and can be any number.\n */\nimport React, { useState } from 'react'\nimport { Grid, Slider, TYPE } from 'shineout'\n\ntype SliderProps = TYPE.Slider.Props<number>\ntype SliderOnChange = SliderProps['onChange']\n\nconst gridStyle: React.CSSProperties = { color: '#fff', paddingLeft: 8, background: '#3399ff' }\nconst style: React.CSSProperties = { background: '#f2f2f2', marginBottom: 4, lineHeight: '30px' }\n\nconst App: React.FC = () => {\n  const [count, setCount] = useState(5)\n\n  const handleCountChange: SliderOnChange = v => {\n    setCount(v)\n  }\n  return (\n    <div>\n      <Slider\n        step={0}\n        value={count}\n        formatValue={false}\n        onChange={handleCountChange}\n        scale={[1, 2, 3, 5, 8, 13, 21, 34, 55]}\n      />\n\n      <div style={{ height: 20 }} />\n\n      {Array.from({ length: count }).map((_n, i) => (\n        <div key={i} style={style}>\n          <Grid width={(i + 1) / count} style={gridStyle}>\n            {`${i + 1}/${count}`}\n          </Grid>\n        </div>\n      ))}\n    </div>\n  )\n}\n\nexport default App\n"},2062:function(e,t){e.exports="/**\n * cn - 任意等分\n *    -- Grid 的栅格体系是动态生成，可以实现任意等份\n * en - Arbitrary\n *    -- Grid system is dynamic generated and can be any number.\n */\nimport React, { useState } from 'react';\nimport { Grid, Slider } from 'shineout';\nconst gridStyle = { color: '#fff', paddingLeft: 8, background: '#3399ff' };\nconst style = { background: '#f2f2f2', marginBottom: 4, lineHeight: '30px' };\nconst App = () => {\n    const [count, setCount] = useState(5);\n    const handleCountChange = v => {\n        setCount(v);\n    };\n    return (<div>\n      <Slider step={0} value={count} formatValue={false} onChange={handleCountChange} scale={[1, 2, 3, 5, 8, 13, 21, 34, 55]}/>\n\n      <div style={{ height: 20 }}/>\n\n      {Array.from({ length: count }).map((_n, i) => (<div key={i} style={style}>\n          <Grid width={(i + 1) / count} style={gridStyle}>\n            {`${i + 1}/${count}`}\n          </Grid>\n        </div>))}\n    </div>);\n};\nexport default App;\n"},2063:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),a=n(315),s={background:"#f2f2f2"},c={color:"#fff",lineHeight:"60px",textAlign:"center",background:"#3399ff"};t.default=function(){return i.a.createElement("div",{style:s},i.a.createElement(a.a,{width:1/3,offset:1/3,style:c},"With 1/3, Offset 1/3"))}},2064:function(e,t){e.exports="/**\n * cn - 偏移\n *    -- offset 属性可以设置偏移，取值方式和宽度相同\n * en - Offset\n *    -- The offset property set the offset in the same way as the width.\n */\nimport React from 'react'\nimport { Grid } from 'shineout'\n\nconst style: React.CSSProperties = {\n  background: '#f2f2f2',\n}\nconst gridStyle: React.CSSProperties = {\n  color: '#fff',\n  lineHeight: '60px',\n  textAlign: 'center',\n  background: '#3399ff',\n}\n\nconst App: React.FC = () => (\n  <div style={style}>\n    <Grid width={1 / 3} offset={1 / 3} style={gridStyle}>\n      With 1/3, Offset 1/3\n    </Grid>\n  </div>\n)\n\nexport default App\n"},2065:function(e,t){e.exports="/**\n * cn - 偏移\n *    -- offset 属性可以设置偏移，取值方式和宽度相同\n * en - Offset\n *    -- The offset property set the offset in the same way as the width.\n */\nimport React from 'react';\nimport { Grid } from 'shineout';\nconst style = {\n    background: '#f2f2f2',\n};\nconst gridStyle = {\n    color: '#fff',\n    lineHeight: '60px',\n    textAlign: 'center',\n    background: '#3399ff',\n};\nconst App = () => (<div style={style}>\n    <Grid width={1 / 3} offset={1 / 3} style={gridStyle}>\n      With 1/3, Offset 1/3\n    </Grid>\n  </div>);\nexport default App;\n"},2066:function(e,t,n){"use strict";n.r(t);var r=n(12),i=n(0),a=n.n(i),s=n(315),c={color:"#fff",lineHeight:"30px",textAlign:"center",background:"#3399ff"};t.default=function(){return a.a.createElement(s.a,{style:{textAlign:"center"}},a.a.createElement(s.a,{width:.5,style:c},"1/2"),a.a.createElement(s.a,{width:.5,style:{lineHeight:"30px"}},a.a.createElement("div",null,"1/2"),a.a.createElement("div",null,a.a.createElement(s.a,{style:c,width:1/3},"1/3"),a.a.createElement(s.a,{style:Object(r.a)(Object(r.a)({},c),{},{background:"#f5f5f5",color:"#333"}),width:1/3},"1/3"),a.a.createElement(s.a,{style:c,width:1/3},"1/3"))))}},2067:function(e,t){e.exports="/**\n * cn - 嵌套\n *    -- 嵌套的栅格\n * en - Nested\n *    -- Nested grids\n */\nimport React from 'react'\nimport { Grid } from 'shineout'\n\nconst style: React.CSSProperties = {\n  color: '#fff',\n  lineHeight: '30px',\n  textAlign: 'center',\n  background: '#3399ff',\n}\n\nconst App: React.FC = () => (\n  <Grid style={{ textAlign: 'center' }}>\n    <Grid width={1 / 2} style={style}>\n      1/2\n    </Grid>\n\n    <Grid width={1 / 2} style={{ lineHeight: '30px' }}>\n      <div>1/2</div>\n      <div>\n        <Grid style={style} width={1 / 3}>\n          1/3\n        </Grid>\n        <Grid style={{ ...style, background: '#f5f5f5', color: '#333' }} width={1 / 3}>\n          1/3\n        </Grid>\n        <Grid style={style} width={1 / 3}>\n          1/3\n        </Grid>\n      </div>\n    </Grid>\n  </Grid>\n)\n\nexport default App\n"},2068:function(e,t){e.exports="/**\n * cn - 嵌套\n *    -- 嵌套的栅格\n * en - Nested\n *    -- Nested grids\n */\nimport React from 'react';\nimport { Grid } from 'shineout';\nconst style = {\n    color: '#fff',\n    lineHeight: '30px',\n    textAlign: 'center',\n    background: '#3399ff',\n};\nconst App = () => (<Grid style={{ textAlign: 'center' }}>\n    <Grid width={1 / 2} style={style}>\n      1/2\n    </Grid>\n\n    <Grid width={1 / 2} style={{ lineHeight: '30px' }}>\n      <div>1/2</div>\n      <div>\n        <Grid style={style} width={1 / 3}>\n          1/3\n        </Grid>\n        <Grid style={Object.assign(Object.assign({}, style), { background: '#f5f5f5', color: '#333' })} width={1 / 3}>\n          1/3\n        </Grid>\n        <Grid style={style} width={1 / 3}>\n          1/3\n        </Grid>\n      </div>\n    </Grid>\n  </Grid>);\nexport default App;\n"},2069:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),a=n(315),s={background:"#f2f2f2"},c={color:"#fff",lineHeight:"30px",textAlign:"center",background:"#3399ff"};t.default=function(){return i.a.createElement("div",{style:s},i.a.createElement(a.a,{gutter:8},Array.from({length:8}).map(function(e,t){return t+1}).map(function(e){return i.a.createElement(a.a,{key:e,width:1/8},i.a.createElement("div",{style:c},"1/8"))})))}},2070:function(e,t){e.exports="/**\n * cn - 间距\n *    -- 通过 gutter 属性设置栅格间距\n * en - Gutter\n *    -- Set grid spacing through the gutter property.\n */\nimport React from 'react'\nimport { Grid } from 'shineout'\n\nconst style: React.CSSProperties = {\n  background: '#f2f2f2',\n}\nconst gridStyle: React.CSSProperties = {\n  color: '#fff',\n  lineHeight: '30px',\n  textAlign: 'center',\n  background: '#3399ff',\n}\n\nconst App: React.FC = () => (\n  <div style={style}>\n    <Grid gutter={8}>\n      {Array.from({ length: 8 })\n        .map((_, i) => i + 1)\n        .map(i => (\n          <Grid key={i} width={1 / 8}>\n            <div style={gridStyle}>1/8</div>\n          </Grid>\n        ))}\n    </Grid>\n  </div>\n)\n\nexport default App\n"},2071:function(e,t){e.exports="/**\n * cn - 间距\n *    -- 通过 gutter 属性设置栅格间距\n * en - Gutter\n *    -- Set grid spacing through the gutter property.\n */\nimport React from 'react';\nimport { Grid } from 'shineout';\nconst style = {\n    background: '#f2f2f2',\n};\nconst gridStyle = {\n    color: '#fff',\n    lineHeight: '30px',\n    textAlign: 'center',\n    background: '#3399ff',\n};\nconst App = () => (<div style={style}>\n    <Grid gutter={8}>\n      {Array.from({ length: 8 })\n        .map((_, i) => i + 1)\n        .map(i => (<Grid key={i} width={1 / 8}>\n            <div style={gridStyle}>1/8</div>\n          </Grid>))}\n    </Grid>\n  </div>);\nexport default App;\n"},310:function(e,t,n){"use strict";var r=n(60),l=n(15),d=n(27),i=n(4),a=n(5),s=n(1),c=n(6),o=n(7),u=n(2),f=n(0),h=n.n(f),p=n(14),g=n.n(p),m=n(9),y=n(156),v=n(28),b=n(17),O=n(21);function j(r){return function(){var e,t=Object(u.a)(r);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var n=Object(u.a)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Object(o.a)(this,e)}}function x(r){return function(){var e,t=Object(u.a)(r);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var n=Object(u.a)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Object(o.a)(this,e)}}var E=Object(O.curry)(function(t){var e=function(e){Object(c.a)(r,e);var n=j(r);function r(e){var t;return Object(i.a)(this,r),(t=n.call(this,e)).handleDragStart=t.handleDragStart.bind(Object(s.a)(t)),t.handleDrag=t.handleDrag.bind(Object(s.a)(t)),t.handleDragEnd=t.handleDragEnd.bind(Object(s.a)(t)),t}return Object(a.a)(r,[{key:"componentDidMount",value:function(){var e=this.props.client;e&&(this.clientX=e.x,this.clientY=e.y,this.dragging=!0,this.addEvents(),this.props.onDragStart(!0))}},{key:"componentWillUnmount",value:function(){this.removeEvents()}},{key:"addEvents",value:function(){document.addEventListener("mousemove",this.handleDrag),document.addEventListener("mouseup",this.handleDragEnd),document.addEventListener("mouseleave",this.handleDragEnd)}},{key:"removeEvents",value:function(){document.removeEventListener("mousemove",this.handleDrag),document.removeEventListener("mouseup",this.handleDragEnd),document.removeEventListener("mouseleave",this.handleDragEnd)}},{key:"handleDragStart",value:function(e){0===e.button&&(this.clientX=e.clientX,this.clientY=e.clientY,this.dragging=!0,this.addEvents(),this.props.onDragStart(!0))}},{key:"handleDrag",value:function(e){if(this.dragging&&(0!==e.clientX||0!==e.clientY)){var t=e.clientX-this.clientX,n=e.clientY-this.clientY;0===t&&0===n||(this.clientX=e.clientX,this.clientY=e.clientY,this.props.onDrag(t,n,e.clientX,e.clientY))}}},{key:"handleDragEnd",value:function(){this.dragging&&(this.dragging=!1,this.removeEvents(),this.props.onDragEnd(!1))}},{key:"render",value:function(){return h.a.createElement(t,Object.assign({},this.props,{onDragStart:this.handleDragStart}))}}]),r}(f.PureComponent);return e.defaultProps={client:void 0,onDragStart:function(){},onDrag:function(){},onDragEnd:function(){}},e})(function(e){Object(c.a)(n,e);var t=x(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){var e=this.props.disabled?void 0:this.props.onDragStart;return h.a.createElement("div",{onMouseDown:e,className:Object(y.a)("indicator")})}}]),n}(f.PureComponent)),S=n(70);function k(n,e){var t=e.length-1,r=0;if(e.forEach(function(e,t){e<n&&(r=t)}),t<=r)return 1;var i=e[r],a=e[r+1];return(r+(n-i)/(a-i))/t}function G(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:1,r=t.length-1;if(0===n)return t[Math.round(e*r)];if(1<=e)return t[r];var i=Math.floor(e*r),a=t[i],s=(t[i+1]-a)/n,c=(e-i/r)*r;return Object(S.toPrecision)(a+Math.round(c*s)*n)}function w(r){return function(){var e,t=Object(u.a)(r);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var n=Object(u.a)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Object(o.a)(this,e)}}var C=function(e){Object(c.a)(r,e);var n=w(r);function r(e){var t;return Object(i.a)(this,r),(t=n.call(this,e)).state={dragging:!1,length:k(e.value,e.scale)},t.bindElement=t.bindElement.bind(Object(s.a)(t)),t.handleDrag=t.handleDrag.bind(Object(s.a)(t)),t.handleDragEnd=t.handleDragEnd.bind(Object(s.a)(t)),t}return Object(a.a)(r,[{key:"componentDidUpdate",value:function(e){var t=this.props,n=t.value,r=t.scale,i=this.state.dragging,a=r.length;(e.value!==n||!i&&e.scale[a-1]!==r[a-1])&&this.setState({length:k(n,r)})}},{key:"bindElement",value:function(e){e&&(this.parentElement=e.parentElement)}},{key:"length2value",value:function(e){var t=this.props;return G(e,t.scale,t.step)}},{key:"handleDrag",value:function(e,t){var n=this.props,r=n.scale,i=n.onDrag,a=n.value,s=n.vertical,c=n.onIncrease,o=s?t/this.parentElement.clientHeight:e/this.parentElement.clientWidth*(Object(m.b)()?-1:1),l=this.state.length,d=this.props.min?k(this.props.min,r):0,u=this.props.max?k(this.props.max,r):1,f=l+(s?-o:o),h=1<f;if(f<d&&(f=d),u<f&&(f=u),h&&c&&c(),this.setState({length:f,dragging:!0}),i){var p=this.length2value(f);p!==a&&i(p)}}},{key:"handleDragEnd",value:function(){var e=this.state.length,t=this.props.scale,n=this.length2value(e);this.setState({length:k(n,t),dragging:!1}),this.props.onChange(this.props.index,n)}},{key:"renderResult",value:function(){var e=this.props,t=e.autoHide,n=e.formatValue;if(!n)return null;var r=this.state.dragging,i=Object(y.a)("result",(!t||r)&&"show"),a=n(this.length2value(this.state.length));return h.a.createElement("div",{className:i},a)}},{key:"render",value:function(){var e=this.props,t=e.index,n=e.disabled,r=e.vertical,i=this.state.length;1===t&&(i=1-i);var a=Object(v.a)({},r?"height":"width","".concat(100*i,"%")),s=Object(y.a)("bar",r&&(1===t?"top":"bottom"),!r&&1===t&&"right");return h.a.createElement("div",{ref:this.bindElement,style:a,className:s},this.renderResult(),h.a.createElement("div",{className:Object(y.a)("bar-bg")}),h.a.createElement(E,{disabled:n,onDrag:this.handleDrag,onDragEnd:this.handleDragEnd}))}}]),r}(b.b);C.defaultProps={formatValue:function(e){return e}};var D=C,R=n(69),A=n(8);function P(r){return function(){var e,t=Object(u.a)(r);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var n=Object(u.a)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Object(o.a)(this,e)}}var T=function(e){Object(c.a)(r,e);var n=P(r);function r(e){var t;return Object(i.a)(this,r),(t=n.call(this,e)).state={},t.bindElement=t.bindElement.bind(Object(s.a)(t)),t.handleClick=t.handleClick.bind(Object(s.a)(t)),t.handleChange=t.handleChange.bind(Object(s.a)(t)),t}return Object(a.a)(r,[{key:"getValue",value:function(){var e=this.props,t=e.range,n=e.value,r=e.scale[0];if(!t)return n||r;var i=n;return t&&!Array.isArray(n)&&(i=[r,r]),i[0]>i[1]&&(i=[i[1],i[0]]),i}},{key:"bindElement",value:function(e){this.innerElement=e}},{key:"handleClick",value:function(e){if(!(0<=e.target.className.indexOf(Object(y.a)("indicator"))||this.props.disabled)){var t=this.props,n=t.scale,r=t.step,i=t.vertical,a=t.range,s=this.innerElement.getBoundingClientRect(),c=i?1-(e.clientY-s.top)/s.height:(e.clientX-s.left)/s.width;Object(m.b)()&&!i&&(c=1-c);var o=G(c,n,r);if(a){var l=Object(d.a)(this.getValue());o<l[0]?l[0]=o:l[1]=o,this.props.onChange(l)}else this.props.onChange(o)}}},{key:"handleChange",value:function(e,t){if(this.props.range){var n=Object(d.a)(this.getValue());n[e]=t,this.props.onChange(n)}else this.props.onChange(t)}},{key:"renderScale",value:function(){var e=this.props,t=e.autoHide,n=e.formatScale,r=e.scale;return n?h.a.createElement("div",{className:Object(y.a)(Object(A.b)("scale"),!t&&"show")},r.map(function(e,t){return h.a.createElement("div",{key:e},h.a.createElement("span",null,n(e,t)))})):null}},{key:"render",value:function(){var e=this.props,t=e.range,n=e.height,r=e.style,i=e.vertical,a=Object(l.a)(e,["range","height","style","vertical"]),s=g()(Object(y.a)("_",i&&"vertical",this.props.disabled&&"disabled",Object(m.b)()&&"rtl"),this.props.className),c=this.getValue();Array.isArray(c)||(c=[0,c]);var o=r;return i&&(o=Object.assign({height:n},r)),h.a.createElement("div",Object.assign({style:o,className:s},Object(R.a)(a)),h.a.createElement("div",{className:Object(y.a)("background")}),h.a.createElement("div",{ref:this.bindElement,onClick:this.handleClick,className:Object(y.a)("inner")},t&&h.a.createElement(D,Object.assign({},a,{index:0,max:c[1],onChange:this.handleChange,value:c[0],vertical:i})),h.a.createElement(D,Object.assign({},a,{index:1,min:c[0],onChange:this.handleChange,value:c[1],vertical:i}))),this.renderScale())}}]),r}(f.PureComponent);T.defaultProps={height:200,scale:[0,100],step:1,vertical:!1,formatScale:function(e){return e}};var N=T,H=Object(r.a)(N);H.displayName="ShineoutSlider";t.a=H},315:function(e,t,n){"use strict";n.d(t,"a",function(){return d});var p=n(12),g=n(15),r=n(4),i=n(5),a=n(6),s=n(7),c=n(2),m=n(0),y=n.n(m),o=n(14),v=n.n(o),b=n(251);function l(r){return function(){var e,t=Object(c.a)(r);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var n=Object(c.a)(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Object(s.a)(this,e)}}var d=function(e){Object(a.a)(n,e);var t=l(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e=this.props,t=e.width,n=void 0===t?1:t,r=e.offset,i=e.responsive,a=e.stretch,s=e.children,c=e.gutter,o=Object(g.a)(e,["width","offset","responsive","stretch","children","gutter"]),l=0,d=0;m.Children.toArray(s).forEach(function(e){e.type&&e.type.isGrid&&(e.props.width?d+=e.props.width:l+=1)});var u=0<l?(1-d)/l:0,f=v()(this.props.className,Object(b.a)({width:n,offset:r,responsive:i})),h=Object.assign({},this.props.style);return c&&0<c&&(h.width="auto",h.display="block",h.marginLeft="".concat(0-c/2,"px"),h.marginRight="".concat(0-c/2,"px")),y.a.createElement("div",Object.assign({},o,{style:h,className:f}),m.Children.toArray(s).map(function(e){if(e.type&&e.type.isGrid){var t={style:Object.assign({},e.props.style)};return e.props.width||(t.width=u),a&&(t.style=Object(p.a)(Object(p.a)({},t.style),{},{minHeight:"100%",height:"100%"})),c&&0<c&&(t.style=Object(p.a)(Object(p.a)({},t.style),{},{paddingLeft:c/2,paddingRight:c/2})),Object(m.cloneElement)(e,t)}return e}))}}]),n}(m.PureComponent);d.isGrid=!0,d.displayName="ShineoutGrid"}}]);