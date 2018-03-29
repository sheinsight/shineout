/**
 * cn - 可清空
 * en - Clearable
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  return (
    <Select
      style={{ width: 240 }}
      clearable
      data={data}
      placeholder="Select color"
      onChange={d => console.log(d)}
    />
  )
}
