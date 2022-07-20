/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Alert/cn.md'
import en from 'doc/pages/components/Alert/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 基本的使用',
      'Base \n Basic usage'
    ),
    component: require('doc/pages/components/Alert/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Alert/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Alert/example-1-base.tsx'),

  },
  {
    name: '2-type',
    isTs: true,
    isTest: false,
    title: locate(
      '类型 \n 内置了 4 种类型（样式），[success, info, warning, danger]，默认为 warning',
      'type \n There are four built-in types (styles), [success, info, warning, danger], the default value is warning.'
    ),
    component: require('doc/pages/components/Alert/example-2-type.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Alert/example-2-type.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Alert/example-2-type.tsx'),

  },
  {
    name: '3-close',
    isTs: true,
    isTest: false,
    title: locate(
      '关闭 \n 设置 onClose 属性时，显示关闭按钮 \n onClose 为 true 时，只关闭提示，不处理 \n onClose 为函数时，关闭后调用此函数',
      'onClose \n When the onClose property is set, the close button is displayed. \n When the onClose property is true, only hide the component. \n When the onClose is a function, call this function after hiding it.'
    ),
    component: require('doc/pages/components/Alert/example-3-close.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Alert/example-3-close.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Alert/example-3-close.tsx'),

  },
  {
    name: '4-icon',
    isTs: true,
    isTest: false,
    title: locate(
      '内置图标 \n 设置 icon 属性可以显示内置的图标，不同类型的图标见示例',
      'Icon \n Set the icon property to display the built-in icon.'
    ),
    component: require('doc/pages/components/Alert/example-4-icon.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Alert/example-4-icon.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Alert/example-4-icon.tsx'),

  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
