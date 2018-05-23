/**
 * cn - 点击触发
 * en - Click
 */
import React from 'react'
import { Button, Popover, Card } from 'shineout'

export default function () {
  const content = (
    <Card style={{ width: 300, border: 0, background: 'transparent' }}>
      <Card.Header>Header</Card.Header>
      <Card.Body style={{ height: 80 }}>Body</Card.Body>
    </Card>
  )
  return (
    <Popover content={content} trigger="click" style={{ marginRight: 12 }}>
      <Button>Click me</Button>
    </Popover>
  )
}
