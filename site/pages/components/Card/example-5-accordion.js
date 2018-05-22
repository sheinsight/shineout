/**
 * cn - 手风琴
 *    -- 使用 Card.Accordion 可以使一组 Card 实现手风琴效果（每次打开一个 Card）
 * en - Accordion
 */
import React from 'react'
import { Card } from 'shineout'

export default function () {
  return (
    <Card.Accordion defaultActive={1}>
      <Card>
        <Card.Header>Header 1</Card.Header>
        <Card.Body>Body</Card.Body>
      </Card>
      <Card>
        <Card.Header>Header 2</Card.Header>
        <Card.Body>Body</Card.Body>
      </Card>
      <Card>
        <Card.Header>Header 3</Card.Header>
        <Card.Body>Body</Card.Body>
      </Card>
    </Card.Accordion>
  )
}

