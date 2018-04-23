/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Card } from 'shineout'

const cardStyle = {
  width: 240, height: 300, display: 'inline-flex', marginRight: 20,
}
const gray = { background: '#f7f7f7' }

export default function () {
  return (
    <div>
      <Card style={cardStyle}>
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>

      <Card style={cardStyle}>
        <Card.Header style={gray}>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer style={gray}>Footer</Card.Footer>
      </Card>
    </div>
  )
}

