/**
 * cn - 点击回调
 *    -- 点击选择框后的回调
 * en - OnClick
 *    -- Checkbox click callback
 */
import React, { useState } from 'react'
import { Checkbox } from 'shineout'

const App: React.FC = () => {
  const [total, setTotal] = useState(0)

  return (
    <div>
      <Checkbox onClick={() => setTotal(total + 1)}>
        Click Me
        {` ${total} Times!`}
      </Checkbox>
    </div>
  )
}

export default App
