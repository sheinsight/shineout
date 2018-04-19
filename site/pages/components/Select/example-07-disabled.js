/**
 * cn - 禁用
 * en - Disabled
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  return (
    <div>
      <Select
        style={{ width: 240, marginBottom: 12 }}
        disabled
        data={data}
        placeholder="Select color"
      />
      <br />
      <Select
        style={{ width: 300 }}
        data={data}
        disabled
        multiple
        value={['orange', 'green']}
        placeholder="Multiple select"
      />
    </div>
  )
}
