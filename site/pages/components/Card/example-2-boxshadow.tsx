/**
 * cn - 阴影
 *    -- 可以通过 shadow 属性控制阴影
 * en - BoxShadow
 *    -- Set the shadow property to determined how to display the shadow.
 */
import React from 'react'
import { Card, TYPE } from 'shineout'

type CardProps = TYPE.Card.Props

type CardStyle = CardProps['style']

const cardStyle: CardStyle = {
  width: 140,
  display: 'inline-flex',
  marginInlineEnd: 20,
}

const App: React.FC = () => (
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

export default App
