/**
 * cn -
 *    -- 可以通过 background 和 color 自定义样式
 */
import React from 'react'
import { Button, Popover } from 'shineout'

export default function () {
  const content = <div style={{ width: 200, padding: 20, color: 'gold' }}>Some text</div>
  return (
    <Popover content={content} background="#555" border="gold" style={{ marginRight: 12 }}>
      <Button>Hover</Button>
    </Popover>
  )
}
