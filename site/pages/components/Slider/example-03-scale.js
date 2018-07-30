/**
 * cn - 区间
 *    -- 设置 scale 属性可以自定义区间，可以为非连续数值
 * en - Scale
 */
import React from 'react'
import { Slider } from 'shineout'

export default function () {
  return (
    <Slider
      scale={[0, 50, 100, 250, 500, 1000]}
      onChange={d => console.log(d)}
    />
  )
}
