/**
 * cn - 固定表头 \n *固定表头需要设置整个表格的高度
 * en - Fixed head
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(20)

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

export default function () {
  return (
    <div>
      <Table
        fixed="both"
        keygen="id"
        width={1500}
        style={{ height: 400 }}
        columns={columns}
        data={data}
      />
      <Table
        fixed="y"
        data={data}
        keygen="id"
        style={{ height: 300 }}
        columns={columns.slice(0, 4)}
      />
    </div>
  )
}
