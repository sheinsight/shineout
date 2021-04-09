/**
 * cn -
 *    -- disabled 为函数时，禁用返回为true的选项, disable 应该用于禁用一些特殊的时间, 如果需要使用比如现在以前的时间不能选择的, 推荐使用 min/max。（注意：如果只想单独禁用时间，可使用 disabledTime 属性。）
 * en -
 *    -- When the disabled is a function, disbale should be used to disable some special time, if you need to use such as now before the time can not be selected, it is recommended to use min/max. (Note: If you only want to disable the time alone, you can use the disabledTime attribute.)
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
        defaultValue={Date.now()}
      />

      <DatePicker
        disabled={d => {
          if (d.getHours() > 15) return true
          return false
        }}
        type="time"
        defaultValue="12:12:12"
      />
    </div>
  )
}
