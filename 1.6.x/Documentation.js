(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[20],{1675:function(t,e,n){"use strict";n.r(e);var i=n(25),o=n(559),a=n(593),s=["API",{name:"Props",cn:"约定",level:2,component:Object(o.a)(function(){return n.e(5).then(n.t.bind(null,621,7))},!0)},{name:"Classname",level:2,component:Object(o.a)(function(){return n.e(6).then(n.t.bind(null,622,7))},!0)},"CHANGELOG"].concat(Object(i.a)(["1.x.x"].map(function(t){return{name:t,level:2,component:Object(o.a)(function(){return n(720)("./".concat("changelog","/").concat(t,".md"))},!0)}})));e.default=Object(a.a)(s)},299:function(t,e,n){"use strict";var i=n(12),c=n(27),o=n(4),a=n(5),s=n(1),r=n(23),l=n(6),h=n(7),d=n(2),u=n(0),m=n.n(u),p=n(17),P=n(34),f=n(77),b=n(29),g=n(21),x=n(24),v=n(586);function y(i){return function(){var t,e=Object(d.a)(i);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}()){var n=Object(d.a)(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return Object(h.a)(this,t)}}var w=["scroll","pageshow","load"],C=Object(P.cssSupport)("position","sticky"),E=function(t){Object(l.a)(i,t);var n=y(i);function i(t){var e;return Object(o.a)(this,i),(e=n.call(this,t)).state={},e.bindElement=e.bindElement.bind(Object(s.a)(e)),e.bindOrigin=e.bindOrigin.bind(Object(s.a)(e)),e.bindPlaceholder=e.bindPlaceholder.bind(Object(s.a)(e)),e.handlePosition=e.handlePosition.bind(Object(s.a)(e)),e.style={},e}return Object(a.a)(i,[{key:"componentDidMount",value:function(){Object(r.a)(Object(d.a)(i.prototype),"componentDidMount",this).call(this);var t=this.props.target;this.targetElement=Object(P.getParent)(this.element,t),this.handlePosition(),this.bindScroll()}},{key:"componentDidUpdate",value:function(t){!t.needResetPostion&&this.props.needResetPostion&&this.setPosition()}},{key:"componentWillUnmount",value:function(){Object(r.a)(Object(d.a)(i.prototype),"componentWillUnmount",this).call(this),this.unbindScroll(),this.scrollTimer&&clearTimeout(this.scrollTimer)}},{key:"getStyle",value:function(t,e,n,i){var o,a=this.props.style.zIndex,s=void 0===a?900:a,r=this.props.css,l=(o={position:"fixed",left:n,width:i},Object(c.a)(o,t,e),Object(c.a)(o,"zIndex",s),o);return this.targetElement&&(C&&r?l.position="sticky":(l.position="absolute",l.transform="translateY(".concat("top"===t?e+this.targetElement.scrollTop:this.targetElement.scrollTop,"px)"),delete l.left)),this.triggerChange(!0,l),l}},{key:"setPosition",value:function(){var t=this.props,e=t.bottom,n=t.top,i=t.target,o=t.css,a=t.needResetPostion,s=this.state,r=s.mode,l=s.scrollWidth;if(!1!==a){var c=Object(P.copyBoundingClientRect)(this.element),h=getComputedStyle(this.element),d=h.marginBottom,u=h.marginTop;c.height+=parseFloat(d)+parseFloat(u);var m=this.targetElement||document.body,p=m.getBoundingClientRect(),f=this.placeholder?Object(P.copyBoundingClientRect)(this.placeholder):null,b=x.docSize.height;if(this.origin){var g=this.origin.getBoundingClientRect().width;c.width=g,f&&(f.width=g)}var v,y,w={width:c.width,height:i&&C&&o?0:c.height},E=n,O=b-e;if(this.targetElement){var j=getComputedStyle(m),S=j.paddingTop,k=j.paddingBottom;E+=p.top+parseInt(S,10),O=p.bottom-e-parseInt(k,10)}void 0!==n&&"bottom"!==r&&(Math.ceil(c.top)<E?(this.setState({scrollWidth:p.width,mode:"top"}),v=this.getStyle("top",n,c.left,c.width),y=w):f&&c.top<f.top?(p.width!==c.width&&(v=this.getStyle("top",n,c.left,p.width)),i&&c.top===E||(this.setState({mode:""}),v={},y=null,this.triggerChange(!1,v))):this.targetElement&&f?(v=this.getStyle("top",n,c.left,c.width),y=w):l&&f&&l!==p.width&&(this.setState({scrollWidth:p.width,mode:"top"}),v=this.getStyle("top",n,f.left,f.width),y=w)),void 0!==e&&"top"!==r&&(c.bottom>O?(this.setState({scrollWidth:p.width,mode:"bottom"}),v=this.getStyle("bottom",e,c.left,c.width),y=w):f&&(this.targetElement?p.bottom:c.bottom)>f.bottom?(p.width!==c.width&&(v=this.getStyle("bottom",e,c.left,p.width)),i&&c.bottom===O||(this.setState({mode:""}),v={},y=null,this.triggerChange(!1,v))):this.targetElement&&f?(v=this.getStyle("bottom",e,c.left,c.width),y=w):l&&f&&l!==p.width&&(this.setState({scrollWidth:p.width,mode:"bottom"}),v=this.getStyle("bottom",e,f.left,f.width),y=w)),void 0!==y&&this.setState({placeholder:y}),v&&(this.style=v,this.setState({style:v}))}}},{key:"triggerChange",value:function(t,e){var n=this.props.onChange;e.position!==this.style.position&&"function"==typeof n&&n(t)}},{key:"handlePosition",value:function(){var t=this,e=this.props.css;this.locked&&e?this.scrollCount+=1:(this.locked=!0,this.scrollCount=0,this.setPosition(),this.scrollTimer=setTimeout(function(){t.locked=!1,0<t.scrollCount&&t.handlePosition()},48))}},{key:"bindElement",value:function(t){this.element=t}},{key:"bindOrigin",value:function(t){this.origin=t}},{key:"bindPlaceholder",value:function(t){this.placeholder=t}},{key:"bindScroll",value:function(){var e=this;this.targetElement?this.targetElement.addEventListener("scroll",this.handlePosition,f.eventPassive):w.forEach(function(t){window.addEventListener(t,e.handlePosition)}),window.addEventListener("resize",this.handlePosition)}},{key:"unbindScroll",value:function(){var e=this;this.targetElement?this.targetElement.removeEventListener("scroll",this.handlePosition):w.forEach(function(t){window.removeEventListener(t,e.handlePosition)}),window.removeEventListener("resize",this.handlePosition)}},{key:"render",value:function(){var t=this.props,e=t.children,n=t.className,i=t.target,o=t.css,a=this.state.placeholder,s=this.props.style,r=this.state.style;return i&&C&&o&&(s=Object.assign({},s,r),r={}),m.a.createElement("div",{style:s,className:n},m.a.createElement("div",{ref:this.bindElement,style:Object.assign({},r,{display:"flow-root"})},e),m.a.createElement("div",{ref:this.bindOrigin}),a&&m.a.createElement("div",{ref:this.bindPlaceholder,style:a}))}}]),i}(p.b);E.defaultProps=Object(i.a)(Object(i.a)({},b.a),{},{css:!0}),E.displayName="ShineoutSticky",e.a=Object(g.compose)(v.b)(E)},586:function(t,e,n){"use strict";n.d(e,"a",function(){return r}),n.d(e,"b",function(){return l});var i=n(0),o=n.n(i),a=n(37),s=Object(a.a)(),r=s.Provider,l=function(n){return function(e){return o.a.createElement(s.Consumer,null,function(t){return o.a.createElement(n,Object.assign({},e,t))})}}},593:function(t,e,n){"use strict";var h=n(28),d=n(0),u=n.n(d),m=n(108),p=n(87),f=n(299),b=n(40),g=n(193),v=n(19),y=n(188),w=["Datum.Form","Datum.List"];function E(t,e){return""===e.path?t:"".concat(t,"/").concat(e.path||e.name)}e.a=function(c){return function(t){var n=t.match.url,e=c.find(function(t){return"string"!=typeof t}),i=(t.history.location||{search:""}).search;0===i.indexOf("?example=")&&i.replace("?example=","");var o=Object(d.useState)(window.innerWidth<979),a=Object(h.a)(o,2),s=a[0],r=a[1],l=function(){if(!(979<window.innerWidth)){var t=document.querySelector("#-shineout-menu"),e=!s;e?(r(e),setTimeout(function(){t&&(t.style.display="none")},400)):(setTimeout(function(){return r(e)},16),t&&(t.style.display="block"))}};return Object(d.useEffect)(function(){var t=function(){r(window.innerWidth<979)};return window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}},[]),u.a.createElement(d.Fragment,null,u.a.createElement("div",{tabIndex:"-1",className:Object(v.g)("nav-open-close")},u.a.createElement(y.a,{name:s?"Menu":"close",onClick:l})),u.a.createElement(f.a,{top:0,className:Object(v.g)("menu-sticky-wrap")},u.a.createElement("div",{id:"-shineout-menu",className:Object(v.g)("menu",s&&"hidden")},c.filter(function(t){return-1===w.indexOf(t.name)}).map(function(t,e){return"string"==typeof t?u.a.createElement("label",{key:e},t):u.a.createElement(m.b,{className:Object(v.g)(2===t.level&&"sub"),activeClassName:Object(v.g)("active"),key:t.name,to:E(n,t),onClick:l},u.a.createElement("p",null,t.name,u.a.createElement("span",{style:{margin:"0 0 0 6px"}},Object(b.b)(t.cn))))}))),u.a.createElement("div",{className:Object(v.g)("page")},u.a.createElement(d.Suspense,{fallback:u.a.createElement(g.a,null)},u.a.createElement(p.d,null,u.a.createElement(p.a,{from:n,exact:!0,to:E(n,e)}),c.filter(function(t){return"object"==typeof t}).map(function(t){return u.a.createElement(p.b,{key:t.name+i,path:E(n,t),component:t.component,onEnter:function(){l.bind(null)}})})))))}}},720:function(t,e,i){var o={"./api-classname.md":[622,6],"./api-props.md":[621,5],"./changelog-rc/1.x.x.md":[1670,59],"./changelog/0.x.x.md":[1668,57],"./changelog/1.x.x.md":[1669,58]};function n(e){var n=o[e];return n?i.e(n[1]).then(function(){var t=n[0];return i.t(t,7)}):Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t})}n.keys=function(){return Object.keys(o)},n.id=720,t.exports=n}}]);