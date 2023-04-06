/**
 * cn -
 *    -- 同时禁用日期和时间
 * en -
 *    -- Disable both special date and special time
 */
import React from 'react'
import { DatePicker } from 'shineout'
import dayjs from 'dayjs'

const App: React.FC = () => (
  <div>
    <DatePicker
      inputable
      type="datetime"
      defaultValue={Date.now()}
      style={{ marginInlineEnd: 12 }}
      disabled={d => [0, 5, 6].includes(dayjs(d).day())}
      disabledTime="22:22:22"
    />
  </div>
)

export default App
