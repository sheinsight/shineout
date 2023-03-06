/**
 * cn - 性能
 *    -- Table内部对大量数据的渲染做了lazy render的优化。这个例子加载了10000条，55列数据。可以通过设置rowsInView调整单次最多render的行数，默认为20
 * en - Performance
 *    -- The rendering of large amounts of data in the Table has been optimized by lazy render. This example loads 10000 pieces and 55 columns of data.
 *    -- You can set rowsInView property to change the number of rows in rendering. The default value is 20.
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(100).sort((a, b) => a.country.localeCompare(b.country))
const columns = [
  { title: 'id', render: 'id', width: 80 },
  {
    title: 'Name',
    fixed: 'left',
    width: 160,
    render: d => `${d.firstName} ${d.lastName}`,
  },
  {
    title: 'Country',
    width: 200,
    render: d => <div style={{ height: d.height }}>{d.country}</div>,
    rowSpan: (a, b) => a.country === b.country,
    sorter: order => (a, b) => {
      if (order === 'asc') return a.country.localeCompare(b.country)
      return b.country.localeCompare(a.country)
    },
  },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start', width: 140 },
]

export default function() {
  return (
    <Table
      fixed="both"
      keygen="id"
      width={1400}
      style={{ height: 600 }}
      columns={columns}
      data={data}
      rowsInView={20}
      rowHeight={20}
    />
  )
}
