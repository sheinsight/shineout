/**
 * cn - 数组
 *    -- 创建组件时可以使用数组来显示不同的选项
 * en - Array
 */
import React from 'react'
import { Rate } from 'shineout'

const text = ['A', 'B', 'C', 'D', 'E']
const front = text.map(t => <span style={{ color: 'red' }}>{t}</span>)
const TextRate = Rate(text, front)

export default function () {
  return (
    <TextRate />
  )
}
