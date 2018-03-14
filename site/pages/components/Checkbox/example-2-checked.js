/**
 * cn - 状态 \n checked 有三个值，选中、未选中、半选。checked 设置时为受控组件（此示例没有处理）。
 * en - Checked
 */
import React from 'react'
import { Checkbox } from 'shineout'

export default function () {
  return (
    <div>
      <Checkbox checked={false}>not checked</Checkbox>
      <Checkbox checked>checked</Checkbox>
      <Checkbox checked="indeterminate">indeterminate</Checkbox>
    </div>
  )
}
