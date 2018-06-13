/**
 * cn - 隐藏
 *    -- autoHide 选项为 true 时，自动隐藏当前值和刻度
 * en - autoHide
 */
import React from 'react'
import { Slider } from 'shineout'

export default function () {
  return (
    <Slider
      autoHide
      defaultValue={4}
      scale={[1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]}
      step={1}
      onChange={d => console.log(d)}
    />
  )
}
