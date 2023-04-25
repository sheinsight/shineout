/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Drawer/cn.md'
import en from 'doc/pages/components/Drawer/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 最基本的组件用法。 \n Drawer 会在 document.body 中创建一个新的层显示弹出内容。 \n 关闭 Drawer 时默认没有对组件进行销毁, 只是隐藏, 组件的状态会被保留。 如果不需要保留组件之前的状态, 可以设置 destroy 属性。',
      'Base \n The basic usage for component.'
    ),
    component: require('doc/pages/components/Drawer/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-1-base.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Drawer/example-1-base.tsx'),

  },
  {
    name: '2-position',
    isTs: true,
    isTest: false,
    title: locate(
      '位置 \n 通过 position 可设置 Drawer 弹出的位置, 现支持 top、right、bottom 和 left 四个位置配置。',
      'Position \n Set position property to specify the pop-up position.'
    ),
    component: require('doc/pages/components/Drawer/example-2-position.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-2-position.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Drawer/example-2-position.tsx'),

  },
  {
    name: '3-gcontainer',
    isTs: true,
    isTest: false,
    title: locate(
      '指定目标 \n 使用 container 来指定 Drawer 渲染的目标节点',
      'Target \n set container to render target node'
    ),
    component: require('doc/pages/components/Drawer/example-3-gcontainer.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-3-gcontainer.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Drawer/example-3-gcontainer.tsx'),

  },
  {
    name: '4-form',
    isTs: true,
    isTest: false,
    title: locate(
      '表单 \n Drawer 支持 Form 表单，并且支持 Form 的所有特性，表单提交可以使用 Drawer.Submit 来代替 Button[type=submit]',
      'Form \n The internal form of Drawer can use Drawer.Submit to trigger submit.'
    ),
    component: require('doc/pages/components/Drawer/example-4-form.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-4-form.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Drawer/example-4-form.tsx'),

  },
  {
    name: '6-close',
    isTs: true,
    isTest: false,
    title: locate(
      '点击空白关闭 \n 默认点击抽屉外部空白页面会关闭抽屉。 \n 设置 maskCloseAble 属性为 false，禁用点击空白关闭，同时右上角的关闭图标也会隐藏。 \n 设置 maskCloseAble 属性为 null，禁用点击空白关闭，右上角的关闭图标会保留。',
      'Close \n By default, clicking on the blank page outside the Drawer box will closes the Drawer box. \n Set maskCloseAble to false to disable the function that click mask to close and the close icon in the upper right corner will be hidden at the same time. \n Set maskCloseAbel to null to disable the function that click mask to close and the close icon in the upper right corner will be preserved.'
    ),
    component: require('doc/pages/components/Drawer/example-6-close.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-6-close.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Drawer/example-6-close.tsx'),

  },
  {
    name: '7-full-screen',
    isTs: true,
    isTest: false,
    title: locate(
      '全屏 \n 使用 fullScreen 属性来使抽屉全屏展示',
      'Full Screen \n Use the fullScreen property to display the Drawer in full screen'
    ),
    component: require('doc/pages/components/Drawer/example-7-full-screen.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-7-full-screen.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Drawer/example-7-full-screen.tsx'),

  },
  {
    name: '8-type',
    isTs: true,
    isTest: false,
    title: locate(
      '附带图标 \n 使用 type 属性来指定标题附带的图标',
      'Icon \n use type display type icon'
    ),
    component: require('doc/pages/components/Drawer/example-8-type.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-8-type.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Drawer/example-8-type.tsx'),

  },
  {
    name: '9-hide-mask',
    isTs: true,
    isTest: false,
    title: locate(
      '隐藏遮罩 \n 使用 hideMask 属性来隐藏遮罩',
      'hide mask \n use hideMask property to hide mask'
    ),
    component: require('doc/pages/components/Drawer/example-9-hide-mask.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-9-hide-mask.tsx'),
    parseTsText: require('!raw-loader?{"compilerOptions"!doc/pages/components/Drawer/example-9-hide-mask.tsx'),

  },
]

const codes = undefined

