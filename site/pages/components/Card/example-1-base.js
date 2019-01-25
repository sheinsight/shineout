/**
 * cn - 基本用法
 *    -- Card 内部由 Header, Body, Footer 三个自组件组成，可以组合或单独使用
 * en - Base
 *    -- The card is composed of three components: Header, Body, and Footer. It can be combined or used separately.
 */
import React from 'react'
import { Card } from 'shineout'

const cardStyle = {
  width: 240,
  height: 300,
  display: 'inline-flex',
  marginRight: 20,
}
const gray = { background: '#f7f7f7' }

export default function() {
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
