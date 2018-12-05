/**
 * cn - 多列选项
 *    --
 * en - Columns
 *    --
 */
import React from 'react'
import { Select } from 'shineout'
import { fetchSync as fetchCity } from 'doc/data/city'

const citys = fetchCity(200)
const onChange = d => console.log(d)
const style = { width: 300, marginBottom: 12, display: 'block' }

export default function () {
  return (
    <Select
      data={citys}
      format="id"
      keygen="id"
      columns={3}
      multiple
      onChange={onChange}
      prediction={(v, d) => v === d.id}
      style={style}
      placeholder="Select citys"
      renderItem="city"
    />
  )
}
