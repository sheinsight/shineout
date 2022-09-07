/**
 * cn -
 *    -- 通过 color 使用自定义颜色
 * en - Color
 *    -- Use custom colors.
 */
import React from 'react'
import { Progress } from 'shineout'

export default function() {
  return (
    <div style={{ width: 400 }}>
      <Progress value={60} color="#531dab" />
      <br />
      <Progress
        value={50}
        color="linear-gradient(45deg, #ffadd2 25%, #eb2f96 25%, #eb2f96 50%, #ffadd2 50%, #ffadd2 75%, #eb2f96 75%, #eb2f96)"
      />
    </div>
  )
}
