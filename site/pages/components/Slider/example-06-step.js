/**
 * cn -
 *    -- step 设定为 0 时，只能从 scale 内的值
 * en - Step
 */
import React from 'react'
import { Slider } from 'shineout'

export default function () {
  return (
    <Slider
      showResult={false}
      scale={[1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]}
      step={0}
      onChange={d => console.log(d)}
    />
  )
}
