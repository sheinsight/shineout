/**
 * cn - T:bottom
 *    --
 * en - T:bottom
 *    --
 */
import React from 'react'
import { Sticky } from 'shineout'

const App: React.FC = () => (
  <div id="target" style={{ height: 100, overflow: 'auto' }}>
    <Sticky className="hello" target="#target" bottom={20} top={0}>
      <div style={{ height: 400 }}>Hello</div>
      <div style={{ background: '#ebebeb', marginBottom: 0 }}>Hello</div>
    </Sticky>
  </div>
)
export default App
