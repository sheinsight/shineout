/**
 * cn - 选择季度
 *    -- 设置 type 为 quarter，选择季度
 * en - Quarter Mode
 *    -- Set type to be quarter to select month.
 */
import React from 'react'
import { DatePicker, TYPE } from 'shineout'

type DatePickerValue = TYPE.DatePicker.Value
type DatePickerProps = TYPE.DatePicker.Props<DatePickerValue>
type DatePickerDefaultValue = DatePickerProps['defaultValue']

const Now: DatePickerDefaultValue = Date.now()

const App: React.FC = () => <DatePicker type="quarter" defaultValue={Now} />

export default App
