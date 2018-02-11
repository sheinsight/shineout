import React from 'react'
import { Table } from 'shineout'
import { getData } from 'doc/data/table'

const data = getData(6)

export default function () {
  const columns = [
    {
      title: 'id',
      render: 'id',
      fixed: 'left',
      width: 36,
    },
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

  return (
    <Table
      fixed="x"
      keygen="id"
      width={1500}
      columns={columns}
      data={data}
    />
  )
}
