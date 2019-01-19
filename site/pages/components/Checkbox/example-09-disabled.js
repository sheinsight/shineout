/**
 * cn - 禁用
 *    -- 设置 Checkbox.Group 的 disabled 为 true，禁用全部选项
 * en - Disabled
 *    -- Set the disabled property of Checkbox.Group to true, disable all the checkboxes.
 */
import React from 'react'
import { Checkbox } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
  return (
    <div>
      <Checkbox.Group disabled keygen data={data} defaultValue={['blue', 'cyan']} renderItem={d => d} />
      <br />
      <Checkbox disabled checked={false}>
        not checked
      </Checkbox>
      <Checkbox disabled checked>
        checked
      </Checkbox>
      <Checkbox disabled checked="indeterminate">
        indeterminate
      </Checkbox>
    </div>
  )
}
