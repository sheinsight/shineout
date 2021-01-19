/**
 * cn - 垂直分割线
 *   -- 使用 mode="vertical" 设置为行内的垂直分割线。
 * en - Vertical
 *  --  Use type="vertical" make it vertical.
 */
import React from 'react'
import { Divider } from 'shineout'

export default function() {
  return (
    <div>
      <span>Left</span>
      <Divider mode="vertical">H</Divider>
      <span>Center</span>
      <Divider mode="vertical" />
      <span>Right</span>
    </div>
  )
}
