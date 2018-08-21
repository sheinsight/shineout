/**
 * cn - 基本用法
 *    -- 与 Tooltip 相比，Popover 可以控制样式，大小由内容决定
 * en - Base
 *    -- The basic usage.
 */
import React from 'react'
import { Button, Popover } from 'shineout'

export default function () {
  const content = <div style={{ width: 200, padding: 20 }}>Some text</div>
  return (
    <Popover content={content}>
      <Button>Hover</Button>
    </Popover>
  )
}
