/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/EditableArea/cn.md'
import en from 'doc/pages/components/EditableArea/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    isTs: false,

    title: locate(
      '基本用法 \n EditableArea 默认展示一行，超过一行的内容用...代替',
      'Base \n Editablearea displays one line by default, and more than one line is replaced by ...'
    ),
    component: require('doc/pages/components/EditableArea/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-01-base.js'),

  },
  {
    name: '02-controlled',
    isTs: false,

    title: locate(
      '受控 \n 传递value, onChange使组件受控',
      'Controlled \n Pass value and onChange props to make the component controlled'
    ),
    component: require('doc/pages/components/EditableArea/example-02-controlled.js').default,
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-02-controlled.js'),

  },
  {
    name: '03-container',
    isTs: false,

    title: locate(
      '自定义容器 \n 在内滚容器中使用此组件，可使用 getPopupContainer 指定渲染的目标容器，使之随之滚动',
      'Custom container \n use getPopupContainer return target container'
    ),
    component: require('doc/pages/components/EditableArea/example-03-container.js').default,
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-03-container.js'),

  },
  {
    name: '04-renderFooter',
    isTs: false,

    title: locate(
      '渲染 textarea footer \n 在输入框内嵌入标题',
      'RenderFooter \n render textarea footer'
    ),
    component: require('doc/pages/components/EditableArea/example-04-renderFooter.js').default,
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-04-renderFooter.js'),

  },
  {
    name: '05-renderResult',
    isTs: false,

    title: locate(
      '自定义显示结果 \n 自定义显示结果',
      'RenderResult \n Customize display results'
    ),
    component: require('doc/pages/components/EditableArea/example-05-renderResult.js').default,
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-05-renderResult.js'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
