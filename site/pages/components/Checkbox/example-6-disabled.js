/**
 * cn - 禁用
 * en - Disabled
 */
import React from 'react'
import { Checkbox } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  return (
    <div>
      <Checkbox.Group
        disabled
        data={data}
        value={['blue', 'cyan']}
        renderItem={d => d}
      />
      <br />
      <Checkbox disabled checked={false}>not checked</Checkbox>
      <Checkbox disabled checked>checked</Checkbox>
      <Checkbox disabled checked="indeterminate">indeterminate</Checkbox>
    </div>
  )
}
