/**
 * cn - 加载中
 *    -- 穿梭框的加载中
 * en -  Loading
 *    -- Loading
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
  return <Transfer loading data={data} format="id" renderItem="content" keygen="id" titles={['Source', 'Target']} />
}
