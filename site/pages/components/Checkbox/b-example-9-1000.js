/**
 * cn - 性能测试
 */
import React from 'react'
import { Checkbox } from 'shineout'
import { fetchSync } from 'doc/data//name'

const data = fetchSync(1000)

export default function () {
  return (
    <Checkbox.Group
      keygen="id"
      data={data}
      datum={{ format: 'id' }}
      onChange={d => console.log(d)}
      renderItem="name"
    />
  )
}

