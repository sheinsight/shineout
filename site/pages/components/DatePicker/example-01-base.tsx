/**
 * cn - 基本用法
 *    -- 最基本的用法
 * en - Base
 *    -- The basic usage
 */
import React from 'react'
import { DatePicker } from 'shineout'

const App: React.FC = () => (
  <div>
    <DatePicker inputable type="date" placeholder="Select date" />
    <br />
    <DatePicker type="datetime" style={{ marginTop: '12px' }} placeholder="Select datetime" />
  </div>
)

export default App
