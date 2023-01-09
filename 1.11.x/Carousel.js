(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[11],{1462:function(n,e,t){"use strict";t.r(e);var i=t(0),a=t.n(i),o=t(562),r=t(563),s=t(40),c=t(1463),l=t.n(c),d=t(1464),m=t.n(d),u=Object(s.b)(l.a,m.a),f=[{name:"1-base",isTs:!0,isTest:!1,title:Object(s.b)("基本用法 \n 轮播组件提供了三种动画过渡方式，可以切换选项查看效果","Base \n The carousel component provides three modes of animation transition. Change the option to view the result."),component:t(1465).default,rawText:t(1466),parseTsText:t(1467)},{name:"2-custom-indicator",isTs:!0,isTest:!1,title:Object(s.b)("自定义 Indicator \n 当 indicatorType 为函数时，可以自定义 Indicator","Custom Indicator \n Indicators can be customized when indicatorType is a function."),component:t(1468).default,rawText:t(1470),parseTsText:t(1471)}];e.default=Object(o.a)(function(n){return a.a.createElement(r.b,Object.assign({},n,{codes:void 0,source:u,examples:f}))})},1463:function(n,e){n.exports="# Carousel *轮播*\n\n<example />\n\n## API\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| animation | string | 'slide' | 动画效果，可选值为<br />slide - 横向滑动<br />slide-y - 垂直滑动<br />fade - 淡入淡出 |\n| className | string | 无 | 扩展className |\n| indicatorPosition | 'left' \\| 'center' \\| 'right' | 'center' | 指示标示位置 |\n| indicatorType | (current: number, moveTo: () => void) => ReactNode \\| string | 'circle' | 指示标示样式，字符串可以是：\\['circle', 'number', 'line']，函数则可以自定义样式: (current, moveTo) => (<Component /\\>) |\n| interval | number | 0 | 动画间隔时间，为 0 时，不自动播放 |\n| style | object | 无 | 最外层扩展样式 |\n| onMove | (current: number, extra: object) => void | 无 | 轮播后回调 |\n"},1464:function(n,e){n.exports="# Carousel\n\n<example />\n\n## API\n\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| animation | string | 'slide' | animation effects, options: <br />slide - horizontal sliding<br />slide-y - vertical sliding<br />fade - fading |\n| className | string | none | extend className |\n| indicatorPosition | 'left' \\| 'center' \\| 'right'  | 'center' | the position of indicator |\n| indicatorType | (current: number, moveTo: () => void) => ReactNode \\| string | 'circle' | the style of indicator, string options: \\['circle', 'number', 'line'], using function for custom styles |\n| interval | number | 0 | the interval of animation, When it is not 0, play automatically |\n| onMove | (current: number, extra: object) => void | none | move callback |"},1465:function(n,e,t){"use strict";t.r(e);var u=t(24),f=t(0),p=t.n(f),v=t(200),y=t(256),g={fontSize:40,color:"#fff",display:"flex",margin:"auto"};e.default=function(){var n=Object(f.useState)("slide"),e=Object(u.a)(n,2),t=e[0],i=e[1],a=Object(f.useState)("circle"),o=Object(u.a)(a,2),r=o[0],s=o[1],c=Object(f.useState)("center"),l=Object(u.a)(c,2),d=l[0],m=l[1];return p.a.createElement("div",null,p.a.createElement("div",{style:{marginBottom:20}},"animation:",p.a.createElement(v.a,{keygen:!0,size:"small",value:t,style:{width:100},onChange:function(n){return i(n)},data:["slide","slide-y","fade"]}),"indicatorPosition: ",p.a.createElement(v.a,{keygen:!0,size:"small",style:{width:90},value:d,data:["left","center","right"],onChange:function(n){return m(n)}}),"indicatorType: ",p.a.createElement(v.a,{keygen:!0,size:"small",style:{width:90},value:r,data:["circle","number","line"],onChange:function(n){return s(n)}})),p.a.createElement(y.a,{style:{width:500,height:300},interval:5e3,animation:t,indicatorPosition:d,indicatorType:r},p.a.createElement("div",{style:{background:"#666",display:"flex"}},p.a.createElement("div",{style:g},"Page 1")),p.a.createElement("div",{style:{background:"#fa8c16",display:"flex"}},p.a.createElement("div",{style:g},"Page 2")),p.a.createElement("div",{style:{background:"#eb2f96",display:"flex"}},p.a.createElement("div",{style:g},"Page 3")),p.a.createElement("a",null,p.a.createElement("img",{alt:"",style:{width:"100%",height:"100%"},src:"../../../images/1_b.jpg"}))))}},1466:function(n,e){n.exports="/**\n * cn - 基本用法\n *    -- 轮播组件提供了三种动画过渡方式，可以切换选项查看效果\n * en - Base\n *    -- The carousel component provides three modes of animation transition. Change the option to view the result.\n */\nimport React, { useState } from 'react'\nimport { Carousel, Select, TYPE } from 'shineout'\n\ntype CarouselProps = TYPE.Carousel.Props\ntype CarouselAnimation = CarouselProps['animation']\ntype CarouselIndicatorType = CarouselProps['indicatorType']\ntype CarouselIndicatorPosition = CarouselProps['indicatorPosition']\n\nconst containerStyle = {\n  fontSize: 40,\n  color: '#fff',\n  display: 'flex',\n  margin: 'auto',\n}\n\nconst App: React.FC = () => {\n  const [animation, setAnimation] = useState<CarouselAnimation>('slide')\n  const [indicatorType, setIndicatorType] = useState<CarouselIndicatorType>('circle')\n  const [indicatorPosition, setIndicatorPosition] = useState<CarouselIndicatorPosition>('center')\n\n  return (\n    <div>\n      <div style={{ marginBottom: 20 }}>\n        animation:\n        <Select\n          keygen\n          size=\"small\"\n          value={animation}\n          style={{ width: 100 }}\n          onChange={v => setAnimation(v)}\n          data={['slide', 'slide-y', 'fade']}\n        />\n        {'indicatorPosition: '}\n        <Select\n          keygen\n          size=\"small\"\n          style={{ width: 90 }}\n          value={indicatorPosition}\n          data={['left', 'center', 'right']}\n          onChange={v => setIndicatorPosition(v)}\n        />\n        {'indicatorType: '}\n        <Select\n          keygen\n          size=\"small\"\n          style={{ width: 90 }}\n          value={indicatorType}\n          data={['circle', 'number', 'line']}\n          onChange={v => setIndicatorType(v)}\n        />\n      </div>\n\n      <Carousel\n        style={{ width: 500, height: 300 }}\n        interval={5000}\n        animation={animation}\n        indicatorPosition={indicatorPosition}\n        indicatorType={indicatorType}\n      >\n        <div style={{ background: '#666', display: 'flex' }}>\n          <div style={containerStyle}>Page 1</div>\n        </div>\n        <div style={{ background: '#fa8c16', display: 'flex' }}>\n          <div style={containerStyle}>Page 2</div>\n        </div>\n        <div style={{ background: '#eb2f96', display: 'flex' }}>\n          <div style={containerStyle}>Page 3</div>\n        </div>\n        <a>\n          <img alt=\"\" style={{ width: '100%', height: '100%' }} src=\"../../../images/1_b.jpg\" />\n        </a>\n      </Carousel>\n    </div>\n  )\n}\n\nexport default App\n"},1467:function(n,e){n.exports="/**\n * cn - 基本用法\n *    -- 轮播组件提供了三种动画过渡方式，可以切换选项查看效果\n * en - Base\n *    -- The carousel component provides three modes of animation transition. Change the option to view the result.\n */\nimport React, { useState } from 'react';\nimport { Carousel, Select } from 'shineout';\nconst containerStyle = {\n    fontSize: 40,\n    color: '#fff',\n    display: 'flex',\n    margin: 'auto',\n};\nconst App = () => {\n    const [animation, setAnimation] = useState('slide');\n    const [indicatorType, setIndicatorType] = useState('circle');\n    const [indicatorPosition, setIndicatorPosition] = useState('center');\n    return (<div>\n      <div style={{ marginBottom: 20 }}>\n        animation:\n        <Select keygen size=\"small\" value={animation} style={{ width: 100 }} onChange={v => setAnimation(v)} data={['slide', 'slide-y', 'fade']}/>\n        {'indicatorPosition: '}\n        <Select keygen size=\"small\" style={{ width: 90 }} value={indicatorPosition} data={['left', 'center', 'right']} onChange={v => setIndicatorPosition(v)}/>\n        {'indicatorType: '}\n        <Select keygen size=\"small\" style={{ width: 90 }} value={indicatorType} data={['circle', 'number', 'line']} onChange={v => setIndicatorType(v)}/>\n      </div>\n\n      <Carousel style={{ width: 500, height: 300 }} interval={5000} animation={animation} indicatorPosition={indicatorPosition} indicatorType={indicatorType}>\n        <div style={{ background: '#666', display: 'flex' }}>\n          <div style={containerStyle}>Page 1</div>\n        </div>\n        <div style={{ background: '#fa8c16', display: 'flex' }}>\n          <div style={containerStyle}>Page 2</div>\n        </div>\n        <div style={{ background: '#eb2f96', display: 'flex' }}>\n          <div style={containerStyle}>Page 3</div>\n        </div>\n        <a>\n          <img alt=\"\" style={{ width: '100%', height: '100%' }} src=\"../../../images/1_b.jpg\"/>\n        </a>\n      </Carousel>\n    </div>);\n};\nexport default App;\n"},1468:function(n,e,t){"use strict";t.r(e);var i=t(0),s=t.n(i),a=t(256),o=t(14),c=t.n(o),r=(t(1469),{fontSize:40,color:"#fff",display:"flex",margin:"auto"}),l=["S","H","I","N","E"];e.default=function(){return s.a.createElement(a.a,{indicatorType:function(o,r){return s.a.createElement("div",{className:"indicator"},l.map(function(n,e){var t=o===e,i=c()("indicator-item",t&&"active"),a=t?{animation:"indicator-rise ".concat(5,"s linear")}:{};return s.a.createElement("div",{key:n,onClick:function(){return r(e)},className:i},s.a.createElement("span",null,n),s.a.createElement("div",{className:"indicator-progress"},s.a.createElement("div",{className:"fg",style:a}),s.a.createElement("div",{className:"bg"})))}))},style:{width:500,height:300},interval:5e3},l.map(function(n){return s.a.createElement("div",{key:n,style:{background:"#2e97f1",display:"flex"}},s.a.createElement("div",{style:r},n))}))}},1469:function(n,e){},1470:function(n,e){n.exports="/**\n * cn - 自定义 Indicator\n *    -- 当 indicatorType 为函数时，可以自定义 Indicator\n * en - Custom Indicator\n *    -- Indicators can be customized when indicatorType is a function.\n */\nimport React from 'react'\nimport { Carousel, TYPE } from 'shineout'\nimport classnames from 'classnames'\nimport './style-2-custom-indicator.less'\n\ntype CarouselProps = TYPE.Carousel.Props\ntype CarouselInterval = CarouselProps['interval']\ntype CarouselIndicatorType = CarouselProps['indicatorType']\n\nconst containerStyle = {\n  fontSize: 40,\n  color: '#fff',\n  display: 'flex',\n  margin: 'auto',\n}\nconst items = ['S', 'H', 'I', 'N', 'E']\nconst duration: CarouselInterval = 5000\n\nconst App: React.FC = () => {\n  const indicatorSwitch: CarouselIndicatorType = (current, moveTo) => (\n    <div className=\"indicator\">\n      {items.map((item, index) => {\n        const isActive = current === index\n        const itemClassname = classnames('indicator-item', isActive && 'active')\n        const animationStyle = isActive ? { animation: `indicator-rise ${duration / 1000}s linear` } : {}\n        return (\n          <div key={item} onClick={() => moveTo(index)} className={itemClassname}>\n            <span>{item}</span>\n            <div className=\"indicator-progress\">\n              <div className=\"fg\" style={animationStyle} />\n              <div className=\"bg\" />\n            </div>\n          </div>\n        )\n      })}\n    </div>\n  )\n\n  return (\n    <Carousel indicatorType={indicatorSwitch} style={{ width: 500, height: 300 }} interval={duration}>\n      {items.map(item => (\n        <div key={item} style={{ background: '#2e97f1', display: 'flex' }}>\n          <div style={containerStyle}>{item}</div>\n        </div>\n      ))}\n    </Carousel>\n  )\n}\n\nexport default App\n\n/* style-2-custom-indicator.css\n@keyframes indicator-rise {\n  from {\n    width: 0;\n  }\n  to {\n    width: 100%;\n  }\n}\ndiv.indicator {\n  text-align: center;\n  user-select: none;\n  float: left;\n}\ndiv.indicator-item {\n  margin-right: 10px;\n  float: left;\n  width: 36px;\n  height: 30px;\n  font-size: 20px;\n  color: #ffffff50;\n  cursor: pointer;\n}\ndiv.indicator-item.active {\n  color: #fff;\n}\ndiv.indicator .indicator-progress {\n  position: relative;\n}\ndiv.indicator .indicator-progress > div {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n}\ndiv.indicator .indicator-progress .bg {\n  width: 100%;\n  background: #ffffff50;\n}\ndiv.indicator .indicator-progress .fg {\n  width: 0;\n  background: #ffffff;\n}\n*/\n"},1471:function(n,e){n.exports="/**\n * cn - 自定义 Indicator\n *    -- 当 indicatorType 为函数时，可以自定义 Indicator\n * en - Custom Indicator\n *    -- Indicators can be customized when indicatorType is a function.\n */\nimport React from 'react';\nimport { Carousel } from 'shineout';\nimport classnames from 'classnames';\nimport './style-2-custom-indicator.less';\nconst containerStyle = {\n    fontSize: 40,\n    color: '#fff',\n    display: 'flex',\n    margin: 'auto',\n};\nconst items = ['S', 'H', 'I', 'N', 'E'];\nconst duration = 5000;\nconst App = () => {\n    const indicatorSwitch = (current, moveTo) => (<div className=\"indicator\">\n      {items.map((item, index) => {\n            const isActive = current === index;\n            const itemClassname = classnames('indicator-item', isActive && 'active');\n            const animationStyle = isActive ? { animation: `indicator-rise ${duration / 1000}s linear` } : {};\n            return (<div key={item} onClick={() => moveTo(index)} className={itemClassname}>\n            <span>{item}</span>\n            <div className=\"indicator-progress\">\n              <div className=\"fg\" style={animationStyle}/>\n              <div className=\"bg\"/>\n            </div>\n          </div>);\n        })}\n    </div>);\n    return (<Carousel indicatorType={indicatorSwitch} style={{ width: 500, height: 300 }} interval={duration}>\n      {items.map(item => (<div key={item} style={{ background: '#2e97f1', display: 'flex' }}>\n          <div style={containerStyle}>{item}</div>\n        </div>))}\n    </Carousel>);\n};\nexport default App;\n/* style-2-custom-indicator.css\n@keyframes indicator-rise {\n  from {\n    width: 0;\n  }\n  to {\n    width: 100%;\n  }\n}\ndiv.indicator {\n  text-align: center;\n  user-select: none;\n  float: left;\n}\ndiv.indicator-item {\n  margin-right: 10px;\n  float: left;\n  width: 36px;\n  height: 30px;\n  font-size: 20px;\n  color: #ffffff50;\n  cursor: pointer;\n}\ndiv.indicator-item.active {\n  color: #fff;\n}\ndiv.indicator .indicator-progress {\n  position: relative;\n}\ndiv.indicator .indicator-progress > div {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n}\ndiv.indicator .indicator-progress .bg {\n  width: 100%;\n  background: #ffffff50;\n}\ndiv.indicator .indicator-progress .fg {\n  width: 0;\n  background: #ffffff;\n}\n*/\n"}}]);