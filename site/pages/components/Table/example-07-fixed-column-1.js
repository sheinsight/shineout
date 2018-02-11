/**
 * cn - 固定列 \n * 需要设置 fixed 属性为 true
 * en - Fixed column
 */
import React from 'react'
import { Table } from 'shineout'
import { getData } from 'doc/data/table'

const data = getData(20)

export default function () {
  const columns = [
    {
      title: 'id',
      render: 'id',
      width: 36,
    },
    {
      title: 'First Name',
      group: 'Name',
      render: 'firstName',
      width: 100,
    },
    {
      title: 'Last Name',
      fixed: 'left',
      group: 'Name',
      render: 'lastName',
      width: 100,
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
      width: 100,
      render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
    },
  ]

  return (
    <Table
      fixed="both"
      keygen="id"
      width={1500}
      style={{ height: 300 }}
      columns={columns}
      data={data}
    />
  )
}
