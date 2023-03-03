/**
 * cn - 选择天
 *    -- 设置 type 为 date，选择 天
 * en - Day Mode
 *    -- Set type to be date to select day.
 */
import React from 'react'
import { DatePicker } from 'shineout'

const Now = Date.now()

const App: React.FC = () => <DatePicker type="date" format="YYYY-MM-DD" defaultValue={Now} />

export default App
