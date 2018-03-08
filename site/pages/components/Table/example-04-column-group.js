/**
 * cn - 表头分组
 * en - Column group
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/table'

const data = fetchSync(4)
const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'First Name', render: 'firstName', group: ['Name', 'True Name'] },
  { title: 'Last Name', render: 'lastName', group: ['Name', 'True Name'] },
  { title: 'Nick Name', render: () => 'nickname', group: ['Name'] },
  { title: 'Country', render: 'country' },
  { title: 'Office', render: 'office', group: 'Other' },
  { title: 'Position', render: 'position', group: 'Other' },
]

export default function () {
  return (
    <Table
      bordered
      keygen="id"
      columns={columns}
      data={data}
    />
  )
}
