/**
 * cn - 选择月
 *    -- 设置 type 为 month，选择月
 * en - Month Mode
 *    -- Set type to be month to select month.
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function() {
  return <DatePicker type="month" defaultValue={Date.now()} />
}
