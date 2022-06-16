/**
 * cn - 默认月份
 *    -- 设置  defaultRangeMonth 可以设置范围选择的初始面板月份.优先级低于 value 和 defaultValue, 值为时间对象或者时间戳
 * en - Range
 *    --Set the range property to select range, the input value and return value is an array of length 2.
 */
import React from 'react'
import { DatePicker, TYPE } from 'shineout'

type DatePickerValue = TYPE.DatePicker.Value
type DatePickerProps = TYPE.DatePicker.Props<DatePickerValue>
type DatePickerDefaultRangeMonth = DatePickerProps['defaultRangeMonth']

const style = { marginBottom: 12 }

const today = new Date()
const lastMonth = Date.now() - 86400000 * 30
const nextMonth = Date.now() + 86400000 * 30

const DateRange: DatePickerDefaultRangeMonth = [lastMonth, today]
const DateTimeRange: DatePickerDefaultRangeMonth = [today, nextMonth]

const App: React.FC = () => (
  <div>
    <DatePicker
      range
      type="date"
      style={style}
      defaultRangeMonth={DateRange}
      placeholder={['Start date', 'End date']}
    />

    <br />

    <DatePicker
      range
      style={style}
      type="datetime"
      defaultRangeMonth={DateTimeRange}
      placeholder={['Start datetime', 'End datetime']}
    />
  </div>
)

export default App
