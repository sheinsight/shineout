/**
 * cn - 超大数据 \n * 这个例子加载了10000条数据。可以通过设置rowsInView调整单次最多render的行数，默认为20
 * en - Big data
 */
import React, { Fragment } from 'react'
import { Table } from 'shineout'
import { getData } from 'doc/data/table'

export default function () {
  const columns = [
    {
      title: 'id',
      render: 'id',
      width: 80,
    },
    {
      title: 'Name',
      fixed: 'left',
      render: d => `${d.firstName} ${d.lastName}`,
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
      width: 100,
      render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
    },
  ]

  const data = getData(10000)

  return (
    <Fragment>
      <Table
        fixed
        keygen="id"
        width={1200}
        style={{ height: 400 }}
        columns={columns}
        data={data}
        rowsInView={10}
      />
    </Fragment>
  )
}
