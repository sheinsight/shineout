/**
 * cn - 范围选择
 *    -- 设置 range 属性可以选择范围，输入和返回的 value 为长度为 2 的数组
 * en - Range
 *    --Set the range property to select range, the input value and return value is an array of length 2.
 */
import React from 'react'
import { DatePicker } from 'shineout'

const style = { marginBottom: 12 }

export default function() {
  return (
    <div>
      <DatePicker range={86400 * 20} type="date" onChange={a => console.log(a)} style={style} />
      <br />
      <DatePicker range={86400 * 20} type="week" onChange={a => console.log(a)} style={style} />
      <br />
      <DatePicker
        range={86400 * 100}
        onChange={v => console.log(v)}
        type="month"
        style={style}
        placeholder={['first month', 'last-month']}
      />
      <br />
      <DatePicker range={3600 * 6} type="time" format="HH:mm" style={style} />
      <br />
      <DatePicker range type="datetime" style={style} onChange={d => console.log(d)} />
      <br />
      <DatePicker range type="datetime" defaultTime={['02:33:33', '14:33:33']} onChange={d => console.log(d)} />
    </div>
  )
}
