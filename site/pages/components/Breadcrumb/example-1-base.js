/**
 * cn - 基本用法
 *    -- 组件调用通过 json 数据配置
 * en - base
 */

import React from 'react'
import { Breadcrumb } from 'shineout'

const data = [
  { title: 'Home', url: '#/' },
  { title: <a href="#/components/Button">Button</a> },
  { title: 'Self' },
]

export default function () {
  return (
    <Breadcrumb data={data} />
  )
}
