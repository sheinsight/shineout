/**
 * cn - 指定元素
 *    -- 附着在元素内
 * en - Element
 *    -- Sticky to element
 */
import React, { useRef } from 'react'
import { Alert, Sticky } from 'shineout'

const App: React.FC = () => {
  const Element = useRef(null)

  return (
    <div id="sticky_element" ref={Element} style={{ position: 'relative', height: 400, overflow: 'auto' }}>
      <div style={{ height: 1600, background: '#f2f2f2' }}>
        <div style={{ height: 600 }}>Some text.</div>
        <Sticky top={0} bottom={0} target="#sticky_element">
          <Alert style={{ marginBottom: 0 }} type="info">
            Sticky to element
          </Alert>
        </Sticky>
      </div>
    </div>
  )
}

export default App
