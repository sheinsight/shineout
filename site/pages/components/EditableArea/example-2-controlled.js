/**
 * cn - 受控
 *    -- 传递value, onChange使组件受控
 * en - Controlled
 *    -- Pass value and onChange props to make the component controlled
 */

import React, { useState } from 'react'
import { EditableArea } from 'shineout'

export default function() {
  const [value, setValue] = useState('')
  return (
    <EditableArea
      value={value}
      placeholder="Input something"
      onChange={val => {
        setValue(val)
      }}
      style={{ width: 300 }}
    />
  )
}
