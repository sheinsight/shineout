/**
 * cn - 可编辑
 *    -- onCompleted 不为空时，可编辑
 * en - editable
 *    -- editable when onCompleted is not empty
 */
import React, { useState } from 'react'
import { Tag } from 'shineout'

const App: React.FC = () => {
  const [value, setValue] = useState('abc')

  return (
    <div>
      <Tag
        onCompleted={val => {
          setValue(val)
        }}
        onClose={() => {
          console.log('close')
        }}
      >
        {value}
      </Tag>
    </div>
  )
}

export default App
