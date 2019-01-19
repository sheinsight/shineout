/**
 * cn - Select
 */
import React from 'react'
import { Table, Select, Popover } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(20)
const selectData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'test', render: () => <Select absolute width={70} data={selectData} /> },
  {
    title: 'test2',
    render: d => (
      <Popover trigger="click" content={<div style={{ padding: 50 }}>{d.country}</div>}>
        <span>xxx</span>
      </Popover>
    ),
  },
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
  return <Table fixed="both" keygen="id" width={1500} style={{ height: 400 }} columns={columns} data={data} />
}
