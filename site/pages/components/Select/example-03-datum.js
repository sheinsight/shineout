/**
 * cn -
 *    -- 如果 format 属性不能满足需求，可以借助 Datum.List 来处理
 * en -
 *    -- When the format does not satisfied your requirements, you can use <a href="#/components/Datum.List">Data.List</a> istead.
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
        datum={{ format: 'id' }}
        keygen="id"
        defaultValue={3}
        style={style}
        placeholder="Select a city"
        renderItem="city"
        renderResult={d => d.city}
      />

      <Select
        data={citys}
        multiple
        keygen="id"
        defaultValue="3,4"
        datum={{
          format: d => d.id.toString(),
          separator: ',',
          prediction: (v, d) => v === d.id.toString(),
        }}
        placeholder="Select citys"
        renderItem="city"
      />
    </div>
  )
}
