/**
 * cn - 多列选项
 *    -- 设置 columns 属性，选项变为多列展示，设置 columnWidth 指定每一列宽度
 * en - Columns
 *    -- Set columns property over 1, options will display in multiple columns.
 */
import React from 'react'
import { Select } from 'shineout'
import { fetchSync as fetchCity } from 'doc/data/city'

const citys = fetchCity(200)
const style = { width: 300, marginBottom: 12, display: 'block' }

export default function() {
  return (
    <div>
      <Select
        data={citys}
        format="id"
        keygen="id"
        columns={3}
        prediction={(v, d) => v === d.id}
        style={style}
        placeholder="Select a city"
        renderItem="city"
      />

      <Select
        data={citys}
        format="id"
        keygen="id"
        columns={4}
        columnWidth={180}
        multiple
        prediction={(v, d) => v === d.id}
        style={style}
        placeholder="Select citys"
        renderItem="city"
        onFilter={text => d => d.city.toLowerCase().indexOf(text.toLowerCase()) >= 0}
        absolute
      />
    </div>
  )
}
