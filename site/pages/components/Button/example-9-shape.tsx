/**
 * cn - 形状
 *    -- Button 内置了几种常用的类型，分为默认(default), 主要(primary), 次要(secondary), 成功(success), 警告(warning), 危险(danger)和链接(link)
 * en - Base
 *    -- Button has several built-in type, default, primary, secondary, success, warning, dange, and link.
 */
import React from 'react'
import { Button } from 'shineout'

const App: React.FC = () => (
  <div>
    <Button shape="round" type="primary">
      Default
    </Button>
    <Button shape="circle" type="primary">hi</Button>
  </div>
)

export default App
