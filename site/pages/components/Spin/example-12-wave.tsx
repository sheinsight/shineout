/**
* cn - wave
     -- name="wave"
* en - wave
     -- name="wave"
*/
import React from 'react'
import { Spin } from 'shineout'

const App: React.FC = () => (
  <div style={{ display: 'flex' }}>
    <Spin size={18} name="wave" color="green" />

    <Spin name="wave" />

    <Spin size="54px" name="wave" color="#dc3545" />
  </div>
)

export default App
