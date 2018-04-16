/**
 * cn - 筛选数据
 * en - filter
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  return (
    <Select
      style={{ width: 240 }}
      data={data}
      placeholder="Select color"
      onChange={d => console.log(d)}
      filter={text => d => d.indexOf(text) >= 0}
    />
  )
}
