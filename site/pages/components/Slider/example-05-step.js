/**
 * cn - 自定义步长
 * en - Step
 */
import React from 'react'
import { Slider } from 'shineout'

export default function () {
  return (
    <Slider
      range
      defaultValue={[5, 60]}
      step={5}
      onChange={d => console.log(d)}
    />
  )
}
