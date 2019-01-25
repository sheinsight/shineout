/**
 * cn - 垂直布局
 *    -- 默认是水平布局，设置 block 属性可以改为垂直布局
 * en - Block
 *    -- The default is horizontal layout, and setting the block property can change it to be vertical layout.
 */
import React from 'react'
import { Checkbox } from 'shineout'

const data = [
  { id: 1, color: 'red' },
  { id: 2, color: 'orange' },
  { id: 3, color: 'yellow' },
  { id: 4, color: 'green' },
  { id: 5, color: 'cyan' },
  { id: 6, color: 'blue' },
  { id: 7, color: 'violet' },
]

export default function() {
  return (
    <Checkbox.Group
      keygen="id"
      block
      data={data}
      datum={{ format: 'color' }}
      defaultValue={['blue', 'cyan']}
      renderItem="color"
    />
  )
}
