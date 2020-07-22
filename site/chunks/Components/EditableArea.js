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
    title: locate(
      '基本用法 \n EditableArea 默认展示一行，超过一行的内容用...代替',
      'Base \n Editablearea displays one line by default, and more than one line is replaced by ...'
    ),
    component: require('doc/pages/components/EditableArea/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-01-base.js'),
  },
  {
    name: '02-controlled',
    title: locate(
      '受控 \n 传递value, onChange使组件受控',
      'Controlled \n Pass value and onChange props to make the component controlled'
    ),
    component: require('doc/pages/components/EditableArea/example-02-controlled.js').default,
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-02-controlled.js'),
  },
  {
    name: '03-container',
    title: locate(
      '自定义容器 \n 使用 getPopupContainer 指定渲染的目标容器',
      'Custom container \n use getPopupContainer return target container'
    ),
    component: require('doc/pages/components/EditableArea/example-03-container.js').default,
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-03-container.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
