/**
 * cn - 支持取消
 *    -- 使用组件形式来支持取消选中
 * en - Cancel
 *    -- Use component list for toggle radio
 */
import React, { useState } from 'react'
import { Radio } from 'shineout'

type RadioGroupItem = string

const data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => {
  const [current, setCurrent] = useState<RadioGroupItem>('red')

  return (
    <Radio.Group keygen value={current} onChange={c => setCurrent(c)}>
      {data.map(d => (
        <span
          key={d}
          onClick={() => {
            if (current === d) setTimeout(() => setCurrent(''))
          }}
        >
          <Radio htmlValue={d}>{d}</Radio>
        </span>
      ))}
    </Radio.Group>
  )
}

export default App
