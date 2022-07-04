/**
 * cn -
 *    -- 设置 compressed 使选中值合并展示，鼠标悬浮时将会展示所有值。
 * en -
 *    -- Set the compressed property to compress values, hover to show all values.
 */
import React from 'react'
import { Select } from 'shineout'

const data = [
  { id: 'red' },
  { id: 'orange' },
  { id: 'yellow' },
  { id: 'green' },
  { id: 'cyan' },
  { id: 'blue' },
  { id: 'violet' },
]

export default function() {
  return (
    <Select
      compressed
      style={{ width: 300 }}
      data={data}
      keygen="id"
      multiple
      placeholder="Multiple select Compressed"
      renderItem="id"
      format="id"
    />
  )
}
