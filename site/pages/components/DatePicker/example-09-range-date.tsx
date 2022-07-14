/**
 * cn - 范围选择
 *    -- 设置 range 属性可以选择范围，输入和返回的 value 为长度为 2 的数组
 * en - Range
 *    --Set the range property to select range, the input value and return value is an array of length 2.
 */
import React from 'react'
import { DatePicker, TYPE } from 'shineout'

type DatePickerDateTimeType = TYPE.DatePicker.DateTimeType

const style = { marginBottom: 12 }
const Now: DatePickerDateTimeType = Date.now()

const App: React.FC = () => (
  <div>
    <DatePicker
      type="date"
      style={style}
      range={86400 * 20}
      formatResult="yy-MM-dd"
      onChange={a => console.log(a)}
      defaultValue={['21-03-10', '21-03-14']}
      placeholder={['Start date', 'End date']}
    />

    <br />

    <DatePicker
      type="date"
      style={style}
      range={86400 * 20}
      onChange={a => console.log(a)}
      placeholder={['Start date', 'End date']}
    />

    <br />

    <DatePicker
      type="week"
      style={style}
      range={86400 * 20}
      onChange={a => console.log(a)}
      placeholder={['Start week', 'End week']}
    />

    <br />

    <DatePicker
      type="month"
      style={style}
      range={86400 * 100}
      onChange={v => console.log(v)}
      placeholder={['First month', 'Last month']}
    />

    <br />

    <DatePicker
      type="quarter"
      style={style}
      onChange={v => console.log(v)}
      placeholder={['First quarter', 'Last quarter']}
    />

    <br />

    <DatePicker
      min={Now}
      type="time"
      style={style}
      format="HH:mm"
      range={3600 * 6}
      placeholder={['Start time', 'End time']}
    />

    <br />

    <DatePicker
      range
      style={style}
      type="datetime"
      onChange={d => console.log(d)}
      defaultTime={['00:00:00', '23:59:59']}
      placeholder={['Start datetime', 'End datetime']}
    />

    <br />

    <DatePicker
      range
      min={Now}
      type="datetime"
      max={Now + 86400000 * 4}
      onChange={d => console.log(d)}
      defaultTime={['02:33:33', '14:33:33']}
      placeholder={['Start datetime', 'End datetime']}
    />
  </div>
)

export default App
