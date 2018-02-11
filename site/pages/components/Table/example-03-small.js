/**
 * cn - 紧凑表格 \n 设置 size=small
 * en - Small table
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
  ]

  return (
    <Table keygen="id" size="small" columns={columns} data={data} />
  )
}
