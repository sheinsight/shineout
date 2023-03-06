/**
 * cn -
 *    -- 步进设置
 * en - Step
 *    -- Set step of TimePicker
 */
import React from 'react'
import { DatePicker } from 'shineout'

const style = { marginInlineEnd: 12 }

const step: number = 2

const App: React.FC = () => (
  <div>
    <DatePicker placeholder="Hour Step" style={style} type="time" hourStep={step} />
    <DatePicker placeholder="Minute Step" style={style} type="time" minuteStep={step} />
    <DatePicker placeholder="Second Step" style={style} type="time" secondStep={step} />
  </div>
)

export default App
