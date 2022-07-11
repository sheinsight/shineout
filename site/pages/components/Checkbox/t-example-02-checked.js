/**
 * cn - 状态
 *    -- checked 有三个值，选中(true)、未选中(false)、半选中('indeterminate')。checked 设置时为受控组件（此示例没有处理 onChange 事件）。
 * en - Checked
 *    -- The checked has three values: true(checked), false(not checked), 'indeterminate'(half-checked).
 */
import React from 'react'
import { Checkbox } from 'shineout'

export default function() {
  return (
    <div>
      <Checkbox checked={false}>not checked</Checkbox>
      <Checkbox checked>checked</Checkbox>
      <Checkbox checked="indeterminate">indeterminate</Checkbox>
    </div>
  )
}
