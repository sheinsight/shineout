/**
 * cn -
 *    -- disabled 为函数时，禁用返回为true的选项
 * en -
 */
import React from 'react'
import { DatePicker } from 'shineout'

const today = Date.now()
const disabled = (d) => {
  const ts = 86400000 * 10
  if (d.getTime() > today + ts) return true
  if (d.getTime() < today - ts) return true
  return false
}

export default function () {
  return (
    <DatePicker disabled={disabled} defaultValue={Date.now()} />
  )
}
