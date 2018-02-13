/**
 * cn - 表头分组
 * en - Column group
 */
import React from 'react'
import { Table } from 'shineout'
import { getData } from 'doc/data/table'

const data = getData(4)

export default function () {
  const columns = [
    {
      title: 'id',
      render: 'id',
      width: 50,
    },
    {
      title: 'First Name',
      render: 'firstName',
      group: ['Name', 'True Name'],
    },
    {
      title: 'Last Name',
      render: 'lastName',
      group: ['Name', 'True Name'],
    },
    {
      title: 'Nick Name',
      render: () => 'nickname',
      group: ['Name'],
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
  ]

  return (
    <Table
      bordered
      keygen="id"
      columns={columns}
      data={data}
    />
  )
}
