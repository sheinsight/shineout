/**
 * cn - 静态数据分页
 * en - Pagination
 */
import React from 'react'
import { Table } from 'shineout'
import { getData } from 'doc/data/table'

const data = getData(10000)

const columns = [
  { title: 'id', render: 'id', width: 70 },
  {
    title: 'First Name', group: 'Name', render: 'firstName', width: 100,
  },
  {
    title: 'Last Name', fixed: 'left', group: 'Name', render: 'lastName', width: 100,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    fixed: 'right',
    width: 100,
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

export default function () {
  return (
    <Table
      data={data}
      fixed="x"
      keygen="id"
      width={1500}
      columns={columns}
      pagination={{
        align: 'center',
        layout: ['links', 'list'],
        pageSizeList: [10, 15, 20],
        text: {
          page: '/ page',
        },
      }}
    />
  )
}

