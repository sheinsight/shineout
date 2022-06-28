/**
 * cn - 基本用法
 *    -- Popover 放置在一个组件内部弹出
 * en - Base
 *    -- The basic usage.
 */
import React from 'react'
import { Button, Popover } from 'shineout'

const App: React.FC = () => (
  <Button>
    <Popover style={{ padding: '4px 8px' }}>Some text</Popover>
    Hover
  </Button>
)

export default App
