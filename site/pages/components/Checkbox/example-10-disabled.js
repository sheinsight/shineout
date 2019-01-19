/**
 * cn -
 *    -- disabled 为函数时，根据函数结果实现有条件禁用
 * en -
 *    -- When the disabled is a function, disbale the option that the function to return true.
 */
import React from 'react'
import { Checkbox } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
  return (
    <div>
      <Checkbox.Group data={data} disabled={d => d === 'yellow'} keygen value={['blue']} renderItem={d => d} />
    </div>
  )
}
