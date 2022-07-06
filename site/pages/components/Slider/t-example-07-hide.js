/**
 * cn - 隐藏信息
 *    -- autoHide 选项为 true 时，自动隐藏当前值和刻度
 * en - Hide value
 *    -- When then autoHide property is true, automatically hide current values and scales.
 */
import React from 'react'
import { Slider } from 'shineout'

export default function() {
  return <Slider autoHide defaultValue={4} scale={[1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]} step={1} />
}
