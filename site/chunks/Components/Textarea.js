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
    isTs: true,
    isTest: false,
    title: locate(
      '基本用法 \n 多行文本输入框',
      'Base \n Multi-line text input box'
    ),
    component: require('doc/pages/components/Textarea/example-1-base.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Textarea/example-1-base.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Textarea/example-1-base.tsx'),

  },
  {
    name: '2-autosize',
    isTs: true,
    isTest: false,
    title: locate(
      '自适应高度 \n autosize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可',
      'Autosize \n When the autosize property is true, component will change height to fit the content. Set maxHeight to limit maximum height.'
    ),
    component: require('doc/pages/components/Textarea/example-2-autosize.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Textarea/example-2-autosize.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Textarea/example-2-autosize.tsx'),

  },
  {
    name: '3-info',
    isTs: true,
    isTest: false,
    title: locate(
      '信息 \n 设置 info 为数字, 设定最大长度，用户 focus 时会显示用户已输入文字长度。 \n 如果超出长度， 则会报错. 不会隐藏。',
      'Info \n Set info to number, set the maximum length, and the user\'s focus shows the length of text that the user has entered. \n If the length is exceeded, the error is reported. It is not hidden.'
    ),
    component: require('doc/pages/components/Textarea/example-3-info.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Textarea/example-3-info.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Textarea/example-3-info.tsx'),

  },
  {
    name: '4-custom',
    isTs: true,
    isTest: false,
    title: locate(
      '自定义信息 \n 可以通过设置 info 为函数去自定义提示信息 \n 如果 info 返回类型为 Error，不会隐藏。',
      'Custom Info \n can customize the info by setting info as a function \n if the functio return an Error , the info doesn\'t hide'
    ),
    component: require('doc/pages/components/Textarea/example-4-custom.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Textarea/example-4-custom.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Textarea/example-4-custom.tsx'),

  },
  {
    name: '5-renderFooter',
    isTs: true,
    isTest: false,
    title: locate(
      '渲染底部信息 \n 渲染 textarea footer',
      'RenderFooter \n render textarea footer'
    ),
    component: require('doc/pages/components/Textarea/example-5-renderFooter.tsx').default,
    rawText: require('!raw-loader!doc/pages/components/Textarea/example-5-renderFooter.tsx'),
    parseTsText: require('!raw-loader!ts-loader!doc/pages/components/Textarea/example-5-renderFooter.tsx'),

  },
]

const codes = undefined

const api = '[]';

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} api={api} />
))
