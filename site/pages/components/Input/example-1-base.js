/**
 * cn - 基本用法
 *    -- Input 通常需要和其他的组件配合使用，所以默认的宽度是 100%，默认 display 为 block
 *    -- 如果设置了 style.width，默认 display 为 inline-flex
 * en - Base
 */
import React from 'react'
import { Input } from 'shineout'

export default function () {
  return (
    <Input placeholder="input something" />
  )
}
