/**
 * cn -
 *    -- 可以按 React 组件方式使用
 * en -
 *    -- It can be used like the React Component.
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

export default function () {
  return (
    <Checkbox.Group keygen="id" value={[3, 5]} onChange={(value) => { console.log(value) }}>
      {
        data.map(d => (
          <Checkbox key={d.id} htmlValue={d.id}>{d.color}</Checkbox>
        ))
      }
    </Checkbox.Group>
  )
}

