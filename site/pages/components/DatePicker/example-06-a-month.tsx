/**
 * cn - 选择月
 *    -- 设置 type 为 month，选择月
 * en - Month Mode
 *    -- Set type to be month to select month.
 */
import React from 'react'
import { DatePicker, TYPE } from 'shineout'

type DatePickerValue = TYPE.DatePicker.Value
type DatePickerProps = TYPE.DatePicker.Props<DatePickerValue>
type DatePickerDefaultValue = DatePickerProps['defaultValue']

const Now: DatePickerDefaultValue = Date.now()

const App: React.FC = () => <DatePicker type="month" defaultValue={Now} />

export default App
