/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import locate from 'doc/locate'

import cn from 'doc/pages/components/Pagination/cn.md'
import en from 'doc/pages/components/Pagination/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Pagination/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-1-base.js'),
  },
  {
    title: locate('小型分页', 'Small Size'),
    component: require('doc/pages/components/Pagination/example-2-size.js').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-2-size.js'),
  },
  {
    title: locate('布局 \n 通过 layout 来控制组件是否显示以及显示的位置', 'Layout'),
    component: require('doc/pages/components/Pagination/example-3-layout.js').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-3-layout.js'),
  },
  {
    title: locate('文字 \n 通过 text 替换文字', 'Text'),
    component: require('doc/pages/components/Pagination/example-4-text.js').default,
    rawText: require('!raw-loader!doc/pages/components/Pagination/example-4-text.js'),
  },
]

export default navable(props => <MarkDown {...props} source={source} examples={examples} />)
