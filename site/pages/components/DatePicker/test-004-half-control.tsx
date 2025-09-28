/**
 * cn - 半受控
 *    -- 通过封装实现半受控
 * en - 半受控
 *    -- 通过封装实现半受控
 */

import React, { useEffect, useMemo, useState } from 'react'
import { DatePicker, Button, Input } from 'shineout'

const App2: React.FC = () => {
  const [value, setValue] = useState(1759238000000);

  console.log('value:>>', value)
  return (
    <>
      <Button onClick={() => setValue(1760832000000)}>点击</Button>
      <DatePicker value={value}
        onChange={val => {
          setValue(new Date(val as any).getTime())
        }}
      />

      <pre>{value}</pre>
    </>
  )
}

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

    <h4>App2:</h4>
    <App2 />
  </>
)
}

export default App
