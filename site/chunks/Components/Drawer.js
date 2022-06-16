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
    name: '1-base.tsx',
    isTs: true,
    title: locate(
      '基本用法 \n 最基本的组件用法。 \n Drawer 会在 document.body 中创建一个新的层显示弹出内容。 \n 关闭 Drawer 时默认没有对组件进行销毁, 只是隐藏, 组件的状态会被保留。 如果不需要保留组件之前的状态, 可以设置 destroy 属性。',
      'Base \n The basic usage for component.'
    ),
    component: require('doc/pages/components/Drawer/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Drawer/example-1-base.tsx'),

  },
  {
    name: '2-position',
    isTs: false,
    title: locate(
      '位置 \n 通过 position 可设置 Drawer 弹出的位置, 现支持 top、right、bottom 和 left 四个位置配置。',
      'Position \n Set position property to specify the pop-up position.'
    ),
    component: require('doc/pages/components/Drawer/example-2-position.js').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-2-position.js'),

  },
  {
    name: '3-gcontainer',
    isTs: false,
    title: locate(
      '指定目标 \n 使用 container 来指定 Drawer 渲染的目标节点',
      'Target \n set container to render target node'
    ),
    component: require('doc/pages/components/Drawer/example-3-gcontainer.js').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-3-gcontainer.js'),

  },
  {
    name: '4-form',
    isTs: false,
    title: locate(
      '表单 \n Drawer 支持 Form 表单，并且支持 Form 的所有特性，表单提交可以使用 Drawer.Submit 来代替 Button[type=submit]',
      'Form \n The internal form of Drawer can use Drawer.Submit to trigger submit.'
    ),
    component: require('doc/pages/components/Drawer/example-4-form.js').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-4-form.js'),

  },
  {
    name: '6-close',
    isTs: false,
    title: locate(
      '点击空白关闭 \n 默认点击抽屉外部空白页面会关闭抽屉。 \n 设置 maskCloseAble 属性为 false，禁用点击空白关闭，同时右上角的关闭图标也会隐藏。 \n 设置 maskCloseAble 属性为 null，禁用点击空白关闭，右上角的关闭图标会保留。',
      'Close \n By default, clicking on the blank page outside the Drawer box will closes the Drawer box. \n Set maskCloseAble to false to disable the function that click mask to close and the close icon in the upper right corner will be hidden at the same time. \n Set maskCloseAbel to null to disable the function that click mask to close and the close icon in the upper right corner will be preserved.'
    ),
    component: require('doc/pages/components/Drawer/example-6-close.js').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-6-close.js'),

  },
  {
    name: '7-full-screen',
    isTs: false,
    title: locate(
      '全屏 \n 使用 fullScreen 属性来使抽屉全屏展示',
      'Full Screen \n Use the fullScreen property to display the Drawer in full screen'
    ),
    component: require('doc/pages/components/Drawer/example-7-full-screen.js').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-7-full-screen.js'),

  },
  {
    name: '8-type',
    isTs: false,
    title: locate(
      '附带图标 \n 使用 type 属性来指定标题附带的图标',
      'Icon \n use type display type icon'
    ),
    component: require('doc/pages/components/Drawer/example-8-type.js').default,
    rawText: require('!raw-loader!doc/pages/components/Drawer/example-8-type.js'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
