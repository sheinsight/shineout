/**
 * cn - 基本用法
 *    -- 组件调用通过 json 数据配置
 * en - Base
 *    -- The basic usage.
 */

import React from 'react'
import { Breadcrumb, Message } from 'shineout'

const data = [
  { title: 'Home', url: '#/' },
  { title: <a href="#/components/Button">Button</a> },
  { title: 'Self', onClick: () => Message.show('Clicked self') },
]

export default function () {
  return (
    <Breadcrumb data={data} />
  )
}
