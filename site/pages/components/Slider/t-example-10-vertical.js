/**
 * cn - 垂直
 *    -- 设置 vertical 属性，修改组件为垂直方向
 * en - Vertical
 *    -- Set the vertical property to change the component vertical.
 */
import React from 'react'
import { Slider } from 'shineout'

const formatTemp = v => `${v}℃`

export default function() {
  return (
    <div>
      <Slider vertical defaultValue={50} />
      <Slider range vertical defaultValue={[12, 70]} />
      <Slider vertical defaultValue={18} scale={[0, 20, 40, 60, 100]} formatValue={false} formatScale={formatTemp} />
      <Slider autoHide range vertical defaultValue={[12, 70]} />
      <Slider disabled range vertical defaultValue={[12, 70]} />
    </div>
  )
}
