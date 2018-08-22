/**
 * cn - 基本用法
 *    -- 最基本的用法
 * en - Base
 *    -- The basic usage
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function () {
  return (
    <DatePicker
      placeholder="Select date"
      onChange={v => console.log(v)}
    />
  )
}
