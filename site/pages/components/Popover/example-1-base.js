/**
 * cn - 基本用法
 *    -- Popover 放置在一个组件内部弹出
 * en - Base
 *    -- The basic usage.
 */
import React from 'react'
import { Button, Popover } from 'shineout'

export default function() {
  return (
    <Button>
      <Popover style={{ width: 200, padding: 20 }}>Some text</Popover>
      Hover
    </Button>
  )
}
