/**
 * cn - 加载中
 * en - Loading
 */
import React from 'react'
import { Table, Spin } from 'shineout'
import { getData } from 'doc/data/table'

const data = getData(8)

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

  const loading = <Spin type="scale-circle" />

  return (
    <Table keygen="id" loading={loading} columns={columns} data={data} />
  )
}
