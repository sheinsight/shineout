/**
 * cn - 筛选数据
 * en - filter
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  return (
    <div>
      <Select
        style={{ width: 240, marginBottom: 12 }}
        data={data}
        placeholder="Select color"
        onChange={d => console.log(d)}
        filter={text => d => d.indexOf(text) >= 0}
      />

      <br />

      <Select
        style={{ width: 300 }}
        multiple
        data={data}
        placeholder="Select color"
        onChange={d => console.log(d)}
        filter={text => d => d.indexOf(text) >= 0}
      />
    </div>
  )
}
