/**
* cn - default
     -- name="default"
* en - default
     -- name="default"
*/
import React from 'react'
import { Spin } from 'shineout'

const App: React.FC = () => (
  <div style={{ display: 'flex' }}>
    <Spin size={18} color="green" />
    <Spin />
    <Spin size="54px" color="#dc3545" />
  </div>
)

export default App
