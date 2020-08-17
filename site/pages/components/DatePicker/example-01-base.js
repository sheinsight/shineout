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
      {/* <DatePicker type="date" /> */}
      {/* <br /> */}
      <DatePicker
        type="datetime"
        style={{ marginTop: '12px' }}
        defaultTime={['00:00:00', '23:59:59']}
        range={3600 * 24 * 3}
        // defaultValue={['2020-08-15 00:00:00', '2020-08-17 23:59:59']}
        min="2020-08-10"
        max="2020-08-20"
      />
    </div>
  )
}
