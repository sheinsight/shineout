/**
 * cn - 折叠
 * en - Collapse
 */
import React from 'react'
import { Card, DatePicker } from 'shineout'

export default function () {
  return (
    <Card collapsible>
      <Card.Header>Header</Card.Header>

      <Card.Body>
        <div style={{ height: 100 }}><DatePicker /></div>
      </Card.Body>
    </Card>
  )
}

