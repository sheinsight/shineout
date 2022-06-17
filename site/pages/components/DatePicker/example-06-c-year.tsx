/**
 * cn - 选择年
 *    -- 设置 type 为 year，选择年
 * en - Year Mode
 *    -- Set type to be year to select year.
 */
import React from 'react'
import { DatePicker } from 'shineout'

const App: React.FC = () => <DatePicker type="year" defaultValue={Date.now()} />

export default App
