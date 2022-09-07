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
const style: React.CSSProperties = { width: 300, marginBottom: 12, display: 'block' }

const App: React.FC = () => (
  <div>
    <Select
      format="id"
      keygen="id"
      columns={3}
      data={citys}
      style={style}
      renderItem="city"
      placeholder="Select a city"
      prediction={(v, d) => v === d.id}
    />

    <Select
      absolute
      multiple
      format="id"
      keygen="id"
      columns={4}
      data={citys}
      style={style}
      columnWidth={180}
      renderItem="city"
      placeholder="Select citys"
      prediction={(v, d) => v === d.id}
      onFilter={text => d => d.city.toLowerCase().indexOf(text.toLowerCase()) >= 0}
    />
  </div>
)

export default App
