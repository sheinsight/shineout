/**
 * cn - 固定列
 * en - Fixed column
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
      fixed: 'left',
    },
    {
      title: 'Name',
      render: d => `${d.firstName} ${d.lastName}`,
      fixed: 'left',
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
      title: 'Start Date',
      render: 'start',
    },
    {
      title: 'Salary',
      fixed: 'right',
      render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
    },
  ]

  const data = getData(100)

  return (
    <Table
      headerFixed
      keygen="id"
      width={1500}
      style={{ height: 400 }}
      columns={columns}
      data={data}
    />
  )
}
