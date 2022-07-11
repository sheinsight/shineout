/**
 * cn - 默认月份
 *    -- 设置  defaultRangeMonth 可以设置范围选择的初始面板月份.优先级低于 value 和 defaultValue, 值为时间对象或者时间戳
 * en - Range
 *    --Set the range property to select range, the input value and return value is an array of length 2.
 */
import React from 'react'
import { DatePicker, TYPE } from 'shineout'

type DatePickerValue = TYPE.DatePicker.Value
type DatePickerDateTimeType = TYPE.DatePicker.DateTimeType
type DatePickerProps = TYPE.DatePicker.Props<DatePickerValue>
type DatePickerDefaultRangeMonth = DatePickerProps['defaultRangeMonth']

const today = new Date()
const style = { marginBottom: 12 }
const lastMonth: DatePickerDateTimeType = Date.now() - 86400000 * 30
const nextMonth: DatePickerDateTimeType = Date.now() + 86400000 * 30
const DateRangeLast: DatePickerDefaultRangeMonth = [lastMonth, today]
const DateRangeNext: DatePickerDefaultRangeMonth = [today, nextMonth]

const App: React.FC = () => (
  <div>
    <DatePicker
      range
      type="date"
      style={style}
      defaultRangeMonth={DateRangeLast}
      placeholder={['Start date', 'End date']}
    />

    <br />

    <DatePicker
      range
      style={style}
      type="datetime"
      defaultRangeMonth={DateRangeNext}
      placeholder={['Start datetime', 'End datetime']}
    />
  </div>
)

export default App
