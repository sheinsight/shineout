/**
 * cn - 选择日期时间
 *    -- 设置 type 为 datetime，选择日期 + 时间
 * en - Datetime Mode
 *    -- Set type to be datetime to select date and time.
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function() {
  return <DatePicker type="datetime" defaultValue={Date.now()} />
}
