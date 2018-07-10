/**
 * cn - 浮动
 * en - Fixed
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  const props = { data, style: { width: 100, marginRight: 12 } }

  return (
    <div style={{ height: 40, overflow: 'hidden' }}>
      <Select {...props} fixed placeholder="default" />
    </div>
  )
}
