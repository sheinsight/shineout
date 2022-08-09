/**
 * cn - 选择时间
 *    -- 设置 type 为 time，选择时间，根据 format 自动加载相应的选择列
 * en - Time Mode
 *    -- Set type to be time to select time and automatically load the corresponding selection column according to the format property.
 */
import React from 'react'
import { DatePicker, TYPE } from 'shineout'

type DatePickerValue = TYPE.DatePicker.Value
type DatePickerProps = TYPE.DatePicker.Props<DatePickerValue>
type DatePickerDefaultValue = DatePickerProps['defaultValue']

const Now: DatePickerDefaultValue = Date.now()

const style = { marginInlineEnd: 12 }

const App: React.FC = () => (
  <div>
    <DatePicker style={style} type="time" defaultValue={Now} />
    <DatePicker style={style} type="time" format="HH:mm" defaultValue={Now} />
    <DatePicker style={style} type="time" format="hh:mm a" defaultValue={Now} />
  </div>
)

export default App
