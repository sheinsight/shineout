/**
 * cn - 分隔符
 *    -- 默认的分隔符为 '/'，可以通过 separator 属性自定义
 * en - separator
 *    -- The default separator is '/'.
 */

import React from 'react'
import { Breadcrumb } from 'shineout'

function Separator() {
  return <span>~</span>
}

const data = [{ title: 'Home', url: '/' }, { title: 'Self' }]

export default function() {
  return (
    <div>
      <Breadcrumb data={data} separator="|" />
      <Breadcrumb data={data} separator={<Separator />} />
    </div>
  )
}
