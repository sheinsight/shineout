/**
 * cn - 允许单选
 *    -- 可以设置范围选择的时候只选择一侧.
 * en - allow single
 *    -- can set range select only select single
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function() {
  return <DatePicker range onChange={d => console.log(d)} type="datetime" allowSingle style={{ marginTop: '12px' }} />
}
