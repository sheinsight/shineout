/**
 * cn - 选择天
 *    -- 设置 type 为 date，选择 天
 * en - Day Mode
 *    -- Set type to be date to select day.
 */
import React from 'react'
import { DatePicker, TYPE } from 'shineout'

type DatePickerValue = TYPE.DatePicker.Value
type DatePickerProps = TYPE.DatePicker.Props<DatePickerValue>
type DatePickerDefaultValue = DatePickerProps['defaultValue']

const Now: DatePickerDefaultValue = Date.now()

const App: React.FC = () => <DatePicker type="date" format="yyyy-MM-dd" defaultValue={Now} />

export default App
