/**
 * cn - 默认月份
 *    -- 设置  defaultRangeMonth 可以设置范围选择的初始面板月份.优先级低于 value 和 defaultValue, 值为时间对象或者时间戳
 * en - Range
 *    --Set the range property to select range, the input value and return value is an array of length 2.
 */
import React from 'react'
import { DatePicker } from 'shineout'

const style = { marginBottom: 12 }

const today = new Date()
const lastMonth = Date.now() - 86400000 * 30
const nextMonth = Date.now() + 86400000 * 30

export default function() {
  return (
    <div>
      <DatePicker type="date" range defaultRangeMonth={[lastMonth, today]} style={style} />
      <br />
      <DatePicker type="datetime" range defaultRangeMonth={[today, nextMonth]} style={style} />
    </div>
  )
}
