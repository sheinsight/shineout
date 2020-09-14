/**
 * cn - 支持取消
 *    -- 使用组件形式来支持取消选中
 * en - Cancel
 *    -- Use component list for toggle radio
 */
import React from 'react'
import { Radio } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
  const [current, setCurrent] = React.useState('red')
  return (
    <Radio.Group keygen value={current} onChange={c => setCurrent(c)}>
      {data.map(d => (
        <span
          onClick={() => {
            if (current === d) setTimeout(() => setCurrent(undefined))
          }}
        >
          <Radio key={d} htmlValue={d}>
            {d}
          </Radio>
        </span>
      ))}
    </Radio.Group>
  )
}
