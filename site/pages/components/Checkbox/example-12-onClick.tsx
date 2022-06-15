/**
 * cn - 点击回调
 *    -- 点击选择框后的回调
 * en - OnClick
 *    -- Checkbox click callback
 */
import React, { useState } from 'react'
import { Checkbox, TYPE } from 'shineout'

type CheckboxProps<T = any> = TYPE.Checkbox.Props<T>
type CheckboxOnClick = CheckboxProps['onClick']

const App: React.FC = () => {
  const [total, setTotal] = useState(0)

  const handleClick: CheckboxOnClick = () => {
    setTotal(total + 1)
  }
  return (
    <div>
      <Checkbox onClick={handleClick}>
        Click Me
        {` ${total} Times!`}
      </Checkbox>
    </div>
  )
}

export default App
