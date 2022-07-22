/**
 * cn - 提示文字
 *    -- 在 input 上设置的 tip 在 focus 时弹出
 * en - Tip
 *    -- The tip set on input pops up when it is focused.
 */
import React from 'react'
import { Input } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const style = { marginBottom: 12 }

export default function() {
  return (
    <div style={{ width: 300 }}>
      <Input style={style} placeholder="email" tip="enter you email." popover="top-left" />

      <Input.Group style={style} tip="enter you email.">
        <FontAwesome name="envelope" />
        <Input placeholder="email" />
      </Input.Group>

      <Input.Group style={style}>
        <FontAwesome name="envelope" />
        <Input tip="enter you email." placeholder="email" />
      </Input.Group>
    </div>
  )
}
