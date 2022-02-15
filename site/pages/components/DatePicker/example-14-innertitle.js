/**
 * cn - 内嵌标题
 *    -- 使用 innerTitle 展示内嵌标题
 * en - inner title
 *    -- -- use innerTitle to display the inner title
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function() {
  return (
    <div>
      <DatePicker type="date" innerTitle="Select date" clearable style={{ marginBottom: 8 }} />
      <br />
      <DatePicker range innerTitle="Select date" clearable style={{ marginBottom: 8 }} />
      <br />
      <DatePicker inputable type="datetime" innerTitle="Select datetime" clearable />
    </div>
  )
}
