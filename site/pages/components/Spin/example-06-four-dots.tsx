/**
* cn - four-dots
     -- name="four-dots"
* en - four-dots
     -- name="four-dots"
*/
import React from 'react'
import { Spin } from 'shineout'

const App: React.FC = () => (
  <div style={{ display: 'flex' }}>
    <Spin size={18} name="four-dots" color="green" />

    <Spin name="four-dots" />

    <Spin size="54px" name="four-dots" color="#dc3545" />
  </div>
)

export default App
