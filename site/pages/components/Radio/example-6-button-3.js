/**
 * cn -
 *    -- 设置 size 可以控制按钮样式的大小
 * en -
 *    -- size to set button style size
 */
import React from 'react'
import { Radio } from 'shineout'

const data = ['red', 'orange', 'yellow']

export default function() {
  return (
    <div>
      <Radio.Group size="small" button keygen data={data} defaultValue="red" />
      <Radio.Group keygen button data={data} defaultValue="red" />
      <Radio.Group size="large" button keygen data={data} defaultValue="red" />
    </div>
  )
}
