/**
 * cn - 筛选
 *    -- 可以通过设置 onFilter 去筛选列表项
 * en - Filter
 *    -- Can filter list items by setting onFilter
 */
import React from 'react'
import { Transfer } from 'shineout'

const data = []

for (let i = 1; i < 20; i++) {
  data.push({
    id: i,
    content: `content ${i}`,
  })
}

export default function() {
  return (
    <Transfer onFilter={(t, d) => d.content.indexOf(t) > -1} data={data} format="id" renderItem="content" keygen="id" />
  )
}
