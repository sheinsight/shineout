/**
 * cn - 区间
 *    -- 设置 scale 属性可以自定义区间。
 * en - Scale
 *    -- Set the scale property to customize the interval.
 */
import React from 'react'
import { Slider } from 'shineout'

export default function() {
  return <Slider scale={[0, 50, 100, 250, 500, 1000]} />
}
