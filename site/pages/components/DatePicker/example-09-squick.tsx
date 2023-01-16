/**
 * cn - 快速选择
 *    -- 可以配置一些快速选择的选项, 日期可以是 Date, 时间戳, 或者字符串,字符串需要和所格式填写的 format 一致
 * en - Quick select
 *    -- can configure some options for quick selection. The date can be Date, timestamp, or string. The string needs to be in the same format as the format.
 */
import React from 'react'
import { DatePicker } from 'shineout'
import dayjs from 'dayjs'

const today = new Date()
const fmt = 'YYYY-MM-DD'
const formatStart = 'YYYY-MM-DD 00:00:00'
const formatEnd = 'YYYY-MM-DD 23:59:59'

const QuickSelectData = [
  { name: 'Today', value: dayjs(today).format(fmt) },
  {
    name: 'A week later',
    value: dayjs(today)
      .add(7, 'day')
      .format(fmt),
  },
  {
    name: 'A month later',
    value: dayjs(today)
      .add(30, 'day')
      .format(fmt),
  },
]
const QuickSelectDataTime = [
  {
    name: 'Next Week',
    value: [
      dayjs(today).format(formatStart),
      dayjs(today)
        .add(7, 'day')
        .format(formatEnd),
    ],
  },
  {
    name: 'Last Week',
    value: [
      dayjs(today)
        .add(-7, 'day')
        .format(formatStart),
      dayjs(today).format(formatEnd),
    ],
  },
  {
    name: 'Next Month',
    value: [
      dayjs(today).format(formatStart),
      dayjs(today)
        .add(30, 'day')
        .format(formatEnd),
    ],
  },
  {
    name: 'Last Month',
    value: [
      dayjs(today)
        .add(-30, 'day')
        .format(formatStart),
      dayjs(today).format(formatEnd),
    ],
  },
  {
    name: 'special date',
    value: ['2019-01-01 00:00:00', '2019-12-31 23:59:59'],
  },
]

const App: React.FC = () => (
  <div>
    <DatePicker
      range
      type="datetime"
      onChange={d => console.log(d)}
      quickSelect={QuickSelectDataTime}
      placeholder={['Start datetime', 'End datetime']}
      style={{ marginBottom: '12px', display: 'block' }}
    />

    <DatePicker placeholder="Quick Date" quickSelect={QuickSelectData} />
  </div>
)

export default App
