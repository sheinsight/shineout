/**
 * cn -
 *    -- 复杂的数据可以使用 datum 进行处理
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

function renderItem(d) {
  const style = { borderBottom: `solid 1px ${d.color}`, paddingBottom: 2 }
  return <span style={style}>{d.color}</span>
}

export default function () {
  return (
    <Checkbox.Group
      keygen="id"
      data={data}
      datum={{ format: 'color' }}
      onChange={d => console.log(d)}
      value={['blue', 'cyan']}
      renderItem={renderItem}
    />
  )
}
