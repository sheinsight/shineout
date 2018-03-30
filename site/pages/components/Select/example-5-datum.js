/**
 * cn - 数据处理
 *    -- 可以借助 Datum.List，处理复杂数据
 * en - Datum
 */
import React from 'react'
import { Select } from 'shineout'
import { fetchSync } from 'doc/data/city'

// data = [{id:1, city: 'name'}]
const data = fetchSync(100)
const onChange = d => console.log(d)
const style = { width: 200, marginBottom: 12 }

export default function () {
  return (
    <div>
      <Select
        data={data}
        datum={{ format: 'id' }}
        defaultValue={3}
        onChange={onChange}
        style={style}
        placeholder="Select a city"
        renderItem="city"
      />
      <Select
        data={data}
        multiple
        defaultValue={[3, 4]}
        datum={{ format: 'id' }}
        onChange={onChange}
        placeholder="Select citys"
        renderItem="city"
      />
    </div>
  )
}
