/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Slider } from 'shineout'

export default function () {
  return (
    <Slider onChange={d => console.log(d)} defaultValue={50} />
  )
}
