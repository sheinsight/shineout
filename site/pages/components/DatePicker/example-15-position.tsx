/**
 * cn - 弹出框位置
 *    -- 通过设置 position 指定弹出面板的位置。默认为自动
 * en - Position
 *    -- Set Position can control the different position of DatePicker
 */
import React from 'react'
import { DatePicker } from 'shineout'

const style = { marginRight: '12px' }

const App: React.FC = () => (
  <div>
    <DatePicker style={style} type="date" placeholder="left-top" position="left-top" />
    <DatePicker style={style} type="date" placeholder="right-top" position="right-top" />
    <DatePicker style={style} type="date" placeholder="left-bottom" position="left-bottom" />
    <DatePicker style={style} type="date" placeholder="right-bottom" position="right-bottom" />
  </div>
)

export default App
