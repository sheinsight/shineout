/**
 * cn - 选择星期
 *    -- 设置 type 为 week，选择星期
 * en - Week Mode
 *    -- Set type to be week to select week.
 */
import React from 'react'
import { DatePicker } from 'shineout'

const Now = Date.now()

const App: React.FC = () => <DatePicker type="week" defaultValue={Now} />

export default App
