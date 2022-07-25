/**
 * cn -
 *    -- 设置 button 为 outline 可以展示透明背景的按钮样式
 * en -
 *    -- set button with outline to show outline button style
 */
import React from 'react'
import { Radio } from 'shineout'

const data = ['red', 'orange', 'yellow']

export default function() {
  return <Radio.Group button="outline" keygen data={data} defaultValue="red" />
}
