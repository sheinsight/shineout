/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Button, Popover } from 'shineout'

export default function () {
  const content = <div style={{ width: 200, padding: 20 }}>Some text</div>
  return (
    <Popover content={content} style={{ marginRight: 12 }}>
      <Button>Hover</Button>
    </Popover>
  )
}
