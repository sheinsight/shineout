/**
 * cn - 快速选择
 *    -- 可以配置一些快速选择的选项, 日期可以是 Date, 时间戳, 或者字符串,字符串需要和所格式填写的 format 一致
 * en - Quick select
 *    -- can configure some options for quick selection. The date can be Date, timestamp, or string. The string needs to be in the same format as the format.
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
          name: 'now',
          value: [Date.now(), Date.now()],
        },
        {
          name: 'next week',
          value: [format(today, formatStart), format(addDays(today, 7), formatEnd)],
        },
        {
          name: 'last week',
          value: [format(subDays(today, 7), formatStart), format(today, formatEnd)],
        },
        {
          name: 'next month',
          value: [format(today, formatStart), format(addDays(today, 30), formatEnd)],
        },
        {
          name: 'last month',
          value: [format(subDays(today, 30), formatStart), format(today, formatEnd)],
        },
        {
          name: 'special date',
          value: ['2019-01-01 00:00:00', '2019-12-31 23:59:59'],
        },
      ]}
      style={{ marginTop: '12px' }}
    />
  )
}
