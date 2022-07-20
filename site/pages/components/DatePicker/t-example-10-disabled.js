/**
 * cn - 禁用
 *    -- disabled 为 true 时，禁用整个日期选择。
 * en - Disabled
 *    -- When the disabled is true, disable all the date selection.
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function() {
  return <DatePicker disabled defaultValue={Date.now()} />
}
