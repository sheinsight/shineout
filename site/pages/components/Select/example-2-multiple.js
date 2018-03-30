/**
 * cn - 多选
 *    -- multiple 属性为true时，为多选状态，默认为单选
 * en - Multiple
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  return (
    <Select
      style={{ width: 300 }}
      data={data}
      multiple
      placeholder="Multiple select"
      onChange={d => console.log(d)}
    />
  )
}
