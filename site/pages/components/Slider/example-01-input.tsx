/**
 * cn - 带输入框
 *    -- 和 数组输入框 保持同步
 * en - Input
 *    -- change with number input
 */
import React, { useState } from 'react'
import { Slider, Input } from 'shineout'

const container: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
}

const slider: React.CSSProperties = {
  flex: 1,
  marginInlineEnd: 28,
}

const App: React.FC = () => {
  const [value, setValue] = useState<number>(50)

  return (
    <div style={container}>
      <Slider value={value} onChange={n => setValue(n)} style={slider} />
      <Input.Number digits={0} width={100} value={value} onChange={(n: number) => setValue(n)} />
    </div>
  )
}

export default App
