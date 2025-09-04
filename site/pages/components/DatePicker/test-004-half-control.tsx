/**
 * cn - 半受控
 *    -- 通过封装实现半受控
 * en - 半受控
 *    -- 通过封装实现半受控
 */

import React, { useEffect, useMemo, useState } from 'react'
import { DatePicker, Button, Input } from 'shineout'

const App: React.FC = () => {
  const [type, setType] = useState(false)
  const value = useMemo(() => {
    console.log('type----->', type)
    return type ? 1760716800000 : 1759248000000
    // return type ? new Date(1760716800000) : new Date(1759248000000)
  }, [type])
  useEffect(() => {
    console.log('value----->', value, new Date(value))
  }, [value])
  return (
  <>
    <Button onClick={() => setType(!type)}>点击</Button>
    <DatePicker value={value}  />
    <Input value={value.toString()} />
    <input value={value} />
  </>
)
}

export default App
