/**
 * cn - 性能
 *    -- Transfer 内部使用了虚拟列表来优化性能，本例加载了10000条数据
 * en -
 *    -- Transfer uses a lazy loading to optimize performance. This example loads 10,000 pieces of data.
 */
import React from 'react'
import { Transfer } from 'shineout'

const data = []

for (let i = 0; i < 10000; i++) {
  data.push({
    id: i,
    content: `content ${i}`,
  })
}

export default function() {
  return <Transfer data={data} format="id" renderItem="content" keygen="id" titles={['Source', 'Target']} />
}
