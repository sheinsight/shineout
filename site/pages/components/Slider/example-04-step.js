/**
 * cn - 自定义步长
 * en - Step
 */
import React from 'react'
import { Slider } from 'shineout'

const formatValue = (v) => {
  const value = v + 540
  const hours = Math.floor(value / 60)
  const mins = value - (hours * 60)
  return `${hours < 10 ? `0${hours}` : hours}:${mins === 0 ? '00' : mins}`
}

export default function () {
  return (
    <Slider
      range
      defaultValue={[45, 130]}
      scale={[0, 60, 120, 180, 240, 300, 360, 420, 480, 540]}
      step={15}
      onChange={d => console.log(d)}
      formatValue={formatValue}
    />
  )
}
