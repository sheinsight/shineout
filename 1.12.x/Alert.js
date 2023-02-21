(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[6],{1728:function(e,n,t){"use strict";t.r(n);var o=t(0),r=t.n(o),i=t(563),s=t(564),a=t(40),l=t(1729),c=t.n(l),p=t(1730),u=t.n(p),d=Object(a.b)(c.a,u.a),f=[{name:"1-base",isTs:!0,isTest:!1,title:Object(a.b)("基本用法 \n 基本的使用","Base \n Basic usage"),component:t(1731).default,rawText:t(1732),parseTsText:t(1733)},{name:"2-type",isTs:!0,isTest:!1,title:Object(a.b)("类型 \n 内置了 4 种类型（样式），[success, info, warning, danger]，默认为 warning","type \n There are four built-in types (styles), [success, info, warning, danger], the default value is warning."),component:t(1734).default,rawText:t(1735),parseTsText:t(1736)},{name:"3-close",isTs:!0,isTest:!1,title:Object(a.b)("关闭 \n 设置 onClose 属性时，显示关闭按钮 \n onClose 为 true 时，只关闭提示，不处理 \n onClose 为函数时，关闭后调用此函数","onClose \n When the onClose property is set, the close button is displayed. \n When the onClose property is true, only hide the component. \n When the onClose is a function, call this function after hiding it."),component:t(1737).default,rawText:t(1738),parseTsText:t(1739)},{name:"4-icon",isTs:!0,isTest:!1,title:Object(a.b)("内置图标 \n 设置 icon 属性可以显示内置的图标，不同类型的图标见示例","Icon \n Set the icon property to display the built-in icon."),component:t(1740).default,rawText:t(1741),parseTsText:t(1742)}];n.default=Object(i.a)(function(e){return r.a.createElement(s.b,Object.assign({},e,{codes:void 0,source:d,examples:f}))})},1729:function(e,n){e.exports="# Alert *提示框*\n\n<example />\n\n## API\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| children | ReactNode | 无 | 内容，文字或react组件 |\n| className | string | 无 | 扩展className |\n| icon | ReactNode \\| boolean | 无 | 为true时，根据type属性显示状态图标。如果需要显示自定义图标，传入ReactElement。 |\n| iconSize | number | 14 | icon 的尺寸 |\n| onClose | () => void \\| boolean | 无 | 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为true即可 |\n| style | object | 无 | 最外层扩展样式 |\n| type | 'success' \\| 'info' \\| 'warning' \\| 'danger' \\| 'error' | *warning* |  4 选 1 |\n| hideClose | boolean | false | 是否隐藏关闭按钮 |\n"},1730:function(e,n){e.exports="# Alert\n\n<example />\n\n## API\n\n| Property | Type | Default | Description |\n| -------- | ---- | ------- | ----------- |\n| children | ReactNode  | - | Content, text or react component |\n| className | string | - | Extend className |\n| icon | ReactNode \\| boolean | - | When the type is true, the status icon is displayed according to the type property. If you need to display a custom icon, pass in ReactElement. |\n| iconSize | number | 14 | The size for icon |\n| onClose | () => void \\| boolean | - | When onClose is empty, no close is displayed. If you need to close and do not need to handle callbacks, set it true. |\n| style | object | - | Container element style |\n| type | 'success' \\| 'info' \\| 'warning' \\| 'danger' \\| 'error' | *warning* | type of alert |\n| hideClose | boolean | false | hide close button |\n"},1731:function(e,n,t){"use strict";t.r(n);var o=t(0),r=t.n(o),i=t(123);n.default=function(){return r.a.createElement(i.a,null,r.a.createElement("h3",null,"Title"),"Some content.")}},1732:function(e,n){e.exports="/**\n * cn - 基本用法\n *    -- 基本的使用\n * en - Base\n *    -- Basic usage\n */\nimport React from 'react'\nimport { Alert } from 'shineout'\n\nconst App: React.FC = () => (\n  <Alert>\n    <h3>Title</h3>\n    Some content.\n  </Alert>\n)\n\nexport default App\n"},1733:function(e,n){e.exports="/**\n * cn - 基本用法\n *    -- 基本的使用\n * en - Base\n *    -- Basic usage\n */\nimport React from 'react';\nimport { Alert } from 'shineout';\nconst App = () => (<Alert>\n    <h3>Title</h3>\n    Some content.\n  </Alert>);\nexport default App;\n"},1734:function(e,n,t){"use strict";t.r(n);var o=t(0),r=t.n(o),i=t(123);n.default=function(){return r.a.createElement("div",null,r.a.createElement(i.a,{type:"success"},"Success Type."),r.a.createElement(i.a,{type:"info"},"Info Type."),r.a.createElement(i.a,{type:"warning"},"Warning Type."),r.a.createElement(i.a,{type:"danger"},"Danger Type."))}},1735:function(e,n){e.exports='/**\n * cn - 类型\n *    -- 内置了 4 种类型（样式），[success, info, warning, danger]，默认为 warning\n * en - type\n *    -- There are four built-in types (styles), [success, info, warning, danger], the default value is warning.\n */\nimport React from \'react\'\nimport { Alert } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div>\n    <Alert type="success">Success Type.</Alert>\n    <Alert type="info">Info Type.</Alert>\n    <Alert type="warning">Warning Type.</Alert>\n    <Alert type="danger">Danger Type.</Alert>\n  </div>\n)\n\nexport default App\n'},1736:function(e,n){e.exports='/**\n * cn - 类型\n *    -- 内置了 4 种类型（样式），[success, info, warning, danger]，默认为 warning\n * en - type\n *    -- There are four built-in types (styles), [success, info, warning, danger], the default value is warning.\n */\nimport React from \'react\';\nimport { Alert } from \'shineout\';\nconst App = () => (<div>\n    <Alert type="success">Success Type.</Alert>\n    <Alert type="info">Info Type.</Alert>\n    <Alert type="warning">Warning Type.</Alert>\n    <Alert type="danger">Danger Type.</Alert>\n  </div>);\nexport default App;\n'},1737:function(e,n,t){"use strict";t.r(n);var r=t(24),i=t(0),s=t.n(i),a=t(123);n.default=function(){var e=Object(i.useState)(""),n=Object(r.a)(e,2),t=n[0],o=n[1];return s.a.createElement("div",null,s.a.createElement(a.a,{onClose:!0},"Alert onClose=true"),s.a.createElement(a.a,{onClose:function(){return o("Alert was dismissed.")}},"Alert onClose=function"),t&&s.a.createElement(a.a,{type:"info"},t))}},1738:function(e,n){e.exports="/**\n * cn - 关闭\n *    -- 设置 onClose 属性时，显示关闭按钮\n *    -- onClose 为 true 时，只关闭提示，不处理\n *    -- onClose 为函数时，关闭后调用此函数\n * en - onClose\n *    -- When the onClose property is set, the close button is displayed.\n *    -- When the onClose property is true, only hide the component.\n *    -- When the onClose is a function, call this function after hiding it.\n */\nimport React, { useState } from 'react'\nimport { Alert } from 'shineout'\n\nconst App: React.FC = () => {\n  const [placeholder, setplaceholder] = useState('')\n\n  return (\n    <div>\n      <Alert onClose>Alert onClose=true</Alert>\n\n      <Alert onClose={() => setplaceholder('Alert was dismissed.')}>Alert onClose=function</Alert>\n\n      {placeholder && <Alert type=\"info\">{placeholder}</Alert>}\n    </div>\n  )\n}\n\nexport default App\n"},1739:function(e,n){e.exports="/**\n * cn - 关闭\n *    -- 设置 onClose 属性时，显示关闭按钮\n *    -- onClose 为 true 时，只关闭提示，不处理\n *    -- onClose 为函数时，关闭后调用此函数\n * en - onClose\n *    -- When the onClose property is set, the close button is displayed.\n *    -- When the onClose property is true, only hide the component.\n *    -- When the onClose is a function, call this function after hiding it.\n */\nimport React, { useState } from 'react';\nimport { Alert } from 'shineout';\nconst App = () => {\n    const [placeholder, setplaceholder] = useState('');\n    return (<div>\n      <Alert onClose>Alert onClose=true</Alert>\n\n      <Alert onClose={() => setplaceholder('Alert was dismissed.')}>Alert onClose=function</Alert>\n\n      {placeholder && <Alert type=\"info\">{placeholder}</Alert>}\n    </div>);\n};\nexport default App;\n"},1740:function(e,n,t){"use strict";t.r(n);var o=t(0),r=t.n(o),i=t(123);n.default=function(){return r.a.createElement("div",null,r.a.createElement(i.a,{type:"success",icon:!0},"Success Type."),r.a.createElement(i.a,{type:"info",icon:!0},"Info Type."),r.a.createElement(i.a,{type:"warning",icon:!0},"Warning Type."),r.a.createElement(i.a,{type:"danger",icon:!0},"Danger Type."),r.a.createElement(i.a,{icon:!0,iconSize:24,style:{padding:20}},r.a.createElement("h3",null,"Set iconSize"),"iconSize=24"))}},1741:function(e,n){e.exports='/**\n * cn - 内置图标\n *    -- 设置 icon 属性可以显示内置的图标，不同类型的图标见示例\n * en - Icon\n *    -- Set the icon property to display the built-in icon.\n */\nimport React from \'react\'\nimport { Alert } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div>\n    <Alert type="success" icon>\n      Success Type.\n    </Alert>\n    <Alert type="info" icon>\n      Info Type.\n    </Alert>\n    <Alert type="warning" icon>\n      Warning Type.\n    </Alert>\n    <Alert type="danger" icon>\n      Danger Type.\n    </Alert>\n\n    <Alert icon iconSize={24} style={{ padding: 20 }}>\n      <h3>Set iconSize</h3>\n      iconSize=24\n    </Alert>\n  </div>\n)\n\nexport default App\n'},1742:function(e,n){e.exports='/**\n * cn - 内置图标\n *    -- 设置 icon 属性可以显示内置的图标，不同类型的图标见示例\n * en - Icon\n *    -- Set the icon property to display the built-in icon.\n */\nimport React from \'react\';\nimport { Alert } from \'shineout\';\nconst App = () => (<div>\n    <Alert type="success" icon>\n      Success Type.\n    </Alert>\n    <Alert type="info" icon>\n      Info Type.\n    </Alert>\n    <Alert type="warning" icon>\n      Warning Type.\n    </Alert>\n    <Alert type="danger" icon>\n      Danger Type.\n    </Alert>\n\n    <Alert icon iconSize={24} style={{ padding: 20 }}>\n      <h3>Set iconSize</h3>\n      iconSize=24\n    </Alert>\n  </div>);\nexport default App;\n'}}]);