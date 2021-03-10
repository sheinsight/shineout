/**
 * cn - 范围选择
 *    -- 设置 range 属性可以选择范围，输入和返回的 value 为长度为 2 的数组
 * en - Range
 *    --Set the range property to select range, the input value and return value is an array of length 2.
 */
import React from 'react'
import { DatePicker } from 'shineout'

const style = { marginBottom: 12 }

export default function() {
  return (
    <div>
      <DatePicker
        formatResult="yy-MM-dd"
        range={86400 * 20}
        type="date"
        onChange={a => console.log(a)}
        style={style}
        defaultValue={['21-03-10', '21-03-14']}
        placeholder={['Start date', 'End date']}
      />
      <br />
      <DatePicker
        range={86400 * 20}
        type="date"
        onChange={a => console.log(a)}
        style={style}
        placeholder={['Start date', 'End date']}
      />
      <br />
      <DatePicker
        range={86400 * 20}
        type="week"
        onChange={a => console.log(a)}
        style={style}
        placeholder={['Start week', 'End week']}
      />
      <br />
      <DatePicker
        range={86400 * 100}
        onChange={v => console.log(v)}
        type="month"
        style={style}
        placeholder={['First month', 'Last month']}
      />
      <br />
      <DatePicker
        min={Date.now()}
        range={3600 * 6}
        type="time"
        format="HH:mm"
        style={style}
        placeholder={['Start time', 'End time']}
      />
      <br />
      <DatePicker
        range
        type="datetime"
        style={style}
        onChange={d => console.log(d)}
        placeholder={['Start datetime', 'End datetime']}
      />
      <br />
      <DatePicker
        range
        min={Date.now()}
        max={Date.now() + 86400000 * 4}
        type="datetime"
        defaultTime={['02:33:33', '14:33:33']}
        onChange={d => console.log(d)}
        placeholder={['Start datetime', 'End datetime']}
      />
    </div>
  )
}
