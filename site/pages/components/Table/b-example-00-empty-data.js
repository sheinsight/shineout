/**
 * cn - 固定表头
 *    -- 设置 fixed 属性为 'both' 或 'y'，可以固定表头，需要设置整个表格的高度
 * en - Fixed head
 *    -- Set the fixed property to 'both' or 'y' can fix the table header. You need to set the height of the entire table.
 */
import React from 'react'
import { Table } from 'shineout'

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

export default function() {
  return (
    <div>
      <Table fixed="both" keygen="id" width={1500} height={300} columns={columns} bordered />
      <Table keygen="id" bordered style={{ height: 300 }} columns={columns.slice(0, 4)} />
      <Table keygen="id" bordered width={1500} style={{ height: 300 }} columns={columns.slice(0, 4)} />
    </div>
  )
}
