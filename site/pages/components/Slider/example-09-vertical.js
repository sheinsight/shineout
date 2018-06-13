/**
 * cn - 垂直
 * en - Vertical
 */
import React from 'react'
import { Slider } from 'shineout'

export default function () {
  return (
    <div>
      <Slider
        vertical
        onChange={d => console.log(d)}
        defaultValue={50}
      />
      <Slider
        range
        vertical
        onChange={d => console.log(d)}
        defaultValue={[12, 70]}
      />
    </div>
  )
}
