/**
 * cn - 禁用
 *    -- 设置 disabled 为 true 禁用 switch
 * en - Disabled
 *    -- disabled check while disabled true
 */
import React, { useState } from 'react'
import { Switch, Button } from 'shineout'

const App: React.FC = () => {
  const [disabled, setDisabled] = useState(true)

  const handleToggle = () => {
    setDisabled(!disabled)
  }
  return (
    <div>
      <Switch disabled={disabled} />

      <Button style={{ marginInlineStart: 14 }} type="primary" onClick={handleToggle}>
        Toggle
      </Button>
    </div>
  )
}

export default App
