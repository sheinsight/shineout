/**
 * cn - 时区
 *    -- 设置 timeZone
 * en - timeZone
 *    -- set timeZone
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function() {
  return (
    <div>
      <DatePicker type="date" timeZone="Pacific/Honolulu" defaultValue={new Date()} placeholder="Select datetime" />
      <br />
      <DatePicker
        type="datetime"
        timeZone="-08"
        defaultValue={new Date()}
        placeholder="Select datetime"
        style={{ marginTop: '12px' }}
      />
    </div>
  )
}
