/**
 * cn - destroy
 *    -- 当popover 卸载后删除dom
 */
import React from 'react'
import { Button, Popover } from 'shineout'

const App: React.FC = () => (
  <Button>
    <Popover destroy style={{ padding: '4px 8px' }}>
      Some text
    </Popover>
    Hover
  </Button>
)

export default App
