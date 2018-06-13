/**
 * cn -
 *    -- step 设定为 0 时，只能从 scale 内的值
 * en - Step
 */
import React from 'react'
import { Slider } from 'shineout'

const pad = i => (i < 10 ? `0${i}` : i)
const formatValue = (v) => {
  const value = v + 540
  const hours = Math.floor(value / 60)
  return `${pad(hours)}:${pad(value - (hours * 60))}`
}

export default function () {
  return (
    <Slider
      range
      defaultValue={[60, 240]}
      scale={[0, 60, 120, 180, 240, 300, 360, 420, 480, 540]}
      step={0}
      onChange={d => console.log(d)}
      formatValue={formatValue}
    />
  )
}
