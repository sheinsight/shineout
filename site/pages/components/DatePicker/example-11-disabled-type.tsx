/**
 * cn -
 *    -- disabledTime 属性支持单独禁用时间。
 * en -
 *    -- The disabledTime attribute supports separate disable time.
 */
import React from 'react'
import { DatePicker, TYPE } from 'shineout'
import dayjs from 'dayjs'

type DatePickerValue = TYPE.DatePicker.Value
type DatePickerProps = TYPE.DatePicker.Props<DatePickerValue>
type DatePickerDefaultValue = DatePickerProps['defaultValue']

const Now: DatePickerDefaultValue = Date.now()

const App: React.FC = () => (
  <div>
    <DatePicker
      type="datetime"
      defaultValue={Now}
      defaultTime="10:00:00"
      style={{ marginInlineEnd: 12 }}
      disabledTime={time => time === '12:00:00'}
      disabled={d => [0, 6].includes(dayjs(d).day())}
    />
  </div>
)

export default App
