/**
 * cn -
 *    -- 在清空值时抛出抛出 undefined
 * en -
 *    -- onChange get undefined while clear value
 */
import React, { useState } from 'react'
import { DatePicker, Input, TYPE } from 'shineout'

type DatePickerValue = TYPE.DatePicker.Value

const App: React.FC = () => {
  const [value, setValue] = useState<DatePickerValue>('2022-02-22')
  return (
    <div>
      <DatePicker
        clearable
        type="date"
        value={value}
        clearWithUndefined
        onChange={setValue}
        style={{ marginBottom: 5 }}
        placeholder="Select date"
      />

      <br />

      <Input.Group style={{ width: 150 }} disabled>
        <b>Value</b>
        <Input value={String(value)} />
      </Input.Group>
    </div>
  )
}
export default App
