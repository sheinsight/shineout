/**
 * cn - 基本用法
 *    -- 最基本的用法
 * en - Base
 *    -- The basic usage
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function() {
  return (
    <div>
      <DatePicker type="date" placeholder="Select date" />
      <br />
      <DatePicker type="datetime" style={{ marginTop: '12px' }} placeholder="Select datetime" />
    </div>
  )
}
