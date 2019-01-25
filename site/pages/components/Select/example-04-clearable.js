/**
 * cn - 可清空
 *    -- clearable 属性为 true 时，hover 后会显示清空图标。
 * en - Clearable
 *    -- Set the clearable property to true, the clear icon will be displayed on hover.
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
  return (
    <div>
      <Select style={{ width: 240, marginBottom: 12 }} clearable keygen data={data} placeholder="Select color" />
      <br />
      <Select style={{ width: 300 }} data={data} clearable keygen multiple placeholder="Multiple select" />
    </div>
  )
}
