/**
* cn - chasing-dots
     -- name="chasing-dots"
* en - chasing-dots
     -- name="chasing-dots"
*/
import React from 'react'
import { Spin } from 'shineout'

const App: React.FC = () => (
  <div style={{ display: 'flex' }}>
    <Spin size={18} name="chasing-dots" color="green" />

    <Spin name="chasing-dots" />

    <Spin size="54px" name="chasing-dots" color="#dc3545" />
  </div>
)

export default App
