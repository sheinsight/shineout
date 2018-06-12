/**
 * cn - 范围选择
 * en - Range
 */
import React from 'react'
import { Slider } from 'shineout'

export default function () {
  return (
    <Slider
      range
      defaultValue={[25, 75]}
      onChange={d => console.log(d)}
    />
  )
}
