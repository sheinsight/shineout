/**
 * cn - 禁用
 * en - Disabled
 */
import React from 'react'
import { Checkbox } from 'shineout'

const data = [
  { id: 1, name: 'red' },
  { id: 2, name: 'orange' },
  { id: 3, name: 'yellow' },
  { id: 4, name: 'green' },
  { id: 5, name: 'cyan' },
  { id: 6, name: 'blue' },
  { id: 7, name: 'violet' },
]

export default function () {
  return (
    <div>
      <Checkbox.Group
        keygen="id"
        disabled
        data={data}
        datum={{ format: 'name' }}
        value={['blue', 'cyan']}
        renderItem="name"
      />
      <br />
      <Checkbox disabled checked={false}>not checked</Checkbox>
      <Checkbox disabled checked>checked</Checkbox>
      <Checkbox disabled checked="indeterminate">indeterminate</Checkbox>
    </div>
  )
}
