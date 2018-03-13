/**
 * cn - 一组多选框
 * en - Group
 */
import React from 'react'
import { Checkbox } from 'shineout'

const data = [
  { id: 1, name: 'red' },
  { id: 2, name: 'orange' },
  { id: 3, name: 'yellow' },
  { id: 4, name: 'green' },
  { id: 5, name: 'cyan' },
  { id: 6, name: 'blue' },
  { id: 7, name: 'violet' },
]

export default function () {
  return (
    <Checkbox.Group
      keygen="id"
      data={data}
      datum={{ format: 'name' }}
      onChange={d => console.log(d)}
      value={['blue', 'cyan']}
      renderItem="name"
    />
  )
}
