/**
 * cn - 可输入
 *    -- 设置 inputable 使日期可输入
 * en - Inputable
 *    -- Set inputable to true, you can change the value by input
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function () {
  return (
    <div>
      <DatePicker
        placeholder="Input date"
        inputable
        onChange={v => console.log(v)}
        style={{ marginRight: 12 }}
      />

      <DatePicker
        type="datetime"
        inputable
        defaultValue={new Date()}
        onChange={v => console.log(v)}
      />

      <br />

      <DatePicker
        range
        inputable
        defaultValue={[Date.now() - 864000000, new Date()]}
        onChange={v => console.log(v)}
        style={{ marginTop: 12 }}
      />
    </div>
  )
}
