/**
 * cn - 多选
 *    -- multiple 属性为true时，为多选状态，默认为单选
 * en - Multiple
 *    -- Set the multiple property to true, it is multi-selection.
 */
import React, { useState } from 'react'
import { Select, TYPE } from 'shineout'

interface SelectItem {
  id: string
}
type SelectValue = string[]
type SelectProps = TYPE.Select.Props<SelectItem, SelectValue>
type SelectOnChange = SelectProps['onChange']

const style: React.CSSProperties = { width: 300, marginBottom: 15 }

const data: SelectItem[] = [
  { id: 'red' },
  { id: 'cyan' },
  { id: 'blue' },
  { id: 'green' },
  { id: 'violet' },
  { id: 'yellow' },
  { id: 'orange' },
]

const App: React.FC = () => {
  const [value, setValue] = useState<SelectValue>(['pink'])

  const handleChange: SelectOnChange = (v, d, c) => {
    console.log(v, d, c)
    setValue(v)
  }

  return (
    <Select
      multiple
      keygen="id"
      format="id"
      data={data}
      style={style}
      value={value}
      renderItem="id"
      onChange={handleChange}
      placeholder="Multiple select"
    />
  )
}

export default App
