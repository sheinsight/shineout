/**
 * cn - 基本用法
 *    -- 基本的使用
 * en - Base
 *    -- Basic usage
 */
import React from 'react'
import { Transfer } from 'shineout'

const data = [
  {
    id: 'a',
    title: 'a',
  },
  {
    id: 'b',
    title: 'b',
  },
  {
    id: 'c',
    title: 'c',
  },
  {
    id: 'd',
    title: 'd',
  },
  {
    id: 'e',
    title: 'e',
  },
]

export default function() {
  return (
    <Transfer
      data={data}
      format="id"
      renderItem={d => `content ${d.title}`}
      value={['a']}
      keygen="id"
      titles={['左护法', '右护法']}
    />
  )
}
