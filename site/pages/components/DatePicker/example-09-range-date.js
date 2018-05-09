/**
 * cn - 选择范围
 * en - Range
 */
import React from 'react'
import { DatePicker } from 'shineout'

const style = { marginBottom: 12 }

export default function () {
  return (
    <div>
      <DatePicker range style={style} defaultValue={['2018-04-20', '2018-06-08']} />
      <br />
      <DatePicker range type="month" style={style} placeholder={['first month', 'last-month']} />
      <br />
      <DatePicker range type="time" format="HH:mm" defaultValue={['09:00', '18:00']} style={style} />
      <br />
      <DatePicker range type="datetime" onChange={d => console.log(d)} />
    </div>
  )
}
