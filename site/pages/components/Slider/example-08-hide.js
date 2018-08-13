/**
 * cn -
 *    -- 如果要彻底不显示刻度和当前值，设置 formatValue 和 fotmatScale 为 false
 * en - autoHide
 *    -- Set formatValue and fotmatScale to false if you don't want to display the scale and current values completely.
 */
import React from 'react'
import { Slider } from 'shineout'

export default function () {
  return (
    <Slider
      defaultValue={4}
      step={1}
      formatValue={false}
      formatScale={false}
      onChange={d => console.log(d)}
    />
  )
}
