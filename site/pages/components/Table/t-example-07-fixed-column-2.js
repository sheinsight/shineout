/**
 * cn -
 *    -- 示例：只固定右侧列
 * en -
 *    -- Example: Only fix the right column.
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(6)

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  {
    title: 'Date',
    render: 'start',
    fixed: 'right',
    group: 'Start Time',
    width: 120,
  },
  {
    title: 'Time',
    render: 'time',
    group: 'Start Time',
    width: 80,
  },
]

export default function() {
  return <Table fixed="x" keygen="id" width={1500} columns={columns} data={data} />
}
