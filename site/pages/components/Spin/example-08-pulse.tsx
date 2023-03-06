/**
* cn - pulse
     -- name="pulse"
* en - pulse
     -- name="pulse"
*/
import React from 'react'
import { Spin } from 'shineout'

const App: React.FC = () => (
  <div style={{ display: 'flex' }}>
    <Spin size={18} name="pulse" color="green" />

    <Spin name="pulse" />

    <Spin size="54px" name="pulse" color="#dc3545" />
  </div>
)

export default App
