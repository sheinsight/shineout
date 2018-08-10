/**
 * cn -
 *    -- disabled 为函数时，禁用返回为true的选项
 * en -
 *    -- When the disabled is a function, disbale the option that return true.
 */
import React from 'react'
import { DatePicker } from 'shineout'

const today = Date.now()

export default function () {
  return (
    <div>
      <DatePicker
        disabled={(d) => {
          const ts = 86400000 * 5
          if (d.getTime() > today + ts) return true
          if (d.getTime() < today - ts) return true
          return false
        }}
        style={{ marginRight: 12 }}
        defaultValue={Date.now()}
      />

      <DatePicker
        disabled={(d) => {
          if (d.getHours() > 15) return true
          return false
        }}
        type="time"
        defaultValue="12:12:12"
      />
    </div>
  )
}
