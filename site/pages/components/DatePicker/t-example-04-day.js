/**
 * cn - 选择天
 *    -- 设置 type 为 date，选择 天
 * en - Day Mode
 *    -- Set type to be date to select day.
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function() {
  return <DatePicker type="date" format="yyyy-MM-dd" defaultValue={Date.now()} />
}
