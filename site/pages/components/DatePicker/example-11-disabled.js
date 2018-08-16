/**
 * cn -
 *    -- disabled 为函数时，禁用返回为true的选项
 * en -
 *    -- When the disabled is a function, disbale the option that the function to return true.
 */
import React from 'react'
import { DatePicker } from 'shineout'

// minisecond
const today = Date.now() - 1000

export default function () {
  return (
    <div>
      <DatePicker
        disabled={d => d.getTime() <= today}
        type="datetime"
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
