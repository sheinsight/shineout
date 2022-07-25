/**
 * cn - 弹出展示
 *    -- 设置 popup 属性后，children 会通过弹出框展示
 * en - Popup
 *    -- After setting the popup property, children will be displayed through a popup box
 */
import React, { useState } from 'react'
import { Progress, Button } from 'shineout'

let store = 0

const App: React.FC = () => {
  const [value, setValue] = useState(0)

  const handleClick = (v = store) => {
    v += Math.random() * 12
    if (v >= 100) {
      v = 100
      setValue(v)
    } else {
      store = v
      if (store > 100) {
        setValue(100)
        store = 0
      } else {
        setValue(v)
        setTimeout(handleClick, 320)
      }
    }
  }

  return (
    <div style={{ width: 400 }}>
      <Progress value={value} popup>{`${parseInt(value.toString(), 10)}%`}</Progress>

      <br />

      <Button onClick={() => handleClick(0)}>Start</Button>
    </div>
  )
}

export default App
