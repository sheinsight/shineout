/**
 * cn - 面板默认时间
 *    -- 打开面板后的默认时间，仅在未选择日期时生效
 * en - DefaultPickerValue
 *    -- default date of panel，work under has no value
 */
import React from 'react'
import { DatePicker } from 'shineout'

const App: React.FC = () => (
  <div>
    <DatePicker defaultPickerValue="2022-09" type="date" placeholder="Select date" style={{ marginBottom: 12 }} />

    <br />

    <DatePicker
      range
      type="date"
      placeholder={['Start date', 'End date']}
      defaultPickerValue={['2022-11', '2022-12']}
    />
  </div>
)

export default App
