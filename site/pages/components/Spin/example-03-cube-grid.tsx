/**
* cn - cube-grid
     -- name="cube-grid"
* en - cube-grid
     -- name="cube-grid"
*/
import React from 'react'
import { Spin } from 'shineout'

const App: React.FC = () => (
  <div style={{ display: 'flex' }}>
    <Spin size={18} name="cube-grid" color="green" />

    <Spin name="cube-grid" />

    <Spin size="54px" name="cube-grid" color="#dc3545" />
  </div>
)

export default App
