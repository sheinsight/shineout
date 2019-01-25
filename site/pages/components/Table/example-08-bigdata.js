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

const data = fetchSync(10000)
const columns = [
  { title: 'id', render: 'id', width: 80 },
  {
    title: 'Name',
    fixed: 'left',
    render: d => (
      <div style={{ height: d.height }}>
        {d.firstName} {d.lastName}
      </div>
    ),
    width: 160,
  },
  { title: 'Country', render: 'country', width: 200 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start', width: 140 },
]

for (let i = 0; i < 50; i++) {
  columns.push({
    title: `${i + 1}`,
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  })
}

export default function() {
  return (
    <Table
      fixed="both"
      keygen="id"
      width={6400}
      style={{ height: 600 }}
      columns={columns}
      data={data}
      rowsInView={10}
    />
  )
}
