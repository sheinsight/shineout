/**
 * cn - 清除空格
 *    -- trim 为 true 时，失去焦点时会自动删除空白字符。
 * en - Clear space
 *    -- When trim is true, blank characters are automatically deleted when lose focus
 */
import React from 'react'
import { Input } from 'shineout'

export default function() {
  return <Input placeholder="input something" trim />
}
