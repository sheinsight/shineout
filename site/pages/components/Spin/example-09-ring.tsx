/**
* cn - ring
     -- name="ring"
* en - ring
     -- name="ring"
*/
import React from 'react'
import { Spin } from 'shineout'

const App: React.FC = () => (
  <div style={{ display: 'flex' }}>
    <Spin size={18} name="ring" color="green" />

    <Spin name="ring" />

    <Spin size="54px" name="ring" color="#dc3545" />
  </div>
)

export default App
