/**
 * cn - 排序
 *    -- 此示例演示了前端排序，sorter 返回一个 sort 函数。后端排序在 sorter 中处理，不要返回。
 * en - Sort
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/table'

const data = fetchSync(1000)
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
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
]

export default function () {
  return (
    <Table
      fixed="both"
      keygen="id"
      striped
      width={1200}
      style={{ maxHeight: 400 }}
      columns={columns}
      data={data}
      rowsInView={10}
    />
  )
}
