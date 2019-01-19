/**
 * cn - 尺寸
 *    -- 内置了三种尺寸，small、default、large
 * en - Size
 *    -- There are three built-in size: small、default、large.
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function() {
  return (
    <div>
      {['small', 'default', 'large'].map(size => (
        <div key={size} style={{ marginBottom: 12 }}>
          <DatePicker size={size} type="datetime" style={{ marginRight: 12 }} defaultValue={Date.now()} />
          <DatePicker size={size} style={{ marginRight: 12 }} defaultValue={Date.now()} />
          <DatePicker size={size} type="time" defaultValue="12:12:12" />
        </div>
      ))}
    </div>
  )
}
