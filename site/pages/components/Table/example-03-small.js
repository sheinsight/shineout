/**
 * cn - 紧凑表格
 *    -- 设置 size 为 small 显示紧凑表格
 * en - Small table
 *    -- Set size to small to display the compact form.
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(4)

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
]

export default function() {
  return <Table keygen="id" size="small" columns={columns} data={data} />
}
