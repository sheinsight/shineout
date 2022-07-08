/**
 * cn - 文字按钮
 *    -- 设置 text 属性来使用文字按钮
 * en - Text
 *    -- set text to use text button
 */
import React from 'react'
import { Button } from 'shineout'

const App: React.FC = () => (
  <div>
    <Button text>Default</Button>
    <Button text type="primary">
      Primary
    </Button>
    <Button text type="secondary">
      Secondary
    </Button>
    <Button text type="success">
      Success
    </Button>
    <Button text type="warning">
      Warning
    </Button>
    <Button text type="danger">
      Danger
    </Button>
    <Button text type="link">
      Link
    </Button>
  </div>
)

export default App
