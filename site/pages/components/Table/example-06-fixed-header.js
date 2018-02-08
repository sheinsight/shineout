/**
 * cn - 固定表头 \n *固定表头需要设置整个表格的高度
 * en - Fixed head
 */
import React from 'react'
import { Table } from 'shineout'
import { getData } from 'doc/data/table'

export default function () {
  const columns = [
    {
      title: 'id',
      render: 'id',
      width: 36,
    },
    {
      title: 'Name',
      width: 200,
      render: d => `${d.firstName} ${d.lastName}`,
    },
    {
      title: 'Country',
      width: 300,
      render: 'country',
    },
    {
      title: 'Position',
      width: 200,
      render: 'position',
    },
    {
      title: 'Office',
      width: 200,
      render: 'office',
    },
    {
      title: 'Start Date',
      width: 200,
      render: 'start',
    },
    {
      title: 'Salary',
      width: 200,
      render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
    },
  ]

  const data = getData(20)

  return (
    <Table
      fixed
      keygen="id"
      style={{ height: 400 }}
      columns={columns}
      data={data}
    />
  )
}
