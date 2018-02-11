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
  ]

  const data = getData(10000)

  return (
    <Fragment>
      <Table
        fixed
        keygen="id"
        style={{ height: 500 }}
        columns={columns}
        data={data}
      />
    </Fragment>
  )
}
