/**
 * cn -
 *    -- disabled 为函数时，根据函数返回结果实现有条件禁用
 * en - Disabled
 *    -- When the disabled property is a function, realize conditionally disabled based on the result returned by the function.
 */
import React from 'react'
import { Radio } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  return (
    <div>
      <Radio.Group
        keygen
        data={data}
        disabled={d => d === 'yellow'}
        value="blue"
        renderItem={d => d}
      />
    </div>
  )
}
