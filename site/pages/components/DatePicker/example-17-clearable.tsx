/**
 * cn - 可清空
 *    -- 允许清空内容
 * en - Clearable
 *    -- Could be clearable
 */
import React from 'react'
import { DatePicker } from 'shineout'

const App: React.FC = () => (
  <div>
    <DatePicker
      clearable
      defaultValue="2022-02-22"
      onChange={v => {
        console.log(v)
      }}
      type="date"
      placeholder="Select date"
    />
  </div>
)
export default App
