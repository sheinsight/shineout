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
      formatValue={false}
      scale={[0.8, 1, 1.2, 1.4, 1.7, 2, 2.4, 2.8, 3.3, 4, 4.8, 5.6, 6.7, 8, 9.5, 11, 13, 16]}
      step={0}
      onChange={d => console.log(d)}
    />
  )
}
