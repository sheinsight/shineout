/**
 * cn - 禁用
 *    -- disabled 为 true 时，禁用整个日期选择。
 * en - Disabled
 *    -- When the disabled is true, disable all the date selection.
 */
import React from 'react'
import { DatePicker, TYPE } from 'shineout'

type DatePickerValue = TYPE.DatePicker.Value
type DatePickerProps = TYPE.DatePicker.Props<DatePickerValue>
type DatePickerDefaultValue = DatePickerProps['defaultValue']

const Now: DatePickerDefaultValue = Date.now()

const App: React.FC = () => <DatePicker disabled defaultValue={Now} />

export default App
