/**
 * cn - 基本用法
 * en - Overview
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
      width: 200,
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
      style: { textAlign: 'right' },
      render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
    },
  ]

  const data = getData(4)

  return (
    <Table keyGen="id" columns={columns} data={data} />
  )
}
