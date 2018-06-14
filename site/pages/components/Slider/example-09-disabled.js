/**
 * cn - 禁用
 * en - Disabled
 */
import React from 'react'
import { Slider } from 'shineout'

export default function () {
  return (
    <Slider
      range
      disabled
      defaultValue={[25, 75]}
      onChange={d => console.log(d)}
    />
  )
}
