/**
 * cn - 不重复选项
 *    -- 选项为数组时，设置 repeat 属性为 false 可以平铺选项
 * en - No Repeat
 */
import React from 'react'
import { Rate } from 'shineout'

const text = ['A', 'B', 'C', 'D', 'E']
const front = text.map(t => <span style={{ color: 'red' }}>{t}</span>)
const TextRate = Rate(text, front)

export default function () {
  return (
    <TextRate repeat={false} defaultValue={2} />
  )
}
