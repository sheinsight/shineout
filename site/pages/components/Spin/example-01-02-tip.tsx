/**
* cn - tip
     -- 自定义提示文案
* en - tip
     -- custom tip
*/
import React from 'react'
import { Spin } from 'shineout'

const App: React.FC = () => (
  <div style={{ display: 'flex' }}>
    <Spin size={18} color="green" tip="Loading..." />
    <Spin size="54px" color="#dc3545" tip={<span style={{ fontSize: 20 }}>Loading...</span>} />
  </div>
)

export default App
