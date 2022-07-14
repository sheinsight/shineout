/**
 * cn -
 *    -- disabledTime 属性支持单独禁用时间。
 * en -
 *    -- The disabledTime attribute supports separate disable time.
 */
import React from 'react'
import { DatePicker } from 'shineout'
import dayjs from 'dayjs'

export default function() {
  return (
    <div>
      <DatePicker
        disabled={d => [0, 6].includes(dayjs(d).day())}
        type="datetime"
        style={{ marginInlineEnd: 12 }}
        defaultTime="10:00:00"
        defaultValue={Date.now()}
        disabledTime={time => time === '12:00:00'}
      />
    </div>
  )
}
