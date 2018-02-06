/**
 * cn - 固定表头 \n 固定表头需要设置整个表格的高度
 * en - Fixed head
 */
import React from 'react'
import { Table } from 'shineout'
import { getData } from 'doc/data/table'

export default function () {
  const columns = [
    {
      title: 'Name',
      render: d => `${d.firstName} ${d.lastName}`,
    },
    {
      title: 'Country',
      render: 'country',
    },
    {
      title: 'Position',
      render: 'position',
    },
    {
      title: 'Office',
      render: 'office',
    },
    {
      title: 'Salary',
      render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
    },
  ]

  const data = getData(20)

  return (
    <Table
      headFixed
      keygen="id"
      style={{ height: 400 }}
      columns={columns}
      data={data}
    />
  )
}
