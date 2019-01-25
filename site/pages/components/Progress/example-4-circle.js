/**
 * cn - 圆形
 *    -- 设置 shape 为 'circle'，显示为环形进度条
 * en - Circle
 *    -- Set the shape property to circle to display circular progress bar.
 */
import React from 'react'
import { Progress } from 'shineout'

export default function() {
  return (
    <div>
      <Progress shape="circle" style={{ marginRight: 20 }} value={30} />

      <Progress shape="circle" style={{ marginRight: 20 }} value={70}>
        70%
      </Progress>

      <Progress shape="circle" type="success" style={{ marginRight: 20 }} value={100}>
        Success
      </Progress>

      <Progress shape="circle" strokeLinecap="butt" color="#531dab" value={70} />
    </div>
  )
}
