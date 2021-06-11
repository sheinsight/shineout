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
    title: locate(
      '基本用法 \n 最基本的组件用法。 \n Modal 会在 document.body 中创建一个新的层显示弹出内容。 \n 关闭 modal 时没有对组件进行销毁, 只是隐藏, 组件的状态会被保留。 如果不需要保留组件之前的状态, 可以通过改变 modal 的 key 去实现。',
      'Base \n The basic usage for component.'
    ),
    component: require('doc/pages/components/Modal/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-1-base.js'),
  },
  {
    name: '2-special',
    title: locate(
      '类型 \n Modal 内置了 4 个类型的样式：info（纯信息展示，不带有状态）、Success、Warn 和 Error，为了方便调用，设计为静态函数。',
      'Type \n Modal has 4 built in style.'
    ),
    component: require('doc/pages/components/Modal/example-2-special.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-2-special.js'),
  },
  {
    name: '3-confirm',
    title: locate(
      '确认框 \n 调用 confirm 函数可以快捷的显示确认框，便于用户操作；同时可以通过 text 配置 Modal 按钮文案，onOk 与 onClose 配置 Modal 确认和取消事件回调（当事件返回 Promise 时会等待 Promise resolve 后关闭 Modal）',
      'Confirm \n The confirmation modal dialog.'
    ),
    component: require('doc/pages/components/Modal/example-3-confirm.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-3-confirm.js'),
  },
  {
    name: '3-focus',
    title: locate(
      '默认聚焦按钮 \n 设置 autoFocusButton 可以在打开的时候默认聚焦到某个按钮, 再点击回车可以触发改按钮的点击事件, 方便用户进行键盘操作. 该属性仅在 Modal的 methods 中生效.',
      'Default focus button \n Setting autoFocusButton can focus on a button by default when you open it, and then press Enter to trigger the click event of the button, which is convenient for the user to perform keyboard operation. This property only takes effect in Modal methods'
    ),
    component: require('doc/pages/components/Modal/example-3-focus.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-3-focus.js'),
  },
  {
    name: '3-full-screen',
    title: locate(
      '全屏 \n 使用 fullScreen 属性来使对话框全屏展示',
      'Full Screen \n Use the fullScreen property to display the modal in full screen'
    ),
    component: require('doc/pages/components/Modal/example-3-full-screen.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-3-full-screen.js'),
  },
  {
    name: '3-gcontainer',
    title: locate(
      '指定目标 \n 使用 container 来指定 Modal 渲染的目标节点',
      'Target \n set container to render target node'
    ),
    component: require('doc/pages/components/Modal/example-3-gcontainer.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-3-gcontainer.js'),
  },
  {
    name: '4-form',
    title: locate(
      '表单 \n Modal 支持 Form 表单，并且支持 Form 的所有特性，表单提交可以使用 Modal.Submit 来代替 Button[type=submit]',
      'Form \n The internal form of Modal can use Modal.Submit to trigger submit.'
    ),
    component: require('doc/pages/components/Modal/example-4-form.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-4-form.js'),
  },
  {
    name: '4-moveable',
    title: locate(
      '可移动/伸缩 \n 设置 moveable 来使 Modal 可以按住头部移动, 设置 resizable 来自由调整 Modal 大小',
      'Moveable/resizable \n set moveable mark modal move by header, set resizable to resize modal'
    ),
    component: require('doc/pages/components/Modal/example-4-moveable.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-4-moveable.js'),
  },
  {
    name: '5-multistage',
    title: locate(
      '多层 Modal \n 支持多层叠加 Modal',
      'Multistage \n Multi-layer Modal'
    ),
    component: require('doc/pages/components/Modal/example-5-multistage.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-5-multistage.js'),
  },
  {
    name: '6-close',
    title: locate(
      '点击空白关闭 \n 默认点击对话框外部空白页面会关闭对话框。 \n 设置 maskCloseAble 属性为 false，禁用点击空白关闭，同时右上角的关闭图标也会隐藏。 \n 设置 maskCloseAble 属性为 null，禁用点击空白关闭，右上角的关闭图标会保留。',
      'Close \n By default, clicking on the blank page outside the Modal box will closes the Modal box. \n Set maskCloseAble to false to disable the function that click mask to close and the close icon in the upper right corner will be hidden at the same time. \n Set maskCloseAbel to null to disable the function that click mask to close and the close icon in the upper right corner will be preserved.'
    ),
    component: require('doc/pages/components/Modal/example-6-close.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-6-close.js'),
  },
  {
    name: '7-position',
    title: locate(
      '位置（抽屉） \n 通过 position 可设置 Modal 弹出的位置，这时 Modal 就如 Drawer 一样。现支持 top、right、bottom 和 left 四个位置配置。',
      'Position \n Set position property to specify the pop-up position.'
    ),
    component: require('doc/pages/components/Modal/example-7-position.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-7-position.js'),
  },
  {
    name: '8-type',
    title: locate(
      '类型 \n 使用 type 属性来指定标题附带的图标',
      'type attribute \n use type display type icon'
    ),
    component: require('doc/pages/components/Modal/example-8-type.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-8-type.js'),
  },
  {
    name: '9-zoom',
    title: locate(
      '缩放动画 \n 设置 zoom 属性来开启缩放动画',
      'Zoom \n Set the zoom property to enable zoom animation'
    ),
    component: require('doc/pages/components/Modal/example-9-zoom.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-9-zoom.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
