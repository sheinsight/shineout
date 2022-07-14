/**
 * cn - 时区
 *    -- 设置 timeZone
 * en - timeZone
 *    -- set timeZone
 */
import React, { useState } from 'react'
import { DatePicker, Select, TYPE } from 'shineout'

type DatePickerValue = TYPE.DatePicker.Value
type DatePickerProps = TYPE.DatePicker.Props<DatePickerValue>
type DateTimeZone = DatePickerProps['timeZone']

const offsetList = new Array(26).fill(undefined).map((_, index) => {
  const num = index - 12
  const abs = Math.abs(num)
  const str = abs < 10 ? `0${abs}` : `${abs}`
  return `${num < 0 ? '-' : '+'}${str}`
})

const App: React.FC = () => {
  const [tz, setTz] = useState<DateTimeZone>('+08')
  return (
    <div>
      <DatePicker
        format="T"
        timeZone={tz}
        type="datetime"
        defaultValue={new Date()}
        placeholder="Select datetime"
        onChange={d => console.log(d)}
        formatResult="yyyy-MM-dd HH:mm:ss"
      />
      <Select
        keygen
        width={90}
        value={tz}
        data={offsetList}
        onChange={v => setTz(v)}
        style={{ marginInlineStart: 12 }}
      />
    </div>
  )
}

export default App
