/**
 * cn - timepicker range max
 *    -- timepicker max 和 range 一起使用导致禁用逻辑错误
 */
import React from 'react'
import { DatePicker } from 'shineout'

const date = new Date('2022/02/24 23:59:59')

const App = () => (
  <div>
    <DatePicker
      type="datetime"
      defaultValue={['2022-02-17 00:00:00', '2022-02-24 00:00:00']}
      range={7 * 24 * 3600}
      style={{ marginTop: '12px' }}
      placeholder="Select datetime"
      max={date}
    />
  </div>
)
export default App
