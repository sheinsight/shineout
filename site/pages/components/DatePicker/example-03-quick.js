/**
 * cn - 快速选择
 *    -- 可以配置一些快速选择的选项, 需要提供的时间值为字符串且和所格式填写的 format 一致
 * en - Quick select
 *    -- can set some quick select options, need provider date is string and same with format
 */
import React from 'react'
import { DatePicker } from 'shineout'
import { format, addDays, subDays } from 'date-fns'

const today = new Date()
const formatStart = 'yyyy-MM-dd 00:00:00'
const formatEnd = 'yyyy-MM-dd 23:59:59'

export default function() {
  return (
    <DatePicker
      range
      onChange={d => console.log(d)}
      type="datetime"
      quickSelect={[
        {
          name: '今天',
          value: [format(today, formatStart), format(today, formatEnd)],
        },
        {
          name: '下一周',
          value: [format(today, formatStart), format(addDays(today, 7), formatEnd)],
        },
        {
          name: '上一周',
          value: [format(subDays(today, 7), formatStart), format(today, formatEnd)],
        },
        {
          name: '后30天',
          value: [format(today, formatStart), format(addDays(today, 30), formatEnd)],
        },
        {
          name: '前30天',
          value: [format(subDays(today, 30), formatStart), format(today, formatEnd)],
        },
      ]}
      style={{ marginTop: '12px' }}
    />
  )
}
