/**
 * cn - 禁用元素
 *    -- 设置 disabledChild 来使内部禁用的元素正常工作
 * en - Disabled
 *    -- Set disabledChild make disabled child work
 */
import React from 'react'
import { Tooltip, Button } from 'shineout'

export default function() {
  return (
    <div>
      <Tooltip tip="Some text." position="left" disabledChild>
        <Button disabled>Disabled</Button>
      </Tooltip>
    </div>
  )
}
