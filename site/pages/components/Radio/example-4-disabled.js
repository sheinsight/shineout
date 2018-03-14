/**
 * cn - \n 使用 datum disabled 实现有条件禁用
 * en - Disabled
 */
import React from 'react'
import { Radio } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  return (
    <div>
      <Radio.Group
        data={data}
        datum={{ disabled: d => d === 'yellow' }}
        value="blue"
        renderItem={d => d}
      />
    </div>
  )
}
