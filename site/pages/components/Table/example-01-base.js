/**
 * cn - 基本用法
 *    -- 基础的表格用法。推荐 columns 写为常量，以提升性能。
 * en - Base
 *    -- Basic table usage.
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
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

export default function () {
  return (
    <Table
      keygen="id"
      width={1500}
      columns={columns}
      data={data}
    />
  )
}
