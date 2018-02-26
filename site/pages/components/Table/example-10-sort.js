/**
 * cn - 排序
 * en - Sort
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/table'

const data = fetchSync(1000)

export default function () {
  const columns = [
    {
      title: 'id',
      render: 'id',
      width: 80,
      sorter: order => (a, b) => {
        if (order === 'asc') return a.id - b.id
        return b.id - a.id
      },
    },
    {
      title: 'Name',
      fixed: 'left',
      render: d => `${d.firstName} ${d.lastName}`,
      width: 160,
      sorter: order => (a, b) => {
        if (order === 'asc') return a.firstName.localeCompare(b.firstName)
        return b.firstName.localeCompare(a.firstName)
      },
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
      width: 100,
      render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
    },
  ]

  return (
    <Table
      fixed="both"
      keygen="id"
      width={1200}
      style={{ height: 400 }}
      columns={columns}
      data={data}
      rowsInView={10}
    />
  )
}
