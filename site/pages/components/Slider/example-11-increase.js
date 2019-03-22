/**
 * cn - 允许增加
 *    -- 可以在拖动时无限增加最大值
 * en -  allow increase
 *    -- can increase the maximum infinitely while dragging
 */
import React from 'react'
import { Slider } from 'shineout'

export default function() {
  return <Slider defaultValue={50} allowIncrease />
}
