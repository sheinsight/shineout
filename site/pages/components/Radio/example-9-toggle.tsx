/**
 * cn - 支持取消
 *    -- 使用组件形式来支持取消选中
 * en - Cancel
 *    -- Use component list for toggle radio
 */
import React, { useState } from 'react'
import { Radio, TYPE } from 'shineout'

type RadioGroupProps = TYPE.Radio.GroupProps<any, any>
type RadioGroupData = RadioGroupProps['data']

const data: RadioGroupData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => {
  const [current, setCurrent] = useState<any>('red')

  return (
    <Radio.Group keygen value={current} onChange={c => setCurrent(c)}>
      {data.map(d => (
        <span
          key={d}
          onClick={() => {
            if (current === d) setTimeout(() => setCurrent(undefined))
          }}
        >
          <Radio htmlValue={d}>{d}</Radio>
        </span>
      ))}
    </Radio.Group>
  )
}

export default App