const api = '[{"title":"Drawer","properties":[{"name":"position","tag":{"cn":"Pop-up position","en":"弹出位置","default":"\\\"right\\\"","version":""},"required":false,"type":"\\\"bottom\\\" | \\\"left\\\" | \\\"right\\\" | \\\"top\\\" "},{"name":"width","tag":{"cn":"the width of the Drawer","en":"对话框宽度, 当 position 为 \\\"right\\\" 或 \\\"left\\\" 时生效","default":"auto","version":""},"required":false,"type":"string | number "},{"name":"height","tag":{"cn":"the height of the Drawer","en":"对话框高度, 当 position 为 \\\"top\\\" 或 \\\"bottom\\\" 时生效","default":"auto","version":""},"required":false,"type":"string | number "},{"name":"hideMask","tag":{"cn":"是否隐藏遮罩","en":"Whether to hide mask","default":"false","version":""},"required":false,"type":"boolean "},{"name":"forceMask","tag":{"cn":"是否强制设置遮罩透明度（多层Modal中，除第一层外的其他弹出层遮罩透明度会被调整为0.01）","en":"Whether to force the mask transparency (in multi-layer Modal, the transparency of other Modal masks except the first layer will be adjusted to 0.01)","default":"false","version":""},"required":false,"type":"boolean "},{"name":"top","tag":{"cn":"弹框距离顶部距离","en":"Distance from top","default":"10vh","version":""},"required":false,"type":"string | number "},{"name":"fullScreen","tag":{"cn":"是否全屏展示","en":"display with full screen","default":"false","version":""},"required":false,"type":"boolean "},{"name":"bodyStyle","tag":{"cn":"扩展弹出层 body 的样式","en":"Extend pop-up body style","default":"","version":""},"required":false,"type":"CSSProperties "},{"name":"footer","tag":{"cn":"底部内容","en":"The content at the bottom","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"maskCloseAble","tag":{"cn":"点击遮罩层是否关闭对话框, 设置为 null 右上角关闭图标会保留","en":"Whether to close the mask when the mask is clicked","default":"true","version":""},"required":false,"type":"boolean | null "},{"name":"maskOpacity","tag":{"cn":"遮罩层透明度","en":"The opacity of the mask","default":"0.25","version":""},"required":false,"type":"number "},{"name":"padding","tag":{"cn":"内容内边距","en":"Padding style of the content","default":"","version":""},"required":false,"type":"string | number "},{"name":"title","tag":{"cn":"弹出层的标题","en":"the title of the pop-up layer","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"usePortal","tag":{"cn":"为 true 时，使用 ReactDOM.createPortal 创建弹出层，为 false 时，使用 ReactDOM.render。函数式调用时使用 ReactDOM.render。","en":"When the usePortal is true, use ReactDOM.createPortal to create the pop-up layer, otherwise use ReactDOM.render. Use ReactDOM.render while func call.","default":"true","version":""},"required":false,"type":"boolean "},{"name":"visible","tag":{"cn":"是否显示","en":"visible","default":"false","version":""},"required":false,"type":"boolean "},{"name":"zIndex","tag":{"cn":"弹出层 z-index 值，注意：如果嵌套 Select 组件，并且 Select 组件含有 absolute 字段，需要修改 Select 的 z-index 的值","en":"pop-up z-index","default":"1050","version":""},"required":false,"type":"number "},{"name":"rootClassName","tag":{"cn":"弹出层的根元素类名, 为遮罩层的父元素","en":"the root element of pop-up, the mask parent element","default":"","version":""},"required":false,"type":"string "},{"name":"container","tag":{"cn":"渲染的目标节点","en":"target element","default":"document.body","version":""},"required":false,"type":"HTMLElement | (() => HTMLElement) "},{"name":"moveable","tag":{"cn":"是否可移动","en":"pop-up support move","default":"false","version":""},"required":false,"type":"boolean "},{"name":"maskBackground","tag":{"cn":"遮罩背景色，设置后透明度将失效","en":"mask background","default":"","version":""},"required":false,"type":"string "},{"name":"onClose","tag":{"cn":"弹出层关闭回调","en":"pop-up close callback","default":"","version":""},"required":false,"type":"(() => void) "},{"name":"destroy","tag":{"cn":"关闭时是否销毁元素","en":"Whether to destroy elements when it is closed","default":"false","version":""},"required":false,"type":"boolean "},{"name":"hideClose","tag":{"cn":"是否隐藏关闭按钮","en":"hide the close button","default":"","version":""},"required":false,"type":"boolean "},{"name":"type","tag":{"cn":"弹出层 title 显示状态 icon","en":"pop-up Title show status icon","default":"","version":""},"required":false,"type":"\\\"success\\\" | \\\"info\\\" | \\\"warning\\\" | \\\"error\\\" | \\\"default\\\" | \\\"normal\\\" "},{"name":"zoom","tag":{"cn":"是否开启 zoom 动画效果","en":"toggle zoom animation","default":"false","version":""},"required":false,"type":"boolean "},{"name":"esc","tag":{"cn":"是否支持 esc 键关闭","en":"press \\\"esc\\\" to close","default":"true","version":""},"required":false,"type":"boolean "},{"name":"events","tag":{"cn":"外层元素所接受的事件列表，可用于在 createPortal 场景中阻止冒泡","en":"events list of container element","default":"{}","version":""},"required":false,"type":"object "},{"name":"resizable","tag":{"cn":"是否可调整大小","en":"can resize","default":"false","version":""},"required":false,"type":"boolean "},{"name":"noPadding","tag":{"cn":"当 Sheinout 采用 antd 主题时，取消内容区域的 padding","en":"When the theme is antd, Set the content style padding to 0","default":"","version":""},"required":false,"type":"boolean "},{"name":"children","tag":{"cn":"弹出层内容","en":"pop-up children","default":"","version":""},"required":false,"type":"ReactNode"},{"name":"className","tag":{"cn":"扩展 className","en":"extend className","default":"","version":""},"required":false,"type":"string "},{"name":"style","tag":{"cn":"最外层扩展样式","en":"Container element style","default":"","version":""},"required":false,"type":"CSSProperties "}],"cn":"","en":""}]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
