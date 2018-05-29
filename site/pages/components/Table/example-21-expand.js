/**
 * cn - 可展开
 *    -- 需要展开行时，可以增加一个 type 为 'expand' 的 column，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果
 * en - Expand
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(100)

const columns = [
  {
    type: 'expand',
    render: (d) => {
      if (d.salary < 200000) return undefined
      return () => <div style={{ padding: '0 30px', wordBreak: 'break-all' }}>{JSON.stringify(d)}</div>
    },
  },
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

export default function () {
  return (
    <Table
      fixed="y"
      data={data}
      keygen="id"
      style={{ height: 300 }}
      columns={columns}
    />
  )
}
