/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import log from 'doc/utils/log'
import locate from 'doc/locate'

import cn from 'doc/pages/components/Icon/cn.md'
import en from 'doc/pages/components/Icon/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('使用 FontAwesome', 'Use FontAwesome'),
    component: require('doc/pages/components/Icon/example-1-awesome.js').default,
    rawText: require('!raw-loader!doc/pages/components/Icon/example-1-awesome.js'),
  },
  {
    title: locate('使用 Iconfont \n 可以在 iconfont.cn 定制一个图标', 'Use Iconfont'),
    component: require('doc/pages/components/Icon/example-2-iconfont.js').default,
    rawText: require('!raw-loader!doc/pages/components/Icon/example-2-iconfont.js'),
  },
  {
    title: locate('尺寸 \n 提供了一个fontSize属性设置图标大小，效果和 style.fontSize 相同', 'Font Size'),
    component: require('doc/pages/components/Icon/example-3-size.js').default,
    rawText: require('!raw-loader!doc/pages/components/Icon/example-3-size.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
