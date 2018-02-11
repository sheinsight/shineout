/**
 * cn - 固定列 \n * 需要设置 fixed 属性为 true
 * en - Fixed column
 */
import React, { Fragment } from 'react'
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
      render: d => `${d.firstName} ${d.lastName}`,
      fixed: 'left',
      width: 160,
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

  const data = getData(20)

  return (
    <Fragment>
      <Table
        fixed
        keygen="id"
        width={1500}
        style={{ height: 300 }}
        columns={columns}
        data={data}
      />
      <Table
        fixed
        keygen="id"
        width={1500}
        columns={columns}
        data={data.slice(0, 4)}
        scrollY={false}
      />
    </Fragment>
  )
}
