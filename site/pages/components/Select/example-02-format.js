/**
 * cn - 数据处理
 *    -- 设置 format 选项把数据对象格式化为指定的 value
 * en - Datum
 *    -- Set format property to format the data object to the specified value.
 */
import React from 'react'
import { Select } from 'shineout'
import { fetchSync as fetchCity } from 'doc/data/city'

const citys = fetchCity(100)
const style = { width: 240, marginBottom: 12, display: 'block' }

export default function() {
  return (
    <div>
      <Select
        data={citys}
        format="id"
        keygen="id"
        defaultValue={3}
        prediction={(v, d) => v === d.id}
        style={style}
        placeholder="Select a city"
        renderItem="city"
      />

      <Select
        data={citys}
        multiple
        keygen="id"
        defaultValue={[3, 4]}
        format="id"
        placeholder="Select citys"
        renderItem="city"
      />
    </div>
  )
}
