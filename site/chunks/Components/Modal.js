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
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Modal/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-1-base.js'),
  },
  {
    name: '2-special',
    title: locate('使用api', 'use api'),
    component: require('doc/pages/components/Modal/example-2-special.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-2-special.js'),
  },
  {
    name: '3-confirm',
    title: locate('确认框', 'Confirm Modal'),
    component: require('doc/pages/components/Modal/example-3-confirm.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-3-confirm.js'),
  },
  {
    name: '4-form',
    title: locate('内嵌form', 'use form'),
    component: require('doc/pages/components/Modal/example-4-form.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-4-form.js'),
  },
  {
    name: '5-multistage',
    title: locate('多级modal', 'Multistage Modal'),
    component: require('doc/pages/components/Modal/example-5-multistage.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-5-multistage.js'),
  },
  {
    name: '6-close',
    title: locate('点击空白关闭 \n 默认点击对话框外部空白页面会关闭对话框。 \n 设置 maskCloseAble 属性为 false，禁用点击空白关闭，同时右上角的关闭图标也会隐藏。 \n 设置 maskCloseAble 属性为 null，禁用点击空白关闭，右上角的关闭图标会保留。', 'MaskCloseAble'),
    component: require('doc/pages/components/Modal/example-6-close.js').default,
    rawText: require('!raw-loader!doc/pages/components/Modal/example-6-close.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
