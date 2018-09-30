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
    title: locate('基本用法 \n 最基本的组件用法。 \n Modal 会在 document.body 中创建一个新的层显示弹出内容。', 'Base \n The basic usage for component.'),
    component: require('doc/pages/components/Modal/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-1-base.js'),
  },
  {
    name: '2-special',
    title: locate('类型 \n Modal 内置了 4 个类型的样式，为了方便调用，设计为静态函数', 'Type \n Modal has 4 built in style.'),
    component: require('doc/pages/components/Modal/example-2-special.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-2-special.js'),
  },
  {
    name: '3-confirm',
    title: locate('确认框 \n 调用 confirm 函数显示确认框。', 'Confirm \n The confirmation modal dialog.'),
    component: require('doc/pages/components/Modal/example-3-confirm.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-3-confirm.js'),
  },
  {
    name: '4-form',
    title: locate('表单 \n Modal 内部的表单，可以用 Modal.Submit 来代替 Button', 'Form \n The internal form of Modal can use Modal.Submit to trigger submit.'),
    component: require('doc/pages/components/Modal/example-4-form.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-4-form.js'),
  },
  {
    name: '5-multistage',
    title: locate('多层 Modal \n 支持多层 Modal', 'Multistage \n Multi-layer Modal'),
    component: require('doc/pages/components/Modal/example-5-multistage.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-5-multistage.js'),
  },
  {
    name: '6-close',
    title: locate('点击空白关闭 \n 默认点击对话框外部空白页面会关闭对话框。 \n 设置 maskCloseAble 属性为 false，禁用点击空白关闭，同时右上角的关闭图标也会隐藏。 \n 设置 maskCloseAble 属性为 null，禁用点击空白关闭，右上角的关闭图标会保留。', 'Close \n By default, clicking on the blank page outside the Modal box will closes the Modal box. \n Set maskCloseAble to false to disable the function that click mask to close and the close icon in the upper right corner will be hidden at the same time. \n Set maskCloseAbel to null to disable the function that click mask to close and the close icon in the upper right corner will be preserved.'),
    component: require('doc/pages/components/Modal/example-6-close.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-6-close.js'),
  },
  {
    name: '7-position',
    title: locate('位置 \n 通过position设置弹出位置。', 'Position \n Set position property to specify the pop-up position.'),
    component: require('doc/pages/components/Modal/example-7-position.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-7-position.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
