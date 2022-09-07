/**
 * cn - 点击触发
 *    -- 默认是移入组件触发，设置 trigger 为 'click'，可以改为点击触发
 * en - Trigger
 *    -- Set the trigger property to change the trigger event to 'click'.
 */
import React from 'react'
import { Button, Popover, Card } from 'shineout'

const PopoverStyle: React.CSSProperties = { marginInlineEnd: 12 }

const CardStyle: React.CSSProperties = { width: 300, border: 0, background: 'transparent' }

const App: React.FC = () => (
  <Button>
    <Popover style={PopoverStyle} trigger="click">
      <Card style={CardStyle}>
        <Card.Header>Header</Card.Header>

        <Card.Body style={{ height: 80 }}>Body</Card.Body>
      </Card>
    </Popover>
    Click me
  </Button>
)

export default App
