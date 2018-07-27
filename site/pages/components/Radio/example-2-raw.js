/**
 * cn -
 *    -- 可以使用 React 组件方式调用
 * en -
 */
import React from 'react'
import { Radio } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  return (
    <Radio.Group value="yellow" onChange={v => console.log(v)}>
      {
        data.map(d => <Radio key={d} htmlValue={d}>{d}</Radio>)
      }
    </Radio.Group>
  )
}
