/**
 * cn - 最大最小时间
 *    -- 可以通过设置 min/max 去设置一个选择时间的最大最小值. 推荐在单选且datetime 类型下使用
 * en - min max date
 *    -- The basic usage
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function() {
  return (
    <div>
      <DatePicker type="datetime" min={Date.now()} placeholder="Select min datetime" />
      <br />
      <DatePicker
        type="datetime"
        min={Date.now()}
        max={Date.now() + 4 * 86400000}
        style={{ marginTop: '12px' }}
        placeholder="Select min/max datetime"
      />
    </div>
  )
}
