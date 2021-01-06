/**
 * cn - 按钮样式
 *    -- 设置 button 属性可以展示为按钮样式
 * en - Button
 *    -- set button to show button style
 */
import React from 'react'
import { Radio } from 'shineout'

const data = ['red', 'orange', 'yellow']

export default function() {
  return <Radio.Group button keygen data={data} defaultValue="red" />
}
