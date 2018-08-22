/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Textarea/cn.md'
import en from 'doc/pages/components/Textarea/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法 \n 多行文本输入框', 'Base \n Multi-line text input box'),
    component: require('doc/pages/components/Textarea/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Textarea/example-1-base.js'),
  },
  {
    name: '2-autosize',
    title: locate('自适应高度 \n autosize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可', 'Autosize \n When the autosize property is true, component will change height to fit the content. Set maxHeight to limit maximum height.'),
    component: require('doc/pages/components/Textarea/example-2-autosize.js').default,
    rawText: require('!raw-loader!doc/pages/components/Textarea/example-2-autosize.js'),
  },
  {
    name: '3-info',
    title: locate('信息 \n 设置 info 属性后，用户 focus 时显示 info 函数执行的结果，例如用户已输入文字长度。 \n 如果 info 返回类型为 Error，不会隐藏。', 'Info \n The result of the info function is displayed when you focus.'),
    component: require('doc/pages/components/Textarea/example-3-info.js').default,
    rawText: require('!raw-loader!doc/pages/components/Textarea/example-3-info.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
