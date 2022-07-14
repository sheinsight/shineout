/**
 * cn - 可输入
 *    -- 设置 inputable 使日期可输入
 * en - Inputable
 *    -- Set inputable to true, you can change the value by input
 */
import React from 'react'
import { DatePicker, TYPE } from 'shineout'

type DatePickerValue = TYPE.DatePicker.Value
type DatePickerProps = TYPE.DatePicker.Props<DatePickerValue>
type DatePickerDefaultValue = DatePickerProps['defaultValue']

const Now: DatePickerDefaultValue = Date.now()

const App: React.FC = () => (
  <div>
    <DatePicker placeholder="Input date" inputable style={{ marginInlineEnd: 12 }} />

    <DatePicker type="datetime" inputable defaultValue={Now} />

    <br />

    <DatePicker range inputable defaultValue={[Now - 864000000, new Date()]} style={{ marginTop: 12 }} />
  </div>
)

export default App
