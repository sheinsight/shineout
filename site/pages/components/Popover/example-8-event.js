/**
 * cn - 事件
 *    -- 提供了onOpen 和 onClose 事件
 * en - Events
 *    -- provider onOpen and onClose event
 */
import React from 'react'
import { Button, Popover } from 'shineout'

export default function() {
  const open = () => console.log('popover open')
  const close = () => console.log('popover close')
  return (
    <Button>
      <Popover onOpen={open} onClose={close} trigger="click" style={{ width: 200, padding: 20 }}>
        Some text
      </Popover>
      Click me.
    </Button>
  )
}
