/**
 * cn - 可清空
 *    -- clearable 属性为 true 时，hover 后会显示清空图标，点击后清除所选数据
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
        keygen
        data={data}
        placeholder="Select color"
        onChange={d => console.log(d)}
      />
      <br />
      <Select
        style={{ width: 300 }}
        data={data}
        clearable
        keygen
        multiple
        placeholder="Multiple select"
        onChange={d => console.log(d)}
      />
    </div>
  )
}
