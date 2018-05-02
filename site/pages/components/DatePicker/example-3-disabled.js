/**
 * cn - 禁用
 * en - Disabled
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function () {
  return (
    <DatePicker disabled defaultValue={Date.now()} />
  )
}
