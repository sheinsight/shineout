/**
 * cn - 行样式
 *    -- 通过 rowClassName 设置单行样式（使用了 rowClassName 必须给 td 指定背景色）
 * en - Row ClassName
 *    -- Set the rowClassName property to set row style. (You must specify td background-color when the rowClassName is set)
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(20)

const columns = [
  { title: 'id', render: 'id', width: 50, fixed: 'left' },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

const rowClassName = d => {
  if (d.id === 2) return 'table-bg-danger'
  if (d.id === 3) return 'table-bg-success'
  return undefined
}

export default function() {
  return (
    <div>
      <Table
        fixed="both"
        keygen="id"
        width={1500}
        height={300}
        columns={columns}
        data={data}
        rowClassName={rowClassName}
      />
    </div>
  )
}
