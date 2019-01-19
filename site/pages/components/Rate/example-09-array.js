/**
 * cn - 不重复选项
 *    -- 默认情况下，会重复显示当前分值对应的选项，设置 repeat 属性为 false 可以按分值显示不同选项。
 * en - No Repeat
 *    -- By default, the item corresponding to the current value is displayed repeatedly. Set repeat property to false to display different item by value.
 */
import React from 'react'
import { Rate } from 'shineout'

const text = ['A', 'B', 'C', 'D', 'E']
const front = text.map(t => <span style={{ color: 'red' }}>{t}</span>)
const TextRate = Rate(text, front)

export default function() {
  return <TextRate repeat={false} defaultValue={2} />
}
