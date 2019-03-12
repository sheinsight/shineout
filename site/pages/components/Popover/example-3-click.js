/**
 * cn - 点击触发
 *    -- 默认是移入组件触发，设置 trigger 为 'click'，可以改为点击触发
 * en - Trigger
 *    -- Set the trigger property to change the trigger event to 'click'.
 */
import React from 'react'
import { Button, Popover, Card } from 'shineout'

export default function() {
  return (
    <Button>
      <Popover trigger="click" style={{ marginRight: 12 }}>
        <Card style={{ width: 300, border: 0, background: 'transparent' }}>
          <Card.Header>Header</Card.Header>
          <Card.Body style={{ height: 80 }}>Body</Card.Body>
        </Card>
      </Popover>
      Click me
    </Button>
  )
}
