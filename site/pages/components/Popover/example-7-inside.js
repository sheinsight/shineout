/**
 * cn - 内嵌
 *    -- 组件内嵌的Popover
 * en - Inside
 *    -- internal Popover
 */
import React from 'react'
import { Button, Popover } from 'shineout'

export default function() {
  return (
    <Button>
      <Popover.Inside style={{ width: 200, padding: 20 }}>Some text</Popover.Inside>
      Hover
    </Button>
  )
}
