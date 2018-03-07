/**
 * 此文件根据 scripts/components-page.tpl 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'
import log from 'doc/utils/log'
import locate from 'doc/locate'

import cn from 'doc/pages/components/Button/cn.md'
import en from 'doc/pages/components/Button/en.md'

const source = locate(cn, en)

const examples = [
  {
    title: locate('基本用法', 'Base'),
    component: require('doc/pages/components/Button/example-1-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-1-base.js'),
  },
  {
    title: locate('透明背景', 'Outline'),
    component: require('doc/pages/components/Button/example-2-outline.js').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-2-outline.js'),
  },
  {
    title: locate('不可用', 'Disabled'),
    component: require('doc/pages/components/Button/example-3-disabled.js').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-3-disabled.js'),
  },
  {
    title: locate('大小', 'Size'),
    component: require('doc/pages/components/Button/example-4-size.js').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-4-size.js'),
  },
  {
    title: locate('组合', 'Group'),
    component: require('doc/pages/components/Button/example-5-group.js').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-5-group.js'),
  },
  {
    title: locate('链接', 'Link'),
    component: require('doc/pages/components/Button/example-6-href.js').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-6-href.js'),
  },
  {
    title: locate('图标', 'Icon'),
    component: require('doc/pages/components/Button/example-7-icon.js').default,
    rawText: require('!raw-loader!doc/pages/components/Button/example-7-icon.js'),
  },
]

log.start()


const logs = log.end()

const codes = {
}

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
