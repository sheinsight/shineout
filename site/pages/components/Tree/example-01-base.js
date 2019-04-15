/**
 * cn - 基本用法
 *    -- 基础的 Tree 用法
 * en - Base
 *   -- Basic usage of Tree
 */
import React from 'react'
import { Tree } from 'shineout'

const data = [
  {
    id: '1',
    text: '1',
    children: [
      {
        id: '1-1',
        text: '1-1',
        children: [{ id: '1-1-1', text: '1-1-1' }, { id: '1-1-2', text: '1-1-2' }],
      },
      { id: '1-2', text: '1-2' },
    ],
  },
  { id: '2', text: '2', children: [{ id: '2-1', text: '2-1' }, { id: '2-2', text: '2-2' }] },
  { id: '3', text: '3', children: [{ id: '3-1', text: '3-1' }] },
  { id: '4', text: '4', children: [{ id: '4-1', text: '4-1' }] },
  { id: '5', text: '5', children: [{ id: '5-1', text: '5-1' }] },
]

export default function() {
  return <Tree data={data} keygen="id" defaultExpanded={['2']} renderItem={n => `node ${n.text}`} />
}
