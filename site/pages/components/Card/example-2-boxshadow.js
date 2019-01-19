/**
 * cn - 阴影
 *    -- 可以通过 shadow 属性控制阴影
 * en - BoxShadow
 *    -- Set the shadow property to determined how to display the shadow.
 */
import React from 'react'
import { Card } from 'shineout'

const cardStyle = {
  width: 140,
  display: 'inline-flex',
  marginRight: 20,
}

export default function() {
  return (
    <div>
      <Card style={cardStyle}>
        <Card.Body>Never</Card.Body>
      </Card>

      <Card style={cardStyle} shadow="hover">
        <Card.Body>Hover</Card.Body>
      </Card>

      <Card style={cardStyle} shadow>
        <Card.Body>Always</Card.Body>
      </Card>
    </div>
  )
}
