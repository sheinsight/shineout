/**
 * cn -
 *    -- compressed属性为true时，将选中值合并，鼠标悬浮时将会展示所有值，只在多选模式下有效。
 * en -
 *    -- Set the compressed property to true to merge selected values, valid only in multiselect mode, hover to show all values.
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
