/**
 * cn - 禁用
 *    -- 设置 disabled 为 true 时，禁用所有选项
 * en - Disabled
 *    -- Set disabled property is set to true, all the options is disabled.
 */
import React from 'react'
import { Radio } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
  return (
    <div>
      <Radio.Group keygen disabled data={data} defaultValue="blue" renderItem={d => d} />
    </div>
  )
}
