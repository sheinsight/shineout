/**
 * cn - 选择范围
 *    -- 设置 range 属性可以选择范围，输入和返回的 value 为长度为 2 的数组
 * en - Range
 *    --Set the range property to select range, the input value and return value is an array of length 2.
 */
import React from 'react'
import { DatePicker } from 'shineout'

const style = { marginBottom: 12 }

export default function () {
  return (
    <div>
      <DatePicker
        range={86400 * 10}
        style={style}
        defaultValue={['2018-05-25', '2018-06-05']}
      />
      <br />
      <DatePicker
        range={86400 * 100}
        onChange={v => console.log(v)}
        type="month"
        style={style}
        placeholder={['first month', 'last-month']}
      />
      <br />
      <DatePicker
        range={3600 * 6}
        type="time"
        format="HH:mm"
        style={style}
      />
      <br />
      <DatePicker
        range
        type="datetime"
        onChange={d => console.log(d)}
      />
    </div>
  )
}
