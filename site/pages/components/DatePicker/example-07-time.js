/**
 * cn - 选择时间
 *    -- 设置 type 为 time，选择时间，根据 format 自动加载相应的选择列
 * en - Time Mode
 *    -- Set type to be time to select time and automatically load the corresponding selection column according to the format property.
 */
import React from 'react'
import { DatePicker } from 'shineout'

const style = { marginRight: 12 }

export default function() {
  return (
    <div>
      <DatePicker style={style} type="time" defaultValue={Date.now()} />
      <DatePicker style={style} type="time" format="HH:mm" defaultValue={Date.now()} />
      <DatePicker style={style} type="time" format="hh:mm a" defaultValue={Date.now()} />
    </div>
  )
}
