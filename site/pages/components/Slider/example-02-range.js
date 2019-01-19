/**
 * cn - 范围选择
 *    -- 设置 range 属性显示为双滑块，输入(返回)值为长度为 2 的数组
 * en - Range
 *    -- Set the range property to display double sliders, and value is an array of length 2.
 */
import React from 'react'
import { Slider } from 'shineout'

export default function() {
  return <Slider range defaultValue={[25, 75]} />
}
