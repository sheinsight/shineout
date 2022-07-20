/**
 * cn - 选择日期时间
 *    -- 设置 type 为 datetime，选择日期 + 时间
 * en - Datetime Mode
 *    -- Set type to be datetime to select date and time.
 */
import React from 'react'
import { DatePicker, TYPE } from 'shineout'

type DatePickerValue = TYPE.DatePicker.Value
type DatePickerProps = TYPE.DatePicker.Props<DatePickerValue>
type DatePickerDefaultValue = DatePickerProps['defaultValue']

const Now: DatePickerDefaultValue = Date.now()

const App: React.FC = () => <DatePicker type="datetime" defaultValue={Now} />

export default App
