/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Modal/cn.md'
import en from 'doc/pages/components/Modal/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 最基本的组件用法。 \n Modal 会在 document.body 中创建一个新的层显示弹出内容。',
      'Base \n The basic usage for component.'
    ),
    component: require('doc/pages/components/Modal/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Modal/example-1-base.tsx'),

  },
  {
    name: '10-noPadding',
    isTs: true,
    isTest: false,
    title: locate(
      '无边距 \n 取消内容区域的padding。在 antd 主题下可见具体效果，sheinout主题本无边距。',
      'NoPadding \n Set the content style padding to 0'
    ),
    component: require('doc/pages/components/Modal/example-10-noPadding.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-10-noPadding.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Modal/example-10-noPadding.tsx'),

  },
  {
    name: '2-special',
    isTs: true,
    isTest: false,
    title: locate(
      '类型 \n Modal 内置了 4 个类型的样式：info（纯信息展示，不带有状态）、Success、Warn 和 Error，为了方便调用，设计为静态函数。',
      'Type \n Modal has 4 built in style.'
    ),
    component: require('doc/pages/components/Modal/example-2-special.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-2-special.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Modal/example-2-special.tsx'),

  },
  {
    name: '3-confirm',
    isTs: true,
    isTest: false,
    title: locate(
      '确认框 \n 调用 confirm 函数可以快捷的显示确认框，便于用户操作；同时可以通过 text 配置 Modal 按钮文案，onOk 与 onClose 配置 Modal 确认和取消事件回调（当事件返回 Promise 时会等待 Promise resolve 后关闭 Modal）',
      'Confirm \n The confirmation modal dialog.'
    ),
    component: require('doc/pages/components/Modal/example-3-confirm.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-3-confirm.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Modal/example-3-confirm.tsx'),

  },
  {
    name: '3-focus',
    isTs: true,
    isTest: false,
    title: locate(
      '默认聚焦按钮 \n 设置 autoFocusButton 可以在打开的时候默认聚焦到某个按钮, 再点击回车可以触发改按钮的点击事件, 方便用户进行键盘操作. 该属性仅在 Modal的 methods 中生效.',
      'Default focus button \n Setting autoFocusButton can focus on a button by default when you open it, and then press Enter to trigger the click event of the button, which is convenient for the user to perform keyboard operation. This property only takes effect in Modal methods'
    ),
    component: require('doc/pages/components/Modal/example-3-focus.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-3-focus.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Modal/example-3-focus.tsx'),

  },
  {
    name: '3-full-screen',
    isTs: true,
    isTest: false,
    title: locate(
      '全屏 \n 使用 fullScreen 属性来使对话框全屏展示',
      'Full Screen \n Use the fullScreen property to display the modal in full screen'
    ),
    component: require('doc/pages/components/Modal/example-3-full-screen.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-3-full-screen.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Modal/example-3-full-screen.tsx'),

  },
  {
    name: '3-gcontainer',
    isTs: true,
    isTest: false,
    title: locate(
      '指定目标 \n 使用 container 来指定 Modal 渲染的目标节点',
      'Target \n set container to render target node'
    ),
    component: require('doc/pages/components/Modal/example-3-gcontainer.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-3-gcontainer.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Modal/example-3-gcontainer.tsx'),

  },
  {
    name: '4-form',
    isTs: true,
    isTest: false,
    title: locate(
      '表单 \n Modal 支持 Form 表单，并且支持 Form 的所有特性，表单提交可以使用 Modal.Submit 来代替 Button[type=submit]',
      'Form \n The internal form of Modal can use Modal.Submit to trigger submit.'
    ),
    component: require('doc/pages/components/Modal/example-4-form.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-4-form.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Modal/example-4-form.tsx'),

  },
  {
    name: '4-moveable',
    isTs: true,
    isTest: false,
    title: locate(
      '可移动/伸缩 \n 设置 moveable 来使 Modal 可以按住头部移动, 设置 resizable 来自由调整 Modal 大小',
      'Moveable/resizable \n set moveable mark modal move by header, set resizable to resize modal'
    ),
    component: require('doc/pages/components/Modal/example-4-moveable.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-4-moveable.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Modal/example-4-moveable.tsx'),

  },
  {
    name: '5-multistage',
    isTs: true,
    isTest: false,
    title: locate(
      '多层 Modal \n 支持多层叠加 Modal',
      'Multistage \n Multi-layer Modal'
    ),
    component: require('doc/pages/components/Modal/example-5-multistage.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-5-multistage.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Modal/example-5-multistage.tsx'),

  },
  {
    name: '6-close',
    isTs: true,
    isTest: false,
    title: locate(
      '点击空白关闭 \n 默认点击对话框外部空白页面会关闭对话框。 \n 设置 maskCloseAble 属性为 false，禁用点击空白关闭，同时右上角的关闭图标也会隐藏。 \n 设置 maskCloseAble 属性为 null，禁用点击空白关闭，右上角的关闭图标会保留。',
      'Close \n By default, clicking on the blank page outside the Modal box will closes the Modal box. \n Set maskCloseAble to false to disable the function that click mask to close and the close icon in the upper right corner will be hidden at the same time. \n Set maskCloseAbel to null to disable the function that click mask to close and the close icon in the upper right corner will be preserved.'
    ),
    component: require('doc/pages/components/Modal/example-6-close.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-6-close.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Modal/example-6-close.tsx'),

  },
  {
    name: '7-position',
    isTs: true,
    isTest: false,
    title: locate(
      '位置（抽屉） \n 通过 position 可设置 Modal 弹出的位置，这时 Modal 就如 Drawer 一样。现支持 top、right、bottom 和 left 四个位置配置。',
      'Position \n Set position property to specify the pop-up position.'
    ),
    component: require('doc/pages/components/Modal/example-7-position.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-7-position.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Modal/example-7-position.tsx'),

  },
  {
    name: '8-type',
    isTs: true,
    isTest: false,
    title: locate(
      '附带图标 \n 使用 type 属性来指定标题附带的图标',
      'Icon \n use type display type icon'
    ),
    component: require('doc/pages/components/Modal/example-8-type.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-8-type.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Modal/example-8-type.tsx'),

  },
  {
    name: '9-zoom',
    isTs: true,
    isTest: false,
    title: locate(
      '缩放动画 \n 设置 zoom 属性来开启缩放动画',
      'Zoom \n Set the zoom property to enable zoom animation'
    ),
    component: require('doc/pages/components/Modal/example-9-zoom.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-9-zoom.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Modal/example-9-zoom.tsx'),

  },
]

const codes = undefined

const api = '[]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
