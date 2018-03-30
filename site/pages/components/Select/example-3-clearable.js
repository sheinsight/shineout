/**
 * cn - 可清空
 * en - Clearable
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  return (
    <div>
      <Select
        style={{ width: 240, marginBottom: 12 }}
        clearable
        data={data}
        placeholder="Select color"
        onChange={d => console.log(d)}
      />
      <br />
      <Select
        style={{ width: 300 }}
        data={data}
        clearable
        multiple
        placeholder="Multiple select"
        onChange={d => console.log(d)}
      />
    </div>
  )
}
