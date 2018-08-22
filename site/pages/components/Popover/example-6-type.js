/**
 * cn -
 *    -- 如果内置样式不满足需求，可以通过 background 和 border 自定义样式
 * en -
 *    -- Customize the style with background and border.
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
