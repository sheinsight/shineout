(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[29],{762:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),r=t(562),o=t(563),s=t(40),l=t(763),p=t.n(l),c=t(764),m=t.n(c),h=Object(s.b)(p.a,m.a),g=[{name:"01-base",isTs:!0,isTest:!1,title:Object(s.b)("基本用法 \n 图片设置宽高后即使图片未加载，仍然会先占位","Base \n The most basic image."),component:t(765).default,rawText:t(766),parseTsText:t(767)},{name:"02-shape",isTs:!0,isTest:!1,title:Object(s.b)("形状 \n 内置了三种图片样式，rounded, cricle, thumbnail","Shape \n There are three built-in styles, rounded, cricle, thumbnail."),component:t(768).default,rawText:t(769),parseTsText:t(770)},{name:"03-fit",isTs:!0,isTest:!1,title:Object(s.b)("适应 \n 内置了 4 种适应容器的方式，填充、居中、原图、拉伸","Fit \n There are four built ways that fit the container, fill, center, original, stretch."),component:t(771).default,rawText:t(772),parseTsText:t(773)},{name:"04-alt",isTs:!0,isTest:!1,title:Object(s.b)("备用地址 \n 在 src 获取失败的情况下，自动使用 alt 属性设置的地址","Alt \n If the src address fails to load, use the alt property instead."),component:t(774).default,rawText:t(775),parseTsText:t(776)},{name:"05-error",isTs:!0,isTest:!1,title:Object(s.b)("错误处理 \n alt 属性失效或没有 alt 属性时，会显示 title 属性","Title \n The title property is displayed when the alt property is invalid or there is no alt property."),component:t(777).default,rawText:t(778),parseTsText:t(779)},{name:"06-target",isTs:!0,isTest:!1,title:Object(s.b)("原始图片 \n 提供了 4 种方式展示原始图片，弹出层、新窗口打开、当前窗口打开、下载","Target \n There are 4 ways to display the original image, pop-up layer, new window open, current window open, download."),component:t(780).default,rawText:t(781),parseTsText:t(782)},{name:"07-group",isTs:!0,isTest:!1,title:Object(s.b)("图片组 \n 一组图片可以放在 Image.Group 中","Group \n A group of images can be placed in the Image.Group ."),component:t(783).default,rawText:t(784),parseTsText:t(785)},{name:"08-group",isTs:!0,isTest:!1,title:Object(s.b)(" \n 设置 pile 属性可以把缩略图堆叠展示"," \n Set the pile property to show the image stack."),component:t(786).default,rawText:t(787),parseTsText:t(788)},{name:"09-lazy",isTs:!0,isTest:!1,title:Object(s.b)("延迟加载 \n lazy 属性为 true 时，图片会在进入屏幕可视区域后加载, 默认以 document 的滚动条为判断","Lazy load \n When the lazy property is true, the image will load when it enter the visual area of the screen."),component:t(789).default,rawText:t(790),parseTsText:t(791)},{name:"10-lazy",isTs:!0,isTest:!1,title:Object(s.b)(" \n 如果需要在特定的元素内部进行懒加载, 则需要提供一个选择器, 请确保 Image 组件渲染的时候能够通过选择器获取到指定元素."," \n If you need to lazy loading inside a specific element, you need to provide a selector, please ensure that the Image component can get the specified element through the selector when rendering."),component:t(792).default,rawText:t(793),parseTsText:t(794)}];n.default=Object(r.a)(function(e){return i.a.createElement(o.b,Object.assign({},e,{codes:void 0,source:h,examples:g}))})},763:function(e,n){e.exports="# Image *图片*\n\n图片组件用来处理指定尺寸的图片，实现占位，异常处理，拉伸、填充，延时加载等功能。\n\n<example />\n\n## API\n\n### Image\n\n| 属性 | 类型 | 默认值 | 说明 | 可用版本 | \n| --- | --- | --- | --- | --- |\n| className | string | 无 | 扩展className | |\n| height | string \\| number | '100%' | 图片高度(值为百分比时，对比值为图片宽度) | |\n| href | string | 无 | 原始图片地址 | |\n| lazy | boolean \\| number | false | 是否延迟加载，如果为数字则表示懒加载偏移量 | |\n| src | string | 必填 | 图片地址 | |\n| style | object | 无 | 最外层扩展样式 | |\n| target | '_modal' \\| '_blank' \\| '_self' \\| '_download' | '_modal' | 图片打开方式 | |\n| width | string \\| number | '100%' | 图片宽度 | |\n| placeholder | ReactNode | '加载中' | 图片加载中占位内容 | |\n| container | string | - | 对特定元素进行懒加载判断的选择器, 如: '#id', '.class' | 1.4.2  |\n| error | ReactNode | 无 | 图片载入错误的文案 |  |\n| autoSSL | boolean | false | 是否根据页面自动转换协议 | 1.6.1 |\n| fit | 'fill' \\| 'fit' \\| 'stretch' \\| 'center' | - | 适应容器的方式, 填充、居中、原图、拉伸 | |\n| shape | 'rounded' \\| 'circle' \\| 'thumbnail' | 'rounded' | 图片形状 | |\n| alt | string | 无 | 备用地址，src无效时会应用 | |\n| onError | (err: Event) => void | 无 | src或alt 地址请求出错回调 | |\n| onClick | (e: MouseEvent) => void | 无 | 点击图片的回调 | |\n| title | string | 无 | 原生 title 属性 | |\n \n### Image.Group\n\n| 属性 | 类型 | 默认值 | 说明 |\n| --- | --- | --- | --- |\n| height | string \\| number | '100%' | 单个图片高度(值为百分比时，对比值为图片宽度) |\n| lazy | boolean | false | 是否延迟加载 |\n| pile | boolean | false | 是否堆叠 |\n| target | '_modal' \\| '_blank' \\| '_self' \\| '_download' | '_modal' | 图片打开方式 |\n| width | string \\| number | '100%' | 单个图片宽度 |\n"},764:function(e,n){e.exports="# Image\n\n<example />\n\n## API\n\n### Image\n\n| Property | Type | Default | Description | version | \n| --- | --- | --- | --- | --- |\n| className | string | none | extend className | |\n| height | string \\| number | '100%' | the height of the image(When the value is percentage, the ratio is the width of the image) | |\n| href | string | none | original picture address | |\n| lazy | boolean \\| number | false | whether to delay loading, number to set lazy offset | |\n| src | string | required | the picture address | |\n| style | object | - | Container element style | |\n| target | '_modal' \\| '_blank' \\| '_self' \\| '_download' | '_modal' | target of image | |\n| width | string \\| number | '100%' | the width of the image | |\n| placeholder | ReactNode | 'loading' | loading image placeholder content | |\n| container | string | - | the special element selector witch container the lazy image, such as: '#id', '.class' | 1.4.2 |\n| error | ReactNode | none | image error placeholder |  |\n| autoSSL | boolean | false | auto transform protocol | 1.6.1 |\n| fit | 'fill' \\| 'fit' \\| 'stretch' \\| 'center' | - | fit the container | |\n| shape | 'rounded' \\| 'circle' \\| 'thumbnail' | 'rounded' | shape of image | |\n| alt | string | none | Alternate address, applied when src is invalid | |\n| onError | (err: Event) => void | none | callback of image src or alt request fail | |\n| onClick | (e: MouseEvent) => void | - | The callback of click | |\n| title | string | - | The original property of html | |\n\n\n### Image.Group\n\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n| height | string \\| number | '100%' | the height of single image(When the value is percentage, the ratio is the width of the image) |\n| lazy | boolean | false | whether to delay loading |\n| pile | boolean | false | whether to stack |\n| target | '_modal' \\| '_blank' \\| '_self' \\| '_download' | '_modal' | target of image |\n| width | string \\| number | '100%' | the width of single picture |\n"},765:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),r=t(189);n.default=function(){return i.a.createElement(r.a,{width:200,height:125,src:"../../../images/1_b.jpg"})}},766:function(e,n){e.exports="/**\n * cn - 基本用法\n *    -- 图片设置宽高后即使图片未加载，仍然会先占位\n * en - Base\n *    -- The most basic image.\n */\nimport React from 'react'\nimport { Image } from 'shineout'\n\nconst App: React.FC = () => <Image width={200} height={125} src=\"../../../images/1_b.jpg\" />\n\nexport default App\n"},767:function(e,n){e.exports="/**\n * cn - 基本用法\n *    -- 图片设置宽高后即使图片未加载，仍然会先占位\n * en - Base\n *    -- The most basic image.\n */\nimport React from 'react';\nimport { Image } from 'shineout';\nconst App = () => <Image width={200} height={125} src=\"../../../images/1_b.jpg\"/>;\nexport default App;\n"},768:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),r=t(189);n.default=function(){return i.a.createElement("div",null,i.a.createElement(r.a,{width:150,height:150,shape:"rounded",title:"rounded"}),i.a.createElement(r.a,{width:150,height:150,shape:"circle",title:"circle"}),i.a.createElement(r.a,{width:150,height:150,shape:"thumbnail",title:"thumbnail"}))}},769:function(e,n){e.exports='/**\n * cn - 形状\n *    -- 内置了三种图片样式，rounded, cricle, thumbnail\n * en - Shape\n *    -- There are three built-in styles, rounded, cricle, thumbnail.\n */\nimport React from \'react\'\nimport { Image } from \'shineout\'\n\nconst App: React.FC = () => (\n  <div>\n    <Image width={150} height={150} shape="rounded" title="rounded" />\n    <Image width={150} height={150} shape="circle" title="circle" />\n    <Image width={150} height={150} shape="thumbnail" title="thumbnail" />\n  </div>\n)\n\nexport default App\n'},770:function(e,n){e.exports='/**\n * cn - 形状\n *    -- 内置了三种图片样式，rounded, cricle, thumbnail\n * en - Shape\n *    -- There are three built-in styles, rounded, cricle, thumbnail.\n */\nimport React from \'react\';\nimport { Image } from \'shineout\';\nconst App = () => (<div>\n    <Image width={150} height={150} shape="rounded" title="rounded"/>\n    <Image width={150} height={150} shape="circle" title="circle"/>\n    <Image width={150} height={150} shape="thumbnail" title="thumbnail"/>\n  </div>);\nexport default App;\n'},771:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),r=t(189),o=["fill","center","fit","stretch"];n.default=function(){return i.a.createElement("div",null,o.map(function(e){return i.a.createElement("div",{key:e,style:{width:"25%",padding:4,display:"inline-block"}},i.a.createElement(r.a,{width:"100%",height:"75%",src:"../../../images/1_b.jpg",shape:"thumbnail",fit:e}),i.a.createElement("div",{style:{textAlign:"center",paddingTop:4}},e))}))}},772:function(e,n){e.exports="/**\n * cn - 适应\n *    -- 内置了 4 种适应容器的方式，填充、居中、原图、拉伸\n * en - Fit\n *    -- There are four built ways that fit the container, fill, center, original, stretch.\n */\nimport React from 'react'\nimport { Image, TYPE } from 'shineout'\n\ntype ImageProps = TYPE.Image.Props\ntype ImageFit = ImageProps['fit']\n\nconst src = '../../../images/1_b.jpg'\nconst fits: ImageFit[] = ['fill', 'center', 'fit', 'stretch']\n\nconst App: React.FC = () => (\n  <div>\n    {fits.map(fit => (\n      <div key={fit} style={{ width: '25%', padding: 4, display: 'inline-block' }}>\n        <Image width=\"100%\" height=\"75%\" src={src} shape=\"thumbnail\" fit={fit} />\n        <div style={{ textAlign: 'center', paddingTop: 4 }}>{fit}</div>\n      </div>\n    ))}\n  </div>\n)\n\nexport default App\n"},773:function(e,n){e.exports="/**\n * cn - 适应\n *    -- 内置了 4 种适应容器的方式，填充、居中、原图、拉伸\n * en - Fit\n *    -- There are four built ways that fit the container, fill, center, original, stretch.\n */\nimport React from 'react';\nimport { Image } from 'shineout';\nconst src = '../../../images/1_b.jpg';\nconst fits = ['fill', 'center', 'fit', 'stretch'];\nconst App = () => (<div>\n    {fits.map(fit => (<div key={fit} style={{ width: '25%', padding: 4, display: 'inline-block' }}>\n        <Image width=\"100%\" height=\"75%\" src={src} shape=\"thumbnail\" fit={fit}/>\n        <div style={{ textAlign: 'center', paddingTop: 4 }}>{fit}</div>\n      </div>))}\n  </div>);\nexport default App;\n"},774:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),r=t(189);n.default=function(){return i.a.createElement(r.a,{width:200,height:125,src:"notfound",alt:"../../../images/1_b.jpg"})}},775:function(e,n){e.exports="/**\n * cn - 备用地址\n *    -- 在 src 获取失败的情况下，自动使用 alt 属性设置的地址\n * en - Alt\n *    -- If the src address fails to load, use the alt property instead.\n */\nimport React from 'react'\nimport { Image, TYPE } from 'shineout'\n\ntype ImageProps = TYPE.Image.Props\ntype ImageAlt = ImageProps['alt']\n\nconst alt: ImageAlt = '../../../images/1_b.jpg'\n\nconst App: React.FC = () => <Image width={200} height={125} src=\"notfound\" alt={alt} />\n\nexport default App\n"},776:function(e,n){e.exports="/**\n * cn - 备用地址\n *    -- 在 src 获取失败的情况下，自动使用 alt 属性设置的地址\n * en - Alt\n *    -- If the src address fails to load, use the alt property instead.\n */\nimport React from 'react';\nimport { Image } from 'shineout';\nconst alt = '../../../images/1_b.jpg';\nconst App = () => <Image width={200} height={125} src=\"notfound\" alt={alt}/>;\nexport default App;\n"},777:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),r=t(189);n.default=function(){return i.a.createElement(r.a,{width:200,height:125,src:"notfound",title:"Image not exist"})}},778:function(e,n){e.exports="/**\n * cn - 错误处理\n *    -- alt 属性失效或没有 alt 属性时，会显示 title 属性\n * en - Title\n *    -- The title property is displayed when the alt property is invalid or there is no alt property.\n */\nimport React from 'react'\nimport { Image } from 'shineout'\n\nconst App: React.FC = () => <Image width={200} height={125} src=\"notfound\" title=\"Image not exist\" />\n\nexport default App\n"},779:function(e,n){e.exports="/**\n * cn - 错误处理\n *    -- alt 属性失效或没有 alt 属性时，会显示 title 属性\n * en - Title\n *    -- The title property is displayed when the alt property is invalid or there is no alt property.\n */\nimport React from 'react';\nimport { Image } from 'shineout';\nconst App = () => <Image width={200} height={125} src=\"notfound\" title=\"Image not exist\"/>;\nexport default App;\n"},780:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),r=t(189),o=["_modal","_blank","_self","_download"];n.default=function(){return i.a.createElement("div",null,o.map(function(e){return i.a.createElement("div",{key:e,style:{display:"inline-block",marginInlineEnd:12,textAlign:"center"}},i.a.createElement(r.a,{fit:"fill",target:e,width:80,height:80,shape:"thumbnail",src:"../../../images/1_s.jpg",href:"../../../images/1_b.jpg"}),i.a.createElement("br",null),e)}))}},781:function(e,n){e.exports="/**\n * cn - 原始图片\n *    -- 提供了 4 种方式展示原始图片，弹出层、新窗口打开、当前窗口打开、下载\n * en - Target\n *    -- There are 4 ways to display the original image, pop-up layer, new window open, current window open, download.\n */\nimport React from 'react'\nimport { Image, TYPE } from 'shineout'\n\ntype ImageProps = TYPE.Image.Props\ntype ImageTarget = ImageProps['target']\n\nconst target: ImageTarget[] = ['_modal', '_blank', '_self', '_download']\n\nconst App: React.FC = () => (\n  <div>\n    {target.map(t => (\n      <div key={t} style={{ display: 'inline-block', marginInlineEnd: 12, textAlign: 'center' }}>\n        <Image\n          fit=\"fill\"\n          target={t}\n          width={80}\n          height={80}\n          shape=\"thumbnail\"\n          src=\"../../../images/1_s.jpg\"\n          href=\"../../../images/1_b.jpg\"\n        />\n\n        <br />\n\n        {t}\n      </div>\n    ))}\n  </div>\n)\n\nexport default App\n"},782:function(e,n){e.exports="/**\n * cn - 原始图片\n *    -- 提供了 4 种方式展示原始图片，弹出层、新窗口打开、当前窗口打开、下载\n * en - Target\n *    -- There are 4 ways to display the original image, pop-up layer, new window open, current window open, download.\n */\nimport React from 'react';\nimport { Image } from 'shineout';\nconst target = ['_modal', '_blank', '_self', '_download'];\nconst App = () => (<div>\n    {target.map(t => (<div key={t} style={{ display: 'inline-block', marginInlineEnd: 12, textAlign: 'center' }}>\n        <Image fit=\"fill\" target={t} width={80} height={80} shape=\"thumbnail\" src=\"../../../images/1_s.jpg\" href=\"../../../images/1_b.jpg\"/>\n\n        <br />\n\n        {t}\n      </div>))}\n  </div>);\nexport default App;\n"},783:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),r=t(189);n.default=function(){return i.a.createElement(r.a.Group,null,[1,2,3,4].map(function(e){return i.a.createElement(r.a,{key:e,fit:"fill",width:80,height:80,shape:"thumbnail",src:"../../../images/".concat(e,"_s.jpg"),href:"../../../images/".concat(e,"_b.jpg")})}))}},784:function(e,n){e.exports="/**\n * cn - 图片组\n *    -- 一组图片可以放在 Image.Group 中\n * en - Group\n *    -- A group of images can be placed in the Image.Group .\n */\nimport React from 'react'\nimport { Image } from 'shineout'\n\nconst App: React.FC = () => (\n  <Image.Group>\n    {[1, 2, 3, 4].map(i => (\n      <Image\n        key={i}\n        fit=\"fill\"\n        width={80}\n        height={80}\n        shape=\"thumbnail\"\n        src={`../../../images/${i}_s.jpg`}\n        href={`../../../images/${i}_b.jpg`}\n      />\n    ))}\n  </Image.Group>\n)\n\nexport default App\n"},785:function(e,n){e.exports="/**\n * cn - 图片组\n *    -- 一组图片可以放在 Image.Group 中\n * en - Group\n *    -- A group of images can be placed in the Image.Group .\n */\nimport React from 'react';\nimport { Image } from 'shineout';\nconst App = () => (<Image.Group>\n    {[1, 2, 3, 4].map(i => (<Image key={i} fit=\"fill\" width={80} height={80} shape=\"thumbnail\" src={`../../../images/${i}_s.jpg`} href={`../../../images/${i}_b.jpg`}/>))}\n  </Image.Group>);\nexport default App;\n"},786:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),r=t(189);n.default=function(){return i.a.createElement(r.a.Group,{pile:!0},[1,2,3,4].map(function(e){return i.a.createElement(r.a,{key:e,fit:"fill",width:80,height:80,shape:"thumbnail",src:"../../../images/".concat(e,"_s.jpg"),href:"../../../images/".concat(e,"_b.jpg")})}))}},787:function(e,n){e.exports="/**\n * cn -\n *    -- 设置 pile 属性可以把缩略图堆叠展示\n * en -\n *    -- Set the pile property to show the image stack.\n */\nimport React from 'react'\nimport { Image } from 'shineout'\n\nconst App: React.FC = () => (\n  <Image.Group pile>\n    {[1, 2, 3, 4].map(i => (\n      <Image\n        key={i}\n        fit=\"fill\"\n        width={80}\n        height={80}\n        shape=\"thumbnail\"\n        src={`../../../images/${i}_s.jpg`}\n        href={`../../../images/${i}_b.jpg`}\n      />\n    ))}\n  </Image.Group>\n)\n\nexport default App\n"},788:function(e,n){e.exports="/**\n * cn -\n *    -- 设置 pile 属性可以把缩略图堆叠展示\n * en -\n *    -- Set the pile property to show the image stack.\n */\nimport React from 'react';\nimport { Image } from 'shineout';\nconst App = () => (<Image.Group pile>\n    {[1, 2, 3, 4].map(i => (<Image key={i} fit=\"fill\" width={80} height={80} shape=\"thumbnail\" src={`../../../images/${i}_s.jpg`} href={`../../../images/${i}_b.jpg`}/>))}\n  </Image.Group>);\nexport default App;\n"},789:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),r=t(189),o=[1,2,3,4].map(function(e){return"../../../images/".concat(e,"_b.jpg")});n.default=function(){return i.a.createElement("div",null,o.map(function(e,n){return i.a.createElement(r.a,{lazy:!0,key:n,fit:"fill",height:"66%",src:e})}))}},790:function(e,n){e.exports="/**\n * cn - 延迟加载\n *    -- lazy 属性为 true 时，图片会在进入屏幕可视区域后加载, 默认以 document 的滚动条为判断\n * en - Lazy load\n *    -- When the lazy property is true, the image will load when it enter the visual area of the screen.\n */\nimport React from 'react'\nimport { Image, TYPE } from 'shineout'\n\ntype ImageProps = TYPE.Image.Props\ntype ImageSrc = ImageProps['src']\n\nconst data: ImageSrc[] = [1, 2, 3, 4].map(i => `../../../images/${i}_b.jpg`)\n\nconst App: React.FC = () => (\n  <div>\n    {data.map((img, i) => (\n      <Image lazy key={i} fit=\"fill\" height=\"66%\" src={img} />\n    ))}\n  </div>\n)\n\nexport default App\n"},791:function(e,n){e.exports="/**\n * cn - 延迟加载\n *    -- lazy 属性为 true 时，图片会在进入屏幕可视区域后加载, 默认以 document 的滚动条为判断\n * en - Lazy load\n *    -- When the lazy property is true, the image will load when it enter the visual area of the screen.\n */\nimport React from 'react';\nimport { Image } from 'shineout';\nconst data = [1, 2, 3, 4].map(i => `../../../images/${i}_b.jpg`);\nconst App = () => (<div>\n    {data.map((img, i) => (<Image lazy key={i} fit=\"fill\" height=\"66%\" src={img}/>))}\n  </div>);\nexport default App;\n"},792:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),r=t(189),o=[1,2,3,4].map(function(e){return"../../../images/".concat(e,"_b.jpg")});n.default=function(){return i.a.createElement("div",{id:"image-container",style:{height:"300px",overflowY:"scroll"}},o.map(function(e,n){return i.a.createElement(r.a,{lazy:!0,container:"#image-container",key:n,fit:"fill",height:"66%",src:e})}))}},793:function(e,n){e.exports="/**\n * cn -\n *    -- 如果需要在特定的元素内部进行懒加载, 则需要提供一个选择器, 请确保 Image 组件渲染的时候能够通过选择器获取到指定元素.\n * en -\n *    -- If you need to lazy loading inside a specific element, you need to provide a selector, please ensure that the Image component can get the specified element through the selector when rendering.\n */\nimport React from 'react'\nimport { Image, TYPE } from 'shineout'\n\ntype ImageProps = TYPE.Image.Props\ntype ImageSrc = ImageProps['src']\n\nconst data: ImageSrc[] = [1, 2, 3, 4].map(i => `../../../images/${i}_b.jpg`)\n\nconst App: React.FC = () => (\n  <div id=\"image-container\" style={{ height: '300px', overflowY: 'scroll' }}>\n    {data.map((img, i) => (\n      <Image lazy container=\"#image-container\" key={i} fit=\"fill\" height=\"66%\" src={img} />\n    ))}\n  </div>\n)\n\nexport default App\n"},794:function(e,n){e.exports="/**\n * cn -\n *    -- 如果需要在特定的元素内部进行懒加载, 则需要提供一个选择器, 请确保 Image 组件渲染的时候能够通过选择器获取到指定元素.\n * en -\n *    -- If you need to lazy loading inside a specific element, you need to provide a selector, please ensure that the Image component can get the specified element through the selector when rendering.\n */\nimport React from 'react';\nimport { Image } from 'shineout';\nconst data = [1, 2, 3, 4].map(i => `../../../images/${i}_b.jpg`);\nconst App = () => (<div id=\"image-container\" style={{ height: '300px', overflowY: 'scroll' }}>\n    {data.map((img, i) => (<Image lazy container=\"#image-container\" key={i} fit=\"fill\" height=\"66%\" src={img}/>))}\n  </div>);\nexport default App;\n"}}]);