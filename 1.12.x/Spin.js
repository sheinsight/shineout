(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[43],{1911:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(563),r=t(564),c=t(40),s=t(1912),p=t.n(s),l=t(1913),m=t.n(l),d=Object(c.b)(p.a,m.a),u=[{name:"01-01-default",isTs:!0,isTest:!1,title:Object(c.b)('default \n name="default"','default \n name="default"'),component:t(1914).default,rawText:t(1915),parseTsText:t(1916)},{name:"01-02-tip",isTs:!0,isTest:!1,title:Object(c.b)("tip \n 自定义提示文案","tip \n custom tip"),component:t(1917).default,rawText:t(1918),parseTsText:t(1919)},{name:"01-wrapper",isTs:!0,isTest:!1,title:Object(c.b)("包裹容器 \n 直接把内容内嵌到 Spin 中，将现有容器变为加载状态。","Container \n children in Spin"),component:t(1920).default,rawText:t(1921),parseTsText:t(1922)},{name:"02-chasing-dots",isTs:!0,isTest:!1,title:Object(c.b)('chasing-dots \n name="chasing-dots"','chasing-dots \n name="chasing-dots"'),component:t(1923).default,rawText:t(1924),parseTsText:t(1925)},{name:"03-cube-grid",isTs:!0,isTest:!1,title:Object(c.b)('cube-grid \n name="cube-grid"','cube-grid \n name="cube-grid"'),component:t(1926).default,rawText:t(1927),parseTsText:t(1928)},{name:"04-double-bounce",isTs:!0,isTest:!1,title:Object(c.b)('double-bounce \n name="double-bounce"','double-bounce \n name="double-bounce"'),component:t(1929).default,rawText:t(1930),parseTsText:t(1931)},{name:"05-fading-circle",isTs:!0,isTest:!1,title:Object(c.b)('fading-circle \n name="fading-circle"','fading-circle \n name="fading-circle"'),component:t(1932).default,rawText:t(1933),parseTsText:t(1934)},{name:"06-four-dots",isTs:!0,isTest:!1,title:Object(c.b)('four-dots \n name="four-dots"','four-dots \n name="four-dots"'),component:t(1935).default,rawText:t(1936),parseTsText:t(1937)},{name:"07-plane",isTs:!0,isTest:!1,title:Object(c.b)('plane \n name="plane"','plane \n name="plane"'),component:t(1938).default,rawText:t(1939),parseTsText:t(1940)},{name:"08-pulse",isTs:!0,isTest:!1,title:Object(c.b)('pulse \n name="pulse"','pulse \n name="pulse"'),component:t(1941).default,rawText:t(1942),parseTsText:t(1943)},{name:"09-ring",isTs:!0,isTest:!1,title:Object(c.b)('ring \n name="ring"','ring \n name="ring"'),component:t(1944).default,rawText:t(1945),parseTsText:t(1946)},{name:"10-scale-circle",isTs:!0,isTest:!1,title:Object(c.b)('scale-circle \n name="scale-circle"','scale-circle \n name="scale-circle"'),component:t(1947).default,rawText:t(1948),parseTsText:t(1949)},{name:"11-three-bounce",isTs:!0,isTest:!1,title:Object(c.b)('three-bounce \n name="three-bounce"','three-bounce \n name="three-bounce"'),component:t(1950).default,rawText:t(1951),parseTsText:t(1952)},{name:"12-wave",isTs:!0,isTest:!1,title:Object(c.b)('wave \n name="wave"','wave \n name="wave"'),component:t(1953).default,rawText:t(1954),parseTsText:t(1955)},{name:"13-chasing-ring",isTs:!0,isTest:!1,title:Object(c.b)('chasing-ring \n name="chasing-ring"','chasing-ring \n name="chasing-ring"'),component:t(1956).default,rawText:t(1957),parseTsText:t(1958)}];e.default=Object(o.a)(function(n){return a.a.createElement(r.b,Object.assign({},n,{codes:void 0,source:d,examples:u}))})},1912:function(n,e){n.exports="# Spin *加载中*\n\n部分样式来源于[SpinKit](https://github.com/tobiasahlin/SpinKit)\n\n<example />\n\n## API\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| color | string | #6c757d | 颜色 |\n| size | number \\| string | 40 | 尺寸 |\n| tip | string  \\| ReactNode | 无 | 提示文案  |\n| name | string | 'fading-circle' | 类型，可选值见示例 |\n"},1913:function(n,e){n.exports="# Spin\n\nPart of the style comes from [SpinKit](https://github.com/tobiasahlin/SpinKit).\n\n<example />\n\n## API\n\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| color | string | #6c757d | color |\n| size | number \\| string | 40 | size |\n| tip | string  \\| ReactNode | - | custom tip |\n| name | string | 'fading-circle' | type. See the example for optional values. |\n"},1914:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(51);e.default=function(){return a.a.createElement("div",{style:{display:"flex"}},a.a.createElement(o.a,{size:18,color:"green"}),a.a.createElement(o.a,null),a.a.createElement(o.a,{size:"54px",color:"#dc3545"}))}},1915:function(n,e){n.exports='/**\n* cn - default\n     -- name="default"\n* en - default\n     -- name="default"\n*/\nimport React from \'react\'\nimport { Spin } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div style={{ display: \'flex\' }}>\n    <Spin size={18} color="green" />\n    <Spin />\n    <Spin size="54px" color="#dc3545" />\n  </div>\n)\n\nexport default App\n'},1916:function(n,e){n.exports='/**\n* cn - default\n     -- name="default"\n* en - default\n     -- name="default"\n*/\nimport React from \'react\';\nimport { Spin } from \'shineout\';\nconst App = () => (<div style={{ display: \'flex\' }}>\n    <Spin size={18} color="green"/>\n    <Spin />\n    <Spin size="54px" color="#dc3545"/>\n  </div>);\nexport default App;\n'},1917:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(51);e.default=function(){return a.a.createElement("div",{style:{display:"flex"}},a.a.createElement(o.a,{size:18,color:"green",tip:"Loading..."}),a.a.createElement(o.a,{size:"54px",color:"#dc3545",tip:a.a.createElement("span",{style:{fontSize:20}},"Loading...")}))}},1918:function(n,e){n.exports='/**\n* cn - tip\n     -- 自定义提示文案\n* en - tip\n     -- custom tip\n*/\nimport React from \'react\'\nimport { Spin } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div style={{ display: \'flex\' }}>\n    <Spin size={18} color="green" tip="Loading..." />\n    <Spin size="54px" color="#dc3545" tip={<span style={{ fontSize: 20 }}>Loading...</span>} />\n  </div>\n)\n\nexport default App\n'},1919:function(n,e){n.exports='/**\n* cn - tip\n     -- 自定义提示文案\n* en - tip\n     -- custom tip\n*/\nimport React from \'react\';\nimport { Spin } from \'shineout\';\nconst App = () => (<div style={{ display: \'flex\' }}>\n    <Spin size={18} color="green" tip="Loading..."/>\n    <Spin size="54px" color="#dc3545" tip={<span style={{ fontSize: 20 }}>Loading...</span>}/>\n  </div>);\nexport default App;\n'},1920:function(n,e,t){"use strict";t.r(e);var a=t(24),o=t(0),r=t.n(o),c=t(313),s=t(51),p=t(123);e.default=function(){var n=Object(o.useState)(!1),e=Object(a.a)(n,2),t=e[0],i=e[1];return r.a.createElement("div",null,r.a.createElement(c.a,{value:t,onChange:function(n){return i(n)},style:{marginBottom:20}}),r.a.createElement(s.a,{loading:t,size:20},r.a.createElement(p.a,{style:{marginBottom:0}},r.a.createElement("h3",null,"This is Title"),"Some Content Here...")))}},1921:function(n,e){n.exports="/**\n* cn - 包裹容器\n     -- 直接把内容内嵌到 Spin 中，将现有容器变为加载状态。\n* en - Container\n     -- children in Spin\n*/\nimport React, { useState } from 'react'\nimport { Spin, Alert, Switch, TYPE } from 'shineout'\n\ntype SpinProps = TYPE.Spin.Props\ntype SpinLoading = SpinProps['loading']\n\ntype SwitchProps = TYPE.Switch.Props\ntype SwitchOnChange = SwitchProps['onChange']\n\nconst App: React.FC = () => {\n  const [loading, setLoading] = useState<SpinLoading>(false)\n\n  const handleChange: SwitchOnChange = v => setLoading(v)\n\n  return (\n    <div>\n      <Switch value={loading} onChange={handleChange} style={{ marginBottom: 20 }} />\n      <Spin loading={loading} size={20}>\n        <Alert style={{ marginBottom: 0 }}>\n          <h3>This is Title</h3>\n          Some Content Here...\n        </Alert>\n      </Spin>\n    </div>\n  )\n}\n\nexport default App\n"},1922:function(n,e){n.exports="/**\n* cn - 包裹容器\n     -- 直接把内容内嵌到 Spin 中，将现有容器变为加载状态。\n* en - Container\n     -- children in Spin\n*/\nimport React, { useState } from 'react';\nimport { Spin, Alert, Switch } from 'shineout';\nconst App = () => {\n    const [loading, setLoading] = useState(false);\n    const handleChange = v => setLoading(v);\n    return (<div>\n      <Switch value={loading} onChange={handleChange} style={{ marginBottom: 20 }}/>\n      <Spin loading={loading} size={20}>\n        <Alert style={{ marginBottom: 0 }}>\n          <h3>This is Title</h3>\n          Some Content Here...\n        </Alert>\n      </Spin>\n    </div>);\n};\nexport default App;\n"},1923:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(51);e.default=function(){return a.a.createElement("div",{style:{display:"flex"}},a.a.createElement(o.a,{size:18,name:"chasing-dots",color:"green"}),a.a.createElement(o.a,{name:"chasing-dots"}),a.a.createElement(o.a,{size:"54px",name:"chasing-dots",color:"#dc3545"}))}},1924:function(n,e){n.exports='/**\n* cn - chasing-dots\n     -- name="chasing-dots"\n* en - chasing-dots\n     -- name="chasing-dots"\n*/\nimport React from \'react\'\nimport { Spin } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div style={{ display: \'flex\' }}>\n    <Spin size={18} name="chasing-dots" color="green" />\n\n    <Spin name="chasing-dots" />\n\n    <Spin size="54px" name="chasing-dots" color="#dc3545" />\n  </div>\n)\n\nexport default App\n'},1925:function(n,e){n.exports='/**\n* cn - chasing-dots\n     -- name="chasing-dots"\n* en - chasing-dots\n     -- name="chasing-dots"\n*/\nimport React from \'react\';\nimport { Spin } from \'shineout\';\nconst App = () => (<div style={{ display: \'flex\' }}>\n    <Spin size={18} name="chasing-dots" color="green"/>\n\n    <Spin name="chasing-dots"/>\n\n    <Spin size="54px" name="chasing-dots" color="#dc3545"/>\n  </div>);\nexport default App;\n'},1926:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(51);e.default=function(){return a.a.createElement("div",{style:{display:"flex"}},a.a.createElement(o.a,{size:18,name:"cube-grid",color:"green"}),a.a.createElement(o.a,{name:"cube-grid"}),a.a.createElement(o.a,{size:"54px",name:"cube-grid",color:"#dc3545"}))}},1927:function(n,e){n.exports='/**\n* cn - cube-grid\n     -- name="cube-grid"\n* en - cube-grid\n     -- name="cube-grid"\n*/\nimport React from \'react\'\nimport { Spin } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div style={{ display: \'flex\' }}>\n    <Spin size={18} name="cube-grid" color="green" />\n\n    <Spin name="cube-grid" />\n\n    <Spin size="54px" name="cube-grid" color="#dc3545" />\n  </div>\n)\n\nexport default App\n'},1928:function(n,e){n.exports='/**\n* cn - cube-grid\n     -- name="cube-grid"\n* en - cube-grid\n     -- name="cube-grid"\n*/\nimport React from \'react\';\nimport { Spin } from \'shineout\';\nconst App = () => (<div style={{ display: \'flex\' }}>\n    <Spin size={18} name="cube-grid" color="green"/>\n\n    <Spin name="cube-grid"/>\n\n    <Spin size="54px" name="cube-grid" color="#dc3545"/>\n  </div>);\nexport default App;\n'},1929:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(51);e.default=function(){return a.a.createElement("div",{style:{display:"flex"}},a.a.createElement(o.a,{size:18,name:"double-bounce",color:"green"}),a.a.createElement(o.a,{name:"double-bounce"}),a.a.createElement(o.a,{size:"54px",name:"double-bounce",color:"#dc3545"}))}},1930:function(n,e){n.exports='/**\n* cn - double-bounce\n     -- name="double-bounce"\n* en - double-bounce\n     -- name="double-bounce"\n*/\nimport React from \'react\'\nimport { Spin } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div style={{ display: \'flex\' }}>\n    <Spin size={18} name="double-bounce" color="green" />\n\n    <Spin name="double-bounce" />\n\n    <Spin size="54px" name="double-bounce" color="#dc3545" />\n  </div>\n)\n\nexport default App\n'},1931:function(n,e){n.exports='/**\n* cn - double-bounce\n     -- name="double-bounce"\n* en - double-bounce\n     -- name="double-bounce"\n*/\nimport React from \'react\';\nimport { Spin } from \'shineout\';\nconst App = () => (<div style={{ display: \'flex\' }}>\n    <Spin size={18} name="double-bounce" color="green"/>\n\n    <Spin name="double-bounce"/>\n\n    <Spin size="54px" name="double-bounce" color="#dc3545"/>\n  </div>);\nexport default App;\n'},1932:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(51);e.default=function(){return a.a.createElement("div",{style:{display:"flex"}},a.a.createElement(o.a,{size:18,name:"fading-circle",color:"green"}),a.a.createElement(o.a,{name:"fading-circle"}),a.a.createElement(o.a,{size:"54px",name:"fading-circle",color:"#dc3545"}))}},1933:function(n,e){n.exports='/**\n* cn - fading-circle\n     -- name="fading-circle"\n* en - fading-circle\n     -- name="fading-circle"\n*/\nimport React from \'react\'\nimport { Spin } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div style={{ display: \'flex\' }}>\n    <Spin size={18} name="fading-circle" color="green" />\n\n    <Spin name="fading-circle" />\n\n    <Spin size="54px" name="fading-circle" color="#dc3545" />\n  </div>\n)\n\nexport default App\n'},1934:function(n,e){n.exports='/**\n* cn - fading-circle\n     -- name="fading-circle"\n* en - fading-circle\n     -- name="fading-circle"\n*/\nimport React from \'react\';\nimport { Spin } from \'shineout\';\nconst App = () => (<div style={{ display: \'flex\' }}>\n    <Spin size={18} name="fading-circle" color="green"/>\n\n    <Spin name="fading-circle"/>\n\n    <Spin size="54px" name="fading-circle" color="#dc3545"/>\n  </div>);\nexport default App;\n'},1935:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(51);e.default=function(){return a.a.createElement("div",{style:{display:"flex"}},a.a.createElement(o.a,{size:18,name:"four-dots",color:"green"}),a.a.createElement(o.a,{name:"four-dots"}),a.a.createElement(o.a,{size:"54px",name:"four-dots",color:"#dc3545"}))}},1936:function(n,e){n.exports='/**\n* cn - four-dots\n     -- name="four-dots"\n* en - four-dots\n     -- name="four-dots"\n*/\nimport React from \'react\'\nimport { Spin } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div style={{ display: \'flex\' }}>\n    <Spin size={18} name="four-dots" color="green" />\n\n    <Spin name="four-dots" />\n\n    <Spin size="54px" name="four-dots" color="#dc3545" />\n  </div>\n)\n\nexport default App\n'},1937:function(n,e){n.exports='/**\n* cn - four-dots\n     -- name="four-dots"\n* en - four-dots\n     -- name="four-dots"\n*/\nimport React from \'react\';\nimport { Spin } from \'shineout\';\nconst App = () => (<div style={{ display: \'flex\' }}>\n    <Spin size={18} name="four-dots" color="green"/>\n\n    <Spin name="four-dots"/>\n\n    <Spin size="54px" name="four-dots" color="#dc3545"/>\n  </div>);\nexport default App;\n'},1938:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(51);e.default=function(){return a.a.createElement("div",{style:{display:"flex"}},a.a.createElement(o.a,{size:18,name:"plane",color:"green"}),a.a.createElement(o.a,{name:"plane"}),a.a.createElement(o.a,{size:"54px",name:"plane",color:"#dc3545"}))}},1939:function(n,e){n.exports='/**\n* cn - plane\n     -- name="plane"\n* en - plane\n     -- name="plane"\n*/\nimport React from \'react\'\nimport { Spin } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div style={{ display: \'flex\' }}>\n    <Spin size={18} name="plane" color="green" />\n\n    <Spin name="plane" />\n\n    <Spin size="54px" name="plane" color="#dc3545" />\n  </div>\n)\n\nexport default App\n'},1940:function(n,e){n.exports='/**\n* cn - plane\n     -- name="plane"\n* en - plane\n     -- name="plane"\n*/\nimport React from \'react\';\nimport { Spin } from \'shineout\';\nconst App = () => (<div style={{ display: \'flex\' }}>\n    <Spin size={18} name="plane" color="green"/>\n\n    <Spin name="plane"/>\n\n    <Spin size="54px" name="plane" color="#dc3545"/>\n  </div>);\nexport default App;\n'},1941:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(51);e.default=function(){return a.a.createElement("div",{style:{display:"flex"}},a.a.createElement(o.a,{size:18,name:"pulse",color:"green"}),a.a.createElement(o.a,{name:"pulse"}),a.a.createElement(o.a,{size:"54px",name:"pulse",color:"#dc3545"}))}},1942:function(n,e){n.exports='/**\n* cn - pulse\n     -- name="pulse"\n* en - pulse\n     -- name="pulse"\n*/\nimport React from \'react\'\nimport { Spin } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div style={{ display: \'flex\' }}>\n    <Spin size={18} name="pulse" color="green" />\n\n    <Spin name="pulse" />\n\n    <Spin size="54px" name="pulse" color="#dc3545" />\n  </div>\n)\n\nexport default App\n'},1943:function(n,e){n.exports='/**\n* cn - pulse\n     -- name="pulse"\n* en - pulse\n     -- name="pulse"\n*/\nimport React from \'react\';\nimport { Spin } from \'shineout\';\nconst App = () => (<div style={{ display: \'flex\' }}>\n    <Spin size={18} name="pulse" color="green"/>\n\n    <Spin name="pulse"/>\n\n    <Spin size="54px" name="pulse" color="#dc3545"/>\n  </div>);\nexport default App;\n'},1944:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(51);e.default=function(){return a.a.createElement("div",{style:{display:"flex"}},a.a.createElement(o.a,{size:18,name:"ring",color:"green"}),a.a.createElement(o.a,{name:"ring"}),a.a.createElement(o.a,{size:"54px",name:"ring",color:"#dc3545"}))}},1945:function(n,e){n.exports='/**\n* cn - ring\n     -- name="ring"\n* en - ring\n     -- name="ring"\n*/\nimport React from \'react\'\nimport { Spin } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div style={{ display: \'flex\' }}>\n    <Spin size={18} name="ring" color="green" />\n\n    <Spin name="ring" />\n\n    <Spin size="54px" name="ring" color="#dc3545" />\n  </div>\n)\n\nexport default App\n'},1946:function(n,e){n.exports='/**\n* cn - ring\n     -- name="ring"\n* en - ring\n     -- name="ring"\n*/\nimport React from \'react\';\nimport { Spin } from \'shineout\';\nconst App = () => (<div style={{ display: \'flex\' }}>\n    <Spin size={18} name="ring" color="green"/>\n\n    <Spin name="ring"/>\n\n    <Spin size="54px" name="ring" color="#dc3545"/>\n  </div>);\nexport default App;\n'},1947:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(51);e.default=function(){return a.a.createElement("div",{style:{display:"flex"}},a.a.createElement(o.a,{size:18,name:"scale-circle",color:"green"}),a.a.createElement(o.a,{name:"scale-circle"}),a.a.createElement(o.a,{size:"54px",name:"scale-circle",color:"#dc3545"}))}},1948:function(n,e){n.exports='/**\n* cn - scale-circle\n     -- name="scale-circle"\n* en - scale-circle\n     -- name="scale-circle"\n*/\nimport React from \'react\'\nimport { Spin } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div style={{ display: \'flex\' }}>\n    <Spin size={18} name="scale-circle" color="green" />\n\n    <Spin name="scale-circle" />\n\n    <Spin size="54px" name="scale-circle" color="#dc3545" />\n  </div>\n)\n\nexport default App\n'},1949:function(n,e){n.exports='/**\n* cn - scale-circle\n     -- name="scale-circle"\n* en - scale-circle\n     -- name="scale-circle"\n*/\nimport React from \'react\';\nimport { Spin } from \'shineout\';\nconst App = () => (<div style={{ display: \'flex\' }}>\n    <Spin size={18} name="scale-circle" color="green"/>\n\n    <Spin name="scale-circle"/>\n\n    <Spin size="54px" name="scale-circle" color="#dc3545"/>\n  </div>);\nexport default App;\n'},1950:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(51);e.default=function(){return a.a.createElement("div",{style:{display:"flex"}},a.a.createElement(o.a,{size:18,name:"three-bounce",color:"green"}),a.a.createElement(o.a,{name:"three-bounce"}),a.a.createElement(o.a,{size:"54px",name:"three-bounce",color:"#dc3545"}))}},1951:function(n,e){n.exports='/**\n* cn - three-bounce\n     -- name="three-bounce"\n* en - three-bounce\n     -- name="three-bounce"\n*/\nimport React from \'react\'\nimport { Spin } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div style={{ display: \'flex\' }}>\n    <Spin size={18} name="three-bounce" color="green" />\n\n    <Spin name="three-bounce" />\n\n    <Spin size="54px" name="three-bounce" color="#dc3545" />\n  </div>\n)\n\nexport default App\n'},1952:function(n,e){n.exports='/**\n* cn - three-bounce\n     -- name="three-bounce"\n* en - three-bounce\n     -- name="three-bounce"\n*/\nimport React from \'react\';\nimport { Spin } from \'shineout\';\nconst App = () => (<div style={{ display: \'flex\' }}>\n    <Spin size={18} name="three-bounce" color="green"/>\n\n    <Spin name="three-bounce"/>\n\n    <Spin size="54px" name="three-bounce" color="#dc3545"/>\n  </div>);\nexport default App;\n'},1953:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(51);e.default=function(){return a.a.createElement("div",{style:{display:"flex"}},a.a.createElement(o.a,{size:18,name:"wave",color:"green"}),a.a.createElement(o.a,{name:"wave"}),a.a.createElement(o.a,{size:"54px",name:"wave",color:"#dc3545"}))}},1954:function(n,e){n.exports='/**\n* cn - wave\n     -- name="wave"\n* en - wave\n     -- name="wave"\n*/\nimport React from \'react\'\nimport { Spin } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div style={{ display: \'flex\' }}>\n    <Spin size={18} name="wave" color="green" />\n\n    <Spin name="wave" />\n\n    <Spin size="54px" name="wave" color="#dc3545" />\n  </div>\n)\n\nexport default App\n'},1955:function(n,e){n.exports='/**\n* cn - wave\n     -- name="wave"\n* en - wave\n     -- name="wave"\n*/\nimport React from \'react\';\nimport { Spin } from \'shineout\';\nconst App = () => (<div style={{ display: \'flex\' }}>\n    <Spin size={18} name="wave" color="green"/>\n\n    <Spin name="wave"/>\n\n    <Spin size="54px" name="wave" color="#dc3545"/>\n  </div>);\nexport default App;\n'},1956:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(51);e.default=function(){return a.a.createElement("div",{style:{display:"flex"}},a.a.createElement(o.a,{size:18,name:"chasing-ring",color:"green"}),a.a.createElement(o.a,{name:"chasing-ring"}),a.a.createElement(o.a,{size:"54px",name:"chasing-ring",color:"#dc3545"}))}},1957:function(n,e){n.exports='/**\n* cn - chasing-ring\n     -- name="chasing-ring"\n* en - chasing-ring\n     -- name="chasing-ring"\n*/\nimport React from \'react\'\nimport { Spin } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div style={{ display: \'flex\' }}>\n    <Spin size={18} name="chasing-ring" color="green" />\n\n    <Spin name="chasing-ring" />\n\n    <Spin size="54px" name="chasing-ring" color="#dc3545" />\n  </div>\n)\n\nexport default App\n'},1958:function(n,e){n.exports='/**\n* cn - chasing-ring\n     -- name="chasing-ring"\n* en - chasing-ring\n     -- name="chasing-ring"\n*/\nimport React from \'react\';\nimport { Spin } from \'shineout\';\nconst App = () => (<div style={{ display: \'flex\' }}>\n    <Spin size={18} name="chasing-ring" color="green"/>\n\n    <Spin name="chasing-ring"/>\n\n    <Spin size="54px" name="chasing-ring" color="#dc3545"/>\n  </div>);\nexport default App;\n'},313:function(n,e,t){"use strict";var i=t(60),a=t(21),o=t(143),r=Object(o.a)("switch"),c=t(562),s=Object(a.compose)(i.a,c.b)(r);s.displayName="ShineoutSwitch",s.Switch=r;e.a=s},562:function(n,e,t){"use strict";t.d(e,"a",function(){return c}),t.d(e,"b",function(){return s});var i=t(0),a=t.n(i),o=t(38),r=Object(o.a)(),c=r.Provider,s=function(t){return function(e){return a.a.createElement(r.Consumer,null,function(n){return a.a.createElement(t,Object.assign({},e,n))})}}}}]);