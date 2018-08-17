/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Carousel/cn.md'
import en from 'doc/pages/components/Carousel/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '1-base',
    title: locate('基本用法 \n 轮播组件提供了三种动画过渡方式，可以切换选项查看效果', 'Base \n The carousel component provides three modes of animation transition. Change the option to view the result.'),
    component: require('doc/pages/components/Carousel/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Carousel/example-1-base.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
