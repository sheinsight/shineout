/**
 * cn - 尺寸
 *    -- 内置了三种尺寸，small、default、large
 * en - Size
 *    -- There are three built-in size: small、default、large.
 */
import React from 'react'
import { DatePicker, TYPE } from 'shineout'

type DatePickerValue = TYPE.DatePicker.Value
type DatePickerProps = TYPE.DatePicker.Props<DatePickerValue>
type DatePickerSize = DatePickerProps['size']
type DatePickerDefaultValue = DatePickerProps['defaultValue']

const Now: DatePickerDefaultValue = Date.now()
const Size: DatePickerSize[] = ['small', 'default', 'large']

const App: React.FC = () => (
  <div>
    {Size.map(size => (
      <div key={size} style={{ marginBottom: 12 }}>
        <DatePicker size={size} type="datetime" style={{ marginInlineEnd: 12 }} defaultValue={Now} />
        <DatePicker size={size} style={{ marginInlineEnd: 12 }} defaultValue={Now} />
        <DatePicker size={size} type="time" defaultValue="12:12:12" />
      </div>
    ))}
  </div>
)

export default App
