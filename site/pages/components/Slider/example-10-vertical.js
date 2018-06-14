/**
 * cn - 垂直
 * en - Vertical
 */
import React from 'react'
import { Slider } from 'shineout'

const formatTemp = v => `${v}℃`

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
      <Slider
        vertical
        defaultValue={18}
        scale={[0, 20, 40, 60, 100]}
        onChange={d => console.log(d)}
        formatValue={false}
        formatScale={formatTemp}
      />
      <Slider
        autoHide
        range
        vertical
        onChange={d => console.log(d)}
        defaultValue={[12, 70]}
      />
      <Slider
        disabled
        range
        vertical
        onChange={d => console.log(d)}
        defaultValue={[12, 70]}
      />
    </div>
  )
}
