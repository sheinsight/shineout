/**
 * cn - 筛选数据 - 内置
 *    -- onFilter 返回函数时，使用这个函数做前端过滤
 * en - Filter - built-in
 *    -- When the onFilter property returns a function, use this function to do front-end filtering.
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
  return (
    <div>
      <Select
        style={{ width: 240, marginBottom: 12 }}
        data={data}
        keygen
        placeholder="Select color"
        onFilter={text => d => d.indexOf(text) >= 0}
      />

      <br />

      <Select
        style={{ width: 300 }}
        multiple
        keygen
        data={data}
        placeholder="Select color"
        onFilter={text => d => d.indexOf(text) >= 0}
      />
    </div>
  )
}
