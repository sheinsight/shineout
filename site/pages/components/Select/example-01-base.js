/**
 * cn - 基本用法
 *    -- Select 没有单独的 Option 选项，通过数据 (data) 来渲染
 * en - Base
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  return (
    <Select
      keygen
      style={{ width: 240 }}
      data={data}
      onChange={d => console.log(d)}
    />
  )
}
