/**
 * cn - 内嵌标题
 *    -- 使用 innerTitle 展示内嵌标题
 * en - inner title
 *    -- -- use innerTitle to display the inner title
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
  return (
    <div style={{ verticalAlign: 'top' }}>
      <Select
        multiple
        compressed
        innerTitle="Pick a color, please"
        clearable
        keygen
        style={{ width: 240, marginRight: 12 }}
        data={data}
      />
      <Select
        innerTitle="Pick a color, please"
        clearable
        keygen
        style={{ width: 240, marginRight: 12 }}
        data={data}
        onFilter={text => d => d.indexOf(text) >= 0}
        compressed
      />
    </div>
  )
}
