/**
 * cn - 表单
 *    -- Card.Submit 可以用来触发 Card 内部表单提交
 * en - Form
 */
import React from 'react'
import { Card } from 'shineout'

export default function () {
  return (
    <Card collapsible>
      <Card.Header>Header</Card.Header>

      <Card.Body>
        <div style={{ height: 100 }}>Body</div>
      </Card.Body>
    </Card>
  )
}

