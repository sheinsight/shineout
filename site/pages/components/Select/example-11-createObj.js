/**
 * cn -
 *    -- 通过输入创建一个对象
 * en -
 *    -- Set the onCreate property can create options(type of Object) by inputting.
 */
import React from 'react'
import { Select } from 'shineout'

const data = [
  { id: 1, desc: 'red' },
  { id: 2, desc: 'orange' },
  { id: 3, desc: 'yellow' },
  { id: 4, desc: 'green' },
  { id: 5, desc: 'cyan' },
  { id: 6, desc: 'blue' },
]

export default function() {
  return (
    <div>
      <Select
        style={{ width: 240, marginBottom: 12 }}
        data={data}
        keygen="id"
        format="id"
        renderItem="desc"
        placeholder="input color"
        onCreate={text => ({ id: text, desc: text })}
      />
    </div>
  )
}
