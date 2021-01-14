/**
 * cn -
 *    -- disabled 为函数时，第二个参数 type，可以有针对性的disabled，用于支持复杂条件下 Datepicker disabled。
 * en -
 *    -- When disabled is a function, the second parameter type can be disabled specifically to support Datepicker disabled under complex conditions.
 */
import React from 'react'
import { DatePicker } from 'shineout'
import getDay from 'date-fns/getDay'

export default function() {
  return (
    <div>
      <DatePicker
        disabled={(d, type) => {
          if (type === 'day') return getDay(d) === 0 || getDay(d) === 6
          if (type === 'time') return d.getHours() === 0
          return false
        }}
        type="datetime"
        style={{ marginRight: 12 }}
        defaultTime="10:00:00"
        defaultValue={Date.now()}
      />
    </div>
  )
}
