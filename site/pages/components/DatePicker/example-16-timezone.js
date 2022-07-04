/**
 * cn - 时区
 *    -- 设置 timeZone
 * en - timeZone
 *    -- set timeZone
 */
import React from 'react'
import { DatePicker, Select } from 'shineout'

const offsetList = new Array(26).fill(undefined).map((_, index) => {
  const num = index - 12
  const abs = Math.abs(num)
  const str = abs < 10 ? `0${abs}` : `${abs}`
  return `${num < 0 ? '-' : '+'}${str}`
})

export default function() {
  const [tz, setTz] = React.useState('+08')
  return (
    <div>
      <DatePicker
        type="datetime"
        format="T"
        formatResult="yyyy-MM-dd HH:mm:ss"
        defaultValue={new Date()}
        placeholder="Select datetime"
        timeZone={tz}
        onChange={d => {
          console.log(d)
        }}
      />
      <Select
        width={90}
        data={offsetList}
        keygen
        value={tz}
        onChange={v => {
          setTz(v)
        }}
      />
    </div>
  )
}
