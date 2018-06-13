/**
 * cn - 步长
 * en - Step
 */
import React from 'react'
import { Slider } from 'shineout'

export default function () {
  return (
    <Slider
      range
      defaultValue={[0.05, 0.25]}
      scale={[0, 1]}
      step={0.05}
      onChange={d => console.log(d)}
    />
  )
}
