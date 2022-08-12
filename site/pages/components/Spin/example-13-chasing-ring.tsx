/**
* cn - chasing-ring
     -- name="chasing-ring"
* en - chasing-ring
     -- name="chasing-ring"
*/
import React from 'react'
import { Spin } from 'shineout'

const App: React.FC = () => (
  <div style={{ display: 'flex' }}>
    <Spin size={18} name="chasing-ring" color="green" />

    <Spin name="chasing-ring" />

    <Spin size="54px" name="chasing-ring" color="#dc3545" />
  </div>
)

export default App
