/**
 * cn - 选择季度
 *    -- 设置 type 为 quarter，选择季度
 * en - Quarter Mode
 *    -- Set type to be quarter to select month.
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function() {
  return <DatePicker type="quarter" defaultValue={Date.now()} />
}
