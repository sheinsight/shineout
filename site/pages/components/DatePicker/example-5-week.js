/**
 * cn - 星期选择
 * en - Week Type
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function () {
  return (
    <DatePicker type="week" format="YYYY wWW" defaultValue={Date.now()} />
  )
}
