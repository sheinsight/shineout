/**
 * cn - 颜色
 *    -- 通过 type 使用内置的颜色，或者使用 color 指定颜色
 * en - Color
 */
import React from 'react'
import { Progress } from 'shineout'

export default function () {
  return (
    <div style={{ width: 400 }}>
      <Progress value={100} type="success" />
      <br />
      <Progress value={90} type="info" />
      <br />
      <Progress value={80} type="warning" />
      <br />
      <Progress value={70} type="danger" />
      <br />
      <Progress value={60} color="#531dab" />
      <br />
      <Progress value={50} color="linear-gradient(45deg, #ffadd2 25%, #eb2f96 25%, #eb2f96 50%, #ffadd2 50%, #ffadd2 75%, #eb2f96 75%, #eb2f96)" />
    </div>
  )
}
