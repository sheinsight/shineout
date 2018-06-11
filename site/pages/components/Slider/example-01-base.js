/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Slider } from 'shineout'

export default function () {
  return (
    <div>
      <Slider to={5} onChange={d => console.log(d)} defaultValue={0} />
      <Slider onChange={d => console.log(d)} defaultValue={50} />
      <Slider onChange={d => console.log(d)} defaultValue={100} />
    </div>
  )
}
