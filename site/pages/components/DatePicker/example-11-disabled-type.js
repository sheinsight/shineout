/**
 * cn -
 *    -- disabledTime 属性支持单独禁用时间。
 * en -
 *    -- The disabledTime attribute supports separate disable time.
 */
import React from 'react'
import { DatePicker } from 'shineout'
import getDay from 'date-fns/getDay'

export default function() {
  return (
    <div>
      <DatePicker
        disabled={d => getDay(d) === 0 || getDay(d) === 6}
        type="datetime"
        style={{ marginRight: 12 }}
        defaultTime="10:00:00"
        defaultValue={Date.now()}
        disabledTime={time => time === '12:00:00'}
      />
    </div>
  )
}
